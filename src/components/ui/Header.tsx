'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="w-full py-6 px-6 md:px-[100px]">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-14">
          <Link
            href="#generate"
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

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-[17px] py-[9px] border border-[var(--color-blue-600)] rounded-[10px] text-[var(--color-blue-600)] font-semibold text-base hover:bg-[var(--color-blue-600)] hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-[var(--color-blue-600)] rounded-[10px] text-white font-semibold text-base hover:bg-[var(--color-blue-700)] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
