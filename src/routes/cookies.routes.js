const express = require("express");
const cookies = require("../controllers/cookies.controlles");
const router = express.Router();

router.get("/getCookies", cookies.getCookies);
router.post("/setCookies", cookies.setCookies);
router.delete("/deleteCookies", cookies.deleteCookies);

module.exports = router;
