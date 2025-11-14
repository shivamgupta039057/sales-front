'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Clock, 
  Users, 
  GraduationCap, 
  UserCog, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Grid3x3,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Search,
  UserPlus,
  AtSign,
  Megaphone,
  Funnel,
  List,
  Sparkles,
  Link as LinkIcon,
  Bot,
  Table,
  Phone,
  TrendingUp
} from 'lucide-react';

const sidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Clock,
    href: '/dashboard'
  },
  {
    id: 'search',
    label: 'Search',
    icon: Search,
    href: '/search'
  },
  {
    id: 'add-leads',
    label: 'Add Lead(s)',
    icon: UserPlus,
    href: null,
    submenu: [
      { id: 'add-single-lead', label: 'Add Single Lead', href: null, icon: UserPlus },
      { id: 'add-from-excel', label: 'Add From Excel', href: null, icon: Table },
      { id: 'add-from-integration', label: 'Add from integration', href: '/leads/add-integration', icon: LinkIcon }
    ]
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: AtSign,
    href: null,
    submenu: [
      { id: 'my-leads', label: 'My Leads', href: '/activities/my-leads', icon: Users },
      { id: 'my-calls', label: 'My Calls', href: '/activities/my-calls', icon: Phone }
    ]
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    href: null,
    submenu: [
      { id: 'new-form-2025', label: 'new-form-2025', href: '/campaigns/new-form-2025', icon: Phone },
      { id: 'ebite', label: 'ebite', href: '/campaigns/ebite', icon: Phone },
      { id: 'telecrm-sample', label: 'telecrm-sample-upload-sheet', href: '/campaigns/telecrm-sample', icon: Phone },
      { id: 'new-form-2024', label: 'new-form-2024', href: '/campaigns/new-form-2024', icon: Phone },
      { id: 'medical-counselling', label: 'medical-counselling-2022-23', href: '/campaigns/medical-counselling', icon: Phone }
    ]
  },
  {
    id: 'filters',
    label: 'Filters',
    icon: Funnel,
    href: null,
    submenu: [
      { id: 'all-leads', label: 'All Leads', href: '/filters/all-leads', icon: FileText },
      { id: 'all-incoming-whatsapp', label: 'All Incoming Whatsapp Leads', href: '/filters/all-incoming-whatsapp', icon: FileText },
      { id: 'leads-assigned-to-me', label: 'Leads Assigned To Me', href: '/filters/leads-assigned-to-me', icon: FileText },
      { id: 'my-leads-filter', label: 'My Leads', href: '/filters/my-leads', icon: FileText },
      { id: 'all-conv', label: 'All aade conv', href: '/filters/all-conv', icon: FileText },
      { id: 'now-form-2024', label: '@now form 2024', href: '/filters/now-form-2024', icon: FileText }
    ]
  },
  {
    id: 'my-lists',
    label: 'My Lists',
    icon: List,
    href: '/my-lists'
  },
  {
    id: 'whatsapp-chat',
    label: 'Whatsapp Chat',
    icon: MessageSquare,
    href: '/whatsapp-chat'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    href: '/reports'
  },
  {
    id: 'automations',
    label: 'Automations',
    icon: Sparkles,
    href: '/automations'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: LinkIcon,
    href: '/integrations'
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    icon: Bot,
    href: '/ai-agents'
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [tooltipPositions, setTooltipPositions] = useState({});
  const settingsAnchorRef = useRef(null);
  const dropdownRef = useRef(null);
  const itemRefs = useRef({});

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    // Close any open submenu on route change
    setOpenMenuId(null);
  }, [pathname]);

  // Calculate tooltip positions
  const calculatePositions = useCallback(() => {
    const positions = {};
    Object.keys(itemRefs.current).forEach((itemId) => {
      const element = itemRefs.current[itemId];
      if (element) {
        const rect = element.getBoundingClientRect();
        positions[itemId] = {
          top: rect.top + rect.height / 2,
          left: rect.right + 6,
        };
      }
    });
    setTooltipPositions(positions);
  }, []);

  useEffect(() => {
    calculatePositions();
    const handleResize = () => calculatePositions();
    const handleScroll = () => calculatePositions();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [openMenuId, pathname, calculatePositions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId) {
        const currentItem = sidebarMenuItems.find(item => item.id === openMenuId);
        if (currentItem && currentItem.submenu) {
          const buttonElement = itemRefs.current[openMenuId];
          const dropdownElement = document.querySelector(`[data-dropdown-id="${openMenuId}"]`);
          
          if (
            buttonElement &&
            !buttonElement.contains(event.target) &&
            dropdownElement &&
            !dropdownElement.contains(event.target)
          ) {
            setOpenMenuId(null);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div
      className="bg-white transition-all duration-300 z-50 p-1 [box-shadow:0px_1px_4px_0px_#00000040] flex flex-col space-y-1 w-[47px] overflow-x-hidden overflow-y-auto shrink-0 h-screen"
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/icon-solid.png"
            alt="logo"
            width={120}
            height={40}
            className="transition duration-300 group-hover:invert group-hover:contrast-[7.5] group-[.active]:invert group-[.active]:contrast-[7.5] h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Sidebar Items */}
      <div className="relative flex-1 z-[10000] hide-scrollbar overflow-x-hidden" style={{ visibility: 'inherit', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="flex flex-col space-y-0.5" style={{ visibility: 'inherit' }}>
          {sidebarMenuItems.map((item) => {
            const IconComponent = item.icon;
            const active = item.href ? isActive(item.href) : false;
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            if (hasSubmenu) {
              const isOpen = openMenuId === item.id;
              const menuActive = active || isOpen;
              return (
                <div
                  key={item.id}
                  className="relative group/tooltip overflow-visible"
                >
                  <button
                    type="button"
                    ref={(el) => {
                      if (item.id === 'add-leads') {
                        settingsAnchorRef.current = el;
                      }
                      itemRefs.current[item.id] = el;
                    }}
                    onClick={() => setOpenMenuId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className={`sidebar-item relative flex transition duration-300 items-center justify-center px-0 h-[47px] w-full rounded-[8px] ${
                      menuActive
                        ? 'bg-[#4880FF]/10 text-[#4880FF]'
                        : 'bg-transparent text-[#4B4743] hover:bg-gray-100'
                    }`}
                  >
                    {menuActive && (
                      <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r bg-[#4880FF]"></span>
                    )}
                    <span className="flex items-center justify-center w-5 h-5">
                      <IconComponent
                        className={`w-4 h-4 transition duration-300 ${
                          menuActive
                            ? 'text-[#4880FF]'
                            : 'text-[#4B4743] group-hover/tooltip:text-[#4880FF]'
                        }`}
                      />
                    </span>
                  </button>
                  
                  {/* Tooltip - Only show when dropdown is not open */}
                  {!isOpen && tooltipPositions[item.id] && (
                    <div 
                      className="fixed px-2 py-1 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]" 
                      style={{ 
                        left: `${tooltipPositions[item.id].left}px`,
                        top: `${tooltipPositions[item.id].top}px`,
                        transform: 'translateY(-50%)'
                      }}
                    >
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#5D5BD0]"></div>
                    </div>
                  )}

                  {isOpen && tooltipPositions[item.id] && (
                    <div 
                      ref={item.id === 'add-leads' ? dropdownRef : null}
                      data-dropdown-id={item.id}
                      className="fixed w-64 rounded-[10px] bg-white shadow-lg [box-shadow:0px_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 z-[100000] max-h-[400px] overflow-hidden flex flex-col"
                      style={{
                        left: `${tooltipPositions[item.id].left}px`,
                        top: `${tooltipPositions[item.id].top - 20}px`
                      }}
                    >
                      {/* Title Header */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">{item.label}</h3>
                      </div>
                      
                      {/* Scrollable Content */}
                      <div className="overflow-y-auto hide-scrollbar flex-1" style={{ maxHeight: '350px' }}>
                        <div className="p-2">
                          {item.id === 'campaigns' && (
                            <div className="flex items-center justify-between px-2 py-1 mb-2">
                              <span className="text-xs text-gray-600">Campaigns</span>
                              <a href="#" className="text-xs text-[#4880FF] hover:underline">See All</a>
                            </div>
                          )}
                          {item.id === 'filters' && (
                            <div className="flex items-center justify-between px-2 py-1 mb-2">
                              <span className="text-xs text-gray-600">Filters</span>
                              <button className="flex items-center gap-1 text-xs text-[#4880FF] hover:underline">
                                <span>+</span>
                                <span>Create New</span>
                              </button>
                            </div>
                          )}
                          
                          {item.submenu.map((sub) => {
                            if (sub.type === 'divider') {
                              return (
                                <div key={sub.id} className="my-2">
                                  <div className="h-px bg-gray-200"></div>
                                  <div className="mt-2 text-[10px] font-medium text-gray-500 tracking-wider">{sub.label}</div>
                                </div>
                              );
                            }
                            const SubIcon = sub.icon;
                            const subActive = sub.href ? pathname?.startsWith(sub.href) : false;
                            
                            if (sub.href) {
                              return (
                                <Link
                                  key={sub.id}
                                  href={sub.href}
                                  onClick={() => setOpenMenuId(null)}
                                  className={`flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-xs hover:bg-gray-50 transition-colors ${
                                    subActive 
                                      ? 'bg-[#4880FF]/10 text-[#4880FF]' 
                                      : 'text-gray-800'
                                  }`}
                                >
                                  {SubIcon && (
                                    <SubIcon className={`w-4 h-4 ${subActive ? 'text-[#4880FF]' : 'text-[#4880FF]/70'}`} />
                                  )}
                                  <span className="truncate">{sub.label}</span>
                                </Link>
                              );
                            }
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  if (typeof window !== 'undefined') {
                                    const event = new CustomEvent('openLeadModal', { 
                                      detail: { type: sub.id },
                                      bubbles: true 
                                    });
                                    window.dispatchEvent(event);
                                  }
                                }}
                                className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-xs text-gray-800 hover:bg-gray-50 transition-colors w-full text-left"
                              >
                                {SubIcon && (
                                  <SubIcon className="w-4 h-4 text-[#4880FF]/70" />
                                )}
                                <span className="truncate">{sub.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  if (el) itemRefs.current[item.id] = el;
                }}
                aria-current={active ? 'page' : undefined}
                className={`group/tooltip sidebar-item relative flex transition duration-300 items-center justify-center px-0 h-[47px] w-full rounded-[8px] z-100 overflow-visible ${
                  active
                    ? 'bg-[#4880FF]/10 text-[#4880FF]'
                    : 'bg-transparent text-[#4B4743] hover:bg-gray-100'
                }`}
              >
                {active && (
                  <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r bg-[#4880FF]"></span>
                )}
                <span className="flex items-center justify-center w-5 h-5">
                  <IconComponent
                    className={`w-4 h-4 transition duration-300 ${
                      active
                        ? 'text-[#4880FF]'
                        : 'text-[#4B4743] group-hover:text-[#4880FF]'
                    }`}
                  />
                </span>
                
                {/* Tooltip */}
                {tooltipPositions[item.id] && (
                  <div 
                    className="fixed px-2 py-1 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]" 
                    style={{ 
                      left: `${tooltipPositions[item.id].left}px`,
                      top: `${tooltipPositions[item.id].top}px`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#5D5BD0]"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


