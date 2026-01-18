'use client';

import Image from 'next/image';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useStyles } from '@/hooks/styles/useStyles';
import { Style } from '@/types/styles.types';

// Gradient mappings for styles without thumbnails
const STYLE_GRADIENTS: Record<string, string> = {
  professional: 'from-slate-600 to-slate-900',
  classy: 'from-stone-500 to-stone-700',
  solid: 'from-blue-600 to-indigo-700',
  lifestyle: 'from-orange-400 to-pink-500',
  'luxury dark marble': 'from-slate-700 to-slate-900',
  'neon glow': 'from-pink-500 to-purple-600',
  'nature fresh': 'from-green-400 to-emerald-600',
  'minimalist white': 'from-gray-200 to-gray-400',
};

// Description mappings for styles
const STYLE_DESCRIPTIONS: Record<string, string> = {
  professional: 'Clean, corporate, and trustworthy',
  classy: 'Elegant, sophisticated, and minimal',
  solid: 'Bold colors and strong contrast',
  lifestyle: 'Natural, candid, and dynamic',
  'luxury dark marble': 'Premium dark aesthetics with gold accents',
  'neon glow': 'Futuristic cyberpunk vibes',
  'nature fresh': 'Organic and eco-friendly feel',
  'minimalist white': 'Clean Scandinavian simplicity',
};

function getGradient(styleName: string): string {
  const key = styleName.toLowerCase();
  return STYLE_GRADIENTS[key] || 'from-blue-500 to-blue-600';
}

function getDescription(styleName: string): string {
  const key = styleName.toLowerCase();
  return STYLE_DESCRIPTIONS[key] || 'High-quality product photography';
}

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
  const { data: stylesResponse, isLoading, isError } = useStyles();
  const styles = stylesResponse?.data ?? [];

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

          {/* Loading/Error States */}
          {isLoading && (
            <div className="text-center text-sm text-gray-500 py-8">Loading styles...</div>
          )}
          {isError && (
            <div className="text-center text-sm text-red-500 py-8">Failed to load styles</div>
          )}

          {/* Style Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[896px] mx-auto">
            {styles.map((style: Style) => (
              <button
                key={style._id}
                type="button"
                onClick={() => handleSelectStyle(style._id)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm border transition-all hover:shadow-lg hover:scale-[1.02] text-left ${
                  selectedStyle === style._id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-slate-100'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-[120px] overflow-hidden rounded-xl m-4 mb-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getGradient(style.name)} flex items-center justify-center`}
                  >
                    {style.thumbnailUrl ? (
                      <Image
                        src={style.thumbnailUrl}
                        alt={style.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    {/* Overlay with style name */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{style.name}</span>
                    </div>
                    {/* Premium badge */}
                    {style.isPremium && (
                      <div className="absolute top-2 right-2 bg-amber-400 rounded-full px-2 py-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-white text-[10px] font-semibold">PRO</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-4 pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-slate-900">{style.name}</h3>
                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-4">
                    {getDescription(style.name)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
