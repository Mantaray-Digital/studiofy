'use client';

import { ChevronRight, Briefcase, Gem, Square, Palmtree, Plus } from 'lucide-react';

interface Style {
  id: string;
  name: string;
  gradient: string;
  icon: React.ReactNode;
}

const styles: Style[] = [
  {
    id: 'professional',
    name: 'Professional',
    gradient: 'from-red-500 to-red-600',
    icon: <Briefcase className="w-8 h-8 text-white" />,
  },
  {
    id: 'classy',
    name: 'Classy',
    gradient: 'from-amber-500 to-amber-600',
    icon: <Gem className="w-8 h-8 text-white" />,
  },
  {
    id: 'solid',
    name: 'Solid',
    gradient: 'from-gray-400 to-gray-500',
    icon: <Square className="w-8 h-8 text-white" />,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    gradient: 'from-emerald-500 to-teal-600',
    icon: <Palmtree className="w-8 h-8 text-white" />,
  },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  onOpenModal?: () => void;
}

export function StyleSelector({ selectedStyle, onStyleChange, onOpenModal }: StyleSelectorProps) {
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
        {styles.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onStyleChange(style.id)}
            className={`shrink-0 flex flex-col items-center gap-2 transition-all ${
              selectedStyle === style.id ? 'scale-105' : ''
            }`}
          >
            <div
              className={`relative w-[85px] h-[85px] rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center bg-linear-to-br ${style.gradient} shadow-md ${
                selectedStyle === style.id
                  ? 'border-blue-500 ring-2 ring-blue-200/50 shadow-lg'
                  : 'border-white/30'
              }`}
            >
              {style.icon}
            </div>
            <span
              className={`text-[11px] font-medium transition-colors ${
                selectedStyle === style.id ? 'text-blue-600' : 'text-gray-600'
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
