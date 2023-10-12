const logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.redirect('../login');
};

module.exports = logout;