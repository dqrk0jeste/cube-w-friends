const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;