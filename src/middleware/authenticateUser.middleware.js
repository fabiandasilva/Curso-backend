module.exports = function authenticateUser(req, res, next) {
    const passport = require("passport");
    passport.authenticate("current", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (req.cookies.token) {
            return res.json({ message: "Autorizado" });
        }
        if (!user) {
            return res.status(401).json({ message: "No autorizado" });
        }

        req.user = user;
        next();
    })(req, res, next);
}