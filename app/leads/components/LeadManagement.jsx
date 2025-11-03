'use client';

import React from 'react';
import MetricsGrid from './MetricsGrid';
import FiltersBar from './FiltersBar';
import KanbanBoard from './KanbanBoard';

const LeadManagement = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Lead Management</h1>
      <MetricsGrid />
      <FiltersBar />
      <KanbanBoard />
    </div>
  );
};

export default LeadManagement;


