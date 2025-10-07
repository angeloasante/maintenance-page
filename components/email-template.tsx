// components/email-template.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Row,
  Column,
} from '@react-email/components';

interface WelcomeEmailProps {
  userEmail: string;
}

export const DiasporaAIWelcomeEmail = ({ userEmail }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>✈️ Diaspora AI</Heading>
            <Text style={headerSubtitle}>Intelligent Flight Booking Platform</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={mainHeading}>🚀 We&apos;re Building Something Amazing!</Heading>
            
            <Text style={paragraph}>
              Thank you for subscribing to updates about <strong>Diaspora AI</strong>! 
              We&apos;re excited to have you on this journey with us.
            </Text>

            <Section style={featureBox}>
              <Heading style={featureTitle}>🤖 What We&apos;re Building</Heading>
              <Text style={featureText}>
                An AI-powered flight booking platform that revolutionizes travel planning 
                through natural conversations. Simply tell our AI where you want to go, 
                and we&apos;ll handle the rest with intelligent flight search, real-time pricing, 
                and seamless booking experiences.
              </Text>
            </Section>

            {/* Features Grid */}
            <Row style={featuresGrid}>
              <Column style={featureColumn}>
                <Text style={featureIcon}>🗣️</Text>
                <Heading style={featureHeading}>Natural Language</Heading>
                <Text style={featureDescription}>Book flights through conversation</Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureIcon}>⚡</Text>
                <Heading style={featureHeading}>Real-Time Search</Heading>
                <Text style={featureDescription}>Live flight data & pricing</Text>
              </Column>
            </Row>

            <Row style={featuresGrid}>
              <Column style={featureColumn}>
                <Text style={featureIcon}>🛡️</Text>
                <Heading style={featureHeading}>Secure Payments</Heading>
                <Text style={featureDescription}>Stripe-powered transactions</Text>
              </Column>
              <Column style={featureColumn}>
                <Text style={featureIcon}>🌍</Text>
                <Heading style={featureHeading}>Global Coverage</Heading>
                <Text style={featureDescription}>Connecting diaspora worldwide</Text>
              </Column>
            </Row>

            <Section style={statusBox}>
              <Heading style={statusTitle}>🔧 Currently Under Development</Heading>
              <Text style={statusText}>
                Our team is working around the clock to bring you this revolutionary 
                travel experience. We&apos;re fine-tuning our AI algorithms, integrating 
                with multiple airlines, and ensuring the highest security standards.
              </Text>
            </Section>

            <Heading style={expectTitle}>🎯 What to Expect</Heading>
            <Text style={paragraph}>
              • <strong>Early Access:</strong> Be among the first to experience AI-powered flight booking<br/>
              • <strong>Beta Testing:</strong> Help us perfect the platform with your feedback<br/>
              • <strong>Exclusive Updates:</strong> Regular progress reports and feature previews<br/>
              • <strong>Launch Notification:</strong> Immediate notification when we go live<br/>
              • <strong>Special Perks:</strong> Early bird discounts and premium features
            </Text>

            <Section style={launchBox}>
              <Text style={launchText}>🚀 Launch Coming Soon!</Text>
            </Section>

            <Text style={quoteText}>
              &ldquo;Building the future of travel, one conversation at a time.&rdquo;
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Follow our journey and get the latest updates:
            </Text>
            <Text style={contactText}>
              📧 info@diasporaai.dev
            </Text>
            <Text style={disclaimerText}>
              You&apos;re receiving this email because you subscribed to updates about Diaspora AI.<br/>
              We respect your privacy and will never share your email address.<br/>
              <br/>
              Subscribed email: <strong>{userEmail}</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
};

const header = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 30px',
  textAlign: 'center' as const,
  borderRadius: '8px 8px 0 0',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const headerSubtitle = {
  color: '#f0f0f0',
  fontSize: '16px',
  margin: '10px 0 0 0',
  fontWeight: '300',
};

const content = {
  padding: '40px 30px',
  backgroundColor: '#ffffff',
};

const mainHeading = {
  color: '#333333',
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '20px',
  lineHeight: '1.4',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#555555',
  marginBottom: '20px',
};

const featureBox = {
  backgroundColor: '#f8f9fa',
  padding: '25px',
  borderRadius: '8px',
  borderLeft: '4px solid #667eea',
  marginBottom: '25px',
};

const featureTitle = {
  color: '#333333',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '15px',
};

const featureText = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#666666',
  margin: '0',
};

const featuresGrid = {
  marginBottom: '15px',
};

const featureColumn = {
  padding: '20px',
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '0 10px',
  width: '45%',
};

const featureIcon = {
  fontSize: '24px',
  marginBottom: '10px',
};

const featureHeading = {
  color: '#333333',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const featureDescription = {
  fontSize: '13px',
  color: '#666666',
  margin: '0',
  lineHeight: '1.4',
};

const statusBox = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeaa7',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '25px',
};

const statusTitle = {
  color: '#856404',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '10px',
};

const statusText = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#856404',
  margin: '0',
};

const expectTitle = {
  color: '#333333',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '15px',
};

const launchBox = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const launchText = {
  display: 'inline-block',
  backgroundColor: '#667eea',
  color: '#ffffff',
  padding: '15px 30px',
  borderRadius: '25px',
  fontWeight: '600',
  fontSize: '16px',
};

const quoteText = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#555555',
  textAlign: 'center' as const,
  fontStyle: 'italic',
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '30px',
  textAlign: 'center' as const,
  borderRadius: '0 0 8px 8px',
  borderTop: '1px solid #e9ecef',
};

const footerText = {
  fontSize: '14px',
  color: '#6c757d',
  margin: '0 0 15px 0',
  lineHeight: '1.5',
};

const contactText = {
  color: '#667eea',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '20px',
};

const disclaimerText = {
  fontSize: '12px',
  color: '#999999',
  margin: '0',
  lineHeight: '1.4',
};

export default DiasporaAIWelcomeEmail;