'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  Phone, 
  Mail, 
  Hash, 
  Calendar, 
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Plus,
  Search,
  Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const FieldInput = ({ icon: Icon, label, type = 'text', placeholder, value, onChange, required = false, options = [] }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-[10px] bg-gray-50 border border-gray-200">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 mb-1">
          <label className="text-xs sm:text-sm font-medium text-gray-900">
            {label}
          </label>
          {required && <span className="text-red-500 text-[10px] sm:text-xs">*</span>}
        </div>
        {type === 'select' ? (
          <div className="relative">
            <select
              value={value}
              onChange={onChange}
              className="w-full appearance-none border border-[#D5D5D5] rounded-[10px] px-2 sm:px-3 h-9 sm:h-10 text-xs sm:text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff]"
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value || opt} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border border-[#D5D5D5] rounded-[10px] px-2 sm:px-3 h-9 sm:h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
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
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeFieldsOnly, setActiveFieldsOnly] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showActiveFieldsDropdown, setShowActiveFieldsDropdown] = useState(false);
  const typeDropdownRef = useRef(null);
  const activeFieldsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target)) {
        setShowTypeDropdown(false);
      }
      if (activeFieldsDropdownRef.current && !activeFieldsDropdownRef.current.contains(e.target)) {
        setShowActiveFieldsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Fields Settings</h1>
          <button className="p-1 sm:p-1.5 rounded hover:bg-gray-100 transition-colors">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4880FF]" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => router.push('/leads/fields-settings')}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add a new field</span>
          <span className="sm:hidden">Add Field</span>
        </button>
      </div>

      {/* Lead Id Section */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-gray-200">
          <span className="text-xs sm:text-sm font-medium text-gray-900">Lead Id</span>
          <button className="text-[10px] sm:text-xs text-[#4880FF] hover:text-[#7e22ce] underline">Learn more</button>
        </div>

        {/* Current Lead Identifier */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-[10px] border border-gray-200 mt-3 sm:mt-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">WhatsApp Number</div>
              <div className="text-[10px] sm:text-xs text-gray-500 truncate">+91 9999999999</div>
            </div>
          </div>
          <button className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[#4880FF] hover:bg-[#4880FF]/10 rounded-[10px] transition-colors flex-shrink-0 ml-2">
            Change
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* PRIMARY FIELDS (ASSIGN) */}
        <div className="bg-white rounded-[10px] p-3 sm:p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">PRIMARY FIELDS (ASSIGN)</h2>
          </div>
          <div className="space-y-2 sm:space-y-3">
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
        <div className="bg-white rounded-[10px] p-3 sm:p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">OTHER FIELDS</h2>
            <button
              type="button"
              onClick={() => router.push('/leads/fields-settings')}
              className="text-xs sm:text-sm text-[#4880FF] hover:text-[#7e22ce] font-medium flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>Properties</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="relative flex-1 w-full sm:min-w-[200px]">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 sm:pl-10 pr-3 h-9 sm:h-10 border border-[#D5D5D5] rounded-[10px] text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
              />
            </div>
            <div className="relative w-full sm:w-auto" ref={typeDropdownRef}>
              <button
                type="button"
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-[10px] text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between sm:justify-start gap-2"
              >
                <span>Select type</span>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showTypeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full mt-1 left-0 sm:right-0 w-full sm:w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
                  {['All', 'Checkbox', 'Date', 'Dependent Dropdown', 'Dropdown', 'Email', 'Money', 'Number'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setTypeFilter(type === 'All' ? 'all' : type.toLowerCase());
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 ${
                        (typeFilter === 'all' && type === 'All') || typeFilter === type.toLowerCase()
                          ? 'bg-[#4880FF]/10 text-[#4880FF]'
                          : 'text-gray-700'
                      }`}
                    >
                      {type === 'All' && '✓ '}
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative w-full sm:w-auto" ref={activeFieldsDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setShowActiveFieldsDropdown(!showActiveFieldsDropdown);
                  setActiveFieldsOnly(!activeFieldsOnly);
                }}
                className={`w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border rounded-[10px] text-xs sm:text-sm flex items-center justify-between sm:justify-start gap-2 transition-colors ${
                  activeFieldsOnly
                    ? 'border-[#4880FF] bg-[#4880FF]/10 text-[#4880FF]'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Active Fields</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showActiveFieldsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showActiveFieldsDropdown && (
                <div className="absolute top-full mt-1 left-0 sm:right-0 w-full sm:w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFieldsOnly(true);
                      setShowActiveFieldsDropdown(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 bg-[#4880FF]/10 text-[#4880FF]"
                  >
                    ✓ Active Fields
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFieldsOnly(false);
                      setShowActiveFieldsDropdown(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-gray-700"
                  >
                    All Fields
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
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
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSingleLeadPage;

