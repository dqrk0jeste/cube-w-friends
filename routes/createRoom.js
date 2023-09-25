const router = require('express').Router();
const path = require('path');

const { createRoom } = require('../controllers/roomController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'create-room.html'));
});

router.post('/', createRoom);

module.exports = router;