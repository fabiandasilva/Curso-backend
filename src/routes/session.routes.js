const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session.controllers");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", sessionController.greeting);
router.post("/login", sessionController.login);
router.get("/logout", sessionController.logOut);
router.get("/private", authMiddleware, sessionController.private);
router.post("/register", sessionController.register);

module.exports = router;
