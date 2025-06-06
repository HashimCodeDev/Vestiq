// routes/auth.js
import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
	verifyUser,
	getProfile,
	updateProfile,
	deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/verify", authenticateToken, verifyUser);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
router.delete("/account", authenticateToken, deleteAccount);

export default router;
