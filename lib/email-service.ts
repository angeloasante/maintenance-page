// lib/email-service.ts
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { DiasporaAIWelcomeEmail } from '../components/email-template';

export interface EmailOptions {
  to: string;
  subject: string;
  userEmail: string;
}

export async function sendWelcomeEmail({ to, subject, userEmail }: EmailOptions) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not found, skipping email send');
      return { 
        success: false, 
        error: 'Email service not configured - RESEND_API_KEY missing' 
      };
    }

    // Create Resend instance only when needed
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Render the React email component to HTML
    const emailHtml = await render(DiasporaAIWelcomeEmail({ userEmail }));

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Diaspora AI <noreply@yourdomain.com>',
      to: [to],
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }

    console.log('Welcome email sent successfully:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
}

export default sendWelcomeEmail;