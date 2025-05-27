const Outfit = require("../models/Outfit");
const aiService = require("../services/aiService");
const logger = require("../utils/logger");

const generateOutfit = async (req, res) => {
	try {
		const { occasion, weather, budget, region } = req.body;
		const userPreferences = req.user.preferences;

		// Generate AI recommendations
		const recommendations = await aiService.generateOutfitRecommendations(
			userPreferences,
			occasion,
			weather,
			budget || userPreferences.budgetRange?.max || 5000
		);

		// Save outfit generation record
		const outfit = new Outfit({
			userId: req.user._id,
			occasion,
			weather,
			budget,
			region,
			recommendations,
			generatedAt: new Date(),
		});

		await outfit.save();

		res.json({
			success: true,
			message: "Outfit generated successfully",
			data: {
				outfitId: outfit._id,
				recommendations,
			},
		});
	} catch (error) {
		logger.error("Outfit generation error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to generate outfit",
		});
	}
};

const getOutfitHistory = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const outfits = await Outfit.find({ userId: req.user._id })
			.sort({ generatedAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Outfit.countDocuments({ userId: req.user._id });

		res.json({
			success: true,
			data: {
				outfits,
				pagination: {
					page,
					limit,
					total,
					pages: Math.ceil(total / limit),
				},
			},
		});
	} catch (error) {
		logger.error("Get outfit history error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get outfit history",
		});
	}
};

const rateOutfit = async (req, res) => {
	try {
		const { outfitId } = req.params;
		const { rating, feedback } = req.body;

		const outfit = await Outfit.findOne({
			_id: outfitId,
			userId: req.user._id,
		});

		if (!outfit) {
			return res.status(404).json({
				success: false,
				message: "Outfit not found",
			});
		}

		outfit.rating = rating;
		outfit.feedback = feedback;
		outfit.ratedAt = new Date();

		await outfit.save();

		res.json({
			success: true,
			message: "Outfit rated successfully",
		});
	} catch (error) {
		logger.error("Rate outfit error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to rate outfit",
		});
	}
};

module.exports = {
	generateOutfit,
	getOutfitHistory,
	rateOutfit,
};
