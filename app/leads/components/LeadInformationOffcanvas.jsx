'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const LeadInformationOffcanvas = ({ open, onClose, onSave, leadData = null }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    fullName: '',
    email: '',
    neetRank: '',
    neetScore: '',
    state: '',
    interestedCourse: '',
    leadSource: ''
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (open && leadData) {
      setFormData({
        mobileNumber: leadData.mobileNumber || '',
        fullName: leadData.fullName || '',
        email: leadData.email || '',
        neetRank: leadData.neetRank || '',
        neetScore: leadData.neetScore || '',
        state: leadData.state || '',
        interestedCourse: leadData.interestedCourse || '',
        leadSource: leadData.leadSource || ''
      });
    } else if (!open) {
      setFormData({
        mobileNumber: '',
        fullName: '',
        email: '',
        neetRank: '',
        neetScore: '',
        state: '',
        interestedCourse: '',
        leadSource: ''
      });
      setErrors({});
      setOtpSent(false);
    }
  }, [open, leadData]);

  // Prevent body scroll when offcanvas is open
  useEffect(() => {
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

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSendOTP = () => {
    if (!formData.mobileNumber.trim()) {
      setErrors((prev) => ({ ...prev, mobileNumber: 'Mobile number is required' }));
      return;
    }
    // TODO: Implement OTP sending logic
    setOtpSent(true);
    console.log('Sending OTP to:', formData.mobileNumber);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave?.(formData);
      onClose();
    }
  };

  const isFormValid = formData.mobileNumber && formData.fullName;

  return (
    <>
      {open && <Backdrop onClose={onClose} />}

      {/* Offcanvas */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`h-full w-full sm:max-w-md md:max-w-lg bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] transform transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-200 shrink-0">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Lead Information</h3>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
              <div className="space-y-4 sm:space-y-5">
                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleChange('mobileNumber')}
                      placeholder="+91-xxxxx2552"
                      className={`flex-1 rounded-[10px] border px-3 h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none  ${
                        errors.mobileNumber ? 'border-red-300' : 'border-[#D5D5D5]'
                      }`}
                    />
                    <button
                      onClick={handleSendOTP}
                      className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-[#4880FF] bg-white border border-[#4880FF] rounded-[10px] hover:bg-[#4880FF]/5 transition-colors whitespace-nowrap"
                    >
                      Send OTP
                    </button>
                  </div>
                  {errors.mobileNumber && <p className="mt-1 text-xs text-red-600">{errors.mobileNumber}</p>}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Enter Full name"
                    className={`w-full rounded-[10px] border px-3 h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none  ${
                      errors.fullName ? 'border-red-300' : 'border-[#D5D5D5]'
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="Enter email"
                    className={`w-full rounded-[10px] border px-3 h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none  ${
                      errors.email ? 'border-red-300' : 'border-[#D5D5D5]'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* NEET Rank and Score */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      NEET Rank
                    </label>
                    <input
                      type="text"
                      value={formData.neetRank}
                      onChange={handleChange('neetRank')}
                      placeholder="Enter NEET rank"
                      className="w-full rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      NEET Score
                    </label>
                    <input
                      type="text"
                      value={formData.neetScore}
                      onChange={handleChange('neetScore')}
                      placeholder="Enter NEET Score"
                      className="w-full rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none "
                    />
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={handleChange('state')}
                    className="w-full  rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-xs sm:text-[13px] text-[#202224] bg-[#f5f9ff] focus:outline-none "
                  >
                    <option value="">Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>

                {/* Interested Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Interested Course
                  </label>
                  <select
                    value={formData.interestedCourse}
                    onChange={handleChange('interestedCourse')}
                    className="w-full  rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-xs sm:text-[13px] text-[#202224] bg-[#f5f9ff] focus:outline-none "
                  >
                    <option value="">Select course</option>
                    <option value="MBBS">MBBS</option>
                    <option value="BDS">BDS</option>
                    <option value="BAMS">BAMS</option>
                    <option value="BHMS">BHMS</option>
                    <option value="BUMS">BUMS</option>
                    <option value="B.Sc Nursing">B.Sc Nursing</option>
                    <option value="BPT">BPT</option>
                    <option value="B.Pharm">B.Pharm</option>
                  </select>
                </div>

                {/* Lead Source */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Lead Source
                  </label>
                <select
                    value={formData.interestedCourse}
                    onChange={handleChange('interestedCourse')}
                    className="w-full  rounded-[10px] border border-[#D5D5D5] px-3 h-10 text-xs sm:text-[13px] text-[#202224] bg-[#f5f9ff] focus:outline-none "
                  >
                    <option value="">Lead Scrore</option>
                    <option value="MBBS">MBBS</option>
                    <option value="BDS">BDS</option>
                    <option value="BAMS">BAMS</option>
                    <option value="BHMS">BHMS</option>
                    <option value="BUMS">BUMS</option>
                    <option value="B.Sc Nursing">B.Sc Nursing</option>
                    <option value="BPT">BPT</option>
                    <option value="B.Pharm">B.Pharm</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-4 sm:p-5 md:p-6 border-t border-gray-200 shrink-0">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium text-black bg-white border border-[#4880FF] rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium rounded-[10px] transition-colors ${
                  isFormValid
                    ? 'bg-[#4880FF] text-white hover:bg-[#3a6fcc]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadInformationOffcanvas;
