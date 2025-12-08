'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const WorkflowsFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  eventTypeFilter,
  onEventTypeFilterChange
}) => {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);
  const statusRef = useRef(null);
  const eventTypeRef = useRef(null);

  const statusOptions = ['All', 'On', 'Off'];
  const eventTypeOptions = ['All', 'Lead Creation', 'WhatsApp', 'Facebook', 'Replied', 'Status Change'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
      if (eventTypeRef.current && !eventTypeRef.current.contains(event.target)) {
        setEventTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search flowchart by Name"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20 focus:border-[#4880FF]"
        />
      </div>

      {/* Status Filter */}
      <div className="relative" ref={statusRef}>
        <button
          onClick={() => {
            setStatusDropdownOpen(!statusDropdownOpen);
            setEventTypeDropdownOpen(false);
          }}
          className="flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-[8px] text-sm bg-white hover:bg-gray-50 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20 focus:border-[#4880FF]"
        >
          <span className="text-gray-700">{statusFilter}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {statusDropdownOpen && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10">
            {statusOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onStatusFilterChange(option);
                  setStatusDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-[8px] last:rounded-b-[8px] ${
                  statusFilter === option ? 'bg-[#4880FF]/10 text-[#4880FF]' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Event Type Filter */}
      <div className="relative" ref={eventTypeRef}>
        <button
          onClick={() => {
            setEventTypeDropdownOpen(!eventTypeDropdownOpen);
            setStatusDropdownOpen(false);
          }}
          className="flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-[8px] text-sm bg-white hover:bg-gray-50 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20 focus:border-[#4880FF]"
        >
          <span className="text-gray-700">
            {eventTypeFilter === 'All' ? 'Select Event Types' : eventTypeFilter}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${eventTypeDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {eventTypeDropdownOpen && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10 max-h-60 overflow-y-auto">
            {eventTypeOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onEventTypeFilterChange(option);
                  setEventTypeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-[8px] last:rounded-b-[8px] ${
                  eventTypeFilter === option ? 'bg-[#4880FF]/10 text-[#4880FF]' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowsFilters;

