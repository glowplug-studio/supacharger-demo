import Carousel, { type Slide } from '@/supacharger/components/carousel';

const slides: Slide[] = [
  {
    id: 1,
    title: 'Welcome to Our Platform',
    content: `
      <p class="text-xl mb-4">Experience the next generation of web development with our cutting-edge solutions.</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Seamless Integration</li>
        <li>Advanced Features</li>
        <li>Professional Support</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: 'Powerful Features',
    slideStyle: {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1688236043405-f0382db8ad3e?w=2000)',
    },
    slideClasses: 'bg-gre-200 bg-center bg-cover',
    content: `
      <p class="text-xl mb-4">Unlock the full potential of your applications with our comprehensive toolkit.</p>
      <div class="grid grid-cols-2 gap-4">
      </div>
    `,
  },
  {
    id: 3,
    title: 'Powerful Features',
    slideClasses: 'bg-green-700',
    content: `
      <p class="text-xl mb-4">Unlock the full potential of your applications with our comprehensive toolkit.</p>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold mb-2">Development</h3>
          <p>Fast and efficient development workflow</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Deployment</h3>
          <p>Simple and reliable deployment process</p>
        </div>
      </div>
    `,
  },
  {
    id: 4,
    title: 'Get Started Today',
    slideStyle: {
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1727602483165-f9327b007a91?w=2500)',
    },
    slideClasses: 'bg-gre-200 bg-center bg-cover',
    content: `
      <p class="text-xl mb-4">Join thousands of developers who trust our platform.</p>
    `,
  },
];

export function SignupRight() {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-md bg-primary text-white'>
      <Carousel slides={slides} autoScrollInterval={5000} transitionDuration={0.5} />
      {/* <h3 className='text-2xl mb-3 font-bold'>Lorem Ipsum Dolor</h3>
    <p className="md:w-1/2">REPLACE ME. Ut dignissim sapien et varius feugiat. Praesent purus sapien, bibendum quis ipsum ac, pharetra ultricies magna. </p> */}
    </div>
  );
}
