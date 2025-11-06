'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddUserOffcanvas from '@/app/leads/components/AddUserOffcanvas';

const RolesPage = () => {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Role Management</h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-[#4880FF] rounded-[10px] hover:bg-[#3a6fcc] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[10px] p-4 md:p-6 border border-gray-200">
        <p className="text-gray-600">User management content will go here...</p>
      </div>

      {/* Add User Offcanvas */}
      <AddUserOffcanvas
        open={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSave={(userData) => {
          console.log('User data:', userData);
          // Handle save logic here
          setShowAddUser(false);
        }}
      />
    </div>
  );
};

export default RolesPage;

