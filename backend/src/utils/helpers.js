// Format currency for Indian Rupees
const formatCurrency = (amount) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(amount);
};

// Generate random outfit ID
const generateOutfitId = () => {
	return "outfit_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
};

// Validate Indian phone number
const isValidIndianPhone = (phone) => {
	const phoneRegex = /^[6-9]\d{9}$/;
	return phoneRegex.test(phone);
};

// Validate Indian pincode
const isValidPincode = (pincode) => {
	const pincodeRegex = /^[1-9][0-9]{5}$/;
	return pincodeRegex.test(pincode);
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth) => {
	const today = new Date();
	const birthDate = new Date(dateOfBirth);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
};

// Sanitize user input
const sanitizeInput = (input) => {
	if (typeof input !== "string") return input;

	return input
		.trim()
		.replace(/[<>]/g, "") // Remove potential HTML tags
		.substring(0, 1000); // Limit length
};

// Generate pagination metadata
const getPaginationMeta = (page, limit, total) => {
	const totalPages = Math.ceil(total / limit);

	return {
		page: parseInt(page),
		limit: parseInt(limit),
		total,
		totalPages,
		hasNext: page < totalPages,
		hasPrev: page > 1,
		nextPage: page < totalPages ? page + 1 : null,
		prevPage: page > 1 ? page - 1 : null,
	};
};

// Convert size format (International to Indian)
const convertSizeFormat = (
	size,
	fromFormat = "international",
	toFormat = "indian"
) => {
	const sizeMap = {
		XS: "28",
		S: "30",
		M: "32",
		L: "34",
		XL: "36",
		XXL: "38",
	};

	if (fromFormat === "international" && toFormat === "indian") {
		return sizeMap[size] || size;
	}

	if (fromFormat === "indian" && toFormat === "international") {
		const reverseMap = Object.fromEntries(
			Object.entries(sizeMap).map(([k, v]) => [v, k])
		);
		return reverseMap[size] || size;
	}

	return size;
};

// Extract color from product name/description
const extractColors = (text) => {
	const colorRegex =
		/(black|white|red|blue|green|yellow|pink|purple|orange|brown|grey|gray|navy|maroon|beige|cream|gold|silver)/gi;
	const matches = text.match(colorRegex);
	return matches ?
			[...new Set(matches.map((color) => color.toLowerCase()))]
		:	[];
};

// Check if outfit is appropriate for weather
const isWeatherAppropriate = (outfit, weather) => {
	const summerItems = ["cotton", "linen", "shorts", "t-shirt", "sandals"];
	const winterItems = ["wool", "leather", "jacket", "boots", "sweater"];
	const monsoonItems = ["waterproof", "umbrella", "rain coat", "quick-dry"];

	const outfitText = JSON.stringify(outfit).toLowerCase();

	switch (weather) {
		case "summer":
		case "hot":
			return summerItems.some((item) => outfitText.includes(item));
		case "winter":
		case "cold":
			return winterItems.some((item) => outfitText.includes(item));
		case "monsoon":
			return monsoonItems.some((item) => outfitText.includes(item));
		default:
			return true;
	}
};

// Generate discount percentage
const calculateDiscount = (originalPrice, salePrice) => {
	if (originalPrice <= salePrice) return 0;
	return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Validate email address
const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

// Generate slug from title
const generateSlug = (text) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove special characters
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/-+/g, "-") // Replace multiple hyphens with single
		.replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

// Format file size
const formatFileSize = (bytes) => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Check if string contains profanity (basic check)
const containsProfanity = (text) => {
	const profanityList = ["badword1", "badword2"]; // Add actual profanity words as needed
	const cleanText = text.toLowerCase().replace(/[^a-z]/g, "");
	return profanityList.some((word) => cleanText.includes(word));
};

// Get Indian state from pincode (first digit mapping)
const getStateFromPincode = (pincode) => {
	const stateMap = {
		1: "Delhi",
		2: "Haryana/Himachal Pradesh",
		3: "Punjab/Rajasthan",
		4: "Gujarat/Rajasthan",
		5: "Uttar Pradesh/Uttarakhand",
		6: "Haryana/Punjab/Rajasthan",
		7: "West Bengal/Odisha",
		8: "Bihar/Jharkhand",
		9: "Maharashtra/Goa",
	};

	if (!isValidPincode(pincode)) return null;
	return stateMap[pincode.charAt(0)] || "Unknown";
};

// Generate random color hex
const generateRandomColor = () => {
	return (
		"#" +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")
	);
};

// Check if outfit colors complement each other
const areColorsComplementary = (color1, color2) => {
	const complementaryPairs = [
		["red", "green"],
		["blue", "orange"],
		["yellow", "purple"],
		["black", "white"],
		["navy", "beige"],
	];

	return complementaryPairs.some(
		(pair) =>
			pair.includes(color1.toLowerCase()) && pair.includes(color2.toLowerCase())
	);
};

module.exports = {
	formatCurrency,
	generateOutfitId,
	isValidIndianPhone,
	isValidPincode,
	calculateAge,
	sanitizeInput,
	getPaginationMeta,
	convertSizeFormat,
	extractColors,
	isWeatherAppropriate,
	calculateDiscount,
	isValidEmail,
	generateSlug,
	formatFileSize,
	containsProfanity,
	getStateFromPincode,
	generateRandomColor,
	areColorsComplementary,
};
