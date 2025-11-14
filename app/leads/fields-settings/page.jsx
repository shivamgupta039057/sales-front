'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Type, 
  Phone, 
  Mail, 
  Hash, 
  Calendar, 
  ChevronDown,
  Edit,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Search,
  GripVertical,
  Trash2,
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react';

const PrimaryFieldItem = ({ field, index, icon: Icon, onEdit, onReorder }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-shrink-0 text-sm font-medium text-gray-600">H{index + 1}:</div>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-50 border border-gray-200">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{field.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          title="Edit"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          title="More options"
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const OtherFieldItem = ({ field, icon: Icon, onEdit, onDelete, onToggleVisibility, isVisible = true }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors group">
      <div className="flex-shrink-0 cursor-move">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-50 border border-gray-200">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{field.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{field.placeholder || field.value || 'No value'}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          title="Edit"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          title="Delete"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
    aria-hidden="true"
  />
);

const CreateFieldOffcanvas = ({ open, onClose, onSave }) => {
  const [fieldData, setFieldData] = useState({
    name: '',
    type: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setFieldData({ name: '', type: '', description: '' });
      setError('');
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

  const handleSubmit = () => {
    if (!fieldData.type) {
      setError('Please select a field type.');
      return;
    }
    if (!fieldData.name.trim()) {
      setError('Please enter a field name.');
      return;
    }
    onSave?.(fieldData);
    onClose();
  };

  return (
    <>
      {open && <Backdrop onClose={onClose} />}

      {/* Offcanvas */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`h-full w-full sm:w-[400px] md:w-[480px] bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] transform transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Create Field</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={fieldData.name}
                onChange={(e) => setFieldData({ ...fieldData, name: e.target.value })}
                placeholder="Enter field name"
                className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-9 sm:h-10 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="relative">
                <select
                  value={fieldData.type}
                  onChange={(e) => {
                    setFieldData({ ...fieldData, type: e.target.value });
                    setError('');
                  }}
                  className={`w-full appearance-none border rounded-[10px] px-3 h-9 sm:h-10 text-xs sm:text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff] ${
                    error ? 'border-red-300' : 'border-[#D5D5D5]'
                  }`}
                >
                  <option value="">Select Type</option>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="money">Money</option>
                  <option value="dependent-dropdown">Dependent Dropdown</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={fieldData.description}
                onChange={(e) => setFieldData({ ...fieldData, description: e.target.value })}
                placeholder="Enter field description"
                rows={3}
                className="w-full border border-[#D5D5D5] rounded-[10px] px-3 py-2 text-xs sm:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none resize-none"
              />
            </div>

            {/* Properties Section */}
            <button
              type="button"
              className="flex items-center gap-1 text-xs sm:text-sm text-[#4880FF] hover:text-[#3a6fcc] font-medium transition-colors mt-2"
            >
              <span>Properties</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors"
            >
              Create Field
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

const FieldsSettingsPage = () => {
  const [primaryFields, setPrimaryFields] = useState([
    { id: '1', name: 'Name', type: 'text', icon: Type, placeholder: 'Enter full name', value: '', visible: true },
    { id: '2', name: 'WhatsApp Number', type: 'phone', icon: Phone, placeholder: '+91 9999999999', value: '', visible: true }
  ]);

  const [otherFields, setOtherFields] = useState([
    { id: '3', name: 'Alternate Number', type: 'phone', icon: Phone, placeholder: '+91 9999999999', value: '', visible: true },
    { id: '4', name: 'Interested Course', type: 'dropdown', icon: ChevronDown, placeholder: 'value1', value: '', visible: true },
    { id: '5', name: 'Student Category', type: 'dropdown', icon: ChevronDown, placeholder: 'value1', value: '', visible: true },
    { id: '6', name: 'Expected Score', type: 'number', icon: Hash, placeholder: '123', value: '', visible: true }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeFieldsOnly, setActiveFieldsOnly] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
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

  const filteredOtherFields = otherFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || field.type === typeFilter;
    const matchesVisibility = !activeFieldsOnly || field.visible;
    return matchesSearch && matchesType && matchesVisibility;
  });

  const handleToggleVisibility = (fieldId) => {
    setOtherFields(prev => prev.map(f => f.id === fieldId ? { ...f, visible: !f.visible } : f));
  };

  const handleDeleteField = (fieldId) => {
    setOtherFields(prev => prev.filter(f => f.id !== fieldId));
  };

  const handleCreateField = (fieldData) => {
    const icons = {
      text: Type,
      email: Mail,
      phone: Phone,
      number: Hash,
      date: Calendar,
      dropdown: ChevronDown
    };
    const newField = {
      id: Date.now().toString(),
      name: fieldData.name,
      type: fieldData.type,
      icon: icons[fieldData.type] || Type,
      placeholder: '',
      value: '',
      visible: true
    };
    setOtherFields(prev => [...prev, newField]);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Fields Settings</h1>
          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
            <RefreshCw className="w-4 h-4 text-[#4880FF]" />
          </button>
        </div>
        <button
          onClick={() => setShowCreateField(true)}
          className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add a new field
        </button>
      </div>

      <div className="space-y-6">
        {/* Lead Id Section */}
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-900">Lead Id</span>
          <button className="text-xs text-[#4880FF] hover:text-[#7e22ce] underline">Learn more</button>
        </div>

        {/* Current Lead Identifier */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[10px] border border-gray-200">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-sm font-medium text-gray-900">WhatsApp Number</div>
              <div className="text-xs text-gray-500">+91 9999999999</div>
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs md:text-sm font-medium text-[#4880FF] hover:bg-[#4880FF]/10 rounded-[10px] transition-colors">
            Change
          </button>
        </div>

        {/* PRIMARY FIELDS (ASSIGN) */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">PRIMARY FIELDS (ASSIGN)</h2>
          </div>
          <div className="space-y-3">
            {primaryFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <PrimaryFieldItem
                  key={field.id}
                  field={field}
                  index={index}
                  icon={Icon}
                  onEdit={() => {}}
                  onReorder={() => {}}
                />
              );
            })}
          </div>
        </div>

        {/* OTHER FIELDS */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">OTHER FIELDS</h2>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-3 h-10 border border-[#D5D5D5] rounded-[10px] text-xs md:text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
              />
            </div>
            <div className="relative" ref={typeDropdownRef}>
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="px-4 py-2 border border-gray-300 rounded-[10px] text-xs md:text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
              >
                <span>Select type</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full mt-1 right-0 w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
                  {['All', 'Checkbox', 'Date', 'Dependent Dropdown', 'Dropdown', 'Email', 'Money', 'Number'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type === 'All' ? 'all' : type.toLowerCase());
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-50 ${
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
            <div className="relative" ref={activeFieldsDropdownRef}>
              <button
                onClick={() => {
                  setShowActiveFieldsDropdown(!showActiveFieldsDropdown);
                  setActiveFieldsOnly(!activeFieldsOnly);
                }}
                className={`px-4 py-2 border rounded-[10px] text-xs md:text-sm flex items-center gap-2 transition-colors ${
                  activeFieldsOnly
                    ? 'border-[#4880FF] bg-[#4880FF]/10 text-[#4880FF]'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                Active Fields
                <ChevronDown className={`w-4 h-4 transition-transform ${showActiveFieldsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showActiveFieldsDropdown && (
                <div className="absolute top-full mt-1 right-0 w-48 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 py-1">
                  <button
                    onClick={() => {
                      setActiveFieldsOnly(true);
                      setShowActiveFieldsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-50 bg-[#4880FF]/10 text-[#4880FF]"
                  >
                    ✓ Active Fields
                  </button>
                  <button
                    onClick={() => {
                      setActiveFieldsOnly(false);
                      setShowActiveFieldsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-gray-700"
                  >
                    All Fields
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-600 mb-3">
            {filteredOtherFields.length} results found
          </div>

          <div className="space-y-3">
            {filteredOtherFields.map((field) => {
              const Icon = field.icon;
              return (
                <OtherFieldItem
                  key={field.id}
                  field={field}
                  icon={Icon}
                  onEdit={() => {}}
                  onDelete={() => handleDeleteField(field.id)}
                  onToggleVisibility={() => handleToggleVisibility(field.id)}
                  isVisible={field.visible}
                />
              );
            })}
          </div>
        </div>
      </div>

      <CreateFieldOffcanvas
        open={showCreateField}
        onClose={() => setShowCreateField(false)}
        onSave={handleCreateField}
      />
    </div>
  );
};

export default FieldsSettingsPage;

