// middleware/auth.js
import { auth } from "../config/firebase-admin.js";

/**
 * Middleware to verify the Firebase ID token sent in the Authorization header.
 *
 * If the token is valid, it adds the user info to the request object and calls next().
 * If the token is invalid or missing, it returns a 401 response with an appropriate error message.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} - If the token is invalid or missing
 */
const authenticateToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

		if (!token) {
			return res.status(401).json({
				error: "Access token required",
				code: "TOKEN_REQUIRED",
			});
		}

		// Verify the ID token
		const decodedToken = await auth.verifyIdToken(token);

		// Add user info to request object
		req.user = {
			userId: decodedToken.uid,
			email: decodedToken.email,
			name: decodedToken.name,
			picture: decodedToken.picture,
			email_verified: decodedToken.email_verified,
			firebase: decodedToken,
		};

		next();
	} catch (error) {
		console.error("Token verification error:", error);

		if (error.code === "auth/id-token-expired") {
			return res.status(401).json({
				error: "Token expired",
				code: "TOKEN_EXPIRED",
			});
		}

		if (error.code === "auth/id-token-revoked") {
			return res.status(401).json({
				error: "Token revoked",
				code: "TOKEN_REVOKED",
			});
		}

		return res.status(401).json({
			error: "Invalid token",
			code: "INVALID_TOKEN",
		});
	}
};
/**
 * Middleware to verify that the request has a valid user object.
 *
 * If the user object exists, it calls next(). Otherwise, it returns a 401 response with an appropriate error message.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} - If the user object is missing
 */
const getUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			error: "User not authenticated",
			code: "USER_NOT_AUTHENTICATED",
		});
	}
	next();
};

export { authenticateToken, getUser };
