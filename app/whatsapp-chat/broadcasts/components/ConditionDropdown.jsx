"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Grid3x3, ListCheck, Lightbulb, Star, List, Calendar, CheckSquare, UserCheck, TrendingUp, Award, Merge, Zap, PlayCircle, MessageSquare, Phone, Mail, Tag, Users, Type, Hash } from 'lucide-react';

const ConditionDropdown = ({ isOpen, onClose, onSelectCondition, triggerRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          triggerRef?.current && !triggerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const tabs = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'events', label: 'Events', icon: '⚡' },
    { id: 'communication', label: 'Communication', icon: '💬' },
    { id: 'fields', label: 'Fields', icon: '✓' },
  ];

  const conditionCategories = [
    {
      id: 'events',
      title: 'Events',
      items: [
        { icon: Phone, label: 'Phone', iconType: 'lucide', color: 'text-gray-600' },
        { icon: MessageSquare, label: 'WhatsApp', iconType: 'lucide', color: 'text-green-600' },
        { icon: Mail, label: 'Email', iconType: 'lucide', color: 'text-gray-600' },
        { icon: CheckSquare, label: 'SMS', iconType: 'lucide', color: 'text-blue-600' },
        { icon: Grid3x3, label: 'Form', iconType: 'lucide', color: 'text-purple-600' },
        { icon: CheckSquare, label: 'Assignee Change to', iconType: 'lucide', color: 'text-blue-600' },
        { icon: TrendingUp, label: 'Status Change to', iconType: 'lucide', color: 'text-green-600' },
        { icon: Award, label: 'Rating Change to', iconType: 'lucide', color: 'text-yellow-600' },
        { icon: CheckSquare, label: 'Lead Lost from', iconType: 'lucide', color: 'text-red-600' },
        { icon: CheckSquare, label: 'Lead Won from', iconType: 'lucide', color: 'text-emerald-600' },
        { icon: Merge, label: 'Lead Merged', iconType: 'lucide', color: 'text-purple-600' },
        { icon: Zap, label: 'Custom API', iconType: 'lucide', color: 'text-orange-600' },
        { icon: PlayCircle, label: 'Action Performed', iconType: 'lucide', color: 'text-indigo-600' },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      items: [
        { icon: '🌐', label: 'Website', iconType: 'emoji', color: 'text-blue-600' },
        { icon: '👥', label: 'Facebook', iconType: 'emoji', color: 'text-blue-600' },
        { icon: '₹', label: 'Payment', iconType: 'emoji', color: 'text-green-600' },
      ]
    },
    {
      id: 'fields',
      title: 'Fields',
      items: [
        { icon: User, label: 'Assignee', iconType: 'lucide', color: 'text-blue-600' },
        { icon: Grid3x3, label: 'Batch', iconType: 'lucide', color: 'text-purple-600' },
        { icon: ListCheck, label: 'Lead Status', iconType: 'lucide', color: 'text-green-600' },
        { icon: Lightbulb, label: 'Lost Reason', iconType: 'lucide', color: 'text-orange-600' },
        { icon: Star, label: 'Lead Rating', iconType: 'lucide', color: 'text-yellow-600' },
        { icon: Tag, label: 'List(s)', iconType: 'lucide', color: 'text-indigo-600' },
        { icon: Users, label: 'Created By', iconType: 'lucide', color: 'text-teal-600' },
        { icon: Type, label: 'Name', iconType: 'lucide', color: 'text-gray-600' },
        { icon: Phone, label: 'Whatsapp Number', iconType: 'lucide', color: 'text-green-600' },
        { icon: Phone, label: 'Alternate Number', iconType: 'lucide', color: 'text-gray-600' },
        { icon: CheckSquare, label: 'Interested Course', iconType: 'lucide', color: 'text-blue-600' },
        { icon: CheckSquare, label: 'Student Category', iconType: 'lucide', color: 'text-purple-600' },
        { icon: Hash, label: 'Expected Score', iconType: 'lucide', color: 'text-orange-600' },
        { icon: CheckSquare, label: 'State', iconType: 'lucide', color: 'text-gray-600' },
        { icon: Type, label: 'Special Comment', iconType: 'lucide', color: 'text-gray-600' },
        { icon: CheckSquare, label: 'How Many Attempt In Neet', iconType: 'lucide', color: 'text-blue-600' },
        { icon: Calendar, label: 'Interested Date', iconType: 'lucide', color: 'text-purple-600' },
        { icon: Mail, label: 'Email', iconType: 'lucide', color: 'text-gray-600' },
        { icon: Type, label: 'Check', iconType: 'lucide', color: 'text-gray-600' },
        { icon: Calendar, label: 'Created On', iconType: 'lucide', color: 'text-teal-600' },
        { icon: Calendar, label: 'Modified On', iconType: 'lucide', color: 'text-orange-600' },
      ]
    }
  ];

  const getFilteredCategories = () => {
    let categories = conditionCategories;
    
    if (activeTab !== 'all') {
      categories = categories.filter(cat => cat.id === activeTab);
    }

    return categories.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  };

  const filteredCategories = getFilteredCategories();

  const handleSelectCondition = (condition) => {
    onSelectCondition(condition);
    setSearchQuery('');
    setActiveTab('all');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes dropdownSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>

      {/* Dropdown */}
      <div 
        ref={dropdownRef}
        className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 z-[60] max-h-[420px] flex flex-col overflow-hidden"
        style={{ animation: 'dropdownSlideDown 0.25s ease-out' }}
      >
        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100 bg-white">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Add a new condition"
              autoFocus
              className="w-full pl-8 pr-3 py-2 border border-[#5D5BD0]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/30 focus:border-[#5D5BD0] transition-all duration-200 text-xs placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50/50">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#5D5BD0] text-white shadow-sm shadow-[#5D5BD0]/25'
                    : 'bg-white text-gray-600 hover:bg-white hover:shadow-sm border border-gray-200'
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-500 text-xs font-medium">No conditions found</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {activeTab === 'all' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-[1px] w-6 bg-gradient-to-r from-gray-300 to-transparent"></div>
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                        {category.title}
                      </h4>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-300 to-transparent"></div>
                    </div>
                  )}
                  <div className="space-y-1">
                    {category.items.map((item, itemIndex) => {
                      const IconComponent = item.iconType === 'lucide' ? item.icon : null;
                      return (
                        <button
                          key={itemIndex}
                          onClick={() => handleSelectCondition(item)}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#5D5BD0]/5 hover:to-[#5D5BD0]/10 border border-transparent hover:border-[#5D5BD0]/20 transition-all duration-200 group text-left"
                        >
                          {item.iconType === 'emoji' ? (
                            <span className="text-base flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                              {item.icon}
                            </span>
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                              <IconComponent className={`w-3.5 h-3.5 ${item.color} transition-transform duration-200 group-hover:scale-105`} />
                            </div>
                          )}
                          <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConditionDropdown;
