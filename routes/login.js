const router = require('express').Router();
const path = require('path');

const handleLogin = require('../controllers/loginController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
  return;
});

router.post('/', handleLogin);

module.exports = router;