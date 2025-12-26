"use client";

import React, { useState, useRef } from 'react';
import { Paperclip, Plus, Send, Smile, Mic, MessageSquare } from 'lucide-react';
import TemplatesModal from './TemplatesModal';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const templatesButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTemplateSelect = (template) => {
    setMessage(template.content);
  };

  return (
    <>
      <div className="bg-white border-t border-gray-200 px-2 md:px-4 py-2 md:py-3 relative">
        <form onSubmit={handleSubmit} className="flex items-end gap-1 md:gap-2">
          {/* Templates Button */}
          <button
            ref={templatesButtonRef}
            type="button"
            onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
            className="p-1.5 md:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            title="Templates"
          >
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Attachment Button */}
          <button
            type="button"
            className="p-1.5 md:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Plus Button */}
          <button
            type="button"
            className="hidden sm:block p-1.5 md:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            rows={1}
            className="w-full px-4 py-2.5 pr-10 bg-gray-100 border-none rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 max-h-32"
            style={{ 
              minHeight: '42px',
              maxHeight: '120px'
            }}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 md:p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
          >
            <Smile className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Send/Mic Button */}
        {message.trim() ? (
          <button
            type="submit"
            className="p-2 md:p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        ) : (
          <button
            type="button"
            className="p-2 md:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <Mic className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </form>

      {/* Footer Text */}
    
      {/* Templates Dropdown */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleTemplateSelect}
        buttonRef={templatesButtonRef}
      />
    </div>
  </>
  );
};

export default MessageInput;
