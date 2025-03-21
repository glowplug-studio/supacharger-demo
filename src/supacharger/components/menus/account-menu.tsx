'use client';

import Link from 'next/link';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';
import LogoutButton from '@/supacharger/components/buttons/logoutButton';

import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionResponse } from '@/types/action-response';

export function AccountMenu() {


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
        <LogoutButton >
          <LogoutButton className='btn bg-pink-400 mr-2' />
          Log Out
        </LogoutButton>
        <DropdownMenuArrow className='me-4 fill-white' />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
