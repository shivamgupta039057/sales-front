'use client';

import React from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';

const ReportFiltersBar = () => {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-4">
      <div className="flex items-stretch bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        <button className="px-4 py-2 text-sm text-gray-700 inline-flex items-center gap-2">
          <span>Created By</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <div className="w-px bg-gray-200" />
        <button className="px-4 py-2 text-sm text-gray-700 inline-flex items-center gap-2">
          <span>Creation Date</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <div className="w-px bg-gray-200" />
        <button className="px-4 py-2 text-sm text-gray-700 inline-flex items-center gap-2">
          <span>Status</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <div className="w-px bg-gray-200" />
        <button className="px-3 flex items-center justify-center text-red-600" title="Reset">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReportFiltersBar;


