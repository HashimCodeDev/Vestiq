const OpenAI = require("openai");
const logger = require("../utils/logger");
const axios = require("axios");

const ml_url = process.env.ML_URL || "http://localhost:5000/api/v1/ai";

class AIService {
	async generateOutfitRecommendations(
		userPreferences,
		occasion,
		weather,
		budget
	) {
		try {
			const response = await axios.post(`${ml_url}/generate-outfit`, {
				userPreferences,
				occasion,
				weather,
				budget,
			});
			return response.data;
		} catch (error) {
			logger.error("AI Service Error:", error?.message || error);
			throw new Error("Failed to generate outfit recommendations");
		}
	}
}

module.exports = new AIService();
