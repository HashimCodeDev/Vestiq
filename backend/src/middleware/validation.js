const { body, param, query, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			message: "Validation failed",
			errors: errors.array().map((error) => ({
				field: error.param,
				message: error.msg,
				value: error.value,
			})),
		});
	}
	next();
};

// User registration validation
const validateRegistration = [
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address"),

	body("displayName")
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("Display name must be between 2 and 50 characters")
		.matches(/^[a-zA-Z\s]+$/)
		.withMessage("Display name can only contain letters and spaces"),

	body("firebaseUid").notEmpty().withMessage("Firebase UID is required"),

	handleValidationErrors,
];

// User preferences validation
const validatePreferences = [
	body("bodyType")
		.optional()
		.isIn(["slim", "average", "plus-size", "athletic"])
		.withMessage("Invalid body type"),

	body("budgetRange.min")
		.optional()
		.isInt({ min: 200, max: 50000 })
		.withMessage("Minimum budget must be between ₹200 and ₹50,000"),

	body("budgetRange.max")
		.optional()
		.isInt({ min: 200, max: 50000 })
		.withMessage("Maximum budget must be between ₹200 and ₹50,000")
		.custom((value, { req }) => {
			if (
				req.body.budgetRange &&
				req.body.budgetRange.min &&
				value <= req.body.budgetRange.min
			) {
				throw new Error("Maximum budget must be greater than minimum budget");
			}
			return true;
		}),

	body("regionPreference")
		.optional()
		.isIn(["north", "south", "east", "west", "central", "northeast"])
		.withMessage("Invalid region preference"),

	body("stylePreferences")
		.optional()
		.isArray()
		.withMessage("Style preferences must be an array")
		.custom((value) => {
			const validStyles = [
				"casual",
				"formal",
				"traditional",
				"western",
				"ethnic",
				"sporty",
			];
			return value.every((style) => validStyles.includes(style));
		})
		.withMessage("Invalid style preference"),

	handleValidationErrors,
];

// Outfit generation validation
const validateOutfitGeneration = [
	body("occasion")
		.notEmpty()
		.isIn([
			"casual",
			"formal",
			"traditional",
			"party",
			"office",
			"college",
			"festival",
			"wedding",
			"date",
		])
		.withMessage("Valid occasion is required"),

	body("weather")
		.optional()
		.isIn(["summer", "winter", "monsoon", "mild", "hot", "cold"])
		.withMessage("Invalid weather condition"),

	body("budget")
		.optional()
		.isInt({ min: 200, max: 50000 })
		.withMessage("Budget must be between ₹200 and ₹50,000"),

	body("region")
		.optional()
		.isIn(["north", "south", "east", "west", "central", "northeast"])
		.withMessage("Invalid region"),

	handleValidationErrors,
];

// Rating validation
const validateRating = [
	body("rating")
		.isInt({ min: 1, max: 5 })
		.withMessage("Rating must be between 1 and 5"),

	body("feedback")
		.optional()
		.trim()
		.isLength({ max: 500 })
		.withMessage("Feedback must not exceed 500 characters"),

	body("outfitId")
		.notEmpty()
		.isMongoId()
		.withMessage("Valid outfit ID is required"),

	handleValidationErrors,
];

// Product search validation
const validateProductSearch = [
	query("q")
		.optional()
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage("Search query must be between 1 and 100 characters"),

	query("category")
		.optional()
		.isIn(["tops", "bottoms", "dresses", "shoes", "accessories", "traditional"])
		.withMessage("Invalid category"),

	query("minPrice")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Minimum price must be a positive number"),

	query("maxPrice")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Maximum price must be a positive number")
		.custom((value, { req }) => {
			if (
				req.query.minPrice &&
				parseInt(value) <= parseInt(req.query.minPrice)
			) {
				throw new Error("Maximum price must be greater than minimum price");
			}
			return true;
		}),

	query("brand")
		.optional()
		.trim()
		.isLength({ min: 1, max: 50 })
		.withMessage("Brand name must be between 1 and 50 characters"),

	query("size")
		.optional()
		.isIn([
			"XS",
			"S",
			"M",
			"L",
			"XL",
			"XXL",
			"28",
			"30",
			"32",
			"34",
			"36",
			"38",
			"40",
			"42",
		])
		.withMessage("Invalid size"),

	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be a positive integer"),

	query("limit")
		.optional()
		.isInt({ min: 1, max: 50 })
		.withMessage("Limit must be between 1 and 50"),

	handleValidationErrors,
];

// Wishlist validation
const validateWishlist = [
	body("productId")
		.notEmpty()
		.isMongoId()
		.withMessage("Valid product ID is required"),

	handleValidationErrors,
];

// Update profile validation
const validateProfileUpdate = [
	body("displayName")
		.optional()
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("Display name must be between 2 and 50 characters")
		.matches(/^[a-zA-Z\s]+$/)
		.withMessage("Display name can only contain letters and spaces"),

	body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

	body("phoneNumber")
		.optional()
		.matches(/^[6-9]\d{9}$/)
		.withMessage("Please provide a valid Indian phone number"),

	body("dateOfBirth")
		.optional()
		.isISO8601()
		.withMessage("Please provide a valid date")
		.custom((value) => {
			const today = new Date();
			const birthDate = new Date(value);
			const age = today.getFullYear() - birthDate.getFullYear();
			if (age < 13 || age > 100) {
				throw new Error("Age must be between 13 and 100 years");
			}
			return true;
		}),

	handleValidationErrors,
];

// Parameter validation for routes with IDs
const validateId = [
	param("id").isMongoId().withMessage("Invalid ID format"),

	handleValidationErrors,
];

// Address validation
const validateAddress = [
	body("name")
		.trim()
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be between 2 and 100 characters"),

	body("phone")
		.matches(/^[6-9]\d{9}$/)
		.withMessage("Please provide a valid Indian phone number"),

	body("pincode")
		.matches(/^[1-9][0-9]{5}$/)
		.withMessage("Please provide a valid Indian pincode"),

	body("address")
		.trim()
		.isLength({ min: 10, max: 200 })
		.withMessage("Address must be between 10 and 200 characters"),

	body("city")
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("City must be between 2 and 50 characters"),

	body("state")
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage("State must be between 2 and 50 characters"),

	body("isDefault")
		.optional()
		.isBoolean()
		.withMessage("isDefault must be a boolean value"),

	handleValidationErrors,
];

module.exports = {
	handleValidationErrors,
	validateRegistration,
	validatePreferences,
	validateOutfitGeneration,
	validateRating,
	validateProductSearch,
	validateWishlist,
	validateProfileUpdate,
	validateId,
	validateAddress,
};
