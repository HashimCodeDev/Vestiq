import express from "express";
import {
	generateOutfit,
	getOutfitHistory,
	rateOutfit,
} from "../controllers/outfitController.js";
import { authenticateToken, getUser } from "../middleware/auth.js";
import {
	validateOutfitGeneration,
	validateRating,
	validateId,
} from "../middleware/validation.js";
import { outfitGenerationLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/upload", authenticateToken, getUser);

// @route   POST /api/outfits/generate
// @desc    Generate outfit recommendations
// @access  Private
router.post("/generate", authenticateToken, getUser, generateOutfit);

// @route   GET /api/outfits/history
// @desc    Get user's outfit generation history
// @access  Private
router.get("/history", authenticateToken, getUser, getOutfitHistory);

// @route   PUT /api/outfits/:id/rate
// @desc    Rate an outfit
// @access  Private
router.put("/:id/rate", authenticateToken, getUser, rateOutfit);

export default router;
