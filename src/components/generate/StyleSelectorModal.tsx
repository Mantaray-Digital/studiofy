'use client';

import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  image: string;
  gradient: string;
}

const styleOptions: StyleOption[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, corporate, and trustworthy',
    image: '/images/styles/professional.jpg',
    gradient: 'from-slate-600 to-slate-900',
  },
  {
    id: 'classy',
    name: 'Classy',
    description: 'Elegant, sophisticated, and minimal',
    image: '/images/styles/classy.jpg',
    gradient: 'from-stone-500 to-stone-700',
  },
  {
    id: 'solid',
    name: 'Solid',
    description: 'Bold colors and strong contrast',
    image: '/images/styles/solid.jpg',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Natural, candid, and dynamic',
    image: '/images/styles/lifestyle.jpg',
    gradient: 'from-orange-400 to-pink-500',
  },
];

interface StyleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle: (styleId: string) => void;
  selectedStyle?: string;
}

export function StyleSelectorModal({
  isOpen,
  onClose,
  onSelectStyle,
  selectedStyle,
}: StyleSelectorModalProps) {
  if (!isOpen) return null;

  const handleSelectStyle = (styleId: string) => {
    onSelectStyle(styleId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-slate-50 w-full max-w-[1036px] max-h-[90vh] overflow-y-auto rounded-none shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Studiofy"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-normal tracking-tight text-black">Studiofy</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-b from-white/20 to-blue-100/20 px-8 py-12">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose your style</h2>
            <p className="text-sm text-slate-500">
              Select a preset to get started with your generation
            </p>
          </div>

          {/* Style Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[896px] mx-auto">
            {styleOptions.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleSelectStyle(style.id)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm border transition-all hover:shadow-lg hover:scale-[1.02] text-left ${
                  selectedStyle === style.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-slate-100'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-[120px] overflow-hidden rounded-xl m-4 mb-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${style.gradient} flex items-center justify-center`}
                  >
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={(e) => {
                        // Hide the image if it fails to load, show gradient background
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Overlay with style name */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{style.name}</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-4 pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-slate-900">{style.name}</h3>
                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-4">{style.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
