'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { User, LockKeyhole, Eye, EyeOff, CircleUser } from 'lucide-react';
import { createLoginFormData, loginSchema } from '@/schema/auth/login.schema';
import { useLogin } from '@/hooks/auth/useLogin';
import authBg from '@/assets/Image (1).png';
import logo from '@/assets/logo.png';
import contactLogo from '@/assets/mobile-logo.png';

export default function LoginForm() {
  const { login: handleLogin, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createLoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: createLoginFormData) => {
    handleLogin(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <div className='relative flex h-screen w-full flex-col overflow-hidden'>
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
        <div className='relative z-10 flex flex-1 items-center justify-center px-4 pt-44 pb-4'>
          <div className='w-full max-w-2xl'>
            <div className='rounded-2xl bg-white p-8 shadow-xl'>
              {/* Modal Logo - Top Center */}
              <div className='mb-6 flex justify-center'>
                <Image
                  src={contactLogo}
                  alt='Studiofy Logo'
                  width={48}
                  height={48}
                  className='h-8 w-8 bg-white rounded-full'
                />
              </div>

              {/* Title */}
              <h2 className='mb-8 text-center text-3xl font-bold text-gray-900'>
                Sign In to Studiofy
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {/* Username or Email */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Username or email
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400'>
                      <CircleUser className='h-5 w-5' />
                    </span>
                    <input
                      {...register('email')}
                      type='text'
                      placeholder='Username or email'
                      className={`block w-full rounded-lg bg-gray-200 border p-2.5 pl-10 text-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none ${
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

                {/* Password */}
                <div>
                  <div className='mb-1 flex items-center justify-between'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <Link
                      href='/reset-password'
                      className='text-sm font-medium text-[#2563EB] hover:underline'>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400'>
                      <LockKeyhole className='h-5 w-5' />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      placeholder='Password'
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

                {/* Sign In Button */}
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
                "
              >
                  {isPending ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Continue with Google Button */}
                <button
                  type='button'
                  className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors hover:bg-gray-50'>
                  <Image
                  src='/google-logo.svg'
                  alt='Google'
                  width={20}
                  height={20}
                  className='h-5 w-5'
                />
                  <span className='font-medium'>Continue with Google</span>
                </button>

                {/* Account Creation Link */}
                <p className='mt-4 text-center text-sm text-gray-600'>
                  Do not have an account?{' '}
                  <Link href='/signup' className='font-medium text-[#2563EB] hover:underline'>
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='relative z-10 mt-auto border-t border-white/10 px-6 py-4 shrink-0'>
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
