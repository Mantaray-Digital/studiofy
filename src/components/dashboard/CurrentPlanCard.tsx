'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface CurrentPlanCardProps {
  planName: string;
  price: number;
  billingPeriod: 'month' | 'year';
  renewalDate: string;
  creditsUsed: number;
  creditsTotal: number;
  isActive?: boolean;
  onChangePlan?: () => void;
  onCancelSubscription?: () => void;
}

export function CurrentPlanCard({
  planName,
  price,
  billingPeriod,
  renewalDate,
  creditsUsed,
  creditsTotal,
  isActive = true,
  onChangePlan,
  onCancelSubscription,
}: CurrentPlanCardProps) {
  const creditPercentage = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Plan Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{planName}</h3>
            {isActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Active
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">Renews on {renewalDate}</p>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-gray-500 text-base">/{billingPeriod}</span>
        </div>
      </div>

      {/* Credit Usage */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Credit Usage</span>
          </div>
          <span className="text-sm text-gray-600">
            {creditsUsed} / {creditsTotal} credits
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-blue-600)] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(creditPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/profile/upgrade"
          className="px-5 py-2.5 bg-[var(--color-blue-600)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-blue-700)] transition-colors"
          onClick={onChangePlan}
        >
          Change Plan
        </Link>
        <button
          type="button"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          onClick={onCancelSubscription}
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
