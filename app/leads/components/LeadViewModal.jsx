'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, MoreVertical, UserPlus, Link as LinkIcon, Star, Phone, Mail, IdCard, Calendar, MapPin, FileText, MessageSquare, ChevronDown, RefreshCcw, Send, AtSign } from 'lucide-react';
import CounsellorAssignModal from './CounsellorAssignModal';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
    aria-hidden="true"
  />
);

const LeadViewModal = ({ open, onClose, lead }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const actionMenuRef = useRef(null);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef(null);
  const [status, setStatus] = useState(lead?.status || 'Just Curious');
  const [activeAction, setActiveAction] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [assignOpen, setAssignOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) setActionMenuOpen(false);
      if (statusMenuRef.current && !statusMenuRef.current.contains(e.target)) setStatusMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  if (!open) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-50 flex flex-col p-4">
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Name + status + stars */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{lead?.name || 'Mahendra Yadav'}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative" ref={statusMenuRef}>
                    <button onClick={() => setStatusMenuOpen(!statusMenuOpen)} className="px-3 py-1 rounded-full bg-purple-700 text-white text-xs font-medium inline-flex items-center gap-1">
                      <span>{status}</span>
                      <ChevronDown className="w-3 h-3 opacity-90" />
                    </button>
                    {statusMenuOpen && (
                      <StatusDropdown onSelect={(val) => { setStatus(val); setStatusMenuOpen(false); }} />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle: action buttons */}
              <div className="shrink-0 flex items-center gap-2">
                <button className="px-3 h-9 inline-flex items-center rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"><UserPlus className="w-4 h-4 mr-2"/>Register Student</button>
                <button className="px-3 h-9 inline-flex items-center rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"><LinkIcon className="w-4 h-4 mr-2"/>Payment Link</button>
              </div>

              {/* Right: icon buttons */}
              <div className="shrink-0 flex items-center gap-2">
                <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50"><UserPlus className="w-5 h-5 text-gray-600"/></button>
                <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50"><AtSign className="w-5 h-5 text-gray-600"/></button>
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setMenuOpen(!menuOpen)} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
                    <MoreVertical className="w-5 h-5 text-gray-600"/>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-10 overflow-hidden">
                      <button onClick={()=>{ setAssignOpen(true); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Counsellor Assignment</button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Edit/Add other info</button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Document Checker</button>
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50"><X className="w-5 h-5 text-gray-600"/></button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
          {/* Info grid */}
          <div className="px-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoRow icon={<Phone className='w-4 h-4'/>} label="WhatsApp Number" value={lead?.phone || '+91-xxxxx254'} />
              <InfoRow icon={<Mail className='w-4 h-4'/>} label="Email" value={lead?.email || 'xxxx@gmail.com'} />
              <InfoRow icon={<IdCard className='w-4 h-4'/>} label="Student Category" value={lead?.category || '---'} />
              <InfoRow icon={<MapPin className='w-4 h-4'/>} label="City" value={lead?.city || 'Jaipur'} />
              <InfoRow icon={<Calendar className='w-4 h-4'/>} label="Interested Date" value={lead?.interestedDate || 'DD/MM/YYYY'} />
            </div>
            <div className="space-y-4">
              <InfoRow icon={<IdCard className='w-4 h-4'/>} label="ID" value={lead?.id || '--'} />
              <InfoRow icon={<FileText className='w-4 h-4'/>} label="Interested Course" value={lead?.course || 'MBBS'} />
              <InfoRow icon={<Star className='w-4 h-4'/>} label="Expected Score" value={lead?.expected || '----'} />
              <InfoRow icon={<MapPin className='w-4 h-4'/>} label="State" value={lead?.state || 'MBBS'} />
              <InfoRow icon={<Calendar className='w-4 h-4'/>} label="Created On" value={lead?.createdOn || 'DD/MM/YYYY'} />
            </div>
          </div>

          {/* Action chips */}
          <div className="px-6 py-3">
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2">
              {['Call','Report','Add Notes'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveAction(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg border ${activeAction===t ? 'bg-white border-blue-300 text-blue-600 ring-1 ring-blue-200' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {t}
                </button>
              ))}
              <button className="px-3 py-1.5 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1">Message <ChevronDown className="w-4 h-4"/></button>
              <button className="px-3 py-1.5 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50">Call Later</button>
              <button className="px-3 py-1.5 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50">View Docs</button>
              <button className="px-3 py-1.5 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50">Send Files</button>
            </div>
            {activeAction === 'Add Notes' && (
              <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
                <textarea
                  value={noteText}
                  onChange={(e)=>setNoteText(e.target.value)}
                  placeholder="Enter note text"
                  className="w-full min-h-[120px] p-3 text-sm outline-none"
                />
                <div className="px-3 py-2 bg-white flex items-center justify-end gap-4 text-sm">
                  <button onClick={()=>{setNoteText(''); setActiveAction(null);}} className="text-gray-500">Cancel</button>
                  <button onClick={()=>{ /* TODO: persist note */ setActiveAction(null);} } className="text-blue-600 font-medium">SAVE</button>
                </div>
              </div>
            )}
          </div>

          {/* Secondary filters */}
          <div className="px-6 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              {['All Actions','Time','Team'].map((t) => (
                <button key={t} className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white inline-flex items-center gap-2">{t}<ChevronDown className="w-4 h-4 text-gray-500"/></button>
              ))}
              <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white"><RefreshCcw className="w-4 h-4 text-gray-600"/></button>
              <div className="ml-auto relative" ref={actionMenuRef}>
                <button
                  onClick={() => setActionMenuOpen(!actionMenuOpen)}
                  className="px-3 h-9 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white text-sm hover:bg-gray-50"
                >
                  + Action
                  <ChevronDown className="w-4 h-4 text-gray-600"/>
                </button>
                {actionMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Notes</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Edit/Add other info</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Register Student</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Send Credentials</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="px-6 pt-3 pb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">History</h4>
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-purple-50 p-3 space-y-2">
              {[
                'SEARCH FOR THE CUET COUNSELOR',
                'Sir cuet ke liya counselor bata do',
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center">SL</div>
                  <div className="max-w-[85%] bg-white rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 shadow-sm">{m}</div>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-2 border-t border-white/60 pt-3">
                <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message" />
                <button className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"><Send className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <CounsellorAssignModal open={assignOpen} onClose={()=>setAssignOpen(false)} lead={lead} onAssign={()=>setAssignOpen(false)} onRegister={()=>setAssignOpen(false)} />
    </>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="h-7 w-7 rounded-lg border border-gray-200 bg-white inline-flex items-center justify-center text-gray-700">
      {icon}
    </div>
    <div>
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  </div>
);

const StatusDropdown = ({ onSelect }) => {
  const sections = [
    {
      title: 'Fresh',
      items: [
        { label: 'Just Curious', color: 'bg-purple-600' },
      ],
    },
    {
      title: 'Active',
      items: [
        { label: 'Interested', color: 'bg-red-500' },
        { label: 'Zoom Session Complete', color: 'bg-yellow-500' },
        { label: 'Personal Counselling', color: 'bg-amber-600' },
        { label: 'Not Interested', color: 'bg-teal-500' },
        { label: 'Office Visited', color: 'bg-blue-600' },
        { label: 'Top Intrested', color: 'bg-indigo-700' },
        { label: '11th class student', color: 'bg-red-600' },
      ],
    },
    {
      title: 'Closed',
      items: [
        { label: 'Deal Closed', color: 'bg-green-600' },
        { label: 'Lost', color: 'bg-orange-500' },
      ],
    },
  ];
  return (
    <div className="absolute z-20 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
      {sections.map((sec, si) => (
        <div key={sec.title} className="py-2">
          <div className="px-4 pb-1 text-[11px] uppercase tracking-wide text-gray-400">{sec.title}</div>
          {sec.items.map((it) => (
            <button
              key={it.label}
              onClick={() => onSelect(it.label)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className={`inline-block h-2.5 w-2.5 rounded ${it.color}`}></span>
              {it.label}
            </button>
          ))}
          {si < sections.length - 1 && <div className="mx-2 my-2 h-px bg-gray-200" />}
        </div>
      ))}
    </div>
  );
};

export default LeadViewModal;


