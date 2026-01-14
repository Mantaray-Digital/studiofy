'use client';

import { useState } from 'react';
import { User, Lock, Link2 } from 'lucide-react';
import Image from 'next/image';

interface ConnectedAccount {
  provider: string;
  name: string;
  description: string;
  icon: string;
  isConnected: boolean;
}

interface SettingsContentProps {
  profile: {
    fullName: string;
    email: string;
  };
  connectedAccounts: ConnectedAccount[];
  onUpdateProfile: (data: { fullName: string; email: string }) => void;
  onUpdatePassword: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  onConnectAccount: (provider: string) => void;
  onDisconnectAccount: (provider: string) => void;
  onDeleteAccount: () => void;
}

export function SettingsContent({
  profile,
  connectedAccounts,
  onUpdateProfile,
  onUpdatePassword,
  onConnectAccount,
  onDisconnectAccount,
  onDeleteAccount,
}: SettingsContentProps) {
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePassword(passwordForm);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleProfileCancel = () => {
    setProfileForm({
      fullName: profile.fullName,
      email: profile.email,
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Information Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-[var(--color-blue-100)] flex items-center justify-center">
            <User className="w-4 h-4 text-[var(--color-blue-600)]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-11">
          Update your personal details and contact information.
        </p>

        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={profileForm.fullName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, fullName: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-500)] focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-500)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleProfileCancel}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-[var(--color-blue-100)] flex items-center justify-center">
            <Lock className="w-4 h-4 text-[var(--color-blue-600)]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-11">
          Change your password from the below inputs
        </p>

        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-500)] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-500)] focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-500)] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Connected Accounts Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-[var(--color-blue-100)] flex items-center justify-center">
            <Link2 className="w-4 h-4 text-[var(--color-blue-600)]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Connected Accounts
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-11">
          Manage third-party integrations and connections.
        </p>

        <div className="space-y-3">
          {connectedAccounts.map((account) => (
            <div
              key={account.provider}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  {account.icon ? (
                    <Image
                      src={account.icon}
                      alt={account.name}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Link2 className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {account.name}
                  </h3>
                  <p className="text-xs text-gray-500">{account.description}</p>
                </div>
              </div>

              {account.isConnected ? (
                <button
                  type="button"
                  onClick={() => onDisconnectAccount(account.provider)}
                  className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                >
                  Connected
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onConnectAccount(account.provider)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="flex justify-end">
        {showDeleteConfirm ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Are you sure?</span>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onDeleteAccount();
                setShowDeleteConfirm(false);
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
