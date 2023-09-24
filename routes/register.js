const router = require('express').Router();
const path = require('path');

const handleRegistation = require('../controllers/registrationController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'views', 'register.html'));
  return;
});
router.post('/', handleRegistation);

module.exports = router;