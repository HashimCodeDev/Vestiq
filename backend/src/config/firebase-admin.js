// config/firebase-admin.js
const admin = require("firebase-admin");

// For development, you can use a service account key file
// For production, use environment variables or Cloud Run/Cloud Functions built-in auth

let serviceAccount;

if (process.env.NODE_ENV === "development") {
	// Download service account key from Firebase Console
	serviceAccount = require("./serviceAccountKey.json");
} else {
	// For production, use environment variables
	serviceAccount = {
		type: "service_account",
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
	};
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
