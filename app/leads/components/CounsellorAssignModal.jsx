'use client';

import React, { useEffect, useState } from 'react';
import { X, Phone } from 'lucide-react';

const Select = ({ label, options = [], value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="w-full appearance-none rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff]"
      >
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
    </div>
  </div>
);

const CounsellorAssignModal = ({ open, onClose, onAssign, onRegister, lead }) => {
  const [documentChecker, setDocumentChecker] = useState('Priya Sharma');
  const [counsellor, setCounsellor] = useState('Priya Sharma');

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
      <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col rounded-2xl bg-white shadow-xl border border-gray-200 z-10 overflow-hidden">
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">Counsellor Assign</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-[10px] border border-gray-200 bg-white hover:bg-gray-50">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          <div>
            <div className="text-lg font-semibold text-gray-900">{lead?.name || 'Rohit Verma'} <span className="text-sm text-gray-500 align-middle">(MBA)</span></div>
            <div className="mt-1 flex items-center gap-2 text-gray-700 text-sm">
              <Phone className="w-4 h-4" />
              <span>{lead?.phone || '+91 9876543216'}</span>
            </div>
          </div>

          <Select label="Assign Document Checker" value={documentChecker} onChange={setDocumentChecker} options={["Priya Sharma","Rahul Singh","Aisha Khan"]} />
          <Select label="Assign Counsellor" value={counsellor} onChange={setCounsellor} options={["Priya Sharma","Rahul Singh","Aisha Khan"]} />
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50 shrink-0">
          <button onClick={()=>onRegister?.(lead)} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-white">Register Now</button>
          <button onClick={()=>onAssign?.({ documentChecker, counsellor, lead })} className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]">Assign</button>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAssignModal;


