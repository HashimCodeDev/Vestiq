import express from "express";
import {
	createWardrobeItem,
	getWardrobeItems,
	deleteWardrobeItem,
} from "../controllers/wardrobeItemController.js";
import { authenticateToken, getUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, getUser, createWardrobeItem);
router.get("/", authenticateToken, getUser, getWardrobeItems);
router.delete("/:userId/:itemId",authenticateToken,getUser, deleteWardrobeItem);

export default router;
