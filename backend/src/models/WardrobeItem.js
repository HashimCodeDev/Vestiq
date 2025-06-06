import mongoose from "mongoose";

const WardrobeItemSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		index: true,
	},
	category: {
		type: String,
		enum: ["top", "bottom", "dress", "outerwear", "footwear", "accessories"],
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const WardrobeItem =
	mongoose.models.WardrobeItem ||
	mongoose.model("WardrobeItem", WardrobeItemSchema);

export default WardrobeItem;
