"use client";

import React, { useState } from "react";
import { Search, X, Upload, Download, Edit2, Trash2 } from "lucide-react";

/**
 * MediaLibraryModal - Modal for selecting media files from library
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - onSelect: function (file)
 */
export default function MediaLibraryModal({ isOpen, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Image");
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock media files data
  const mediaFiles = [
    {
      id: 1,
      name: "karnataka-neet-ug_06-07-2025-11:14:27.jpg",
      size: "406 KB",
      uploadedOn: "5M ago",
      type: "Image",
      thumbnail: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "AIIMS-3-YEAR-CUT-OFF-ANALYSIS--_05-07-2025-11:40:38.jpg",
      size: "2 MB",
      uploadedOn: "5M ago",
      type: "Image",
      thumbnail: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "0—Rajasthan-NEET-RESULT-के-बाद-क्या-रहेगी-Cut-off_24-06-2025-13:3...",
      size: "68 KB",
      uploadedOn: "6M ago",
      type: "Image",
      thumbnail: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Kerala-Registration_19-06-2025-18:14:50.jpg",
      size: "75 KB",
      uploadedOn: "6M ago",
      type: "Image",
      thumbnail: "/api/placeholder/80/80"
    },
    {
      id: 5,
      name: "WhatsApp-Image-2025-06-16-at_8_16-06-2025-08:06:46.08",
      size: "592 KB",
      uploadedOn: "6M ago",
      type: "Image",
      thumbnail: "/api/placeholder/80/80"
    }
  ];

  const tabs = ["Image", "Video", "Audio", "Document"];

  const filteredFiles = mediaFiles.filter(
    (file) =>
      file.type === activeTab &&
      (searchQuery === "" ||
        file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectFile = (file) => {
    onSelect(file);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[10001] flex items-center justify-center p-3 md:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg md:rounded-xl w-full max-w-[1000px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 shrink-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Media Library</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Search and Upload */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors shrink-0">
              <Upload size={16} />
              <span className="hidden md:inline">Upload</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-4 md:px-6 border-b border-gray-200 shrink-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* File List Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <div className="text-4xl mb-3">📁</div>
              <div className="text-sm">No files found</div>
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="border-b border-gray-200">
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-600 w-16"></th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-600">File name</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-600 w-24">Size</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-gray-600 w-32">Uploaded on</th>
                  <th className="px-4 md:px-6 py-3 text-right text-xs md:text-sm font-medium text-gray-600 w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <td className="px-4 md:px-6 py-3">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center text-white font-bold text-xs">
                        IMG
                      </div>
                    </td>

                    {/* File Name */}
                    <td className="px-4 py-3">
                      <div className="text-xs md:text-sm text-gray-900 max-w-xs truncate" title={file.name}>
                        {file.name}
                      </div>
                    </td>

                    {/* Size */}
                    <td className="px-4 py-3 text-xs md:text-sm text-gray-600">
                      {file.size}
                    </td>

                    {/* Uploaded On */}
                    <td className="px-4 py-3 text-xs md:text-sm text-gray-600">
                      {file.uploadedOn}
                    </td>

                    {/* Actions */}
                    <td className="px-4 md:px-6 py-3">
                      <div className="flex items-center gap-1 md:gap-2 justify-end">
                        <button
                          onClick={() => handleSelectFile(file)}
                          className="px-3 md:px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          Select
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit2 size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 border border-gray-300 rounded-lg bg-white text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
