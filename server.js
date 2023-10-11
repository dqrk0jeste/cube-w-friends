const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/connectDatabase');
const User = require('./Database Entries/User');
const { verifyJWT } = require('./middleware/verifyJWT');
const Room = require('./Database Entries/Room');
const { generateScramble } = require('./util');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(errorHandler);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

app.use('/', require('./routes/login'));
app.use('/index(.html)?', require('./routes/login'));
app.use('/register(.html)?', require('./routes/register'));
app.use('/start', verifyJWT, require('./routes/start'));
app.use('/logout', require('./routes/logout'));

app.use('/current-user', verifyJWT, require('./routes/userInfo'));

app.use('/room-info/', verifyJWT, require('./routes/roomInfo'));

app.use('/join-room', verifyJWT, require('./routes/joinRoom'));
app.use('/create-room', verifyJWT, require('./routes/createRoom'));

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'views', 'error404.html'));
});

io.on('connection', (socket) => {
    socket.on('user-join', obj => {
        const { roomCode, user } = obj;
        const room = Room.findRoom(roomCode);
        if(!room) {
            socket.emit('error');
            return;
        }
        socket.join(`room-${roomCode}`);
        console.log(`${user} joined room-${roomCode}`);
        room.players.push({ user: user, id: socket.id });
        io.to(`room-${roomCode}`).emit('new-join', { user: user });
        if(room.players.length === 1) {
            const scramble = generateScramble();
            io.to(`room-${roomCode}`).emit('new-scramble', scramble);
            room.interval = setInterval(() => {
                const results = room.lastRoundResults;
                io.to(`room-${roomCode}`).emit('round-over', results);
                room.lastRoundResults = [];
                setTimeout(() => {
                    const scramble = generateScramble();
                    io.to(`room-${roomCode}`).emit('new-scramble', scramble);
                }, (Number)(room.rules.betweenDuration) * 1000);
            }, (Number)(room.rules.roundDuration) * 1000 + (Number)(room.rules.betweenDuration) * 1000);
        }
    });
    socket.on('time-submit', obj => {
        const { time, user, roomCode} = obj;
        const room = Room.findRoom(roomCode);
        room.lastRoundResults.push({
            time: time,
            user: user
        });
        room.lastRoundResults.sort((a, b) => {
            if(a.time === 'DNF') {
                return 1;
            } else if(b.time === 'DNF') {
                return -1;
            } else {
                return a.time - b.time;
            }
        });
        io.to(`room-${roomCode}`).emit('new-time-submitted', room.lastRoundResults);
    });
    socket.on('disconnect', () => {
        const id = socket.id;
        Room.rooms.forEach(room => {
            room.players = room.players.filter(player => player.id !== id);
            if(room.players.length === 0) {
                setTimeout(() => {
                    if(room.players.length === 0) {
                        clearInterval(room.interval);
                        Room.rooms = Room.rooms.filter(room => room.length > 0);
                    }
                }, 5000);
            }
        });
        io.emit('update-users');
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

connectDB();