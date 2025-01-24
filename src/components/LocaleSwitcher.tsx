'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from  'lucide-react'


export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
    const handleLocaleChange = (locale: string) => {
        document.cookie = `supacharger_locale=${locale}; path=/`;
        window.location.reload(); // Reload to apply new locale
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'><Languages size={18} className="inline" /> {currentLocale === 'en' ? 'EN' : 'FR'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange('fr')}>
                    Français
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}