"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, MessageSquare, Search } from 'lucide-react';

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate, buttonRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const dropdownRef = useRef(null);

  const templates = [
    {
      id: 1,
      name: 'aiims',
      category: 'Marketing',
      icon: '🖼️',
      content: '*AIIMS EXPECTED CUT OFF 20225* AIIMS CUT OFF DATA ANALYSIS CHECK WITH...',
      language: 'English'
    },
    {
      id: 2,
      name: 'documents',
      category: 'Marketing',
      icon: 'T',
      content: '*Hello Sir/Ma\'am* 😊 *Please share All These documents in Clear Scan JPG format...',
      language: 'English'
    },
    {
      id: 3,
      name: 'hello_world',
      category: 'Utility',
      icon: 'T',
      content: 'Welcome and congratulations!! This message demonstrates your ability to send a...',
      language: 'English'
    },
    {
      id: 4,
      name: 'kerala',
      category: 'Marketing',
      icon: '🖼️',
      content: 'NEET KERALA REGISTRATION START 2025 केरल में NEET APPLICATION के लिए फॉर्म...',
      language: 'Hindi'
    },
    {
      id: 5,
      name: 'neet',
      category: 'Marketing',
      icon: '🖼️',
      content: 'NEET Application Form Details...',
      language: 'English'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || template.category === categoryFilter;
    const matchesLanguage = languageFilter === 'All' || template.language === languageFilter;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="fixed sm:absolute inset-0 sm:inset-auto sm:bottom-full sm:left-0 sm:mb-2 bg-white sm:rounded-lg shadow-2xl w-full sm:w-[600px] md:w-[700px] h-full sm:h-auto sm:max-h-[500px] flex flex-col z-50 sm:border sm:border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">
            Templates<span className="text-gray-500 ml-1">(16)</span>
          </h2>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium">
            Manage
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-200 space-y-2 flex-shrink-0">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 sm:py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Cat:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[80px]"
            >
              <option>All</option>
              <option>Marketing</option>
              <option>Utility</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Lang:</span>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[80px]"
            >
              <option>All</option>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[80px]"
            >
              <option>All</option>
              <option>Text</option>
              <option>Image</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates List Header */}
      <div className="px-3 sm:px-4 py-1.5 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <div className="text-xs font-medium text-gray-600">Template name ▼</div>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTemplates.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-400 text-xs">
            No templates found
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onSelectTemplate(template);
                onClose();
              }}
              className="px-3 sm:px-4 py-3 border-b border-gray-100 hover:bg-purple-50 active:bg-purple-100 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-2 sm:gap-2.5">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                  {template.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-purple-600 mb-1">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] sm:text-xs rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {template.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplatesModal;
