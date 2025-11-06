'use client';

import React, { useState } from 'react';
import { 
  Type, 
  Phone, 
  Mail, 
  Hash, 
  Calendar, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const FieldInput = ({ icon: Icon, label, type = 'text', placeholder, value, onChange, required = false, options = [] }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-[10px] bg-gray-50 border border-gray-200">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <label className="text-sm font-medium text-gray-900">
            {label}
          </label>
          {required && <span className="text-red-500 text-xs">*</span>}
        </div>
        {type === 'select' ? (
          <div className="relative">
            <select
              value={value}
              onChange={onChange}
              className="w-full appearance-none border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff]"
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value || opt} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};

const AddSingleLeadPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    id: '',
    email: '',
    alternateNumber: '',
    interestedCourse: '',
    studentCategory: '',
    expectedScore: '',
    date: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form data:', formData);
    router.push('/leads');
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Add Single Lead</h1>
        <p className="text-sm text-gray-600">Fill in the information below to create a new lead</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PRIMARY FIELDS (ASSIGN) */}
        <div className="bg-white rounded-[10px] p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">PRIMARY FIELDS (ASSIGN)</h2>
          </div>
          <div className="space-y-3">
            <FieldInput
              icon={Type}
              label="H1: Name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange('name')}
              required
            />
            <FieldInput
              icon={Phone}
              label="H2: WhatsApp Number"
              type="tel"
              placeholder="+91 9999999999"
              value={formData.whatsappNumber}
              onChange={handleChange('whatsappNumber')}
              required
            />
          </div>
        </div>

        {/* OTHER FIELDS */}
        <div className="bg-white rounded-[10px] p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">OTHER FIELDS</h2>
            <button
              type="button"
              className="text-sm text-[#9333EA] hover:text-[#7e22ce] font-medium flex items-center gap-1 transition-colors"
            >
              <span>Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <FieldInput
              icon={Type}
              label="ID"
              type="text"
              placeholder="Text field value"
              value={formData.id}
              onChange={handleChange('id')}
            />
            <FieldInput
              icon={Mail}
              label="Email"
              type="email"
              placeholder="abc@xyz.com"
              value={formData.email}
              onChange={handleChange('email')}
            />
            <FieldInput
              icon={Phone}
              label="Alternate Number"
              type="tel"
              placeholder="+91 9999999999"
              value={formData.alternateNumber}
              onChange={handleChange('alternateNumber')}
            />
            <FieldInput
              icon={ChevronDown}
              label="Interested Course"
              type="select"
              value={formData.interestedCourse}
              onChange={handleChange('interestedCourse')}
              options={['MBBS', 'BDS', 'BSc Nursing', 'BHMS', 'BAMS']}
            />
            <FieldInput
              icon={ChevronDown}
              label="Student Category"
              type="select"
              value={formData.studentCategory}
              onChange={handleChange('studentCategory')}
              options={['General', 'OBC', 'SC', 'ST', 'EWS']}
            />
            <FieldInput
              icon={Hash}
              label="Expected Score"
              type="number"
              placeholder="123"
              value={formData.expectedScore}
              onChange={handleChange('expectedScore')}
            />
            <FieldInput
              icon={Calendar}
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-[#9333EA] rounded-[10px] hover:bg-[#7e22ce] transition-colors"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSingleLeadPage;

