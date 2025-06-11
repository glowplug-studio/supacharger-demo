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

**Local Development:**
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