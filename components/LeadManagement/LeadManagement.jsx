'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Box, BarChart3, Clock, ArrowUp, ArrowDown,
  Filter, Download, Upload, Phone, MapPin, Calendar,
  User, Edit, CreditCard, MoreVertical, RotateCcw, ChevronDown
} from 'lucide-react';

const LeadManagement = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const metrics = [
    {
      title: 'Total Leads',
      value: '250',
      trend: '+15% from last month',
      trendType: 'positive',
      icon: Users,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      iconShape: 'circle'
    },
    {
      title: 'Converted',
      value: '75',
      trend: '26.5% conversion rate',
      trendType: 'positive',
      icon: Box,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      iconShape: 'square'
    },
    {
      title: 'Follow-ups Today',
      value: '12',
      trend: '3 overdue',
      trendType: 'negative',
      icon: BarChart3,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      iconShape: 'circle'
    },
    {
      title: 'Revenue',
      value: '₹9.8L',
      trend: '+22% from last month',
      trendType: 'positive',
      icon: Clock,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      iconShape: 'circle'
    }
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Lead Management</h1>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-[10px] shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className={`${metric.iconBg} ${metric.iconShape === 'circle' ? 'rounded-full' : 'rounded-[10px]'} p-2 sm:p-3`}>
                  <IconComponent className={`${metric.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
                </div>
              </div>

              {/* Content */}
              <div className="pr-16 sm:pr-20">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{metric.value}</p>
                <div className="flex items-center gap-2">
                  {metric.trendType === 'positive' ? (
                    <>
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      <span className="text-xs sm:text-sm text-green-600 font-medium">{metric.trend}</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      <span className="text-xs sm:text-sm text-red-600 font-medium">{metric.trend}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-between items-start gap-3 md:gap-4 mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-[10px] relative">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-full border border-gray-300 hover:bg-white transition-colors"
              type="button"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Filter Dropdown Panel */}
            {isFilterOpen && (
              <div className="fixed lg:absolute top-16 lg:top-full left-4 lg:left-0 right-4 lg:right-auto lg:mt-2 bg-white rounded-[10px] shadow-xl max-w-xl w-auto lg:w-full p-4 md:p-6 z-50 border border-gray-200 max-h-[calc(100vh-8rem)] overflow-y-auto">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Other filters</h2>

                {/* Filter Fields */}
                <div className="space-y-4">
                  {/* Assigned Sales Person - First */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned Sales Person
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none border border-gray-300 rounded-[10px] px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                        <option>All Staff</option>
                        <option>Staff 1</option>
                        <option>Staff 2</option>
                        <option>Staff 3</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Assigned Sales Person - Second (Potential Duplicate, Remove for correction) */}
                  {/* 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned Sales Person
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none border border-gray-300 rounded-[10px] px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                        <option>All Staff</option>
                        <option>Staff 1</option>
                        <option>Staff 2</option>
                        <option>Staff 3</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  */}

                  {/* NEET Rank Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NEET Rank Range
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Min"
                        className="flex-1 border border-gray-300 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Max"
                        className="flex-1 border border-gray-300 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Visuti ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visuti ID
                    </label>
                    <input
                      type="text"
                      placeholder="Search by ID"
                      className="w-full border border-gray-300 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Search by number"
                      className="w-full border border-gray-300 rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="todayFollowup"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="todayFollowup" className="ml-2 text-sm text-gray-700">
                      Today Follow-up Leads
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-[10px] hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Handle apply filter logic here
                      setIsFilterOpen(false);
                    }}
                    className="px-6 py-2 text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Mobile Number"
            className="border border-gray-300 rounded-[10px] px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 sm:w-40"
          />
          <input
            type="text"
            placeholder="Student Name"
            className="border border-gray-300 rounded-[10px] px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 sm:w-40"
          />
          <div className="relative">
            <select className="appearance-none border border-gray-300 rounded-[10px] px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>Lead Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
              <option>Closed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 md:gap-2 text-red-600 hover:text-red-800 transition-colors px-2 md:px-3 py-1.5 md:py-2 rounded-[10px] hover:bg-red-50 text-xs md:text-sm"
          >
            <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-medium">Reset</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="p-1.5 md:p-2 rounded-[10px] border border-gray-300 hover:bg-white transition-colors">
            <Download className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
          <button type="button" className="p-1.5 md:p-2 rounded-[10px] border border-gray-300 hover:bg-white transition-colors">
            <Upload className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Kanban Board - Horizontal Scrollable */}
      <div className="overflow-x-auto scrollable-items pb-4 -mx-2 sm:-mx-4 px-2 sm:px-4">
        <div className="flex gap-3 md:gap-4 min-w-max">
          {/* Column 1: New, Contact Attempted, On Hold */}
          <div className="flex-shrink-0 w-[280px] sm:w-80">
            <div className="bg-yellow-100 rounded-t-lg p-2 md:p-3">
              <h2 className="font-semibold text-xs md:text-sm text-yellow-800">New, Contact Attempted, On Hold</h2>
            </div>
            <div className="bg-gray-50 rounded-b-lg p-2 md:p-3 space-y-2 md:space-y-3 min-h-[300px] md:min-h-[400px]">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-[10px] shadow-sm p-3 md:p-4 border border-gray-200">
                  <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Rohit Verma</h3>
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="break-all">+91 9876543216</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Madhya Pradesh</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>10 July 2025</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">15420</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">NEET UG</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-yellow-300 text-yellow-800">New</span>
                  </div>
                  <div className="flex justify-around items-center mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Edit className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Contacted, Interested, Follow-Up, In Discussion */}
          <div className="flex-shrink-0 w-[280px] sm:w-80">
            <div className="bg-teal-100 rounded-t-lg p-2 md:p-3">
              <h2 className="font-semibold text-xs md:text-sm text-teal-800">Contacted, Interested, Follow-Up, In Discussion</h2>
            </div>
            <div className="bg-gray-50 rounded-b-lg p-2 md:p-3 space-y-2 md:space-y-3 min-h-[300px] md:min-h-[400px]">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-[10px] shadow-sm p-3 md:p-4 border border-gray-200">
                  <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Rohit Verma</h3>
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="break-all">+91 9876543216</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Madhya Pradesh</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>10 July 2025</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">15420</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">NEET UG</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-green-500 text-white">Contacted</span>
                  </div>
                  <div className="flex justify-around items-center mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Edit className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Converted Lead */}
          <div className="flex-shrink-0 w-[280px] sm:w-80">
            <div className="bg-blue-100 rounded-t-lg p-2 md:p-3">
              <h2 className="font-semibold text-xs md:text-sm text-blue-800">Converted Lead</h2>
            </div>
            <div className="bg-gray-50 rounded-b-lg p-2 md:p-3 space-y-2 md:space-y-3 min-h-[300px] md:min-h-[400px]">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-[10px] shadow-sm p-3 md:p-4 border border-gray-200">
                  <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 md:mb-3">Rohit Verma</h3>
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="break-all">+91 9876543216</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Madhya Pradesh</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>10 July 2025</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">15420</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-gray-200 text-gray-700">NEET UG</span>
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-blue-500 text-white">Contacted</span>
                  </div>
                  <div className="flex justify-around items-center mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Edit className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;
