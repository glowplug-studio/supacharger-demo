'use client';

/** ========== 
 * 
 * Supacharger - Login User Form
 * 
 * ========== */

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { loginUser } from '../../../app/(supacharger)/auth-actions';
import { toast } from 'react-toastify';
import { supabaseErrorCodeLocalisation } from '../../utils/helpers'

export function LoginUserForm() {
  
  const tAuthTerms = useTranslations('AuthTerms');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await loginUser(formData);
    if (result?.error) {
      setIsLoading(false);
      toast.error( tSupabaseErrorCodes( supabaseErrorCodeLocalisation(result.error) ) ); // Display error toast
      return false; // Prevent form reset
    }
    setIsLoading(false);
    toast.success(tAuthTerms('loginSuccess')); // Display success toast
  }

  // async function handleOAuthClick(provider: 'google' | 'github') {
  //   setPending(true);
  //   const response = await signInWithOAuth(provider);

  //   if (response?.error) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'An error occurred while authenticating. Please try again.',
  //     });
  //     setPending(false);
  //   }
  // }

  return (
    <>
    {/* <div className='flex flex-col gap-4'>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-cyan-500 py-4 font-medium text-black transition-all hover:bg-cyan-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('google')}
          disabled={pending}
        >
       
          Continue with Google
        </button>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-fuchsia-500 py-4 font-medium text-black transition-all hover:bg-fuchsia-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('github')}
          disabled={pending}
        >
    
          Continue with GitHub
        </button>

        <Collapsible open={emailFormOpen} onOpenChange={setEmailFormOpen}>
          <CollapsibleTrigger asChild>
            <button
              className='text-neutral6 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 py-4 font-medium transition-all hover:bg-zinc-800 disabled:bg-neutral-700 disabled:text-black'
              disabled={pending}
            >
              Continue with Email
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='mt-[-2px] w-full rounded-b-md bg-zinc-900 p-8'>
              
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div> */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(new FormData(e.currentTarget));
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {tAuthTerms('emailAddress')}
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {tAuthTerms('password')}
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500"
          />
          <label htmlFor="remember-me" className="block text-sm text-gray-700">
            {tAuthTerms('rememberMe')}
          </label>
        </div>
        <a href="#" className="text-sm font-semibold  hover:text-indigo-500">
          {tAuthTerms('forgotPassword')}
        </a>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn bg-primary flex w-full justify-center rounded-md text-white"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {tAuthTerms('logIn')}
            </>
          ) : (
            tAuthTerms('logIn')
          )}
        </button>
      </div>
    </form>
    </>
  );
}