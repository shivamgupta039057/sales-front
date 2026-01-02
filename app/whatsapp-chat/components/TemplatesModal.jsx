"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, MessageSquare, Search } from 'lucide-react';

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate, buttonRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const tooltipRef = useRef(null);

  const templates = [
    {
      id: 1,
      name: 'aiims',
      category: 'Marketing',
      icon: '🖼️',
      content: '*AIIMS EXPECTED CUT OFF 20225*\n\nAIIMS CUT OFF DATA ANALYSIS CHECK WITH YOUR RANK POSSIBLE AIIMS 2025\n\nhttps://youtu.be/ziNFrqOizEl\n\nऐसे स्टूडेंट जिन्होंने अभी तक अपनी काउंसलिंग के लिए रजिस्ट्रेशन नहीं करवाया है वो अपना रजिस्ट्रेशन जल्द से जल्द करवा लें क्योंकि लिमिटेड सीट अवेलेबल\n\nFREE COUNSELLING के लिए हमारे रेतीगाम नेनल को ज्वाइन करे जिससे आपको सभी जानकारी समय पर मिल सके\nhttps://t.me/visuticareer\n\nThanks and regards\nVisuti Career\n10+ Experience\nwww.visuticareer.com',
      language: 'English',
      hasImage: true,
      hasButtons: false,
      header: '*AIIMS EXPECTED CUT OFF 20225*',
      body: 'AIIMS CUT OFF DATA ANALYSIS CHECK WITH YOUR RANK POSSIBLE AIIMS 2025\n\nhttps://youtu.be/ziNFrqOizEl\n\nऐसे स्टूडेंट जिन्होंने अभी तक अपनी काउंसलिंग के लिए रजिस्ट्रेशन नहीं करवाया है वो अपना रजिस्ट्रेशन जल्द से जल्द करवा लें क्योंकि लिमिटेड सीट अवेलेबल\n\nFREE COUNSELLING के लिए हमारे रेतीगाम नेनल को ज्वाइन करे जिससे आपको सभी जानकारी समय पर मिल सके\nhttps://t.me/visuticareer\n\nThanks and regards\nVisuti Career\n10+ Experience',
      footer: 'www.visuticareer.com'
    },
    {
      id: 2,
      name: 'documents',
      category: 'Marketing',
      icon: 'T',
      content: '*Hello Sir/Ma\'am* 😊\n\n*Please share All These documents in Clear Scan JPG format*\n\n1. 10th Marksheet\n2. 12th Marksheet\n3. NEET Scorecard\n4. Aadhar Card\n5. Category Certificate (if applicable)',
      language: 'English',
      hasImage: false,
      hasButtons: false,
      header: '*Hello Sir/Ma\'am* 😊',
      body: '*Please share All These documents in Clear Scan JPG format*\n\n1. 10th Marksheet\n2. 12th Marksheet\n3. NEET Scorecard\n4. Aadhar Card\n5. Category Certificate (if applicable)'
    },
    {
      id: 3,
      name: 'hello_world',
      category: 'Utility',
      icon: 'T',
      content: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.',
      language: 'English',
      hasImage: false,
      hasButtons: false,
      body: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.'
    },
    {
      id: 4,
      name: 'kerala',
      category: 'Marketing',
      icon: '🖼️',
      content: '*NEET KERALA REGISTRATION START 2025*\n\nकेरल में NEET APPLICATION के लिए फॉर्म भरना शुरू हो गया है\n\nजल्द से जल्द अपना रजिस्ट्रेशन करवाएं\n\nअधिक जानकारी के लिए संपर्क करें',
      language: 'Hindi',
      hasImage: true,
      hasButtons: false,
      header: '*NEET KERALA REGISTRATION START 2025*',
      body: 'केरल में NEET APPLICATION के लिए फॉर्म भरना शुरू हो गया है\n\nजल्द से जल्द अपना रजिस्ट्रेशन करवाएं\n\nअधिक जानकारी के लिए संपर्क करें'
    },
    {
      id: 5,
      name: 'neet',
      category: 'Marketing',
      icon: '🖼️',
      content: '*NEET 2025 Application Form*\n\nNEET Application Form filling has started. Register now to secure your seat.\n\nFor more details, contact us.',
      language: 'English',
      hasImage: true,
      hasButtons: false,
      header: '*NEET 2025 Application Form*',
      body: 'NEET Application Form filling has started. Register now to secure your seat.\n\nFor more details, contact us.'
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
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, [isOpen, onClose, buttonRef]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || template.category === categoryFilter;
    const matchesLanguage = languageFilter === 'All' || template.language === languageFilter;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const handleMouseEnter = (template, event) => {
    // clear any pending close
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const dropdownRect = dropdownRef.current?.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 10,
      y: dropdownRect?.top || rect.top,
      height: dropdownRect?.height || 500
    });
    setHoveredTemplate(template);
  };

  const handleMouseLeave = (e) => {
    // small delay to allow mouse to move into tooltip
    hoverTimeoutRef.current = setTimeout(() => {
      // if tooltip is hovered, keep open
      const tt = tooltipRef.current;
      if (tt && tt.matches && tt.matches(':hover')) {
        return;
      }
      setHoveredTemplate(null);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  const handleTooltipMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    // close immediately when leaving tooltip
    setHoveredTemplate(null);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-2xl w-[600px] md:w-[700px] max-h-[500px] flex flex-col z-[9999] border border-gray-200 animate-slideUp"
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
          <button className="text-xs sm:text-sm hover:opacity-80 font-medium" style={{ color: '#5D5BD0' }}>
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
            className="w-full pl-9 pr-3 py-2 sm:py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#5D5BD0' }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #5D5BD0'}
            onBlur={(e) => e.target.style.boxShadow = ''}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600">Cat:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none min-w-[80px]"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #5D5BD0'}
              onBlur={(e) => e.target.style.boxShadow = ''}
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
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none min-w-[80px]"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #5D5BD0'}
              onBlur={(e) => e.target.style.boxShadow = ''}
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
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none min-w-[80px]"
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #5D5BD0'}
              onBlur={(e) => e.target.style.boxShadow = ''}
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
              onMouseEnter={(e) => handleMouseEnter(template, e)}
              onMouseLeave={handleMouseLeave}
              className="px-3 sm:px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors relative"
              style={{
                '--hover-bg': '#F3F3FF',
                '--active-bg': '#E8E8FF'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F3FF'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
              onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#E8E8FF'}
              onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#F3F3FF'}
            >
              <div className="flex items-start gap-2 sm:gap-2.5">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                  {template.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: '#5D5BD0' }}>
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

      {/* Hover Preview Tooltip */}
      {hoveredTemplate && (
        <div
          ref={tooltipRef}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          className="fixed bg-white border rounded-lg shadow-2xl z-[100] animate-slideFromLeft flex flex-col"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            height: `${tooltipPosition.height}px`,
            width: '420px',
            maxWidth: '420px',
            borderColor: '#e5e7eb'
          }}
        >
          {/* Template Name Header */}
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h4 className="font-semibold text-sm text-gray-800">
              {hoveredTemplate.name}
            </h4>
          </div>

          {/* Template Preview Content */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {/* Image Placeholder */}
            {hoveredTemplate.hasImage && (
              <div className="mb-4 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200 p-8 flex flex-col items-center justify-center">
                <svg
                  className="w-12 h-12 text-purple-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium" style={{ color: '#5D5BD0' }}>
                  No file selected
                </span>
              </div>
            )}

            {/* Message Content */}
            <div className="space-y-3">
              {/* Header */}
              {hoveredTemplate.header && (
                <div className="font-bold text-base text-gray-900">
                  {hoveredTemplate.header.replace(/\*/g, '')}
                </div>
              )}

              {/* Body */}
              {hoveredTemplate.body && (
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {hoveredTemplate.body.split('\n').map((line, idx) => {
                    // Check if line contains a URL
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    if (urlRegex.test(line)) {
                      return (
                        <div key={idx} className="my-1">
                          {line.split(urlRegex).map((part, i) =>
                            urlRegex.test(part) ? (
                              <a
                                key={i}
                                href={part}
                                className="font-medium hover:underline"
                                style={{ color: '#5D5BD0' }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {part}
                              </a>
                            ) : (
                              <span key={i}>{part.replace(/\*/g, '')}</span>
                            )
                          )}
                        </div>
                      );
                    }
                    return <div key={idx}>{line.replace(/\*/g, '')}</div>;
                  })}
                </div>
              )}

              {/* Footer */}
              {hoveredTemplate.footer && (
                <div className="text-xs pt-2 border-t border-gray-100">
                  <a
                    href={hoveredTemplate.footer}
                    className="font-medium hover:underline"
                    style={{ color: '#5D5BD0' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hoveredTemplate.footer}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Language Footer */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Language: {hoveredTemplate.language}</span>
              <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                {hoveredTemplate.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesModal;
