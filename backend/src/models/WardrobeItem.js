import mongoose from "mongoose";

const WardrobeItemSchema = new mongoose.Schema({
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
