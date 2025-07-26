import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		displayName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		profilePicture: {
			type: String,
			default: null,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		lastUploaded: {
			type: Date,
			default: null,
		},
		isNewUser: {
			type: Boolean,
			default: true,
		},
		preferences: {
			bodyType: {
				type: String,
				enum: ["slim", "average", "plus-size", "athletic"],
				default: "average",
			},
			budgetRange: {
				min: {
					type: Number,
					default: 500,
					min: 200,
				},
				max: {
					type: Number,
					default: 3000,
					max: 50000,
				},
			},
			stylePreferences: [
				{
					type: String,
					enum: [
						"casual",
						"formal",
						"traditional",
						"western",
						"ethnic",
						"sporty",
					],
				},
			],
			regionPreference: {
				type: String,
				enum: ["north", "south", "east", "west", "central", "northeast"],
				default: "north",
			},
			languagePreference: {
				type: String,
				enum: ["en", "hi", "ta", "te", "bn", "mr", "gu"],
				default: "en",
			},
			occasionTypes: [
				{
					type: String,
					enum: [
						"college",
						"office",
						"party",
						"casual",
						"festival",
						"wedding",
						"date",
					],
				},
			],
			sizes: {
				top: {
					type: String,
					enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
					default: "M",
				},
				bottom: {
					type: String,
					enum: ["26", "28", "30", "32", "34", "36", "38", "40", "42"],
					default: "32",
				},
				footwear: {
					type: Number,
					min: 5,
					max: 12,
					default: 8,
				},
			},
			colorPreferences: [
				{
					type: String,
					enum: [
						"black",
						"white",
						"blue",
						"red",
						"green",
						"yellow",
						"pink",
						"purple",
						"orange",
						"brown",
						"grey",
					],
				},
			],
		},
		wardrobe: [
			{
				itemId: {
					type: String,
					required: true,
				},
				category: {
					type: String,
					enum: [
						"shirt",
						"tshirt",
						"jeans",
						"trousers",
						"dress",
						"kurta",
						"saree",
						"shoes",
						"accessories",
					],
					required: true,
				},
				subcategory: String,
				color: String,
				brand: String,
				price: {
					type: Number,
					min: 0,
				},
				imageUrl: String,
				purchaseDate: {
					type: Date,
					default: Date.now,
				},
				lastWorn: Date,
				tags: [String],
			},
		],
		location: {
			city: {
				type: String,
				trim: true,
			},
			state: {
				type: String,
				trim: true,
			},
			pincode: {
				type: String,
				match: /^[1-9][0-9]{5}$/,
			},
			coordinates: {
				latitude: Number,
				longitude: Number,
			},
		},
		stats: {
			totalOutfitsGenerated: {
				type: Number,
				default: 0,
			},
			totalOutfitsSaved: {
				type: Number,
				default: 0,
			},
			averageRating: {
				type: Number,
				default: 0,
			},
			lastActive: {
				type: Date,
				default: Date.now,
			},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Indexes for better query performance
UserSchema.index({ "location.city": 1 });
UserSchema.index({
	"preferences.budgetRange.min": 1,
	"preferences.budgetRange.max": 1,
});
UserSchema.index({ createdAt: -1 });

// Virtual for full name
UserSchema.virtual("wardrobeCount").get(function () {
	return this.wardrobe ? this.wardrobe.length : 0;
});

// Pre-save middleware
UserSchema.pre("save", function (next) {
	this.stats.lastActive = new Date();
	next();
});

const User = mongoose.model("User", UserSchema);
export default User;
