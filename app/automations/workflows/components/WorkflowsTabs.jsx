'use client';

import React from 'react';

const WorkflowsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'published', label: 'Published' },
    { id: 'draft', label: 'Draft' }
  ];

  return (
    <div className="flex border-b border-gray-200 px-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-[#5D5BD0]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D5BD0]"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default WorkflowsTabs;

