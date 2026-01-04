"use client";

import React, { useState } from 'react';
import { Search, Plus, ExternalLink, Calendar, Users, MoreVertical, Edit, Repeat, List, Trash2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

const IntegrationDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('card');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const linkedAccounts = [
    {
      id: 1,
      name: 'Anshul Tiwari',
      email: 'anspbm@gmail.com',
      avatar: null
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      avatar: null
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.k@gmail.com',
      avatar: null
    }
  ];

  const integrations = [
    {
      id: 1,
      name: 'NEET 2022',
      source: 'Visuti Career',
      totalLeads: '8.2m',
      newLeads: 156,
      lastLeadDate: '1D',
      status: 'active'
    },
    {
      id: 2,
      name: 'CAT Preparation Course',
      source: 'Visuti Career',
      totalLeads: '3.5m',
      newLeads: 72,
      lastLeadDate: '3D',
      status: 'active'
    },
    {
      id: 3,
      name: 'Medical Entrance 2023',
      source: 'Visuti Career',
      totalLeads: '10m',
      newLeads: 198,
      lastLeadDate: '2D',
      status: 'active'
    },
    {
      id: 4,
      name: 'MBA Entrance Form',
      source: 'Visuti Career',
      totalLeads: '5.2m',
      newLeads: 45,
      lastLeadDate: '5D',
      status: 'active'
    },
    {
      id: 5,
      name: 'JEE Main 2024',
      source: 'Visuti Career',
      totalLeads: '12m',
      newLeads: 89,
      lastLeadDate: '3D',
      status: 'active'
    },
    {
      id: 6,
      name: 'GATE 2024',
      source: 'Visuti Career',
      totalLeads: '7.3m',
      newLeads: 22,
      lastLeadDate: '1W',
      status: 'active'
    },
    {
      id: 7,
      name: 'CA Foundation 2024',
      source: 'Visuti Career',
      totalLeads: '4.1m',
      newLeads: 18,
      lastLeadDate: '4D',
      status: 'active'
    },
    {
      id: 8,
      name: 'UPSC Prelims 2024',
      source: 'Visuti Career',
      totalLeads: '15m',
      newLeads: 67,
      lastLeadDate: '1D',
      status: 'active'
    },
    {
      id: 9,
      name: 'SSC CGL 2024',
      source: 'Visuti Career',
      totalLeads: '9.8m',
      newLeads: 33,
      lastLeadDate: '3D',
      status: 'active'
    },
    {
      id: 10,
      name: 'Banking PO 2024',
      source: 'Visuti Career',
      totalLeads: '6.7m',
      newLeads: 41,
      lastLeadDate: '2D',
      status: 'active'
    },
    {
      id: 11,
      name: 'Civil Services 2024',
      source: 'Visuti Career',
      totalLeads: '11m',
      newLeads: 55,
      lastLeadDate: '5D',
      status: 'active'
    }
  ];

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar - Linked Accounts */}
        <div className="hidden lg:block lg:w-80 bg-white flex-shrink-0 overflow-y-auto border-r border-gray-200">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Linked Account</h3>
            
            <button className="w-full px-4 py-2.5 text-white rounded-md transition-all font-medium text-sm mb-4" style={{backgroundColor: '#5D5BD0'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}>
              Download Marketing Report
            </button>

            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-sm font-semibold">
                    {account.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{account.name}</p>
                  <p className="text-xs text-gray-500">Integrated with: <span className="font-medium" style={{color: '#5D5BD0'}}>{account.email}</span></p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Right Side */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Account Info Header - Fixed */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-lg font-semibold">
                    {linkedAccounts[0]?.name.split(' ').map(n => n[0]).join('') || 'AT'}
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{linkedAccounts[0]?.name || 'Anshul Tiwari'}</h2>
                  <p className="text-sm text-gray-500">{linkedAccounts[0]?.email || 'anspbm@gmail.com'}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button 
                  className="px-5 py-2 text-white rounded-md transition-all flex items-center gap-2 font-medium text-sm"
                  style={{backgroundColor: '#5D5BD0'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                  onClick={() => router.push('/integrations/add-new')}
                >
                  <Plus className="w-4 h-4" />
                  Lead Form
                </button>
                <button className="px-5 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-all flex items-center gap-2 font-medium text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Unlink
                </button>
              </div>
            </div>
          </div>

          {/* Search and Tabs - Fixed */}
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search with page and form name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-sm"
                  style={{borderColor: searchQuery ? '#5D5BD0' : '', boxShadow: searchQuery ? '0 0 0 1px #5D5BD0' : ''}}
                  onFocus={(e) => {e.currentTarget.style.borderColor = '#5D5BD0'; e.currentTarget.style.boxShadow = '0 0 0 1px #5D5BD0'}}
                  onBlur={(e) => {e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''}}
                />
              </div>
              <div className="inline-flex gap-2 bg-gray-100 rounded-full p-1 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`px-4 py-1.5 rounded-full text-sm font-normal transition-all ${
                    activeTab === 'card'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-4 py-1.5 rounded-full text-sm font-normal transition-all ${
                    activeTab === 'stats'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Stats
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {filteredIntegrations.length} Forms found
            </p>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Forms List */}
            <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-y-3">
              {filteredIntegrations.map((integration) => (
                <div
                  key={integration.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 w-full sm:w-auto">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        {integration.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">{integration.source}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{integration.totalLeads}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{integration.newLeads}</span>
                        </div>
                        <span className="text-gray-500 text-xs">
                          Last lead: <span className="font-medium text-gray-700">{integration.lastLeadDate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === integration.id ? null : integration.id)}
                          className="p-2 hover:bg-gray-50 rounded-lg transition-all"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        
                        {openDropdownId === integration.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenDropdownId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <Edit className="w-4 h-4 text-gray-500" />
                                Edit Mapping
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <Repeat className="w-4 h-4 text-gray-500" />
                                Change Distribution
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <Repeat className="w-4 h-4 text-gray-500" />
                                Sync Leads
                              </button>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <List className="w-4 h-4 text-gray-500" />
                                Create a list
                              </button>
                              <div className="border-t border-gray-200 my-1"></div>
                              <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                                <Trash2 className="w-4 h-4 text-red-600" />
                                Delete Integration
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <button 
                        onClick={() => router.push(`/integrations/${params.id}/leads`)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-md transition-all text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-none justify-center"
                        style={{backgroundColor: '#5D5BD0'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Leads
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {filteredIntegrations.length === 0 && (
                <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms found</h3>
                  <p className="text-gray-600">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationDetailsPage;
