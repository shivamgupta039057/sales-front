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
  GripVertical
} from 'lucide-react';

const FieldItem = ({ field, icon: Icon, onEdit, onToggleVisibility, isVisible = true }) => {
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
          onClick={onToggleVisibility}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          title={isVisible ? "Hide" : "Show"}
        >
          {isVisible ? (
            <EyeOff className="w-4 h-4 text-gray-600" />
          ) : (
            <Eye className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

const CreateFieldModal = ({ open, onClose, onSave }) => {
  const [fieldData, setFieldData] = useState({
    name: '',
    type: '',
    description: ''
  });
  const [showProperties, setShowProperties] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setFieldData({ name: '', type: '', description: '' });
      setError('');
      setShowProperties(false);
    }
  }, [open]);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[10px] shadow-2xl border border-gray-200 z-10">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Create Field</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={fieldData.name}
              onChange={(e) => setFieldData({ ...fieldData, name: e.target.value })}
              placeholder="Enter field name"
              className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="relative">
              <select
                value={fieldData.type}
                onChange={(e) => {
                  setFieldData({ ...fieldData, type: e.target.value });
                  setError('');
                }}
                className={`w-full appearance-none border rounded-[10px] px-3 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff] ${
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={fieldData.description}
              onChange={(e) => setFieldData({ ...fieldData, description: e.target.value })}
              placeholder="Enter field description"
              rows={3}
              className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={() => setShowProperties(!showProperties)}
            className="flex items-center gap-2 text-sm text-[#4880FF] hover:text-[#7e22ce] font-medium"
          >
            <span>Properties</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showProperties ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors"
          >
            Create Field
          </button>
        </div>
      </div>
    </div>
  );
};

const AddSingleLeadModal = ({ open, onClose }) => {
  const [primaryFields, setPrimaryFields] = useState([
    { id: '1', name: 'Name', type: 'text', icon: Type, placeholder: 'Enter full name', value: '', visible: true },
    { id: '2', name: 'WhatsApp Number', type: 'phone', icon: Phone, placeholder: '+91 9999999999', value: '', visible: true }
  ]);

  const [otherFields, setOtherFields] = useState([
    { id: '3', name: 'ID', type: 'text', icon: Type, placeholder: 'Text field value', value: '', visible: true },
    { id: '4', name: 'Email', type: 'email', icon: Mail, placeholder: 'abc@xyz.com', value: '', visible: true },
    { id: '5', name: 'Alternate Number', type: 'phone', icon: Phone, placeholder: '+91 9999999999', value: '', visible: true },
    { id: '6', name: 'Interested Course', type: 'dropdown', icon: ChevronDown, placeholder: 'value1', value: '', visible: true },
    { id: '7', name: 'Student Category', type: 'dropdown', icon: ChevronDown, placeholder: 'value1', value: '', visible: true },
    { id: '8', name: 'Expected Score', type: 'number', icon: Hash, placeholder: '123', value: '', visible: true }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeFieldsOnly, setActiveFieldsOnly] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const typeDropdownRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setTypeFilter('all');
      setActiveFieldsOnly(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const filteredOtherFields = otherFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || field.type === typeFilter;
    const matchesVisibility = !activeFieldsOnly || field.visible;
    return matchesSearch && matchesType && matchesVisibility;
  });

  const handleFieldValueChange = (fieldId, value, isPrimary = false) => {
    if (isPrimary) {
      setPrimaryFields(prev => prev.map(f => f.id === fieldId ? { ...f, value } : f));
    } else {
      setOtherFields(prev => prev.map(f => f.id === fieldId ? { ...f, value } : f));
    }
  };

  const handleToggleVisibility = (fieldId, isPrimary = false) => {
    if (isPrimary) {
      setPrimaryFields(prev => prev.map(f => f.id === fieldId ? { ...f, visible: !f.visible } : f));
    } else {
      setOtherFields(prev => prev.map(f => f.id === fieldId ? { ...f, visible: !f.visible } : f));
    }
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

  const handleSaveLead = () => {
    const leadData = {
      primary: primaryFields.filter(f => f.visible).map(f => ({ [f.name]: f.value })),
      other: otherFields.filter(f => f.visible).map(f => ({ [f.name]: f.value }))
    };
    console.log('Lead data:', leadData);
    // TODO: Save lead data
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[10px] shadow-2xl border border-gray-200 z-10 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">Fields Settings</h2>
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <RefreshCw className="w-4 h-4 text-[#4880FF]" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateField(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add a new field
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-[10px] hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
              <button className="px-3 py-1.5 text-sm font-medium text-[#4880FF] hover:bg-[#4880FF]/10 rounded-[10px] transition-colors">
                Change
              </button>
            </div>

            {/* PRIMARY FIELDS (ASSIGN) */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">PRIMARY FIELDS (ASSIGN)</h3>
              </div>
              <div className="space-y-3">
                {primaryFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.id} className="flex items-center gap-3 p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-50 border border-gray-200">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <label className="text-sm font-medium text-gray-900">{field.name}</label>
                        </div>
                        <input
                          type={field.type === 'phone' ? 'tel' : field.type}
                          value={field.value}
                          onChange={(e) => handleFieldValueChange(field.id, e.target.value, true)}
                          placeholder={field.placeholder}
                          className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleToggleVisibility(field.id, true)}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title={field.visible ? "Hide" : "Show"}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OTHER FIELDS */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">OTHER FIELDS</h3>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-3 h-10 border border-[#D5D5D5] rounded-[10px] text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
                  />
                </div>
                <div className="relative" ref={typeDropdownRef}>
                  <button
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    className="px-4 py-2 border border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
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
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
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
                <button
                  onClick={() => setActiveFieldsOnly(!activeFieldsOnly)}
                  className="px-4 py-2 border border-gray-300 rounded-[10px] text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Active Fields
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-gray-600 mb-3">
                {filteredOtherFields.length} results found
              </div>

              <div className="space-y-3">
                {filteredOtherFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.id} className="flex items-center gap-3 p-3 bg-white rounded-[10px] border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 cursor-move">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-50 border border-gray-200">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <label className="text-sm font-medium text-gray-900">{field.name}</label>
                        </div>
                        {field.type === 'dropdown' ? (
                          <div className="relative">
                            <select
                              value={field.value}
                              onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                              className="w-full appearance-none border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] focus:outline-none bg-[#f5f9ff]"
                            >
                              <option value="">Select {field.name}</option>
                              <option value="value1">value1</option>
                              <option value="value2">value2</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        ) : (
                          <input
                            type={field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : field.type}
                            value={field.value}
                            onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleToggleVisibility(field.id)}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title={field.visible ? "Hide" : "Show"}
                        >
                          {field.visible ? (
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveLead}
              className="px-6 py-2 text-sm font-medium text-white bg-[#4880FF] rounded-[10px]  transition-colors"
            >
              Save Lead
            </button>
          </div>
        </div>
      </div>

      <CreateFieldModal
        open={showCreateField}
        onClose={() => setShowCreateField(false)}
        onSave={handleCreateField}
      />
    </>
  );
};

export default AddSingleLeadModal;

