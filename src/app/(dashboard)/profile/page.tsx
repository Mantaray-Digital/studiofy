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

// Mock data - replace with real data from API
const mockUser = {
  name: 'Ibrahim Mahmoud',
  email: 'ibrahimmahmoud@gmail.com',
  avatarUrl: '/images/avatar.svg',
};

const mockPlan = {
  name: 'Pro Plan',
  price: 29,
  billingPeriod: 'month' as const,
  renewalDate: 'December 30, 2025',
  creditsUsed: 42,
  creditsTotal: 100,
  isActive: true,
};

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

const mockProjects = [
  {
    id: '1',
    name: 'Summer Collection',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    assetCount: 24,
    createdAt: 'Dec 15, 2024',
  },
  {
    id: '2',
    name: 'Product Shots',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    assetCount: 18,
    createdAt: 'Dec 10, 2024',
  },
  {
    id: '3',
    name: 'Brand Assets',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    assetCount: 42,
    createdAt: 'Nov 28, 2024',
  },
];

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

  const handleCancelSubscription = () => {
    // TODO: Implement subscription cancellation
    console.log('Cancel subscription clicked');
  };

  const handleManageBilling = () => {
    // TODO: Redirect to billing portal
    console.log('Manage billing clicked');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Download invoice PDF
    console.log('Download invoice:', invoiceId);
  };

  // Projects handlers
  const handleCreateProject = () => {
    // TODO: Open create project modal or navigate to create page
    console.log('Create project clicked');
  };

  const handleDeleteProject = (projectId: string) => {
    // TODO: Delete project
    console.log('Delete project:', projectId);
  };

  // Bookmarks handlers
  const handleRemoveBookmark = (bookmarkId: string) => {
    // TODO: Remove bookmark
    console.log('Remove bookmark:', bookmarkId);
  };

  const handleOpenBookmark = (url: string) => {
    // TODO: Open bookmark in new tab
    window.open(url, '_blank');
  };

  // Settings handlers
  const handleUpdateProfile = (data: { fullName: string; email: string }) => {
    // TODO: Update profile
    console.log('Update profile:', data);
  };

  const handleUpdatePassword = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // TODO: Update password
    console.log('Update password:', data);
  };

  const handleConnectAccount = (provider: string) => {
    // TODO: Connect account
    console.log('Connect account:', provider);
  };

  const handleDisconnectAccount = (provider: string) => {
    // TODO: Disconnect account
    console.log('Disconnect account:', provider);
  };

  const handleDeleteAccount = () => {
    // TODO: Delete account
    console.log('Delete account clicked');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <ProfileHeader
        name={mockUser.name}
        email={mockUser.email}
        avatarUrl={mockUser.avatarUrl}
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
                <CurrentPlanCard
                  planName={mockPlan.name}
                  price={mockPlan.price}
                  billingPeriod={mockPlan.billingPeriod}
                  renewalDate={mockPlan.renewalDate}
                  creditsUsed={mockPlan.creditsUsed}
                  creditsTotal={mockPlan.creditsTotal}
                  isActive={mockPlan.isActive}
                  onCancelSubscription={handleCancelSubscription}
                />
              </div>

              {/* Upgrade Card - takes 1/3 of the space */}
              <div className="lg:col-span-1">
                <UpgradeCard />
              </div>
            </div>
          </div>

          {/* Billing History Section */}
          <BillingHistoryTable
            invoices={mockInvoices}
            onManageBilling={handleManageBilling}
            onDownloadInvoice={handleDownloadInvoice}
          />
        </div>
      )}

      {/* Projects Tab Content */}
      {activeTab === 'projects' && (
        <div className="mt-8">
          <ProjectsGrid
            projects={mockProjects}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
          />
        </div>
      )}

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="mt-8">
          <BookmarksGrid
            bookmarks={mockBookmarks}
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
              fullName: mockUser.name,
              email: mockUser.email,
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
