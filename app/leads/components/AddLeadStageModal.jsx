'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const COLORS = [
  '#6B7280','#A855F7','#DB2777','#EF4444','#F97316','#F59E0B','#EAB308','#84CC16','#22C55E','#10B981','#06B6D4','#3B82F6','#6366F1','#8B5CF6'
];

const AddLeadStageModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-auto h-full flex flex-col rounded-2xl bg-white shadow-xl border border-gray-200 z-10 overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-4 shrink-0 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add Lead Stages</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter Title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Color</label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="h-8 w-8 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: color === c ? '#3B82F6' : 'transparent' }}
                  aria-label={c}
                >
                  <span className="h-6 w-6 rounded-full" style={{ backgroundColor: c }} />
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
        <div className="p-6 pt-4 border-t border-gray-200 shrink-0 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={() => { onSave?.({ title: title.trim() || 'Untitled', color }); onClose?.(); setTitle(''); setColor(COLORS[0]); }}
            className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]"
          >
            Add Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadStageModal;


