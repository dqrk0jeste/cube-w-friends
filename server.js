//require('dotenv').config();
const express = require('express');
const path = require('path');
const  mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');

const connectDB = require('./config/connectDatabase');
const User = require('./Database Entries/User');

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

app.use('/', require('./routes/login'));
app.use('/index(.html)?', require('./routes/login'));
app.use('/register(.html)?', require('./routes/register'));
app.use('/start', require('./middleware/verifyJWT'), require('./routes/start'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'views', 'error404.html'));
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

connectDB();