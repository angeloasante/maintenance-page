// app/api/test-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '../../../lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check (you can enhance this)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.ADMIN_SECRET || process.env.CRON_SECRET}`;
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const result = await sendWelcomeEmail({
      to: email,
      subject: '🚀 [TEST] Welcome to Diaspora AI - Revolutionary Flight Booking Coming Soon!',
      userEmail: email,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      emailId: result.data?.id,
      sentTo: email,
    });

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error },
      { status: 500 }
    );
  }
}

// GET endpoint to check email service status
export async function GET() {
  const isConfigured = !!(process.env.RESEND_API_KEY && process.env.FROM_EMAIL);
  
  return NextResponse.json({
    configured: isConfigured,
    resendApiKey: process.env.RESEND_API_KEY ? '✓ Set' : '✗ Missing',
    fromEmail: process.env.FROM_EMAIL ? '✓ Set' : '✗ Missing',
    message: isConfigured 
      ? 'Email service is properly configured' 
      : 'Email service needs configuration',
  });
}