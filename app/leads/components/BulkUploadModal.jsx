'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Folder, Upload as UploadIcon } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

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

  // Prevent body scroll when offcanvas is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
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

  return (
    <>
      {open && <Backdrop onClose={onClose} />}
d or drag and drop

CSV files only

Supported formats: CSV
      {/* Offcanvas */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`h-full w-full sm:max-w-md md:max-w-lg bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] transform transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 py-1 border-b border-gray-200 shrink-0">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Bulk Upload</h3>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Download Preview Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-[10px] border border-gray-200">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Download Preview Template</span>
                  <button
                    onClick={handleDownloadPreview}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-[10px] hover:bg-blue-50 transition-colors border border-blue-200 sm:border-0"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Download
                  </button>
                </div>

                {/* Upload Document Section */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Upload Document</h3>
                  <div
                    ref={dropZoneRef}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-[10px] p-6 sm:p-8 md:p-12 text-center cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-[#4880FF] bg-[#4880FF]/5'
                        : file
                        ? 'border-[#4880FF] bg-[#4880FF]/5'
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
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-[10px] bg-white border border-gray-200">
                        {file ? (
                          <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#4880FF]" />
                        ) : (
                          <Folder className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-900 break-all px-2">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </p>
                        {file ? (
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        ) : (
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            CSV files only
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-blue-600 mt-2 sm:mt-3 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Supported formats: CSV
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 border-t border-gray-200 shrink-0">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium text-black bg-white border border-[#4880FF] rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium rounded-[10px] transition-colors ${
                  file
                    ? 'bg-[#4880FF] text-white hover:bg-[#3a6fcc]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUploadModal;

