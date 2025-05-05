'use client';

import { Globe } from  'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
    const handleLocaleChange = (locale: string) => {
        document.cookie = `supacharger_locale=${locale}; path=/`;
        window.location.reload(); // Reload to apply new locale
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'><Globe size={16} className="inline-block" /> {currentLocale === 'en' ? 'EN' : 'FR'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
                <span className='mr-2'>&#x1F1EC;&#x1F1E7;</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange('fr')}>
                <span className='mr-2'>&#x1F1EB;&#x1F1F7;</span> Français
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}