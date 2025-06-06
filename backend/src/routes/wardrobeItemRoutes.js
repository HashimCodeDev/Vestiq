import express from "express";
import {
	createWardrobeItem,
	getWardrobeItems,
} from "../controllers/wardrobeItemController.js";

const router = express.Router();

router.post("/", createWardrobeItem);
router.get("/", getWardrobeItems);

export default router;
