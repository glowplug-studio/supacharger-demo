'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';
import { toast } from 'react-toastify';

import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionResponse } from '@/types/action-response';

export function AccountMenu({ signOut }: { signOut: () => Promise<ActionResponse> }) {
  const router = useRouter();

  async function handleLogoutClick() {
    const response = await signOut();

    if (response?.error) {
      toast.error('An error occurred while logging out. Please try again or contact support.');
    } else {
      router.refresh();

      toast.success('You have been logged out.');
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
      
      </DropdownMenuTrigger>
      <DropdownMenuContent className='me-4'>
        <DropdownMenuItem asChild>
          <Link href='/profile'>
            <CircleUserRound size="14" className='mr-2' />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/account'>
            <Settings size="14" className='mr-2' />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>
          <LogOut size="14" className='mr-2' />
          Log Out
        </DropdownMenuItem>
        <DropdownMenuArrow className='me-4 fill-white' />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
