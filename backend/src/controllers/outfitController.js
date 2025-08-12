import Outfit from "../models/Outfit.js";
import WardrobeItem from "../models/WardrobeItem.js";
import axios from "axios";											

import * as aiService from "../services/aiService.js";
import logger from "../utils/logger.js";

// const uploadOutfit = async (req, res) => {
// 	try {
// 		const { outfitData } = req.body;

// 		// Save outfit data to database
// 		const outfit = new Outfit({
// 			userId: req.user._id,
// 			...outfitData,
// 		});

// 		await outfit.save();

// 		res.json({
// 			success: true,
// 			message: "Outfit uploaded successfully",
// 			data: {
// 				outfitId: outfit._id,
// 			},
// 		});
// 	} catch (error) {
// 		logger.error("Outfit upload error:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to upload outfit",
// 		});
// 	}
// };

// const generateOutfit = async (req, res) => {
// 	try {
// 		const { occasion, weather, budget, region } = req.body;
// 		const userPreferences = req.user.preferences;

// 		// Generate AI recommendations
// 		const recommendations = await aiService.generateOutfitRecommendations(
// 			userPreferences,
// 			occasion,
// 			weather,
// 			budget || userPreferences.budgetRange?.max || 5000
// 		);

// 		// Save outfit generation record
// 		const outfit = new Outfit({
// 			userId: req.user._id,
// 			occasion,
// 			weather,
// 			budget,
// 			region,
// 			recommendations,
// 			generatedAt: new Date(),
// 		});

// 		await outfit.save();

// 		res.json({
// 			success: true,
// 			message: "Outfit generated successfully",
// 			data: {
// 				outfitId: outfit._id,
// 				recommendations,
// 			},
// 		});
// 	} catch (error) {
// 		logger.error("Outfit generation error:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed  to generate outfit",
// 		});
// 	}
// };

// const getOutfitHistory = async (req, res) => {
// 	try {
// 		const page = parseInt(req.query.page) || 1;
// 		const limit = parseInt(req.query.limit) || 10;
// 		const skip = (page - 1) * limit;

// 		const outfits = await Outfit.find({ userId: req.user._id })
// 			.sort({ generatedAt: -1 })
// 			.skip(skip)
// 			.limit(limit);

// 		const total = await Outfit.countDocuments({ userId: req.user._id });

// 		res.json({
// 			success: true,
// 			data: {
// 				outfits,
// 				pagination: {
// 					page,
// 					limit,
// 					total,
// 					pages: Math.ceil(total / limit),
// 				},
// 			},
// 		});
// 	} catch (error) {
// 		logger.error("Get outfit history error:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to get outfit history",
// 		});
// 	}
// };

// const rateOutfit = async (req, res) => {
// 	try {
// 		const { outfitId } = req.params;
// 		const { rating, feedback } = req.body;

// 		const outfit = await Outfit.findOne({
// 			_id: outfitId,
// 			userId: req.user._id,
// 		});

// 		if (!outfit) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Outfit not found",
// 			});
// 		}

// 		outfit.rating = rating;
// 		outfit.feedback = feedback;
// 		outfit.ratedAt = new Date();

// 		await outfit.save();

// 		res.json({
// 			success: true,
// 			message: "Outfit rated successfully",
// 		});
// 	} catch (error) {
// 		logger.error("Rate outfit error:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Failed to rate outfit",
// 		});
// 	}
// };

// export {
// 	generateOutfit,
// 	getOutfitHistory,
// 	rateOutfit,
// };

export const getRecommendations = async (req, res) => {
    try {
        // Get user's dresses first
        const items = await WardrobeItem.find({ userId: req.user.userId })
            .sort({ createdAt: -1 })
            .exec();
        
        // Get preferences from request
        const { mood, occasion } = req.body;
        
        // Validation
        if (items.length === 0) {
            return res.status(400).json({ error: "No dresses found in wardrobe" });
        }
        if (!occasion) {
            return res.status(400).json({ error: "no occasion found" });
        }

        console.log("hi - about to call AI service");

        // Clean items data - THIS IS THE KEY FIX
        const cleanItems = items.map(item => ({
            _id: item._id,
            imageUrl: item.imageUrl,
            features: item.features,
            description: item.description
        }));
        console.log("Cleaned items:", cleanItems);  

        // Send to AI service with cleaned data
        const response = await axios.post(process.env.Recommedation_Url, {
            wardrobeItems: cleanItems,  // Use cleanItems, not items
            mood: mood,
            occasion: occasion
        });
        
        
        console.log("AI service response:", response.data);

        // Return recommendations
        res.status(200).json({ recommendations: response.data.recommendations });
        
    } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response data:", JSON.stringify(error.response?.data, null, 2));
    
    // Log the detailed validation errors
    if (error.response?.data?.detail) {
        error.response.data.detail.forEach((err, index) => {
            console.error(`Validation Error ${index + 1}:`, {
                type: err.type,
                location: err.loc,
                message: err.msg,
                input: err.input
            });
        });
    }
    
    res.status(500).json({ error: "Server error" });
}
}