'use client';

import Link from "next/link";

  
export default function  SCFooterAuthed() {
    return (
        <footer className="pt-16 pb-7 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col min-[830px]:flex-row items-center justify-between gap-6 pb-10 border-b-2 border-gray-200">
            <a href="https://pagedone.io/" className="py-1.5">
              {/* Company Logo - Removed SVG Code */}
              Pagedone
            </a>
            <ul className="flex flex-col sm:flex-row items-center gap-5 sm:gap-12">
              <li>
                <a
                  href="jaascript:;"
                  className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Pagedone
                </a>
              </li>
              <li>
                <a
                  href="jaascript:;"
                  className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="jaascript:;"
                  className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="jaascript:;"
                  className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="jaascript:;"
                  className="text-lg font-normal text-gray-800 transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-7 flex flex-col min-[520px]:flex-row items-center justify-between gap-6">
            <span className="text-sm font-normal text-gray-500">
              ©
              <a href="https://pagedone.io/">pagedone</a> 2023, All rights
              reserved.
            </span>
            {/* Social Section Removed */}
          </div>
        </div>
      </footer>
    );
 }