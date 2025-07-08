# Brevo Email Integration Setup

This document outlines how to set up and use the Brevo email integration in your Supacharger project.

## Prerequisites

1. Create a Brevo account at [https://www.brevo.com](https://www.brevo.com)
2. Get your API key from [https://app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api)

## Environment Configuration

Add the following to your `.env.local` file:

```bash
BREVO_API_KEY=your_actual_brevo_api_key_here
```

## Email Templates Setup

Create the following email templates in your Brevo dashboard:

### Template 1: Welcome Email
- **Template ID**: 1
- **Subject**: Welcome to [Your App Name]!
- **Available Parameters**: 
  - `{{params.firstName}}` - User's first name

### Template 2: Receipt Email  
- **Template ID**: 2
- **Subject**: Payment Receipt - {{params.invoiceId}}
- **Available Parameters**:
  - `{{params.firstName}}` - Customer's first name
  - `{{params.amount}}` - Payment amount
  - `{{params.invoiceId}}` - Invoice ID
  - `{{params.date}}` - Payment date

## Brevo Webhooks Setup

Brevo webhooks allow you to track email events in real-time (deliveries, opens, clicks, bounces, etc.).

### 1. Webhook Endpoint

The integration includes a webhook endpoint at `/api/brevo-events` that handles:

- **delivered** - Email successfully delivered
- **opened** - Email opened by recipient  
- **click** - Link clicked in email
- **hard_bounce** - Permanent delivery failure
- **soft_bounce** - Temporary delivery failure
- **spam** - Email marked as spam
- **unsubscribed** - User unsubscribed
- **blocked** - Email blocked by provider
- **invalid_email** - Invalid email address

### 2. Configure Webhook in Brevo Dashboard

1. **Go to Brevo Dashboard** → **Automation** → **Webhooks**
2. **Click "Add a Webhook"**
3. **Configure the webhook:**

   **URL to post to:**
   ```
   https://your-domain.com/api/brevo-events
   ```
   *Replace `your-domain.com` with your actual domain*

   **When message is:** (Select events to track)
   - ✅ **Delivered** - Track successful deliveries
   - ✅ **Opened** - Track email opens  
   - ✅ **Clicked** - Track link clicks
   - ✅ **Hard Bounced** - Track permanent failures
   - ✅ **Soft Bounced** - Track temporary failures
   - ✅ **Marked as Spam** - Track spam complaints
   - ✅ **Unsubscribed** - Track unsubscribes

   **When a contact is:** (Optional contact events)
   - ✅ **Added to a list** - Track list additions
   - ✅ **Updated** - Track contact updates
   - ✅ **Deleted** - Track contact deletions

   **Description:**
   ```
   Supacharger email events tracking
   ```

4. **Click "Add"** to save the webhook

### 3. Webhook Security (Production)

For production environments, consider adding webhook verification:

```typescript
// Add to your webhook handler
const verifyBrevoWebhook = (payload: string, signature: string): boolean => {
  // Implement signature verification using your webhook secret
  // Brevo doesn't provide built-in signature verification
  // Consider adding your own verification mechanism
  return true;
};
```

### 4. Testing Webhooks

#### **Local Development (Recommended for Full Logs)**

**Why test locally?** Vercel's production logs may filter or truncate console.log output for security reasons. Local development shows complete webhook processing details.

**Setup Local Testing:**

1. **Run your app locally:**
   ```bash
   npm run dev
   ```
   Your app will be available at `http://localhost:3000`

2. **Test the webhook endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/brevo-events \
     -H "Content-Type: application/json" \
     -d '{
       "event": "delivered",
       "email": "test@example.com",
       "id": 123456,
       "date": "2024-01-15",
       "ts": 1642204800,
       "message-id": "<test-message-id>",
       "ts_event": 1642204800,
       "subject": "Test Email Subject",
       "tags": ["test", "webhook"],
       "template_id": 1
     }'
   ```

3. **Expected Response:**
   ```json
   {"received":true,"event":"delivered","messageId":"<test-message-id>"}
   ```

4. **View Full Logs in Terminal:**
   ```
   Brevo webhook endpoint hit!
   Brevo Event: delivered {
     email: 'test@example.com',
     messageId: '<test-message-id>',
     subject: 'Test Email Subject',
     templateId: 1,
     contactId: undefined,
     timestamp: '2022-01-15T00:00:00.000Z',
     eventTimestamp: '2022-01-15T00:00:00.000Z',
     tags: ['test', 'webhook'],
     link: undefined,
     reason: undefined,
     userAgent: undefined,
     device: undefined,
     sendingIp: undefined
   }
   POST /api/brevo-events 200 in 25ms
   ```

#### **Test Different Event Types**

**Email Opened:**
```bash
curl -X POST http://localhost:3000/api/brevo-events \
  -H "Content-Type: application/json" \
  -d '{
    "event": "opened",
    "email": "user@example.com",
    "id": 123457,
    "date": "2024-01-15",
    "ts": 1642204900,
    "message-id": "<opened-test>",
    "ts_event": 1642204900,
    "subject": "Welcome Email",
    "template_id": 1,
    "user_agent": "Mozilla/5.0...",
    "device_used": "Desktop"
  }'
```

**Link Clicked:**
```bash
curl -X POST http://localhost:3000/api/brevo-events \
  -H "Content-Type: application/json" \
  -d '{
    "event": "click",
    "email": "user@example.com",
    "id": 123458,
    "date": "2024-01-15",
    "ts": 1642205000,
    "message-id": "<click-test>",
    "ts_event": 1642205000,
    "subject": "Newsletter",
    "template_id": 2,
    "link": "https://example.com/clicked-link",
    "user_agent": "Mozilla/5.0...",
    "device_used": "Mobile"
  }'
```

**Hard Bounce:**
```bash
curl -X POST http://localhost:3000/api/brevo-events \
  -H "Content-Type: application/json" \
  -d '{
    "event": "hard_bounce",
    "email": "invalid@nonexistent.com",
    "id": 123459,
    "date": "2024-01-15",
    "ts": 1642205100,
    "message-id": "<bounce-test>",
    "ts_event": 1642205100,
    "subject": "Failed Email",
    "template_id": 1,
    "reason": "550 5.1.1 User unknown"
  }'
```

#### **Production Testing with ngrok**

For testing production-like webhook behavior:

1. **Install and setup ngrok:**
   ```bash
   # Install ngrok (macOS)
   brew install ngrok
   
   # Or download from https://ngrok.com/download
   ```

2. **Expose local server:**
   ```bash
   ngrok http 3000
   ```
   
3. **Use ngrok URL in Brevo webhook settings:**
   ```
   https://abc123.ngrok-free.app/api/brevo-events
   ```

4. **Send test emails and watch real webhook events**

#### **Troubleshooting Local Tests**

**Common Issues:**

1. **"Invalid webhook payload" error:**
   - Check that you're sending a single object `{}`, not an array `[{}]`
   - Ensure required fields are present: `event`, `email`, `message-id`

2. **Connection refused:**
   - Make sure your Next.js dev server is running (`npm run dev`)
   - Verify you're using `http://localhost:3000` (not https)

3. **No logs appearing:**
   - Check that you're looking at the terminal where `npm run dev` is running
   - Ensure the endpoint path is correct: `/api/brevo-events`

**Debug Tips:**
- **Full request logging**: The webhook logs the complete event object for debugging
- **Timestamp conversion**: UNIX timestamps are automatically converted to ISO dates
- **Event validation**: Missing required fields will return a 400 error with details
- **Raw payload logging**: On errors, the raw request body is logged for debugging

#### **Testing in CI/CD**

For automated testing, you can create a simple test script:

```javascript
// test-brevo-webhook.js
const response = await fetch('http://localhost:3000/api/brevo-events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'delivered',
    email: 'test@example.com',
    id: 123456,
    date: '2024-01-15',
    ts: 1642204800,
    'message-id': '<test-ci>',
    ts_event: 1642204800,
    subject: 'CI Test Email'
  })
});

const result = await response.json();
console.log('Webhook test result:', result);
process.exit(response.ok ? 0 : 1);
```

Run with: `node test-brevo-webhook.js`

---

**Production Testing:**
1. Use ngrok to expose your local server:
   ```bash
   ngrok http 3000
   ```
2. Use the ngrok URL in Brevo webhook settings:
   ```
   https://abc123.ngrok.io/api/brevo-events
   ```

**Test the webhook:**
1. Send a test email using the `/api/brevo-test` endpoint
2. Check your application logs for webhook events
3. Verify events are being processed correctly

## Features Implemented

### 1. Welcome Emails
- Automatically sent to new users during auth callback
- Triggered for users created within the last 2 minutes
- Uses user's first name from metadata or email prefix

### 2. Receipt Emails
- Sent when Stripe `invoice.payment_succeeded` webhook is received
- Includes payment details and customer information
- Personalized with customer name

### 3. Generic Email Sending
- `sendEmail()` function for custom templates
- Supports any template ID with custom parameters

### 4. Email Events Tracking
- Real-time webhook processing for email events
- Comprehensive event handling (delivery, opens, clicks, bounces)
- Structured logging for monitoring and analytics

## API Endpoints

### Test Endpoint
```
GET /api/brevo-test?email=[your-email]
```
Test the Brevo integration by sending a welcome email to the specified address.

### Webhook Endpoint
```
POST /api/brevo-events
```
Receives and processes Brevo webhook events for email tracking and analytics.

## Usage Examples

### Send Welcome Email
```typescript
import { sendWelcomeEmail } from '@/lib/brevo';

await sendWelcomeEmail({
  to: 'user@example.com',
  firstName: 'John'
});
```

### Send Receipt Email
```typescript
import { sendReceiptEmail } from '@/lib/brevo';

await sendReceiptEmail({
  to: 'customer@example.com',
  firstName: 'Jane',
  amount: '$29.99',
  invoiceId: 'inv_123456',
  date: '2024-01-15'
});
```

### Send Custom Email
```typescript
import { sendEmail } from '@/lib/brevo';

await sendEmail({
  to: 'user@example.com',
  templateId: 3,
  params: {
    customField: 'value',
    anotherField: 'another value'
  }
});
```

## File Structure

```
src/lib/brevo/
├── types.ts          # TypeScript interfaces
├── client.ts         # Brevo API client initialization
└── index.ts          # Main email functions

src/app/(supacharger)/
├── (unauthenticated)/auth/callback/route.ts  # Welcome email integration
└── api/
    ├── webhooks/route.ts      # Receipt email integration
    ├── brevo-test/route.ts    # Test endpoint
    └── brevo-events/route.ts  # Webhook events handler
```

## Monitoring and Analytics

### Email Events Tracking

The webhook handler processes these events and logs them for monitoring:

- **Delivery Rate**: Track successful vs failed deliveries
- **Engagement**: Monitor open and click rates
- **List Health**: Identify bounces and invalid emails
- **Spam Issues**: Track spam complaints

### Recommended Actions

Based on webhook events, consider implementing:

- **Hard Bounces**: Mark emails as invalid, stop sending
- **Spam Complaints**: Automatically unsubscribe users
- **High Engagement**: Identify most engaged users
- **Low Engagement**: Create re-engagement campaigns

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `BREVO_API_KEY` is set in your environment variables
   - Verify the API key is active in your Brevo dashboard

2. **Template Not Found** 
   - Check that template IDs match between code and Brevo dashboard
   - Ensure templates are published and active

3. **Email Not Sending**
   - Check Brevo dashboard for email logs and delivery status
   - Verify recipient email addresses are valid
   - Check for rate limiting or quota issues

4. **Webhooks Not Working**
   - Verify webhook URL is accessible from the internet
   - Check that `/api/brevo-events` is in allowed paths
   - Ensure your server can receive POST requests
   - Check application logs for webhook processing errors

### Debugging

Enable debug logging by checking your application logs for Brevo-related messages. All email functions include error logging for troubleshooting.

**Check webhook events:**
```bash
# View recent webhook events in logs
tail -f logs/application.log | grep "Brevo webhook"
```

## Production Deployment

When deploying to production:

1. Set `BREVO_API_KEY` in your deployment environment variables
2. Update template IDs if using different templates for production
3. Configure webhook URL with your production domain
4. Configure proper error monitoring for email failures
5. Consider implementing email retry logic for critical emails
6. Set up monitoring for webhook processing

## Security Notes

- API keys should never be committed to version control
- Use environment-specific API keys for development/staging/production
- Monitor API usage in your Brevo dashboard
- Implement proper error handling to prevent API key exposure in logs
- Consider implementing webhook signature verification for production
- Use HTTPS for all webhook URLs to ensure secure data transmission 