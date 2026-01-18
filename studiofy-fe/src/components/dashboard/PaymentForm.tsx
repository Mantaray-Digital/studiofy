'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaymentMethod = 'card' | 'paymob';

interface PaymentFormProps {
  onSubmit?: (data: PaymentFormData) => void;
  isLoading?: boolean;
}

interface PaymentFormData {
  paymentMethod: PaymentMethod;
  email: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
  country: string;
  saveInfo: boolean;
}

const countries = [
  { value: 'egypt', label: 'Egypt' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'saudi', label: 'Saudi Arabia' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

export function PaymentForm({ onSubmit, isLoading = false }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [showCvc, setShowCvc] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiration: '',
    cvc: '',
    country: 'egypt',
    saveInfo: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiration = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiration(e.target.value.replace('/', ''));
    setFormData((prev) => ({ ...prev, expiration: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      paymentMethod,
      ...formData,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      {/* Payment Method Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={cn(
            'flex-1 flex flex-col items-center gap-2 py-4 relative transition-colors',
            paymentMethod === 'card'
              ? 'text-[var(--color-blue-600)]'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-sm font-medium">Card</span>
          {paymentMethod === 'card' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-blue-600)]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('paymob')}
          className={cn(
            'flex-1 flex flex-col items-center gap-2 py-4 relative transition-colors',
            paymentMethod === 'paymob'
              ? 'text-[var(--color-blue-600)]'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-sm font-medium">Paymob</span>
          {paymentMethod === 'paymob' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-blue-600)]" />
          )}
        </button>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-600)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 1234 1234 1234"
                maxLength={19}
                className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-600)] focus:border-transparent transition-all"
                required
              />
              {/* Card Icons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {/* Visa */}
                <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#1A1F71" />
                  <path d="M13.5 14L15 6H17L15.5 14H13.5Z" fill="white" />
                  <path d="M22 6L20.5 11.5L20 9L19.5 6H17.5L16 14H18L20.5 8L21 14H23L25 6H22Z" fill="white" />
                  <path d="M11 6L9 11L8.5 8.5L8 6H5L7 14H9.5L13 6H11Z" fill="white" />
                </svg>
                {/* Mastercard */}
                <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#F5F5F5" />
                  <circle cx="12" cy="10" r="6" fill="#EB001B" />
                  <circle cx="20" cy="10" r="6" fill="#F79E1B" />
                  <path d="M16 5.5C17.5 6.5 18.5 8 18.5 10C18.5 12 17.5 13.5 16 14.5C14.5 13.5 13.5 12 13.5 10C13.5 8 14.5 6.5 16 5.5Z" fill="#FF5F00" />
                </svg>
                {/* Amex */}
                <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#006FCF" />
                  <path d="M7 8H9L10 10L11 8H13V12H11.5V9.5L10.5 11.5H9.5L8.5 9.5V12H7V8Z" fill="white" />
                  <path d="M14 8H18V9H15.5V9.5H17.5V10.5H15.5V11H18V12H14V8Z" fill="white" />
                  <path d="M19 8H21L22 10L23 8H25L23 12H21L19 8Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Expiration & CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiration"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Expiration
              </label>
              <input
                type="text"
                id="expiration"
                name="expiration"
                value={formData.expiration}
                onChange={handleExpirationChange}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-600)] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                CVC
              </label>
              <div className="relative">
                <input
                  type={showCvc ? 'text' : 'password'}
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="CVC"
                  maxLength={4}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-600)] focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCvc(!showCvc)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCvc ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-600)] focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          {/* Save Info Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="w-4 h-4 text-[var(--color-blue-600)] border-gray-300 rounded focus:ring-[var(--color-blue-600)]"
            />
            <label htmlFor="saveInfo" className="text-sm text-gray-600">
              Securely save my information for one-click checkout
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[var(--color-blue-600)] text-white text-base font-medium rounded-xl hover:bg-[var(--color-blue-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Confirm'}
          </button>
        </form>
      )}

      {/* Paymob Payment Form */}
      {paymentMethod === 'paymob' && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            You will be redirected to Paymob to complete your payment.
          </p>
          <button
            type="button"
            className="w-full py-3.5 bg-[var(--color-blue-600)] text-white text-base font-medium rounded-xl hover:bg-[var(--color-blue-700)] transition-colors"
          >
            Continue with Paymob
          </button>
        </div>
      )}
    </div>
  );
}
