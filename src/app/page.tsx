import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AuthedFeed() {

  return (
    <div className='flex flex-col gap-8 lg:gap-32'>
      <HeroSection />
    </div>
  );
}

const samplePosts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Understanding the Basics of SEO',
    href: '#',
    description:
      'Learn the fundamental principles of search engine optimization and how to apply them to your website for better visibility and traffic.',
    date: 'Apr 10, 2020',
    datetime: '2020-04-10',
    category: { title: 'SEO', href: '#' },
    author: {
      name: 'Sarah Johnson',
      role: 'SEO Specialist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1640043959259-41ba58cc3ab3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Creating Compelling Content',
    href: '#',
    description: 'Discover how to craft engaging content that resonates with your audience and drives conversions.',
    date: 'May 5, 2020',
    datetime: '2020-05-05',
    category: { title: 'Content Marketing', href: '#' },
    author: {
      name: 'Emily Davis',
      role: 'Content Strategist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'The Future of Digital Marketing',
    href: '#',
    description: 'Explore the trends shaping the future of digital marketing and how to stay ahead of the curve.',
    date: 'Jun 15, 2020',
    datetime: '2020-06-15',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'James Smith',
      role: 'Digital Marketing Manager',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1621707854626-ffa306e32745?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 5,
    title: 'Maximizing Social Media Engagement',
    href: '#',
    description: 'Learn strategies to enhance engagement on social media platforms and build a loyal community.',
    date: 'Jul 20, 2020',
    datetime: '2020-07-20',
    category: { title: 'Social Media', href: '#' },
    author: {
      name: 'Laura Wilson',
      role: 'Social Media Expert',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1617321902122-56eadd5659ba?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 6,
    title: 'Email Marketing Best Practices',
    href: '#',
    description:
      'Understand the key elements of successful email marketing campaigns and how to implement them effectively.',
    date: 'Aug 12, 2020',
    datetime: '2020-08-12',
    category: { title: 'Email Marketing', href: '#' },
    author: {
      name: 'David Brown',
      role: 'Email Marketing Manager',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 7,
    title: 'Leveraging Analytics for Growth',
    href: '#',
    description: 'Learn how to use data analytics to drive business decisions and foster growth in your organization.',
    date: 'Sep 25, 2020',
    datetime: '2020-09-25',
    category: { title: 'Analytics', href: '#' },
    author: {
      name: 'Alice Green',
      role: 'Data Analyst',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1617321902122-56eadd5659ba?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 8,
    title: 'Understanding User Experience (UX)',
    href: '#',
    description: 'Explore the principles of user experience design and how to create products that delight users.',
    date: 'Oct 30, 2020',
    datetime: '2020-10-30',
    category: { title: 'UX Design', href: '#' },
    author: {
      name: 'Mark Taylor',
      role: 'UX Designer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 9,
    title: 'Effective Branding Strategies',
    href: '#',
    description: 'Learn how to develop a strong brand identity that resonates with your target audience.',
    date: 'Nov 18,2020',
    datetime: '2020-11-18',
    category: { title: 'Branding', href: '#' },
    author: {
      name: 'Sophia Lee',
      role: 'Brand Strategist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1601887389937-0b02c26b602c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 10,
    title: 'The Art of Persuasion in Marketing',
    href: '#',
    description: 'Discover techniques for persuasive marketing that can help you close more deals.',
    date: 'Dec 22,2020',
    datetime: '2020-12-22',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Thomas Anderson',
      role: 'Marketing Consultant',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1640043959259-41ba58cc3ab3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

function HeroSection() {

  const t = useTranslations('AuthedFeed')

  return (
    <section className='relative overflow-hidden lg:overflow-visible bg-gray-800'>
      <div className='container'>
        <div className=' py-24 sm:py-32'>
          
        <h2 className='text-pretty text-4xl font-semibold tracking-tight  sm:text-5xl'>{t('title')}</h2>
              <p className='mt-2 text-lg/8 '>{t('explainer')}</p>
              <div className='mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16'>
                {samplePosts.map((post) => (
                  <article key={post.id} className='flex max-w-xl flex-col items-start justify-between border-b border-gray-300 pb-8'>
                    <div className='flex items-center gap-x-4 text-xs'>
                      <time dateTime={post.datetime} className='text-gray-500'>
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className='relative z-10 rounded-full bg-gray-600 px-3 py-1.5 font-medium  hover:bg-gray-100'
                      >
                        {post.category.title}
                      </a>
                    </div>
                    <div className='group relative'>
                      <h3 className='mt-3 text-lg/6 font-semibold  group-hover:'>
                        <a href={post.href}>
                          <span className='absolute inset-0' />
                          {post.title}
                        </a>
                      </h3>
                      <p className='mt-5 line-clamp-3  '>{post.description}</p>
                    </div>
                    <div className='relative mt-8 flex items-center gap-x-4'>
                      <Image
                        alt=""
                        src={post.author.imageUrl}
                        className="size-10 rounded-full bg-gray-600"
                        width={40}
                        height={40}
                      />
                      <div className=''>
                        <p className='font-semibold '>
                          <a href={post.author.href}>
                            <span className='absolute inset-0' />
                            {post.author.name}
                          </a>
                        </p>
                        <p className=''>{post.author.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            
        </div>
      </div>
    </section>
  );
}