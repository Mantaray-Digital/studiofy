'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string | null;
  alt?: string;
}

export function ImagePreview({ imageUrl, alt = 'Product image' }: ImagePreviewProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25));
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Image Container */}
      <div className="relative w-full max-w-[930px] aspect-[3/2] bg-gray-100 rounded-2xl overflow-hidden">
        {imageUrl ? (
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 930px"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image selected</p>
          </div>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="mt-6 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-2 py-1">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= 25}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <div className="px-3 py-1 min-w-[60px] text-center">
          <span className="text-sm font-medium text-gray-700">{zoom}%</span>
        </div>
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= 200}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
