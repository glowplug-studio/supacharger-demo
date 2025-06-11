import { brevoClient } from './client';
import type { ReceiptEmailParams, SendEmailParams, WelcomeEmailParams } from './types';

/**
 * Send welcome email to new users
 * Template ID 1 should be configured in your Brevo dashboard
 */
export async function sendWelcomeEmail({ to, firstName }: WelcomeEmailParams): Promise<void> {
  try {
    const sendSmtpEmail = {
      to: [{ email: to }],
      templateId: 1, // Replace with your welcome email template ID
      params: { 
        firstName: firstName || 'there',
      },
    };

    const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
    console.log(`Welcome email sent to: ${to}`, response);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

/**
 * Send receipt email after successful payment
 * Template ID 2 should be configured in your Brevo dashboard
 */
export async function sendReceiptEmail({ 
  to, 
  firstName, 
  amount, 
  invoiceId, 
  date 
}: ReceiptEmailParams): Promise<void> {
  try {
    const sendSmtpEmail = {
      to: [{ email: to }],
      templateId: 2, // Replace with your receipt email template ID
      params: {
        firstName: firstName || 'Customer',
        amount,
        invoiceId,
        date,
      },
    };

    const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
    console.log(`Receipt email sent to: ${to} for invoice: ${invoiceId}`, response);
  } catch (error) {
    console.error('Failed to send receipt email:', error);
    throw error;
  }
}

/**
 * Generic email sender for custom templates
 * Use this for any custom email templates you create in Brevo
 */
export async function sendEmail({ to, templateId, params = {} }: SendEmailParams): Promise<void> {
  try {
    const sendSmtpEmail = {
      to: [{ email: to }],
      templateId,
      params,
    };

    const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to: ${to} using template: ${templateId}`, response);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Re-export types for convenience
export type { ReceiptEmailParams, SendEmailParams, WelcomeEmailParams } from './types'; 