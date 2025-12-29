"use client";

import React, { useState } from 'react';
import { X, Phone, Clock, MessageCircle, Mail, StickyNote, ChevronDown, Star, Calendar, Hash, ChevronUp, FileText } from 'lucide-react';

const ProfileOffcanvas = ({ isOpen, onClose, contact }) => {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // 'call', 'callLater', 'whatsapp', 'sms', 'addNote'
  const [historyTab, setHistoryTab] = useState('activity'); // 'activity' or 'task'
  const [followupTime, setFollowupTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [assignTo, setAssignTo] = useState('Me');
  const [noteText, setNoteText] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'in', dial: '91', name: 'India' });
  const [selectedAltCountry, setSelectedAltCountry] = useState({ code: 'in', dial: '91', name: 'India' });
  const [countrySearch, setCountrySearch] = useState('');
  const [expandedActivity, setExpandedActivity] = useState({});
  
  const countries = [
    { code: 'in', dial: '91', name: 'India' },
    { code: 'us', dial: '1', name: 'United States' },
    { code: 'gb', dial: '44', name: 'United Kingdom' },
    { code: 'af', dial: '93', name: 'Afghanistan' },
    { code: 'al', dial: '355', name: 'Albania' },
    { code: 'dz', dial: '213', name: 'Algeria' },
    { code: 'as', dial: '1', name: 'American Samoa' },
    { code: 'ae', dial: '971', name: 'United Arab Emirates' },
    { code: 'au', dial: '61', name: 'Australia' },
    { code: 'bd', dial: '880', name: 'Bangladesh' },
    { code: 'ca', dial: '1', name: 'Canada' },
    { code: 'cn', dial: '86', name: 'China' },
    { code: 'fr', dial: '33', name: 'France' },
    { code: 'de', dial: '49', name: 'Germany' },
    { code: 'pk', dial: '92', name: 'Pakistan' },
  ];

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.dial.includes(countrySearch)
  );
  
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    whatsappNumber: '919057280563',
    alternateNumber: '',
    interestedCourse: '',
    studentCategory: '',
    expectedScore: '',
    state: '',
    specialComment: '',
    neetAttempts: '',
    email: '',
    address: '',
    interestedDate: '',
    check: '',
    createdOn: '6d ago'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleActionClick = (action) => {
    setActiveTab(action);
  };

  const handleFollowupSubmit = () => {
    const time = followupTime === 'custom' ? customTime : followupTime;
    console.log('Followup created for:', time, 'assigned to:', assignTo);
    alert(`Followup created for ${time}`);
    setActiveTab(null);
    setFollowupTime('');
    setCustomTime('');
  };

  const handleNoteSubmit = () => {
    console.log('Note added:', noteText);
    alert('Note added successfully!');
    setNoteText('');
    setActiveTab(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Offcanvas Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[90%] md:w-[600px] lg:max-w-2xl bg-white shadow-2xl z-50 transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="text-base sm:text-lg font-semibold text-gray-800 border border-transparent hover:border-gray-300 focus:border-[#5D5BD0] rounded px-2 py-1 focus:outline-none bg-transparent hover:bg-gray-50 transition-colors flex-1"
            placeholder="Enter name"
          />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {/* Profile Section */}
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#5D5BD0] flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="font-semibold text-base sm:text-lg text-gray-800 border border-transparent hover:border-gray-300 focus:border-[#5D5BD0] rounded px-2 py-1 focus:outline-none bg-transparent hover:bg-gray-50 transition-colors w-full"
                  placeholder="Enter full name"
                />
                <div className="flex items-center gap-1 mt-1">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                    {contact.status}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="flex items-center gap-1 text-xs sm:text-xs text-gray-600 mb-1">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  WhatsApp Number
                </label>
                <div className="flex items-center gap-1 relative">
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCountryDropdown(!showCountryDropdown);
                        setShowAltCountryDropdown(false);
                      }}
                      className="flex items-center gap-1 px-2 py-1.5 sm:py-1 border border-gray-200 rounded hover:bg-gray-50 min-h-[36px] sm:min-h-0"
                    >
                      <img src={`https://flagcdn.com/w20/${selectedCountry.code}.png`} alt={selectedCountry.code} className="w-5 h-auto" />
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </button>
                    
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-[calc(100vw-2rem)] sm:w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                        <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                          <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded">
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country name or dial code"
                              className="flex-1 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-64">
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowCountryDropdown(false);
                                setCountrySearch('');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-left"
                            >
                              <img src={`https://flagcdn.com/w20/${country.code}.png`} alt={country.code} className="w-5 h-auto" />
                              <span className="text-sm flex-1">{country.name} ({country.dial})</span>
                              {selectedCountry.code === country.code && (
                                <span className="text-blue-500">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{selectedCountry.dial}</span>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="flex-1 text-sm font-medium text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                    placeholder="Enter number"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <Phone className="w-3.5 h-3.5" />
                  Alternate Number
                </label>
                <div className="flex items-center gap-1 relative">
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowAltCountryDropdown(!showAltCountryDropdown);
                        setShowCountryDropdown(false);
                      }}
                      className="flex items-center gap-1 px-2 py-1.5 sm:py-1 border border-gray-200 rounded hover:bg-gray-50 min-h-[36px] sm:min-h-0"
                    >
                      <img src={`https://flagcdn.com/w20/${selectedAltCountry.code}.png`} alt={selectedAltCountry.code} className="w-5 h-auto" />
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </button>
                    
                    {showAltCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-[calc(100vw-2rem)] sm:w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
                        <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                          <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded">
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country name or dial code"
                              className="flex-1 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto max-h-64">
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              onClick={() => {
                                setSelectedAltCountry(country);
                                setShowAltCountryDropdown(false);
                                setCountrySearch('');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-left"
                            >
                              <img src={`https://flagcdn.com/w20/${country.code}.png`} alt={country.code} className="w-5 h-auto" />
                              <span className="text-sm flex-1">{country.name} ({country.dial})</span>
                              {selectedAltCountry.code === country.code && (
                                <span className="text-blue-500">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{selectedAltCountry.dial}</span>
                  <input
                    type="tel"
                    value={formData.alternateNumber}
                    onChange={(e) => handleInputChange('alternateNumber', e.target.value)}
                    className="flex-1 text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                    placeholder="Enter Phone N..."
                  />
                </div>
              </div>
            </div>

            {/* Course & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <StickyNote className="w-3.5 h-3.5" />
                  Interested Course
                </label>
                <select
                  value={formData.interestedCourse}
                  onChange={(e) => handleInputChange('interestedCourse', e.target.value)}
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                >
                  <option value="">Select Course</option>
                  <option value="MBBS">MBBS</option>
                  <option value="BDS">BDS</option>
                  <option value="BAMS">BAMS</option>
                  <option value="BHMS">BHMS</option>
                  <option value="BSc Nursing">BSc Nursing</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <StickyNote className="w-3.5 h-3.5" />
                  Student Category
                </label>
                <select
                  value={formData.studentCategory}
                  onChange={(e) => handleInputChange('studentCategory', e.target.value)}
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>

            {/* Score & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-gray-600 mb-1 block"># Expected Score</label>
                <input
                  type="number"
                  value={formData.expectedScore}
                  onChange={(e) => handleInputChange('expectedScore', e.target.value)}
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                  placeholder="Enter score"
                />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                  <StickyNote className="w-3.5 h-3.5" />
                  State
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                >
                  <option value="">Select State</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>
            </div>

            {/* Special Comment */}
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Special Comment</label>
              <textarea
                value={formData.specialComment}
                onChange={(e) => handleInputChange('specialComment', e.target.value)}
                className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#5D5BD0] bg-white resize-none"
                placeholder="Add a comment..."
                rows={2}
              />
            </div>

            {/* NEET Attempts */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                <StickyNote className="w-3.5 h-3.5" />
                How Many attempt in NEET
              </label>
              <select
                value={formData.neetAttempts}
                onChange={(e) => handleInputChange('neetAttempts', e.target.value)}
                className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#5D5BD0] bg-white"
              >
                <option value="">Select Attempts</option>
                <option value="1">1st Attempt</option>
                <option value="2">2nd Attempt</option>
                <option value="3">3rd Attempt</option>
                <option value="4+">4+ Attempts</option>
              </select>
            </div>

            {/* Show More Button */}
            <button 
              onClick={() => setShowMore(!showMore)}
              className="w-full py-2.5 sm:py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center justify-center gap-1 min-h-[40px] sm:min-h-0"
            >
              {showMore ? 'Show less' : 'Show more'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
            </button>

            {/* Additional Fields (when showMore is true) */}
            {showMore && (
              <div className="space-y-3 sm:space-y-4 pt-2 border-t border-gray-200">
                {/* Interested Date & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Interested Date
                    </label>
                    <input
                      type="date"
                      value={formData.interestedDate}
                      onChange={(e) => handleInputChange('interestedDate', e.target.value)}
                      className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1.5 sm:py-1 focus:outline-none focus:border-[#5D5BD0] bg-white min-h-[36px] sm:min-h-0"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                {/* Check & Created On */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <StickyNote className="w-3.5 h-3.5" />
                      check
                    </label>
                    <input
                      type="text"
                      value={formData.check}
                      onChange={(e) => handleInputChange('check', e.target.value)}
                      className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#5D5BD0] bg-white"
                      placeholder="Empty"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Created On
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.createdOn}
                        onChange={(e) => handleInputChange('createdOn', e.target.value)}
                        className="flex-1 text-sm text-gray-800 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#5D5BD0] bg-white"
                        placeholder="6d ago"
                      />
                      <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full text-sm text-gray-800 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#5D5BD0] bg-white resize-none"
                    placeholder="Enter address"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              <button 
                onClick={() => handleActionClick('call')}
                className={`flex flex-col items-center gap-1 p-2.5 sm:p-2 rounded transition-all min-h-[60px] sm:min-h-0 ${activeTab === 'call' ? 'bg-[#5D5BD0] text-white' : 'hover:bg-gray-50'}`}
              >
                <Phone className={`w-5 h-5 sm:w-5 sm:h-5 ${activeTab === 'call' ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'call' ? 'text-white font-medium' : 'text-gray-600'}`}>CALL</span>
              </button>
              <button 
                onClick={() => handleActionClick('callLater')}
                className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${activeTab === 'callLater' ? 'bg-[#5D5BD0] text-white' : 'hover:bg-gray-50'}`}
              >
                <Clock className={`w-5 h-5 ${activeTab === 'callLater' ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'callLater' ? 'text-white font-medium' : 'text-gray-600'}`}>CALL LATER</span>
              </button>
              <button 
                onClick={() => handleActionClick('whatsapp')}
                className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${activeTab === 'whatsapp' ? 'bg-green-600 text-white' : 'hover:bg-gray-50'}`}
              >
                <MessageCircle className={`w-5 h-5 ${activeTab === 'whatsapp' ? 'text-white' : 'text-green-600'}`} />
                <span className={`text-xs ${activeTab === 'whatsapp' ? 'text-white font-medium' : 'text-gray-600'}`}>WHATSAPP</span>
              </button>
              <button 
                onClick={() => handleActionClick('sms')}
                className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${activeTab === 'sms' ? 'bg-[#5D5BD0] text-white' : 'hover:bg-gray-50'}`}
              >
                <Mail className={`w-5 h-5 ${activeTab === 'sms' ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'sms' ? 'text-white font-medium' : 'text-gray-600'}`}>SMS</span>
              </button>
              <button 
                onClick={() => handleActionClick('addNote')}
                className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${activeTab === 'addNote' ? 'bg-[#5D5BD0] text-white' : 'hover:bg-gray-50'}`}
              >
                <StickyNote className={`w-5 h-5 ${activeTab === 'addNote' ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs ${activeTab === 'addNote' ? 'text-white font-medium' : 'text-gray-600'}`}>ADD NOTE</span>
              </button>
            </div>

            {/* Action Tab Content */}
            {activeTab && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                {/* CALL LATER Tab */}
                {activeTab === 'callLater' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Create Followup for:</h4>
                      <div className="flex items-center gap-2">
                        <select
                          value={assignTo}
                          onChange={(e) => setAssignTo(e.target.value)}
                          className="text-sm text-[#5D5BD0] font-medium border-none bg-transparent focus:outline-none cursor-pointer"
                        >
                          <option value="Me">Me</option>
                          <option value="Team">Team</option>
                          <option value="Manager">Manager</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#5D5BD0]" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                      <span>In</span>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setFollowupTime('5min')}
                          className={`px-3 py-2 sm:py-1.5 rounded border min-h-[36px] sm:min-h-0 ${followupTime === '5min' ? 'border-[#5D5BD0] bg-[#5D5BD0] text-white' : 'border-gray-300 bg-white text-gray-600'}`}
                        >
                          5 min
                        </button>
                        <button
                          onClick={() => setFollowupTime('15min')}
                          className={`px-3 py-1.5 rounded border ${followupTime === '15min' ? 'border-[#5D5BD0] bg-[#5D5BD0] text-white' : 'border-gray-300 bg-white text-gray-600'}`}
                        >
                          15 min
                        </button>
                        <button
                          onClick={() => setFollowupTime('1hr')}
                          className={`px-3 py-1.5 rounded border ${followupTime === '1hr' ? 'border-[#5D5BD0] bg-[#5D5BD0] text-white' : 'border-gray-300 bg-white text-gray-600'}`}
                        >
                          1 hr
                        </button>
                        <button
                          onClick={() => setFollowupTime('custom')}
                          className={`px-3 py-1.5 rounded border ${followupTime === 'custom' ? 'border-[#5D5BD0] bg-[#5D5BD0] text-white' : 'border-gray-300 bg-white text-gray-600'}`}
                        >
                          Custom
                        </button>
                      </div>
                    </div>

                    {followupTime === 'custom' && (
                      <input
                        type="datetime-local"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5D5BD0]"
                      />
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setActiveTab(null)}
                        className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleFollowupSubmit}
                        disabled={!followupTime}
                        className="flex-1 px-4 py-2 text-sm text-white bg-[#5D5BD0] rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                )}

                {/* ADD NOTE Tab */}
                {activeTab === 'addNote' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Add Note</h4>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write your note here..."
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5D5BD0] resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab(null)}
                        className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleNoteSubmit}
                        disabled={!noteText.trim()}
                        className="flex-1 px-4 py-2 text-sm text-white bg-[#5D5BD0] rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {/* CALL Tab */}
                {activeTab === 'call' && (
                  <div className="space-y-3 text-center">
                    <Phone className="w-12 h-12 mx-auto text-[#5D5BD0]" />
                    <p className="text-sm text-gray-700">Calling {formData.whatsappNumber}...</p>
                    <button
                      onClick={() => setActiveTab(null)}
                      className="px-6 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      End Call
                    </button>
                  </div>
                )}

                {/* WHATSAPP Tab */}
                {activeTab === 'whatsapp' && (
                  <div className="space-y-3 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto text-green-600" />
                    <p className="text-sm text-gray-700">Opening WhatsApp...</p>
                    <button
                      onClick={() => {
                        window.open(`https://wa.me/${formData.whatsappNumber}`, '_blank');
                        setActiveTab(null);
                      }}
                      className="px-6 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Open WhatsApp
                    </button>
                  </div>
                )}

                {/* SMS Tab */}
                {activeTab === 'sms' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Send SMS</h4>
                    <textarea
                      placeholder="Type your message..."
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5D5BD0] resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab(null)}
                        className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          alert('SMS sent successfully!');
                          setActiveTab(null);
                        }}
                        className="flex-1 px-4 py-2 text-sm text-white bg-[#5D5BD0] rounded hover:opacity-90"
                      >
                        Send SMS
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex gap-3 sm:gap-4 border-b border-gray-200">
                <button 
                  onClick={() => setHistoryTab('activity')}
                  className={`pb-2 px-0.5 sm:px-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${historyTab === 'activity' ? 'text-[#5D5BD0] border-b-2 border-[#5D5BD0]' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Activity History
                </button>
                <button 
                  onClick={() => setHistoryTab('task')}
                  className={`pb-2 px-0.5 sm:px-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${historyTab === 'task' ? 'text-[#5D5BD0] border-b-2 border-[#5D5BD0]' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Task
                </button>
              </div>
              <button className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-white bg-[#5D5BD0] rounded-lg hover:opacity-90 flex items-center gap-1 min-h-[32px] sm:min-h-0">
                <span>+ Action</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <select className="px-2.5 sm:px-3 py-2 sm:py-1.5 text-xs border border-gray-300 rounded bg-white text-gray-600 min-h-[36px] sm:min-h-0">
                <option>All Actions</option>
                <option>Field Changes</option>
                <option>Messages</option>
                <option>Calls</option>
              </select>
              <select className="px-2.5 sm:px-3 py-2 sm:py-1.5 text-xs border border-gray-300 rounded bg-white text-gray-600 min-h-[36px] sm:min-h-0">
                <option>Time</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <select className="px-2.5 sm:px-3 py-2 sm:py-1.5 text-xs border border-gray-300 rounded bg-white text-gray-600 min-h-[36px] sm:min-h-0">
                <option>Team</option>
                <option>Me</option>
                <option>All Members</option>
              </select>
            </div>

            {/* Activity Content */}
            {historyTab === 'activity' && (
              <div className="space-y-2">
                {/* Special Comment Activity */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity1: !expandedActivity.activity1})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StickyNote className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-700 text-xs">Special Comment :</span>
                        <span className="text-gray-400 text-xs">null</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-600 italic text-xs">empty</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">1h ago (8:35 PM Mon, 29 Dec 25)</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity1 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                  {expandedActivity.activity1 && (
                    <div className="px-3 pb-3 text-xs text-gray-600 bg-gray-50">
                      <div className="p-2 bg-white rounded border border-gray-200">
                        Additional details about special comment change...
                      </div>
                    </div>
                  )}
                </div>

                {/* Student Category Activity */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity2: !expandedActivity.activity2})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="w-4 h-4 bg-gray-200 rounded shrink-0"></div>
                        <span className="text-gray-700 text-xs">Student Category :</span>
                        <span className="text-gray-400 italic text-xs">empty</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-800 font-medium text-xs">MBC</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">1h ago (8:35 PM Mon, 29 Dec 25)</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity2 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                  {expandedActivity.activity2 && (
                    <div className="px-3 pb-3 text-xs text-gray-600 bg-gray-50">
                      <div className="p-2 bg-white rounded border border-gray-200">
                        Category changed from empty to MBC
                      </div>
                    </div>
                  )}
                </div>

                {/* Expected Score Activity */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity3: !expandedActivity.activity3})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Hash className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-700 text-xs"># Expected Score :</span>
                        <span className="text-gray-400 text-xs">null</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-600 italic text-xs">empty</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">2h</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity3 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                {/* Status Change Activity */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity4: !expandedActivity.activity4})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StickyNote className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-700 text-xs">Status changed from</span>
                        <span className="text-gray-800 font-medium text-xs">Just Curious</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-800 font-medium text-xs">test</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">5h</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity4 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                {/* Name Change Activities */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity5: !expandedActivity.activity5})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StickyNote className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-700 text-xs">Name :</span>
                        <span className="text-gray-400 italic text-xs">empty</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-800 font-medium text-xs">Shivam</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">1d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity5 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity6: !expandedActivity.activity6})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <FileText className="w-3.5 h-3.5 text-gray-500 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StickyNote className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-700 text-xs">Name :</span>
                        <span className="text-gray-800 text-xs">Shivam Gupta</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-gray-400 italic text-xs">empty</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">1d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity6 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                {/* WhatsApp Messages */}
                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity7: !expandedActivity.activity7})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-800 font-medium">H</div>
                      <div className="text-xs text-gray-400 mt-1">3d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity7 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity8: !expandedActivity.activity8})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-[#5D5BD0] underline cursor-pointer">View Image</span>
                        <span className="text-xs text-gray-600 truncate">*AIIMS EXPECTED CUT OFF 20225*...</span>
                        <span className="text-gray-400 text-xs">✓✓</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">3d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity8 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity9: !expandedActivity.activity9})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-800">Hello</div>
                      <div className="text-xs text-gray-400 mt-1">5d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity9 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity10: !expandedActivity.activity10})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-800">Hii</div>
                      <div className="text-xs text-gray-400 mt-1">5d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity10 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity11: !expandedActivity.activity11})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-800">dddd</span>
                        <span className="text-gray-400 text-xs">✓✓</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">5d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity11 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100">
                  <div 
                    className="flex items-start gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedActivity({...expandedActivity, activity12: !expandedActivity.activity12})}
                  >
                    <Star className="w-3.5 h-3.5 text-gray-400 mt-1 shrink-0" />
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-800">test</span>
                        <span className="text-gray-400 text-xs">✓✓</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">6d</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#5D5BD0] cursor-pointer">View in</span>
                      {expandedActivity.activity12 ? 
                        <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Task Content */}
            {historyTab === 'task' && (
              <div className="py-6 sm:py-8 text-center">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-xs sm:text-sm text-gray-400">No tasks yet</p>
                <button className="mt-3 px-4 py-2.5 sm:py-2 text-sm text-white bg-[#5D5BD0] rounded hover:opacity-90 min-h-[40px] sm:min-h-0">
                  Create Task
                </button>
              </div>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <button 
              onClick={() => {
                console.log('Saved Data:', formData);
                alert('Lead information updated successfully!');
              }}
              className="w-full py-3 sm:py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-0"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOffcanvas;
