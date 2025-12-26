"use client";

import React, { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import MessagesArea from './components/MessagesArea';
import MessageInput from './components/MessageInput';

// Sample chat data
const initialChats = [
  {
    id: 1,
    name: 'Shivam Gupta',
    phone: '918306575668',
    lastMessage: 'H',
    timestamp: '8:04 pm',
    unread: 0,
    status: 'Just Curious',
    avatar: null,
    messages: [
      { id: 1, text: 'Hii', timestamp: '6:27 PM', sender: 'contact', date: '23/12/2025' },
      { id: 2, text: 'hello', timestamp: '6:27 PM', sender: 'me', status: 'read', date: '23/12/2025' },
      { id: 3, text: 'test', timestamp: '6:29 PM', sender: 'me', status: 'read', date: '24/12/2025' },
      { id: 4, text: 'dddd', timestamp: '12:42 PM', sender: 'me', status: 'read', date: '24/12/2025' }
    ]
  },
  {
    id: 2,
    name: 'Anshul Tiwari',
    phone: '919876543210',
    lastMessage: 'Hello',
    timestamp: '24/12/2025',
    unread: 0,
    status: 'Pending',
    avatar: null,
    messages: [
      { id: 1, text: 'Hello', timestamp: '4:21 PM', sender: 'contact', date: '24/12/2025' }
    ]
  },
  {
    id: 3,
    name: 'sunil moond',
    phone: '919123456789',
    lastMessage: '✓ djhkcjk',
    timestamp: '23/12/2025',
    unread: 0,
    status: 'Intervened',
    avatar: null,
    messages: [
      { id: 1, text: 'djhkcjk', timestamp: '2:30 PM', sender: 'me', status: 'read', date: '23/12/2025' }
    ]
  },
  {
    id: 4,
    name: 'Isver Bhagora',
    phone: '919876512345',
    lastMessage: 'Hii',
    timestamp: '22/12/2025',
    unread: 0,
    status: 'Just Curious',
    avatar: null,
    messages: [
      { id: 1, text: 'Hii', timestamp: '11:15 AM', sender: 'contact', date: '22/12/2025' }
    ]
  },
  {
    id: 5,
    name: 'parkashmundhava1',
    phone: '919988776655',
    lastMessage: 'કોડ',
    timestamp: '22/12/2025',
    unread: 0,
    status: 'Pending',
    avatar: null,
    messages: [
      { id: 1, text: 'Hii', timestamp: '4:21 PM', sender: 'contact', date: '22/12/2025' },
      { id: 2, text: 'Hello', timestamp: '4:21 PM', sender: 'me', status: 'read', date: '22/12/2025' }
    ]
  },
  {
    id: 6,
    name: 'UTA SERVICES',
    phone: '919765432100',
    lastMessage: 'Dear Sir, B2B very low cost 🚗🚗🚗 1. Notary+SDM+Apostill...',
    timestamp: '16/12/2025',
    unread: 0,
    status: 'Just Curious',
    avatar: null,
    messages: []
  },
  {
    id: 7,
    name: 'sanjay',
    phone: '919654321098',
    lastMessage: 'ha ji sir',
    timestamp: '06/12/2025',
    unread: 0,
    status: 'Pending',
    avatar: null,
    messages: []
  },
  {
    id: 8,
    name: 'rohit tiwari',
    phone: '919543210987',
    lastMessage: '⚠️ Thank You for Visiting VISUTI CAREER 😊   We apprecia...',
    timestamp: '03/12/2025',
    unread: 0,
    status: 'Just Curious',
    avatar: null,
    messages: []
  }
];

const WhatsAppChatPage = () => {
  const [chats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage = {
      id: selectedChat.messages.length + 1,
      text: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      sender: 'me',
      status: 'sent',
      date: new Date().toLocaleDateString('en-GB')
    };

    // Update selected chat with new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage]
    };
    
    setSelectedChat(updatedChat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.phone.includes(searchQuery)
  );

  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      {/* Left Sidebar - Chats List */}
      <ChatSidebar
        chats={filteredChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Right Section - Chat Area */}
      <div className={`flex-1 flex flex-col min-h-0 min-w-0 ${
        selectedChat ? 'flex' : 'hidden lg:flex'
      }`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <ChatHeader contact={{ ...selectedChat, onBack: handleBackToList }} />

            {/* Messages Area */}
            <MessagesArea messages={selectedChat.messages} />

            {/* Message Input */}
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-[#F5F6FA]">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">Select a chat to start messaging</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppChatPage;
