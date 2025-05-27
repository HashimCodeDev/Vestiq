// Weather integration utilities for OutFitly
const axios = require("axios"); // npm install axios

// Indian cities with their coordinates for weather API
const INDIAN_CITIES = {
	// Format: cityName: { lat: latitude, lon: longitude, state: "State Name" }
	kochi: { lat: 9.9312, lon: 76.2673, state: "Kerala" },
	mumbai: { lat: 19.076, lon: 72.8777, state: "Maharashtra" },
	delhi: { lat: 28.7041, lon: 77.1025, state: "Delhi" },
	bangalore: { lat: 12.9716, lon: 77.5946, state: "Karnataka" },
	hyderabad: { lat: 17.385, lon: 78.4867, state: "Telangana" },
	ahmedabad: { lat: 23.0225, lon: 72.5714, state: "Gujarat" },
	chennai: { lat: 13.0827, lon: 80.2707, state: "Tamil Nadu" },
	kolkata: { lat: 22.5726, lon: 88.3639, state: "West Bengal" },
	pune: { lat: 18.5204, lon: 73.8567, state: "Maharashtra" },
	jaipur: { lat: 26.9124, lon: 75.7873, state: "Rajasthan" },
	surat: { lat: 21.1702, lon: 72.8311, state: "Gujarat" },
	lucknow: { lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh" },
	kanpur: { lat: 26.4499, lon: 80.3319, state: "Uttar Pradesh" },
	nagpur: { lat: 21.1458, lon: 79.0882, state: "Maharashtra" },
	indore: { lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh" },
	thane: { lat: 19.2183, lon: 72.9781, state: "Maharashtra" },
	bhopal: { lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
	visakhapatnam: { lat: 17.6868, lon: 83.2185, state: "Andhra Pradesh" },
	pimpri: { lat: 18.6298, lon: 73.7997, state: "Maharashtra" },
	patna: { lat: 25.5941, lon: 85.1376, state: "Bihar" },
	vadodara: { lat: 22.3072, lon: 73.1812, state: "Gujarat" },
	ghaziabad: { lat: 28.6692, lon: 77.4538, state: "Uttar Pradesh" },
	ludhiana: { lat: 30.901, lon: 75.8573, state: "Punjab" },
	agra: { lat: 27.1767, lon: 78.0081, state: "Uttar Pradesh" },
	nashik: { lat: 19.9975, lon: 73.7898, state: "Maharashtra" },
	faridabad: { lat: 28.4089, lon: 77.3178, state: "Haryana" },
	meerut: { lat: 28.9845, lon: 77.7064, state: "Uttar Pradesh" },
	rajkot: { lat: 22.3039, lon: 70.8022, state: "Gujarat" },
	kalyan: { lat: 19.2437, lon: 73.1355, state: "Maharashtra" },
	vasai: { lat: 19.4912, lon: 72.8054, state: "Maharashtra" },
	varanasi: { lat: 25.3176, lon: 82.9739, state: "Uttar Pradesh" },
	srinagar: { lat: 34.0837, lon: 74.7973, state: "Jammu and Kashmir" },
	aurangabad: { lat: 19.8762, lon: 75.3433, state: "Maharashtra" },
	dhanbad: { lat: 23.7957, lon: 86.4304, state: "Jharkhand" },
	amritsar: { lat: 31.634, lon: 74.8723, state: "Punjab" },
	"navi mumbai": { lat: 19.033, lon: 73.0297, state: "Maharashtra" },
	allahabad: { lat: 25.4358, lon: 81.8463, state: "Uttar Pradesh" },
	ranchi: { lat: 23.3441, lon: 85.3096, state: "Jharkhand" },
	howrah: { lat: 22.5958, lon: 88.2636, state: "West Bengal" },
	coimbatore: { lat: 11.0168, lon: 76.9558, state: "Tamil Nadu" },
	jabalpur: { lat: 23.1815, lon: 79.9864, state: "Madhya Pradesh" },
	gwalior: { lat: 26.2183, lon: 78.1828, state: "Madhya Pradesh" },
};

// Weather API configuration (using OpenWeatherMap as example)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";
const WEATHER_API_BASE = "https://api.openweathermap.org/data/3.0";

// Get current weather for Indian city
const getCurrentWeather = async (cityName) => {
	try {
		const city = INDIAN_CITIES[cityName.toLowerCase()];
		if (!city) {
			throw new Error(`Weather data not available for ${cityName}`);
		}

		const response = await axios.get(`${WEATHER_API_BASE}/weather`, {
			params: {
				lat: city.lat,
				lon: city.lon,
				appid: WEATHER_API_KEY,
				units: "metric",
			},
		});

		const weather = response.data;

		return {
			success: true,
			data: {
				city: cityName,
				state: city.state,
				temperature: Math.round(weather.main.temp),
				feelsLike: Math.round(weather.main.feels_like),
				humidity: weather.main.humidity,
				condition: weather.weather[0].main.toLowerCase(),
				description: weather.weather[0].description,
				windSpeed: weather.wind.speed,
				visibility: weather.visibility / 1000, // Convert to km
				uvIndex: null, // Would need additional API call
				timestamp: new Date(),
			},
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Get weather forecast for next 5 days
const getWeatherForecast = async (cityName, days = 5) => {
	try {
		const city = INDIAN_CITIES[cityName.toLowerCase()];
		if (!city) {
			throw new Error(`Weather data not available for ${cityName}`);
		}

		const response = await axios.get(`${WEATHER_API_BASE}/forecast`, {
			params: {
				lat: city.lat,
				lon: city.lon,
				appid: WEATHER_API_KEY,
				units: "metric",
			},
		});

		const forecast = response.data.list
			.filter((_, index) => index % 8 === 0) // Get one reading per day
			.slice(0, days)
			.map((day) => ({
				date: new Date(day.dt * 1000).toISOString().split("T")[0],
				temperature: {
					min: Math.round(day.main.temp_min),
					max: Math.round(day.main.temp_max),
					avg: Math.round(day.main.temp),
				},
				condition: day.weather[0].main.toLowerCase(),
				description: day.weather[0].description,
				humidity: day.main.humidity,
				windSpeed: day.wind.speed,
				rainChance: day.pop * 100, // Probability of precipitation
			}));

		return {
			success: true,
			data: {
				city: cityName,
				state: city.state,
				forecast,
			},
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Get outfit recommendations based on weather
const getWeatherBasedOutfitRecommendations = (
	weatherData,
	occasion = "casual"
) => {
	const { temperature, condition, humidity, windSpeed } = weatherData;

	const recommendations = {
		fabrics: [],
		colors: [],
		styles: [],
		accessories: [],
		footwear: [],
		avoid: [],
	};

	// Temperature based recommendations
	if (temperature >= 35) {
		// Very Hot
		recommendations.fabrics.push("cotton", "linen", "bamboo", "modal");
		recommendations.colors.push("white", "light colors", "pastels");
		recommendations.styles.push(
			"loose fit",
			"sleeveless",
			"shorts",
			"midi dresses"
		);
		recommendations.accessories.push("sunglasses", "hat", "lightweight scarf");
		recommendations.footwear.push(
			"sandals",
			"breathable sneakers",
			"canvas shoes"
		);
		recommendations.avoid.push(
			"dark colors",
			"heavy fabrics",
			"full sleeves",
			"leather"
		);
	} else if (temperature >= 25) {
		// Warm
		recommendations.fabrics.push("cotton", "cotton blends", "chiffon");
		recommendations.colors.push("light colors", "bright colors", "prints");
		recommendations.styles.push("casual wear", "t-shirts", "light shirts");
		recommendations.accessories.push("sunglasses", "light jewelry");
		recommendations.footwear.push("sneakers", "loafers", "ballet flats");
	} else if (temperature >= 15) {
		// Pleasant
		recommendations.fabrics.push("cotton", "denim", "light wool");
		recommendations.colors.push("any colors", "earth tones");
		recommendations.styles.push("layers", "light jackets", "cardigans");
		recommendations.accessories.push("light scarves", "watches");
		recommendations.footwear.push("any comfortable shoes", "boots");
	} else {
		// Cool/Cold
		recommendations.fabrics.push("wool", "fleece", "cashmere", "heavy cotton");
		recommendations.colors.push("dark colors", "jewel tones");
		recommendations.styles.push("layers", "sweaters", "jackets", "long pants");
		recommendations.accessories.push("scarves", "gloves", "beanies");
		recommendations.footwear.push("boots", "closed shoes");
		recommendations.avoid.push("sleeveless", "shorts", "light fabrics");
	}

	// Condition based recommendations
	switch (condition) {
		case "rain":
		case "drizzle":
		case "thunderstorm":
			recommendations.accessories.push("umbrella", "waterproof bag");
			recommendations.footwear = ["waterproof shoes", "rain boots"];
			recommendations.fabrics.push("quick-dry", "water-resistant");
			recommendations.avoid.push("white clothes", "suede", "canvas shoes");
			break;

		case "clear":
		case "sunny":
			recommendations.accessories.push("sunglasses", "sun hat", "SPF clothing");
			break;

		case "clouds":
			// No specific additions for cloudy weather
			break;

		case "mist":
		case "fog":
			recommendations.styles.push("bright colors for visibility");
			break;
	}

	// Humidity based recommendations
	if (humidity > 80) {
		recommendations.fabrics.push("moisture-wicking", "breathable fabrics");
		recommendations.avoid.push("synthetic fabrics", "tight fitting clothes");
	}

	// Wind based recommendations
	if (windSpeed > 10) {
		recommendations.avoid.push(
			"loose scarves",
			"hats without ties",
			"very loose clothing"
		);
		recommendations.styles.push("fitted clothing", "secure accessories");
	}

	return recommendations;
};

// Determine Indian season based on weather and month
const getIndianSeason = (weatherData, month = new Date().getMonth() + 1) => {
	const { condition, temperature } = weatherData;

	// Monsoon season
	if (
		["rain", "drizzle", "thunderstorm"].includes(condition) ||
		(month >= 6 && month <= 9)
	) {
		return "monsoon";
	}

	// Winter season
	if (temperature < 20 || month >= 11 || month <= 2) {
		return "winter";
	}

	// Summer season
	if (temperature > 30 || (month >= 3 && month <= 5)) {
		return "summer";
	}

	return "pleasant";
};

// Get regional weather patterns for India
const getRegionalWeatherTips = (cityName, season) => {
	const city = INDIAN_CITIES[cityName.toLowerCase()];
	if (!city) return {};

	const regionalTips = {
		Kerala: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Pleasant winters. Light layers sufficient.",
		},
		Maharashtra: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Mild winters. Light layers sufficient.",
		},
		Delhi: {
			monsoon: "Moderate rains. Humidity can be high.",
			summer: "Extremely hot and dry. Sun protection crucial.",
			winter: "Very cold. Heavy woolens required.",
		},
		Karnataka: {
			monsoon: "Consistent rains. Quick-dry fabrics preferred.",
			summer: "Pleasant compared to North India. Cotton comfortable.",
			winter: "Mild. Light sweaters sufficient.",
		},
		"Tamil Nadu": {
			monsoon: "Northeast monsoon affects region. Rainwear needed.",
			summer: "Hot and humid. Light colors recommended.",
			winter: "Warm. Minimal winter clothing needed.",
		},
		"West Bengal": {
			monsoon: "Heavy monsoons. Waterproof essentials.",
			summer: "Hot and very humid. Breathable fabrics only.",
			winter: "Pleasant. Light woolens comfortable.",
		},
		Rajasthan: {
			monsoon: "Light rains. Desert climate persists.",
			summer: "Extremely hot and dry. Full sun protection needed.",
			winter: "Cold nights, warm days. Layer-friendly clothing.",
		},
		Gujarat: {
			monsoon: "Moderate rains. Waterproof clothing recommended.",
			summer: "Very hot. Light, breathable fabrics essential.",
			winter: "Cool to cold. Light to medium layers needed.",
		},
		"Uttar Pradesh": {
			monsoon: "Heavy rains in some areas. Waterproof clothing essential.",
			summer: "Hot and humid. Light fabrics recommended.",
			winter: "Cold winters. Heavy woolens required.",
		},
		Punjab: {
			monsoon: "Moderate rains. Waterproof clothing recommended.",
			summer: "Hot and dry. Light, breathable fabrics essential.",
			winter: "Cold winters. Heavy woolens required.",
		},
		Bihar: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Cold winters. Heavy woolens required.",
		},
		Jharkhand: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Cold winters. Heavy woolens required.",
		},
		Telangana: {
			monsoon: "Moderate rains. Quick-dry fabrics preferred.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Mild winters. Light layers sufficient.",
		},
		"Andhra Pradesh": {
			monsoon: "Moderate rains. Quick-dry fabrics preferred.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Mild winters. Light layers sufficient.",
		},
		"Jammu and Kashmir": {
			monsoon: "Light rains. Cool temperatures.",
			summer: "Pleasant summers. Light layers recommended.",
			winter: "Very cold. Heavy woolens required.",
		},
		Chhattisgarh: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Cool winters. Light layers sufficient.",
		},
		Odisha: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Pleasant winters. Light layers sufficient.",
		},
		Uttarakhand: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Pleasant in hills, hot in plains. Layering recommended.",
			winter: "Cold in hills, mild in plains. Heavy woolens needed in hills.",
		},
		Haryana: {
			monsoon: "Moderate rains. Waterproof clothing recommended.",
			summer: "Hot and dry. Light, breathable fabrics essential.",
			winter: "Cold winters. Heavy woolens required.",
		},
		"Himachal Pradesh": {
			monsoon: "Heavy rains in some areas. Waterproof clothing essential.",
			summer: "Pleasant in hills, hot in plains. Layering recommended.",
			winter: "Cold in hills, mild in plains. Heavy woolens needed in hills.",
		},
		Goa: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Pleasant winters. Light layers sufficient.",
		},
		Assam: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Cool winters. Light layers sufficient.",
		},
		Meghalaya: {
			monsoon: "Very heavy rains expected. Waterproof clothing essential.",
			summer: "Cool and pleasant. Light layers recommended.",
			winter: "Cold in some areas. Medium layers needed.",
		},
		Nagaland: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Pleasant summers. Light layers recommended.",
			winter: "Cool to cold. Medium layers needed.",
		},
		Tripura: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Hot and humid. Light, breathable fabrics recommended.",
			winter: "Cool winters. Light layers sufficient.",
		},
		Mizoram: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Pleasant summers. Light layers recommended.",
			winter: "Cool to cold. Medium layers needed.",
		},
		"Arunachal Pradesh": {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Pleasant summers. Light layers recommended.",
			winter: "Cold in most areas. Heavy woolens required.",
		},
		Sikkim: {
			monsoon: "Heavy rains expected. Waterproof clothing essential.",
			summer: "Pleasant summers. Light layers recommended.",
			winter: "Cold in most areas. Heavy woolens required.",
		},
	};

	return regionalTips[city.state] || {};
};

// Check if weather is suitable for outdoor activities
const isWeatherSuitableForOutdoor = (weatherData) => {
	const { temperature, condition, windSpeed, humidity } = weatherData;

	const unsuitable = [
		temperature > 40 || temperature < 5,
		["thunderstorm", "heavy rain"].includes(condition),
		windSpeed > 25,
		humidity > 95,
	];

	return {
		suitable: !unsuitable.some(Boolean),
		reasons: unsuitable
			.map((condition, index) => {
				if (!condition) return null;
				return [
					"Extreme temperature",
					"Severe weather conditions",
					"High wind speed",
					"Very high humidity",
				][index];
			})
			.filter(Boolean),
	};
};

// Get UV index recommendations (mock data - would need UV API)
const getUVRecommendations = (uvIndex) => {
	if (uvIndex <= 2) {
		return {
			level: "Low",
			protection: "Minimal sun protection required",
			clothing: "Regular clothing sufficient",
		};
	} else if (uvIndex <= 5) {
		return {
			level: "Moderate",
			protection: "Some protection required",
			clothing: "Long sleeves recommended for extended outdoor time",
		};
	} else if (uvIndex <= 7) {
		return {
			level: "High",
			protection: "Protection essential",
			clothing: "Long sleeves, hat, sunglasses required",
		};
	} else if (uvIndex <= 10) {
		return {
			level: "Very High",
			protection: "Extra protection required",
			clothing: "Full coverage clothing, wide-brim hat, sunglasses",
		};
	} else {
		return {
			level: "Extreme",
			protection: "Maximum protection required",
			clothing:
				"Avoid outdoor activities, full protective clothing if necessary",
		};
	}
};

// Get weather alerts for outfit planning
const getWeatherAlerts = (forecastData) => {
	const alerts = [];

	forecastData.forEach((day, index) => {
		// Temperature alerts
		if (day.temperature.max > 40) {
			alerts.push({
				date: day.date,
				type: "heat_wave",
				message: "Extreme heat expected. Choose light, breathable fabrics.",
				priority: "high",
			});
		}

		if (day.temperature.min < 10) {
			alerts.push({
				date: day.date,
				type: "cold_wave",
				message: "Cold weather expected. Layer up with warm clothing.",
				priority: "medium",
			});
		}

		// Rain alerts
		if (day.rainChance > 70) {
			alerts.push({
				date: day.date,
				type: "heavy_rain",
				message: "Heavy rain likely. Waterproof clothing recommended.",
				priority: "high",
			});
		}

		// Humidity alerts
		if (day.humidity > 85) {
			alerts.push({
				date: day.date,
				type: "high_humidity",
				message: "High humidity expected. Choose moisture-wicking fabrics.",
				priority: "medium",
			});
		}
	});

	return alerts;
};

// Format weather data for outfit app display
const formatWeatherForDisplay = (weatherData) => {
	return {
		temperature: `${weatherData.temperature}°C`,
		feelsLike: `Feels like ${weatherData.feelsLike}°C`,
		condition:
			weatherData.description.charAt(0).toUpperCase() +
			weatherData.description.slice(1),
		humidity: `${weatherData.humidity}%`,
		wind: `${Math.round(weatherData.windSpeed * 3.6)} km/h`, // Convert m/s to km/h
		visibility: `${weatherData.visibility} km`,
		icon: getWeatherIcon(weatherData.condition),
		recommendations: getWeatherBasedOutfitRecommendations(weatherData),
	};
};

// Get weather icon based on condition
const getWeatherIcon = (condition) => {
	const iconMap = {
		clear: "☀️",
		clouds: "☁️",
		rain: "🌧️",
		drizzle: "🌦️",
		thunderstorm: "⛈️",
		snow: "❄️",
		mist: "🌫️",
		fog: "🌫️",
	};

	return iconMap[condition] || "🌤️";
};

module.exports = {
	INDIAN_CITIES,
	getCurrentWeather,
	getWeatherForecast,
	getWeatherBasedOutfitRecommendations,
	getIndianSeason,
	getRegionalWeatherTips,
	isWeatherSuitableForOutdoor,
	getUVRecommendations,
	getWeatherAlerts,
	formatWeatherForDisplay,
	getWeatherIcon,
};
