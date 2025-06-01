const express = require("express");
const router = express.Router();
const {
	generateOutfit,
	getOutfitHistory,
	rateOutfit,
} = require("../controllers/outfitController");
const { authenticateToken, getUser } = require("../middleware/auth");
const {
	validateOutfitGeneration,
	validateRating,
	validateId,
} = require("../middleware/validation");
const { outfitGenerationLimiter } = require("../middleware/rateLimiter");

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

module.exports = router;
