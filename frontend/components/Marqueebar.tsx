"use client";

import { motion } from "framer-motion";

const items = [
  { label: "AI Career Matching", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
  )},
  { label: "Skill Gap Analysis", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  )},
  { label: "Personalized Roadmaps", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
  )},
  { label: "10,000+ Students Guided", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { label: "Smart Recommendations", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
  )},
  { label: "Industry Insights", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M4 20V10l8-6 8 6v10"/><path d="M10 20v-6h4v6"/></svg>
  )},
  { label: "Real-Time AI Analysis", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10l3 3 2-4 3 3 2-2"/></svg>
  )},
  { label: "95% Prediction Accuracy", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  )},
  { label: "Deep Interest Profiling", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  )},
  { label: "Career Growth Tracking", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  )},
];

export default function MarqueeBar() {
  const repeated = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-[#0a0a0a] border-y border-[#222]">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-[#c8b89a] font-medium text-sm tracking-widest uppercase flex items-center gap-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-[#c8b89a] opacity-70">{item.icon}</span>
            {item.label}
            <span className="text-[#c8b89a] opacity-30 text-xs">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}