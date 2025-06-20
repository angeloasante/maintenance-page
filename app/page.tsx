//file: app/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Mobile floating animation variants
  const mobileFloatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Mobile stagger animation for form
  const mobileStaggerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Global styles to hide scrollbars */}
      <style jsx global>{`
        html, body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        /* Hide scrollbars for any scrollable element */
        *::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div className="w-full min-h-screen bg-radial-soft relative overflow-hidden flex items-center">
        {/* Mobile Dev Background */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.1
          }}>
            {/* You can replace this with your preferred dev-themed image */}
            <div style={{
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 255, 198, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, transparent 0%, rgba(49, 69, 106, 0.1) 100%)
              `,
            }}>
              {/* Code pattern overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 20px,
                    rgba(49, 69, 106, 0.03) 20px,
                    rgba(49, 69, 106, 0.03) 22px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 20px,
                    rgba(49, 69, 106, 0.03) 20px,
                    rgba(49, 69, 106, 0.03) 22px
                  )
                `,
              }} />
            </div>
          </div>
        )}

        {/* Desktop Background Image - MacBook */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            pointerEvents: 'none'
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
        )}

        {/* Main Content */}
        <motion.div 
          style={{ 
            maxWidth: isMobile ? '100%' : '600px', 
            width: '100%',
            position: 'relative',
            zIndex: 10,
            paddingLeft: isMobile ? '20px' : '80px',
            paddingRight: isMobile ? '20px' : '40px',
            paddingTop: isMobile ? '60px' : '20px',
            paddingBottom: isMobile ? '100px' : '20px',
            textAlign: isMobile ? 'center' : 'left',
            minHeight: isMobile ? '100vh' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}
          variants={isMobile ? mobileFloatingVariants : {}}
          animate={isMobile ? "animate" : {}}
        >
          
          {/* Under Maintenance Heading */}
          <motion.h1
            initial={{ opacity: 0, y: isMobile ? -50 : -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: isMobile ? 1.2 : 0.8,
              type: isMobile ? "spring" : "tween",
              stiffness: isMobile ? 80 : undefined,
              damping: isMobile ? 12 : undefined
            }}
            style={{
              color: '#31456A',
              fontSize: isMobile ? 'clamp(2rem, 12vw, 3.5rem)' : 'clamp(2.5rem, 8vw, 6rem)',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '32px',
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '0 2px 4px rgba(255,255,255,0.5)'
            }}
          >
            Under Maintenance
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 30 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: isMobile ? 1 : 0.8, 
              delay: isMobile ? 0.3 : 0.2,
              type: isMobile ? "spring" : "tween",
              stiffness: isMobile ? 60 : undefined
            }}
            style={{
              color: '#31456A',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '400',
              lineHeight: '1.6',
              marginBottom: '48px',
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '0 1px 2px rgba(255,255,255,0.5)'
            }}
          >
            We are currently facing some issues with our system and our team is working hard to resolve it. You can subscribe to our mailing list if you want to get notified
          </motion.p>

          {/* Email Form */}
          <motion.form
            initial={{ opacity: 0, y: isMobile ? 40 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: isMobile ? 1.2 : 0.8, 
              delay: isMobile ? 0.5 : 0.4,
              type: isMobile ? "spring" : "tween",
              stiffness: isMobile ? 50 : undefined
            }}
            onSubmit={handleSubmit}
            style={{ 
              maxWidth: '400px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              position: 'relative',
              zIndex: 15,
              margin: isMobile ? '0 auto' : '0'
            }}
          >
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              variants={isMobile ? mobileStaggerVariants : {}}
              initial={isMobile ? "hidden" : {}}
              animate={isMobile ? "visible" : {}}
              transition={isMobile ? { delay: 0.7 } : {}}
              whileFocus={isMobile ? { scale: 1.05 } : {}}
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
              variants={isMobile ? mobileStaggerVariants : {}}
              initial={isMobile ? "hidden" : {}}
              animate={isMobile ? "visible" : {}}
              transition={isMobile ? { delay: 0.9 } : {}}
              whileHover={{ scale: isSubmitting ? 1 : (isMobile ? 1.05 : 1.02) }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
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
                initial={{ opacity: 0, y: 10, scale: isMobile ? 0.8 : 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={isMobile ? { type: "spring", stiffness: 100 } : {}}
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
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: isMobile ? '50%' : '80px',
            transform: isMobile ? 'translateX(-50%)' : 'none',
            fontSize: '14px',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            color: '#31456A',
            opacity: 0.6,
            zIndex: 10,
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          © Copyrights Travis Develops | All Rights Reserved
        </motion.footer>
      </div>
    </>
  );
}