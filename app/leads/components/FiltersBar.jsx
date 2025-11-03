'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Funnel, ChevronDown, RotateCcw, Download, Upload } from 'lucide-react';

// Redesigned FiltersBar to match the required segmented control style
const FiltersBar = ({ onReset, onImport, onExport, onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen]);

  return (
    <div className="flex items-center justify-between gap-3 md:gap-4 mb-4">
      <div className="flex items-stretch bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        <button onClick={()=>setIsOpen((v)=>!v)} className="px-3 flex items-center justify-center text-gray-700">
          <Funnel className="w-5 h-5" />
        </button>
        <div className="w-px bg-gray-200" />
        <input type="text" placeholder="Mobile Number" className="px-4 py-2 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none" />
        <div className="w-px bg-gray-200" />
        <input type="text" placeholder="Student Name" className="px-4 py-2 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none" />
        <div className="w-px bg-gray-200" />
        <button className="px-4 py-2 text-sm text-gray-700 inline-flex items-center gap-2">
          <span>Lead Status</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <div className="w-px bg-gray-200" />
        <button onClick={onReset} className="px-4 py-2 text-sm text-red-600 inline-flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filter</span>
        </button>
      </div>

      {isOpen && (
        <>
        <div className="fixed inset-0 z-[9998]" onClick={()=>setIsOpen(false)} />
        <div ref={panelRef} className="fixed z-[9999] top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-[calc(100%-2rem)] max-w-3xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Other filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Assigned Sales Person</label>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option>All Staff</option>
                  <option>Staff 1</option>
                  <option>Staff 2</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Assigned Sales Person</label>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option>All Staff</option>
                  <option>Staff 1</option>
                  <option>Staff 2</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">NEET Rank Range</label>
              <div className="flex gap-3">
                <input type="text" placeholder="Min" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input type="text" placeholder="Max" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Visuti ID</label>
              <input type="text" placeholder="Search by ID" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Mobile Number</label>
              <input type="text" placeholder="Search by number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="flex items-center col-span-full">
              <input type="checkbox" id="todayFollowup" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
              <label htmlFor="todayFollowup" className="ml-2 text-sm text-gray-700">Today's Follow-up Leads</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button onClick={()=>setIsOpen(false)} className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button onClick={()=>setIsOpen(false)} className="px-6 py-2 text-sm font-medium text-white bg-[#9333EA] rounded-lg hover:bg-[#7e22ce] transition-colors">Apply Now</button>
          </div>
        </div>
        </>
      )}

      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={onExport} className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
          <Download className="w-5 h-5 text-gray-700" />
        </button>
        <button onClick={onImport} className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
          <Upload className="w-5 h-5 text-gray-700" />
        </button>
        <button onClick={onCreate} className="px-4 h-10 inline-flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium">
          Create New
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;


