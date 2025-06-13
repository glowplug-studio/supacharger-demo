import Image from 'next/image';
import Link from 'next/link';

export default function SCLegalPage() {
  return (
    <>
      <div id='sc_legal-content'>
        <div className='relative isolate mt-24 pt-12'>
          <div className='mx-auto max-w-3xl py-12'>
            <h1 className='mb-4 text-3xl font-bold'>Legal</h1>

            <nav className='mb-8 flex gap-6 border-b pb-4'>
              <Link href='#terms-of-use' className='sclink font-medium' scroll={true}>
                Terms of Use
              </Link>
              <Link href='#privacy-policy' className='sclink font-medium ' scroll={true}>
                Privacy Policy
              </Link>
              <Link href='#third-party-cookie-policy' className='sclink font-medium' scroll={true}>
                Third Party Cookie Policy
              </Link>
            </nav>

            <section id='terms-of-use' className='mb-12 scroll-mt-20'>
              <h1 className='mb-4 text-2xl font-bold'>Terms of Use</h1>
              <div className='mx-auto max-w-3xl px-4 py-12'>
                <h1 className='text-=2xl mb-4 font-bold'>Korunet Terms of Use (2025)</h1>
                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using Korunet, you agree to these Terms of Use and our Privacy Policy. If you do not
                    agree to these terms, you may not use our Services.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>2. Changes to Terms</h2>
                  <p>
                    Korunet reserves the right to modify these Terms of Use at any time. We will notify users of any
                    changes by updating the &quot;Last Updated&quot; date. Continued use of the Services after changes
                    constitutes acceptance of the new terms.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>3. Eligibility</h2>
                  <p>
                    You must be at least 16 years old to use Korunet. By using our Services, you represent and warrant
                    that you meet this age requirement.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>4. User Accounts</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>You may be required to create an account to access certain features.</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You agree to provide accurate and current information and to update it as necessary.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>5. Acceptable Use</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>Use Korunet for lawful purposes only and comply with all applicable laws.</li>
                    <li>
                      Do not post or transmit any content that is infringing, defamatory, obscene, or otherwise
                      objectionable.
                    </li>
                    <li>
                      Do not attempt to gain unauthorized access to any part of the Services or accounts of other users.
                    </li>
                    <li>Do not interfere with or disrupt the operation of the Services.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>6. Intellectual Property</h2>
                  <p>
                    All content and materials on Korunet, including but not limited to text, graphics, logos, and
                    software, are the property of Korunet or its licensors and are protected by intellectual property
                    laws. You may not use, reproduce, or distribute any content from our Services without our express
                    written permission.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>7. Third-Party Links</h2>
                  <p>
                    Korunet may contain links to third-party websites or services. We are not responsible for the
                    content, privacy policies, or practices of any third parties.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>8. Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate your access to Korunet at our discretion, without
                    notice, for conduct that we believe violates these Terms or is otherwise harmful to other users or
                    Korunet.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>9. Disclaimers</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>
                      The Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
                      kind.
                    </li>
                    <li>
                      Korunet does not guarantee the accuracy, completeness, or reliability of any content or
                      information provided through the Services.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>10. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, Korunet and its affiliates shall not be liable for any
                    indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
                    revenues, whether incurred directly or indirectly.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>11. Governing Law</h2>
                  <p>
                    These Terms of Use are governed by the laws of New Zealand. Any disputes arising from these terms or
                    your use of Korunet will be subject to the exclusive jurisdiction of the courts of New Zealand.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>12. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms of Use, please contact us at{' '}
                    <a href='mailto:support@korunet.com' className='sclink'>
                      support@korunet.com
                    </a>
                    .
                  </p>
                </section>

                <p className='mt-8 italic  '>
                  By using Korunet, you acknowledge that you have read, understood, and agree to be bound by these Terms
                  of Use.
                </p>
              </div>
            </section>

            <section id='privacy-policy' className='mb-12 scroll-mt-20'>
              <h1 className='mb-4 text-3xl font-bold'>Privacy Policy</h1>
              <div className='mx-auto max-w-3xl px-4 py-12'>
                <h1 className='mb-4 text-2xl font-bold'>Korunet Privacy Policy (2025)</h1>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>1. Introduction</h2>
                  <p>
                    At Korunet, your privacy is important to us. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our website and services.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>2. Information We Collect</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>
                      <span className='font-semibold'>Personal Information:</span> Such as your name, email address, and
                      contact details when you create an account or contact us.
                    </li>
                    <li>
                      <span className='font-semibold'>Usage Data:</span> Information about how you use our website,
                      including your IP address, browser type, device information, and pages visited.
                    </li>
                    <li>
                      <span className='font-semibold'>Cookies and Tracking Technologies:</span> We use cookies and
                      similar technologies to enhance your experience and analyze site usage.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>3. How We Use Your Information</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>To provide, operate, and maintain our services.</li>
                    <li>To improve, personalize, and expand our services.</li>
                    <li>To communicate with you, including for customer service and updates.</li>
                    <li>To analyze usage and trends to improve our website.</li>
                    <li>To comply with legal obligations and protect our rights.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>4. Sharing Your Information</h2>
                  <p>We do not sell your personal information. We may share your information with:</p>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>Service providers who help us operate our website and services.</li>
                    <li>Legal authorities if required by law or to protect our rights.</li>
                    <li>With your consent or at your direction.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>5. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to collect and use personal information about you.
                    You can control the use of cookies through your browser settings.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>6. Data Security</h2>
                  <p>
                    We use administrative, technical, and physical security measures to help protect your personal
                    information. However, no method of transmission over the internet or electronic storage is 100%
                    secure.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>7. Your Rights and Choices</h2>
                  <ul className='ml-4 list-inside list-disc'>
                    <li>You may access, update, or delete your personal information by contacting us.</li>
                    <li>You may opt out of receiving marketing emails at any time.</li>
                    <li>You may disable cookies through your browser settings.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>8. Children&apos;s Privacy</h2>
                  <p>
                    Korunet does not knowingly collect or solicit information from children under the age of 16. If you
                    believe we have collected such information, please contact us immediately.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>9. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by updating
                    the &quot;Last Updated&quot; date at the top of this page.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='mb-2 text-2xl font-semibold'>10. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                    <a href='mailto:support@korunet.com' className='sclink'>
                      support@korunet.com
                    </a>
                    .
                  </p>
                </section>

                <p className='mt-8 italic  '>
                  By using Korunet, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>

            <section id='third-party-cookie-policy' className='mb-12 scroll-mt-20'>
              <h1 className='mb-4 text-2xl font-bold'>Third Party Cookie Policy</h1>
              <p className='mb-4 '>
                We use cookies and similar technologies provided by third parties to enhance your experience and analyze
                site usage.
              </p>
            </section>

            <section className=''>
              <h2 className='mb-6 text-3xl font-bold'>Third-Party Cookie Policy</h2>
              <p className='mb-4 text-base '>
                We use cookies and similar tracking technologies provided by third parties to enhance your experience on
                our platform and to analyze how our site is used. These cookies help us understand user behavior,
                improve functionality, and deliver personalized content and advertisements.
              </p>

              <h3 className='mb-4 mt-8 text-2xl font-semibold  '>What Are Third-Party Cookies?</h3>
              <p className='mb-4 text-base '>
                Third-party cookies are set by domains other than our own. They are commonly used for analytics,
                advertising, and social media integration. These cookies allow third parties to collect information
                about your browsing activities across different websites.
              </p>

              <h3 className='mb-4 mt-8 text-2xl font-semibold  '>How We Use Third-Party Cookies</h3>
              <ul className='mb-6 list-inside list-disc space-y-2 text-base '>
                <li>
                  <strong className='font-medium'>Analytics:</strong> We use third-party analytics services to monitor
                  and analyze site traffic and usage patterns. This helps us improve our services and user experience.
                </li>
                <li>
                  <strong className='font-medium'>Advertising:</strong> Third-party advertising partners may place
                  cookies to deliver relevant ads based on your interests and browsing behavior.
                </li>
                <li>
                  <strong className='font-medium'>Social Media:</strong> Social media platforms may use cookies to
                  enable sharing features and track engagement.
                </li>
              </ul>

              <h3 className='mb-4 mt-8 text-2xl font-semibold  '>Managing Your Cookie Preferences</h3>
              <p className='mb-4 text-base '>
                You can manage or disable cookies through your browser settings. Please note that disabling certain
                cookies may affect the functionality and performance of our services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
