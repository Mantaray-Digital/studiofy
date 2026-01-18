'use client';

import Image from 'next/image';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export function ProfileHeader({
  name,
  email,
  avatarUrl = '/images/avatar.svg',
  isOnline = true,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Avatar with online indicator */}
      <div className="relative">
        <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
          <Image
            src={avatarUrl}
            alt={name}
            width={82}
            height={82}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Online indicator */}
        {isOnline && (
          <div className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Name and Email */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          {name}
        </h1>
        <p className="text-sm md:text-base text-gray-500">{email}</p>
      </div>
    </div>
  );
}
