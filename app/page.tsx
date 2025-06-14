//file: app/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setMessage("Successfully subscribed! We'll notify you when we're back online.");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen bg-radial-soft relative overflow-hidden flex items-center">
      {/* Background Image - MacBook - Fixed positioning */}
      <div style={{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        pointerEvents: 'none' // Prevents image from blocking interactions
      }}>
        <Image 
          src="/image_1-removebg-preview.png" 
          alt="MacBook illustration"
          width={800}
          height={600}
          style={{
            width: 'auto',
            height: '80vh',
            maxHeight: '600px',
            mixBlendMode: 'darken',
            opacity: 0.8
          }}
          priority
        />
      </div>

      {/* Main Content - Left Side - Higher z-index */}
      <div style={{ 
        maxWidth: '600px', 
        width: '100%',
        position: 'relative',
        zIndex: 10, // Higher z-index to ensure it's above the image
        paddingLeft: '80px',
        paddingRight: '40px',
        paddingTop: '20px',
        paddingBottom: '20px'
      }}>
        
        {/* Under Maintenance Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: '#31456A',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '32px',
            textAlign: 'left',
            textShadow: '0 2px 4px rgba(255,255,255,0.5)' // Add text shadow for visibility
          }}
        >
          Under Maintenance
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: '#31456A',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            marginBottom: '48px',
            textAlign: 'left',
            textShadow: '0 1px 2px rgba(255,255,255,0.5)' // Add text shadow for visibility
          }}
        >
          We are currently facing some issues with our system and our team is working hard to resolve it. You can subscribe to our mailing list if you want to get notified
        </motion.p>

        {/* Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          style={{ 
            maxWidth: '400px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            position: 'relative',
            zIndex: 15 // Even higher z-index for form
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              width: '100%',
              height: '56px',
              background: 'linear-gradient(0deg, #E3EDF7 0%, #E3EDF7 100%), linear-gradient(207deg, white 27%, #B9CCE2 100%)',
              boxShadow: '4px 2px 16px rgba(136, 165, 191, 0.48) inset',
              borderRadius: '16px',
              border: 'none',
              padding: '0 20px',
              fontSize: '16px',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              color: '#31456A',
              outline: 'none',
              opacity: isSubmitting ? 0.6 : 1
            }}
          />
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            style={{
              width: '100%',
              height: '56px',
              background: 'linear-gradient(0deg, #E3EDF7 0%, #E3EDF7 100%), linear-gradient(207deg, white 27%, #B9CCE2 100%)',
              boxShadow: '4px 2px 16px rgba(136, 165, 191, 0.48) inset',
              borderRadius: '16px',
              border: 'none',
              fontSize: '16px',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '600',
              color: '#31456A',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </motion.button>

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                backgroundColor: messageType === 'success' ? '#dcfce7' : '#fee2e2',
                color: messageType === 'success' ? '#166534' : '#dc2626',
                border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
              }}
            >
              {message}
            </motion.div>
          )}
        </motion.form>
      </div>

      {/* Footer - Fixed z-index */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '80px',
          fontSize: '14px',
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          color: '#31456A',
          opacity: 0.6,
          zIndex: 10
        }}
      >
        © Copyrights Travis Develops | All Rights Reserved
      </motion.footer>
    </div>
  );
}