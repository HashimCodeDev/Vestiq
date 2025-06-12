import express from "express";
import {
	getUserProfile,
	getUserName,
	updateUserProfile,
	deleteUserAccount,
} from "../controllers/userController.js";

import { authenticateToken, getUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authenticateToken, getUser, getUserProfile);
router.get("/getUserName", authenticateToken, getUser, getUserName);
router.put("/profile", authenticateToken, getUser, updateUserProfile);
router.delete("/profile", authenticateToken, getUser, deleteUserAccount);

export default router;
