'use client';

import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

const COLORS = [
  '#6B7280','#A855F7','#DB2777','#EF4444','#F97316','#F59E0B','#EAB308','#84CC16','#22C55E','#10B981','#06B6D4','#3B82F6','#6366F1','#8B5CF6'
];

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const AddLeadStageModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    // Prevent body scroll when offcanvas is open
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  return (
    <>
      {open && <Backdrop onClose={onClose} />}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-lg h-[373px] p-4 flex flex-col bg-white rounded-[10px] [box-shadow:0px_13px_61px_0px_#A9A9A95D] overflow-hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="m-3 h-full flex flex-col bg-white rounded-[10px] overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between ">
              <h3 className="text-[24px] font-bold text-gray-900">Add Lead Stages</h3>
              <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-[10px] border border-gray-200 bg-white hover:bg-gray-50">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto mt-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Title</label>
                  <input
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Enter Title"
                    className="w-full rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all relative"
                        style={{ borderColor: color === c ? '#3B82F6' : 'transparent' }}
                        aria-label={c}
                      >
                        <span className="h-6 w-6 rounded-full" style={{ backgroundColor: c }} />
                        {color === c && (
                          <Check className="w-4 h-4 text-white absolute" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className=" shrink-0 flex items-center justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => { onSave?.({ title: title.trim() || 'Untitled', color }); onClose?.(); setTitle(''); setColor(COLORS[0]); }}
                className="px-4 py-2 rounded-[10px] bg-[#4880FF] text-white text-sm"
              >
                Add Stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLeadStageModal;


