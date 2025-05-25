import Link from 'next/link';

//import SiteLogoSVG from "@/assets/images/SiteLogoSVG.svg";
export default function SCMarketngLanding() {
  return (
    <>
      <section id='hero'>
        <div className='relative isolate pt-14'>
          <div className='py-12 sm:py-16 lg:pb-12'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl text-center'>
                <h1 className='text-balance text-5xl font-semibold tracking-tight sm:text-7xl'>
                  Connect and grow together
                </h1>
                <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat.
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                  <Link href='#' className='btn bg-primary'>
                    Get started
                  </Link>
                  <a href='#' className='text-sm/6 font-semibold text-gray-800'>
                    Learn more <span aria-hidden='true'>→</span>
                  </a>
                </div>
              </div>

              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <img
                    alt='App screenshot'
                    src='/images/sample/sample-marketing-desktop-hero.webp'
                    width={2432}
                    height={1442}
                    className='rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='sm:py-12'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <h2 className='text-center text-lg/8 font-semibold text-gray-700'>
                Connecting 10,000 companies worldwide
              </h2>
              <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center justify-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
                <img
                  alt='Transistor'
                  src='https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg'
                  width={158}
                  height={48}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                />
                <img
                  alt='Reform'
                  src='https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg'
                  width={158}
                  height={48}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                />
                <img
                  alt='Tuple'
                  src='https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg'
                  width={158}
                  height={48}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                />
                <img
                  alt='SavvyCal'
                  src='https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg'
                  width={158}
                  height={48}
                  className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
                />
                <img
                  alt='Statamic'
                  src='https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg'
                  width={158}
                  height={48}
                  className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section >
        <div className='container mx-auto px-4'>
          <div className='px-4 py-32 sm:px-24'>
            <p className='text-sweetGreen-300 mb-4 text-xs uppercase tracking-widest'>HOW IT WORKS</p>
            <h1 className='font-heading mb-20 text-4xl font-bold text-primary md:text-5xl'>
              Plant the seeds of growth
            </h1>
            <div className='-m-4 flex flex-wrap items-center'>
              <div className='w-full p-4 lg:w-1/3'>
                <div className='mb-10'>
                  <div className='mb-2 flex flex-wrap gap-2'>
                    <div className='h-6 w-6 rounded-full bg-secondary p-px'>
                      <div className='bg-greenSecondary-900 rounded-full p-1'>
                        <p className='text-center text-xs font-semibold text-white'>1</p>
                      </div>
                    </div>
                    <p className='text-lg font-semibold text-primary'>Input Transactions</p>
                  </div>
                  <p className='max-w-xs  text-opacity-70'>
                  Donec laoreet dolor non felis luctus tincidunt eget nec ex. Etiam nec ante vel sapien pulvinar ornare.
                  </p>
                </div>
                <div className='mb-10'>
                  <div className='mb-2 flex flex-wrap gap-2'>
                    <div className='h-6 w-6 rounded-full bg-secondary p-px'>
                      <div className='bg-greenSecondary-900 rounded-full p-1'>
                        <p className='text-center text-xs font-semibold text-white'>2</p>
                      </div>
                    </div>
                    <p className='text-lg font-semibold text-primary'>Categorization</p>
                  </div>
                  <p className='max-w-xs text-opacity-70'>
                  Nunc egestas sed lectus eget faucibus.
                  </p>
                </div>
                <div className='mb-2 flex flex-wrap gap-2'>
                  <div className='h-6 w-6 rounded-full bg-secondary p-px'>
                    <div className='bg-greenSecondary-900 rounded-full p-1'>
                      <p className='text-center text-xs font-semibold text-white'>3</p>
                    </div>
                  </div>
                  <p className='text-lg font-semibold text-primary'>Generate Reports</p>
                </div>
                <p className='max-w-xs text-opacity-70'>
                Duis hendrerit, arcu ut vehicula sollicitudin, eros tortor mollis sapien, eu tincidunt est velit in ligula. Nunc dscelerisque.
                </p>
              </div>
              <div className='w-full p-4 lg:w-2/3'>
                <img
                  className='w-full rounded-3xl object-cover'
                  style={{ height: '600px' }}
                  src='/images/sample/sample-marketing-app-muli.webp'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
