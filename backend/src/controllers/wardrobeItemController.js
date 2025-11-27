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
    const userId = req.user.userId;

    // Validate request body
    if (!imageUrls) {
      return res.status(400).json({
        success: false,
        error: 'imageUrls is required'
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    logger.info(`Creating wardrobe items for user ${userId} from ${Array.isArray(imageUrls) ? imageUrls.length : 0} images`);

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

    // Add userId to each item and save to database
    const itemsToSave = extractedItems.map(item => ({
      ...item,
      userId
    }));

    const savedItems = await WardrobeItem.bulkCreate(itemsToSave);

    logger.info(`Successfully saved ${savedItems.length} wardrobe items to database`);

    // Return saved items with database IDs
    return res.status(201).json({
      success: true,
      count: savedItems.length,
      items: savedItems.map(item => item.toJSON())
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
 * Returns a list of all wardrobe items for the current user, sorted by creation time in descending order (newest first).
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a list of wardrobe items
 */
export async function getWardrobeItems(req, res) {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    const items = await WardrobeItem.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
      offset: skip
    });

    const totalCount = await WardrobeItem.count({
      where: { userId }
    });

    return res.status(200).json({
      success: true,
      items: items.map(item => item.toJSON()),
      totalCount,
      limit,
      skip
    });

  } catch (error) {
    logger.error(`Get wardrobe items error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch wardrobe items'
    });
  }
}

export const wardrobeController = {
  createWardrobeItem,
  getWardrobeItems
};
