'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { X, Search } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const RoleChip = ({ label }) => (
  <span className="px-2 py-1 bg-[#F3FBFE] border border-[#D6E4E0] rounded-full text-xs  text-gray-700">{label}</span>
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
    <button onClick={onChangePercent} className="text-sm text-[#4880FF]">{staff.percent}%</button>
  </div>
);

const ReassignLeadsModal = ({ open, onClose, totalLeads = 2000, staff = [], onAssign }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState({});

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((s) => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q));
  }, [query, staff]);

  const numSelected = Object.values(selected).filter(Boolean).length;

  return (
    <>
      {open && <Backdrop onClose={onClose} />}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-lg h-full flex flex-col bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] overflow-hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="px-6 border-b border-gray-100 pb-2 pt-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[24px] font-bold text-gray-900">Reassign leads</h3>
              <button onClick={onClose} className="h-9 inline-flex items-center justify-center rounded-[10px] cursor-pointer">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="px-6 pt-4 pb-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-black text-base font-medium">Total leads</div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 font-medium text-lg">{totalLeads}</span>
                  <button className="text-[#4880FF] text-base font-medium">Edit</button>
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

              <div className="text-xs text-[#666666">{numSelected} Selected <span className="float-right text-[#4880FF] cursor-pointer">Change%</span></div>

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
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-white shrink-0">
            <button onClick={onClose} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={()=> onAssign?.(selected)} className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]">Assign Leads</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReassignLeadsModal;




