const User = require('../Database Entries/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = await User.findOne().where('username').equals(username);
    if(!foundUser) {
      res.status(401).json({ message: 'username not found'});
      return;
    }
    if(bcrypt.compare(password, foundUser.password)) {
      res.status(200).json(foundUser);
    }
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = handleLogin;