const express = require("express");
const router = express.Router();
const {
	searchProducts,
	getProductDetails,
	addToWishlist,
	removeFromWishlist,
	getWishlist,
} = require("../controllers/productController");
const {
	verifyFirebaseToken,
	getUser,
	optionalAuth,
} = require("../middleware/auth");
const {
	validateProductSearch,
	validateWishlist,
	validateId,
} = require("../middleware/validation");

// @route   GET /api/products/search
// @desc    Search products across platforms
// @access  Public
router.get("/search", validateProductSearch, optionalAuth, searchProducts);

// @route   GET /api/products/:id
// @desc    Get product details
// @access  Public
router.get("/:id", validateId, getProductDetails);

// @route   POST /api/products/wishlist
// @desc    Add product to wishlist
// @access  Private
router.post(
	"/wishlist",
	verifyFirebaseToken,
	getUser,
	validateWishlist,
	addToWishlist
);

// @route   DELETE /api/products/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete(
	"/wishlist/:productId",
	verifyFirebaseToken,
	getUser,
	removeFromWishlist
);

// @route   GET /api/products/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get("/wishlist", verifyFirebaseToken, getUser, getWishlist);

module.exports = router;
