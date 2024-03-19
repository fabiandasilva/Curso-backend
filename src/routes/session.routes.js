const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const passport = require("passport");

router.get("/", sessionController.greeting);

// router.post("/login", [
//   passport.authenticate("login"),
//   sessionController.login,
// ]);
router.get("/logout", sessionController.logOut);
router.get("/private", authMiddleware, sessionController.private);
router.post("/register", [
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionController.register,
]);
// router.post("/login", sessionController.login);
router.post("/login", [
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.login,
]);
router.post("/recover-psw", sessionController.recoverPsw);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
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
