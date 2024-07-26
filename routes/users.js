const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

// Register
router.post("/api/users/register", userController.register);

// Login
router.post("/api/users/login", userController.login);

module.exports = router;
