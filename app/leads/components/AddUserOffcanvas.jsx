'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronDown, User, Eye, EyeOff } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const AddUserOffcanvas = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    initials: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setFormData({
        name: '',
        initials: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: ''
      });
      setErrors({});
      setShowPassword(false);
    }
  }, [open]);

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.initials.trim()) newErrors.initials = 'Initials is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave?.(formData);
      onClose();
    }
  };

  const isFormValid = formData.name && formData.initials && formData.email && 
                     formData.password && formData.phoneNumber && formData.role;

  return (
    <>
      {open && <Backdrop onClose={onClose} />}

      {/* Offcanvas */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`h-full w-full max-w-lg bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] transform transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 py-2 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Add User</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="Name"
                    className={`w-full rounded-[10px] border px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${
                      errors.name ? 'border-red-300' : 'border-[#D5D5D5]'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                {/* Initials */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initials <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.initials}
                    onChange={handleChange('initials')}
                    placeholder="Initials"
                    className={`w-full rounded-[10px] border px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${
                      errors.initials ? 'border-red-300' : 'border-[#D5D5D5]'
                    }`}
                  />
                  {errors.initials && <p className="mt-1 text-xs text-red-600">{errors.initials}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="Email"
                    className={`w-full rounded-[10px] border px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${
                      errors.email ? 'border-red-300' : 'border-[#D5D5D5]'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange('password')}
                      placeholder="Password"
                      className={`w-full rounded-[10px] border px-3 pr-10 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${
                        errors.password ? 'border-red-300' : 'border-[#D5D5D5]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-[#D5D5D5] rounded-[10px] bg-[#f5f9ff] overflow-hidden">
                    <div className="flex items-center gap-2 px-3 border-r border-[#D5D5D5] bg-gray-50">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-sm font-medium text-gray-700">91</span>
                    </div>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange('phoneNumber')}
                      placeholder="Enter Phone Number"
                      className={`flex-1 px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none ${
                        errors.phoneNumber ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.role}
                      onChange={handleChange('role')}
                      className={`w-full appearance-none rounded-[10px] border px-3 pl-10 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff] ${
                        errors.role ? 'border-red-300' : 'border-[#D5D5D5]'
                      }`}
                    >
                      <option value="">Assign Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="counsellor">Counsellor</option>
                      <option value="staff">Staff</option>
                    </select>
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 text-sm font-medium text-black bg-white border border-[#4880FF] rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full sm:w-auto px-6 py-2.5 sm:py-3 text-sm font-medium rounded-[10px] transition-colors ${
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

export default AddUserOffcanvas;

