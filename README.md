# 🎯 Vibe Check AI
**Samsung PRISM GenAI Hackathon 2025 Submission**

> **Main character or background NPC?** Discover your digital personality through AI-powered analysis of your Instagram profile. Get witty insights, custom memes, and find out what vibe you're really giving off!

![Made with Python](https://img.shields.io/badge/Made%20with-Python-blue)
![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb)
![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-orange)
![Instagram API](https://img.shields.io/badge/Instagram-Business%20API-E4405F)
![License](https://img.shields.io/badge/License-MIT-green)

## 🏆 Project Overview

**Vibe Check AI** is an innovative social media analytics tool that combines the power of Google Gemini AI with Instagram's official API to create personalized digital personality profiles. The application analyzes user-generated content, visual aesthetics, and writing patterns to generate witty, Gen Z-style personality assessments and custom memes.

### 🎯 Problem Statement
In today's digital age, understanding one's online presence and digital personality has become increasingly important. Social media users often wonder how they're perceived online but lack tools to analyze their digital footprint comprehensively.

### 💡 Solution
Vibe Check AI solves this by:
- **Automated Content Analysis**: Uses AI to analyze captions, hashtags, and visual content
- **Personality Insights**: Generates detailed personality profiles based on digital behavior
- **Custom Meme Generation**: Creates personalized memes using actual user content
- **Robust Fallback System**: Ensures functionality even with API limitations
- **Modern UX**: Provides an engaging, animated user experience

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Advanced NLP**: Google Gemini 2.0 Flash model for sophisticated text analysis
- **Sentiment Analysis**: Determines emotional tone and personality traits
- **Topic Modeling**: Identifies recurring themes and interests
- **Style Recognition**: Analyzes writing patterns and communication style

### 📱 Instagram Integration
- **Official API**: Uses Instagram Business API for reliable data access
- **Robust Fallback**: Enhanced demo data ensures app always works
- **Privacy Focused**: Processes data without storing sensitive information
- **Rate Limit Handling**: Smart API usage with proper error handling

### 🎨 Personalized Content Generation
- **Custom Memes**: AI-generated memes using actual Instagram images
- **Personality Profiles**: Witty, Gen Z-style digital personality summaries
- **Visual Analysis**: Color palette and aesthetic preference detection
- **Content Categorization**: Automatic tagging of lifestyle, mood, and interests

### 💫 Modern User Experience
- **Animated Homepage**: Smooth Framer Motion animations and transitions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Theme**: Modern UI with cyan/blue accent colors
- **Interactive Elements**: Engaging hover effects and loading animations

## 🛠️ Technology Stack

### Backend Architecture
- **FastAPI**: High-performance async web framework for API development
- **Google Gemini 2.0 Flash**: State-of-the-art language model for content analysis
- **Instagram Business API**: Official Instagram integration for data access
- **Python 3.8+**: Core programming language with modern async/await patterns
- **Pydantic**: Data validation and serialization
- **Uvicorn**: Lightning-fast ASGI server

### Frontend Architecture
- **React 19**: Latest React with concurrent features and improved performance
- **Framer Motion**: Production-ready motion library for smooth animations
- **Vite**: Next-generation frontend build tool with HMR
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable icon library

### AI & APIs
- **Google Gemini AI**: Advanced language understanding and generation
- **Instagram Graph API**: Official social media data access


### Development Tools
- **Git**: Version control with semantic commits
- **Environment Management**: Secure configuration handling

## 🚀 Installation & Setup Guide

### System Requirements
- **Python**: 3.8 or higher
- **Node.js**: 14.0 or higher
- **npm**: 6.0 or higher
- **Git**: Latest version
- **Operating System**: Windows 10+, macOS 10.15+, or Linux

### Step-by-Step Installation

#### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/SnehalKansal/Vibe-Check-AI.git
cd Vibe-Check-AI
```

#### 2. Backend Configuration
```bash
# Navigate to backend directory
cd Backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
# source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
copy .env.example .env
# Edit .env file with your API keys (see Configuration section)
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../Frontend

# Install Node.js dependencies
npm install
```

#### 4. Running the Application

**Start Backend Server** (Terminal 1):
```bash
cd Backend
# Ensure virtual environment is activated
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Start Frontend Server** (Terminal 2):
```bash
cd Frontend
npm run dev
```

#### 5. Access Application
Open your web browser and navigate to: `http://localhost:5173`

### 🔧 Special Setup Requirements

#### Google Gemini API Setup
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new project or select existing one
3. Generate an API key
4. Add the key to your `.env` file as `GEMINI_API_KEY`

#### Instagram API Setup 
The application includes a robust fallback system and works without Instagram API setup. For enhanced functionality:

1. Create a Facebook Developer account
2. Set up a Facebook App with Instagram Basic Display
3. Obtain the required credentials:
   - App ID
   - App Secret
   - Page Access Token
   - Business Account ID
4. Add credentials to `.env` file

**Note**: The app works perfectly with demo data if Instagram API is not configured.

## 🎮 How to Use

### Basic Usage Flow
1. **Launch Application**: Start both backend and frontend servers
2. **Navigate to Homepage**: Open `http://localhost:5173` in your browser
3. **Enter Instagram Profile**: Input username or full profile URL
4. **Initiate Analysis**: Click "Vibe Check" button to start AI processing
5. **View Results**: Get personalized vibe profile and custom memes

### User Interface Guide

#### Homepage Features
- **Animated Landing Page**: Smooth entry animations and interactive elements
- **Feature Overview**: Learn about AI analysis capabilities
- **Quick Start**: Direct access to vibe checking functionality

#### Analysis Interface
- **Input Validation**: Real-time validation of Instagram usernames/URLs
- **Loading Indicators**: Beautiful loading animations during processing
- **Error Handling**: User-friendly error messages with suggestions

#### Results Display
- **Personality Summary**: AI-generated digital personality profile
- **Meme Gallery**: Custom memes using your actual Instagram content
- **Analysis Details**: Breakdown of sentiment, topics, and style insights
- **Share Options**: Easy sharing of results

### Advanced Features
- **Fallback System**: App works even if Instagram API limits are reached
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern UI with accessibility considerations



## 📁 Project Architecture

```
vibe-check-app/
├── Backend/                     # Python FastAPI Backend
│   ├── main.py                 # Main application entry point
│   ├── instagram_api.py        # Instagram Business API integration
│   ├── requirements.txt        # Python package dependencies
│   └── .env.example           # Environment variables template
├── Frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Application header component
│   │   │   ├── Homepage.jsx    # Landing page with animations
│   │   │   ├── LoadingSpinner.jsx # Loading animation component
│   │   │   ├── LogoSymbol.jsx  # Brand logo component
│   │   │   ├── Memecard.jsx    # Meme display component
│   │   │   └── VibeResults.jsx # Results display component
│   │   ├── App.jsx            # Main application component
│   │   ├── index.css          # Global styles and animations
│   │   └── main.jsx           # React application entry point
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML template
│   ├── package.json           # Node.js dependencies
│   ├── postcss.config.cjs     # PostCSS configuration
│   ├── tailwind.config.cjs    # Tailwind CSS configuration
│   └── vite.config.js         # Vite build configuration
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
├── README.md                   # Project documentation
└── VibeCheckAI.pdf            # Supplementary documentation
```



## ⚙️ Configuration & Environment

### Required API Keys

#### Google Gemini AI (Required)
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create or select a project
3. Generate a new API key
4. Copy the key for environment configuration

#### Instagram Business API (Optional)
The application includes enhanced demo data and works without Instagram API setup. For production use:

1. **Facebook Developer Account**: Create account at developers.facebook.com
2. **Create Facebook App**: Set up app with Instagram Basic Display product
3. **Instagram Business Account**: Connect your Instagram business account
4. **Generate Tokens**: Obtain required access tokens and credentials

### Environment Configuration

Create `Backend/.env` file with the following structure:

```env
# Required: Google Gemini API Key for AI analysis
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Instagram Business API Configuration
# App works with enhanced demo data if not configured
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
INSTAGRAM_PAGE_ACCESS_TOKEN=your_page_access_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id

# Optional: Development Settings
ENVIRONMENT=development
DEBUG=true
```

### Security Considerations
- **Environment Variables**: All sensitive data stored in `.env` file
- **Git Ignore**: `.env` files excluded from version control
- **API Rate Limiting**: Built-in rate limiting and error handling
- **Data Privacy**: No user data stored permanently

## 🌐 API Documentation

### Available Endpoints

#### `GET /`
- **Purpose**: API health check and service information
- **Response**: Service status, version, and available endpoints
- **Usage**: Verify backend is running correctly

#### `POST /vibecheck/`
- **Purpose**: Main vibe analysis endpoint
- **Parameters**:
  - `insta_link` (string): Instagram username or profile URL
  - `max_posts` (integer, optional): Maximum posts to analyze (default: 12)
- **Response**: Complete analysis including personality profile and memes
- **Processing Time**: 10-30 seconds depending on content complexity

#### `GET /instagram-status`
- **Purpose**: Instagram API configuration status
- **Response**: API configuration health and token validation
- **Usage**: Debug Instagram API integration issues

#### `GET /docs`
- **Purpose**: Interactive API documentation (Swagger UI)
- **Access**: `http://localhost:8000/docs`
- **Features**: Test endpoints directly from browser

#### `GET /health`
- **Purpose**: Simple health check endpoint
- **Response**: Server health status and timestamp
- **Usage**: Monitoring and load balancer health checks

### API Response Format

```json
{
  "ok": true,
  "scrape": {
    "username": "example_user",
    "bio": "User biography",
    "posts": []
  },
  "text_analysis": {
    "dominant_sentiment": "positive",
    "topics": ["lifestyle", "travel"],
    "style": "authentic and engaging",
    "keywords": ["adventure", "life", "moments"]
  },
  "vibe_profile": {
    "profile_text": "AI-generated personality summary",
    "tagline": "Personal tagline",
    "username": "example_user"
  },
  "memes": [
    {
      "caption": "Meme description",
      "meme_text": "Funny overlay text",
      "image_url": "Instagram image URL",
      "original_caption": "Original post caption"
    }
  ]
}
```



## 🎥 Submissions

### Demo Video
https://youtu.be/Bs4tvbXKteM


**Team**: 3 Bytes
**Submission Tag**: `SamsungPRISMGenAIHackathon2025`  



