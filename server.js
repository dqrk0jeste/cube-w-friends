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

const PORT = process.env.PORT || 3500;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('sockets work');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

app.use('/', require('./routes/login'));
app.use('/index(.html)?', require('./routes/login'));
app.use('/register(.html)?', require('./routes/register'));
app.use('/start', verifyJWT, require('./routes/start'));
app.use('/logout', require('./routes/logout'));

app.get('/current-user', verifyJWT, (req, res, next) => {
    res.json({ user: req.user });
    return;
});

app.use('/join-room', verifyJWT, require('./routes/joinRoom'));
app.use('/create-room', verifyJWT, require('./routes/createRoom'));

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'views', 'error404.html'));
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

connectDB();