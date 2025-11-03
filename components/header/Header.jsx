'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, ChevronDown, LogOut, Settings, UserCircle, Menu } from 'lucide-react';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileOpen]);

  return (
    <header className="bg-white shadow p-3 md:p-4 flex justify-between items-center sticky top-0 z-10">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
        type="button"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Profile Dropdown */}
      <div className="relative ml-auto" ref={profileRef}>
        <button
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="shrink-0">
            <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-[10px] text-gray-500">Hello</span>
            <span className="text-xs text-gray-900 font-medium">Akshita</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">Akshita</p>
              <p className="text-xs text-gray-500">akshita@example.com</p>
            </div>

            <div className="py-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </a>
            </div>

            <div className="border-t border-gray-200 pt-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
