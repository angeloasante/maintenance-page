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

export async function GET(request: NextRequest) {
  try {
    // Authentication check using authorization header
    const authorization = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.ADMIN_SECRET}`;
    
    if (authorization !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
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

    // Fetch subscribers from Supabase
    const { data: subscribers, error } = await supabase
      .from('email_subscribers')
      .select('email, subscribed_at, source')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Export error:', error);
      throw error;
    }

    // Get format from query params
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';

    if (format === 'json') {
      return NextResponse.json({
        total: subscribers.length,
        subscribers
      });
    }

    // Default to CSV format if not JSON
    const csvHeader = 'email,subscribed_at,source';
    const csvRows = subscribers.map(sub => 
      `${sub.email},${sub.subscribed_at},${sub.source}`
    );
    const csvContent = [csvHeader, ...csvRows].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=maintenance-subscribers.csv',
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export subscribers' },
      { status: 500 }
    );
  }
}
