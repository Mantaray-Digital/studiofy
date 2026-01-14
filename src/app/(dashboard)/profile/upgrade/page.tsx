'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { PricingCard } from '@/components/dashboard/PricingCard';
import { PaymentForm } from '@/components/dashboard/PaymentForm';

// Mock plan data - replace with real data from API or route params
const selectedPlan = {
  badge: 'Best Plan',
  name: 'Agency Plan',
  description: 'Perfect for advanced needs.',
  price: 50,
  billingPeriod: 'month' as const,
  features: [
    'Increased Usage Limits',
    'Priority Support',
    'Multi-User Support',
    'Increased Storage',
  ],
};

export default function UpgradePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSubmit = async (data: {
    paymentMethod: string;
    email: string;
    cardNumber: string;
    expiration: string;
    cvc: string;
    country: string;
    saveInfo: boolean;
  }) => {
    setIsLoading(true);
    try {
      // TODO: Implement payment processing
      console.log('Payment data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to success page or show success message
      alert('Payment successful!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Upgrade to Studiofy
          <br />
          Premium
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Pricing Card */}
          <div>
            <PricingCard
              badge={selectedPlan.badge}
              planName={selectedPlan.name}
              description={selectedPlan.description}
              price={selectedPlan.price}
              billingPeriod={selectedPlan.billingPeriod}
              features={selectedPlan.features}
            />
          </div>

          {/* Payment Form */}
          <div>
            <PaymentForm onSubmit={handlePaymentSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
