'use client';

import { X, ChevronDown } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
}

interface HistorySection {
  title: string;
  count: number;
  items: HistoryItem[];
  isExpanded: boolean;
}

const historyData: HistorySection[] = [
  {
    title: 'Today',
    count: 12,
    isExpanded: true,
    items: [
      { id: '1', title: 'create a professional style with this image' },
      { id: '2', title: 'Hacking FBI server with linux' },
      { id: '3', title: 'How to get rich from youtube as an influencer' },
      { id: '4', title: 'Help me with web development tasks from client' },
      { id: '5', title: 'REACT NEXTJS Tutorial' },
    ],
  },
  {
    title: 'Previous 7 Days',
    count: 118,
    isExpanded: true,
    items: [
      { id: '6', title: 'Mobile app prototypes library' },
      { id: '7', title: 'ROM Types and uses' },
      { id: '8', title: 'Fix SSL/TLS Error' },
      { id: '9', title: 'Platform template for developers' },
      { id: '10', title: 'Mobile development with golang' },
    ],
  },
];

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem?: (item: HistoryItem) => void;
}

export function HistorySidebar({ isOpen, onClose, onSelectItem }: HistorySidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Transparent click overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dropdown Popup */}
      <div className="fixed top-22 right-14 w-[360px] max-w-[90vw] max-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-xl border border-gray-200 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {historyData.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-base font-medium text-gray-900">{section.title}</h3>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span>{section.count} Total</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Section Items */}
              {section.isExpanded && (
                <div className="pb-2">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectItem?.(item)}
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <p className="text-sm text-gray-700 truncate group-hover:text-gray-900">
                        {item.title}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
