const User = require('../Database Entries/User');
const bcrypt = require('bcrypt');

const handleRegistation = async (req, res) => {
  try {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: username,
      password: password
    });
    console.log(await User.find())
    res.sendStatus(200);
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = handleRegistation;