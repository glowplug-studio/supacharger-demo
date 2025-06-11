import Stripe from 'stripe';

import { upsertUserSubscription } from '@/features/account/controllers/upsert-user-subscription';
import { upsertPrice } from '@/features/pricing/controllers/upsert-price';
import { upsertProduct } from '@/features/pricing/controllers/upsert-product';
import { stripeAdmin } from '@/lib/stripe/stripe-admin';
import { sendReceiptEmail } from '@/lib/brevo';
import { getEnvVar } from '@/supacharger/utils/helpers';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing
  },
};

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
]);

export async function POST(req: Request) {
  const arrayBuffer = await req.arrayBuffer();
  const rawBody = Buffer.from(arrayBuffer).toString('utf8');

  const sig = req.headers.get('stripe-signature');
  const webhookSecret = getEnvVar(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET');

  if (!sig || !webhookSecret) {
    return new Response('Missing Stripe signature or webhook secret', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripeAdmin.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProduct(event.data.object as Stripe.Product);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPrice(event.data.object as Stripe.Price);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await upsertUserSubscription({
            subscriptionId: subscription.id,
            customerId: subscription.customer as string,
            isCreateAction: false,
          });
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            await upsertUserSubscription({
              subscriptionId: checkoutSession.subscription as string,
              customerId: checkoutSession.customer as string,
              isCreateAction: true,
            });
          }
          break;
        case 'invoice.payment_succeeded':
          const invoice = event.data.object as Stripe.Invoice;
          
          if (invoice.customer && invoice.customer_email) {
            try {
              const customer = await stripeAdmin.customers.retrieve(invoice.customer as string) as Stripe.Customer;
              const nameParts = customer.name?.split(' ') || [];
              const firstName = (nameParts[0] || 'Customer') as string;
              
              await sendReceiptEmail({
                to: invoice.customer_email,
                firstName,
                amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
                invoiceId: invoice.number || invoice.id,
                date: new Date(invoice.created * 1000).toLocaleDateString()
              });
            } catch (error) {
              console.error('Failed to send receipt email:', error);
            }
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error(error);
      return new Response('Webhook handler failed. Check logs.', { status: 400 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}