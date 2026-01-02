"use client";

import React, { useState, useRef } from 'react';
import { X, Megaphone, ChevronDown } from 'lucide-react';
import ConditionDropdown from './components/ConditionDropdown';
import TemplateSelectionModal from './components/TemplateSelectionModal';
import MultiSelectDropdown from './components/MultiSelectDropdown';

const CreateBroadcastOffcanvas = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [broadcastName, setBroadcastName] = useState('Whatsapp broadcast');
  const [isAddConditionModalOpen, setIsAddConditionModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedNumberFields, setSelectedNumberFields] = useState(['WhatsApp Number']);
  const [isNumberFieldDropdownOpen, setIsNumberFieldDropdownOpen] = useState(false);
  const [autoRetry, setAutoRetry] = useState(false);
  const addConditionButtonRef = useRef(null);
  const [conditions, setConditions] = useState([
    { id: 1, field: 'Batch', operator: 'is', value: [], selectedValues: [] }
  ]);

  const steps = [
    { number: 1, label: 'Select leads', active: true },
    { number: 2, label: 'Select template', active: false },
    { number: 3, label: 'Confirmation', active: false }
  ];

  const addCondition = () => {
    setIsAddConditionModalOpen(true);
  };

  const handleSelectCondition = (condition) => {
    setConditions([...conditions, { 
      id: conditions.length + 1, 
      field: condition.label, 
      operator: 'is', 
      value: '',
      selectedValues: []
    }]);
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(3);
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Offcanvas */}
      <div 
        className="fixed top-0 right-0 h-full w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out flex flex-col"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#5D5BD0]/10 flex items-center justify-center">
              <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5D5BD0]" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Create Broadcast</h2>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 border-b border-gray-50 flex-shrink-0 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="flex items-center justify-between relative max-w-[280px] sm:max-w-sm mx-auto">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-2.5 sm:top-3.5 h-[2px] bg-gray-200 -z-10">
              <div 
                className="h-full bg-[#5D5BD0] transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-semibold text-[10px] sm:text-xs transition-all duration-300 ease-out ${
                    currentStep >= step.number
                      ? 'bg-[#5D5BD0] text-white shadow-md shadow-[#5D5BD0]/25 scale-105'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {step.number}
                </div>
                <span 
                  className={`text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 font-medium transition-all duration-300 text-center ${
                    currentStep >= step.number ? 'text-[#5D5BD0]' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 py-3 sm:py-4">
          {currentStep === 1 && (
            <div className="space-y-3 sm:space-y-4">
              {/* Broadcast Name */}
              <div className="bg-white border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2">
                <p className="text-xs sm:text-sm text-gray-900 font-medium">{broadcastName}</p>
              </div>

              {/* Add Condition Button */}
              <div className="relative">
                <button
                  ref={addConditionButtonRef}
                  onClick={addCondition}
                  className="text-[#5D5BD0] text-[11px] sm:text-xs font-semibold hover:text-[#4a4ab8] transition-all duration-200 flex items-center gap-1 hover:gap-1.5"
                >
                  + Add a Condition
                </button>

                {/* Dropdown */}
                <ConditionDropdown 
                  isOpen={isAddConditionModalOpen}
                  onClose={() => setIsAddConditionModalOpen(false)}
                  onSelectCondition={handleSelectCondition}
                  triggerRef={addConditionButtonRef}
                />
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                {conditions.map((condition, index) => (
                  <div 
                    key={condition.id} 
                    className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-lg p-2.5 sm:p-3 border border-purple-100 hover:border-purple-200 transition-all duration-200"
                  >
                    {/* First Row - Field, Operator, Multi-Select */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      {/* Field Dropdown */}
                      <div className="flex-1">
                        <select 
                          className="w-full px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white border border-gray-200 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0] appearance-none pr-5 sm:pr-6 transition-all duration-200 hover:border-gray-300"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.3rem center',
                            backgroundSize: '0.875rem'
                          }}
                        >
                          <option>📋 Batch</option>
                          <option>👤 User</option>
                          <option>📊 Status</option>
                          <option>🏷️ Tag</option>
                        </select>
                      </div>

                      {/* Operator Dropdown */}
                      <div className="flex-shrink-0">
                        <select className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white border border-gray-200 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#5D5BD0]/20 focus:border-[#5D5BD0] transition-all duration-200 hover:border-gray-300">
                          <option>is</option>
                          <option>is not</option>
                          <option>contains</option>
                        </select>
                      </div>

                      {/* Value Multi-Select Dropdown */}
                      <div className="flex-1">
                        <MultiSelectDropdown
                          selectedValues={condition.selectedValues || []}
                          onChange={(newValues) => {
                            const updatedConditions = conditions.map(c =>
                              c.id === condition.id
                                ? { ...c, selectedValues: newValues }
                                : c
                            );
                            setConditions(updatedConditions);
                          }}
                          placeholder="Options"
                        />
                      </div>

                      {/* Remove Button */}
                      {conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(condition.id)}
                          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md bg-purple-100 hover:bg-purple-200 transition-all duration-200 hover:scale-105"
                        >
                          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600" />
                        </button>
                      )}
                    </div>

                    {/* Second Row - Selected Values Display */}
                    {condition.selectedValues && condition.selectedValues.length > 0 && (
                      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap pl-1.5 sm:pl-2">
                        {condition.selectedValues.slice(0, 3).map((value, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-[#5D5BD0] text-white text-[9px] sm:text-[10px] font-medium rounded"
                          >
                            {value}
                          </span>
                        ))}
                        {condition.selectedValues.length > 3 && (
                          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 bg-[#5D5BD0] text-white text-[9px] sm:text-[10px] font-medium rounded">
                            +{condition.selectedValues.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Lead Count Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-lg p-2.5 sm:p-3 md:p-3.5 border border-blue-100 hover:border-blue-200 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Total Leads Matched</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">Based on current conditions</p>
                  </div>
                  <div className="text-2xl font-bold text-[#5D5BD0] transition-all duration-300">3004</div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <TemplateSelectionModal
              isOpen={currentStep === 2}
              onClose={onClose}
              onSelectTemplate={handleSelectTemplate}
            />
          )}

          {currentStep === 3 && (
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5 md:space-y-6">
              {/* Number Fields Section */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Number Fields</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">Fields where bulk broadcast is to be sent</p>
                
                <div className="relative">
                  <button
                    onClick={() => setIsNumberFieldDropdownOpen(!isNumberFieldDropdownOpen)}
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 transition-all duration-200 text-[11px] sm:text-xs"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">
                        {selectedNumberFields.length > 0 ? selectedNumberFields.join(', ') : 'Select fields'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isNumberFieldDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options */}
                  {isNumberFieldDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                      <button
                        onClick={() => {
                          setSelectedNumberFields(
                            selectedNumberFields.includes('Alternate Number')
                              ? selectedNumberFields.filter(f => f !== 'Alternate Number')
                              : [...selectedNumberFields, 'Alternate Number']
                          );
                        }}
                        className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                          selectedNumberFields.includes('Alternate Number') 
                            ? 'bg-[#5D5BD0] border-[#5D5BD0]' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {selectedNumberFields.includes('Alternate Number') && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">Alternate Number</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedNumberFields(
                            selectedNumberFields.includes('WhatsApp Number')
                              ? selectedNumberFields.filter(f => f !== 'WhatsApp Number')
                              : [...selectedNumberFields, 'WhatsApp Number']
                          );
                        }}
                        className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                          selectedNumberFields.includes('WhatsApp Number') 
                            ? 'bg-[#5D5BD0] border-[#5D5BD0]' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {selectedNumberFields.includes('WhatsApp Number') && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">WhatsApp Number</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Auto Retry Section */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Auto Retry</h3>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] sm:text-xs text-gray-600">Should retry automatically if there is an error</p>
                  <button
                    onClick={() => setAutoRetry(!autoRetry)}
                    className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
                      autoRetry ? 'bg-[#5D5BD0]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        autoRetry ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Hide when template modal is open (step 2) */}
        {currentStep !== 2 && (
          <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 border-t border-gray-100 flex items-center justify-between flex-shrink-0 bg-white">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <div className="flex gap-1.5 sm:gap-2">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#5D5BD0] to-[#6B6BE0] rounded-lg hover:from-[#4a4ab8] hover:to-[#5555c8] transition-all duration-200 shadow-md shadow-[#5D5BD0]/25"
                >
                  {currentStep === 1 ? 'Next' : 'Send broadcast'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    console.log('Broadcast created!');
                    onClose();
                  }}
                  className="px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#5D5BD0] to-[#6B6BE0] rounded-lg hover:from-[#4a4ab8] hover:to-[#5555c8] transition-all duration-200 shadow-md shadow-[#5D5BD0]/25"
                >
                  Send broadcast
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateBroadcastOffcanvas;
