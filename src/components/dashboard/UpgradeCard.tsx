'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

interface UpgradeCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function UpgradeCard({
  title = 'Need more features?',
  description = 'Upgrade to the Enterprise plan for unlimited generations and priority support.',
  buttonText = 'Upgrade Now',
  href = '/profile/upgrade',
}: UpgradeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] p-6 h-full flex flex-col justify-between">
      {/* Icon */}
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
        <Zap className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/80 leading-relaxed">{description}</p>
      </div>

      {/* CTA Button */}
      <Link
        href={href}
        className="w-full py-2.5 bg-white text-[var(--color-blue-600)] text-sm font-medium rounded-lg text-center hover:bg-gray-50 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
