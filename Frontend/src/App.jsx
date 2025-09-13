// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import VibeResults from './components/VibeResults';

export default function App() {
    const [instaLink, setInstaLink] = useState('');
    const [spotifyLink, setSpotifyLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const isValidInstagramUrl = (string) => {
        if (!string) return false;
        try {
            const url = new URL(string);
            return (url.protocol === "http:" || url.protocol === "https:") && 
                   (url.hostname.includes('instagram.com') || url.hostname.includes('instagr.am'));
        } catch (_) {
            // Also allow just usernames
            return /^[a-zA-Z0-9._]{1,30}$/.test(string);
        }
    };

    const isValidSpotifyUrl = (string) => {
        if (!string) return false;
        try {
            const url = new URL(string);
            return (url.protocol === "http:" || url.protocol === "https:") && 
                   url.hostname.includes('spotify.com') && 
                   url.pathname.includes('/playlist/');
        } catch (_) {
            return false;
        }
    };

    const handleVibeCheck = async () => {
        // Validation
        if (!instaLink && !spotifyLink) {
            setError('Please enter an Instagram profile link or username, or a Spotify playlist link.');
            return;
        }

        if (instaLink && !isValidInstagramUrl(instaLink)) {
            setError('Please enter a valid Instagram profile link or username.');
            return;
        }

        if (spotifyLink && !isValidSpotifyUrl(spotifyLink)) {
            setError('Please enter a valid Spotify playlist link.');
            return;
        }

        setError('');
        setResults(null);
        setIsLoading(true);

        try {
            const requestBody = {
                max_posts: 10
            };

            if (instaLink) {
                requestBody.insta_link = instaLink;
            }
            if (spotifyLink) {
                requestBody.spotify_link = spotifyLink;
            }

            const response = await fetch('http://127.0.0.1:8000/vibecheck/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.detail || errorData.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            if (!data.ok) {
                throw new Error(data.message || 'Backend returned an error');
            }
            
            setResults(data);
            
        } catch (err) {
            console.error('Error during Vibe Check:', err);
            
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                setError('Unable to connect to the backend. Make sure the server is running on http://127.0.0.1:8000');
            } else {
                setError(`Oops! Something went wrong: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearAll = () => {
        setInstaLink('');
        setSpotifyLink('');
        setResults(null);
        setError('');
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans antialiased">
            <main className="w-full max-w-4xl mx-auto py-8">
                <div className="bg-gray-800/60 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-3xl border border-gray-700/50 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none rounded-3xl"></div>
                    <Header />

                    {/* Input Section */}
                    <div className="space-y-5 mb-8 relative z-10">
                        <input
                            type="text"
                            value={instaLink}
                            onChange={(e) => setInstaLink(e.target.value)}
                            placeholder="Paste Instagram profile link or username..."
                            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl py-3 px-5 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-200 text-lg shadow-inner"
                            disabled={isLoading}
                        />
                        
                        <input
                            type="text"
                            value={spotifyLink}
                            onChange={(e) => setSpotifyLink(e.target.value)}
                            placeholder="Paste Spotify playlist link (optional)..."
                            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl py-3 px-5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200 text-lg shadow-inner"
                            disabled={isLoading}
                        />
                        
                        <div className="flex gap-3">
                            <button
                                onClick={handleVibeCheck}
                                disabled={isLoading}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-102 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:transform-none text-lg"
                            >
                                {isLoading ? 'Analyzing...' : 'Vibe Check'}
                            </button>
                            
                            {(results || error) && (
                                <button
                                    onClick={handleClearAll}
                                    disabled={isLoading}
                                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-102 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        
                        {error && (
                            <div className="bg-red-900/30 border border-red-700 p-4 rounded-xl">
                                <p className="text-red-400 text-sm animate-pulse">⚠️ {error}</p>
                            </div>
                        )}
                    </div>

                    {/* Loading & Results */}
                    <div className="relative z-10">
                        {isLoading && <LoadingSpinner />}
                        
                        {results && !isLoading && <VibeResults results={results} />}
                    </div>
                </div>
                
                <footer className="text-center mt-12">
                </footer>
            </main>
        </div>
    );
}