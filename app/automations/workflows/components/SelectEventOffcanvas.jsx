'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, ChevronDown, ChevronRight, MessageSquare, Facebook, FileText, Settings, Phone, Hash, Calendar, Mail, CheckSquare, Type, ArrowDownLeft, ArrowUpRight, PhoneMissed, Radio, DollarSign, Circle } from 'lucide-react';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    aria-hidden="true"
  />
);

const SelectEventOffcanvas = ({ open, onClose, onNext }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    whatsapp: true,
    leadFieldChange: true,
    facebook: false,
    callActivities: false,
    paymentActivities: false
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Prevent body scroll when offcanvas is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setSelectedEvent(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getFieldIcon = (fieldType) => {
    switch (fieldType) {
      case 'phone':
        return <Phone className="w-4 h-4 text-gray-600" />;
      case 'checkbox':
        return <CheckSquare className="w-4 h-4 text-gray-600" />;
      case 'hashtag':
        return <Hash className="w-4 h-4 text-gray-600" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-gray-600" />;
      case 'email':
        return <Mail className="w-4 h-4 text-gray-600" />;
      case 'text':
      default:
        return <Type className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventIcon = (iconType, color = 'text-gray-600') => {
    if (typeof iconType === 'string') {
      switch (iconType) {
        case 'phone-incoming':
          return (
            <div className="relative">
              <Phone className={`w-4 h-4 ${color}`} />
              <ArrowDownLeft className="w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5 text-green-600 bg-white rounded-full" />
            </div>
          );
        case 'phone-outgoing':
          return (
            <div className="relative">
              <Phone className={`w-4 h-4 ${color}`} />
              <ArrowUpRight className="w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5 text-green-600 bg-white rounded-full" />
            </div>
          );
        case 'phone-missed':
          return <PhoneMissed className={`w-4 h-4 ${color}`} />;
        case 'phone-recording':
          return (
            <div className="relative">
              <Phone className={`w-4 h-4 ${color}`} />
              <Circle className="w-2 h-2 absolute -top-0.5 -right-0.5 fill-red-600 text-red-600" />
            </div>
          );
        case 'rupee':
          return (
            <span className={`text-sm font-semibold ${color}`}>₹</span>
          );
        default:
          return <Phone className={`w-4 h-4 ${color}`} />;
      }
    }
    return null;
  };

  const eventCategories = [
    {
      id: 'whatsapp',
      label: 'Whatsapp',
      icon: MessageSquare,
      color: 'text-green-600',
      events: [
        { id: 'whatsapp-lead', label: 'On WhatsApp lead', icon: MessageSquare, color: 'text-green-600' },
        { id: 'whatsapp-received', label: 'On WhatsApp received', icon: MessageSquare, color: 'text-green-600' },
        { id: 'template-replied', label: 'On template replied', icon: MessageSquare, color: 'text-green-600', hasSubmenu: true }
      ]
    },
    {
      id: 'leadFieldChange',
      label: 'On Lead Field Change',
      icon: Settings,
      color: 'text-gray-600',
      events: [
        { id: 't-name', label: 'T Name', icon: 'text', fieldType: 'text' },
        { id: 'whatsapp-number', label: 'WhatsApp Number', icon: 'phone', fieldType: 'phone' },
        { id: 'alternate-number', label: 'Alternate Number', icon: 'phone', fieldType: 'phone' },
        { id: 'interested-course', label: 'Interested Course', icon: 'checkbox', fieldType: 'checkbox', isDraft: true },
        { id: 'student-category', label: 'Student Category', icon: 'checkbox', fieldType: 'checkbox', isDraft: true },
        { id: 'expected-score', label: '# Expected Score', icon: 'hashtag', fieldType: 'hashtag' },
        { id: 't-city', label: 'T City', icon: 'text', fieldType: 'text' },
        { id: 'state', label: 'State', icon: 'checkbox', fieldType: 'checkbox', isDraft: true },
        { id: 'special-comment', label: 'T Special Comment', icon: 'text', fieldType: 'text' },
        { id: 'neet-attempts', label: 'How Many attempt in NEET', icon: 'checkbox', fieldType: 'checkbox', isDraft: true },
        { id: 'interested-date', label: 'Interested Date', icon: 'calendar', fieldType: 'calendar' },
        { id: 'email', label: 'Email', icon: 'email', fieldType: 'email' },
        { id: 't-test', label: 'T test', icon: 'text', fieldType: 'text' }
      ]
    },
    {
      id: 'facebook',
      label: 'On Facebook lead',
      icon: Facebook,
      color: 'text-blue-600',
      events: [
        { id: 'facebook-lead', label: 'On Facebook lead', icon: Facebook, color: 'text-blue-600' }
      ]
    },
    {
      id: 'callActivities',
      label: 'Call activities',
      icon: Phone,
      color: 'text-gray-600',
      events: [
        { id: 'incoming-call-ended', label: 'On incoming call ended', icon: 'phone-incoming', color: 'text-green-600' },
        { id: 'outgoing-call-ended', label: 'On outgoing call ended', icon: 'phone-outgoing', color: 'text-green-600' },
        { id: 'missed-call', label: 'On Missed Call', icon: 'phone-missed', color: 'text-red-600' },
        { id: 'call-recording-completed', label: 'On call recording completed', icon: 'phone-recording', color: 'text-red-600' }
      ]
    },
    {
      id: 'paymentActivities',
      label: 'Payment activities',
      icon: DollarSign,
      color: 'text-gray-600',
      events: [
        { id: 'payment-completed', label: 'On payment completed', icon: 'rupee', color: 'text-gray-600' },
        { id: 'payment-pending', label: 'On payment pending', icon: 'rupee', color: 'text-gray-600' },
        { id: 'payment-failed', label: 'On payment failed', icon: 'rupee', color: 'text-gray-600' },
        { id: 'payment-processing', label: 'On payment processing', icon: 'rupee', color: 'text-gray-600' },
        { id: 'payment-cancelled', label: 'On payment cancelled', icon: 'rupee', color: 'text-gray-600' },
        { id: 'payment-refunded', label: 'On payment refunded', icon: 'rupee', color: 'text-gray-600' }
      ]
    }
  ];

  const filteredCategories = eventCategories.map(category => ({
    ...category,
    events: category.events.filter(event =>
      event.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.events.length > 0 || searchQuery === '');

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleNext = () => {
    if (selectedEvent) {
      onNext?.(selectedEvent);
    }
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClose={onClose} />

      {/* Offcanvas */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`h-full w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-200 shrink-0">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Select event</h3>
              <p className="text-xs sm:text-sm text-gray-600">Select the event that will trigger the workflow</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-[8px] hover:bg-gray-100 transition-colors ml-4"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for event e.g. facebook, payment completed, my_waca_template, etc"
                className="w-full rounded-[8px] border border-gray-300 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5BD0] focus:border-transparent"
              />
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
            <div className="space-y-2">
              {filteredCategories.map((category) => {
                const IconComponent = category.icon;
                const isExpanded = expandedCategories[category.id];
                
                return (
                  <div key={category.id} className="border border-gray-200 rounded-[8px] overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
                        <span className="text-sm sm:text-base font-medium text-gray-900">{category.label}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      )}
                    </button>

                    {/* Category Events */}
                    {isExpanded && (
                      <div className="border-t border-gray-200">
                        {category.events.map((event) => {
                          const isSelected = selectedEvent?.id === event.id;
                          const EventIcon = event.icon && typeof event.icon !== 'string' ? event.icon : null;
                          
                          return (
                            <button
                              key={event.id}
                              onClick={() => handleEventSelect(event)}
                              className={`w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors text-left ${
                                isSelected ? 'bg-[#5D5BD0]/5' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                                {EventIcon ? (
                                  <EventIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${event.color || category.color}`} />
                                ) : event.fieldType ? (
                                  getFieldIcon(event.fieldType)
                                ) : typeof event.icon === 'string' ? (
                                  getEventIcon(event.icon, event.color || category.color)
                                ) : null}
                                <span className="text-xs sm:text-sm text-gray-700 flex-1">{event.label}</span>
                                {event.hasSubmenu && (
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                              {event.isDraft && (
                                <span className="ml-2 px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-full">
                                  Draft
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 sm:p-5 md:p-6 border-t border-gray-200 shrink-0">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-[8px] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedEvent}
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-[#5D5BD0] hover:bg-[#4d4bc0] rounded-[8px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectEventOffcanvas;

