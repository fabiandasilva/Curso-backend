module.exports = function authMiddleware(req, res, next) {
  if (req.session?.user || req.session.admin) {
    return next();
  }

  return res.redirect("/login");
};
