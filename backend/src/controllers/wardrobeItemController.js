import WardrobeItem from "../models/WardrobeItem.js";

export const createWardrobeItem = async (req, res) => {
	try {
		const { imageUrl, description } = req.body;
		console.log("Received image URL:", req.body);
		if (!imageUrl) {
			return res.status(400).json({ error: "Image URL is required" });
		}

		const newItem = new WardrobeItem({ imageUrl, description });
		await newItem.save();

		res.status(201).json({ message: "Wardrobe item saved", item: newItem });
	} catch (error) {
		console.error("Error saving wardrobe item:", error);
		res.status(500).json({ error: "Server error" });
	}
};

export const getWardrobeItems = async (req, res) => {
	try {
		const items = await WardrobeItem.find().sort({ createdAt: -1 });
		res.json(items);
	} catch (error) {
		console.error("Error fetching wardrobe items:", error);
		res.status(500).json({ error: "Server error" });
	}
};
