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
      <div className="relative flex items-stretch bg-white border border-[#D5D5D5]/60 rounded-[10px] overflow-visible shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        <button onClick={()=>setIsOpen((v)=>!v)} className="px-3 flex items-center justify-center text-[#202224] text-sm">
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.5 7.69286C15.8848 7.69286 20.25 6.13865 20.25 4.22143C20.25 2.30421 15.8848 0.75 10.5 0.75C5.11522 0.75 0.75 2.30421 0.75 4.22143C0.75 6.13865 5.11522 7.69286 10.5 7.69286Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M0.75 4.22144C0.75253 7.70481 3.85614 10.7308 8.25 11.5338V16.3714C8.25 17.33 9.25736 18.1072 10.5 18.1072C11.7426 18.1072 12.75 17.33 12.75 16.3714V11.5338C17.1439 10.7308 20.2475 7.70481 20.25 4.22144" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </button>
        <div className="w-px bg-gray-200" />
        <input type="text" placeholder="Mobile Number" className="px-4 h-10 rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] bg-white focus:outline-none" />
        <div className="w-px bg-gray-200" />
        <input type="text" placeholder="Student Name" className="px-4 h-10 rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] bg-white focus:outline-none" />
        <div className="w-px bg-gray-200" />
        <button className="px-4 py-2 text-sm text-[#202224] text-sm inline-flex items-center gap-2">
          <span>Lead Status</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <div className="w-px bg-gray-200" />
        <button onClick={onReset} className="px-4 py-2 text-sm text-red-600 inline-flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filter</span>
        </button>

        {isOpen && (
          <div ref={panelRef} className="absolute z-50 top-full left-0 mt-2 bg-white rounded-[10px] [box-shadow:0px_13px_61px_0px_#A9A9A95D] border border-[#D5D5D5]/60 p-4 w-[calc(100vw-4rem)] max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Other filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#202224] text-sm mb-2">Assigned Sales Person</label>
                <div className="relative">
                  <select className="w-full appearance-none border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] pr-8 focus:outline-none bg-[#f5f9ff]">
                    <option>All Staff</option>
                    <option>Staff 1</option>
                    <option>Staff 2</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#202224] text-sm">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#202224] text-sm mb-2">Assigned Sales Person</label>
                <div className="relative">
                  <select className="w-full appearance-none border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] pr-8 focus:outline-none bg-[#f5f9ff]">
                    <option>All Staff</option>
                    <option>Staff 1</option>
                    <option>Staff 2</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#202224] text-sm">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label className="block text-sm text-[#202224] text-sm mb-2">NEET Rank Range</label>
                <div className="flex gap-3">
                  <input type="text" placeholder="Min" className="flex-1 border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none" />
                  <input type="text" placeholder="Max" className="flex-1 border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#202224] text-sm mb-2">Visuti ID</label>
                <input type="text" placeholder="Search by ID" className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm text-[#202224] text-sm mb-2">Mobile Number</label>
                <input type="text" placeholder="Search by number" className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none" />
              </div>

              <div className="flex items-center col-span-full">
                <input type="checkbox" id="todayFollowup" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:outline-none" />
                <label htmlFor="todayFollowup" className="ml-2 text-sm text-[#202224] text-sm">Today's Follow-up Leads</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#D5D5D5]/60">
              <button onClick={()=>setIsOpen(false)} className="px-6 py-2 text-xs font-medium text-white  bg-[#BFBFBF] rounded-[10px] transition-colors">Cancel</button>
              <button onClick={()=>setIsOpen(false)} className="px-6 py-2 text-xs font-medium text-white bg-[#4880FF] rounded-[10px] hover:bg-[#4880FF] transition-colors">Apply Now</button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={onExport} className="h-10 w-10 inline-flex items-center justify-center rounded-[10px] border border-[#D5D5D5]/60 bg-white">
          <Download className="w-5 h-5 text-[#202224] text-sm" />
        </button>
        <button onClick={onImport} className="h-10 w-10 inline-flex items-center justify-center rounded-[10px] border border-[#D5D5D5]/60 bg-white">
          <Upload className="w-5 h-5 text-[#202224] text-sm" />
        </button>
        <button onClick={onCreate} className="px-4 h-10 inline-flex items-center justify-center rounded-[10px] bg-[#4880FF] hover:bg-[#2563EB] text-white text-sm font-medium">
          Create New
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;


