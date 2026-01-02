"use client";

import React from 'react';

const BroadcastSummary = ({ data }) => {
  const summaryData = data || {
    attemptedOn: 0,
    uniqueNumbers: 0,
    currentProgress: '0 / 0',
    retriesCompleted: 3
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#5D5BD0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Summary
        </h3>
      </div>
      
      {/* Content */}
      <div className="px-5 pb-5">
        <div className="space-y-0 pt-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Attempted on</span>
            <span className="text-sm font-semibold text-[#5D5BD0] underline decoration-dotted cursor-pointer hover:text-[#4a4ab0] transition-colors">
              {summaryData.attemptedOn} leads
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Unique numbers</span>
            <span className="text-sm font-semibold text-gray-900">
              {summaryData.uniqueNumbers}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Current progress</span>
            <span className="text-sm font-semibold text-[#5D5BD0] underline decoration-dotted cursor-pointer hover:text-[#4a4ab0] transition-colors">
              {summaryData.currentProgress}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-600">Retries for failed messages</span>
            <span className="text-sm font-semibold text-gray-900">
              {summaryData.retriesCompleted} <span className="text-gray-500 font-normal">completed</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastSummary;
