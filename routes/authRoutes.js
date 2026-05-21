const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// REGISTER
router.post("/register", authController.registerStudent);

// LOGIN
router.post("/login", authController.loginStudent);

module.exports = router;
