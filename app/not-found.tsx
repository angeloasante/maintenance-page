"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-radial-soft flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-bold text-[#31456A] mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl text-[#31456A] mb-6"
        >
          Page Not Found
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/"
            className="maintenance-button inline-block px-6 py-3 text-center"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}