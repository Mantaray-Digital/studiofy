'use client';

import { useForm } from 'react-hook-form';
import { Suspense } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { LockKeyhole, Mail, ArrowLeft } from 'lucide-react';
import { ResetPasswordInput, resetPasswordSchema } from '@/schema/auth/reset-password.schema';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import authBg from '@/assets/Image (1).png';
import logo from '@/assets/logo.png';

function ResetPasswordFormContent() {
  const { resetPassword: handleResetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    handleResetPassword(data);
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
          <div className='w-full max-w-2xl'>
            <div className='rounded-2xl bg-white p-8 shadow-xl'>
              {/* Icon */}
              <div className='mb-6 flex justify-center'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100'>
                  <LockKeyhole className='h-8 w-8 text-[#2563EB]' />
                </div>
              </div>

              {/* Title */}
              <h2 className='mb-2 text-center text-3xl font-semibold text-gray-900'>
                Reset Password
              </h2>

              {/* Description */}
              <p className='mb-8 text-center px-0 md:px-26 text-sm text-gray-500'>
                Enter the email address associated with your account and we will send you a link to reset your password. This link will expire in 1 hour.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Email Address */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
                      <Mail className='h-5 w-5 text-gray-600' />
                    </span>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Write your email address'
                      className={`block w-full rounded-lg border p-2.5 pl-10 text-sm bg-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className='mt-1 text-xs text-red-600'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Send Reset Link Button */}
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
                  {isPending ? 'Sending...' : 'Send Reset Code'}
                </button>

                {/* Back to Login Link */}
                <div className='text-center'>
                  <Link
                    href='/login'
                    className='flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-[#2563EB]'>
                    <ArrowLeft className='h-4 w-4' />
                    Back to log in
                  </Link>
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

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
