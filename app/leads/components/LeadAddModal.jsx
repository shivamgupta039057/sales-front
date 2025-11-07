'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const Input = ({ label, required, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      {...props}
      className={`w-full rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${props.className || ''}`}
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      <select
        {...props}
        className={`w-full appearance-none rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff] ${props.className || ''}`}
      >
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
    </div>
  </div>
);

const LeadAddModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    mobile: '',
    whatsapp: '',
    fullName: '',
    email: '',
    neetRank: '',
    neetScore: '',
    state: '',
    course: '',
    source: '',
  });

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

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      {open && <Backdrop onClose={onClose} />}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-lg h-full flex flex-col bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] overflow-hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="px-6 pt-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[24px] font-bold text-gray-900">Lead Add</h3>
              <button onClick={onClose} className="h-9 inline-flex items-center justify-center rounded-[10px] cursor-pointer">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="px-6 pt-4 pb-6">
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <Input
                    label="Mobile Number"
                    required
                    placeholder="+91-xxxxx2552"
                    value={form.mobile}
                    onChange={handleChange('mobile')}
                  />
                  <button className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-[10px] bg-[#3B82F6] text-white hover:bg-[#2563EB]">+</button>
                </div>

                <Input
                  label="Whatsapp Number"
                  placeholder="+91-xxxxx2552"
                  value={form.whatsapp}
                  onChange={handleChange('whatsapp')}
                />

                <Input
                  label="Full Name"
                  required
                  placeholder="Enter Full name"
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                />

                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange('email')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="NEET Rank"
                    placeholder="Enter NEET rank"
                    value={form.neetRank}
                    onChange={handleChange('neetRank')}
                  />
                  <Input
                    label="NEET Score"
                    placeholder="Enter NEET Score"
                    value={form.neetScore}
                    onChange={handleChange('neetScore')}
                  />
                </div>

                <Select
                  label="State"
                  value={form.state}
                  onChange={handleChange('state')}
                  options={['Select state','Rajasthan','Gujarat','Madhya Pradesh']}
                />

                <Select
                  label="Interested Course"
                  value={form.course}
                  onChange={handleChange('course')}
                  options={['Select course','MBBS','BDS','BSc Nursing']}
                />

                <Select
                  label="Lead Source"
                  value={form.source}
                  onChange={handleChange('source')}
                  options={['Select course','Website','Ads','Referral']}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 shrink-0 flex items-center justify-end gap-3 bg-white">
            <button onClick={onClose} className="px-4 py-2 rounded-[10px] border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button
              onClick={() => { onSave?.(form); onClose?.(); }}
              className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]"
            >
              Save Lead
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadAddModal;


