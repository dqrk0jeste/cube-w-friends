//require('dotenv').config();
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
const { userJoined, timeSubmit, handleDisconnect} = require('./controllers/socketController');

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
    socket.on('user-join', socket => {
        userJoined(socket);
    });
    socket.on('time-submission', socket => {
        timeSubmit(socket)
    });
    socket.on('disconnect', socket => {
        handleDisconnect(socket);
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

connectDB();