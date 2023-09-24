const User = require('../Database Entries/User');
const bcrypt = require('bcrypt');

const handleRegistation = async (req, res) => {
  try {
    const username = req.body.username;
    if(await User.findOne().where('username').equals(username)) {
      res.status(403).json({ message: 'username taken'});
      return;
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: username,
      password: password
    };
    await User.create(user);
    res.status(200).json(user);
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = handleRegistation;