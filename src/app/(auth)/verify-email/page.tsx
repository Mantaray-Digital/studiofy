'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { Mail, ArrowLeft, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { VerifyEmailInput, verifyEmailSchema } from '@/schema/auth/verify-email.schema';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';
import authBg from '@/assets/Image (1).png';
import logo from '@/assets/logo.png';

function VerifyEmailFormContent() {
  const { verify, requestCode, isPending } = useVerifyEmail();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  
  const [codeValues, setCodeValues] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: emailParam,
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleCodeChange = (index: number, value: string) => {
    // Only allow alphanumeric characters
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (sanitizedValue.length > 1) {
      // If pasting multiple characters, distribute them across inputs
      const newValues = [...codeValues];
      const chars = sanitizedValue.split('').slice(0, 6);
      chars.forEach((char, i) => {
        if (index + i < 6) {
          newValues[index + i] = char;
        }
      });
      setCodeValues(newValues);
      setValue('code', newValues.join(''));
      
      // Focus on the next empty input or the last one
      const nextEmptyIndex = newValues.findIndex((val, i) => !val && i >= index);
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(index + chars.length, 5);
      if (targetIndex < 6) {
        inputRefs.current[targetIndex]?.focus();
      }
    } else {
      const newValues = [...codeValues];
      newValues[index] = sanitizedValue;
      setCodeValues(newValues);
      setValue('code', newValues.join(''));

      // Move to next input if value entered
      if (sanitizedValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (pastedData.length > 0) {
      const newValues = [...codeValues];
      const chars = pastedData.split('').slice(0, 6);
      chars.forEach((char, i) => {
        newValues[i] = char;
      });
      setCodeValues(newValues);
      setValue('code', newValues.join(''));
      const nextEmptyIndex = newValues.findIndex((val) => !val);
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
      inputRefs.current[targetIndex]?.focus();
    }
  };

  // Update form code value when codeValues change
  useEffect(() => {
    setValue('code', codeValues.join(''));
  }, [codeValues, setValue]);

  const onSubmit = (data: VerifyEmailInput) => {
    verify(data);
  };

  const handleResend = () => {
    const email = getValues('email');
    requestCode(email || undefined);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className='relative flex min-h-screen w-full flex-col overflow-hidden'>
        {/* Background Image */}
        <div className='fixed inset-0 z-0'>
          <Image
            src={authBg}
            alt='Background'
            fill
            className='object-cover'
            priority
          />
          {/* Gradient Overlay - Top and Bottom Shadow */}
          <div className='absolute inset-0 bg-linear-to-b from-black/50 via-transparent via-50% to-black/50' />
        </div>

        {/* Frosted Glass Top Bar */}
        <div className='fixed top-0 left-0 right-0 z-20 backdrop-blur-sm border-b border-white/20 shadow-sm'>
          <div className='p-6'>
            <div className='flex items-center gap-2'>
              <Image
                src={logo}
                alt='Studiofy Logo'
                width={32}
                height={32}
                className='h-8 w-8 bg-white rounded-full'
              />
              <span className='text-2xl  text-white'>Studiofy</span>
            </div>
          </div>
        </div>

        {/* Main Content - Centered Modal */}
        <div className='relative z-10 flex flex-1 items-center justify-center px-4 pt-44 pb-10'>
          <div className='w-full max-w-3xl'>
            <div className='rounded-2xl bg-white p-8 shadow-xl'>
              {/* Icon */}
              <div className='mb-6 flex justify-center'>

                <Mail className='h-14 w-14 text-[#2563EB] bg-[#d2ddf4] p-3 m-3 rounded-lg' />
              </div>

              {/* Title */}
              <h2 className='mb-2 text-center text-3xl font-bold text-gray-900'>
                Reset your password
              </h2>

              {/* Instructions */}
              <p className='mb-8 text-center px-0 md:px-40 text-sm text-gray-600'>
                We&apos;ve sent a 6-digit reset token to{' '}
                <span className='font-medium text-gray-900'>{emailParam || 'your email'}</span>. Enter the token and your new password below to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Hidden email input */}
                <input type='hidden' {...register('email')} />
                
                {/* 6-Digit Code Input */}
                <div>
                  <div className='flex gap-2 justify-center'>
                    {codeValues.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type='text'
                        inputMode='text'
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className={`h-14 w-12 rounded-sm border-2 text-center text-2xl font-bold text-black bg-[#d2ddf4] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.code ? 'border-red-500 bg-red-500' : 'border-[#d2ddf4]'
                        }`}
                      />
                    ))}
                  </div>
                  {errors.code && (
                    <p className='mt-2 text-center text-xs text-red-600'>
                      {errors.code.message}
                    </p>
                  )}
                  <input type='hidden' {...register('code')} />
                </div>

                {/* Password */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    New Password
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400'>
                      <LockKeyhole className='h-5 w-5' />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      placeholder='Enter your new password'
                      className={`block w-full rounded-lg bg-gray-200 border p-2.5 pl-10 pr-10 text-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-400'>
                      {showPassword ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='mt-1 text-xs text-red-600'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Confirm New Password
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400'>
                      <LockKeyhole className='h-5 w-5' />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      placeholder='Confirm your new password'
                      className={`block w-full rounded-lg bg-gray-200 border p-2.5 pl-10 pr-10 text-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-400'>
                      {showConfirmPassword ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className='mt-1 text-xs text-red-600'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Reset Password Button */}
                <button
                  type='submit'
                  disabled={isPending}
                  className="
    w-full
    rounded-lg
    bg-linear-to-br
    from-blue-500
    via-blue-600
    to-blue-700
    text-white
    font-semibold
    py-3
    shadow-[0_8px_20px_rgba(37,99,235,0.35)]
    hover:brightness-110
    transition
    cursor-pointer
    disabled:cursor-not-allowed
    disabled:opacity-50
  ">
                  {isPending ? 'Resetting Password...' : 'Reset Password'}
                </button>

                {/* Links */}
                <div className='space-y-3 text-center'>
                  <Link
                    href='/login'
                    className='flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-[#2563EB]'>
                    <ArrowLeft className='h-4 w-4' />
                    Back to log in
                  </Link>
                  <p className='text-sm text-gray-600'>
                    Didn&apos;t receive the code?{' '}
                    <button
                      type='button'
                      onClick={handleResend}
                      className='font-medium text-[#2563EB] hover:underline'>
                      Resend code
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='relative z-10 mt-auto border-t border-white/10 px-6 py-4'>
          <div className='mx-auto flex max-w-8xl flex-col items-center justify-between gap-4 md:flex-row'>
            <p className='text-sm text-white/80'>
              © 2025 Studiofy. All rights reserved.
            </p>
            <div className='flex flex-wrap items-center gap-1 text-sm text-white/80'>
              <Link href='#' className='hover:text-white'>
                Imprint
              </Link>
              <span>.</span>
              <Link href='#' className='hover:text-white'>
                Contact
              </Link>
              <span>.</span>
              <Link href='#' className='hover:text-white'>
                Terms of Service
              </Link>
              <span>.</span>
              <Link href='#' className='hover:text-white'>
                License
              </Link>
              <span>.</span>
              <Link href='#' className='hover:text-white'>
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function VerifyEmailForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailFormContent />
    </Suspense>
  );
}
