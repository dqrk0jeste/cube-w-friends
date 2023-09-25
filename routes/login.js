const router = require('express').Router();
const path = require('path');
const { validJWT } = require('../middleware/verifyJWT');

const handleLogin = require('../controllers/loginController');

router.get('/', (req, res) => {
  if(req.cookies?.jwt && validJWT(req.cookies.jwt)) {
    res.redirect('/start');
    return;
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
  return;
});

router.post('/', handleLogin);

module.exports = router;