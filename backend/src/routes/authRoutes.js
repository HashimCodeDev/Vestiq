// routes/auth.js
const express = require("express");
const { db, auth } = require("../config/firebase-admin");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Verify user and create/update user document
router.post("/verify", authenticateToken, async (req, res) => {
	try {
		const { uid, email, displayName, photoURL } = req.body;
		const userRef = db.collection("users").doc(uid);

		// Check if user document exists
		const userDoc = await userRef.get();

		const userData = {
			email,
			displayName: displayName || null,
			photoURL: photoURL || null,
			lastLogin: new Date(),
			updatedAt: new Date(),
		};

		if (!userDoc.exists) {
			// Create new user document
			userData.createdAt = new Date();
			userData.isNewUser = true;

			await userRef.set(userData);

			res.status(201).json({
				message: "User created successfully",
				user: { uid, ...userData },
				isNewUser: true,
			});
		} else {
			// Update existing user
			await userRef.update(userData);

			const existingData = userDoc.data();
			res.status(200).json({
				message: "User verified successfully",
				user: { uid, ...existingData, ...userData },
				isNewUser: false,
			});
		}
	} catch (error) {
		console.error("Error verifying user:", error);
		res.status(500).json({
			error: "Failed to verify user",
			details: error.message,
		});
	}
});

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
	try {
		const userRef = db.collection("users").doc(req.user.uid);
		const userDoc = await userRef.get();

		if (!userDoc.exists) {
			return res.status(404).json({ error: "User not found" });
		}

		const userData = userDoc.data();
		res.json({
			uid: req.user.uid,
			...userData,
		});
	} catch (error) {
		console.error("Error fetching user profile:", error);
		res.status(500).json({
			error: "Failed to fetch user profile",
			details: error.message,
		});
	}
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
	try {
		const { displayName, preferences, bio } = req.body;
		const userRef = db.collection("users").doc(req.user.uid);

		const updateData = {
			...(displayName && { displayName }),
			...(preferences && { preferences }),
			...(bio !== undefined && { bio }),
			updatedAt: new Date(),
		};

		await userRef.update(updateData);

		const updatedDoc = await userRef.get();
		res.json({
			message: "Profile updated successfully",
			user: { uid: req.user.uid, ...updatedDoc.data() },
		});
	} catch (error) {
		console.error("Error updating user profile:", error);
		res.status(500).json({
			error: "Failed to update profile",
			details: error.message,
		});
	}
});

// Delete user account
router.delete("/account", authenticateToken, async (req, res) => {
	try {
		// Delete user document from Firestore
		await db.collection("users").doc(req.user.uid).delete();

		// Delete user from Firebase Auth
		await auth.deleteUser(req.user.uid);

		res.json({ message: "User account deleted successfully" });
	} catch (error) {
		console.error("Error deleting user account:", error);
		res.status(500).json({
			error: "Failed to delete account",
			details: error.message,
		});
	}
});

module.exports = router;
