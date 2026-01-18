'use client';

import Image from 'next/image';
import { ChevronRight, Plus, Sparkles } from 'lucide-react';
import { useStyles } from '@/hooks/styles/useStyles';
import { Style } from '@/types/styles.types';

// Gradient mappings for styles without thumbnails
const STYLE_GRADIENTS: Record<string, string> = {
  professional: 'from-red-500 to-red-600',
  classy: 'from-amber-500 to-amber-600',
  solid: 'from-gray-400 to-gray-500',
  lifestyle: 'from-emerald-500 to-teal-600',
  'luxury dark marble': 'from-slate-700 to-slate-900',
  'neon glow': 'from-pink-500 to-purple-600',
  'nature fresh': 'from-green-400 to-emerald-600',
  'minimalist white': 'from-gray-100 to-gray-300',
};

function getGradient(styleName: string): string {
  const key = styleName.toLowerCase();
  return STYLE_GRADIENTS[key] || 'from-blue-500 to-blue-600';
}

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  onOpenModal?: () => void;
}

export function StyleSelector({ selectedStyle, onStyleChange, onOpenModal }: StyleSelectorProps) {
  const { data: stylesResponse, isLoading, isError } = useStyles();
  const styles = stylesResponse?.data ?? [];

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Choose your style</span>
        <div className="flex items-center gap-1">
          {onOpenModal && (
            <button
              type="button"
              onClick={onOpenModal}
              className="p-1 hover:bg-blue-50 bg-blue-100/50 rounded transition-colors"
              aria-label="Browse all styles"
            >
              <Plus className="w-4 h-4 text-blue-500" />
            </button>
          )}
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Skip"
          >
            <ChevronRight className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Style Cards */}
      <div className="flex gap-3 overflow-x-auto py-2 -mx-1 px-1 scrollbar-hide">
        {isLoading && (
          <div className="text-sm text-gray-500">Loading styles...</div>
        )}
        {isError && (
          <div className="text-sm text-red-500">Failed to load styles</div>
        )}
        {styles.map((style: Style) => (
          <button
            key={style._id}
            type="button"
            onClick={() => onStyleChange(style._id)}
            className={`shrink-0 flex flex-col items-center gap-2 transition-all ${
              selectedStyle === style._id ? 'scale-105' : ''
            }`}
          >
            <div
              className={`relative w-[85px] h-[85px] rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center shadow-md ${
                selectedStyle === style._id
                  ? 'border-blue-500 ring-2 ring-blue-200/50 shadow-lg'
                  : 'border-white/30'
              }`}
            >
              {style.thumbnailUrl ? (
                <Image
                  src={style.thumbnailUrl}
                  alt={style.name}
                  fill
                  className="object-cover"
                  sizes="85px"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(style.name)}`} />
              )}
              {/* Premium badge */}
              {style.isPremium && (
                <div className="absolute top-1 right-1 bg-amber-400 rounded-full p-0.5">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              )}
              {/* Style name overlay */}
              <span className="relative z-10 text-white text-xs font-bold drop-shadow-lg">
                {style.name.split(' ')[0]}
              </span>
            </div>
            <span
              className={`text-[11px] font-medium transition-colors ${
                selectedStyle === style._id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {style.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
