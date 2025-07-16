'use client';

import { Camera, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/events" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Camera className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">SnapScreen</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/events" className="text-gray-700 hover:text-gray-900 transition-colors">
                Events
              </Link>
              <Link href="/events/event-detail" className="text-gray-700 hover:text-gray-900 transition-colors">
                Event Detail
              </Link>
              <span className="text-gray-400 cursor-not-allowed">
                Account
              </span>
              <span className="text-gray-400 cursor-not-allowed">
                Billing
              </span>
            </nav>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}