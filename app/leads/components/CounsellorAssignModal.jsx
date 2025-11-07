'use client';

import React, { useEffect, useState } from 'react';
import { X, Phone } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

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
      <div className={`fixed inset-0 z-50 h-[403px] flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-lg  h-full flex flex-col bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] overflow-hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="px-6 border-b border-gray-100 pb-2 pt-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[24px] font-bold text-gray-900">Counsellor Assign</h3>
              <button onClick={onClose} className="h-9 inline-flex items-center justify-center rounded-[10px] cursor-pointer">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="px-6 pt-4 pb-6 space-y-5">
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
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-white shrink-0">
            <button onClick={()=>onRegister?.(lead)} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Register Now</button>
            <button onClick={()=>onAssign?.({ documentChecker, counsellor, lead })} className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]">Assign</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounsellorAssignModal;


