'use client';

import { useCallback, useState } from 'react';
import { ImageIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { UploadedFile } from '@/types/generate';

interface UploadViewProps {
  onUpload: (file: UploadedFile) => void;
}

export function UploadView({ onUpload }: UploadViewProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
        };
        onUpload(uploadedFile);
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
        };
        onUpload(uploadedFile);
      }
    },
    [onUpload]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-blue-100 flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 md:left-[69px] md:top-12 flex items-center gap-1">
        <Image
          src="/images/logo.svg"
          alt="Studiofy"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <span className="text-xl font-normal tracking-[-1px] text-black">
          Studiofy
        </span>
      </Link>

      {/* Main Content */}
      <div className="w-full max-w-[672px] flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-600">Studiofy</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-semibold text-center text-gray-900 mb-4">
          Make your product
          <br />
          <span>Shine like</span>
          <span className="text-blue-500"> magic</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-600 text-center mb-10 max-w-md">
          Create professional product photos in seconds. No studio required!
        </p>

        {/* Upload Box */}
        <div
          className={`w-full bg-white rounded-2xl shadow-lg border-2 transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-transparent'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="p-8 md:p-12 flex flex-col items-center">
            {/* Upload Icon */}
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </div>

            {/* Upload Text */}
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              Drop your product here! <span role="img" aria-label="camera">📸</span>
            </h3>
            <p className="text-sm md:text-base text-gray-500 mb-6">
              or click to choose an image to get started
            </p>

            {/* Upload Button */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-flex items-center justify-center px-16 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors">
                Upload
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-gray-500">
          Made with <span className="text-purple-500">💜</span> for creators
        </p>
      </div>
    </div>
  );
}
