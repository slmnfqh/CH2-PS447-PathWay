/** @format */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// REGISTER ROUTE
router.post("/register", userController.register);

// LOGIN ROUTE
router.post("/login", userController.login);

// GET ALL USERS ROUTE
// router.get("/users", verifyToken, userController.getAllUsers);

// GET REFRESH TOKEN ROUTE
// router.get("/token", userController.getRefreshToken);

// LOGOUT ROUTE
// router.delete("/logout", userController.logout);

module.exports = router;
