"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Search, User, Grid3x3, ListCheck, Lightbulb, Star, List, Calendar, Phone, Mail, MessageSquare, File, CheckSquare, UserCheck, TrendingUp, Award, Merge, Zap, PlayCircle } from 'lucide-react';

const AddConditionModal = ({ isOpen, onClose, onSelectCondition, triggerRef }) => {
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
    { id: 'all', label: 'All', icon: null },
    { id: 'events', label: 'Events', icon: Zap },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'fields', label: 'Fields', icon: CheckSquare },
  ];

  const conditionCategories = [
    {
      id: 'events',
      title: 'Events',
      items: [
        { icon: UserCheck, label: 'Assignee Change to', color: 'text-blue-600' },
        { icon: TrendingUp, label: 'Status Change to', color: 'text-green-600' },
        { icon: Award, label: 'Rating Change to', color: 'text-yellow-600' },
        { icon: X, label: 'Lead Lost from', color: 'text-red-600' },
        { icon: CheckSquare, label: 'Lead Won from', color: 'text-emerald-600' },
        { icon: Merge, label: 'Lead Merged', color: 'text-purple-600' },
        { icon: Zap, label: 'Custom API', color: 'text-orange-600' },
        { icon: PlayCircle, label: 'Action Performed', color: 'text-indigo-600' },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      items: [
        { icon: Phone, label: 'WhatsApp', color: 'text-green-600', emoji: '📱' },
        { icon: MessageSquare, label: 'Facebook', color: 'text-blue-600', emoji: '👥' },
        { icon: Mail, label: 'Email', color: 'text-gray-600', emoji: '✉️' },
      ]
    },
    {
      id: 'fields',
      title: 'Fields',
      items: [
        { icon: User, label: 'Assignee', color: 'text-blue-600' },
        { icon: Grid3x3, label: 'Batch', color: 'text-purple-600' },
        { icon: ListCheck, label: 'Lead Status', color: 'text-green-600' },
        { icon: Lightbulb, label: 'Lost Reason', color: 'text-orange-600' },
        { icon: Star, label: 'Lead Rating', color: 'text-yellow-600' },
        { icon: List, label: 'List(s)', color: 'text-indigo-600' },
        { icon: Calendar, label: 'Created On', color: 'text-teal-600' },
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
      `}</style>

      {/* Dropdown */}
      <div 
        ref={dropdownRef}
        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col"
        style={{ animation: 'dropdownSlideDown 0.3s ease-out' }}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Add a new condition"
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0] transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-100 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#5D5BD0] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {TabIcon && <TabIcon className="w-4 h-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No conditions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {activeTab === 'all' && (
                    <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <span className="w-5 h-[2px] bg-gray-300"></span>
                      {category.title}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {category.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={itemIndex}
                          onClick={() => handleSelectCondition(item)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#5D5BD0]/5 hover:border-[#5D5BD0]/20 border border-transparent transition-all duration-200 group text-left"
                        >
                          {item.emoji ? (
                            <span className="text-lg">{item.emoji}</span>
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-all duration-200 flex-shrink-0">
                              <IconComponent className={`w-3.5 h-3.5 ${item.color}`} />
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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

export default AddConditionModal;
