// src/components/Header.jsx
import React from 'react';

const Header = () => (
    <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          
            <img 
                src="/myicon.png" 
                alt="Vibe Check AI Logo" 
                className="w-10 h-10" 
            />

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Vibe Check AI</h1>
        </div>
        <p className="text-gray-400 text-lg">Main character or background NPC? We'll tell you.</p>
    </div>
);

export default Header;