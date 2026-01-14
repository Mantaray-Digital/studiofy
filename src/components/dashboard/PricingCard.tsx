'use client';

import { Check } from 'lucide-react';

interface PricingCardProps {
  badge?: string;
  planName: string;
  description: string;
  price: number;
  billingPeriod: 'month' | 'year';
  features: string[];
}

export function PricingCard({
  badge,
  planName,
  description,
  price,
  billingPeriod,
  features,
}: PricingCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col">
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[var(--color-blue-100)] text-[var(--color-blue-600)] text-sm font-medium rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Plan Name & Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{planName}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">${price}</span>
        <span className="text-gray-500 ml-1">Per {billingPeriod}</span>
      </div>

      {/* Features */}
      <div className="flex-1">
        <p className="text-base font-semibold text-gray-900 mb-3">Features</p>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-gray-700 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
