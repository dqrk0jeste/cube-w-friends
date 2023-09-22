const router = require('express').Router();
const path = require('path');

const handleRegistation = require('../controllers/registrationController');

router.post('/', handleRegistation);

module.exports = router;