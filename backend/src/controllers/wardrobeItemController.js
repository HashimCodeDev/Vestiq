import axios from "axios";
import WardrobeItem from "../models/WardrobeItem.js";

/**
 * Creates a new wardrobe item for the current user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Sends a JSON response containing a success message or an error message
 */
export const createWardrobeItem = async (req, res) => {
	try {
		let features, description;
		const { imageUrl } = req.body;
		const url = process.env.FEATURE_EXTRACTION_URL || "http://localhost:8000";
		console.log("Received image URL:", req.body);
		if (!imageUrl) {
			return res.status(400).json({ error: "Image URL is required" });
		}

		const response = await axios.post(url, { imageUrl });

		if (response.data.error) {
			return res.status(400).json({ error: response.data.error });
		}

		if (response.data?.analysis_data) {
			features = response.data.analysis_data.dress_item;
			description = response.data.analysis_data.description;

			console.log("🧵 Features:", features);
			console.log("📜 Description:", description);
		} else {
			console.error("❌ Invalid response format:", response.data);
		}

		const newItem = new WardrobeItem({
			userId: req.user.userId,
			imageUrl,
			features,
			description,
		});
		await newItem.save();

		res.status(201).json({ message: "Wardrobe item saved", item: newItem });
	} catch (error) {
		console.error("Error saving wardrobe item:", error);
		res.status(500).json({ error: "Server error" });
	}
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
