"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

const ReportSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button 
        className="w-full flex items-center justify-between py-4 px-0 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

const MessagingReports = ({ data }) => {
  const handleRefresh = () => {
    console.log('Refreshing reports...');
  };

  // Default data structure
  const reportData = data || {
    messagingProgress: {
      sent: 347,
      failed: 47,
      pending: 0
    },
    delivery: {
      sent: 31,
      delivered: 69,
      read: 247
    },
    failure: {
      undeliverable: 27,
      metaNotDeliver: 18,
      experimentNumber: 2
    },
    failureRetries: {
      title: 'Meta chose not to deliver 1 - 34 leads',
      timeAgo: '6M ago',
      sent: 9,
      failed: 25
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          Reports
        </h3>
        <button 
          className="text-gray-400 hover:text-[#5D5BD0] transition-colors"
          onClick={handleRefresh}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="px-5">
        {/* Messaging Progress Report */}
        <ReportSection title="Messaging progress report" defaultOpen={true}>
          <div className="grid grid-cols-3 gap-3">
            {/* Sent */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Sent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.messagingProgress.sent}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Failed */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600">Failed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {reportData.messagingProgress.failed}
                </span>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </div>
            </div>

            {/* Pending */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.messagingProgress.pending}
                </span>
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Delivery Report */}
        <ReportSection title="Delivery report">
          <div className="grid grid-cols-3 gap-3">
            {/* Sent */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600">Sent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.delivery.sent}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Delivered */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600">Delivered</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.delivery.delivered}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Read */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-2">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600">Read</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.delivery.read}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Failure Report */}
        <ReportSection title="Failure report">
          <div className="grid grid-cols-3 gap-3">
            {/* Message Undeliverable */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600">Message Undeliverable</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {reportData.failure.undeliverable}
                </span>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </div>
            </div>

            {/* Meta chose not to deliver */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600">Meta chose not to deliver</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {reportData.failure.metaNotDeliver}
                </span>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </div>
            </div>

            {/* User's number is part of an experiment */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600">User number is part of an experi...</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {reportData.failure.experimentNumber}
                </span>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Failure Retries Report */}
        <ReportSection title="Failure retries report">
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-gray-600">{reportData.failureRetries.title}</span>
              <span className="text-gray-400">{reportData.failureRetries.timeAgo}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Sent */}
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Sent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData.failureRetries.sent}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Failed */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600">Failed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">
                  {reportData.failureRetries.failed}
                </span>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </div>
        </ReportSection>
      </div>
    </div>
  );
};

export default MessagingReports;
