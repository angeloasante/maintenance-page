//file: app/api/subscribe/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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

    return NextResponse.json(
      {
        message: 'Successfully subscribed!',
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