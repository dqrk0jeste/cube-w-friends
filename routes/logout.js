const logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.redirect('..');
};

module.exports = logout;