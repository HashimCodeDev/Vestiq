import User from '../models/User.js';
import logger from './logger.js';

/**
 * Updates the lastUploaded timestamp for a user
 * Call this function whenever a user uploads new images
 */
export const updateUserLastUploaded = async (userId) => {
	try {
		await User.findOneAndUpdate(
			{ userId },
			{ lastUploaded: new Date() },
			{ new: true }
		);
		logger.info(`Updated lastUploaded timestamp for user ${userId}`);
	} catch (error) {
		logger.error(`Failed to update lastUploaded for user ${userId}:`, error);
		throw error;
	}
};