'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface GenerateHeaderProps {
  showUserProfile?: boolean;
}

export function GenerateHeader({ showUserProfile = true }: GenerateHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full h-[83px] bg-white border-b border-gray-100">
      <div className="h-full flex items-center justify-between px-7 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logo.svg"
            alt="Studiofy"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-normal tracking-[-1px] text-black">
            Studiofy
          </span>
        </Link>

        {/* User Profile */}
        {showUserProfile && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src="/images/avatar.svg"
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name */}
                <span className="text-sm font-medium text-gray-900 hidden sm:block">
                  Ibrahim Mahmoud
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile?tab=settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
