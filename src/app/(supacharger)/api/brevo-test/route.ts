import { brevoClient } from '@/lib/brevo/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email') || 'test@example.com';
    
    const sendSmtpEmail = {
      to: [{ email: email as string }],
      templateId: 1, // Welcome email template
      params: { firstName: 'Test User' },
    };

    const response = await brevoClient.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ 
      success: true, 
      message: `Test email sent to ${email}`,
      response: response.response.statusCode
    });
  } catch (error) {
    console.error('Test email failed:', error);
    return NextResponse.json({ 
      error: (error as Error).message 
    }, { 
      status: 500 
    });
  }
} 