'use client';

import React, { useState } from 'react';
import { GripVertical, Pencil, Trash2, Plus } from 'lucide-react';
import AddLeadStageModal from './AddLeadStageModal';
import DeleteStatusModal from './DeleteStatusModal';

const StageCard = ({ color = 'bg-gray-100', title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <div className={`px-4 py-3 text-center text-sm font-semibold ${color} bg-opacity-30`}>{title}</div>
    {children}
  </div>
);

const ItemRow = ({ label, tint = 'bg-gray-200', tintColor, onDelete }) => (
  <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${tintColor ? '' : tint}`} style={tintColor ? { backgroundColor: tintColor } : undefined}>
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
          <StageCard color="bg-gray-100" title="Initial stage">
            <div className="p-3">
              <div className="rounded-lg border border-gray-200 bg-purple-100 text-purple-900 px-3 py-3 flex items-center justify-between">
                <span>Just Curious</span>
                <Pencil className="w-4 h-4" />
              </div>
            </div>
          </StageCard>
        </div>

        {/* Active Stage */}
        <div className="space-y-3">
          <StageCard color="bg-green-100" title="Active stage">
            <div className="p-3">
              <button onClick={()=>setAddOpen(true)} className="w-full mb-3 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
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
          </StageCard>
        </div>

        {/* Closed Stage */}
        <div className="space-y-3">
          <StageCard color="bg-green-100" title="Closed stage">
            <div className="p-3 space-y-3">
              <StageCard color="bg-green-50" title="Won">
                <div className="p-3">
                  <div className="rounded-lg border border-gray-200 bg-teal-100 text-gray-800 px-3 py-3 flex items-center justify-between">
                    <span>Deal Closed</span>
                    <Pencil className="w-4 h-4" />
                  </div>
                </div>
              </StageCard>

              <StageCard color="bg-red-50" title={<span className="text-red-600 font-semibold">Lost</span>}>
                <div className="p-3 space-y-3">
                  <div className="rounded-lg border border-gray-200 bg-red-100 text-gray-800 px-3 py-3 flex items-center justify-between">
                    <span>Lost</span>
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reason for Lost leads</span>
                    <button className="text-blue-600">+Add</button>
                  </div>
                  <div className="space-y-2">
                    <ItemRow label="Score doesn't match" tint="bg-white" />
                    <ItemRow label="Budget Issues" tint="bg-white" />
                    <ItemRow label="Lost to competitor" tint="bg-white" />
                    <ItemRow label="Unknown Reason" tint="bg-white" />
                    <ItemRow label="Reason" tint="bg-white" />
                  </div>
                </div>
              </StageCard>
            </div>
          </StageCard>
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



