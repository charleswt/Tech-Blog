const authenticate = (req, res, next) => {
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }
      next();
};

const format_date = (date) => {
  return date.toLocalDateString()
}
  
  module.exports = authenticate;