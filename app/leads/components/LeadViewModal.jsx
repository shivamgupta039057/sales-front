'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, MoreVertical, UserPlus, Link as LinkIcon, Star, Phone, Mail, IdCard, Calendar, MapPin, FileText, MessageSquare, ChevronDown, RefreshCcw, Send, AtSign } from 'lucide-react';
import CounsellorAssignModal from './CounsellorAssignModal';

const Backdrop = ({ onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-white/0.5 backdrop-blur-[9px] z-40"
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
    // Prevent body scroll when offcanvas is open
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

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) setActionMenuOpen(false);
      if (statusMenuRef.current && !statusMenuRef.current.contains(e.target)) setStatusMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <>
      {open && <Backdrop onClose={onClose} />}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-4xl h-full flex flex-col bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D]  overflow-hidden transition-transform duration-300  ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="px-6 pt-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Name + status + stars */}
              <div className='flex items-center gap-4'>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[24px] font-bold text-gray-900 truncate">{lead?.name || 'Mahendra Yadav'}</h3>
                    
                  </div>
                    {/* Middle: action buttons */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button className="px-3 h-9 inline-flex items-center rounded-[10px] border border-[#D6E4E0] bg-white text-sm text-[#253042] hover:bg-gray-50"><UserPlus className="w-4 h-4 mr-2"/>Register Student</button>
                    <button className="px-3 h-9 inline-flex items-center rounded-[10px] border border-[#D6E4E0] bg-white text-sm text-[#253042] hover:bg-gray-50"><LinkIcon className="w-4 h-4 mr-2"/>Payment Link</button>
                  </div>

              </div>

             

              {/* Right: icon buttons */}
              <div className="shrink-0 flex items-center gap-2">
                <button className="h-9 cursor-pointer inline-flex items-center justify-center rounded-[10px]"><UserPlus className="w-5 h-5 text-gray-600"/></button>
                <button className="h-9 cursor-pointer inline-flex items-center justify-center rounded-[10px]"><AtSign className="w-5 h-5 text-gray-600"/></button>
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setMenuOpen(!menuOpen)} className="h-9 cursor-pointer inline-flex items-center justify-center rounded-[10px]">
                    <MoreVertical className="w-5 h-5 text-gray-600"/>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-[10px] border border-gray-200 bg-white shadow-xl z-10 overflow-hidden">
                      <button onClick={()=>{ setAssignOpen(true); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Counsellor Assignment</button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Edit/Add other info</button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Document Checker</button>
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="h-9 inline-flex items-center justify-center rounded-[10px] cursor-pointer"><X className="w-6 h-6 text-gray-600"/></button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
                      <div className="relative" ref={statusMenuRef}>
                        <button onClick={() => setStatusMenuOpen(!statusMenuOpen)} className="px-3 py-1 rounded-full bg-[#E1FCEF] text-[#14804A] text-sm font-medium inline-flex items-center gap-1">
                          <span>{status}</span>
                          {/* <ChevronDown className="w-3 h-3 opacity-90" /> */}
                        </button>
                        {statusMenuOpen && (
                          <StatusDropdown onSelect={(val) => { setStatus(val); setStatusMenuOpen(false); }} />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[#B8B8B8]">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="w-4 h-4 text-[#B8B8B8] fill-[#B8B8B8]" />
                        ))}
                      </div>
            </div>
            <hr className="my-2 border-gray-200" /> 
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Info grid */}
          <div className="px-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-7">
              <InfoRow icon={<Phone className='size-5 '/>} label="WhatsApp Number" value={lead?.phone || '+91-xxxxx254'} />
              <InfoRow icon={<Mail className='size-5 '/>} label="Email" value={lead?.email || 'xxxx@gmail.com'} />
              <InfoRow icon={<IdCard className='size-5 '/>} label="Student Category" value={lead?.category || '---'} />
              <InfoRow icon={<MapPin className='size-5 '/>} label="City" value={lead?.city || 'Jaipur'} />
              <InfoRow icon={<Calendar className='size-5 '/>} label="Interested Date" value={lead?.interestedDate || 'DD/MM/YYYY'} />
            </div>
            <div className="space-y-7">
              <InfoRow icon={<IdCard className='size-5 '/>} label="ID" value={lead?.id || '--'} />
              <InfoRow icon={<FileText className='size-5 '/>} label="Interested Course" value={lead?.course || 'MBBS'} />
              <InfoRow icon={<Star className='size-5 '/>} label="Expected Score" value={lead?.expected || '----'} />
              <InfoRow icon={<MapPin className='size-5 '/>} label="State" value={lead?.state || 'MBBS'} />
              <InfoRow icon={<Calendar className='size-5 '/>} label="Created On" value={lead?.createdOn || 'DD/MM/YYYY'} />
            </div>
          </div>

          {/* Action chips */}
          <div className="px-6 py-3 mt-5">
            <div className="flex flex-wrap items-center gap-2 bg-[#EBEFFB] rounded-[10px] p-2">
              {['Call','Report','Add Notes'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveAction(t)}
                  className={`px-3 py-1.5 text-sm rounded-full border ${activeAction===t ? 'bg-white border-[#4880FF] text-[#4880FF] ring-1 ring-blue-200' : 'bg-white border-[#D6E4E0] text-[#253042] rounded-full'}`}
                >
                  {t}
                </button>
              ))}
              <button className="px-3 py-1.5 text-sm rounded-full bg-white border border-[#D6E4E0] text-[#253042] inline-flex items-center gap-1">Message <ChevronDown className="w-4 h-4"/></button>
              <button className="px-3 py-1.5 text-sm rounded-full bg-white border border-[#D6E4E0] text-[#253042]">Call Later</button>
              <button className="px-3 py-1.5 text-sm rounded-full bg-white border border-[#D6E4E0] text-[#253042]">View Docs</button>
              <button className="px-3 py-1.5 text-sm rounded-full bg-white border border-[#D6E4E0] text-[#253042]">Send Files</button>
            </div>
            {activeAction === 'Add Notes' && (
              <div className="mt-2 border border-gray-200 rounded-[10px] overflow-hidden">
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
            <div className="flex items-center gap-4">
              {/* Left container with filters and refresh */}
              <div className="flex items-center border border-gray-200 rounded-[10px] bg-white">
                {['All Actions','Time','Team'].map((t, index) => (
                  <React.Fragment key={t}>
                    {index > 0 && <div className="w-px h-6 bg-gray-200" />}
                    <button className="px-3 py-2 text-sm text-gray-900 bg-transparent inline-flex items-center gap-2 hover:bg-gray-50 first:rounded-l-[10px] last:rounded-r-[10px]">
                      {t}
                      <ChevronDown className="w-4 h-4 text-gray-500"/>
                    </button>
                  </React.Fragment>
                ))}
                <div className="w-px h-6 bg-gray-200" />
                <button className="px-3 py-2 h-9 inline-flex items-center justify-center hover:bg-gray-50 rounded-r-[10px]">
                  <RefreshCcw className="w-4 h-4 text-red-500"/>
                </button>
              </div>
              
              {/* Right Action button */}
              <div className="ml-auto relative" ref={actionMenuRef}>
                <button
                  onClick={() => setActionMenuOpen(!actionMenuOpen)}
                  className="px-3 h-9 inline-flex items-center gap-2 rounded-[10px] border border-[#4880FF] bg-white text-[#4880FF] text-sm"
                >
                  + Action
                  <ChevronDown className="w-4 h-4"/>
                </button>
                {actionMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-[10px] p-2 bg-white [box-shadow:0px_13px_61px_0px_#A9A9A95D] z-10 overflow-hidden">
                    <button className="w-full text-left px-4 py-2 text-sm">Notes</button>
                    <button className="w-full text-left px-4 py-2 text-sm">Edit/Add other info</button>
                    <button className="w-full text-left px-4 py-2 text-sm">Register Student</button>
                    <button className="w-full text-left px-4 py-2 text-sm">Send Credentials</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="px-6 pt-3 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">History</h4>
            <div className="relative overflow-hidden rounded-[10px] border border-[#D5D5D5] bg-gradient-to-br from-[#FFE5F5] via-[#F3E8FF] to-white p-3 flex flex-col z-20 h-[361px]">
                <div className='absolute inset-0 size-full -z-10'><img src="/chatbg.png" alt="history" className="size-full object-cover" /></div>
              
              <div className='flex-1 overflow-y-auto space-y-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
              {[
                { text: 'SEARCH FOR THE CUET COUNSELOR', time: '2:42 PM Sun, 6 Jul 25' },
                { text: 'Sir cuet ke liya counsler bata do', time: '2:42 PM Sun, 6 Jul 25', hasIcons: true },
                { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '2:42 PM Sun, 6 Jul 25' }
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-2 z-30">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold flex items-center justify-center shrink-0">SL</div>
                  <div className="max-w-[85%] bg-white rounded-[10px] px-3 py-2 shadow-sm">
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1 flex-wrap">
                      {m.hasIcons ? (
                        <>
                          <span>ke liya counsler bata do</span>
                        </>
                      ) : (
                        m.text
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">({m.time})</div>
                  </div>
                </div>
              ))}
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-white/60 pt-3">
                <input className="flex-1 border border-[#D5D5D5] rounded-[10px] px-3 h-10 text-[13px] text-[#202224] placeholder:text-[#6C727F] bg-[#f5f9ff] focus:outline-none" placeholder="Type a message" />
                <button className="h-10 w-10 inline-flex items-center justify-center rounded-[10px] bg-[#3B82F6] text-white hover:bg-[#2563EB]"><Send className="w-4 h-4"/></button>
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
    <div className="h-12 w-12 sm:w-10 sm:h-10 rounded-[10px] border border-gray-200 bg-white inline-flex items-center justify-center text-gray-700">
      {icon}
    </div>
    <div>
      <div className="text-[14px] 
       text-[#898989">{label}</div>
      <div className="text-[15px] text-[#000000] font-semibold">{value}</div>
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
    <div className="absolute z-40 mt-2 w-56 rounded-[6px] border border-gray-200 bg-white [box-shadow:_0px_13px_61px_0px_#A9A9A95D">
      {sections.map((sec, si) => (
        <div key={sec.title} className="py-2">
          <div className="px-4 pb-1 text-sm uppercase tracking-wide text-[#ABABAB]">{sec.title}</div>
          {sec.items.map((it) => (
            <button
              key={it.label}
              onClick={() => onSelect(it.label)}
              className="w-full px-4 py-2 text-left text-sm text-[#202224] hover:bg-gray-50 flex items-center gap-2"
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


