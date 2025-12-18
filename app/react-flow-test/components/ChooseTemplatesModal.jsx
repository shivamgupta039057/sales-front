"use client";
import React, { useState } from "react";
import { Search, X, RefreshCw } from "lucide-react";

/**
 * ChooseTemplatesModal - Modal for selecting WhatsApp templates
 * Opens when clicking "Select" button in SendWhatsAppOffcanvas
 */
export default function ChooseTemplatesModal({ isOpen, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("Image");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Mock template data
  const templates = [
    {
      id: 1,
      name: "neetanswerkey",
      title: "NTA NEET ANSWER KEY AND OMR RELEASE 2025",
      preview: "Step by Step Complete details About OMR and answer key\n\nNTA की तरफ से official answer key release हो गयी है अगर आपने अपनी mail ID के द्वारा अपनी OMR एंड answer key डाउनलोड कर सकते है\n\nhttps://youtu.be/p_uH9oYC6iw",
      content: "Thanks & regards\nVisuti career\n10+ years of experience\n9145879646\nWWW.VISUTICAREER.COM\nCALL FOR COUNSELLING",
      type: "Image"
    },
    {
      id: 2,
      name: "neetcounsellingmo",
      title: "Welcome to Visuti Career Family",
      preview: "Hey\nWelcome to Visuti Career Family😊\n\nWe'll be Providing The Best 🏅 Medical Counselling Service Whereas You Have The wings To Fly 💸 With Your Dreams and Make Your Future Bright with us.☑️",
      content: "Our Expert Will Touch You Soon 😊\nMBBS/BDS/BAMS/BHMS\n\nCall For Our Counselling Team For any suggestion\n8306032668 (Tripti Sharma)\n9680651740 (Gaurav Sharma)\n9509769853 (Dinesh Sharma)\n7425059923 (Sonia Sharma)",
      type: "Image"
    },
    {
      id: 3,
      name: "aiims",
      title: "AIIMS EXPECTED CUT OFF 20225",
      preview: "AIIMS CUT OFF DATA ANALYSIS CHECK WITH YOUR RANK POSSIBLE AIIMS 2025\n\nhttps://youtu.be/ziNFrqOizEl",
      content: "FREE COUNSELLING के लिए हमारे टेलीग्राम चैनल को ज्वाइन करे जिससे आपको सभी जानकारी समय पर मिल सके\nhttps://t.me/visuticareer",
      type: "Image"
    },
    {
      id: 4,
      name: "kerala",
      title: "NEET KERALA REGISTRATION START 2025",
      preview: "केरल ने NEET APPLICATION के लिए फॉर्म जारी कर दिए है ऐसे स्टूडेंट जो केरल का ऑप्शन लेकर चलना चाहते है उनके लिए ये एक अच्छा ऑप्शन साबित होगा",
      content: "Last date 23/06/2025\n\nCounselling के लिए हमारी टीम को आप संपर्क कर सकते है जिससे आपको सही कहां कॉलेज मिलेगा जानकारी दी जाएगी।|\n\nhttps://youtu.be/DooMS15ylFU",
      type: "Image"
    }
  ];

  const languages = ["All Languages", "English", "Hindi", "English (Us)"];
  const categories = ["All Categories", "Marketing", "Utility"];
  const tabs = ["Image", "Video", "Text", "Document"];

  const filteredTemplates = templates.filter(
    (template) =>
      template.type === activeTab &&
      (searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-3 md:p-5 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-lg md:rounded-xl w-full max-w-[1400px] max-h-[95vh] md:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Choose Templates</h2>
            <RefreshCw size={16} className="text-gray-600 cursor-pointer hover:text-gray-800 md:w-[18px] md:h-[18px]" />
          </div>
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-800">
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row gap-3 md:gap-4 border-b border-gray-200 shrink-0">
          {/* Search Bar */}
          <div className="flex-1 md:min-w-[300px] relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 md:w-[18px] md:h-[18px]" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Language Dropdown */}
          <div className="relative w-full md:w-auto md:min-w-[200px]">
            <button
              onClick={() => {
                setLanguageDropdownOpen(!languageDropdownOpen);
                setCategoryDropdownOpen(false);
              }}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between text-xs md:text-sm text-purple-600 font-medium hover:bg-gray-100"
            >
              {selectedLanguage}
              <span className="text-xs">▼</span>
            </button>
            {languageDropdownOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-[100] max-h-[200px] overflow-y-auto">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer text-xs md:text-sm text-gray-700 hover:bg-gray-50 ${
                      selectedLanguage === lang ? "bg-gray-100" : ""
                    }`}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full md:w-auto md:min-w-[200px]">
            <button
              onClick={() => {
                setCategoryDropdownOpen(!categoryDropdownOpen);
                setLanguageDropdownOpen(false);
              }}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between text-xs md:text-sm text-purple-600 font-medium hover:bg-gray-100"
            >
              {selectedCategory}
              <span className="text-xs">▼</span>
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-[100]">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer text-xs md:text-sm text-gray-700 hover:bg-gray-50 ${
                      selectedCategory === cat ? "bg-gray-100" : ""
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 md:gap-6 px-4 md:px-6 pt-3 md:pt-4 border-b-2 border-gray-200 shrink-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 md:pb-3 -mb-0.5 text-xs md:text-sm font-medium flex items-center gap-1 md:gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {tab === "Image" && "🖼️"}
              {tab === "Video" && "🎥"}
              {tab === "Text" && "📝"}
              {tab === "Document" && "📄"}
              {tab}
            </button>
          ))}
        </div>

        {/* Templates Count */}
        <div className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm text-gray-600 shrink-0">
          {filteredTemplates.length} templates found
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 pb-4 md:pb-5">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-5 min-h-full w-full items-start">
            {/* Templates List */}
            <div
              className={`grid gap-3 md:gap-4 content-start ${
                selectedTemplate
                  ? "w-full lg:w-[48%] grid-cols-1"
                  : "flex-1 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
              }`}
            >
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`relative p-3 md:p-4 rounded-lg md:rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    selectedTemplate?.id === template.id
                      ? "border-2 border-purple-600 bg-purple-50"
                      : "border border-gray-200 bg-white"
                  }`}
                >
                  {/* Radio Button */}
                  <div
                    className={`absolute top-3 md:top-4 right-3 md:right-4 w-4 md:w-5 h-4 md:h-5 rounded-full bg-white ${
                      selectedTemplate?.id === template.id
                        ? "border-[5px] md:border-[6px] border-purple-600"
                        : "border-2 border-gray-300"
                    }`}
                  />

                  {/* Template Name Badge */}
                  <div className="inline-block bg-gray-100 text-gray-600 px-2 md:px-2.5 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium mb-2 md:mb-3">
                    {template.name}
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-[15px] font-semibold text-gray-900 mb-2 md:mb-3 leading-tight pr-6">
                    {template.title}
                  </h3>

                  {/* Preview */}
                  <div className="text-[11px] md:text-[13px] text-gray-600 leading-relaxed whitespace-pre-line line-clamp-6 md:line-clamp-8">
                    {template.preview}
                  </div>

                  {/* Footer */}
                  <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200 text-[10px] md:text-xs text-gray-400 truncate">
                    {template.content.split("\n")[0]}
                  </div>
                </div>
              ))}


              {filteredTemplates.length === 0 && (
                <div className="col-span-full text-center py-16 text-gray-400 text-sm">
                  No templates found matching your search.
                </div>
              )}
            </div>

            {/* Right Side Preview Panel */}
            {selectedTemplate && (
              <div className="w-full lg:w-[48%] border border-gray-200 rounded-lg md:rounded-xl bg-white flex flex-col h-fit max-h-[500px] lg:max-h-[600px] overflow-hidden shrink-0">
                {/* Preview Header */}
                <div className="px-4 md:px-5 py-3 md:py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg md:rounded-t-xl">
                  <div className="text-xs md:text-sm font-semibold text-gray-600">
                    {selectedTemplate.name}
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-4 md:p-5 flex-1 overflow-y-auto">
                  {/* Image Placeholder */}
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg py-8 md:py-10 px-6 md:px-8 text-center mb-4 md:mb-5">
                    <div className="text-4xl md:text-5xl mb-2 md:mb-3">🖼️</div>
                    <div className="text-xs md:text-sm text-purple-600 underline cursor-pointer">
                      No file selected
                    </div>
                  </div>

                  {/* Template Content */}
                  <div className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedTemplate.preview}
                    {"\n\n"}
                    {selectedTemplate.content}
                  </div>
                </div>

                {/* Preview Footer - Select Button */}
                <div className="px-4 md:px-5 py-3 md:py-4 border-t border-gray-200">
                  <button
                    onClick={handleSelect}
                    className="w-full py-2.5 md:py-3 bg-purple-600 text-white rounded-lg text-sm md:text-[15px] font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex justify-end gap-2 md:gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 border border-gray-300 rounded-lg bg-white text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedTemplate}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium ${
              selectedTemplate
                ? "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
