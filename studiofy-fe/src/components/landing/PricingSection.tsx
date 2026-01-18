'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { useSubscriptionPlans } from '@/hooks/subscriptions/useSubscriptionPlans';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

function mapPlansToUi(plans: { name: string; tier: string; price: number; description: string; features: string[] }[]) {
  const sorted = [...plans].sort((a, b) => a.price - b.price);

  return sorted.map<PricingPlan>((p) => ({
    name: p.name,
    description: p.description,
    price: p.price,
    yearlyPrice: p.price * 12,
    features: p.features,
    highlighted: p.tier === 'PRO',
    badge: p.tier === 'PRO' ? 'Best Plan' : undefined,
  }));
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const plansQuery = useSubscriptionPlans();
  const plans = mapPlansToUi(plansQuery.data?.data ?? []);

  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-12">
        {/* Header */}
        <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] md:leading-[60px] tracking-[-0.96px] text-center">
          Our Pricing Plans
        </h2>

        {/* Billing Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-black text-sm md:text-base">Monthly</span>
          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-[60px] md:w-[74px] h-8 md:h-10 rounded-full bg-blue-600 transition-colors"
          >
            <div
              className={`absolute top-1 w-6 md:w-8 h-6 md:h-8 rounded-full bg-white shadow-md transition-transform ${
                isYearly ? 'translate-x-[30px] md:translate-x-[38px]' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-black text-sm md:text-base text-center">Yearly</span>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 w-full max-w-[1100px] justify-center">
          {plansQuery.isLoading && (
            <div className="text-sm text-gray-600">Loading plans...</div>
          )}
          {plansQuery.isError && (
            <div className="text-sm text-red-600">Failed to load plans.</div>
          )}
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-3 md:gap-4 rounded-[24px] md:rounded-[32px] w-full md:w-auto md:flex-1 overflow-hidden ${
                plan.highlighted
                  ? 'p-5 md:p-6 md:scale-105 z-10'
                  : 'bg-white border border-black p-5 md:p-6'
              }`}
            >
              {/* Pro card background */}
              {plan.highlighted && (
                <Image
                  src="/images/pricing-pro-bg.png"
                  alt=""
                  fill
                  className="object-cover pointer-events-none"
                />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="relative flex justify-end">
                  <span className="px-4 py-2 bg-[#f5f5f5] text-[#0a0a0a] text-sm font-medium rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="relative flex flex-col gap-1 md:gap-2">
                <h3
                  className={`text-xl md:text-2xl font-bold leading-8 ${
                    plan.highlighted ? 'text-[#f5f5f5]' : 'text-[#171717]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm md:text-base leading-6 ${
                    plan.highlighted ? 'text-[#d4d4d4]' : 'text-[#383838]'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="relative flex flex-col gap-1 md:gap-2">
                <p
                  className={`text-base md:text-lg font-semibold leading-7 ${
                    plan.highlighted ? 'text-[#f5f5f5]' : 'text-[#171717]'
                  }`}
                >
                  Features
                </p>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check
                      className={`w-4 md:w-5 h-4 md:h-5 ${
                        plan.highlighted ? 'text-[#f5f5f5]' : 'text-[#171717]'
                      }`}
                      strokeWidth={2}
                    />
                    <span
                      className={`text-sm md:text-lg leading-6 md:leading-7 ${
                        plan.highlighted ? 'text-[#f5f5f5]' : 'text-[#171717]'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="relative flex flex-col gap-1">
                <p
                  className={`text-3xl md:text-4xl font-semibold leading-[40px] md:leading-[44px] tracking-[-0.72px] ${
                    plan.highlighted ? 'text-[#f5f5f5]' : 'text-[#171717]'
                  }`}
                >
                  ${isYearly ? plan.yearlyPrice : plan.price}
                </p>
                <p
                  className={`text-sm md:text-base leading-6 ${
                    plan.highlighted ? 'text-[#d4d4d4]' : 'text-[#383838]'
                  }`}
                >
                  Per {isYearly ? 'year' : 'month'}
                </p>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className={`relative w-full cursor-pointer py-3 md:py-4 px-6 md:px-8 rounded-full font-medium text-sm md:text-base flex items-center justify-center gap-2 transition-colors ${
                  plan.highlighted
                    ? 'bg-[#f5f5f5] text-[#171717]'
                    : 'bg-[#f5f5f5]  text-[#171717] border border-[#171717]'
                }`}
              >
                <span className={plan.highlighted ? 'text-[#171717]' : 'text-[#171717]'}>
                  Get started
                </span>
                <ArrowRight
                  className={`w-5 md:w-6 h-5 md:h-6 ${plan.highlighted ? 'text-[#171717]' : 'text-[#171717]'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
