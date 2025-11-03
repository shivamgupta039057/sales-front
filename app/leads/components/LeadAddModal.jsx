'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const Input = ({ label, required, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      <select
        {...props}
        className={`w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${props.className || ''}`}
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
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col rounded-2xl bg-white shadow-xl border border-gray-200 z-10 overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-4 shrink-0 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900">Lead Add</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          <div className="flex items-end gap-3">
            <Input
              label="Mobile Number"
              required
              placeholder="+91-xxxxx2552"
              value={form.mobile}
              onChange={handleChange('mobile')}
            />
            <button className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]">+</button>
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

        <div className="p-6 pt-4 border-t border-gray-200 shrink-0 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={() => { onSave?.(form); onClose?.(); }}
            className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white text-sm hover:bg-[#2563EB]"
          >
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadAddModal;


