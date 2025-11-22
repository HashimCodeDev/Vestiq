import axios from "axios";
import WardrobeItem from "../models/WardrobeItem.js";
import FeatureExtractionAI from '../services/featureExtractionAi.js';
import logger from '../utils/logger.js';
/**
 * Creates a new wardrobe item for the current user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a success message or an error message
 */
const featureExtractionAI = new FeatureExtractionAI(process.env.GEMINI_API_KEY);
/**
 * Create wardrobe item(s) from image URLs
 * POST /wardrobe/create
 * 
 * Request body:
 * {
 *   "imageUrls": ["url1", "url2", ...]
 * }
 */
export async function createWardrobeItem(req, res) {
  try {
    const { imageUrls } = req.body;

    // Validate request body
    if (!imageUrls) {
      return res.status(400).json({
        success: false,
        error: 'imageUrls is required'
      });
    }

    logger.info(`Creating wardrobe items from ${Array.isArray(imageUrls) ? imageUrls.length : 0} images`);

    // Extract features from images using AI service
    const extractedItems = await featureExtractionAI.extractFeatures(imageUrls);

    // Check if any items were successfully extracted
    if (!extractedItems || extractedItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid wardrobe items could be extracted from the provided images'
      });
    }

    logger.info(`Successfully extracted ${extractedItems.length} wardrobe items`);

    // Return extracted items (model layer will handle DB operations)
    return res.status(201).json({
      success: true,
      count: extractedItems.length,
      items: extractedItems
    });

  } catch (error) {
    logger.error(`Create wardrobe item error: ${error.message}`);

    // Handle specific error types
    if (error.message.includes('Minimum 1 image required')) {
      return res.status(400).json({
        success: false,
        error: 'At least 1 image URL is required'
      });
    }

    if (error.message.includes('Maximum 5 images allowed')) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 5 images allowed per request'
      });
    }

    if (error.message.includes('API authentication failed')) {
      return res.status(401).json({
        success: false,
        error: 'AI service authentication failed'
      });
    }

    if (error.message.includes('API quota exceeded')) {
      return res.status(429).json({
        success: false,
        error: 'AI service quota exceeded. Please try again later'
      });
    }

    if (error.message.includes('No valid images could be processed')) {
      return res.status(400).json({
        success: false,
        error: 'No valid images could be processed. Please check the URLs and try again'
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      error: 'Failed to create wardrobe items'
    });
  }
}

/**
 * Handler wrapper for Express routes
 */
export const wardrobeController = {
  createWardrobeItem
};
/**
 * Returns a list of all wardrobe items for the current user, sorted by creation time in descending order (newest first).
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a list of wardrobe items
 */
export const getWardrobeItems = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 10;
		const skip = parseInt(req.query.skip) || 0;

		const items = await WardrobeItem.find({ userId: req.user.userId })
			.sort({
				createdAt: -1,
			})
			.skip(skip)
			.limit(limit)
			.exec();

		const totalCount = await WardrobeItem.countDocuments({
			userId: req.user.userId,
		});

		res.status(200).json({ items, totalCount });
	} catch (error) {
		console.error("Error fetching wardrobe items:", error);
		res.status(500).json({ error: "Server error" });
	}
};
