import { NextRequest, NextResponse } from 'next/server';

interface BrevoWebhookEvent {
  event: string;
  email: string;
  id: number;
  date: string;
  ts: number;
  'message-id': string;
  ts_event: number;
  subject: string;
  tag?: string;
  sending_ip?: string;
  ts_epoch: number;
  template_id?: number;
  [key: string]: any;
}

/**
 * Webhook endpoint for Brevo email events
 * Handles delivery, open, click, bounce, spam, and unsubscribe events
 */
export async function POST(req: NextRequest) {
  try {
    const events: BrevoWebhookEvent[] = await req.json();
    
    console.log(`Received ${events.length} Brevo webhook event(s)`);
    
    for (const event of events) {
      await handleBrevoEvent(event);
    }

    return NextResponse.json({ 
      success: true, 
      processed: events.length,
      message: 'Events processed successfully' 
    });
  } catch (error) {
    console.error('Error processing Brevo webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook events' },
      { status: 500 }
    );
  }
}

/**
 * Process individual Brevo webhook events
 */
async function handleBrevoEvent(event: BrevoWebhookEvent): Promise<void> {
  const { event: eventType, email, 'message-id': messageId, subject, template_id: templateId } = event;
  
  console.log(`Processing Brevo event: ${eventType} for ${email} (Message ID: ${messageId})`);
  
  switch (eventType) {
    case 'delivered':
      await handleDelivered(event);
      break;
    case 'hard_bounce':
    case 'soft_bounce':
      await handleBounce(event);
      break;
    case 'spam':
      await handleSpam(event);
      break;
    case 'opened':
      await handleOpened(event);
      break;
    case 'click':
      await handleClick(event);
      break;
    case 'unsubscribed':
      await handleUnsubscribe(event);
      break;
    case 'blocked':
      await handleBlocked(event);
      break;
    case 'invalid_email':
      await handleInvalidEmail(event);
      break;
    default:
      console.log(`Unhandled Brevo event type: ${eventType}`);
  }
}

/**
 * Handle successful email delivery
 */
async function handleDelivered(event: BrevoWebhookEvent): Promise<void> {
  console.log(`✅ Email delivered to ${event.email} - Subject: ${event.subject}`);
  
  // TODO: Update database with delivery status
  // Example: Update user email delivery status, analytics, etc.
}

/**
 * Handle email bounces (hard and soft)
 */
async function handleBounce(event: BrevoWebhookEvent): Promise<void> {
  const bounceType = event.event === 'hard_bounce' ? 'hard' : 'soft';
  console.log(`❌ Email ${bounceType} bounced for ${event.email} - Reason: ${event.reason || 'Unknown'}`);
  
  if (bounceType === 'hard') {
    // TODO: Mark email as invalid in database
    // TODO: Remove from mailing lists to prevent future sends
    console.log(`🚫 Consider marking ${event.email} as invalid to prevent future sends`);
  }
}

/**
 * Handle spam complaints
 */
async function handleSpam(event: BrevoWebhookEvent): Promise<void> {
  console.log(`🚨 Spam complaint from ${event.email}`);
  
  // TODO: Automatically unsubscribe user
  // TODO: Review email content and sending practices
}

/**
 * Handle email opens
 */
async function handleOpened(event: BrevoWebhookEvent): Promise<void> {
  console.log(`👁️  Email opened by ${event.email} - Subject: ${event.subject}`);
  
  // TODO: Track email engagement metrics
  // TODO: Update user engagement scores
}

/**
 * Handle email clicks
 */
async function handleClick(event: BrevoWebhookEvent): Promise<void> {
  console.log(`🖱️  Email clicked by ${event.email} - URL: ${event.link || 'Unknown'}`);
  
  // TODO: Track click-through rates
  // TODO: Update user engagement scores
}

/**
 * Handle unsubscribes
 */
async function handleUnsubscribe(event: BrevoWebhookEvent): Promise<void> {
  console.log(`📤 User unsubscribed: ${event.email}`);
  
  // TODO: Update user preferences in database
  // TODO: Remove from all mailing lists
}

/**
 * Handle blocked emails
 */
async function handleBlocked(event: BrevoWebhookEvent): Promise<void> {
  console.log(`🚫 Email blocked for ${event.email} - Reason: ${event.reason || 'Unknown'}`);
  
  // TODO: Investigate blocking reason
  // TODO: Potentially mark email as problematic
}

/**
 * Handle invalid email addresses
 */
async function handleInvalidEmail(event: BrevoWebhookEvent): Promise<void> {
  console.log(`❌ Invalid email address: ${event.email}`);
  
  // TODO: Mark email as invalid in database
  // TODO: Alert user to update their email address
} 