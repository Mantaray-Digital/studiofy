'use client';

import { Heart, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Bookmark {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

interface BookmarksGridProps {
  bookmarks: Bookmark[];
  onRemoveBookmark: (bookmarkId: string) => void;
  onOpenBookmark: (url: string) => void;
}

export function BookmarksGrid({
  bookmarks,
  onRemoveBookmark,
  onOpenBookmark,
}: BookmarksGridProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
        <p className="text-sm text-gray-500">
          Items you bookmark will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <div className="aspect-square bg-gray-100 relative">
            <Image
              src={bookmark.thumbnail}
              alt={bookmark.name}
              fill
              className="object-cover"
            />

            {/* Heart Icon Overlay */}
            <button
              type="button"
              onClick={() => onRemoveBookmark(bookmark.id)}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors group"
            >
              <Heart className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Info Footer */}
          <div className="px-3 py-2.5 flex items-center justify-between border-t border-gray-100">
            <span className="text-sm font-medium text-gray-900 truncate flex-1">
              {bookmark.name}
            </span>
            <button
              type="button"
              onClick={() => onOpenBookmark(bookmark.url)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors ml-2"
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
