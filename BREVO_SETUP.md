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

## API Endpoints

### Test Endpoint
```
GET /api/brevo-test?email=[your-email]
```
Test the Brevo integration by sending a welcome email to the specified address.

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
    ├── webhooks/route.ts    # Receipt email integration
    └── brevo-test/route.ts  # Test endpoint
```

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

### Debugging

Enable debug logging by checking your application logs for Brevo-related messages. All email functions include error logging for troubleshooting.

## Production Deployment

When deploying to production:

1. Set `BREVO_API_KEY` in your deployment environment variables
2. Update template IDs if using different templates for production
3. Configure proper error monitoring for email failures
4. Consider implementing email retry logic for critical emails

## Security Notes

- API keys should never be committed to version control
- Use environment-specific API keys for development/staging/production
- Monitor API usage in your Brevo dashboard
- Implement proper error handling to prevent API key exposure in logs 