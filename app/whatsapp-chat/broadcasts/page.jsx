"use client";

import React, { useState } from 'react';
import { Search, Filter, Radio, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MessagingReports from '../components/MessagingReports';
import BroadcastSummary from '../components/BroadcastSummary';
import MessagePreview from '../components/MessagePreview';
import CreateBroadcastOffcanvas from './CreateBroadcastOffcanvas';

const BroadcastsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBroadcast, setSelectedBroadcast] = useState(null);
  const [isCreateBroadcastOpen, setIsCreateBroadcastOpen] = useState(false);

  const broadcasts = [
    {
      id: 1,
      name: '@karnatakaneedneet-bulk-messaging-at-...',
      status: 'NA',
      users: 0,
      date: '6M',
      progress: null,
      createdOn: 'Jun 10, 2025',
      attemptedOn: 0,
      uniqueNumbers: 0,
      currentProgress: '0 / 0',
      sent: 0,
      failed: 0,
      pending: 0
    },
    {
      id: 2,
      name: '@karnatakaneedneet-bulk-messaging-at-...',
      status: 65,
      users: 55,
      date: '6M',
      progress: 65,
      createdOn: 'Jun 15, 2025',
      attemptedOn: 55,
      uniqueNumbers: 78,
      currentProgress: '55 / 55',
      sent: 40,
      failed: 15,
      pending: 0
    },
    {
      id: 3,
      name: '@aiims-bulk-messaging-at-05-07-...',
      status: 100,
      users: 394,
      date: '6M',
      progress: 100,
      createdOn: 'Jul 5, 2025',
      attemptedOn: 394,
      uniqueNumbers: 450,
      currentProgress: '394 / 394',
      sent: 350,
      failed: 44,
      pending: 0
    },
    {
      id: 4,
      name: '@neetgovpvt-bulk-messaging-at-28-06-2025-08-36-41',
      status: 100,
      users: 311,
      date: '6M',
      progress: 100,
      createdOn: 'Jun 28, 2025',
      attemptedOn: 311,
      uniqueNumbers: 852,
      currentProgress: '311 / 311',
      sent: 239,
      failed: 72,
      pending: 0
    },
    {
      id: 5,
      name: '@neetgovpvt-bulk-messaging-at-27-...',
      status: 'NA',
      users: 0,
      date: '6M',
      progress: null,
      createdOn: 'Jun 27, 2025',
      attemptedOn: 0,
      uniqueNumbers: 0,
      currentProgress: '0 / 0',
      sent: 0,
      failed: 0,
      pending: 0
    },
    {
      id: 6,
      name: '@kerala-bulk-messaging-at-21-06-...',
      status: 99,
      users: 672,
      date: '6M',
      progress: 99,
      createdOn: 'Jun 21, 2025',
      attemptedOn: 672,
      uniqueNumbers: 800,
      currentProgress: '672 / 672',
      sent: 650,
      failed: 22,
      pending: 0
    },
    {
      id: 7,
      name: '@kerala-bulk-messaging-at-20-06-...',
      status: 'NA',
      users: 0,
      date: '6M',
      progress: null,
      createdOn: 'Jun 20, 2025',
      attemptedOn: 0,
      uniqueNumbers: 0,
      currentProgress: '0 / 0',
      sent: 0,
      failed: 0,
      pending: 0
    },
    {
      id: 8,
      name: '@kerala-bulk-messaging-at-19-06-...',
      status: 'NA',
      users: 0,
      date: '6M',
      progress: null,
      createdOn: 'Jun 19, 2025',
      attemptedOn: 0,
      uniqueNumbers: 0,
      currentProgress: '0 / 0',
      sent: 0,
      failed: 0,
      pending: 0
    },
    {
      id: 9,
      name: '@neetcounsellingmo-bulk-messagin...',
      status: 100,
      users: 119,
      date: '7M',
      progress: 100,
      createdOn: 'May 15, 2025',
      attemptedOn: 119,
      uniqueNumbers: 150,
      currentProgress: '119 / 119',
      sent: 100,
      failed: 19,
      pending: 0
    }
  ];

  const filteredBroadcasts = broadcasts.filter(broadcast =>
    broadcast.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white">
      {/* Left Sidebar - Broadcasts List */}
      <div className={`w-full lg:w-[380px] border-r border-gray-200 flex flex-col h-full lg:h-auto ${
        selectedBroadcast ? 'hidden lg:flex' : 'flex'
      }`}>
        {/* Header */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => router.push('/whatsapp-chat')}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#5D5BD0] to-[#6B6BE0] rounded-lg shadow-sm">
                <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-800">Broadcasts</h1>
                <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">Manage bulk messages</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-gray-400 hover:text-[#5D5BD0] hover:bg-purple-50 p-1.5 sm:p-2 rounded-lg transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex-shrink-0">
          <div className="relative flex items-center gap-1.5 sm:gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5D5BD0]/30 focus:border-[#5D5BD0] focus:bg-white transition-all duration-200"
              />
            </div>
            <button className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Broadcasts Count & Create Button */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-gray-50">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1.5 sm:gap-2">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#5D5BD0]/10 text-[#5D5BD0] rounded-md text-[10px] sm:text-xs font-bold">17</span>
            <span className="hidden sm:inline">Broadcasts</span>
          </span>
          <button 
            onClick={() => setIsCreateBroadcastOpen(true)}
            className="text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#5D5BD0] to-[#6B6BE0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-[#4a4ab8] hover:to-[#5555c8] transition-all duration-200 shadow-md shadow-[#5D5BD0]/25 flex items-center gap-1 sm:gap-1.5"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Create
          </button>
        </div>

        {/* Broadcasts List - Only this scrolls */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredBroadcasts.map((broadcast) => (
            <div
              key={broadcast.id}
              onClick={() => setSelectedBroadcast(broadcast)}
              className={`px-3 sm:px-4 py-2.5 sm:py-3.5 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                selectedBroadcast?.id === broadcast.id
                  ? 'bg-gradient-to-r from-[#5D5BD0]/5 to-[#5D5BD0]/10 border-l-4 border-l-[#5D5BD0] shadow-sm'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5 sm:mb-2.5">
                <div className="flex-1 min-w-0 pr-2 sm:pr-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate mb-1">
                    {broadcast.name}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-1.5 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{broadcast.date}</span>
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {broadcast.users}
                    </span>
                  </div>
                </div>
                {broadcast.progress !== null ? (
                  <div className="flex-shrink-0 ml-1.5 sm:ml-2">
                    <div className="relative w-9 h-9 sm:w-11 sm:h-11">
                      <svg className="w-9 h-9 sm:w-11 sm:h-11 transform -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                          fill="none"
                          className="sm:hidden"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          stroke={broadcast.progress === 100 ? "#22c55e" : "#5D5BD0"}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 15}`}
                          strokeDashoffset={`${2 * Math.PI * 15 * (1 - broadcast.progress / 100)}`}
                          strokeLinecap="round"
                          className="sm:hidden"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          stroke="#e5e7eb"
                          strokeWidth="3.5"
                          fill="none"
                          className="hidden sm:block"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          stroke={broadcast.progress === 100 ? "#22c55e" : "#5D5BD0"}
                          strokeWidth="3.5"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 18}`}
                          strokeDashoffset={`${2 * Math.PI * 18 * (1 - broadcast.progress / 100)}`}
                          strokeLinecap="round"
                          className="hidden sm:block"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-gray-700">
                        {broadcast.progress}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="flex-shrink-0 ml-1.5 sm:ml-2 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-semibold rounded-md">
                    NA
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Broadcast Details */}
      <div className={`flex-1 bg-[#F8F9FA] flex flex-col h-full ${
        selectedBroadcast ? 'flex' : 'hidden lg:flex'
      }`}>
        {selectedBroadcast ? (
          <>
            {/* Broadcast Details Header */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 flex items-start gap-2 sm:gap-3">
                  {/* Back button for mobile */}
                  <button
                    onClick={() => setSelectedBroadcast(null)}
                    className="lg:hidden flex-shrink-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-all duration-200 mt-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-1.5 truncate">
                      {selectedBroadcast.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-gray-400">Created on:</span>
                      <span className="font-medium text-gray-600">{selectedBroadcast.createdOn}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Anshul</span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#5D5BD0] to-[#4a4ab8] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold shadow-md">
                    V
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6">
                {/* Summary & Reports Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Summary */}
                  <div className="space-y-6">
                    <BroadcastSummary 
                      data={{
                        attemptedOn: selectedBroadcast.attemptedOn,
                        uniqueNumbers: selectedBroadcast.uniqueNumbers,
                        currentProgress: selectedBroadcast.currentProgress,
                        retriesCompleted: 3
                      }}
                    />
                  </div>

                  {/* Reports Section - Using Reusable Component */}
                  <div>
                    <MessagingReports 
                      data={{
                        messagingProgress: {
                          sent: selectedBroadcast.sent,
                          failed: selectedBroadcast.failed,
                          pending: selectedBroadcast.pending
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
                      }}
                    />
                  </div>
                </div>

                {/* Message Preview */}
                <MessagePreview />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#F5F6FA] p-4">
            <div className="text-center">
              <Radio className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-400 text-sm sm:text-lg">Select a broadcast to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Broadcast Offcanvas */}
      <CreateBroadcastOffcanvas 
        isOpen={isCreateBroadcastOpen}
        onClose={() => setIsCreateBroadcastOpen(false)}
      />
    </div>
  );
};

export default BroadcastsPage;
