const router = require('express').Router();
const path = require('path');

const handleLogin = require('../controllers/loginController');

router.post('/', handleLogin);

module.exports = router;