// Outfit recommendation engine utilities for OutFitly

// Calculate style compatibility score between two items
const calculateStyleCompatibility = (item1, item2) => {
	let score = 0;
	const maxScore = 100;

	// Color compatibility (30% weight)
	if (areColorsCompatible(item1.color, item2.color)) {
		score += 30;
	}

	// Style compatibility (25% weight)
	if (areStylesCompatible(item1.style, item2.style)) {
		score += 25;
	}

	// Occasion compatibility (20% weight)
	if (item1.occasion === item2.occasion) {
		score += 20;
	}

	// Brand/price tier compatibility (15% weight)
	if (arePriceTiersCompatible(item1.price, item2.price)) {
		score += 15;
	}

	// Season compatibility (10% weight)
	if (
		item1.season === item2.season ||
		item1.season === "all-season" ||
		item2.season === "all-season"
	) {
		score += 10;
	}

	return Math.min(score, maxScore);
};

// Check if colors are compatible
const areColorsCompatible = (color1, color2) => {
	const compatiblePairs = {
		black: ["white", "red", "blue", "yellow", "pink", "green"],
		white: ["black", "blue", "red", "green", "pink", "brown"],
		blue: ["white", "cream", "yellow", "pink", "grey"],
		red: ["black", "white", "cream", "gold"],
		green: ["white", "cream", "brown", "gold"],
		brown: ["cream", "white", "gold", "green"],
		grey: ["white", "black", "blue", "pink"],
		navy: ["white", "cream", "pink", "yellow"],
	};

	return (
		compatiblePairs[color1]?.includes(color2) ||
		compatiblePairs[color2]?.includes(color1) ||
		color1 === color2
	);
};

// Check if styles are compatible
const areStylesCompatible = (style1, style2) => {
	const styleGroups = {
		formal: ["formal", "business", "smart-casual"],
		casual: ["casual", "smart-casual", "streetwear"],
		ethnic: ["ethnic", "fusion", "traditional"],
		sporty: ["sporty", "athleisure", "casual"],
		party: ["party", "formal", "glam"],
		bohemian: ["bohemian", "casual", "fusion"],
	};

	return (
		styleGroups[style1]?.includes(style2) ||
		styleGroups[style2]?.includes(style1)
	);
};

// Check if price tiers are compatible
const arePriceTiersCompatible = (price1, price2) => {
	const getPriceTier = (price) => {
		if (price < 1000) return "budget";
		if (price < 3000) return "mid";
		if (price < 8000) return "premium";
		return "luxury";
	};

	const tier1 = getPriceTier(price1);
	const tier2 = getPriceTier(price2);

	// Same tier or adjacent tiers are compatible
	const tierOrder = ["budget", "mid", "premium", "luxury"];
	const index1 = tierOrder.indexOf(tier1);
	const index2 = tierOrder.indexOf(tier2);

	return Math.abs(index1 - index2) <= 1;
};

// Generate outfit recommendations based on user preferences
const generateOutfitRecommendations = (
	userProfile,
	availableItems,
	occasion = "casual"
) => {
	const recommendations = [];

	// Filter items by user preferences
	const filteredItems = availableItems.filter((item) => {
		return (
			item.size === userProfile.size &&
			(!userProfile.preferredColors ||
				userProfile.preferredColors.includes(item.color)) &&
			(!userProfile.budgetRange ||
				(item.price >= userProfile.budgetRange.min &&
					item.price <= userProfile.budgetRange.max))
		);
	});

	// Group items by category
	const itemsByCategory = groupItemsByCategory(filteredItems);

	// Generate combinations
	const combinations = generateOutfitCombinations(itemsByCategory, occasion);

	// Score and sort combinations
	combinations.forEach((combo) => {
		combo.score = calculateOutfitScore(combo, userProfile, occasion);
	});

	return combinations.sort((a, b) => b.score - a.score).slice(0, 10); // Return top 10 recommendations
};

// Group items by category
const groupItemsByCategory = (items) => {
	return items.reduce((groups, item) => {
		const category = item.category;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(item);
		return groups;
	}, {});
};

// Generate outfit combinations
const generateOutfitCombinations = (itemsByCategory, occasion) => {
	const combinations = [];
	const outfitTemplates = getOutfitTemplates(occasion);

	outfitTemplates.forEach((template) => {
		const combo = {};
		let canCreateOutfit = true;

		template.categories.forEach((category) => {
			if (itemsByCategory[category] && itemsByCategory[category].length > 0) {
				// Pick best item from category based on popularity/rating
				combo[category] = itemsByCategory[category].sort(
					(a, b) => (b.rating || 0) - (a.rating || 0)
				)[0];
			} else {
				canCreateOutfit = false;
			}
		});

		if (canCreateOutfit) {
			combinations.push({
				items: combo,
				template: template.name,
				occasion,
			});
		}
	});

	return combinations;
};

// Get outfit templates for different occasions
const getOutfitTemplates = (occasion) => {
	const templates = {
		casual: [
			{ name: "T-shirt & Jeans", categories: ["top", "bottom", "footwear"] },
			{
				name: "Casual Dress",
				categories: ["dress", "footwear", "accessories"],
			},
			{ name: "Shirt & Chinos", categories: ["shirt", "bottom", "footwear"] },
		],
		formal: [
			{
				name: "Business Suit",
				categories: ["suit", "shirt", "footwear", "accessories"],
			},
			{
				name: "Formal Dress",
				categories: ["dress", "blazer", "footwear", "accessories"],
			},
			{
				name: "Shirt & Trousers",
				categories: ["shirt", "trousers", "footwear"],
			},
		],
		party: [
			{
				name: "Cocktail Dress",
				categories: ["dress", "footwear", "accessories", "jewelry"],
			},
			{
				name: "Party Shirt",
				categories: ["shirt", "jeans", "footwear", "accessories"],
			},
		],
		ethnic: [
			{ name: "Kurta Set", categories: ["kurta", "bottom", "footwear"] },
			{ name: "Saree", categories: ["saree", "blouse", "footwear", "jewelry"] },
			{
				name: "Lehenga",
				categories: ["lehenga", "choli", "dupatta", "footwear", "jewelry"],
			},
		],
	};

	return templates[occasion] || templates["casual"];
};

// Calculate overall outfit score
const calculateOutfitScore = (outfit, userProfile, occasion) => {
	let score = 0;
	const items = Object.values(outfit.items);

	// Base compatibility score between items
	for (let i = 0; i < items.length; i++) {
		for (let j = i + 1; j < items.length; j++) {
			score += calculateStyleCompatibility(items[i], items[j]);
		}
	}

	// Occasion appropriateness (bonus)
	const occasionBonus =
		(
			items.every(
				(item) => item.occasion === occasion || item.occasion === "versatile"
			)
		) ?
			20
		:	0;

	// User preference bonus
	const preferenceBonus = calculateUserPreferenceBonus(items, userProfile);

	// Trending bonus
	const trendBonus = items.some((item) => item.trending) ? 10 : 0;

	return Math.round(
		score / ((items.length * (items.length - 1)) / 2) +
			occasionBonus +
			preferenceBonus +
			trendBonus
	);
};

// Calculate user preference bonus
const calculateUserPreferenceBonus = (items, userProfile) => {
	let bonus = 0;

	items.forEach((item) => {
		// Preferred brand bonus
		if (userProfile.preferredBrands?.includes(item.brand)) {
			bonus += 5;
		}

		// Style preference bonus
		if (userProfile.preferredStyles?.includes(item.style)) {
			bonus += 5;
		}

		// Size fit bonus (perfect fit gets bonus)
		if (item.size === userProfile.size) {
			bonus += 3;
		}
	});

	return Math.min(bonus, 25); // Cap at 25 points
};

// Get seasonal recommendations
const getSeasonalRecommendations = (season, location = "mumbai") => {
	const seasonalGuide = {
		summer: {
			fabrics: ["cotton", "linen", "chiffon", "georgette"],
			colors: ["white", "light blue", "pastels", "bright colors"],
			avoid: ["heavy fabrics", "dark colors", "wool", "leather"],
		},
		monsoon: {
			fabrics: ["quick-dry", "synthetic", "water-resistant"],
			colors: ["dark colors", "prints", "bright colors"],
			avoid: ["white", "light colors", "heavy cotton", "suede"],
		},
		winter: {
			fabrics: ["wool", "cashmere", "fleece", "denim"],
			colors: ["dark colors", "jewel tones", "earth tones"],
			avoid: ["very light fabrics", "sleeveless", "shorts"],
		},
	};

	return seasonalGuide[season] || seasonalGuide["summer"];
};

// Analyze user's wardrobe and suggest gaps
const analyzeWardrobeGaps = (userWardrobe, lifestyle) => {
	const essentials = {
		professional: [
			"formal shirts",
			"trousers",
			"blazer",
			"formal shoes",
			"belt",
		],
		casual: ["jeans", "casual shirts", "sneakers", "t-shirts", "casual dress"],
		social: ["party wear", "accessories", "formal footwear", "jewelry"],
		ethnic: ["kurta", "ethnic wear", "traditional footwear"],
	};

	const gaps = [];
	const userCategories = userWardrobe.map((item) => item.category);

	Object.keys(essentials).forEach((lifestyle_type) => {
		if (lifestyle.includes(lifestyle_type)) {
			essentials[lifestyle_type].forEach((essential) => {
				if (!userCategories.includes(essential)) {
					gaps.push({
						category: essential,
						priority: getPriorityLevel(essential, lifestyle_type),
						reason: `Essential for ${lifestyle_type} lifestyle`,
					});
				}
			});
		}
	});

	return gaps.sort((a, b) => b.priority - a.priority);
};

// Get priority level for wardrobe gaps
const getPriorityLevel = (item, lifestyle) => {
	const priorityMap = {
		"formal shirts": 9,
		jeans: 9,
		sneakers: 8,
		blazer: 7,
		accessories: 6,
		"ethnic wear": 5,
	};

	return priorityMap[item] || 5;
};

module.exports = {
	calculateStyleCompatibility,
	areColorsCompatible,
	areStylesCompatible,
	generateOutfitRecommendations,
	calculateOutfitScore,
	getSeasonalRecommendations,
	analyzeWardrobeGaps,
	groupItemsByCategory,
	generateOutfitCombinations,
};
