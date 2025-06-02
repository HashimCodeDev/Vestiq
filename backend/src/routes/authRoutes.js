// routes/auth.js
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
	verifyUser,
	getProfile,
	updateProfile,
	deleteAccount,
} = require("../controllers/authController");

const router = express.Router();

router.post("/verify", authenticateToken, verifyUser);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
router.delete("/account", authenticateToken, deleteAccount);

module.exports = router;
