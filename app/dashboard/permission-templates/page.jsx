'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  RefreshCw, 
  Plus, 
  Search, 
  Edit, 
  Copy, 
  Trash2, 
  Eye,
  Filter,
  Headphones,
  Users,
  UserCircle,
  Briefcase,
  Network
} from 'lucide-react';
import PermissionTemplateOffcanvas from './PermissionTemplateOffcanvas';

const PermissionTemplatesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Sample data
  const templates = [
    {
      id: '1',
      name: 'sunil Permission Template',
      isDefault: false,
      assignedTo: 2,
      lastModified: '10h ago',
      role: null,
      roleIcon: null
    },
    {
      id: '2',
      name: 'Custom Permission Template',
      isDefault: false,
      assignedTo: 1,
      lastModified: '3d ago',
      role: null,
      roleIcon: null
    },
    {
      id: '3',
      name: 'Default Caller Permissions',
      isDefault: true,
      assignedTo: 4,
      lastModified: '3d ago',
      role: 'Caller',
      roleIcon: Headphones
    },
    {
      id: '4',
      name: 'Default Admin Permissions',
      isDefault: true,
      assignedTo: 2,
      lastModified: '3M ago',
      role: 'Admin',
      roleIcon: Users
    },
    {
      id: '5',
      name: 'Default Manager Permissions',
      isDefault: true,
      assignedTo: 1,
      lastModified: '8M ago',
      role: 'Manager',
      roleIcon: UserCircle
    },
    {
      id: '6',
      name: 'Default Marketing Permissions',
      isDefault: true,
      assignedTo: 0,
      lastModified: '8M ago',
      role: 'Marketing',
      roleIcon: Briefcase
    },
    {
      id: '7',
      name: 'Default Root Permissions',
      isDefault: true,
      assignedTo: 1,
      lastModified: '8M ago',
      role: 'Root',
      roleIcon: Network
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.role && template.role.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'defaults') {
      return matchesSearch && template.isDefault;
    }
    return matchesSearch;
  });

  const handleEditClick = (template) => {
    setSelectedTemplate(template);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="p-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4">
        {/* Left Section - Title and Refresh */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#5D5BD0]" />
            <h1 className="text-xl font-semibold text-gray-900">Permission Templates</h1>
          </div>
          <button className="h-10 w-10 inline-flex items-center justify-center rounded-[10px] border border-[#D5D5D5]/60 bg-white hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-[#202224]" />
          </button>
        </div>

        {/* Right Section - Search and Add Button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#D5D5D5] rounded-[10px] pl-9 pr-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-white w-52 sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:border-transparent"
            />
          </div>
          
          {/* Add New Button */}
          <button className="px-4 h-10 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#4880FF] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add new</span>
          </button>
        </div>
      </div>

      {/* Tabs - Segmented Control Style */}
      <div className="relative flex items-stretch bg-white border border-[#D5D5D5]/60 rounded-[10px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] w-fit mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-[#5D5BD0] text-white'
              : 'text-[#202224] hover:bg-gray-50'
          }`}
        >
          All
        </button>
        <div className="w-px bg-gray-200" />
        <button
          onClick={() => setActiveTab('defaults')}
          className={`px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'defaults'
              ? 'bg-[#5D5BD0] text-white'
              : 'text-[#202224] hover:bg-gray-50'
          }`}
        >
          Defaults
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-[#6C727F]">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[10px] border border-[#D5D5D5]/60 overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {activeTab === 'defaults' ? (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Permission template
                    </th>
                  </>
                ) : (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Assigned to
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>Last modified on</span>
                    <Filter className="w-3 h-3 text-gray-400 cursor-pointer" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTemplates.map((template) => {
                const RoleIcon = template.roleIcon;
                return (
                  <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                    {activeTab === 'defaults' ? (
                      <>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {RoleIcon && <RoleIcon className="w-4 h-4 text-gray-600" />}
                            <span className="text-sm text-gray-900">{template.role}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{template.name}</span>
                        </td>
                      </>
                    ) : (
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{template.name}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{template.assignedTo}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{template.lastModified}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {template.isDefault && template.role === 'Root' ? (
                          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="View">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        ) : (
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                            title="Edit"
                            onClick={() => handleEditClick(template)}
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        {activeTab !== 'defaults' && (
                          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Duplicate">
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        <button className="p-1.5 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <PermissionTemplateOffcanvas
        open={isOffcanvasOpen}
        template={selectedTemplate}
        onClose={handleCloseOffcanvas}
      />
    </div>
  );
};

export default PermissionTemplatesPage;

