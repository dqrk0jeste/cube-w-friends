const router = require('express').Router();

const { joinRoom } = require('../controllers/roomController');

router.post('/', joinRoom);

module.exports = router;