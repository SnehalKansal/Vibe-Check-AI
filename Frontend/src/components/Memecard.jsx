// src/components/MemeCard.jsx
import React from 'react';

const MemeCard = ({ meme, index }) => {
    // Handle different meme structures from the backend
    const imageUrl = meme.image_url || meme.url || `https://picsum.photos/400/300?random=${index + 1}`;
    const caption = meme.caption || "No caption available";
    const memeText = meme.meme_text || "";
    const originalCaption = meme.original_caption || "";
    
    return (
        <div className="bg-gray-900/70 p-4 rounded-xl border border-gray-700 hover:shadow-cyan-500/30 shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative mb-4">
                <img 
                    src={imageUrl} 
                    alt={caption} 
                    className="w-full h-64 rounded-lg object-cover"
                    onError={(e) => {
                        e.target.src = `https://picsum.photos/400/300?random=${index + 1}`;
                    }}
                />
            </div>
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border-t border-gray-700">
                <p className="text-lg font-bold text-cyan-300 mb-2">{caption}</p>
                {memeText && (
                    <p className="text-base font-semibold text-white mb-2">"{memeText}"</p>
                )}
                {originalCaption && (
                    <p className="text-sm text-gray-400 italic mb-2">Original: "{originalCaption}"</p>
                )}
                {meme.type && (
                    <span className="inline-block bg-cyan-900/30 text-cyan-300 text-xs px-2 py-1 rounded-full mt-2">
                        {meme.type}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MemeCard;