"use client";

import React, { useState } from 'react';
import { Search, Facebook, Globe, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const IntegrationsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Active Integrations
  const activeIntegrations = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      status: 'Active',
      color: '#1877F2'
    },
    {
      id: 'website',
      name: 'Website/API',
      icon: 'globe',
      status: 'Active',
      color: '#6B7280'
    },
    {
      id: 'whatsapp',
      name: 'Whatsapp',
      icon: 'whatsapp',
      status: 'Active',
      color: '#25D366'
    },
    {
      id: 'whatsapp-cloud',
      name: 'Whatsapp Cloud API',
      icon: 'whatsapp',
      status: 'Active',
      color: '#25D366'
    }
  ];

  // Available Integrations
  const availableIntegrations = [
    {
      id: '99acres',
      name: '99acres',
      description: 'Capture 99acres Leads in your Telecrm account',
      icon: '99',
      color: '#0056D2'
    },
    {
      id: 'housing',
      name: 'Housing.com',
      description: 'Capture Housing.com Leads in your Telecrm account',
      icon: 'H',
      color: '#FF6B6B'
    }
  ];

  const filteredActive = activeIntegrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailable = availableIntegrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (iconName, color) => {
    const iconProps = { className: "w-6 h-6", style: { color } };
    
    switch (iconName) {
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'globe':
        return <Globe {...iconProps} />;
      case 'whatsapp':
        return <MessageCircle {...iconProps} />;
      default:
        return <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{iconName}</div>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-6 bg-white border-b border-gray-200">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Integrations</h1>
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Integration by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-sm"
              style={{borderColor: searchQuery ? '#5D5BD0' : '', boxShadow: searchQuery ? '0 0 0 1px #5D5BD0' : ''}}
              onFocus={(e) => {e.currentTarget.style.borderColor = '#5D5BD0'; e.currentTarget.style.boxShadow = '0 0 0 1px #5D5BD0'}}
              onBlur={(e) => {e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''}}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Active Integrations */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Active Integration ({filteredActive.length})
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      INTEGRATIONS
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredActive.map((integration) => (
                    <tr key={integration.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {getIcon(integration.icon, integration.color)}
                          </div>
                          <span className="text-sm sm:text-base font-medium text-gray-900">{integration.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {integration.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                        <button 
                          onClick={() => router.push(`/integrations/${integration.id}`)}
                          className="px-4 py-1.5 border border-[#5D5BD0] text-[#5D5BD0] rounded-md hover:bg-purple-50 transition-all text-sm font-medium"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Available Integrations */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Available Integration ({filteredAvailable.length})
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      INTEGRATIONS
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAvailable.map((integration) => (
                    <tr key={integration.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {getIcon(integration.icon, integration.color)}
                          </div>
                          <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{integration.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{integration.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                        <button 
                          className="px-4 py-1.5 border border-[#5D5BD0] text-[#5D5BD0] rounded-md hover:bg-purple-50 transition-all text-sm font-medium"
                        >
                          Activate now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
