// Image processing utilities for OutFitly
const sharp = require("sharp"); // You'll need to install: npm install sharp
const path = require("path");
const fs = require("fs").promises;

// Optimize outfit images for different use cases
const optimizeOutfitImage = async (inputPath, outputPath, options = {}) => {
	const {
		width = 800,
		height = 800,
		quality = 80,
		format = "jpeg",
		watermark = null,
	} = options;

	try {
		let image = sharp(inputPath)
			.resize(width, height, {
				fit: "cover",
				position: "center",
			})
			.jpeg({ quality });

		// Add watermark if provided
		if (watermark) {
			const watermarkBuffer = await sharp(watermark)
				.resize(Math.floor(width * 0.2))
				.png()
				.toBuffer();

			image = image.composite([
				{
					input: watermarkBuffer,
					gravity: "southeast",
				},
			]);
		}

		await image.toFile(outputPath);

		return {
			success: true,
			outputPath,
			size: await getImageSize(outputPath),
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Generate multiple image sizes for responsive design
const generateImageSizes = async (inputPath, outputDir, filename) => {
	const sizes = [
		{ suffix: "thumb", width: 150, height: 150 },
		{ suffix: "small", width: 300, height: 300 },
		{ suffix: "medium", width: 600, height: 600 },
		{ suffix: "large", width: 1200, height: 1200 },
	];

	const results = {};

	for (const size of sizes) {
		const outputPath = path.join(outputDir, `${filename}_${size.suffix}.jpg`);

		try {
			await sharp(inputPath)
				.resize(size.width, size.height, {
					fit: "cover",
					position: "center",
				})
				.jpeg({ quality: 85 })
				.toFile(outputPath);

			results[size.suffix] = {
				path: outputPath,
				width: size.width,
				height: size.height,
			};
		} catch (error) {
			results[size.suffix] = { error: error.message };
		}
	}

	return results;
};

// Extract dominant colors from outfit images
const extractDominantColors = async (imagePath, count = 5) => {
	try {
		const { dominant } = await sharp(imagePath)
			.resize(100, 100)
			.raw()
			.toBuffer({ resolveWithObject: true });

		// Simple color extraction logic
		// In production, you might want to use a more sophisticated algorithm
		const colors = [];
		const pixels = dominant.data;
		const colorMap = new Map();

		// Sample every 10th pixel to reduce processing
		for (let i = 0; i < pixels.length; i += 30) {
			const r = pixels[i];
			const g = pixels[i + 1];
			const b = pixels[i + 2];

			// Convert to hex
			const hex = rgbToHex(r, g, b);
			colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
		}

		// Sort by frequency and get top colors
		const sortedColors = Array.from(colorMap.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, count)
			.map(([color, frequency]) => ({
				hex: color,
				rgb: hexToRgb(color),
				frequency,
			}));

		return {
			success: true,
			colors: sortedColors,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Convert RGB to Hex
const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Convert Hex to RGB
const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ?
			{
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		:	null;
};

// Create outfit collage from multiple images
const createOutfitCollage = async (imagePaths, outputPath, layout = "grid") => {
	try {
		if (imagePaths.length === 0) {
			throw new Error("No images provided");
		}

		const images = await Promise.all(
			imagePaths.map(async (imagePath) => {
				return await sharp(imagePath)
					.resize(300, 300, { fit: "cover" })
					.toBuffer();
			})
		);

		let composite = [];
		const cols = Math.ceil(Math.sqrt(images.length));
		const rows = Math.ceil(images.length / cols);

		images.forEach((image, index) => {
			const col = index % cols;
			const row = Math.floor(index / cols);

			composite.push({
				input: image,
				left: col * 300,
				top: row * 300,
			});
		});

		await sharp({
			create: {
				width: cols * 300,
				height: rows * 300,
				channels: 3,
				background: { r: 255, g: 255, b: 255 },
			},
		})
			.composite(composite)
			.jpeg({ quality: 90 })
			.toFile(outputPath);

		return {
			success: true,
			outputPath,
			dimensions: { width: cols * 300, height: rows * 300 },
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Remove background from clothing images
const removeBackground = async (inputPath, outputPath) => {
	try {
		// This is a simplified version - for production use AI services like remove.bg
		const image = await sharp(inputPath).png().toBuffer();

		// For now, just convert to PNG with transparency
		await sharp(image).png().toFile(outputPath);

		return {
			success: true,
			message: "Background removal completed (simplified version)",
			outputPath,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Get image metadata and EXIF data
const getImageMetadata = async (imagePath) => {
	try {
		const metadata = await sharp(imagePath).metadata();
		const stats = await fs.stat(imagePath);

		return {
			success: true,
			metadata: {
				width: metadata.width,
				height: metadata.height,
				format: metadata.format,
				size: stats.size,
				density: metadata.density,
				hasAlpha: metadata.hasAlpha,
				orientation: metadata.orientation,
				exif: metadata.exif ? parseExifData(metadata.exif) : null,
			},
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Parse EXIF data for useful information
const parseExifData = (exifBuffer) => {
	// Simplified EXIF parsing - in production use exif-reader library
	return {
		timestamp: new Date().toISOString(),
		camera: "Unknown",
		location: null,
	};
};

// Get file size of image
const getImageSize = async (imagePath) => {
	try {
		const stats = await fs.stat(imagePath);
		return stats.size;
	} catch (error) {
		return 0;
	}
};

// Validate image file
const validateImage = async (imagePath, options = {}) => {
	const {
		maxSize = 5 * 1024 * 1024, // 5MB
		allowedFormats = ["jpeg", "jpg", "png", "webp"],
		minWidth = 100,
		minHeight = 100,
		maxWidth = 4000,
		maxHeight = 4000,
	} = options;

	try {
		const stats = await fs.stat(imagePath);
		const metadata = await sharp(imagePath).metadata();

		const errors = [];

		// Check file size
		if (stats.size > maxSize) {
			errors.push(
				`File size (${formatBytes(stats.size)}) exceeds maximum allowed (${formatBytes(maxSize)})`
			);
		}

		// Check format
		if (!allowedFormats.includes(metadata.format.toLowerCase())) {
			errors.push(
				`Format ${metadata.format} not allowed. Allowed: ${allowedFormats.join(", ")}`
			);
		}

		// Check dimensions
		if (metadata.width < minWidth || metadata.height < minHeight) {
			errors.push(
				`Image too small. Minimum: ${minWidth}x${minHeight}, Found: ${metadata.width}x${metadata.height}`
			);
		}

		if (metadata.width > maxWidth || metadata.height > maxHeight) {
			errors.push(
				`Image too large. Maximum: ${maxWidth}x${maxHeight}, Found: ${metadata.width}x${metadata.height}`
			);
		}

		return {
			valid: errors.length === 0,
			errors,
			metadata: {
				width: metadata.width,
				height: metadata.height,
				format: metadata.format,
				size: stats.size,
			},
		};
	} catch (error) {
		return {
			valid: false,
			errors: [`Invalid image file: ${error.message}`],
			metadata: null,
		};
	}
};

// Format bytes to human readable
const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Calculate image similarity (basic version)
const calculateImageSimilarity = async (imagePath1, imagePath2) => {
	try {
		// Get histograms for both images
		const hist1 = await getImageHistogram(imagePath1);
		const hist2 = await getImageHistogram(imagePath2);

		// Calculate correlation coefficient
		const similarity = calculateHistogramSimilarity(hist1, hist2);

		return {
			success: true,
			similarity: Math.round(similarity * 100), // Return as percentage
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
};

// Get image histogram (simplified)
const getImageHistogram = async (imagePath) => {
	const { data } = await sharp(imagePath)
		.resize(64, 64)
		.raw()
		.toBuffer({ resolveWithObject: true });

	const histogram = new Array(256).fill(0);

	for (let i = 0; i < data.length; i += 3) {
		const gray = Math.round(
			0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
		);
		histogram[gray]++;
	}

	return histogram;
};

// Calculate histogram similarity
const calculateHistogramSimilarity = (hist1, hist2) => {
	let correlation = 0;
	const mean1 = hist1.reduce((a, b) => a + b) / hist1.length;
	const mean2 = hist2.reduce((a, b) => a + b) / hist2.length;

	let num = 0,
		den1 = 0,
		den2 = 0;

	for (let i = 0; i < hist1.length; i++) {
		const diff1 = hist1[i] - mean1;
		const diff2 = hist2[i] - mean2;

		num += diff1 * diff2;
		den1 += diff1 * diff1;
		den2 += diff2 * diff2;
	}

	if (den1 === 0 || den2 === 0) return 0;

	return num / Math.sqrt(den1 * den2);
};

module.exports = {
	optimizeOutfitImage,
	generateImageSizes,
	extractDominantColors,
	createOutfitCollage,
	removeBackground,
	getImageMetadata,
	validateImage,
	calculateImageSimilarity,
	formatBytes,
	rgbToHex,
	hexToRgb,
};
