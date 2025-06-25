# Vestiq 👗✨

**Your AI-powered personal stylist that turns your closet into a smart wardrobe**

Vestiq is an intelligent fashion companion that uses advanced AI to help you manage your wardrobe, discover new outfit combinations, and develop your personal style. Say goodbye to "I have nothing to wear" moments and hello to effortless daily styling.

## 🚀 Quick Start

### Prerequisites

Before setting up Vestiq, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v8.0.0 or higher) - Install with `npm install -g pnpm`
- **MongoDB** (v6.0 or higher) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/HashimCodeDev/Vestiq.git
   cd Vestiq
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   pnpm install

   # Install frontend dependencies
   cd frontend
   pnpm install
   ```

3. **Environment Configuration**

   **Backend Environment Variables** - Create `backend/.env`:

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000

   # Database
   MONGODB_URI=mongodb://localhost:27017/vestiq

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # Firebase Admin SDK (for authentication)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_CLIENT_CERT_URL=your_cert_url

   # Cloudinary (for image storage)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # OpenAI (for AI features)
   OPENAI_API_KEY=your_openai_api_key

   # Weather API (optional)
   WEATHER_API_KEY=your_openweathermap_api_key

   # Payment Gateway (optional)
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Logging
   LOG_LEVEL=info
   ```

   **Frontend Environment Variables** - Create `frontend/.env.local`:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api

   # Firebase Client Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Firebase Setup** (Required for Authentication)

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Authentication with Email/Password and Google providers
   - Generate a service account key:
     - Go to Project Settings → Service Accounts
     - Click "Generate new private key"
     - Save the JSON file as `backend/src/config/serviceAccountKey.json` (for development)
   - Copy the configuration values to your environment files

5. **External Services Setup**

   **Cloudinary** (Required for image storage):

   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Get your cloud name, API key, and API secret from the dashboard
   - Add them to your backend `.env` file

   **MongoDB** (Required):

   - **Local MongoDB**: Install and start MongoDB service
   - **MongoDB Atlas**: Create a cluster and get connection string
   - Update `MONGODB_URI` in your backend `.env` file

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   pnpm dev
   ```

   The backend will run on `http://localhost:5000`

2. **Start the Frontend Application**

   ```bash
   cd frontend
   pnpm dev
   ```

   The frontend will run on `http://localhost:3000`

3. **Verify Setup**
   - Visit `http://localhost:3000` to access the application
   - Check `http://localhost:5000/health` for backend health status

### Available Scripts

**Backend Scripts:**

```bash
pnpm dev          # Start development server with nodemon
pnpm start        # Start production server
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

**Frontend Scripts:**

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Next.js linting
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

## 🌟 Key Features

### 🧠 Smart Wardrobe Management

Transform your physical closet into a digital wardrobe with intelligent organization:

- **Image Recognition**: Upload photos and let AI automatically categorize by type, color, and style
- **Smart Metadata**: Add details like brand, material, and occasion tags
- **Usage Tracking**: Monitor how often you wear each item with smart tagging

### 🎯 Daily Outfit Recommendations

Get personalized outfit suggestions tailored to your day:

- **Weather Integration**: Automatic weather-based recommendations using your location
- **Mood Matching**: Tell us how you're feeling and get outfits that match your vibe
- **Calendar Sync**: Perfect outfits for meetings, dates, or casual days
- **Learning Algorithm**: Rate outfits to improve future suggestions

### 💬 Conversational AI Stylist

Chat with your personal AI stylist that gets to know your style:

- **Custom Personalities**: Choose from sassy, professional, minimalist, or other stylist personas
- **Natural Conversations**: "Ooo honey, that denim screams '90s chic!"
- **Emotional Intelligence**: Responds to cues like "I feel bloated today" or "Need to impress"
- **Style Memory**: Remembers your preferences and evolves with your taste

### 📈 Wear Analytics & Insights

Optimize your wardrobe with data-driven insights:

- **Usage Statistics**: See your most and least worn items
- **Category Breakdown**: Visual charts showing your wardrobe composition
- **Seasonal Analysis**: Understand your clothing patterns throughout the year
- **Smart Alerts**: Get notified about underused pieces in your closet

## 🎮 Gamification Features

Make styling fun with engaging game mechanics:

- **Daily Streaks**: Build momentum with consecutive styling days
- **Closet Leveling**: Progress from "Fashion Newbie" to "Sartorial Sorcerer"
- **Style Challenges**: Weekly themes like "Monochrome Monday" or "Vintage Vibes"
- **Achievement Badges**: Unlock and share your fashion milestones

## 🔗 Seamless Integrations

Connect Vestiq with your digital ecosystem:

- **Calendar Apps**: Google Calendar and Apple Calendar sync for event-based styling
- **Smart Devices**: Wearables integration for weather and activity data
- **E-commerce**: Discover matching pieces from your favorite online stores
- **Voice Assistants**: "Hey Siri, what should I wear today?"

## 🛠️ Advanced Tools

### Outfit Builder (Drag & Style)

- Manual mix-and-match interface
- Save custom outfit combinations
- Browse style inspiration from the community

### Cross-Platform Experience

- **Multi-Device**: Android, iOS, and Web applications
- **Real-Time Sync**: Access your wardrobe anywhere, anytime
- **Offline Mode**: Get cached recommendations even without internet

### Data Management

- **Cloud Backup**: Never lose your wardrobe data
- **Easy Migration**: Restore your closet on new devices
- **Data Export**: Download your wardrobe information anytime

## 🔐 Privacy & Security

Your style data is protected with enterprise-grade security:

- **End-to-End Encryption**: Your photos and preferences stay private
- **Privacy Controls**: Choose to keep your wardrobe private or share with the community
- **Anonymized Analytics**: Help improve the app while maintaining your privacy
- **GDPR Compliant**: Full control over your personal data

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context & Hooks
- **Authentication**: Firebase Auth
- **Image Handling**: Cloudinary integration
- **Testing**: Jest with React Testing Library

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **File Storage**: Cloudinary
- **AI Integration**: OpenAI API
- **Payment Processing**: Razorpay
- **Logging**: Winston
- **Testing**: Jest with Supertest

### DevOps & Tools

- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git
- **Environment**: Docker support (optional)

## 🚀 Getting Started (Quick)

For experienced developers who want to get up and running quickly:

```bash
# Clone and setup
git clone <repository-url> && cd Vestiq

# Install dependencies
cd backend && pnpm install && cd ../frontend && pnpm install

# Setup environment files (see detailed setup above)
cp backend/.env.example backend/.env  # Edit with your values
cp frontend/.env.example frontend/.env.local  # Edit with your values

# Start development servers
cd backend && pnpm dev &  # Backend on :5000
cd frontend && pnpm dev   # Frontend on :3000
```

## 📱 Supported Platforms

- **Web**: Modern browsers (Chrome, Safari, Firefox, Edge)
- **Mobile**: Progressive Web App (PWA) support
- **Desktop**: Electron app (coming soon)

## 🎯 Perfect For

- **Fashion Enthusiasts** looking to optimize their style
- **Busy Professionals** who want effortless daily outfit planning
- **Students** building their personal style on a budget
- **Anyone** who's ever stood in front of their closet feeling overwhelmed

## 🌟 What Users Say

_"Vestiq transformed my morning routine. I used to spend 20 minutes deciding what to wear - now it takes 2 minutes!"_ - Sarah M.

_"The AI stylist feels like having a fashion-savvy best friend in my pocket. It even remembers I don't like wearing heels on Mondays!"_ - Alex R.

_"I discovered so many outfit combinations I never thought of. My wardrobe feels twice as big now!"_ - Maria L.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support & Community

- **Documentation**: [docs.vestiq.app](https://docs.vestiq.app)
- **Community**: Join our style community for inspiration and tips
- **Issues**: Report bugs and request features on GitHub
- **Email**: Contact us at hello@vestiq.app

## 📄 License

All content, code, design elements, features, assets, and intellectual property associated with the application Vestiq are the sole property of HashimCodeDev. Unauthorized use, reproduction, distribution, or modification of any part of the application without explicit written permission from HashimCodeDev is strictly prohibited.

By accessing or using Vestiq, you acknowledge and agree that all intellectual property rights — including but not limited to source code, UI/UX designs, documentation, brand elements, and any associated media — are owned and controlled exclusively by HashimCodeDev.

© 2025 HashimCodeDev. All rights reserved.

## 🏷️ Tags

`fashion` `AI` `personal-style` `wardrobe-management` `outfit-planning` `style-assistant` `nextjs` `nodejs` `mongodb` `fashion-tech`

---

**Ready to revolutionize your style?** Start using Vestiq today and never have a "nothing to wear" moment again!

✨ **Happy Styling!** ✨
