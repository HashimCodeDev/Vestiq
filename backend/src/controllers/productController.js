import productService from "../services/productService";
import User from "../models/User";
import logger from "../utils/logger";

const searchProducts = async (req, res) => {
	try {
		const { q, category, minPrice, maxPrice, brand, size } = req.query;

		const filters = {
			category,
			priceRange: { min: minPrice, max: maxPrice },
			brand,
			size,
		};

		const products = await productService.searchProducts(q, filters);

		res.json({
			success: true,
			data: products,
		});
	} catch (error) {
		logger.error("Product search error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to search products",
		});
	}
};

const getProductDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const { platform } = req.query;

		const product = await productService.getProductDetails(id, platform);

		res.json({
			success: true,
			data: product,
		});
	} catch (error) {
		logger.error("Get product details error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get product details",
		});
	}
};

const addToWishlist = async (req, res) => {
	try {
		const { productId } = req.body;

		await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet: { wishlist: productId } },
			{ new: true }
		);

		res.json({
			success: true,
			message: "Product added to wishlist",
		});
	} catch (error) {
		logger.error("Add to wishlist error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to add to wishlist",
		});
	}
};

const removeFromWishlist = async (req, res) => {
	try {
		const { productId } = req.params;

		await User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { wishlist: productId } },
			{ new: true }
		);

		res.json({
			success: true,
			message: "Product removed from wishlist",
		});
	} catch (error) {
		logger.error("Remove from wishlist error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to remove from wishlist",
		});
	}
};

const getWishlist = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate("wishlist");

		res.json({
			success: true,
			data: user.wishlist || [],
		});
	} catch (error) {
		logger.error("Get wishlist error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to get wishlist",
		});
	}
};

export {
	searchProducts,
	getProductDetails,
	addToWishlist,
	removeFromWishlist,
	getWishlist,
};
