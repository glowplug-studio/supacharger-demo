// Brevo Email Service Types

export interface WelcomeEmailParams {
  to: string;
  firstName?: string;
}

export interface ReceiptEmailParams {
  to: string;
  firstName?: string;
  amount: string;
  invoiceId: string;  
  date: string;
}

export interface SendEmailParams {
  to: string;
  templateId: number;
  params?: Record<string, any>;
}

export interface BrevoEmailResponse {
  messageId: string;
} 