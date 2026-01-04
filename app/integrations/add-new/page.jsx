"use client";

import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, ChevronRight, ChevronDown, Search, Phone, User, Mail, Hash, Plus, Info, Facebook, X, Check, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AddNewIntegrationPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const [formDropdownOpen, setFormDropdownOpen] = useState(false);
  const [pageSearchQuery, setPageSearchQuery] = useState('');
  const [formSearchQuery, setFormSearchQuery] = useState('');
  const [duplicateCheckField, setDuplicateCheckField] = useState('whatsapp');
  const [openMappingDropdown, setOpenMappingDropdown] = useState(null);
  const [openTelecrmDropdown, setOpenTelecrmDropdown] = useState(null);
  const [telecrmSearchQuery, setTelecrmSearchQuery] = useState('');
  const [showInfoBox, setShowInfoBox] = useState(null);
  const [campaignActionDropdown, setCampaignActionDropdown] = useState(false);
  const [campaignAction, setCampaignAction] = useState('create_new');
  const [campaignName, setCampaignName] = useState('visuti-career-counselings-form-created-on-thursday-30-december-2021-0922');
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState(['anshul']);
  const [distributeActiveOnly, setDistributeActiveOnly] = useState(false);
  const [importOption, setImportOption] = useState('select_dates');
  const [importStartDate, setImportStartDate] = useState('');

  const fbFormFields = [
    { id: 'full_name', label: 'Full name', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'phone', label: 'Phone number', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'neet_score', label: 'NEET SCORE', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'fb_ad', label: 'Facebook Ad', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'fb_campaign', label: 'Facebook Campaign', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'fb_lead_id', label: 'Facebook Lead Id', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'fb_adset_id', label: 'Facebook Ad Set Id', mappingAction: 'replace_if_empty', telecrmField: '' },
    { id: 'fb_adset_name', label: 'Facebook Ad Set Name', mappingAction: 'replace_if_empty', telecrmField: '' }
  ];

  const mappingActions = [
    { 
      value: 'replace', 
      label: 'Replace',
      description: 'Replace old value with new value'
    },
    { 
      value: 'replace_if_empty', 
      label: 'Replace if empty',
      description: 'Replace old value with new value if the lead field value is empty'
    }
  ];

  const telecrmFields = [
    { value: 'alternate_number', label: 'Alternate Number', icon: Phone },
    { value: 'assignee', label: 'Assignee', icon: User },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'expected_score', label: 'Expected Score', icon: Hash },
    { value: 'name', label: 'Name', icon: User },
    { value: 'phone', label: 'Phone Number', icon: Phone },
    { value: 'source', label: 'Source', icon: Hash },
    { value: 'campaign', label: 'Campaign', icon: Hash }
  ];

  const [fieldMappings, setFieldMappings] = useState(fbFormFields);

  const filteredTelecrmFields = telecrmFields.filter(field =>
    field.label.toLowerCase().includes(telecrmSearchQuery.toLowerCase())
  );

  const teamMembers = [
    { id: 'tripti', name: 'TRIPTI', role: 'Caller', avatar: 'TR', color: '#E6E6FA' },
    { id: 'visuti', name: 'Visuti Career', role: 'Caller', avatar: '/visuti-avatar.jpg', color: '' },
    { id: 'dinesh', name: 'Dinesh Kumar', role: 'Caller', avatar: 'DK', color: '#E6E6FA' },
    { id: 'sonia', name: 'Sonia Sharma', role: 'Manager', avatar: 'SS', color: '#E6E6FA' },
    { id: 'newtest', name: 'new test', role: 'Marketing User', avatar: 'NT', color: '#E6E6FA' },
    { id: 'anshul', name: 'Anshul', role: 'Root', avatar: '/anshul-avatar.jpg', color: '', isYou: true }
  ];

  const roles = [
    { id: 'all', label: 'All' },
    { id: 'root', label: 'Root' },
    { id: 'admin', label: 'Admin' },
    { id: 'manager', label: 'Manager' },
    { id: 'caller', label: 'Caller' },
    { id: 'marketing_user', label: 'Marketing_user' }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(teamSearchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase().replace(' ', '_') === selectedRole;
    return matchesSearch && matchesRole;
  });

  const fbPages = [
    { id: 'page1', name: 'श्री कृष्ण दुल्हन परिधान', icon: '/page-icon.png' },
    { id: 'page2', name: 'Visuti Career', icon: '/page-icon.png' },
    { id: 'page3', name: 'Visuti Tech', icon: '/page-icon.png' },
    { id: 'page4', name: 'MediSure Life', icon: '/page-icon.png' },
    { id: 'page5', name: 'PBM STUDY', icon: '/page-icon.png' },
    { id: 'page6', name: 'Education Hub', icon: '/page-icon.png' },
    { id: 'page7', name: 'Career Counseling', icon: '/page-icon.png' },
    { id: 'page8', name: 'Tech Solutions', icon: '/page-icon.png' },
    { id: 'page9', name: 'Medical Services', icon: '/page-icon.png' },
    { id: 'page10', name: 'Study Material', icon: '/page-icon.png' },
    { id: 'page11', name: 'Online Classes', icon: '/page-icon.png' },
    { id: 'page12', name: 'Exam Preparation', icon: '/page-icon.png' },
    { id: 'page13', name: 'Coaching Institute', icon: '/page-icon.png' },
    { id: 'page14', name: 'E-Learning Platform', icon: '/page-icon.png' },
    { id: 'page15', name: 'Educational Services', icon: '/page-icon.png' }
  ];

  const leadForms = [
    { id: 'form1', name: "Visuti Career Counseling's form created on Thursday, 30 December 2021 09:22", integrated: false },
    { id: 'form2', name: "Visuti Career Counseling's form created on Wednesday, 29 December 2021 12:44", integrated: false },
    { id: 'form3', name: "Visuti Career Counseling's form created on Wednesday, 29 December 2021 11:27", integrated: false },
    { id: 'form4', name: 'new form 2025', integrated: true, integratedBy: 'Anshul', integratedTime: '10M ago' },
    { id: 'form5', name: 'NEET 2024 Registration', integrated: true, integratedBy: 'Priya', integratedTime: '2D ago' },
    { id: 'form6', name: 'JEE Main Application', integrated: false },
    { id: 'form7', name: 'CAT Preparation Course', integrated: false },
    { id: 'form8', name: 'MBA Entrance Form', integrated: true, integratedBy: 'Rahul', integratedTime: '5D ago' },
    { id: 'form9', name: 'GATE 2024 Form', integrated: false },
    { id: 'form10', name: 'Medical Counseling Form', integrated: false },
    { id: 'form11', name: 'Engineering Admission 2024', integrated: false },
    { id: 'form12', name: 'CA Foundation Registration', integrated: false },
    { id: 'form13', name: 'UPSC Prelims 2024', integrated: true, integratedBy: 'Anshul', integratedTime: '1W ago' },
    { id: 'form14', name: 'Banking PO Exam Form', integrated: false }
  ];

  const filteredPages = fbPages.filter(page =>
    page.name.toLowerCase().includes(pageSearchQuery.toLowerCase())
  );

  const filteredForms = leadForms.filter(form =>
    form.name.toLowerCase().includes(formSearchQuery.toLowerCase())
  );

  const integratedForms = filteredForms.filter(f => f.integrated);
  const nonIntegratedForms = filteredForms.filter(f => !f.integrated);

  const linkedAccounts = [
    {
      id: 1,
      name: 'Anshul Tiwari',
      email: 'anspbm@gmail.com',
      avatar: null
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      avatar: null
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.k@gmail.com',
      avatar: null
    }
  ];

  const steps = [
    { number: 1, title: 'Step 1', subtitle: 'Facebook details' },
    { number: 2, title: 'Step 2', subtitle: 'Map FB questions' },
    { number: 3, title: 'Step 3', subtitle: 'Choose campaign' },
    { number: 4, title: 'Step 4', subtitle: 'Lead distribution' },
    { number: 5, title: 'Step 5', subtitle: 'Import data' },
    { number: 6, title: 'Step 6', subtitle: 'Finish Integration' }
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar - Linked Accounts */}
        <div className="hidden lg:block lg:w-80 bg-white flex-shrink-0 overflow-y-auto border-r border-gray-200">
          <div className="p-6">
            <Link 
              href="/integrations"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Integrations</span>
            </Link>

            <h3 className="text-sm font-semibold text-gray-900 mb-4">Linked Account</h3>
            
            <button 
              className="w-full px-4 py-2.5 text-white rounded-md transition-all font-medium text-sm mb-4" 
              style={{backgroundColor: '#5D5BD0'}} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
            >
              + Add New
            </button>

            <button className="w-full px-4 py-2.5 text-white rounded-md transition-all font-medium text-sm mb-6" style={{backgroundColor: '#5D5BD0'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}>
              Download Marketing Report
            </button>

            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all cursor-pointer mb-2"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-sm font-semibold">
                    {account.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{account.name}</p>
                  <p className="text-xs text-gray-500">
                    Integrated with: <span className="font-medium" style={{color: '#5D5BD0'}}>{account.email}</span>
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Account Info Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-lg font-semibold">
                    {linkedAccounts[0]?.name.split(' ').map(n => n[0]).join('') || 'AT'}
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{linkedAccounts[0]?.name || 'Anshul Tiwari'}</h2>
                  <p className="text-sm text-gray-500">{linkedAccounts[0]?.email || 'anspbm@gmail.com'}</p>
                </div>
              </div>
              <button className="px-5 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-all flex items-center gap-2 font-medium text-sm">
                <ExternalLink className="w-4 h-4" />
                Unlink
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <Link 
              href="/integrations"
              className="flex items-center mb-2 gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">All forms</span>
            </Link>
                {/* Steps Progress Inside Card */}
                <div className="mb-2 pb-8 border-b border-gray-200 overflow-x-auto">
                  <div className="flex items-start justify-between max-w-5xl mx-auto min-w-[640px] sm:min-w-0">
                    {steps.map((step, index) => (
                      <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1 min-w-[80px] sm:min-w-0">
                          <div className="relative">
                            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                              currentStep === step.number 
                                ? 'bg-[#5D5BD0] border-2 border-[#5D5BD0]' 
                                : currentStep > step.number
                                ? 'bg-[#5D5BD0] border-2 border-[#5D5BD0]'
                                : 'bg-white border-2 border-gray-300'
                            }`}>
                              <span className={`font-semibold text-sm sm:text-base ${
                                currentStep >= step.number ? 'text-white' : 'text-gray-400'
                              }`}>
                                {step.number}
                              </span>
                            </div>
                          </div>
                          <div className="mt-1 text-center px-1">
                            <p className={`text-xs sm:text-sm font-semibold ${
                              currentStep === step.number ? 'text-[#5D5BD0]' : 'text-gray-600'
                            }`}>
                              {step.title}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap hidden sm:block">{step.subtitle}</p>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="flex items-center flex-1" style={{maxWidth: '100px', marginTop: '22px'}}>
                            <div className={`w-full border-t-2 border-dashed transition-colors ${
                              currentStep > step.number ? 'border-[#5D5BD0]' : 'border-gray-300'
                            }`}></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {currentStep === 1 && (
                  <>
                    {/* Select FB Page Dropdown */}
                    <div className="mb-3">
                      <label className="block text-base font-semibold text-gray-900 mb-1">
                        Select FB Page
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Select one of the page linked with FB account
                      </p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:border-transparent text-sm text-left flex items-center justify-between bg-white hover:border-gray-400 transition-colors"
                        >
                          {selectedPage ? (
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-gray-600 font-semibold">
                                  {fbPages.find(p => p.id === selectedPage)?.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-gray-900">{fbPages.find(p => p.id === selectedPage)?.name}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">Select Option</span>
                          )}
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${pageDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {pageDropdownOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setPageDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-96 overflow-hidden flex flex-col">
                              <div className="p-3 border-b border-gray-200">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    value={pageSearchQuery}
                                    onChange={(e) => setPageSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0] text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>
                              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                                {filteredPages.length} pages found
                              </div>
                              <div className="overflow-y-auto max-h-64">
                                {filteredPages.map((page) => (
                                  <button
                                    key={page.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedPage(page.id);
                                      setPageDropdownOpen(false);
                                      setPageSearchQuery('');
                                      setSelectedForm('');
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-100 last:border-b-0"
                                  >
                                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs text-gray-600 font-semibold">
                                        {page.name.charAt(0)}
                                      </span>
                                    </div>
                                    <span className="text-sm text-gray-700">{page.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Select Lead Form Dropdown */}
                    <div className="mb-10">
                      <label className="block text-base font-semibold text-gray-900 mb-1">
                        Select Lead Form
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Select one of the lead form published over selected FB Page
                      </p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => selectedPage && setFormDropdownOpen(!formDropdownOpen)}
                          disabled={!selectedPage}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:border-transparent text-sm text-left flex items-center justify-between bg-white disabled:bg-gray-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
                        >
                          <span className={selectedForm ? 'text-gray-900' : 'text-gray-400'}>
                            {selectedForm 
                              ? leadForms.find(f => f.id === selectedForm)?.name 
                              : 'Select Option'}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${formDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {formDropdownOpen && selectedPage && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setFormDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-96 overflow-hidden flex flex-col">
                              <div className="p-3 border-b border-gray-200">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    value={formSearchQuery}
                                    onChange={(e) => setFormSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0] text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>
                              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                                {filteredForms.length} lead forms found
                              </div>
                              <div className="overflow-y-auto max-h-64">
                                {nonIntegratedForms.map((form) => (
                                  <button
                                    key={form.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedForm(form.id);
                                      setFormDropdownOpen(false);
                                      setFormSearchQuery('');
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700 border-b border-gray-100"
                                  >
                                    {form.name}
                                  </button>
                                ))}
                                
                                {integratedForms.length > 0 && (
                                  <>
                                    <div className="px-4 py-2.5 text-center bg-gray-50 border-y border-gray-200">
                                      <span className="text-xs text-gray-500 font-medium">Integrated forms</span>
                                    </div>
                                    {integratedForms.map((form) => (
                                      <div
                                        key={form.id}
                                        className="w-full px-4 py-3 text-left bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                                      >
                                        <div className="flex-1">
                                          <p className="text-sm text-gray-700">{form.name}</p>
                                          <p className="text-xs text-gray-400 mt-1">
                                            Integrated by {form.integratedBy} {form.integratedTime}
                                          </p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" />
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNext}
                        disabled={!selectedPage || !selectedForm}
                        className="px-8 py-2.5 rounded-lg transition-all font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                        style={{
                          backgroundColor: (!selectedPage || !selectedForm) ? '#A5B4FC' : '#5D5BD0',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedPage && selectedForm) {
                            e.currentTarget.style.backgroundColor = '#4a48a8';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedPage && selectedForm) {
                            e.currentTarget.style.backgroundColor = '#5D5BD0';
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="mb-8">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">MAP YOUR DATA</h2>
                      
                      {/* Mapping Table */}
                      <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 sm:px-6 lg:px-0">
                          <div className="space-y-4" style={{minWidth: '768px'}}>
                        {/* Header */}
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 mb-2">
                          <div className="col-span-4">
                            <div className="flex items-center gap-2">
                              <Facebook className="w-4 h-4 text-[#1877F2]" />
                              <span className="text-xs sm:text-sm font-medium text-gray-900">FB Form Question</span>
                            </div>
                          </div>
                          <div className="col-span-7">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-[#5D5BD0] rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-900">TELECRM FIELD</span>
                            </div>
                          </div>
                          <div className="col-span-1"></div>
                        </div>

                        {/* Fields */}
                        {fieldMappings.map((field, index) => (
                          <React.Fragment key={index}>
                          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                            {/* FB Form Question */}
                            <div className="col-span-3">
                              <div className="px-2 sm:px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-xs sm:text-sm text-gray-700">{field.label}</p>
                              </div>
                            </div>

                            {/* Mapping Action & Telecrm Field Container */}
                            <div className="col-span-8 grid grid-cols-2 gap-4">
                              {/* Mapping Action Dropdown */}
                              <div className="relative">
                              <button
                                type="button"
                                onClick={() => setOpenMappingDropdown(openMappingDropdown === index ? null : index)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0] text-sm text-gray-700 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-all"
                              >
                                <span>{mappingActions.find(a => a.value === field.mappingAction)?.label || 'Replace if empty'}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openMappingDropdown === index ? 'rotate-180' : ''}`} />
                              </button>

                              {openMappingDropdown === index && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setOpenMappingDropdown(null)}
                                  />
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                                    {mappingActions.map((action) => (
                                      <button
                                        key={action.value}
                                        type="button"
                                        onClick={() => {
                                          const newMappings = [...fieldMappings];
                                          newMappings[index].mappingAction = action.value;
                                          setFieldMappings(newMappings);
                                          setOpenMappingDropdown(null);
                                        }}
                                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-all duration-150 border-b last:border-b-0 ${
                                          field.mappingAction === action.value ? 'bg-purple-50' : ''
                                        }`}
                                      >
                                        <p className="text-sm font-medium text-gray-900">{action.label}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Telecrm Field */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setOpenTelecrmDropdown(openTelecrmDropdown === index ? null : index)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0] text-sm bg-white text-left flex items-center gap-2 hover:border-gray-400 transition-all"
                              >
                                {field.telecrmField && telecrmFields.find(f => f.value === field.telecrmField)?.icon && (
                                  React.createElement(telecrmFields.find(f => f.value === field.telecrmField).icon, {
                                    className: "w-4 h-4 text-gray-500 flex-shrink-0"
                                  })
                                )}
                                <span className={`flex-1 ${field.telecrmField ? 'text-gray-700' : 'text-gray-400'}`}>
                                  {field.telecrmField 
                                    ? telecrmFields.find(f => f.value === field.telecrmField)?.label 
                                    : '[ Select Telecrm Field To Map ]'}
                                </span>
                                <div className="flex items-center gap-1">
                                  {field.telecrmField && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const newMappings = [...fieldMappings];
                                        newMappings[index].telecrmField = '';
                                        setFieldMappings(newMappings);
                                      }}
                                      className="hover:bg-gray-100 rounded p-0.5 transition-colors"
                                    >
                                      <X className="w-3.5 h-3.5 text-gray-500" />
                                    </button>
                                  )}
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openTelecrmDropdown === index ? 'rotate-180' : ''}`} />
                                </div>
                              </button>

                              {openTelecrmDropdown === index && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => {
                                      setOpenTelecrmDropdown(null);
                                      setTelecrmSearchQuery('');
                                    }}
                                  />
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-80 overflow-hidden flex flex-col">
                                    {/* Search */}
                                    <div className="p-3 border-b border-gray-200">
                                      <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                          type="text"
                                          placeholder="Search Lead Fields to map"
                                          value={telecrmSearchQuery}
                                          onChange={(e) => setTelecrmSearchQuery(e.target.value)}
                                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5D5BD0] text-sm"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </div>
                                    </div>

                                    {/* Options */}
                                    <div className="overflow-y-auto max-h-64">
                                      {filteredTelecrmFields.map((telecrmField) => {
                                        const Icon = telecrmField.icon;
                                        return (
                                          <button
                                            key={telecrmField.value}
                                            type="button"
                                            onClick={() => {
                                              const newMappings = [...fieldMappings];
                                              newMappings[index].telecrmField = telecrmField.value;
                                              setFieldMappings(newMappings);
                                              setOpenTelecrmDropdown(null);
                                              setTelecrmSearchQuery('');
                                            }}
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-all duration-150 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                                          >
                                            <Icon className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{telecrmField.label}</span>
                                          </button>
                                        );
                                      })}

                                      {/* Add Custom Field */}
                                      <button
                                        type="button"
                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-all duration-150 flex items-center gap-2 border-t border-gray-200"
                                      >
                                        <Plus className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">Add a Custom Field</span>
                                        <span className="ml-auto text-xs text-[#5D5BD0] underline">How to add?</span>
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            </div>

                            {/* Info/Check Icon */}
                            <div className="col-span-1 flex justify-center">
                              {field.telecrmField ? (
                                <button 
                                  onClick={() => setShowInfoBox(showInfoBox === index ? null : index)}
                                  className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setShowInfoBox(showInfoBox === index ? null : index)}
                                  className="w-6 h-6 rounded-full border-2 border-[#1877F2] flex items-center justify-center hover:bg-blue-50 transition-colors"
                                >
                                  <Info className="w-3.5 h-3.5 text-[#1877F2]" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {/* Info Message Box */}
                          {showInfoBox === index && (
                            <div className="col-span-12 -mt-2 mb-2">
                              {field.telecrmField ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="text-sm font-semibold text-green-900">Column mapped successfully</h4>
                                      <p className="text-sm text-green-700 mt-0.5">
                                        fb named '{field.label}' has been mapped to '{telecrmFields.find(f => f.value === field.telecrmField)?.label}' lead field.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                  <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="text-sm font-semibold text-blue-900">No lead field mapped</h4>
                                      <p className="text-sm text-blue-700 mt-0.5">
                                        No lead field is mapped to '{field.label}' fb mappedColumnInfo.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          </React.Fragment>
                        ))}
                      </div>
                      </div>
                      </div>

                      {/* Check Duplicates Section */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">Check duplicates on</h3>
                            <p className="text-xs text-gray-400 mt-1">This will help to prevent duplicate lead creation</p>
                          </div>
                          <div className="w-64">
                            <select
                              value={duplicateCheckField}
                              onChange={(e) => setDuplicateCheckField(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] text-sm text-[#5D5BD0] bg-white"
                            >
                              <option value="whatsapp">WhatsApp Number</option>
                              <option value="phone">Phone Number</option>
                              <option value="email">Email</option>
                              <option value="lead_id">Lead ID</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-8 py-2.5 rounded-lg transition-all font-medium text-sm shadow-sm"
                        style={{backgroundColor: '#5D5BD0', color: 'white'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className="mb-8">
                      {/* Header with Dropdown */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Choose campaign action</h2>
                          <p className="text-sm text-gray-500">This will help you to manage all your leads collectively and easily</p>
                        </div>
                        <div className="relative w-full sm:w-auto">
                          <button
                            onClick={() => setCampaignActionDropdown(!campaignActionDropdown)}
                            className="w-full sm:w-auto px-4 py-2 border border-[#5D5BD0] text-[#5D5BD0] rounded-lg hover:bg-purple-50 transition-all font-medium text-sm flex items-center justify-between gap-2"
                          >
                            Create new campaign
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${campaignActionDropdown ? 'rotate-180' : ''}`} />
                          </button>

                          {campaignActionDropdown && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setCampaignActionDropdown(false)}
                              />
                              <div className="absolute top-full right-0 mt-2 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                                <button
                                  onClick={() => {
                                    setCampaignAction('use_existing');
                                    setCampaignActionDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all border-b border-gray-100"
                                >
                                  <p className="text-sm font-medium text-gray-900">Use existing campaign</p>
                                  <p className="text-xs text-gray-500 mt-0.5">Leads will be added to existing campaign</p>
                                </button>
                                <button
                                  onClick={() => {
                                    setCampaignAction('create_new');
                                    setCampaignActionDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all border-b border-gray-100"
                                >
                                  <p className="text-sm font-medium text-gray-900">Create new campaign</p>
                                  <p className="text-xs text-gray-500 mt-0.5">New campaign will be created</p>
                                </button>
                                <button
                                  onClick={() => {
                                    setCampaignAction('dont_create');
                                    setCampaignActionDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all"
                                >
                                  <p className="text-sm font-medium text-gray-900">Don't create campaign</p>
                                  <p className="text-xs text-gray-500 mt-0.5">No new campaign will be created</p>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Campaign Name Input */}
                      {campaignAction === 'create_new' && (
                        <div>
                          <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-500 mb-1">CREATE CAMPAIGN WITH THIS BATCH</h3>
                            <label className="text-xs font-medium text-gray-500 mb-2 block">CAMPAIGN NAME</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                maxLength={70}
                                className="w-full px-4 py-2.5 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-400 text-sm pr-20"
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium text-red-500">-{campaignName.length - 70}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-8 py-2.5 rounded-lg transition-all font-medium text-sm shadow-sm"
                        style={{backgroundColor: '#5D5BD0', color: 'white'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <div className="mb-8">
                      <div className="mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Lead Distribution</h2>
                        <p className="text-sm text-gray-500">This will help you to distribute all your leads collectively and easily</p>
                      </div>

                      {/* Team Members Selection */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                        {/* Search */}
                        <div className="mb-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D5BD0]" />
                            <input
                              type="text"
                              placeholder="Search team member"
                              value={teamSearchQuery}
                              onChange={(e) => setTeamSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-purple-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] text-sm"
                            />
                          </div>
                        </div>

                        {/* Role Filters */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {roles.map(role => (
                            <button
                              key={role.id}
                              onClick={() => setSelectedRole(role.id)}
                              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                selectedRole === role.id
                                  ? 'bg-purple-100 text-[#5D5BD0] border border-[#5D5BD0]'
                                  : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200'
                              }`}
                            >
                              {role.label}
                            </button>
                          ))}
                        </div>

                        {/* Selected Count */}
                        <div className="text-sm text-gray-600 mb-3">
                          {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                        </div>

                        {/* Team Members List */}
                        <div className="max-h-80 overflow-y-auto space-y-2">
                          {filteredMembers.map(member => (
                            <div
                              key={member.id}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                              onClick={() => {
                                if (selectedMembers.includes(member.id)) {
                                  setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                                } else {
                                  setSelectedMembers([...selectedMembers, member.id]);
                                }
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedMembers.includes(member.id)}
                                onChange={() => {}}
                                className="w-4 h-4 text-[#5D5BD0] bg-gray-100 border-gray-300 rounded focus:ring-[#5D5BD0] focus:ring-2"
                              />
                              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: member.color || '#f0f0f0' }}>
                                {member.avatar.startsWith('/') ? (
                                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                    {member.name.charAt(0)}
                                  </div>
                                ) : (
                                  <span className="text-sm font-semibold text-[#5D5BD0]">{member.avatar}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                  {member.isYou && <span className="text-xs text-gray-400">(You)</span>}
                                </div>
                                <p className="text-xs text-gray-500">{member.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Distribute Option and Button */}
                        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={distributeActiveOnly}
                              onChange={(e) => setDistributeActiveOnly(e.target.checked)}
                              className="w-4 h-4 text-[#5D5BD0] bg-gray-100 border-gray-300 rounded focus:ring-[#5D5BD0] focus:ring-2"
                            />
                            <span className="text-sm text-gray-700">Distribute leads among selected active users only</span>
                            <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          </label>

                          {/* Distribute Button */}
                          <button
                            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-all"
                            style={{backgroundColor: '#5D5BD0'}}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                          >
                            Distribute leads
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-8 py-2.5 rounded-lg transition-all font-medium text-sm shadow-sm"
                        style={{backgroundColor: '#5D5BD0', color: 'white'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 5 && (
                  <>
                    <div className="mb-8">
                      <div className="mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Import Leads</h2>
                        <p className="text-sm text-gray-500">Select the dates to import leads</p>
                      </div>

                      {/* Import Options */}
                      <div className="space-y-4">
                        {/* All Leads Option */}
                        <div>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="importOption"
                              checked={importOption === 'all_leads'}
                              onChange={() => setImportOption('all_leads')}
                              className="mt-1 w-4 h-4 text-[#5D5BD0] border-gray-300 focus:ring-[#5D5BD0]"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">All Leads</p>
                              <p className="text-sm text-gray-400">All Leads will be imported</p>
                            </div>
                          </label>
                        </div>

                        {/* Select Dates Option */}
                        <div>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="importOption"
                              checked={importOption === 'select_dates'}
                              onChange={() => setImportOption('select_dates')}
                              className="mt-1 w-4 h-4 text-[#5D5BD0] border-gray-300 focus:ring-[#5D5BD0]"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Select Dates</p>
                              <p className="text-sm text-gray-400 mb-4">Leads will be imported falling within the selected range of dates</p>
                              
                              {importOption === 'select_dates' && (
                                <div className="mt-4">
                                  <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                      <label className="text-sm text-gray-700 mb-2 block">
                                        Select the starting date from which you would like to import your leads.
                                      </label>
                                      <div className="relative">
                                        <input
                                          type="date"
                                          value={importStartDate}
                                          onChange={(e) => setImportStartDate(e.target.value)}
                                          placeholder="DD/MM/YYYY"
                                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] text-sm pr-10"
                                        />
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-8 py-2.5 rounded-lg transition-all font-medium text-sm shadow-sm"
                        style={{backgroundColor: '#5D5BD0', color: 'white'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 6 && (
                  <>
                    <div className="mb-8">
                      {/* Success Message */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-700">
                          Your lead form <span className="font-semibold text-gray-900">Visuti Career Counseling's form created on Thursday, 30 December 2021 09:22</span> has been integrated.
                        </p>
                      </div>

                      {/* Instructions */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-700 mb-4">Follow the enlisted instructions to ensure the lead capturing</p>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
                          <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>
                                Go to{' '}
                                <a 
                                  href="https://business.facebook.com" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[#5D5BD0] underline inline-flex items-center gap-1 hover:text-[#4a48a8]"
                                >
                                  Meta Business Suite
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Click the drop-down in the top left-hand corner and choose your business account.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Click Settings in the bottom left-hand corner.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Click More business settings.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Click Integrations in the left menu, then click Leads access.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Click Assign CRMs. You'll see a list of CRM systems that have been integrated with your Facebook Page.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gray-900 mt-0.5">•</span>
                              <span>Tick the circle next to the Telecrm and then click Assign.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* View Leads Button */}
                      <div className="flex justify-center">
                        <button
                          className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm text-white transition-all"
                          style={{backgroundColor: '#5D5BD0'}}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a48a8'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5D5BD0'}
                        >
                          <span className="hidden sm:inline">View Visuti Career Counseling's form created on Thursday, 30 December 2021 09:22 Leads</span>
                          <span className="sm:hidden">View Leads</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewIntegrationPage;
