import express from "express";
import {
	createWardrobeItem,
	getWardrobeItems,
} from "../controllers/wardrobeItemController.js";
import { authenticateToken, getUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, getUser, createWardrobeItem);
router.get("/", authenticateToken, getUser, getWardrobeItems);

export default router;
