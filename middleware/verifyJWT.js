const jwt = require('jsonwebtoken');
const User = require('../Database Entries/User');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (e, decoded) => {
        if (e) {
          res.sendStatus(403);
          return;
        }
        req.user = decoded.user;
        next();
        return;
      }
    );
}

const validJWT = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { verifyJWT, validJWT };