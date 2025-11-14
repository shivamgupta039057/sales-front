'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  UserCircle, 
  Menu, 
  Clock, 
  Bell, 
  MessageSquare,
  Ban,
  Check,
  List,
  Funnel,
  Phone,
  Grid3x3,
  Users,
  Shield
} from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [tooltipPositions, setTooltipPositions] = useState({});
  const itemRefs = useRef({});
  const dropdownRefs = useRef({});

  // Calculate tooltip positions
  const calculatePositions = useCallback(() => {
    const positions = {};
    Object.keys(itemRefs.current).forEach((itemId) => {
      const element = itemRefs.current[itemId];
      if (element) {
        const rect = element.getBoundingClientRect();
        positions[itemId] = {
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2,
          right: rect.right,
          bottom: rect.bottom + 8,
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
  }, [openDropdown, calculatePositions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown) {
        const buttonElement = itemRefs.current[openDropdown];
        const dropdownElement = dropdownRefs.current[openDropdown];
        
        if (
          buttonElement &&
          !buttonElement.contains(event.target) &&
          dropdownElement &&
          !dropdownElement.contains(event.target)
        ) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const headerItems = [
    {
      id: 'workspace',
      label: 'Workspace',
      hasDropdown: true,
      dropdownContent: (
        <div className="w-64 bg-white rounded-[10px] shadow-lg border border-gray-100 p-2">
          <div className="px-3 py-2 bg-gray-50 rounded-[8px] mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">VISUTI CAREER</span>
            </div>
            <span className="text-xs text-[#4880FF]">Root</span>
          </div>
          <button className="w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded-[8px] border border-gray-200 text-center">
            Manage Workspaces
          </button>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Clock,
      badge: 3,
      hasDropdown: true,
      dropdownContent: (
        <div className="w-80 bg-white rounded-[10px] shadow-lg border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
          <div className="space-y-2">
            <div className="text-xs text-gray-500 text-center py-4">No new notifications</div>
          </div>
        </div>
      )
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: Bell,
      hasDropdown: true,
      dropdownContent: (
        <div className="w-80 bg-white rounded-[10px] shadow-lg border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Alerts</h3>
          <div className="space-y-2">
            <div className="text-xs text-gray-500 text-center py-4">No new alerts</div>
          </div>
        </div>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      hasDropdown: true,
      dropdownContent: (
        <div className="w-64 bg-white rounded-[10px] shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-900">Anshul</p>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">Pro</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] rounded-full flex items-center gap-1">
                <UserCircle className="w-3 h-3" />
                Root
              </span>
            </div>
            <p className="text-xs text-[#4880FF] mt-2">visutitech@gmail.com</p>
          </div>
          <div className="py-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Message Templates</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Ban className="w-4 h-4" />
              <span>Blocklist</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>My Preferences</span>
            </a>
          </div>
          <div className="border-t border-gray-200 pt-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      hasDropdown: true,
      dropdownContent: (
        <div className="w-56 bg-white rounded-[10px] shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-2">
            {/* WORKSPACE Section */}
            <div className="mb-2">
              <div className="px-2 py-1 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                WORKSPACE
              </div>
              <div className="space-y-0.5">
                <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <List className="w-4 h-4 text-gray-600" />
                  <span>Lead Fields</span>
                </a>
                <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <Funnel className="w-4 h-4 text-gray-600" />
                  <span>Lead Stage</span>
                </a>
                <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>Call Feedback</span>
                </a>
                <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <Grid3x3 className="w-4 h-4 text-gray-600" />
                  <span>Preferences</span>
                </a>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-200 my-2"></div>

            {/* TEAM Section */}
            <div>
              <div className="px-2 py-1 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                TEAM
              </div>
              <div className="space-y-0.5">
                <a href="#" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span>Users</span>
                </a>
                <Link href="/dashboard/permission-templates" className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-50 rounded-[6px] transition-colors">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span>Permission Templates</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <header className="bg-white shadow-sm px-3 flex justify-between items-center z-40 border-b border-gray-100 h-[47px] shrink-0">
      {/* Left Section - Workspace Selector */}
      <div className="flex items-center gap-3">
        <button
          ref={(el) => {
            if (el) itemRefs.current['workspace'] = el;
          }}
          onClick={() => setOpenDropdown(openDropdown === 'workspace' ? null : 'workspace')}
          className="group/tooltip relative flex items-center gap-2 px-3 py-2 rounded-[10px] bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors h-10"
        >
          <div className="w-8 h-8 rounded-full bg-[#4880FF] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">V</span>
          </div>
          <span className="text-sm font-medium text-gray-900 hidden sm:block whitespace-nowrap">VISUTI CAREER</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${openDropdown === 'workspace' ? 'rotate-180' : ''}`} />
          
          {/* Tooltip */}
          {openDropdown !== 'workspace' && tooltipPositions['workspace'] && (
            <div 
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]"
            >
              Workspace
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#5D5BD0]"></div>
            </div>
          )}

          {/* Dropdown */}
          {openDropdown === 'workspace' && tooltipPositions['workspace'] && (
            <div
              ref={(el) => {
                if (el) dropdownRefs.current['workspace'] = el;
              }}
              className="absolute top-full left-0 mt-2 z-[100000]"
            >
              {headerItems.find(item => item.id === 'workspace')?.dropdownContent}
            </div>
          )}
        </button>

        {/* Settings Icon */}
        <div className="h-6 w-px bg-gray-200"></div>
        <div className="relative group/tooltip">
          <button
            ref={(el) => {
              if (el) itemRefs.current['settings'] = el;
            }}
            onClick={() => setOpenDropdown(openDropdown === 'settings' ? null : 'settings')}
            className="relative p-2 rounded-[10px] hover:bg-gray-50 transition-colors h-10 w-10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Tooltip */}
          {openDropdown !== 'settings' && tooltipPositions['settings'] && (
            <div 
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]"
            >
              Settings
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#5D5BD0]"></div>
            </div>
          )}

          {/* Dropdown */}
          {openDropdown === 'settings' && tooltipPositions['settings'] && (
            <div
              ref={(el) => {
                if (el) dropdownRefs.current['settings'] = el;
              }}
              className="absolute top-full right-0 mt-2 z-[100000]"
            >
              {headerItems.find(item => item.id === 'settings')?.dropdownContent}
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        {headerItems.filter(item => item.id === 'notifications' || item.id === 'alerts').map((item) => {
          const IconComponent = item.icon;
          const isOpen = openDropdown === item.id;
          
          return (
            <div key={item.id} className="relative group/tooltip">
              <button
                ref={(el) => {
                  if (el) itemRefs.current[item.id] = el;
                }}
                onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                className="relative p-2 rounded-[10px] hover:bg-gray-50 transition-colors h-10 w-10 flex items-center justify-center"
              >
                <IconComponent className="w-5 h-5 text-gray-600" />
                {item.badge && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#4880FF] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>

              {/* Tooltip */}
              {!isOpen && tooltipPositions[item.id] && (
                <div 
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]"
                >
                  {item.label}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#5D5BD0]"></div>
                </div>
              )}

              {/* Dropdown */}
              {isOpen && tooltipPositions[item.id] && (
                <div
                  ref={(el) => {
                    if (el) dropdownRefs.current[item.id] = el;
                  }}
                  className="absolute top-full right-0 mt-2 z-[100000]"
                >
                  {item.dropdownContent}
                </div>
              )}
            </div>
          );
        })}

        {/* Profile */}
        <div className="relative group/tooltip">
          <button
            ref={(el) => {
              if (el) itemRefs.current['profile'] = el;
            }}
            onClick={() => setOpenDropdown(openDropdown === 'profile' ? null : 'profile')}
            className="flex items-center gap-2 px-2 py-1.5 rounded-[10px] hover:bg-gray-50 transition-colors h-10"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4880FF] to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              A
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block shrink-0 ${openDropdown === 'profile' ? 'rotate-180' : ''}`} />
          </button>

          {/* Tooltip */}
          {openDropdown !== 'profile' && tooltipPositions['profile'] && (
            <div 
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#5D5BD0] text-[#F1F1FB] text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-[9999]"
            >
              Profile
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#5D5BD0]"></div>
            </div>
          )}

          {/* Dropdown */}
          {openDropdown === 'profile' && tooltipPositions['profile'] && (
            <div
              ref={(el) => {
                if (el) dropdownRefs.current['profile'] = el;
              }}
              className="absolute top-full right-0 mt-2 z-[100000]"
            >
              {headerItems.find(item => item.id === 'profile')?.dropdownContent}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
