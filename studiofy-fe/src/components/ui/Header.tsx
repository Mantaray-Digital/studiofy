'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 md:py-6 px-4 md:px-[100px] relative">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 z-20">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-14">
          <Link
            href="/generate"
            className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors"
          >
            Generate
          </Link>
          <Link
            href="#features"
            className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="px-[17px] py-[9px] border border-[var(--color-blue-600)] rounded-[10px] text-[var(--color-blue-600)] font-semibold text-base hover:bg-[var(--color-blue-600)] hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="relative inline-flex items-center px-4 py-2 rounded-[10px] text-white font-semibold text-base overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <span className="absolute inset-0 bg-[#2563eb]" />
            <span
              className="absolute inset-0 mix-blend-hard-light rounded-[10px]"
              style={{
                backgroundImage:
                  'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(151,156,158,0.15) 47%, rgba(72,83,87,0.15) 51%, rgba(112,117,120,0.15) 57%, rgba(165,165,166,0.15) 63%, rgba(255,255,255,0.15) 79%, rgba(79,79,83,0.15) 87%, rgba(165,165,167,0.15) 95%)',
              }}
            />
            <span className="relative">Sign Up</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden z-20 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="/generate"
              className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Generate
            </Link>
            <Link
              href="#features"
              className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium text-[#222] hover:text-[var(--color-blue-600)] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/login"
                className="px-4 py-3 border border-[var(--color-blue-600)] rounded-[10px] text-[var(--color-blue-600)] font-semibold text-base text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="relative inline-flex items-center justify-center px-4 py-3 rounded-[10px] text-white font-semibold text-base overflow-hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="absolute inset-0 bg-[#2563eb]" />
                <span
                  className="absolute inset-0 mix-blend-hard-light rounded-[10px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(151,156,158,0.15) 47%, rgba(72,83,87,0.15) 51%, rgba(112,117,120,0.15) 57%, rgba(165,165,166,0.15) 63%, rgba(255,255,255,0.15) 79%, rgba(79,79,83,0.15) 87%, rgba(165,165,167,0.15) 95%)',
                  }}
                />
                <span className="relative"> Sign Up</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
