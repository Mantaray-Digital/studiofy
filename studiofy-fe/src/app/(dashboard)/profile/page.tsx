'use client';

import { useState } from 'react';
import { ProfileHeader } from '@/components/dashboard/ProfileHeader';
import { ProfileTabs } from '@/components/dashboard/ProfileTabs';
import { CurrentPlanCard } from '@/components/dashboard/CurrentPlanCard';
import { UpgradeCard } from '@/components/dashboard/UpgradeCard';
import { BillingHistoryTable } from '@/components/dashboard/BillingHistoryTable';
import { ProjectsGrid } from '@/components/dashboard/ProjectsGrid';
import { BookmarksGrid } from '@/components/dashboard/BookmarksGrid';
import { SettingsContent } from '@/components/dashboard/SettingsContent';
import { useProjects } from '@/hooks/projects/useProjects';
import { useSubscriptionDashboard } from '@/hooks/subscriptions/useSubscriptionDashboard';
import { useProfile, useUpdateProfile, useCancelSubscription, useDownloadInvoice, useBillingHistory } from '@/hooks/profile/useProfile';
import { useBookmarks, useRemoveBookmark } from '@/hooks/profile/useBookmarks';
import { useSettings, useUpdatePassword, useConnectAccount, useDisconnectAccount, useDeleteAccount } from '@/hooks/profile/useSettings';
import { createProject, deleteProject } from '@/api/profile.api';

function formatRenewsDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' });
}

const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: 'Nov 26, 2024',
    amount: 29,
    status: 'paid' as const,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: 'Oct 26, 2024',
    amount: 29,
    status: 'paid' as const,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: 'Sep 26, 2024',
    amount: 29,
    status: 'paid' as const,
  },
];

function formatProjectDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

const mockBookmarks = [
  {
    id: '1',
    name: 'Sneaker Drop',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    url: '#',
  },
  {
    id: '2',
    name: 'Sneaker Drop',
    thumbnail: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
    url: '#',
  },
  {
    id: '3',
    name: 'Summer Collection',
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    url: '#',
  },
  {
    id: '4',
    name: 'Camera',
    thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    url: '#',
  },
];

const mockConnectedAccounts = [
  {
    provider: 'shopify',
    name: 'Shopify',
    description: 'Sync products and export images',
    icon: '/images/shopify-icon.svg',
    isConnected: true,
  },
];

type TabKey = 'dashboard' | 'projects' | 'bookmarks' | 'settings';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  // Profile data
  const profileQuery = useProfile();
  const userData = profileQuery.data?.data;
  const userName = userData ? `${userData.firstName} ${userData.lastName}` : '';
  const userEmail = userData?.email || '';
  const userId = userData?._id || '';

  // Subscription data
  const subscriptionDashboardQuery = useSubscriptionDashboard();
  const dashboardPlan = subscriptionDashboardQuery.data?.data?.plan;
  const dashboardUsage = subscriptionDashboardQuery.data?.data?.usage;

  // Projects data
  const projectsQuery = useProjects(1, 20);
  const projects =
    projectsQuery.data?.data?.data?.map((p) => ({
      id: p._id,
      name: p.name,
      thumbnail: p.thumbnail_url,
      assetCount: p.outputs?.images?.length ?? p.meta?.quantity ?? 0,
      createdAt: formatProjectDate(p.createdAt),
    })) ?? [];

  // Bookmarks data
  const bookmarksQuery = useBookmarks(1, 20);
  const bookmarks =
    bookmarksQuery.data?.data?.data?.map((b) => ({
      id: b._id,
      name: b.project?.name || 'Untitled',
      thumbnail: b.type === 'image' ? b.content : b.project?.thumbnail_url,
      url: b.content,
    })) ?? [];

  // Mutations
  const cancelSubscriptionMutation = useCancelSubscription();
  const downloadInvoiceMutation = useDownloadInvoice();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();
  const connectAccountMutation = useConnectAccount();
  const disconnectAccountMutation = useDisconnectAccount();
  const deleteAccountMutation = useDeleteAccount();
  const removeBookmarkMutation = useRemoveBookmark();

  const handleCancelSubscription = () => {
    cancelSubscriptionMutation.mutate();
  };

  const handleManageBilling = () => {
    setActiveTab('dashboard');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    downloadInvoiceMutation.mutate(invoiceId);
  };

  // Projects handlers
  const handleCreateProject = async () => {
    const name = prompt('Enter project name:');
    if (name) {
      await createProject(name);
      projectsQuery.refetch();
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId);
      projectsQuery.refetch();
    }
  };

  // Bookmarks handlers
  const handleRemoveBookmark = (bookmarkId: string) => {
    removeBookmarkMutation.mutate(bookmarkId);
  };

  const handleOpenBookmark = (url: string) => {
    window.open(url, '_blank');
  };

  // Settings handlers
  const handleUpdateProfile = (data: { fullName: string; email: string }) => {
    if (!userId) return;
    const [firstName, ...lastNameParts] = data.fullName.split(' ');
    updateProfileMutation.mutate({
      userId,
      data: {
        firstName,
        lastName: lastNameParts.join(' ') || firstName,
      },
    });
  };

  const handleUpdatePassword = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    updatePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const handleConnectAccount = (provider: string) => {
    connectAccountMutation.mutate(provider);
  };

  const handleDisconnectAccount = (provider: string) => {
    disconnectAccountMutation.mutate(provider);
  };

  const handleDeleteAccount = () => {
    if (!userId) return;
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccountMutation.mutate(userId);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <ProfileHeader
        name={userName || 'Loading...'}
        email={userEmail}
        avatarUrl={userData?.profilePic || '/images/avatar.svg'}
        isOnline={true}
      />

      {/* Profile Tabs */}
      <div className="mt-6">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div className="mt-8 space-y-8">
          {/* Current Plan Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Current Plan
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Plan Card - takes 2/3 of the space */}
              <div className="lg:col-span-2">
                {subscriptionDashboardQuery.isLoading && (
                  <div className="text-sm text-gray-600">Loading plan...</div>
                )}
                {subscriptionDashboardQuery.isError && (
                  <div className="text-sm text-red-600">Failed to load plan.</div>
                )}
                <CurrentPlanCard
                  planName={dashboardPlan?.name ?? '—'}
                  price={dashboardPlan?.price ?? 0}
                  billingPeriod="month"
                  renewalDate={dashboardPlan?.renewsDate ? formatRenewsDate(dashboardPlan.renewsDate) : '—'}
                  creditsUsed={dashboardUsage?.balance ?? 0}
                  creditsTotal={dashboardUsage?.limit ?? 0}
                  isActive={(dashboardPlan?.status ?? '').toLowerCase() === 'active'}
                  onCancelSubscription={handleCancelSubscription}
                />
              </div>

              {/* Upgrade Card - takes 1/3 of the space */}
              <div className="lg:col-span-1">
                <UpgradeCard />
              </div>
            </div>
          </div>

       
        </div>
      )}

      {/* Projects Tab Content */}
      {activeTab === 'projects' && (
        <div className="mt-8">
          {projectsQuery.isLoading && (
            <div className="text-sm text-gray-600">Loading projects...</div>
          )}
          {projectsQuery.isError && (
            <div className="text-sm text-red-600">Failed to load projects.</div>
          )}
          <ProjectsGrid
            projects={projects}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
          />
        </div>
      )}

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="mt-8">
          {bookmarksQuery.isLoading && (
            <div className="text-sm text-gray-600">Loading bookmarks...</div>
          )}
          {bookmarksQuery.isError && (
            <div className="text-sm text-red-600">Failed to load bookmarks.</div>
          )}
          <BookmarksGrid
            bookmarks={bookmarks.length > 0 ? bookmarks : mockBookmarks}
            onRemoveBookmark={handleRemoveBookmark}
            onOpenBookmark={handleOpenBookmark}
          />
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="mt-8">
          <SettingsContent
            profile={{
              fullName: userName,
              email: userEmail,
            }}
            connectedAccounts={mockConnectedAccounts}
            onUpdateProfile={handleUpdateProfile}
            onUpdatePassword={handleUpdatePassword}
            onConnectAccount={handleConnectAccount}
            onDisconnectAccount={handleDisconnectAccount}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      )}
    </div>
  );
}
