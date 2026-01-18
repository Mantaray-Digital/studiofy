'use client';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function GoogleAuth() {
  

  const finalUrl = process.env.NEXT_PUBLIC_GOOGLE_SIGN_WEBHOOK || '';

  return (
    <div className='relative'>
      <Link href={finalUrl} target='_self'>
        <Button
          type='button'
          className='cursor-pointer bg-white hover:bg-gray-50'>
          <Image src='/google.svg' alt='Google' width={18} height={18} />
          <span className='text-sm text-black'>Google</span>
        </Button>
      </Link>
    </div>
  );
}
