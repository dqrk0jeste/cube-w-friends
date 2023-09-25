const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.sendStatus(401);
      return;
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
              res.sendStatus(403);
              return;
            }
            req.user = decoded.user;
            console.log(req.use);
            next();
        }
    );
}

module.exports = verifyJWT