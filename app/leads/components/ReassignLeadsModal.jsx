'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { X, Search } from 'lucide-react';

const RoleChip = ({ label }) => (
  <span className="px-2 py-1 rounded-[10px] text-xs bg-gray-100 text-gray-700">{label}</span>
);

const StaffRow = ({ staff, checked, onToggle, onChangePercent }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <input type="checkbox" className="w-4 h-4 accent-[#3B82F6] focus:outline-none" checked={checked} onChange={onToggle} />
      <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold inline-flex items-center justify-center">
        {staff.initials}
      </div>
      <div className="leading-tight">
        <div className="text-sm text-gray-900 font-medium">{staff.name}</div>
        <div className="text-xs text-gray-500">{staff.role}</div>
      </div>
    </div>
    <button onClick={onChangePercent} className="text-sm text-blue-600">{staff.percent}%</button>
  </div>
);

const ReassignLeadsModal = ({ open, onClose, totalLeads = 2000, staff = [], onAssign }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((s) => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q));
  }, [query, staff]);

  const numSelected = Object.values(selected).filter(Boolean).length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-auto h-full flex flex-col rounded-2xl bg-white shadow-xl border border-gray-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Reassign leads</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-[10px] border border-gray-200 bg-white hover:bg-gray-50">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">Total leads</div>
            <div className="flex items-center gap-3">
              <span className="text-gray-900 font-medium">{totalLeads}</span>
              <button className="text-blue-600">Edit</button>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-[10px] border border-[#D5D5D5] pl-9 pr-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {['Root','Admin','Manager','Caller'].map((r)=> (
              <RoleChip key={r} label={r} />
            ))}
          </div>

          <div className="text-xs text-gray-600">{numSelected} Selected <span className="float-right text-blue-600 cursor-pointer">Change%</span></div>

          <div className="divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
            {filtered.map((s) => (
              <StaffRow
                key={s.id}
                staff={s}
                checked={!!selected[s.id]}
                onToggle={() => setSelected((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                onChangePercent={() => {}}
              />)
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-white">Cancel</button>
          <button onClick={()=> onAssign?.(selected)} className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]">Assign Leads</button>
        </div>
      </div>
    </div>
  );
};

export default ReassignLeadsModal;




