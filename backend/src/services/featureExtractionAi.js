import axios from "axios";

import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger.js';

const VALID_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
const REQUEST_TIMEOUT = 30000; // 30 seconds

const EXTRACTION_PROMPT=`You are an expert fashion-analysis AI.  
Your job is to analyze EACH IMAGE independently and return structured metadata about clothing items.

IMPORTANT RULES:
- You MUST return ONLY pure JSON.
- NO prose, NO markdown, NO code fences, NO explanations.
- The JSON must be a VALID array: [ {...}, {...}, ... ]
- One object per image, in the SAME ORDER as the images appear.
- If an image contains multiple items, analyze ONLY the PRIMARY visible clothing item.

-------------------------------------
EXPECTED OUTPUT FORMAT (STRICT)
-------------------------------------

Return an array where each element has EXACTLY the following keys:

{
  "image_index": 1,                    // 1-based index of the image
  "class_type": "",                    // "upper", "lower", "full", "footwear", "accessory"
  "type": "",                          // main clothing type: "shirt", "tshirt", "jeans", "kurta", etc.
  "subtype": "",                       // optional subtype: "formal shirt", "cargo pants", "lehenga", etc.
  "color_primary": "",                 // dominant color
  "color_secondary": "",               // secondary or accent color
  "pattern": "",                       // stripes, solids, checks, floral, abstract, etc.
  "fabric_guess": "",                  // cotton, denim, silk, wool, chiffon, polyester, etc.
  "texture": "",                       // smooth, ribbed, knitted, quilted, embroidered, etc.
  "neck_style": "",                    // collar, crew neck, v-neck, mandarin, boat neck, etc.
  "sleeves": "",                       // sleeveless, half-sleeve, full-sleeve, 3/4th, strapless, etc.
  "fit": "",                           // regular, slim, baggy, oversized, relaxed, tailored
  "length": "",                        // waist, knee, cropped, ankle, long, thigh-length, etc.
  "style_category": "",                // casual, streetwear, ethnic, formal, athleisure, partywear
  "occasion": "",                      // work, date, gym, wedding, festival, vacation, everyday
  "season": "",                        // summer, winter, monsoon, all-season
  "ethnic_vs_western": "",             // "ethnic", "western", or "fusion"
  "description": "",                   // 1–2 line natural description of the clothing
  "confidence": 0.0                    // float 0–1 indicating your certainty
}

-------------------------------------
ANALYSIS RULES
-------------------------------------

- Be precise and concise.
- If unsure about a field, make your best guess but NEVER leave fields null.
- If something is not present, return an empty string "".
- Colors should be simple human colors, not hex codes.
- Confidence MUST be between 0.0 and 1.0.
- Subtype is optional but recommended when visible.
- If an item is heavily occluded or unclear, reduce confidence.
- NEVER include accessories unless they are the main item.

-------------------------------------
YOUR RESPONSE MUST LOOK EXACTLY LIKE THIS:

[
  {
    "image_index": 1,
    "class_type": "upper",
    "type": "tshirt",
    "subtype": "graphic tshirt",
    "color_primary": "black",
    "color_secondary": "white",
    "pattern": "graphic print",
    "fabric_guess": "cotton",
    "texture": "smooth",
    "neck_style": "crew neck",
    "sleeves": "half-sleeve",
    "fit": "regular",
    "length": "waist length",
    "style_category": "casual",
    "occasion": "everyday",
    "season": "all-season",
    "ethnic_vs_western": "western",
    "description": "A black graphic cotton tshirt with regular fit.",
    "confidence": 0.92
  }
]

NO extra text.  
NO markdown.  
NO commentary.  
Return ONLY the JSON array.`


class FeatureExtractionAI {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API key is required for FeatureExtractionAI");
        }
        this.genai= new GoogleGenerativeAI( apiKey );
        this.mainModel=this.genai.getGenerativeModel({ model: 'gemini-2.5-flash' });
        this.liteModel=this.genai.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    }

    // Validate URL format
    async validateUrl(imageUrl) {
        try {
            new URL(imageUrl);
            return true;
        } catch (error) {
            logger.warn(`Invalid URL format: ${imageUrl}`);
            return false;
        }
    }


    //to download image from url and convert to base64
    async downloadImage(imageUrl) {
    try {
      logger.info(`Downloading image: ${imageUrl}`);

      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: REQUEST_TIMEOUT,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      // Validate response size
      if (response.data.length > MAX_IMAGE_SIZE) {
        throw new Error(`Image exceeds maximum size of ${MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      }

      // Validate MIME type
      const contentType = response.headers['content-type'];
      if (!VALID_IMAGE_TYPES.includes(contentType)) {
        throw new Error(`Invalid image type: ${contentType}. Allowed: ${VALID_IMAGE_TYPES.join(', ')}`);
      }

      const base64 = Buffer.from(response.data).toString('base64');
      return {
        base64,
        mimeType: contentType,
        url: imageUrl,
        size: response.data.length
      };
    } catch (error) {
      logger.error(`Failed to download image ${imageUrl}: ${error.message}`);
      throw new Error(`Image download failed: ${error.message}`);
    }
  }


  async validateInputImages(imageUrls) {
    if (!Array.isArray(imageUrls)) {
      throw new Error('Input must be an array of image URLs');
    }

    if (imageUrls.length === 0) {
      throw new Error('Minimum 1 image required');
    }

    if (imageUrls.length > 5) {
      throw new Error('Maximum 5 images allowed per request');
    }
    const invalidUrls = imageUrls.filter(url => typeof url !== 'string' || url.trim() === '');
     if (invalidUrls.length > 0) {
      throw new Error('All URLs must be non-empty strings');
    }

    return true;
  }

  // Build the content array for the AI request 
  async buildContent(images) {
    const content = [
      {
        text: EXTRACTION_PROMPT
      }
    ];

    for (const image of images) {
      content.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.base64
        }
      });
    }

    return content;
  }
   // Parse AI response and extract JSON array
  parseResponse(responseText) {
    try {
      // Remove markdown code blocks if present
      let cleaned = responseText.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
      }
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
      }
      if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
      }

      const parsed = JSON.parse(cleaned.trim());

      if (!Array.isArray(parsed)) {
        throw new Error('Response must be an array');
      }

      return parsed;
    } catch (error) {
      logger.error(`JSON parse error: ${error.message}`);
      throw new Error(`Failed to parse AI response: ${error.message}`);
    }
  }


  //validate the output format of each extracted item
 validateExtractedItem(item) {
    if (!item || typeof item !== 'object') {
      logger.warn('Item is not a valid object, skipping');
      return null;
    }

    // Validate required fields exist
    const requiredFields = ['description', 'confidence'];
    for (const field of requiredFields) {
      if (!(field in item)) {
        logger.warn(`Item missing required field: ${field}, skipping`);
        return null;
      }
    }

    // Only include if confidence > 0.6 (60%)
    if (item.confidence <= 0.6) {
      logger.warn(`Item confidence too low (${item.confidence}), skipping`);
      return null;
    }

    // Ensure all string fields are non-null
    const stringFields = [
      'class_type', 'type', 'subtype', 'color_primary', 'color_secondary',
      'pattern', 'fabric_guess', 'texture', 'neck_style', 'sleeves',
      'fit', 'length', 'style_category', 'occasion', 'season',
      'ethnic_vs_western', 'description'
    ];

    for (const field of stringFields) {
      if (item[field] === null || item[field] === undefined) {
        item[field] = '';
      }
    }

    return item;
  }


  //porcess images with main model and fallback to lite model if quota exceeded
async processWithFallback(images) {
    try {
      logger.info(`Processing ${images.length} images with Flash model`);
      const content = await this.buildContent(images);
      const response = await this.mainModel.generateContent(content);
      return response.response.text();
    } catch (error) {
      if (error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
        logger.warn('Flash quota exceeded, falling back to Flash-Lite');
        try {
          const content = await this.buildContent(images);
          const response = await this.liteModel.generateContent(content);
          return response.response.text();
        } catch (liteError) {
          logger.error(`Flash-Lite also failed: ${liteError.message}`);
          throw liteError;
        }
      }
      throw error;
    }

  }


  //main function to extract features from multiple images
  async extractFeatures(imageUrls) {
    try {
      // Validate input
      this.validateInputImages(imageUrls);

      // Validate and download all images
      logger.info(`Validating and downloading ${imageUrls.length} images`);
      const downloadedImages = [];
      const urlMap = {}; // Track URL to index mapping

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const isValid = await this.validateUrl(url);
        if (!isValid) {
          logger.warn(`Skipping invalid URL: ${url}`);
          continue;
        }

        try {
          const image = await this.downloadImage(url);
          downloadedImages.push(image);
          urlMap[downloadedImages.length - 1] = url;
        } catch (error) {
          logger.warn(`Skipping URL due to download error: ${url} - ${error.message}`);
          continue;
        }
      }

      if (downloadedImages.length === 0) {
        throw new Error('No valid images could be processed');
      }

      // Process with Gemini (with fallback)
      logger.info('Sending to Gemini for analysis');
      const aiResponse = await this.processWithFallback(downloadedImages);

      // Parse response
      const parsed = this.parseResponse(aiResponse);

      // Validate items and attach correct image URLs
      const results = parsed
        .map((item, idx) => {
          const validated = this.validateExtractedItem(item);
          if (validated === null) return null;
          validated.imageUrl = urlMap[item.image_index - 1];  // ← Use image_index (1-based) to get correct URL
          return validated;
        })
        .filter(item => item !== null);

      logger.info(`Successfully processed and validated ${results.length} items`);
      return results;
    } catch (error) {
      logger.error(`Feature extraction failed: ${error.message}`);
      throw error;
    }
  }
}

export default FeatureExtractionAI;
