"use client";

import React, { useState } from "react";
import { X, Search, Phone, AlertCircle, Upload } from "lucide-react";
import ChooseTemplatesModal from "./ChooseTemplatesModal";
import MediaLibraryModal from "./MediaLibraryModal";

/**
 * SendWhatsAppOffcanvas - Right side sliding panel for WhatsApp template configuration
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - onSave: function (data)
 */
export default function SendWhatsAppOffcanvas({ isOpen, onClose, onSave }) {
  const [whatsappAccount, setWhatsappAccount] = useState("Visuti Career (918306575668)");
  const [phoneField, setPhoneField] = useState("WhatsApp Number");
  const [messageInterval, setMessageInterval] = useState("Once in an hour");
  const [templateLanguage, setTemplateLanguage] = useState("English");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [showIntervalDropdown, setShowIntervalDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const phoneFieldOptions = ["WhatsApp Number", "Alternate Number"];
  const messageIntervalOptions = ["Once in an hour", "Once in a day", "Everytime"];
  const languages = [
    "English", "Swahili", "Tamil", "Telugu", "Thai", "Turkish", 
    "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Welsh"
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  if (!isOpen) return null;

  const handleSave = () => {
    const data = {
      whatsappAccount,
      phoneField,
      messageInterval,
      templateLanguage,
      selectedTemplate,
    };
    onSave(data);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[999] animate-in fade-in duration-300"
      />

      {/* Offcanvas Panel */}
      <div className="fixed top-0 right-0 w-[520px] max-md:w-full h-screen bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.15)] z-[1000] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="m-0 text-base md:text-lg font-semibold text-gray-900">
            Send Whatsapp To Lead
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Error Message */}
          {!selectedTemplate && (
            <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-red-100 rounded-lg mb-4 md:mb-5">
              <AlertCircle size={16} className="text-red-600 shrink-0" />
              <span className="text-xs md:text-sm text-red-600">
                No Whatsapp Template Selected
              </span>
            </div>
          )}

          {/* Whatsapp Account */}
          <div className="mb-4 md:mb-5">
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
              Whatsapp Account
            </label>
            <div className="px-3 py-2 md:py-2.5 border border-gray-300 rounded-md bg-gray-50 text-xs md:text-sm text-gray-700 flex items-center justify-between">
              <span className="truncate">{whatsappAccount}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-2">
                <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* To Phone Field */}
          <div className="mb-4 md:mb-5 relative">
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
              To Phone Field
            </label>
            <div
              onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
              className="px-3 py-2 md:py-2.5 border border-gray-300 rounded-md text-xs md:text-sm text-gray-700 cursor-pointer flex items-center gap-2 justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 shrink-0" />
                <span>{phoneField}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {showPhoneDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {phoneFieldOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setPhoneField(option);
                      setShowPhoneDropdown(false);
                    }}
                    className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer transition-colors text-xs md:text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-100 ${phoneField === option ? 'bg-indigo-100 text-indigo-600' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={phoneField === option}
                      readOnly
                      className="accent-indigo-600"
                    />
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Interval */}
          <div className="mb-4 md:mb-5 relative">
            <label className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 mb-2">
              Message Interval
              <div
                className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] md:text-[11px] text-gray-500 cursor-help"
                title="How often to send messages"
              >
                ?
              </div>
            </label>
            <div
              onClick={() => setShowIntervalDropdown(!showIntervalDropdown)}
              className="px-3 py-2 md:py-2.5 border border-gray-300 rounded-md text-xs md:text-sm text-gray-700 cursor-pointer flex items-center justify-between hover:bg-gray-50"
            >
              <span>{messageInterval}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {showIntervalDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {messageIntervalOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setMessageInterval(option);
                      setShowIntervalDropdown(false);
                    }}
                    className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer transition-colors text-xs md:text-sm text-gray-700 hover:bg-gray-100 ${messageInterval === option ? 'bg-indigo-100 text-indigo-600' : ''}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Template Language */}
          <div className="mb-4 md:mb-5 relative">
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
              Template Language
            </label>
            <div
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="px-3 py-2 md:py-2.5 border border-gray-300 rounded-md text-xs md:text-sm text-gray-700 cursor-pointer flex items-center justify-between hover:bg-gray-50"
            >
              <span>{templateLanguage}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-[250px] md:max-h-[300px] overflow-y-auto">
                <div className="px-2 md:px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-300 rounded">
                    <Search size={14} className="text-gray-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search Fields"
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      className="border-none outline-none text-xs md:text-sm w-full"
                    />
                  </div>
                </div>
                {filteredLanguages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setTemplateLanguage(lang);
                      setShowLanguageDropdown(false);
                      setLanguageSearch("");
                    }}
                    className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer transition-colors text-xs md:text-sm text-gray-700 hover:bg-gray-100 ${templateLanguage === lang ? 'bg-indigo-100 text-indigo-600' : ''}`}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Choose Whatsapp Template */}
          <div className="mb-4 md:mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700">
                Choose Whatsapp Template
              </label>
              <button
                onClick={() => setTemplateModalOpen(true)}
                className="px-3 md:px-4 py-1.5 bg-white border border-indigo-600 rounded-md text-xs md:text-sm font-semibold text-indigo-600 cursor-pointer transition-all hover:bg-indigo-50"
              >
                Select
              </button>
            </div>
            <div
              className={`${selectedTemplate ? 'p-3 md:p-4' : 'py-8 md:py-10'} border border-dashed border-gray-300 rounded-md ${selectedTemplate ? 'text-left' : 'text-center'} ${selectedTemplate ? 'text-gray-700' : 'text-gray-400'} text-xs md:text-sm ${selectedTemplate ? 'bg-gray-50' : 'bg-transparent'}`}
            >
              {selectedTemplate ? (
                <div className="space-y-3">
                  {/* Upload Image Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setMediaLibraryOpen(true)}
                      className="px-4 md:px-6 py-2 md:py-2.5 bg-purple-600 text-white rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors"
                    >
                      <Upload size={16} />
                      Upload Image
                    </button>
                  </div>

                  {/* Selected Image Preview */}
                  {selectedImage && (
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-600 mb-2">Selected Image:</div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center text-white font-bold text-xs shrink-0">
                          IMG
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">{selectedImage.name}</div>
                          <div className="text-[10px] text-gray-500">{selectedImage.size}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Template Details */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="font-semibold mb-2 text-gray-900 text-xs md:text-sm">
                      {selectedTemplate.title}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-600 bg-white p-2 rounded whitespace-pre-line line-clamp-4 md:line-clamp-none">
                      {selectedTemplate.preview}
                    </div>
                  </div>
                </div>
              ) : (
                "No template selected"
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex gap-2 md:gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 md:px-5 py-2 md:py-2.5 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-semibold text-gray-700 cursor-pointer transition-all hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 md:px-5 py-2 md:py-2.5 bg-indigo-600 border-none rounded-md text-xs md:text-sm font-semibold text-white cursor-pointer transition-colors hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Choose Templates Modal */}
      <ChooseTemplatesModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onSelect={(template) => {
          setSelectedTemplate(template);
          setTemplateModalOpen(false);
        }}
      />

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        onSelect={(file) => {
          setSelectedImage(file);
          setMediaLibraryOpen(false);
        }}
      />
    </>
  );
}
