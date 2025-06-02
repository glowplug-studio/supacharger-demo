'use client';
import Link from 'next/link';
import {
  CreditCard, LogOut, Settings, User
} from 'lucide-react';

import LogoutButton from '@/supacharger/components/buttons/logout-button';

export default function SCAccountMenu() {
  const username = "jollyrogger";

  return (
    <div className="dropdown-container relative">
      <button className="dropdown-trigger flex items-center rounded-md px-2 py-1">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">JD</span>
        </div>
      </button>

      {/* Dropdown Content */}
      <div className="dropdown-content absolute right-0 mt-1 w-56 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
        {/* Username at the top with divider */}
        <div className="px-4 py-2 mb-1">
          <p className="font-medium text-gray-900">@{username}</p>
        </div>
        <div className="my-1 border-t border-gray-200"></div>

        <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <Settings size={18} /> Account Settings
        </Link>
        <Link href={`/profile/${username}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <User size={18} /> My Profile
        </Link>
        <Link href="/account/billing" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <CreditCard size={18} /> Billing
        </Link>
        <div className="my-1 border-t border-gray-200"></div>

        <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
          <LogOut size={18} />
          <LogoutButton className="p-0 bg-transparent m-0 text-sm text-gray-700 hover:bg-gray-10 transition-colors">
            Log Out
          </LogoutButton>
        </div>

      </div>
    </div>
  );
}
