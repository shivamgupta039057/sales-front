"use client";

import React from 'react';
import { Search, Filter, Menu, BarChart2 } from 'lucide-react';

const ChatSidebar = ({ 
  chats, 
  selectedChat, 
  onSelectChat, 
  searchQuery, 
  onSearchChange,
  activeTab,
  onTabChange 
}) => {
  const tabs = ['All', 'Pending', 'Intervened'];
  const totalCount = chats.length;

  return (
    <div className={`w-full lg:w-[380px] border-r border-gray-200 flex flex-col bg-white ${
      selectedChat ? 'hidden lg:flex' : 'flex'
    }`}>
      {/* Header with Title */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <div>
            <h1 className="font-semibold text-base text-gray-800">Visuti Career</h1>
            <div className="text-xs text-gray-500">918306575668</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <BarChart2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="relative flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lead(s)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-100 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
            {tab === 'All' && (
              <span className="ml-1.5 text-xs">({totalCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No chats found
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id
                  ? 'bg-purple-50 border-l-4 border-l-purple-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {chat.name.charAt(0).toUpperCase()}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {chat.lastMessage}
                  </p>

                  {chat.status && (
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      chat.status === 'Just Curious' 
                        ? 'bg-blue-100 text-blue-700'
                        : chat.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {chat.status}
                    </span>
                  )}
                </div>

                {/* Unread Badge */}
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <span className="text-pink-500">📌</span>
            <span>v183.8</span>
          </span>
          <span className="text-green-500">24hr</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
