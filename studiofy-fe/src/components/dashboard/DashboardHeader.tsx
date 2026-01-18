'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLogout } from '@/hooks/auth/useLogout';

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, isPending: isLoggingOut } = useLogout();

  return (
    <header className="w-full h-16 bg-white border-b border-[#e5e7eb]">
      <div className="h-full flex items-center justify-between px-6 md:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logo.svg"
            alt="Studiofy"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-lg md:text-xl font-normal tracking-[-1px] text-black">
            Studiofy
          </span>
        </Link>

        {/* Right side - Menu + Avatar */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu */}
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* User Avatar */}
          <Link href="/profile" className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Image
                src="/images/avatar.svg"
                alt="User avatar"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
          <nav className="flex flex-col p-4 gap-2 max-w-[1440px] mx-auto">
            <Link
              href="/profile"
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/profile?tab=settings"
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <hr className="my-2 border-gray-200" />
            <button
              type="button"
              className="px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoggingOut}
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }}
            >
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
