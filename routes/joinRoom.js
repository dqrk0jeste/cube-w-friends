const router = require('express').Router();

const { joinRoom, joinRoomWRoomCode } = require('../controllers/roomController');

//router.get('/', joinRoom);
router.get('/:roomCode', joinRoomWRoomCode);

module.exports = router;