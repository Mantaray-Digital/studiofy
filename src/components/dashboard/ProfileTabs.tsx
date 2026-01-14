'use client';

import { LayoutGrid, FolderOpen, Bookmark, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabKey = 'dashboard' | 'projects' | 'bookmarks' | 'settings';

interface ProfileTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="w-full border-b border-gray-200">
      <nav className="flex items-center gap-6 md:gap-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                'flex items-center gap-2 py-4 relative transition-colors',
                isActive
                  ? 'text-[var(--color-blue-600)]'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-sm md:text-base font-medium">{tab.label}</span>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-blue-600)]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
