// src/App.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import VibeResults from './components/VibeResults';
import Homepage from './components/Homepage';

export default function App() {
    const [currentView, setCurrentView] = useState('homepage'); // 'homepage' or 'app'
    const [instaLink, setInstaLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    


    const handleGetStarted = () => {
        setCurrentView('app');
    };

    const handleBackToHome = () => {
        setCurrentView('homepage');
        // Reset app state when going back to homepage
        setInstaLink('');
        setResults(null);
        setError('');
    };



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



    const handleVibeCheck = async () => {
        // Validation
        if (!instaLink) {
            setError('Please enter an Instagram profile link or username.');
            return;
        }

        if (instaLink && !isValidInstagramUrl(instaLink)) {
            setError('Please enter a valid Instagram profile link or username.');
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
        setResults(null);
        setError('');
    };

    return (
        <AnimatePresence mode="wait">
            {currentView === 'homepage' ? (
                <motion.div
                    key="homepage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Homepage onGetStarted={handleGetStarted} />
                </motion.div>
            ) : (
                <motion.div
                    key="app"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans antialiased"
                >
                    {/* Back to Homepage Button */}
                    <motion.button
                        onClick={handleBackToHome}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="fixed top-6 left-6 z-50 bg-gray-800/60 backdrop-blur-lg hover:bg-gray-700/60 text-white font-semibold py-2 px-4 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 flex items-center gap-2"
                    >
                        ← Back to Home
                    </motion.button>

                    <main className="w-full max-w-4xl mx-auto py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-800/60 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-3xl border border-gray-700/50 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none rounded-3xl"></div>
                            <Header />



                            {/* Input Section */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-5 mb-8 relative z-10"
                            >
                                <input
                                    type="text"
                                    value={instaLink}
                                    onChange={(e) => setInstaLink(e.target.value)}
                                    placeholder="Paste Instagram profile link or username..."
                                    className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl py-3 px-5 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-200 text-lg shadow-inner"
                                    disabled={isLoading}
                                />
                                
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={handleVibeCheck}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:transform-none text-lg"
                                    >
                                        {isLoading ? 'Analyzing...' : 'Vibe Check'}
                                    </motion.button>
                                    
                                    {(results || error) && (
                                        <motion.button
                                            onClick={handleClearAll}
                                            disabled={isLoading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Clear
                                        </motion.button>
                                    )}
                                </div>
                                
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-900/30 border border-red-700 p-4 rounded-xl"
                                    >
                                        <p className="text-red-400 text-sm animate-pulse">⚠️ {error}</p>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Loading & Results */}
                            <div className="relative z-10">
                                {isLoading && <LoadingSpinner />}
                                
                                {results && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <VibeResults results={results} />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                        
                        <footer className="text-center mt-12">
                        </footer>
                    </main>
                </motion.div>
            )}
        </AnimatePresence>
    );
}