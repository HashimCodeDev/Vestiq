const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
			index: true,
		},
		styleProfile: {
			primaryStyle: {
				type: String,
				enum: [
					"minimal",
					"trendy",
					"classic",
					"bohemian",
					"edgy",
					"romantic",
					"sporty",
				],
				required: true,
			},
			secondaryStyles: [
				{
					type: String,
					enum: [
						"minimal",
						"trendy",
						"classic",
						"bohemian",
						"edgy",
						"romantic",
						"sporty",
					],
				},
			],
			avoidStyles: [String],
			confidenceLevel: {
				type: Number,
				min: 1,
				max: 10,
				default: 5,
			},
		},
		colorAnalysis: {
			favoriteColors: [String],
			avoidColors: [String],
			skinTone: {
				type: String,
				enum: ["fair", "medium", "dark", "very-dark"],
			},
			colorSeason: {
				type: String,
				enum: ["spring", "summer", "autumn", "winter"],
			},
		},
		bodyMeasurements: {
			height: {
				value: Number,
				unit: {
					type: String,
					enum: ["cm", "ft"],
					default: "cm",
				},
			},
			weight: {
				value: Number,
				unit: {
					type: String,
					enum: ["kg", "lbs"],
					default: "kg",
				},
			},
			bodyShape: {
				type: String,
				enum: ["pear", "apple", "hourglass", "rectangle", "inverted-triangle"],
			},
		},
		lifestyle: {
			occupation: {
				type: String,
				enum: [
					"student",
					"professional",
					"freelancer",
					"homemaker",
					"entrepreneur",
				],
			},
			workEnvironment: {
				type: String,
				enum: [
					"casual",
					"business-casual",
					"formal",
					"creative",
					"work-from-home",
				],
			},
			socialActivity: {
				type: String,
				enum: ["low", "moderate", "high"],
				default: "moderate",
			},
			exerciseFrequency: {
				type: String,
				enum: ["never", "rarely", "sometimes", "regularly", "daily"],
				default: "sometimes",
			},
		},
		shopping: {
			preferredBrands: [String],
			avoidBrands: [String],
			maxBudgetPerItem: {
				top: Number,
				bottom: Number,
				footwear: Number,
				accessories: Number,
			},
			shoppingFrequency: {
				type: String,
				enum: ["weekly", "monthly", "quarterly", "yearly"],
				default: "monthly",
			},
			preferredPlatforms: [
				{
					type: String,
					enum: [
						"myntra",
						"ajio",
						"nykaa",
						"amazon",
						"flipkart",
						"local-stores",
						"brand-websites",
					],
				},
			],
		},
		cultural: {
			religiousConsiderations: [String],
			culturalEvents: [String],
			modestClothing: {
				type: Boolean,
				default: false,
			},
			traditionalWear: {
				frequency: {
					type: String,
					enum: ["never", "festivals-only", "weekly", "daily"],
					default: "festivals-only",
				},
				types: [String],
			},
		},
		notifications: {
			outfitSuggestions: {
				type: Boolean,
				default: true,
			},
			weatherAlerts: {
				type: Boolean,
				default: true,
			},
			salesAlerts: {
				type: Boolean,
				default: false,
			},
			frequency: {
				type: String,
				enum: ["daily", "weekly", "monthly"],
				default: "weekly",
			},
		},
		privacy: {
			shareOutfits: {
				type: Boolean,
				default: false,
			},
			allowDataCollection: {
				type: Boolean,
				default: true,
			},
			profileVisibility: {
				type: String,
				enum: ["public", "friends", "private"],
				default: "private",
			},
		},
	},
	{
		timestamps: true,
	}
);

// Indexes
PreferenceSchema.index({ userId: 1 });
PreferenceSchema.index({ "styleProfile.primaryStyle": 1 });
PreferenceSchema.index({ "lifestyle.occupation": 1 });

module.exports = mongoose.model("Preference", PreferenceSchema);
