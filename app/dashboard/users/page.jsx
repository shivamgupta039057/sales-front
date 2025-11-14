'use client';

import React, { useState } from 'react';
import { 
  RefreshCw, 
  Download, 
  Plus, 
  ChevronDown, 
  Search, 
  User, 
  AlertCircle,
  ShoppingCart,
  Info
} from 'lucide-react';
import AddUserOffcanvas from '@/app/leads/components/AddUserOffcanvas';
import DataTable from '@/app/leads/components/DataTable';

const UserManagementPage = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showLicenseDropdown, setShowLicenseDropdown] = useState(false);
  const [showAddUserDropdown, setShowAddUserDropdown] = useState(false);

  // Sample user data
  const users = [
    {
      id: '1',
      name: 'Anshul',
      email: 'visutitech@gmail.com',
      initials: 'AN',
      role: 'Root',
      permissionTemplate: 'Default Root Permissions',
      license: '25 Oct 2025',
      licenseExpired: true,
      addOns: 'No Add Ons'
    },
    {
      id: '2',
      name: 'Dinesh Kumar',
      email: 'visuti9509769853@gmail.com',
      initials: 'DK',
      role: 'Caller',
      permissionTemplate: 'Default Caller Permissions',
      license: '10 Sep 2025',
      licenseExpired: true,
      addOns: 'No Add Ons'
    },
    {
      id: '3',
      name: 'RAJENDRA Chandeliya',
      email: 'chandeliyarajendra92@gmail.com',
      initials: 'RS',
      role: 'Admin',
      permissionTemplate: 'Default Admin Permissions',
      license: '17 Sep 2025',
      licenseExpired: true,
      addOns: 'No Add Ons'
    },
    {
      id: '4',
      name: 'Sonia Sharma',
      email: 'soniasharma0306@gmail.com',
      initials: 'SS',
      role: 'Manager',
      permissionTemplate: 'Default Manager Permissions',
      license: '6 Jun 2024',
      licenseExpired: true,
      addOns: 'No Add Ons'
    },
    {
      id: '5',
      name: 'TRIPTI',
      email: 'tripti@example.com',
      initials: 'TD',
      role: 'Caller',
      permissionTemplate: 'Default Caller Permissions',
      license: '17 Jul 2025',
      licenseExpired: true,
      addOns: 'No Add Ons'
    },
    {
      id: '6',
      name: 'John Doe',
      email: 'john@example.com',
      initials: 'JD',
      role: 'Admin',
      permissionTemplate: 'Default Admin Permissions',
      license: '15 Dec 2025',
      licenseExpired: false,
      addOns: 'No Add Ons'
    },
    {
      id: '7',
      name: 'Jane Smith',
      email: 'jane@example.com',
      initials: 'JS',
      role: 'Manager',
      permissionTemplate: 'Default Manager Permissions',
      license: '20 Nov 2025',
      licenseExpired: false,
      addOns: 'No Add Ons'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all';
    const matchesLicense = licenseFilter === 'all';
    return matchesSearch && matchesRole && matchesStatus && matchesLicense;
  });

  const getRoleIconCount = (role) => {
    if (role === 'Root' || role === 'Admin') return 2;
    return 1;
  };

  // Prepare columns for DataTable
  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4880FF] text-white text-xs font-semibold flex items-center justify-center">
            {row.initials}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-gray-500 text-xs">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {Array.from({ length: getRoleIconCount(row.role) }).map((_, i) => (
            <User key={i} className="w-4 h-4 text-gray-600" />
          ))}
          <span className="text-gray-900">{row.role}</span>
        </div>
      )
    },
    {
      key: 'permissionTemplate',
      header: 'Permission Template',
      sortable: true,
      render: (value) => <span className="text-gray-900">{value}</span>
    },
    {
      key: 'license',
      header: 'License',
      sortable: true,
      render: (value, row) => (
        <span className={row.licenseExpired ? 'text-red-600 font-medium' : 'text-gray-900'}>
          {value}
        </span>
      )
    },
    {
      key: 'addOns',
      header: 'Add Ons',
      sortable: false,
      render: (value) => <span className="text-gray-500">{value}</span>
    }
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">User Management</h1>
            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
              <RefreshCw className="w-4 h-4 text-[#4880FF]" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#4880FF] bg-white border border-[#4880FF] rounded-[10px] hover:bg-[#4880FF]/5 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  setShowAddUserDropdown(!showAddUserDropdown);
                  setShowAddUser(true);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4880FF] rounded-[10px] hover:bg-[#3a6fcc] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add User
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-[#4880FF] bg-white border border-[#4880FF] rounded-[10px] hover:bg-[#4880FF]/5 transition-colors flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Buy Licenses
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Manage your team</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Email or Phone Number"
            className="w-full pl-10 pr-3 h-10 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
          />
        </div>
        
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowStatusDropdown(false);
              setShowLicenseDropdown(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Role
            <ChevronDown className="w-4 h-4" />
          </button>
          {showRoleDropdown && (
            <div className="absolute top-full mt-1 left-0 w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
              {['All', 'Root', 'Admin', 'Manager', 'Caller'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setRoleFilter(role === 'All' ? 'all' : role);
                    setShowRoleDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              setShowRoleDropdown(false);
              setShowLicenseDropdown(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Status
            <span className="px-1.5 py-0.5 bg-[#4880FF] text-white text-xs rounded">3</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full mt-1 left-0 w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Active</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Inactive</button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowLicenseDropdown(!showLicenseDropdown);
              setShowRoleDropdown(false);
              setShowStatusDropdown(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            License
            <ChevronDown className="w-4 h-4" />
          </button>
          {showLicenseDropdown && (
            <div className="absolute top-full mt-1 left-0 w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Active</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Expired</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-[10px]">
          <Info className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">No licenses available</span>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        rows={filteredUsers}
        pageSize={7}
        onRowClick={(row) => {
          console.log('User clicked:', row);
          // Handle row click if needed
        }}
      />

      {/* Add User Offcanvas */}
      <AddUserOffcanvas
        open={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSave={(userData) => {
          console.log('New user data:', userData);
          // Handle save logic here
          setShowAddUser(false);
        }}
      />
    </div>
  );
};

export default UserManagementPage;

