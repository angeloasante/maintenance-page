// hooks/useIsMobile.ts
"use client";

import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkIsMobile();
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', checkIsMobile);

    return () => mediaQuery.removeEventListener('change', checkIsMobile);
  }, []);

  return isMobile;
};