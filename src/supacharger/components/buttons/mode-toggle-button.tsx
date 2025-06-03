'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MonitorCog,Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();

  const tThemeChangerMenu = useTranslations('ThemeChangerMenu');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-white dark:bg-slate-800'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-yellow-200' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
      <DropdownMenuItem className='text-xs  hover:cursor-pointer' onClick={() => setTheme('light')}>
                <Sun size={14} /> {tThemeChangerMenu('light')}
              </DropdownMenuItem>
              <DropdownMenuItem className='text-xs  hover:cursor-pointer' onClick={() => setTheme('dark')}>
                <Moon size={14} /> {tThemeChangerMenu('dark')}
              </DropdownMenuItem>
              <DropdownMenuItem className='text-xs hover:cursor-pointer' onClick={() => setTheme('system')}>
                <MonitorCog size={14} />  {tThemeChangerMenu('system')}
              </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}