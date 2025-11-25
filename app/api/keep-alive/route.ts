//file: app/api/keep-alive/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Function to create Supabase client at runtime
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

const FAKE_EMAILS = [
  'keepalive1@example.com',
  'keepalive2@example.com', 
  'keepalive3@example.com',
  'keepalive4@example.com',
  'keepalive5@example.com',
  'system.maintenance@example.com',
  'auto.ping@example.com',
  'db.heartbeat@example.com',
];

export async function POST(request: NextRequest) {
  try {
    // Security check
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || process.env.ADMIN_SECRET}`;
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Supabase client at runtime
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (supabaseError) {
      return NextResponse.json({ 
        error: 'Supabase not configured',
        message: 'Environment variables NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required',
        details: supabaseError instanceof Error ? supabaseError.message : 'Unknown error'
      }, { status: 500 });
    }

    // Pick a random fake email
    const randomEmail = FAKE_EMAILS[Math.floor(Math.random() * FAKE_EMAILS.length)];
    const timestamp = new Date().toISOString();
    const fakeEmail = `${randomEmail.split('@')[0]}.${Date.now()}@${randomEmail.split('@')[1]}`;

    const { data, error } = await supabase
      .from('email_subscribers')
      .insert([
        {
          email: fakeEmail,
          user_agent: 'KeepAlive-Bot/1.0',
          ip_address: '127.0.0.1',
          source: 'keep_alive',
          is_active: false, // Mark as inactive
        }
      ])
      .select();

    if (error) {
      console.error('Keep-alive insert error:', error);
      throw error;
    }

    // Also do a simple read operation to ensure database activity
    const { data: readTest } = await supabase
      .from('email_subscribers')
      .select('email')
      .eq('is_active', true)
      .limit(1);

    return NextResponse.json({
      success: true,
      message: 'Keep-alive ping successful',
      inserted: data?.[0]?.email,
      activeCount: readTest?.length || 0,
      timestamp
    });

  } catch (error) {
    console.error('Keep-alive error:', error);
    return NextResponse.json(
      { error: 'Keep-alive failed', details: error },
      { status: 500 }
    );
  }
}