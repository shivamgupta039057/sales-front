'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// Top bar with Bulk actions, Apply, Search, and two summary chips
const TableTopBar = ({
  onBulkActionChange,
  onApply,
  onSearchChange,
  todayCount = 5,
  overdueCount = 5,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const bulkItems = [
    { label: "Leads Status", value: 'status' },
    { label: "Update Lead’s Rating", value: 'rating' },
    { label: "Re-assign leads", value: 'reassign' },
    { label: "Send Notification", value: 'notify' },
    { label: "Delete", value: 'delete', danger: true },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4">
      {/* Left controls */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {/* Bulk actions custom dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-between gap-2 min-w-[180px] border border-gray-300 rounded-[10px] px-3 py-2 text-sm bg-white text-gray-700 hover:bg-gray-50"
          >
            <span className="truncate">Bulk actions</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-[10px] border border-gray-200 bg-white shadow-xl z-10 overflow-hidden">
              {bulkItems.map((it, idx) => (
                <button
                  key={it.value}
                  className={`w-full text-left px-4 py-3 text-[15px] hover:bg-gray-50 ${it.danger ? 'text-red-600 font-semibold' : 'text-gray-900'}`}
                  onClick={() => { setMenuOpen(false); onBulkActionChange?.(it.value); }}
                >
                  {it.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Apply */}
        <button
          onClick={onApply}
          className="px-4 py-2 rounded-md bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB]"
        >
          Apply
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="border border-[#D5D5D5] rounded-[10px] pl-9 pr-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-white w-52 sm:w-72 focus:outline-none"
          />
        </div>
      </div>

      {/* Right summary chips */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-gray-200 bg-white text-sm text-gray-700">
          <span>Today's Follow-up</span>
          <span className="inline-flex items-center justify-center min-w-6 h-6 px-1 rounded-full bg-[#BED2FF] text-black text-xs font-medium">{String(todayCount).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] border border-gray-200 bg-white text-sm text-gray-700">
          <span>Overdue Follow-up</span>
          <span className="inline-flex items-center justify-center min-w-6 h-6 px-1 rounded-full bg-[#BED2FF] text-black text-xs font-medium">{String(overdueCount).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default TableTopBar;


