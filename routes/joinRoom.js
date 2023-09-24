const router = require('express').Router();

const { joinRoom, joinRoomWRoomCode } = require('../controllers/roomController');

router.post('/', joinRoom);
router.post('/:roomCode', joinRoomWRoomCode);

module.exports = router;