// src/components/VibeResults.jsx
import React from 'react';
import MemeCard from './Memecard';

const VibeResults = ({ results }) => {
    // Handle the response structure from the backend
    const vibeProfile = results.vibe_profile || {};
    const memes = results.memes || [];
    const message = results.message || "";

    return (
        <div className="text-left animate-fade-in space-y-8">
            {/* Display any backend messages */}
            {message && (
                <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-xl">
                    <p className="text-blue-300 text-sm">ℹ️ {message}</p>
                </div>
            )}
            
            {/* Vibe Profile Section */}
            <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-4">Your Vibe Profile:</h2>
                <div className="bg-gray-900/70 p-6 rounded-xl border border-gray-700 shadow-inner">
                    <pre className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap font-mono">
                        {vibeProfile.profile_text || "No profile analysis available."}
                    </pre>
                </div>
                
                {/* Profile Stats */}
                {vibeProfile.username && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                            <div className="text-cyan-400 font-bold">@{vibeProfile.username}</div>
                            <div className="text-gray-400 text-sm">Username</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                            <div className="text-cyan-400 font-bold">{vibeProfile.followers?.toLocaleString() || 'N/A'}</div>
                            <div className="text-gray-400 text-sm">Followers</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                            <div className="text-cyan-400 font-bold capitalize">{vibeProfile.dominant_sentiment || 'neutral'}</div>
                            <div className="text-gray-400 text-sm">Sentiment</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                            <div className="text-cyan-400 font-bold capitalize">{vibeProfile.dominant_mood?.split(' / ')[0] || 'balanced'}</div>
                            <div className="text-gray-400 text-sm">Mood</div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Memes Section */}
            {memes.length > 0 && (
                <div>
                    <h2 className="text-3xl font-bold text-cyan-400 mb-6">Your Vibe Memes:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {memes.map((meme, index) => (
                            <MemeCard key={index} meme={meme} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VibeResults;