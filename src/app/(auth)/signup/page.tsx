'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { User, Mail, LockKeyhole, Eye, EyeOff, CircleUser } from 'lucide-react';
import {
  RegisterInput,
  RegisterInputFull,
  registerSchema,
} from '@/schema/auth/signup.schema';
import { useSignUp } from '@/hooks/auth/useSignUp';
import authBg from '@/assets/Image (1).png';
import logo from '@/assets/logo.png';

export default function RegisterForm() {
  const { register: createRegister, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterInputFull>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');
  
  // Auto-fill confirmPassword to match password since it's not shown in the design
  useEffect(() => {
    if (password) {
      setValue('confirmPassword', password);
    }
  }, [password, setValue]);

  const onSubmit = (data: RegisterInputFull) => {
    const payload: RegisterInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    createRegister(payload);
  };

  const [showPassword, setShowPassword] = useState(false);

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
        <div className='relative z-10 flex flex-1 items-center justify-center px-4 pt-24 pb-10'>
          <div className='w-full max-w-3xl'>
            <div className='rounded-2xl bg-white p-8 shadow-xl'>
              {/* Header */}
              <div className='mb-6'>
                <h2 className='mb-4 text-center text-lg font-medium text-gray-900'>
                  Register with:
                </h2>
                
                {/* Google Sign Up Button */}
                <button
                  type='button'
                  className='mb-6 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-200 px-4 py-3 text-gray-700 transition-colors cursor-pointer'>
                  <img
                    src='/google-logo.svg'
                    alt='Google'
                    className='h-5 w-5'
                  />
                  <span className='font-medium'>Google</span>
                </button>

                {/* OR Divider */}
                <div className='mb-6 flex items-center gap-3'>
                  <div className='h-px flex-1 bg-gray-200' />
                  <div className='text-sm text-gray-400'>Or</div>
                  <div className='h-px flex-1 bg-gray-200' />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* First Name and Last Name - Side by Side */}
                <div className='grid grid-cols-2 gap-4'>
                  {/* First Name */}
                  <div>
                    <label className='mb-1 block text-sm font-medium text-gray-700'>
                      First Name
                    </label>
                    <div className='relative'>
                      <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center '>
                        <img
                          src='/firstName-Icon.svg'
                          alt='First Name Icon'
                          className='h-5 w-5'
                        />
                      </span>
                      <input
                        {...register('firstName')}
                        placeholder='First Name'
                        className={`block w-full rounded-lg border p-2.5 pl-10 text-sm focus:ring-2 focus:ring-[#2563EB] bg-gray-200 focus:outline-none ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className='mb-1 block text-sm font-medium text-gray-700'>
                      Last Name
                    </label>
                    <div className='relative'>
                      <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
                        <img
                          src='/lastName-Icon.svg'
                          alt='Last Name Icon'
                          className='h-5 w-5'
                        />
                      </span>
                      <input
                        {...register('lastName')}
                        placeholder='Last Name'
                        className={`block w-full rounded-lg border p-2.5 pl-10 text-sm focus:ring-2 focus:ring-[#2563EB] bg-gray-200 focus:outline-none ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
                      <CircleUser className='h-5 w-5 text-gray-600' />
                    </span>
                    <input
                      type='text'
                      placeholder='Username'
                        className='block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm focus:ring-2 focus:ring-[#2563EB] bg-gray-200 focus:outline-none'
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
                      <Mail className='h-5 w-5 text-gray-600' />
                    </span>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
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

                {/* Password */}
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <div className='relative'>
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
                      <LockKeyhole className='h-5 w-5 text-gray-600' />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      placeholder='Password'
                      className={`block w-full rounded-lg border p-2.5 pl-10 pr-10 text-sm bg-gray-200 focus:ring-2 focus:ring-[#2563EB] focus:outline-none ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500'>
                      {showPassword ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                  <p className='mt-1 text-xs text-gray-500'>
                    Minimum length is 8 characters.
                  </p>
                  {errors.password && (
                    <p className='mt-1 text-xs text-red-600'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password - Hidden but kept for validation */}
                <input
                  type='password'
                  {...register('confirmPassword')}
                  className='hidden'
                />
                {errors.confirmPassword && (
                  <p className='text-xs text-red-600'>
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Sign Up Button */}
                <button
                  type='submit'
                  disabled={isPending}
                  className="
    w-full
    rounded-full
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
                  {isPending ? 'Signing Up...' : 'Sign Up'}
                </button>

                {/* Footer Link */}
                <p className='mt-4 text-center text-sm text-gray-600'>
                  Already have an account?{' '}
                  <Link href='/login' className='font-medium text-[#2563EB] hover:underline'>
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='relative z-10 mt-auto border-t border-white/10 px-6 py-4'>
          <div className='mx-auto flex max-w-8xl flex-col items-center justify-between gap-4 md:flex-row'>
            <p className='text-sm text-white/80'>
              © 2025 Studiofy, All rights reserved.
            </p>
            <div className='flex flex-wrap items-center gap-4 text-sm text-white/80'>
              <Link href='#' className='hover:text-white'>
                Imprint
              </Link>
              <Link href='#' className='hover:text-white'>
                Contact
              </Link>
              <Link href='#' className='hover:text-white'>
                Terms of Service
              </Link>
              <Link href='#' className='hover:text-white'>
                License
              </Link>
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
