'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WorkflowNameModal = ({ open, onClose, onSave, initialName = '', buttonText = 'Create' }) => {
  const [workflowName, setWorkflowName] = useState(initialName);

  useEffect(() => {
    if (open) {
      setWorkflowName(initialName || '');
    }
  }, [open, initialName]);

  const handleSubmit = () => {
    if (workflowName.trim()) {
      onSave?.(workflowName.trim());
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-[10px] shadow-2xl border border-gray-200 z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Workflow Name</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-[8px] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter workflow name"
            className="w-full rounded-[8px] border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white hover:bg-red-50 rounded-[8px] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!workflowName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-[#5D5BD0] hover:bg-[#4d4bc0] rounded-[8px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowNameModal;

