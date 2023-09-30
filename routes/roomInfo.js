const router = require('express').Router();

const { getRoomInfo } = require('../controllers/roomController');

router.get('/:roomCode', getRoomInfo);

module.exports = router;