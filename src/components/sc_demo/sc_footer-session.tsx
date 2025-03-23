'use client';

import Link from "next/link";

import { SC_CONFIG } from "@/supacharger/supacharger-config";

  
export default function  SCFooterAuthed() {
    return (
        <footer className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col min-[830px]:flex-row items-center justify-between gap-6 pb-4 border-b border-gray-700 text-sm font-normal">
          <Link href="/#" className="color: text-gray-500">Terms & Conditons</Link>
          <Link href="/#" className="color: text-gray-500">Fair Use Policy</Link>
          </div>
          <div className="pt-7 flex flex-col min-[520px]:flex-row items-center justify-between gap-6">
            <span className="text-sm font-normal text-gray-500">
              &copy; <Link href="/" className="color: text-gray-500">{ SC_CONFIG.SITE_TITLE }</Link> 2023, All rights reserved.
            </span>
            {/* Social Section Removed */}
          </div>
        </div>
      </footer>
    );
 }