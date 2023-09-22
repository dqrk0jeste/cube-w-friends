//require('dotenv').config();
const express = require('express');
const path = require('path');
const  mongoose = require('mongoose');

const connectDB = require('./config/connectDatabase');
const User = require('./Database Entries/User');

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

connectDB();