'use client';

import { Plus, Folder, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  thumbnail?: string;
  assetCount: number;
  createdAt: string;
}

interface ProjectsGridProps {
  projects: Project[];
  onCreateProject?: () => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsGrid({
  projects,
  onCreateProject,
  onDeleteProject,
}: ProjectsGridProps) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (projectId: string) => {
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Create New Project Card */}
      <button
        type="button"
        onClick={() => {
          onCreateProject?.();
          router.push('/generate');
        }}
        className="group relative aspect-4/3 rounded-xl border-2 border-dashed border-gray-300 bg-white hover:border-blue-600 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3"
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
          <Plus className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
        </div>
        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
          Create New Project
        </span>
      </button>

      {/* Project Cards */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <div className="aspect-4/3 bg-gray-100 relative">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Folder className="w-12 h-12 text-gray-300" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {project.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {project.assetCount} assets • {project.createdAt}
                </p>
              </div>

              {/* Menu Button */}
              <div className="relative">
          

                {/* Dropdown Menu */}
                {openMenuId === project.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenMenuId(null)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteProject(project.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
