export default function SCPricingSubscription() {
  return (
    <>
      <div className='mt-10 grid gap-6 max-sm:mx-auto max-sm:max-w-sm sm:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-md bg-muted p-6 '>
          <h3 className='mb-2 text-xl font-semibold '>Starter</h3>
          <p className='text-sm text-slate-500'>For Individuals and Small Teams</p>

          <div className='mt-6'>
            <h3 className='text-2xl font-semibold '>
              $10 <sub className='text-sm font-medium text-slate-500'>per month</sub>
            </h3>
          </div>

          <div className='mt-6'>
            <h4 className='mb-2 text-lg font-semibold '>Includes</h4>
            <p className='text-sm text-slate-500'>Everything you get in this plan</p>

            <ul className='mt-6 space-y-4'>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                50 Page Unlock
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                10 GB Storage
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                6 Team Members
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited Book Mark
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited basic feature
              </li>
            </ul>

            <button
              type='button'
              className='mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
            >
              Get Started
            </button>
          </div>
        </div>

        <div className='rounded-md bg-muted p-6  '>
          <h3 className='mb-2 flex items-center text-xl font-semibold'>
            Professional{' '}
            <span className='ml-3 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-slate-800'>Best Deal</span>
          </h3>
          <p className='text-sm text-slate-500'>For Individuals and Largest Teams</p>

          <div className='mt-6'>
            <h3 className='text-2xl font-semibold '>
              $20 <sub className='text-sm font-medium text-slate-500'>per month</sub>
            </h3>
          </div>

          <div className='mt-6'>
            <h4 className='mb-2 text-lg font-semibold '>Includes</h4>
            <p className='text-sm text-slate-500'>Everything you get in this plan</p>
            <ul className='mt-6 space-y-4'>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                100 Page Unlock
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                20 GB Storage
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                8 Team Members
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited Book Mark
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited basic feature
              </li>
            </ul>

            <button
              type='button'
              className='mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
            >
              Get Started
            </button>
          </div>
        </div>

        <div className='rounded-md bg-muted p-6  '>
          <h3 className='mb-2 text-xl font-semibold '>Business</h3>
          <p className='text-sm text-slate-500'>For Multiples and Largest Teams</p>

          <div className='mt-6'>
            <h3 className='text-2xl font-semibold '>
              $100 <sub className='text-sm font-medium text-slate-500'>per month</sub>
            </h3>
          </div>

          <div className='mt-6'>
            <h4 className='mb-2 text-lg font-semibold '>Includes</h4>
            <p className='text-sm text-slate-500'>Everything you get in this plan</p>
            <ul className='mt-6 space-y-4'>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                300 Page Unlock
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                100 GB Storage
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                100 Team Members
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited Book Mark
              </li>
              <li className='flex items-center text-sm font-medium text-slate-500'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' className='mr-3 fill-green-500' viewBox='0 0 24 24'>
                  <path d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z' />
                </svg>
                Unlimited basic feature
              </li>
            </ul>

            <button
              type='button'
              className='mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary'
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
