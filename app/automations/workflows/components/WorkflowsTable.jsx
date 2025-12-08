'use client';

import React, { useState } from 'react';
import { Copy, Trash2, MessageSquare, Facebook, FileText, Settings, Phone } from 'lucide-react';

const WorkflowsTable = ({ workflows, activeTab = 'published', onStatusToggle, onCopy, onDelete }) => {
  const isDraftTab = activeTab === 'draft';
  const getEventIcon = (iconType) => {
    const iconClass = "w-4 h-4";
    switch (iconType) {
      case 'whatsapp':
        return <MessageSquare className={`${iconClass} text-green-600`} />;
      case 'facebook':
        return <Facebook className={`${iconClass} text-blue-600`} />;
      case 'document':
        return <FileText className={`${iconClass} text-gray-600`} />;
      case 'gear':
        return <Settings className={`${iconClass} text-gray-600`} />;
      case 'phone':
        return <Phone className={`${iconClass} text-blue-600`} />;
      default:
        return <FileText className={`${iconClass} text-gray-600`} />;
    }
  };

  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange();
        }}
        className={`relative inline-flex h-7 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:ring-offset-2 cursor-pointer shrink-0 ${
          enabled 
            ? 'bg-[#5D5BD0]' 
            : 'bg-gray-300'
        }`}
        style={{ minWidth: '60px', width: '60px', paddingLeft: enabled ? '6px' : '24px', paddingRight: enabled ? '24px' : '6px' }}
      >
        {enabled ? (
          <>
            <span className="text-xs font-semibold uppercase text-white z-10">
              ON
            </span>
            <span className="absolute top-1/2 -translate-y-1/2 right-1 inline-block h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200" />
          </>
        ) : (
          <>
            <span className="absolute top-1/2 -translate-y-1/2 left-1 inline-block h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200" />
            <span className="text-xs font-semibold uppercase text-gray-700 z-10 ml-auto">
              OFF
            </span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="-mx-5 px-5">
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700">
              Events
            </th>
            {!isDraftTab && (
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">
                Status
              </th>
            )}
            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700 hidden lg:table-cell">
              {isDraftTab ? 'Updated on' : 'Status updated on'}
            </th>
            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700 hidden lg:table-cell">
              {isDraftTab ? 'Updated by' : 'Status updated by'}
            </th>
            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workflows.length === 0 ? (
            <tr>
              <td colSpan={isDraftTab ? 5 : 6} className="px-6 py-8 text-center text-sm text-gray-500">
                No workflows found
              </td>
            </tr>
          ) : (
            workflows.map((workflow) => (
              <tr key={workflow.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-medium text-gray-900">{workflow.name}</span>
                      {workflow.isDraft && (
                        <a href="#" className="text-xs text-[#4880FF] hover:underline mt-1">
                          View Draft
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2">
                      {getEventIcon(workflow.eventIcon)}
                      <span className="text-xs md:text-sm text-gray-700 truncate max-w-[150px]">{workflow.eventType}</span>
                    </div>
                  </td>
                  {!isDraftTab && (
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <ToggleSwitch
                        enabled={workflow.status}
                        onChange={() => onStatusToggle(workflow.id)}
                      />
                    </td>
                  )}
                  <td className="px-4 md:px-6 py-3 md:py-4 hidden lg:table-cell">
                    <span className="text-xs md:text-sm text-gray-600">{workflow.statusUpdatedOn}</span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] md:text-xs font-bold border border-red-200">
                        {workflow.statusUpdatedBy.logo}
                      </div>
                      <span className="text-xs md:text-sm text-gray-700">{workflow.statusUpdatedBy.name}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCopy(workflow);
                        }}
                        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-[6px] transition-colors"
                        title="Copy workflow"
                      >
                        <Copy className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(workflow);
                        }}
                        className="p-1.5 md:p-2 hover:bg-red-50 rounded-[6px] transition-colors"
                        title="Delete workflow"
                      >
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="md:hidden space-y-3">
        {workflows.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 bg-white rounded-[10px] border border-gray-200">
            No workflows found
          </div>
        ) : (
          workflows.map((workflow) => (
            <div key={`mobile-${workflow.id}`} className="bg-white border border-gray-200 rounded-[10px] p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{workflow.name}</h3>
                  {workflow.isDraft && (
                    <a href="#" className="text-xs text-[#4880FF] hover:underline">
                      View Draft
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopy(workflow);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-[6px] transition-colors"
                    title="Copy workflow"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(workflow);
                    }}
                    className="p-2 hover:bg-red-50 rounded-[6px] transition-colors"
                    title="Delete workflow"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getEventIcon(workflow.eventIcon)}
                <span className="text-xs text-gray-700">{workflow.eventType}</span>
              </div>

              {!isDraftTab && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Status:</span>
                  <ToggleSwitch
                    enabled={workflow.status}
                    onChange={() => onStatusToggle(workflow.id)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-bold border border-red-200">
                    {workflow.statusUpdatedBy.logo}
                  </div>
                  <span className="text-xs text-gray-700">{workflow.statusUpdatedBy.name}</span>
                </div>
                <span className="text-xs text-gray-600">{workflow.statusUpdatedOn}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkflowsTable;

