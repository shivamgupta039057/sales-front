'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Folder, Upload as UploadIcon } from 'lucide-react';

const BulkUploadModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setIsDragging(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
    // TODO: Handle file upload
    console.log('Uploading file:', file);
    onClose();
  };

  const handleDownloadPreview = () => {
    // TODO: Handle download preview
    console.log('Downloading preview template');
  };

  if (!open) {
    console.log('BulkUploadModal: Not open, returning null');
    return null;
  }

  console.log('BulkUploadModal: Rendering modal');

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[10px] shadow-2xl border border-gray-200 z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Bulk Upload</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Download Preview Section */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Download Preview</span>
            <button
              onClick={handleDownloadPreview}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Upload Document Section */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Upload Document</h3>
            <div
              ref={dropZoneRef}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[10px] p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#9333EA] bg-[#9333EA]/5'
                  : file
                  ? 'border-[#9333EA] bg-[#9333EA]/5'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-[10px] bg-gray-100">
                  {file ? (
                    <UploadIcon className="w-6 h-6 text-[#9333EA]" />
                  ) : (
                    <Folder className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file ? file.name : 'Add a File'}
                  </p>
                  {file && (
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-3">Supported formats: CSV</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-6 py-2 text-sm font-medium text-white bg-[#9333EA] rounded-[10px] hover:bg-[#7e22ce] transition-colors"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;

