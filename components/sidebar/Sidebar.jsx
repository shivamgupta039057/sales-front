'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  Settings
} from 'lucide-react';

const sidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Clock,
    href: '/dashboard'
  },
  {
    id: 'leads-menu',
    label: 'Leads',
    icon: Users,
    href: null,
    submenu: [
      { id: 'leads', label: 'Leads', href: '/leads' },
      { id: 'add-single-lead', label: 'Add Single Lead', href: '/leads/add-single' },
      { id: 'add-from-excel', label: 'Add From Excel', href: '/leads/add-excel' },
      { id: 'add-from-integration', label: 'Add from integration', href: '/leads/add-integration' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    href: '/reports'
  },
  // {
  //   id: 'lead-management',
  //   label: 'Lead Management',
  //   icon: Users,
  //   href: '/dashboard/leads'
  // },
  {
    id: 'student-management',
    label: 'Student Management',
    icon: GraduationCap,
    href: '/dashboard/students'
  },
  {
    id: 'role-management',
    label: 'Role Management',
    icon: UserCog,
    href: '/dashboard/roles'
  },
  {
    id: 'chatbox',
    label: 'Chatbox',
    icon: MessageSquare,
    href: '/dashboard/chatbox'
  },
  
  
  {
    id: 'college-management',
    label: 'College Management',
    icon: BookOpen,
    href: '/dashboard/colleges'
  },
  {
    id: 'courses-management',
    label: 'Courses Management',
    icon: GraduationCap,
    href: '/dashboard/courses'
  },
  {
    id: 'result-management',
    label: 'Result Management',
    icon: FileText,
    href: '/dashboard/results'
  },
  {
    id: 'document-management',
    label: 'Document Management',
    icon: FileText,
    href: '/dashboard/documents'
  },
  {
    id: 'cms',
    label: 'CMS',
    icon: Users,
    href: '/dashboard/cms'
  },
  {
    id: 'staff-management',
    label: 'Staff Management',
    icon: Grid3x3,
    href: '/dashboard/staff'
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenuId, setOpenMenuId] = useState(null);
  const settingsAnchorRef = useRef(null);

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

  return (
    <div
      className="fixed top-0 left-0 h-screen bg-white transition-all duration-300 z-50 p-[12.5px] [box-shadow:0px_1px_4px_0px_#00000040] flex flex-col space-y-4 w-[60px]"
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="logo"
            width={120}
            height={40}
            className="transition duration-300 group-hover:invert group-hover:contrast-[7.5] group-[.active]:invert group-[.active]:contrast-[7.5] h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Sidebar Items */}
      <div className="relative flex-1 overflow-visible no-scrollbar z-[10000]">
        <div className="flex flex-col space-y-2">
          {sidebarMenuItems.map((item) => {
            const IconComponent = item.icon;
            const active = item.href ? isActive(item.href) : false;
            const isLeadsMenu = item.id === 'leads-menu' && item.submenu;

            if (isLeadsMenu) {
              const isOpen = openMenuId === 'leads-menu';
              const leadsMenuActive = pathname?.startsWith('/leads') || isOpen;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenMenuId('leads-menu')}
                  onMouseLeave={() => setOpenMenuId(null)}
                >
                  <button
                    type="button"
                    ref={settingsAnchorRef}
                    onClick={() => setOpenMenuId(isOpen ? null : 'leads-menu')}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className={`group sidebar-item relative flex transition duration-300 !items-center justify-center px-0 h-12 rounded-[10px] ${
                      leadsMenuActive
                        ? 'bg-[#9333EA]/10 text-[#9333EA]'
                        : 'bg-transparent text-[#4B4743] hover:bg-gray-100'
                    }`}
                  >
                    {leadsMenuActive && (
                      <span className="absolute left-[-12.5px] top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-[#9333EA]"></span>
                    )}
                    <span className="flex items-center justify-center w-6 h-6">
                      <IconComponent
                        className={`w-5 h-5 transition duration-300 ${
                          leadsMenuActive
                            ? 'text-[#9333EA]'
                            : 'text-[#4B4743] group-hover:text-[#9333EA]'
                        }`}
                      />
                    </span>
                    <span className="label hidden">{item.label}</span>
                  </button>

                  {isOpen && (
                    <div className="absolute left-full ml-2 top-0 w-64 rounded-xl bg-white shadow-md [box-shadow:0px_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-[100000]">
                      <div className="flex flex-col">
                        {item.submenu.map((sub) => {
                          if (sub.type === 'divider') {
                            return (
                              <div key={sub.id} className="my-2">
                                <div className="h-px bg-gray-200"></div>
                                <div className="mt-2 text-[11px] font-medium text-gray-500 tracking-wider">{sub.label}</div>
                              </div>
                            );
                          }
                          const subActive = sub.id === 'leads' ? pathname?.startsWith('/leads') : false;
                          // Only 'Leads' navigates. Others trigger a modal event and do not change URL.
                          if (sub.id === 'leads') {
                            return (
                              <Link
                                key={sub.id}
                                href={sub.href || '/leads'}
                                onClick={() => setOpenMenuId(null)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 ${
                                  subActive 
                                    ? 'bg-[#9333EA]/10 text-[#9333EA]' 
                                    : 'text-gray-800'
                                }`}
                              >
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
                                  window.dispatchEvent(new CustomEvent('openLeadModal', { detail: { type: sub.id } }));
                                }
                              }}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            >
                              <span className="truncate">{sub.label}</span>
                            </button>
                          );
                        })}
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
                aria-current={active ? 'page' : undefined}
                className={`group sidebar-item relative flex transition duration-300 !items-center justify-center px-0 h-12 rounded-[10px] ${
                  active
                    ? 'bg-[#9333EA]/10 text-[#9333EA]'
                    : 'bg-transparent text-[#4B4743] hover:bg-gray-100'
                }`}
              >
                {active && (
                  <span className="absolute left-[-12.5px] top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-[#9333EA]"></span>
                )}
                <span className="flex items-center justify-center w-6 h-6">
                  <IconComponent
                    className={`w-5 h-5 transition duration-300 ${
                      active
                        ? 'text-[#9333EA]'
                        : 'text-[#4B4743] group-hover:text-[#9333EA]'
                    }`}
                  />
                </span>
                <span className="label hidden">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


