import { NextRequest, NextResponse } from 'next/server';

interface BrevoWebhookEvent {
  // Core fields present in all events
  event: string;
  email: string;
  id: number;
  date: string;
  ts: number;
  'message-id': string;
  ts_event: number;
  
  // Optional fields that may be present depending on event type
  subject?: string;
  tag?: string;
  tags?: string[];
  sending_ip?: string;
  ts_epoch?: number;
  template_id?: number;
  contact_id?: number;
  
  // Click-specific fields
  link?: string;
  user_agent?: string;
  device_used?: string;
  
  // Bounce-specific fields
  reason?: string;
  
  // Custom headers
  'X-Mailin-custom'?: string;
  
  // Mirror link for UI logs
  mirror_link?: string;
  
  // Sender info
  sender_email?: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log('Brevo webhook endpoint hit!');
    
    // Brevo sends individual events, not arrays
    const event: BrevoWebhookEvent = await req.json();

    // Validate that we have the required fields
    if (!event.event || !event.email || !event['message-id']) {
      console.error('Invalid webhook payload - missing required fields:', event);
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    // Log event for analytics with more comprehensive data
    console.log(`Brevo Event: ${event.event}`, {
      email: event.email,
      messageId: event['message-id'],
      subject: event.subject,
      templateId: event.template_id,
      contactId: event.contact_id,
      timestamp: new Date(event.ts * 1000).toISOString(),
      eventTimestamp: event.ts_event ? new Date(event.ts_event * 1000).toISOString() : undefined,
      tags: event.tags,
      link: event.link, // For click events
      reason: event.reason, // For bounce events
      userAgent: event.user_agent,
      device: event.device_used,
      sendingIp: event.sending_ip,
    });

    // TODO: Store in database table when email_events table is created
    // Example SQL migration needed:
    // CREATE TABLE email_events (
    //   id SERIAL PRIMARY KEY,
    //   event_type TEXT NOT NULL,
    //   email TEXT NOT NULL,
    //   message_id TEXT NOT NULL,
    //   subject TEXT,
    //   template_id INTEGER,
    //   contact_id INTEGER,
    //   timestamp TIMESTAMPTZ NOT NULL,
    //   event_timestamp TIMESTAMPTZ,
    //   tags TEXT[],
    //   link TEXT,
    //   reason TEXT,
    //   user_agent TEXT,
    //   device_used TEXT,
    //   sending_ip TEXT,
    //   raw_data JSONB NOT NULL,
    //   created_at TIMESTAMPTZ DEFAULT NOW()
    // );
    
    // Example database insert:
    // await db.emailEvents.create({
    //   eventType: event.event,
    //   email: event.email,
    //   messageId: event['message-id'],
    //   subject: event.subject,
    //   templateId: event.template_id,
    //   contactId: event.contact_id,
    //   timestamp: new Date(event.ts * 1000),
    //   eventTimestamp: event.ts_event ? new Date(event.ts_event * 1000) : null,
    //   tags: event.tags,
    //   link: event.link,
    //   reason: event.reason,
    //   userAgent: event.user_agent,
    //   deviceUsed: event.device_used,
    //   sendingIp: event.sending_ip,
    //   rawData: event,
    // });

    return NextResponse.json({ 
      received: true, 
      event: event.event,
      messageId: event['message-id']
    });
  } catch (error) {
    console.error('Brevo webhook error:', error);
    
    // Log the raw request body for debugging
    try {
      const body = await req.text();
      console.error('Raw webhook body:', body);
    } catch (bodyError) {
      console.error('Could not read request body:', bodyError);
    }
    
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 