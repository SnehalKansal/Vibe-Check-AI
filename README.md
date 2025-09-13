# 🎯 Vibe Check AI

> A fun web application that analyzes your Instagram profile and creates personalized vibe summaries and memes using AI.

![Made with Python](https://img.shields.io/badge/Made%20with-Python-blue)
![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb)
![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Instagram Profile Analysis**: Analyzes posts, captions, and visual content
- **Sentiment Analysis**: Determines the overall mood and sentiment of your content
- **Personalized Vibe Profile**: Creates a detailed personality analysis
- **Custom Memes**: Generates memes based on your content
- **Spotify Integration**: (Optional) Analyzes your music taste
- **Modern UI**: Beautiful, responsive design with dark theme

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Python 3.8+**: Core language
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation

### Frontend  
- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Modern JavaScript**: ES6+ features

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 14+**
- **npm**
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/vibe-check-ai.git
   cd vibe-check-ai
   ```

2. **Set up the backend:**
   ```bash
   cd Backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   # source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Create .env file in Backend directory
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

4. **Set up the frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```

5. **Start the servers:**
   
   **Terminal 1 (Backend):**
   ```bash
   cd Backend
   # Activate venv if not already active
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd Frontend
   npm run dev
   ```

6. **Open your browser** to `http://localhost:5173`

## 🎮 How to Use

1. **Start both backend and frontend servers** using the steps above
2. **Open your browser** to `http://localhost:5173`
3. **Enter an Instagram profile link** or username (e.g., `username` or `https://instagram.com/username`)
4. **(Optional)** Add a Spotify playlist link for music analysis
5. **Click "Vibe Check"** and wait for the AI analysis
6. **View your results**: personalized vibe profile and custom memes!

## 📁 Project Structure

```
vibe-check-app/
├── Backend/
│   ├── main.py              # Main FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   ├── .env                # Your environment variables
│   ├── templates/          # Meme template images
│   └── fonts/              # Font files for memes
├── Frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
└── README.md              # This file
```

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env` file in the Backend directory for enhanced features:

```env
# Gemini API Key (required for AI analysis)
GEMINI_API_KEY=your_gemini_api_key_here

# Instagram credentials (for private profiles)
INSTA_USER=your_instagram_username
INSTA_PASS=your_instagram_password

# Spotify API credentials (for music analysis)
SPOTIPY_CLIENT_ID=your_spotify_client_id
SPOTIPY_CLIENT_SECRET=your_spotify_client_secret
```

### Getting API Keys

1. **Google Gemini API**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get an API key
2. **Spotify API**: Visit [Spotify for Developers](https://developer.spotify.com/) to create an app
3. **Instagram**: Use your regular Instagram credentials (optional)

## 🌐 API Endpoints

The backend provides the following endpoints:

- `GET /` - Health check and API info
- `GET /health` - Server health status  
- `POST /vibecheck/` - Main analysis endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*This is a demo application that uses sample data for Instagram content analysis. Please respect Instagram's Terms of Service and API usage guidelines.*

## 🙆 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Look at the browser console for error messages
3. Check that both servers are running properly
4. Review the API documentation at `http://127.0.0.1:8000/docs`
5. [Open an issue](https://github.com/yourusername/vibe-check-ai/issues) on GitHub

## 🎆 Future Enhancements

- Real Instagram API integration
- More AI models for analysis
- Custom meme templates
- User accounts and history
- Social media sharing
- Mobile app version

*Note: This is a demo application that uses sample data for Instagram content analysis. For production use, proper API integration and rate limiting should be implemented.*