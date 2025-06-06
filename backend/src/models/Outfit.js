import mongoose from "mongoose";

const OutfitSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		occasion: {
			type: String,
			enum: [
				"casual",
				"formal",
				"traditional",
				"party",
				"office",
				"college",
				"festival",
				"wedding",
				"date",
			],
			required: true,
		},
		weather: {
			type: String,
			enum: ["summer", "winter", "monsoon", "mild", "hot", "cold"],
			required: true,
		},
		season: {
			type: String,
			enum: ["spring", "summer", "monsoon", "autumn", "winter"],
			default: "summer",
		},
		budget: {
			total: {
				type: Number,
				required: true,
				min: 0,
			},
			currency: {
				type: String,
				default: "INR",
			},
		},
		items: [
			{
				category: {
					type: String,
					enum: [
						"top",
						"bottom",
						"footwear",
						"accessories",
						"outerwear",
						"innerwear",
					],
					required: true,
				},
				product: {
					name: {
						type: String,
						required: true,
					},
					brand: String,
					price: {
						type: Number,
						required: true,
						min: 0,
					},
					originalPrice: Number,
					discount: {
						type: Number,
						default: 0,
					},
					imageUrl: String,
					buyLink: String,
					platform: {
						type: String,
						enum: ["myntra", "ajio", "nykaa", "amazon", "flipkart", "local"],
						required: true,
					},
					sku: String,
					color: String,
					size: String,
					material: String,
					inStock: {
						type: Boolean,
						default: true,
					},
				},
				alternatives: [
					{
						name: String,
						brand: String,
						price: Number,
						imageUrl: String,
						buyLink: String,
						platform: String,
					},
				],
			},
		],
		styling: {
			tips: [String],
			accessories: [String],
			colorCombination: String,
			styleNotes: String,
		},
		aiScore: {
			type: Number,
			min: 0,
			max: 1,
			required: true,
		},
		userRating: {
			type: Number,
			min: 1,
			max: 5,
			default: null,
		},
		userFeedback: {
			liked: Boolean,
			comments: String,
			wouldWear: Boolean,
			priceReaction: {
				type: String,
				enum: ["too-expensive", "just-right", "cheap", "good-value"],
			},
		},
		region: {
			type: String,
			enum: ["north", "south", "east", "west", "central", "northeast"],
			required: true,
		},
		festival: {
			name: String,
			type: {
				type: String,
				enum: [
					"diwali",
					"holi",
					"eid",
					"dussehra",
					"navratri",
					"karva-chauth",
					"ganesh-chaturthi",
				],
			},
		},
		tags: [String],
		savedByUser: {
			type: Boolean,
			default: false,
		},
		sharedWithFriends: {
			type: Boolean,
			default: false,
		},
		purchasedItems: [
			{
				itemId: String,
				purchaseDate: Date,
				platform: String,
				actualPrice: Number,
			},
		],
		generationMetadata: {
			algorithm: String,
			version: String,
			processingTime: Number,
			dataSource: String,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Indexes for better performance
OutfitSchema.index({ userId: 1, createdAt: -1 });
OutfitSchema.index({ occasion: 1, weather: 1 });
OutfitSchema.index({ "budget.total": 1 });
OutfitSchema.index({ aiScore: -1 });
OutfitSchema.index({ userRating: -1 });
OutfitSchema.index({ savedByUser: 1 });
OutfitSchema.index({ region: 1 });

// Virtual for total items
OutfitSchema.virtual("totalItems").get(function () {
	return this.items ? this.items.length : 0;
});

// Virtual for average price per item
OutfitSchema.virtual("avgPricePerItem").get(function () {
	if (!this.items || this.items.length === 0) return 0;
	return this.budget.total / this.items.length;
});

// Pre-save middleware
OutfitSchema.pre("save", function (next) {
	// Calculate total budget from items if not provided
	if (!this.budget.total && this.items && this.items.length > 0) {
		this.budget.total = this.items.reduce(
			(sum, item) => sum + (item.product.price || 0),
			0
		);
	}
	next();
});

const Outfit = mongoose.model("Outfit", OutfitSchema);
export default Outfit;
