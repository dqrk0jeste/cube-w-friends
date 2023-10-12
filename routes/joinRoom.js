const router = require('express').Router();

const { joinRoomWRoomCode } = require('../controllers/roomController');

router.get('/:roomCode', joinRoomWRoomCode);

module.exports = router;