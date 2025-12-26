"use client";

import React from 'react';
import { Phone, Video, MoreVertical, Settings, ArrowLeft, Star } from 'lucide-react';

const ChatHeader = ({ contact }) => {
  return (
    <div className="h-[60px] bg-white border-b border-gray-200 px-3 md:px-5 flex items-center justify-between">
      {/* Left Section - Contact Info */}
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        <button 
          onClick={contact.onBack}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 md:gap-2">
            <h2 className="font-semibold text-sm md:text-base text-gray-800 truncate">
              {contact.name}
            </h2>
            <div className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <Star
                  key={index}
                  className={`w-3.5 h-3.5 ${
                    index < 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {contact.status}
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
        <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>
        <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
