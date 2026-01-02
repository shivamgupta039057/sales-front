"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

const MultiSelectDropdown = ({ options, selectedValues, onChange, placeholder = "Options" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const defaultOptions = [
    'Rajasthan',
    'Haryana',
    'Delhi',
    'Madhya Pradesh',
    'Bihar',
    'Chattisgarh',
    'Punjab',
    'Uttar Pradesh',
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Tamil Nadu',
  ];

  const availableOptions = options || defaultOptions;

  const filteredOptions = availableOptions.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleOption = (option) => {
    const newSelected = selectedValues.includes(option)
      ? selectedValues.filter(v => v !== option)
      : [...selectedValues, option];
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === filteredOptions.length) {
      onChange([]);
    } else {
      onChange([...filteredOptions]);
    }
  };

  const isAllSelected = filteredOptions.length > 0 && selectedValues.length === filteredOptions.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0] transition-all duration-200 hover:border-gray-300 flex items-center justify-between"
      >
        <span className="text-gray-700 truncate">
          {selectedValues.length > 0 
            ? `${selectedValues.length} selected` 
            : placeholder}
        </span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0] bg-purple-50"
              />
            </div>
          </div>

          {/* Select All */}
          <div className="p-2 border-b border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#5D5BD0] focus:ring-[#5D5BD0]/20"
              />
              <span className="text-xs font-medium text-gray-700">Select All</span>
            </label>
          </div>

          {/* Options */}
          <div className="overflow-y-auto flex-1 p-2 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-xs text-gray-500">No options found</p>
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 px-2 py-1.5 rounded transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={() => handleToggleOption(option)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#5D5BD0] focus:ring-[#5D5BD0]/20"
                  />
                  <span className="text-xs text-gray-700">{option}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
