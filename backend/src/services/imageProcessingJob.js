import cron from "node-cron";
import axios from "axios";
import User from "../models/User.js";
import WardrobeItem from "../models/WardrobeItem.js";
import Outfit from "../models/Outfit.js";
import logger from "../utils/logger.js";

const getPendingItems = async (userId) => {
	return await WardrobeItem.find({
		userId,
		features: { $exists: false },
	}).select("imageUrl _id");
};

const updateItemFeatures = async (imageUrl, features) => {
	await WardrobeItem.findOneAndUpdate(
		{ imageUrl },
		{ features },
		{ new: true }
	);
};

const processStaleUsers = async () => {
	try {
		const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);

		const staleUsers = await User.find({
			lastUploaded: { $lt: oneMinuteAgo, $ne: null },
		}).select("userId lastUploaded");

		logger.info(`Found ${staleUsers.length} users with stale uploads`);

		for (const user of staleUsers) {
			try {
				const pendingItems = await getPendingItems(user.userId);

				if (pendingItems.length === 0) {
					logger.info(`No pending images for user ${user.userId}`);
					continue;
				}

				const response = await axios.post(
					process.env.FEATURE_EXTRACTION_URL || "http://localhost:8000/analyze",
					{
						imageUrls: pendingItems.map((item) => item.imageUrl),
					},
					{
						timeout: 30000,
						headers: { "Content-Type": "application/json" },
					}
				);

				// Update items with extracted features
				if (response.data && response.data.results) {
					for (const result of response.data.results) {
						await updateItemFeatures(
							result.image_url,
							result.analysis_data.dress_item
						);
					}

					// Analyze fashion match for complete wardrobe
					const allItems = await WardrobeItem.find({ userId: user.userId, features: { $exists: true } }).select('features _id');
					
					if (allItems.length >= 2) {
						const wardrobeItems = allItems.map(item => ({
							id: item._id.toString(),
							...item.features
						}));

						const matchResponse = await axios.post(
							`${process.env.FEATURE_EXTRACTION_URL || "http://localhost:8000"}/analyze-fashion-match`,
							{
								wardrobeItems,
								context: {
									mood: "confident",
									weather: "sunny",
									occasion: "casual"
								}
							},
							{ timeout: 30000, headers: { "Content-Type": "application/json" } }
						);

						if (matchResponse.data) {
							const outfitData = {
								userId: user.userId,
								occasion: "casual",
								weather: "sunny",
								budget: { total: 0 },
								aiScore: 0.8,
								region: "north",
								items: [],
								fashionMatches: matchResponse.data
							};
							await new Outfit(outfitData).save();
						}
					}
				}

				logger.info(
					`Successfully processed ${pendingItems.length} images for user ${user.userId}`,
					{
						userId: user.userId,
						imageCount: pendingItems.length,
						responseStatus: response.status,
					}
				);
			} catch (userError) {
				logger.error(`Failed to process user ${user.userId}:`, {
					userId: user.userId,
					error: userError.message,
					stack: userError.stack,
				});
			}
		}
	} catch (error) {
		logger.error("Error in processStaleUsers job:", {
			error: error.message,
			stack: error.stack,
		});
	}
};

export const startImageProcessingJob = () => {
	cron.schedule("* * * * *", processStaleUsers);
	logger.info("Image processing job started - running every minute");
};

export { processStaleUsers };
