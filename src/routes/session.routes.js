const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const passport = require("passport");
const authenticateUserMiddleware = require("../middleware/authenticateUser.middleware");

router.get("/", sessionController.greeting);
router.get("/logout", sessionController.logOut);
router.get("/private", authMiddleware, sessionController.private);

router.post("/register", sessionController.registerCtrl);


router.post("/login", [
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.loginCtrl,
]);

router.post("/recover-psw", sessionController.recoverPswCtrl);

router.get("/current", authenticateUserMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => { }
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      req.session.user = req.user;
      res.redirect("/profile");
    } catch (error) {
      console.log("🚀 ~ file: session.routes.js:115 ~ error:", error);
    }
  }
);

module.exports = router;
