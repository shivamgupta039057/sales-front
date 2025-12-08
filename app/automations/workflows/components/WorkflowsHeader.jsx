'use client';

import React from 'react';
import { Wrench, RefreshCw, Plus } from 'lucide-react';

const WorkflowsHeader = ({ onCreateWorkflow }) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#4880FF]" />
            <h1 className="text-2xl font-semibold text-gray-900">Workflows</h1>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600">
          To execute complex automations with ease{' '}
          <a href="#" className="text-[#4880FF] hover:underline">Learn</a>
          <br />
          <a href="#" className="text-[#4880FF] hover:underline">More</a>
        </p>
      </div>
      
      <button
        onClick={onCreateWorkflow}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#5D5BD0] hover:bg-[#4d4bc0] text-white rounded-[8px] font-medium text-sm transition-colors shadow-sm whitespace-nowrap"
      >
        <Plus className="w-4 h-4 shrink-0" />
        <span className="whitespace-nowrap">Create Workflow</span>
      </button>
    </div>
  );
};

export default WorkflowsHeader;

