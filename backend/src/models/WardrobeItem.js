import mongoose from "mongoose";

const FeaturesSchema = new mongoose.Schema(
	{
		image_id: { type: String, required: true },
		class_type: {
			type: String,
			enum: ["upper", "lower", "full"],
			required: true,
		},
		type: { type: String, required: true },
		color: { type: String, required: true },
		texture: { type: String, required: true },
		collar: { type: String, required: true },
		sleeves: { type: String, required: true },
		pattern: { type: String, required: true },
		fit: { type: String, required: true },
		size: { type: String, default: null },
	},
	{ _id: false }
); // Disable _id for subdocument

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

	features: FeaturesSchema,

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
