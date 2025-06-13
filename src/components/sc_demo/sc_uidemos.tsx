import { useState } from 'react';
import Image from 'next/image';

const examples = [
  {
    id: 1,
    label: 'Trigger modal with subscription form with subscription product predetermined',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    label: 'Trigger modal with one off product and subscription link to Stripe hosted checkout',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    label: 'Trigger modal with signup form',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    label: 'Brevo Newsletter subscription form',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    label: 'Dynamic Pricing Based on Subscriptions in Supabase',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function SCUIDemos() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleClick = () => {
    // blank action handler
  };

  return (
    <>
      {/* Full width div holding the section */}
      <div className="w-full">
        <section id="sc_about-hero" className="relative isolate pt-12">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:py-5 lg:px-8 lg:py-16">
            <div className="mx-auto lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
                Unauthed User Function Demo
              </h1>
              <p className="font-mediu mt-8 text-pretty sm:text-xl/8 max-w-2xl">
                Useful conversion and CTA modals for unauthenticated users navigating the brochure site.  There are more demos when logged in, including subscription upsell, file upload, avatar managment.
              </p>
              {/* Flex container holding list and image side-by-side */}
              <div className="mt-10 flex flex-col lg:flex-row lg:gap-x-10">
                {/* List */}
                <ul role="list" className="space-y-3 flex-1 max-w-xl">
                  {examples.map((item) => (
                    <li
                      key={item.id}
                      className="overflow-hidden bg-white dark:bg-muted px-4 py-4 shadow sm:rounded-md sm:px-6 cursor-pointer rounded-xl"
                      onClick={handleClick}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleClick();
                        }
                      }}
                      role="button"
                      aria-pressed="false"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                {/* Image container with fade transition */}
                <div className="hidden lg:block lg:flex-1 relative">
                  {examples.map((item) => {
                    const isVisible = hoveredId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.label}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', objectFit: 'cover' }}
                          priority={isVisible}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
