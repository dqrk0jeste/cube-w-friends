const User = require('../Database Entries/User');
const bcrypt = require('bcrypt');
const path = require('path');

const handleRegistation = async (req, res) => {
  console.log('kurac');
  try {
    const username = req.body.username;
    if(await User.findOne().where('username').equals(username)) {
      res.sendStatus(409);
      return;
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: username,
      password: password
    };
    await User.create(user);
    console.log(user);
    res.sendStatus(201);
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = handleRegistation;