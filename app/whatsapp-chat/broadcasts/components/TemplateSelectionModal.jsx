"use client";

import React, { useState } from 'react';
import { Search, RefreshCw, ImageIcon } from 'lucide-react';

const TemplateSelectionModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [previewedTemplate, setPreviewedTemplate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'aiims',
      category: 'Marketing',
      description: '*AIIMS EXPECTED CUT OFF 20225* AIIMS CUT OFF DATA ANALYSIS CHE...',
      fullContent: `*AIIMS EXPECTED CUT OFF 20225*
AIIMS CUT OFF DATA ANALYSIS CHECK WITH YOUR RANK POSSIBLE AIIMS 2025

https://youtu.be/ziNFrqOizEl

ऐसे स्टूडेंट जिन्होंने अभी तक अपनी काउंसलिंग के लिए रजिस्ट्रेशन नहीं करवाया है वो अपना रजिस्ट्रेशन जल्द से जल्द करवा लें क्योंकि लिमिटेड सीट अवेलेबल

FREE COUNSELLING के लिए हमारे रेतीगाम नेनल को ज्वाइन करे जिससे आपको सभी जानकारी समय पर मिल सके

https://t.me/visuticareer

Thanks and regards
Visuti Career
10+ Experience
www.visuticareer.com`,
      status: null,
      icon: '📷',
    },
    {
      id: 2,
      name: 'documents',
      category: 'Marketing',
      description: '*Hello Sir/Ma\'am* 😊 *Please share All These documents in Clear Scan JP...',
      fullContent: '*Hello Sir/Ma\'am* 😊\n*Please share All These documents in Clear Scan JPEG format*',
      status: null,
      icon: 'T',
    },
    {
      id: 3,
      name: 'hello_world',
      category: 'Utility',
      description: 'Welcome and congratulations!! This message demonstrates your ability to se...',
      fullContent: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta.',
      status: null,
      icon: 'T',
    },
    {
      id: 4,
      name: 'karnatakaneet',
      category: 'Marketing',
      description: 'NEET MBBS KARNATAKA NEET UG REGISTRATION START कर्नाटका ने NEET...',
      fullContent: 'NEET MBBS KARNATAKA NEET UG REGISTRATION START कर्नाटका ने NEET APPLICATION के लिए रजिस्ट्रेशन शुरू कर दिया है',
      status: 'PENDING',
      icon: '📷',
    },
    {
      id: 5,
      name: 'kerala',
      category: 'Marketing',
      description: 'NEET KERALA REGISTRATION START 2025 केरल ने NEET APPLICATION के...',
      fullContent: 'NEET KERALA REGISTRATION START 2025 केरल ने NEET APPLICATION के लिए रजिस्ट्रेशन शुरू कर दिया है',
      status: null,
      icon: '📷',
    },
    {
      id: 6,
      name: 'neet',
      category: 'Marketing',
      description: 'NEET 2025 Registration Process Started...',
      fullContent: 'NEET 2025 Registration Process Started. Apply now before the deadline.',
      status: null,
      icon: '📷',
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setPreviewedTemplate(template);
  };

  const handleConfirmSelection = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
      `}</style>

      <div className="h-full flex flex-col bg-white">
        {/* Search and Filters */}
        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/30 focus:border-[#5D5BD0] transition-all duration-200 text-[11px] sm:text-xs placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs overflow-x-auto pb-1">
            <span className="text-gray-600 flex-shrink-0">Cat:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-200 rounded-md text-[10px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0]"
            >
              <option>All</option>
              <option>Marketing</option>
              <option>Utility</option>
            </select>

            <span className="text-gray-600 ml-1 sm:ml-2 flex-shrink-0">Lang:</span>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-200 rounded-md text-[10px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0]"
            >
              <option>All</option>
              <option>English</option>
              <option>Hindi</option>
            </select>

            <span className="text-gray-600 ml-1 sm:ml-2 flex-shrink-0">Type:</span>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-200 rounded-md text-[10px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0]"
            >
              <option>All</option>
              <option>Text</option>
              <option>Media</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Template List */}
          <div className="flex-1 border-r-0 md:border-r border-gray-100 flex flex-col max-h-[40vh] md:max-h-full">
            {/* Header */}
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-gray-700">
                <span>Template name</span>
                <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
              </div>
            </div>

            {/* Templates */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-3 sm:px-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">No templates found</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="p-1.5 sm:p-2">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleSelectTemplate(template)}
                      onMouseEnter={() => setPreviewedTemplate(template)}
                      className={`w-full flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg mb-1.5 sm:mb-2 transition-all duration-200 text-left ${
                        selectedTemplate?.id === template.id
                          ? 'bg-[#5D5BD0]/10 border-2 border-[#5D5BD0]'
                          : previewedTemplate?.id === template.id
                          ? 'bg-[#5D5BD0]/5 border border-[#5D5BD0]/20'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      {/* Icon */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {template.icon === '📷' ? (
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        ) : (
                          <span className="text-xs sm:text-sm font-semibold text-gray-600">{template.icon}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                          <h4 className="text-[10px] sm:text-xs font-semibold text-[#5D5BD0] truncate">{template.name}</h4>
                          {template.status && (
                            <span className="px-1.5 sm:px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[8px] sm:text-[9px] font-semibold rounded flex-shrink-0">
                              {template.status}
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-gray-600 mb-0.5 sm:mb-1">
                          {template.category}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 md:w-64 lg:w-80 md:flex-none bg-gray-50 flex flex-col items-center justify-start p-2 sm:p-3 border-t md:border-t-0 md:border-l border-gray-100 overflow-hidden">
            {previewedTemplate ? (
              <div className="w-full h-full flex flex-col">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg mx-auto p-3 sm:p-4 overflow-y-auto custom-scrollbar flex-1 max-h-full">
                  <div className="space-y-2 sm:space-y-3">
                    {previewedTemplate.icon === '📷' && (
                      <div className="w-full h-32 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                        <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="text-gray-700 text-[10px] sm:text-xs leading-relaxed whitespace-pre-wrap break-words">
                      {previewedTemplate.fullContent}
                    </div>
                  </div>
                </div>
                {!selectedTemplate && (
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium text-center mt-2">
                    Click to select template
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="w-40 h-56 sm:w-48 sm:h-80 bg-white/50 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <div className="text-gray-400">
                    <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                    <p className="text-[10px] sm:text-xs font-medium">Preview</p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Click on template to preview</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1 hidden sm:block">Click to select template</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border-t border-gray-100 bg-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Back
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedTemplate}
            className={`px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
              selectedTemplate
                ? 'bg-[#5D5BD0] text-white hover:bg-[#4a4ab8] shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Send broadcast
          </button>
        </div>
      </div>
    </>
  );
};

export default TemplateSelectionModal;
