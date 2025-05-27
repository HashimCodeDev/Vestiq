const OpenAI = require("openai");
const logger = require("../utils/logger");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
	async generateOutfitRecommendations(
		userPreferences,
		occasion,
		weather,
		budget
	) {
		try {
			const prompt = this.buildPrompt(
				userPreferences,
				occasion,
				weather,
				budget
			);

			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"You are a fashion stylist AI that provides outfit recommendations for Indian fashion preferences.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				max_tokens: 800,
				temperature: 0.7,
			});

			return this.parseAIResponse(response.choices[0].message.content);
		} catch (error) {
			logger.error("AI Service Error:", error);
			throw new Error("Failed to generate outfit recommendations");
		}
	}

	buildPrompt(userPreferences, occasion, weather, budget) {
		return `
      Generate 3 outfit recommendations for:
      - Occasion: ${occasion}
      - Weather: ${weather}
      - Budget: ₹${budget}
      - Body Type: ${userPreferences.bodyType}
      - Style Preferences: ${userPreferences.stylePreferences?.join(", ")}
      - Region: ${userPreferences.regionPreference}

      For each outfit, provide:
      1. Outfit name
      2. Description
      3. Items list with estimated prices
      4. Styling tips
      5. Color palette

      Format as JSON array.
    `;
	}

	parseAIResponse(content) {
		try {
			// Clean and parse AI response
			const cleanContent = content.replace(/```json|```/g, "").trim();
			return JSON.parse(cleanContent);
		} catch (error) {
			// Fallback parsing or default response
			return this.getDefaultOutfits();
		}
	}

	getDefaultOutfits() {
		return [
			{
				name: "Classic Casual",
				description: "Perfect everyday outfit",
				items: ["Cotton T-shirt", "Jeans", "Casual Shoes"],
				estimatedPrice: 2500,
				tips: "Keep it simple and comfortable",
			},
		];
	}
}

module.exports = new AIService();
