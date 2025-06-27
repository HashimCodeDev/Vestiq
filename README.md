<div align="center">

# 👗✨ Vestiq

### *Your AI-Powered Personal Stylist*

**Transform your closet into a smart wardrobe and never have a "nothing to wear" moment again!**

---

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

![Vestiq Banner](https://via.placeholder.com/800x300/6366f1/ffffff?text=Vestiq+-+AI+Personal+Stylist)

[🚀 **Get Started**](#-quick-start) • [📱 **Features**](#-key-features) • [🎮 **Demo**](#) • [📖 **Docs**](https://docs.vestiq.app) • [💬 **Community**](#-support--community)

</div>

---

## 🌟 What is Vestiq?

Vestiq is an intelligent fashion companion that uses **advanced AI** to help you manage your wardrobe, discover new outfit combinations, and develop your personal style. Say goodbye to decision fatigue and hello to effortless daily styling!

<div align="center">

### 🎯 **Perfect For**

| 👔 **Busy Professionals** | 🎓 **Students** | 💫 **Fashion Enthusiasts** | 🤔 **Anyone Overwhelmed** |
|:---:|:---:|:---:|:---:|
| Effortless outfit planning | Building style on budget | Optimizing their wardrobe | Standing in front of closet |

</div>

---

## 🚀 Quick Start

### 📋 Prerequisites

Before diving into Vestiq, make sure you have these installed:

| Tool | Version | Download |
|------|---------|----------|
| 🟢 **Node.js** | v18.0.0+ | [Download](https://nodejs.org/) |
| 📦 **pnpm** | v8.0.0+ | `npm install -g pnpm` |
| 🍃 **MongoDB** | v6.0+ | [Download](https://www.mongodb.com/try/download/community) |
| 🔧 **Git** | Latest | [Download](https://git-scm.com/) |

### ⚡ Installation & Setup

<details>
<summary><b>🔥 One-Click Setup (For Experienced Developers)</b></summary>

```bash
# Clone and setup
git clone https://github.com/HashimCodeDev/Vestiq.git && cd Vestiq

# Install all dependencies
cd backend && pnpm install && cd ../frontend && pnpm install

# Setup environment files (edit with your values)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Start both servers
cd backend && pnpm dev &  # Backend on :5000
cd frontend && pnpm dev   # Frontend on :3000
```

</details>

<details>
<summary><b>📝 Step-by-Step Setup</b></summary>

#### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/HashimCodeDev/Vestiq.git
cd Vestiq
```

#### 2️⃣ **Install Dependencies**
```bash
# Backend dependencies
cd backend
pnpm install

# Frontend dependencies  
cd ../frontend
pnpm install
```

#### 3️⃣ **Environment Configuration**

**Backend `.env` file:**
```env
# 🚀 Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# 🗄️ Database
MONGODB_URI=mongodb://localhost:27017/vestiq

# 🔐 JWT Configuration  
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# 🔥 Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_key_here\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your_service_account_email

# ☁️ Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 🤖 OpenAI (AI Features)
OPENAI_API_KEY=your_openai_api_key

# 🌤️ Weather API (Optional)
WEATHER_API_KEY=your_openweathermap_api_key
```

**Frontend `.env.local` file:**
```env
# 🌐 API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# 🔥 Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

#### 4️⃣ **Start the Servers**
```bash
# Terminal 1: Backend
cd backend
pnpm dev

# Terminal 2: Frontend  
cd frontend
pnpm dev
```

#### 5️⃣ **Verify Setup**
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend Health: http://localhost:5000/health

</details>

---

## 🌟 Key Features

<div align="center">

### 🧠 **Smart Wardrobe Management**
*Transform your physical closet into a digital wardrobe*

| Feature | Description |
|---------|-------------|
| 📸 **Image Recognition** | AI automatically categorizes by type, color, and style |
| 🏷️ **Smart Metadata** | Add brands, materials, and occasion tags |
| 📊 **Usage Tracking** | Monitor how often you wear each item |

</div>

<div align="center">

### 🎯 **Daily Outfit Recommendations**
*Personalized suggestions tailored to your day*

</div>

```
🌤️ Weather Integration → Perfect outfits for any weather
😊 Mood Matching → Outfits that match your vibe  
📅 Calendar Sync → Ideal for meetings, dates, casual days
🧠 Learning Algorithm → Gets better with your ratings
```

<div align="center">

### 💬 **Conversational AI Stylist**
*Chat with your personal AI stylist*

</div>

> *"Honey, that denim jacket screams '90s chic! Let's pair it with those high-waisted black jeans and ankle boots for an effortlessly cool look!"* 💅

- 🎭 **Custom Personalities** - Sassy, professional, minimalist, or trendy
- 🗣️ **Natural Conversations** - Understands context and emotions  
- 🧠 **Style Memory** - Remembers your preferences and evolves
- 💡 **Smart Suggestions** - Responds to "I feel bloated" or "Need to impress"

---

## 🎮 Gamification Features

<div align="center">

| 🔥 **Daily Streaks** | 📈 **Closet Leveling** | 🎯 **Style Challenges** | 🏆 **Achievement Badges** |
|:---:|:---:|:---:|:---:|
| Build styling momentum | Fashion Newbie → Sartorial Sorcerer | Weekly themes & contests | Unlock & share milestones |

</div>

---

## 📊 Analytics & Insights

<div align="center">

![Analytics Preview](https://via.placeholder.com/600x300/f3f4f6/6b7280?text=Wardrobe+Analytics+Dashboard)

**Optimize your wardrobe with data-driven insights**

</div>

- 📈 **Usage Statistics** - Most and least worn items
- 🥧 **Category Breakdown** - Visual wardrobe composition  
- 🗓️ **Seasonal Analysis** - Clothing patterns throughout the year
- 🔔 **Smart Alerts** - Notifications about underused pieces

---

## 🛠️ Tech Stack

<div align="center">

### 🎨 **Frontend**
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### ⚙️ **Backend**
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

### 🤖 **AI & Services**
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

---

## 💬 What Users Say

<div align="center">

> *"Vestiq transformed my morning routine. I used to spend 20 minutes deciding what to wear - now it takes 2 minutes!"*  
> **— Sarah M. ⭐⭐⭐⭐⭐**

> *"The AI stylist feels like having a fashion-savvy best friend in my pocket. It even remembers I don't like wearing heels on Mondays!"*  
> **— Alex R. ⭐⭐⭐⭐⭐**

> *"I discovered so many outfit combinations I never thought of. My wardrobe feels twice as big now!"*  
> **— Maria L. ⭐⭐⭐⭐⭐**

</div>

---

## 🔐 Privacy & Security

<div align="center">

**Your style data is protected with enterprise-grade security**

| 🔒 **End-to-End Encryption** | 🛡️ **Privacy Controls** | ⚖️ **GDPR Compliant** | 📊 **Anonymized Analytics** |
|:---:|:---:|:---:|:---:|
| Photos stay private | Choose what to share | Full data control | Help improve while staying private |

</div>

---

## 🤝 Contributing

We love contributions! Here's how you can help make Vestiq even better:

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/HashimCodeDev/Vestiq)](https://github.com/HashimCodeDev/Vestiq/graphs/contributors)
[![Pull Requests](https://img.shields.io/github/issues-pr/HashimCodeDev/Vestiq)](https://github.com/HashimCodeDev/Vestiq/pulls)
[![Issues](https://img.shields.io/github/issues/HashimCodeDev/Vestiq)](https://github.com/HashimCodeDev/Vestiq/issues)

</div>

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💫 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 **Open** a Pull Request

**[📖 Contributing Guide](CONTRIBUTING.md)** • **[🐛 Report Bug](https://github.com/HashimCodeDev/Vestiq/issues)** • **[💡 Request Feature](https://github.com/HashimCodeDev/Vestiq/issues)**

---

## 📞 Support & Community

<div align="center">

[![Website](https://img.shields.io/badge/Website-vestiq.app-blue?logo=google-chrome&logoColor=white)](https://vestiq.app)
[![Documentation](https://img.shields.io/badge/Docs-docs.vestiq.app-green?logo=gitbook&logoColor=white)](https://docs.vestiq.app)
[![Email](https://img.shields.io/badge/Email-hello@vestiq.app-red?logo=gmail&logoColor=white)](mailto:hello@vestiq.app)

**Join our community for style inspiration, tips, and support!**

</div>

---

## 📄 License

<div align="center">

**© 2025 HashimCodeDev. All Rights Reserved.**

All content, code, design elements, features, assets, and intellectual property associated with Vestiq are the sole property of HashimCodeDev. Unauthorized use, reproduction, distribution, or modification without explicit written permission is strictly prohibited.

[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)

</div>

---

<div align="center">

## 🏷️ Tags

`fashion` • `AI` • `personal-style` • `wardrobe-management` • `outfit-planning` • `style-assistant` • `nextjs` • `nodejs` • `mongodb` • `fashion-tech`

---

### ✨ **Ready to revolutionize your style?**

**Start using Vestiq today and never have a "nothing to wear" moment again!**

[![Get Started](https://img.shields.io/badge/Get%20Started-Join%20Vestiq-6366f1?style=for-the-badge&logo=rocket)](https://github.com/HashimCodeDev/Vestiq)
[![Star on GitHub](https://img.shields.io/github/stars/HashimCodeDev/Vestiq?style=for-the-badge&logo=github)](https://github.com/HashimCodeDev/Vestiq)

**Happy Styling!** 👗✨

---

*Made with 💜 by [HashimCodeDev](https://github.com/HashimCodeDev)*

</div>
