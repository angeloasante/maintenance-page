//file: app/api/subscribe/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '../../../lib/email-service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
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

    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    const { data, error } = await supabase
      .from('email_subscribers')
      .insert([
        {
          email: email.toLowerCase().trim(),
          user_agent: userAgent,
          ip_address: ipAddress,
          source: 'maintenance_page',
          is_active: true // Real subscribers are active
        }
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our updates' },
          { status: 409 }
        );
      }
      
      console.error('Supabase error:', error);
      throw error;
    }

    // Send welcome email after successful subscription
    try {
      const emailResult = await sendWelcomeEmail({
        to: email.toLowerCase().trim(),
        subject: '🚀 Welcome to Diaspora AI - Revolutionary Flight Booking Coming Soon!',
        userEmail: email.toLowerCase().trim(),
      });

      if (!emailResult.success) {
        console.error('Welcome email failed:', emailResult.error);
        // Don't fail the subscription if email fails, just log it
      } else {
        console.log('Welcome email sent successfully to:', email);
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue with successful response even if email fails
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed! Check your email for exciting updates about Diaspora AI.',
        data
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}