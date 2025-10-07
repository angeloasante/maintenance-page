-- Database setup for Maintenance Page Email Subscribers
-- This SQL script creates the necessary table and security policies for Supabase

-- Create the email_subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    ip_address TEXT,
    source TEXT NOT NULL DEFAULT 'maintenance_page',
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscribed_at ON public.email_subscribers(subscribed_at);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_is_active ON public.email_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON public.email_subscribers(source);

-- Enable Row Level Security (RLS)
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert new subscribers
CREATE POLICY "Allow anonymous insert for email subscription" ON public.email_subscribers
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow service role to read all data (for exports and admin)
CREATE POLICY "Allow service role full access" ON public.email_subscribers
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Create policy to allow authenticated users to read active subscribers
CREATE POLICY "Allow authenticated read active subscribers" ON public.email_subscribers
    FOR SELECT TO authenticated
    USING (is_active = true);

-- Add comments to table and columns for documentation
COMMENT ON TABLE public.email_subscribers IS 'Stores email addresses of users who subscribed for maintenance notifications';
COMMENT ON COLUMN public.email_subscribers.id IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN public.email_subscribers.email IS 'Subscriber email address (unique, lowercase, trimmed)';
COMMENT ON COLUMN public.email_subscribers.subscribed_at IS 'Timestamp when user subscribed';
COMMENT ON COLUMN public.email_subscribers.user_agent IS 'Browser user agent string for analytics';
COMMENT ON COLUMN public.email_subscribers.ip_address IS 'IP address of subscriber for security';
COMMENT ON COLUMN public.email_subscribers.source IS 'Source of subscription (maintenance_page, keep_alive, etc.)';
COMMENT ON COLUMN public.email_subscribers.is_active IS 'Whether this is a real subscriber (true) or system/test record (false)';

-- Create a function to get subscriber statistics
CREATE OR REPLACE FUNCTION get_subscriber_stats()
RETURNS TABLE (
    total_subscribers BIGINT,
    active_subscribers BIGINT,
    inactive_subscribers BIGINT,
    latest_subscription TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT 
        COUNT(*) as total_subscribers,
        COUNT(*) FILTER (WHERE is_active = true) as active_subscribers,
        COUNT(*) FILTER (WHERE is_active = false) as inactive_subscribers,
        MAX(subscribed_at) as latest_subscription
    FROM public.email_subscribers;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.email_subscribers TO service_role;
GRANT INSERT ON public.email_subscribers TO anon;
GRANT SELECT ON public.email_subscribers TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.email_subscribers_id_seq TO service_role;

-- Sample query to verify setup (commented out for production)
-- SELECT * FROM get_subscriber_stats();