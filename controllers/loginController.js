require('dotenv').config();
const User = require('../Database Entries/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = await User.findOne().where('username').equals(username);
    if(!foundUser) {
      res.sendStatus(401);
      return;
    }
    if(await bcrypt.compare(password, foundUser.password)) {
      const accessToken = jwt.sign({
        user: foundUser.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '12h' }
      );
      res.cookie('jwt', accessToken, {
        httpOnly: true, maxAge: 12 * 60 * 60 * 1000
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = handleLogin;