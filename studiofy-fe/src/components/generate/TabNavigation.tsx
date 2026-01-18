'use client';

import { useState } from 'react';
import { Sparkles, FolderOpen } from 'lucide-react';

type Tab = 'generate' | 'projects';

interface TabNavigationProps {
  defaultTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function TabNavigation({ defaultTab = 'generate', onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="inline-flex items-center bg-white rounded-full p-2 shadow-sm border border-gray-100">
      <button
        type="button"
        onClick={() => handleTabClick('generate')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
          activeTab === 'generate'
            ? 'bg-blue-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Generate</span>
      </button>

      <button
        type="button"
        onClick={() => handleTabClick('projects')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
          activeTab === 'projects'
            ? 'bg-blue-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <FolderOpen className="w-4 h-4" />
        <span className="text-sm font-medium">Projects</span>
      </button>
    </div>
  );
}
