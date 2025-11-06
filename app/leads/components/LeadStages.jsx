'use client';

import React, { useState } from 'react';
import { GripVertical, Pencil, Trash2, Plus } from 'lucide-react';
import AddLeadStageModal from './AddLeadStageModal';
import DeleteStatusModal from './DeleteStatusModal';

const StageCard = ({ color = 'bg-gray-100', title, children }) => (
  <div className="rounded-[10px] border border-gray-200 bg-white overflow-hidden">
    <div className={`px-4 py-3 text-center text-sm font-semibold ${color} bg-opacity-30`}>{title}</div>
    {children}
  </div>
);

const ItemRow = ({ label, tint = 'bg-gray-200', tintColor, onDelete }) => (
  <div className={`flex items-center justify-between rounded-[10px] px-3 py-2 ${tintColor ? '' : tint}`} style={tintColor ? { backgroundColor: tintColor } : undefined}>
    <div className="flex items-center gap-2 text-sm">
      <GripVertical className="w-4 h-4 text-gray-500" />
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <button className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50">
        <Pencil className="w-4 h-4 text-gray-700" />
      </button>
      <button onClick={onDelete} className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50">
        <Trash2 className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  </div>
);

const LeadStages = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [activeItems, setActiveItems] = useState([
    { label: 'Interested', color: '#DCFCE7' },
    { label: 'Zoom Session Complete', color: '#FEF3C7' },
    { label: 'Personal Counselling', color: '#DBEAFE' },
    { label: 'Not Interested', color: '#FCE7F3' },
    { label: 'Office Visited', color: '#CCFBF1' },
    { label: 'Top Intrested', color: '#E5E7EB' },
    { label: '11th class student', color: '#E9D5FF' },
  ]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddStage = ({ title, color }) => {
    setActiveItems((prev) => [...prev, { label: title, color }]);
  };

  return (
    <div className="w-full">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Initial Stage */}
        <div className="space-y-3">
          <div className="rounded-[10px] border-[2px] border-[#E8E8E8] bg-white p-4 space-y-3">
            {/* Top field - Initial stage */}
            <div className="relative rounded-[10px] bg-white border-[2px] border-[#E8E8E8] p-3 text-center">
              
              <div className="text-sm font-semibold text-gray-900">Initial stage</div>
            </div>
            {/* Bottom field - Just Curious */}
            <div className="rounded-[10px] bg-[#7D236E33] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Just Curious</span>
              <button className="p-1 hover:bg-purple-200 rounded transition-colors">
                <Pencil className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Stage */}
        <div className="space-y-3">
          <div className="rounded-[10px] border-[2px] border-[#D9F1D9] bg-white overflow-hidden">
            <div className="p-4 space-y-3">
            <div className="relative rounded-[10px] bg-[#D9F1D9] border-[2px] border-[#D9F1D9] p-3 text-center">
              
              <div className="text-sm font-semibold text-gray-900">Active stage</div>
            </div>
              <button onClick={()=>setAddOpen(true)} className="w-full mb-3 inline-flex items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <Plus className="w-4 h-4" />
                Add Stage
              </button>
              <div className="space-y-2">
                {activeItems.map((it, idx) => (
                  <ItemRow
                    key={`${it.label}-${idx}`}
                    label={it.label}
                    tintColor={it.color}
                    onDelete={() => { setDeleteIndex(idx); setDeleteOpen(true); }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closed Stage */}
        <div className="space-y-3">
          <div className="rounded-[10px] border-[2px] border-[#D9F1D9] bg-white overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="relative rounded-[10px] bg-[#D9F1D9] border-[2px] border-[#D9F1D9] p-3 text-center">
                <div className="text-sm font-semibold text-gray-900">Closed stage</div>
              </div>
              
              {/* Won Section */}
              <div className="rounded-[10px] border border-gray-200 bg-white overflow-hidden">
                <div className="px-4 py-3 text-center text-sm font-semibold bg-green-50 bg-opacity-30">Won</div>
                <div className="p-3">
                  <div className="rounded-[10px] border border-gray-200 bg-teal-100 text-gray-800 px-3 py-3 flex items-center justify-between">
                    <span>Deal Closed</span>
                    <button className="p-1 hover:bg-teal-200 rounded transition-colors">
                      <Pencil className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lost Section */}
              <div className="rounded-[10px] border-[2px] border-red-300 bg-white overflow-hidden">
                <div className="px-4 py-3 text-center text-sm font-semibold text-red-600">Lost</div>
                <div className="p-3 space-y-3">
                  <div className="rounded-[10px] border border-gray-200 bg-red-100 text-gray-800 px-3 py-3 flex items-center justify-between">
                    <span>Lost</span>
                    <button className="p-1 hover:bg-red-200 rounded transition-colors">
                      <Pencil className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reason for Lost leads</span>
                    <button className="text-blue-600 hover:text-blue-700">+Add</button>
                  </div>
                  <div className="space-y-2">
                    <ItemRow label="Score doesn't match" tint="bg-white" />
                    <ItemRow label="Budget Issues" tint="bg-white" />
                    <ItemRow label="Lost to competitor" tint="bg-white" />
                    <ItemRow label="Unknown Reason" tint="bg-white" />
                    <ItemRow label="Reason" tint="bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddLeadStageModal open={addOpen} onClose={()=>setAddOpen(false)} onSave={handleAddStage} />
      <DeleteStatusModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => { if (deleteIndex!==null){ setActiveItems(prev => prev.filter((_,i)=> i!==deleteIndex)); setDeleteIndex(null);} setDeleteOpen(false); }}
      />
    </div>
  );
};

export default LeadStages;



