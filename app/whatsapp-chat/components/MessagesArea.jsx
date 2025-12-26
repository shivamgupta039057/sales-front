"use client";

import React, { useEffect, useRef } from 'react';
import { Check, CheckCheck } from 'lucide-react';

const MessagesArea = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  const formatDate = (dateStr) => {
    const today = new Date().toLocaleDateString('en-GB');
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-GB');
    
    if (dateStr === today) return 'Today';
    if (dateStr === yesterday) return 'Yesterday';
    return dateStr;
  };

  return (
    <div 
      className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundColor: '#f0f2f5'
      }}
    >
      {Object.keys(groupedMessages).length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400">
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">Start the conversation</p>
          </div>
        </div>
      ) : (
        Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="mb-4">
            {/* Date Separator */}
            <div className="flex justify-center mb-4">
              <div className="bg-white px-3 py-1 rounded-full shadow-sm">
                <span className="text-xs text-gray-600 font-medium">
                  {formatDate(date)}
                </span>
              </div>
            </div>

            {/* Messages for this date */}
            {msgs.map((message) => (
              <div
                key={message.id}
                className={`flex mb-2 ${
                  message.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] rounded-lg px-3 py-2 ${
                    message.sender === 'me'
                      ? 'bg-[#dcf8c6] text-gray-800'
                      : 'bg-white text-gray-800'
                  } shadow-sm`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap">
                    {message.text}
                  </p>
                  
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {message.timestamp}
                    </span>
                    
                    {message.sender === 'me' && (
                      <span className="text-gray-500">
                        {message.status === 'read' || message.status === 'delivered' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                        ) : message.status === 'sent' ? (
                          <CheckCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesArea;
