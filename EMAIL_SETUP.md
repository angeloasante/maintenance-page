# Email Service Setup Guide

## 🎯 Overview

Your maintenance page now includes an **automated email welcome system** using Resend that sends a personalized, professional email to subscribers about the **Diaspora AI** project.

## ✨ What Happens When Someone Subscribes

1. **User subscribes** with their email address
2. **Email is saved** to your Supabase database
3. **Welcome email is automatically sent** with project details
4. **User receives** a beautiful, personalized email about Diaspora AI

## 📧 Email Features

### Professional Design
- **Gradient header** with Diaspora AI branding
- **Feature highlights** showcasing AI-powered flight booking
- **Responsive design** that works on all email clients
- **Branded footer** with contact information

### Content Highlights
- Welcome message and project introduction
- AI-powered flight booking features
- Development progress updates
- What subscribers can expect
- Professional contact information

## 🔧 Setup Required

### 1. Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up/login to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

### 2. Update Environment Variables
Update your `.env.local` file:
```bash
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@yourdomain.com
```

### 3. Domain Configuration (Optional but Recommended)
- **For production**: Configure a custom domain in Resend
- **For testing**: Use the default resend domain
- **Email address**: Should match your verified domain

## 🧪 Testing the Email System

### Test Email Configuration
Check if email service is configured:
```bash
curl http://localhost:3002/api/test-email
```

### Send Test Email
```bash
curl -X POST http://localhost:3002/api/test-email \
  -H "Authorization: Bearer your_cron_secret_here" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test Full Subscription Flow
1. Go to `http://localhost:3002`
2. Enter an email address
3. Click "Subscribe"
4. Check the email inbox

## 📧 Email Template Details

### Subject Line
```
🚀 Welcome to Diaspora AI - Revolutionary Flight Booking Coming Soon!
```

### Key Sections
1. **Header**: Branded Diaspora AI header with gradient
2. **Welcome Message**: Personal greeting and project introduction
3. **Features Grid**: 4-column feature highlights
4. **Development Status**: Current progress and timeline
5. **What to Expect**: List of upcoming benefits
6. **Footer**: Contact info and unsubscribe details

### Features Highlighted
- 🗣️ **Natural Language**: Book flights through conversation
- ⚡ **Real-Time Search**: Live flight data & pricing
- 🛡️ **Secure Payments**: Stripe-powered transactions
- 🌍 **Global Coverage**: Connecting diaspora worldwide

## 🚀 Production Deployment

### Vercel Environment Variables
Add these to your Vercel project:
```bash
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com
CRON_SECRET=your_cron_secret
```

### Email Deliverability
- **Domain Authentication**: Set up SPF, DKIM, DMARC records
- **From Address**: Use a verified domain for better deliverability
- **Content**: Avoid spam trigger words

## 🛠 Customization

### Update Email Content
Edit `components/email-template.tsx` to:
- Change branding colors
- Update feature descriptions
- Modify contact information
- Add/remove sections

### Update Email Service
Edit `lib/email-service.ts` to:
- Change email subject lines
- Add additional email types
- Modify error handling
- Add email analytics

## 📊 Monitoring

### Email Success Tracking
- Check console logs for email sending status
- Monitor Resend dashboard for delivery rates
- Track subscription rates in Supabase

### Error Handling
- Email failures don't prevent subscription success
- Errors are logged but don't interrupt user flow
- Fallback HTML for email clients without React support

## 🎨 Email Preview

The email includes:
- **Beautiful gradient header** with Diaspora AI branding
- **Feature showcase** with icons and descriptions
- **Development timeline** and progress updates
- **Professional footer** with contact information
- **Responsive design** for all devices

## 📝 Next Steps

1. **Set up Resend account** and get API key
2. **Update environment variables** with your credentials
3. **Test the email flow** with a real email address
4. **Deploy to production** with proper domain configuration
5. **Monitor email delivery** and subscription rates

Your maintenance page now provides a complete, professional experience for subscribers interested in the Diaspora AI project!