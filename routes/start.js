const router = require('express').Router();
const Room = require('../Database Entries/Room');
const path = require('path');

router.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'start.html'));
});

router.use('/create-room', require('./createRoom'));

router.use('/joinRoom', require('./joinRoom'));

module.exports = router;