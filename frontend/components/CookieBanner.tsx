"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-lg p-5 sm:p-6 sm:flex sm:items-center sm:justify-between gap-6 relative">
            <div className="flex-1 mb-4 sm:mb-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                We use cookies 🍪
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We use cookies to improve your experience, analyze traffic, and serve personalized ads. 
                By clicking "Accept", you consent to our use of cookies. Read our{" "}
                <Link href="/cookie-policy" className="underline hover:text-gray-900 transition-colors">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={declineCookies}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-5 py-2.5 text-sm font-medium bg-gray-900 text-white border border-gray-900 rounded hover:bg-gray-800 transition-colors shadow-md"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
