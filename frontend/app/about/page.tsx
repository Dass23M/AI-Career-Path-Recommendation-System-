"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ── SVG Illustrations ──────────────────────────────────

const MissionIllustration = () => (
  <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={25 + col * 52} cy={25 + row * 56} r="1.8" fill="#222" opacity="0.2"/>
      ))
    )}
    <circle cx="180" cy="140" r="90" stroke="#e8e0d0" strokeWidth="1.5" fill="#faf8f4"/>
    <circle cx="180" cy="140" r="65" stroke="#d4cabc" strokeWidth="1" fill="none" strokeDasharray="5 4"/>
    <circle cx="180" cy="140" r="38" stroke="#0a0a0a" strokeWidth="2" fill="white"/>
    <circle cx="180" cy="140" r="8" fill="#0a0a0a"/>
    <path d="M180 60 L186 138 L180 132 L174 138 Z" fill="#0a0a0a"/>
    <path d="M180 220 L186 142 L180 148 L174 142 Z" fill="#c8b89a"/>
    <path d="M100 140 L178 134 L172 140 L178 146 Z" fill="#c8b89a"/>
    <path d="M260 140 L182 146 L188 140 L182 134 Z" fill="#0a0a0a"/>
    <text x="180" y="52" textAnchor="middle" fill="#0a0a0a" fontSize="9" fontFamily="monospace" fontWeight="bold">N</text>
    <text x="180" y="238" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">S</text>
    <text x="268" y="144" textAnchor="middle" fill="#0a0a0a" fontSize="9" fontFamily="monospace" fontWeight="bold">E</text>
    <text x="92" y="144" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">W</text>
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const r1 = 72; const r2 = 82;
      return <line key={i} x1={180 + r1 * Math.cos(angle)} y1={140 + r1 * Math.sin(angle)} x2={180 + r2 * Math.cos(angle)} y2={140 + r2 * Math.sin(angle)} stroke="#888" strokeWidth="1"/>;
    })}
    <rect x="10" y="240" width="90" height="22" fill="#0a0a0a"/>
    <text x="55" y="255" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" letterSpacing="1">FIND YOUR NORTH</text>
  </svg>
);

const TechIllustration = () => (
  <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="120" y="90" width="120" height="100" rx="4" fill="#0a0a0a" stroke="#111" strokeWidth="2"/>
    <rect x="132" y="102" width="96" height="76" rx="2" fill="#1a1a1a"/>
    {Array.from({ length: 3 }).map((_, row) =>
      Array.from({ length: 4 }).map((_, col) => (
        <rect key={`${row}-${col}`} x={140 + col * 22} y={110 + row * 22} width="14" height="14" rx="2" fill={row === 1 && col === 1 ? "#c8b89a" : row === 1 && col === 2 ? "#9e8a6e" : "#333"}/>
      ))
    )}
    {[105, 120, 135, 150, 165].map((y, i) => (
      <g key={i}>
        <line x1="60" y1={y} x2="120" y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
        <circle cx="60" cy={y} r="4" fill="#0a0a0a" stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    {[105, 120, 135, 150, 165].map((y, i) => (
      <g key={i}>
        <line x1="240" y1={y} x2="300" y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
        <circle cx="300" cy={y} r="4" fill="#0a0a0a" stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    {[140, 160, 180, 200, 220].map((x, i) => (
      <g key={i}>
        <line x1={x} y1="50" x2={x} y2="90" stroke="#c8b89a" strokeWidth="1.5"/>
        <circle cx={x} cy="50" r="4" fill="#0a0a0a" stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    {[140, 160, 180, 200, 220].map((x, i) => (
      <g key={i}>
        <line x1={x} y1="190" x2={x} y2="230" stroke="#c8b89a" strokeWidth="1.5"/>
        <circle cx={x} cy="230" r="4" fill="#0a0a0a" stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    <text x="180" y="143" textAnchor="middle" fill="#c8b89a" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="2">AI</text>
    <text x="180" y="157" textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace" letterSpacing="1">CORE</text>
    <rect x="260" y="240" width="90" height="22" fill="#0a0a0a"/>
    <text x="305" y="255" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" letterSpacing="1">NEURAL ENGINE</text>
  </svg>
);

const TeamIllustration = () => (
  <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="180" y1="140" x2="90" y2="90" stroke="#d4cabc" strokeWidth="1.5"/>
    <line x1="180" y1="140" x2="270" y2="90" stroke="#d4cabc" strokeWidth="1.5"/>
    <line x1="180" y1="140" x2="90" y2="200" stroke="#d4cabc" strokeWidth="1.5"/>
    <line x1="180" y1="140" x2="270" y2="200" stroke="#d4cabc" strokeWidth="1.5"/>
    <line x1="180" y1="140" x2="180" y2="50" stroke="#d4cabc" strokeWidth="1.5"/>
    <circle cx="180" cy="140" r="32" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="2"/>
    <text x="180" y="137" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">CAREER</text>
    <text x="180" y="150" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">AI</text>
    {[
      { cx: 90,  cy: 90,  label: "AI", sub: "Research"  },
      { cx: 270, cy: 90,  label: "UX", sub: "Design"    },
      { cx: 180, cy: 50,  label: "ML", sub: "Engineers" },
      { cx: 90,  cy: 200, label: "HR", sub: "Experts"   },
      { cx: 270, cy: 200, label: "CS", sub: "Advisors"  },
    ].map((node, i) => (
      <g key={i}>
        <circle cx={node.cx} cy={node.cy} r="26" fill="#f5f0e8" stroke="#0a0a0a" strokeWidth="2"/>
        <text x={node.cx} y={node.cy - 2} textAnchor="middle" fill="#0a0a0a" fontSize="10" fontFamily="monospace" fontWeight="bold">{node.label}</text>
        <text x={node.cx} y={node.cy + 10} textAnchor="middle" fill="#888" fontSize="7" fontFamily="monospace">{node.sub}</text>
      </g>
    ))}
  </svg>
);

// ── Data ───────────────────────────────────────────────
const stats = [
  { num: "10K+", label: "Students Guided" },
  { num: "95%",  label: "Prediction Accuracy" },
  { num: "200+", label: "Career Paths" },
  { num: "3",    label: "Years of Research" },
];

const values = [
  {
    index: "01",
    title: "Accuracy First",
    desc: "Every recommendation is backed by real labor market data and validated by career professionals — not guesswork.",
  },
  {
    index: "02",
    title: "Student-Centered",
    desc: "We build for the student who doesn't know where to start — not for institutions. Your clarity is the only metric that matters.",
  },
  {
    index: "03",
    title: "Transparent AI",
    desc: "You see exactly why we recommend what we recommend. No black-box decisions. No hidden agendas.",
  },
  {
    index: "04",
    title: "Continuously Learning",
    desc: "Our models retrain monthly on new job market data. The advice you get today reflects the world as it is — not three years ago.",
  },
];

const team = [
  { initials: "AS", name: "Amara Silva",  role: "Founder & AI Lead",        bg: "#0a0a0a", text: "#c8b89a" },
  { initials: "RP", name: "Rohan Perera", role: "Head of Career Research",   bg: "#f5f0e8", text: "#0a0a0a" },
  { initials: "NK", name: "Nadia Khan",   role: "Lead UX Designer",          bg: "#c8b89a", text: "#0a0a0a" },
  { initials: "JM", name: "James Müller", role: "Machine Learning Engineer", bg: "#0a0a0a", text: "#c8b89a" },
];

// ── Page ───────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .ruled-bg {
          background-image: repeating-linear-gradient(0deg, transparent, transparent 31px, #e8e0d0 31px, #e8e0d0 32px);
        }
        @media (max-width: 767px) {
          .about-stats-grid > div {
            border-left: none !important;
          }
        }
      `}</style>

      <div style={{ background: "#f5f0e8", color: "#0a0a0a", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* ══ HERO ══════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 ruled-bg opacity-40 pointer-events-none"/>
          <div
            className="absolute -top-10 -left-10 font-bold leading-none opacity-[0.04] select-none pointer-events-none"
            style={{ fontFamily: "'Playfair Display', serif", color: "#0a0a0a", fontSize: "clamp(14vw, 20vw, 20vw)" }}
          >
            WHO
          </div>

          <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e", border: "1px solid #9e8a6e", padding: "0.25rem 0.75rem", display: "inline-block" }}
              >
                ◆ Our Story
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "#0a0a0a", lineHeight: 1.05, marginTop: "1.25rem", marginBottom: "1.25rem" }}
              >
                We Help People<br />
                <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>Find Direction.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontWeight: 300, color: "#888", maxWidth: "44ch", lineHeight: 1.8, fontSize: "0.95rem" }}
              >
                CareerAI was born from a simple frustration — too many talented students had no idea what careers suited them best. We built an AI to fix that.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 sm:mt-10"
              >
                <div className="h-px max-w-xs" style={{ background: "#c8b89a" }}/>
                <p className="mt-4" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>
                  Founded 2022 · Colombo, Sri Lanka
                </p>
              </motion.div>
            </div>

            {/* Compass illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative mt-8 md:mt-0"
            >
              <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
              <div className="relative border-2 bg-white p-4 sm:p-6" style={{ borderColor: "#0a0a0a" }}>
                <div className="h-52 sm:h-64"><MissionIllustration /></div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 px-3 sm:px-4 py-1.5 sm:py-2" style={{ background: "#0a0a0a" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>◆ Compass-Driven AI</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════ */}
        <section style={{ background: "#0a0a0a" }} className="py-12 sm:py-14">
          <div className="about-stats-grid max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ num, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4 sm:px-8 py-6 text-center"
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#c8b89a" }}>{num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", marginTop: "0.25rem" }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ MISSION ═══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>— Mission</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.75rem" }}>
                Democratizing<br /><span style={{ fontStyle: "italic" }}>Career Clarity.</span>
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                {[
                  "Career guidance used to cost thousands. We believe every student deserves AI-level insight — free of charge, free of bias.",
                  "We train our models on real hiring data, salary trends, and skill demands across 200+ industries, updated monthly.",
                  "From a first-generation college student in Colombo to a career-switcher in Berlin — CareerAI adapts to every context.",
                ].map((p, i) => (
                  <p key={i} style={{ fontWeight: 300, color: "#777", lineHeight: 1.8, fontSize: "0.9rem" }}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Tech illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mt-8 md:mt-0"
            >
              <div className="absolute inset-0 -translate-x-3 translate-y-3 sm:-translate-x-4 sm:translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
              <div className="relative border-2 bg-white p-4 sm:p-6" style={{ borderColor: "#0a0a0a" }}>
                <div className="h-52 sm:h-64"><TechIllustration /></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ VALUES ════════════════════════════════════ */}
        <section style={{ background: "#0a0a0a" }} className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 sm:mb-16"
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8b89a" }}>— Our Values</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: "#f5f0e8", lineHeight: 1.1, marginTop: "0.75rem" }}>
                What We<br /><span style={{ fontStyle: "italic", color: "#c8b89a" }}>Stand For.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-px" style={{ background: "#222" }}>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ background: "#111" } as any}
                  className="p-6 sm:p-8 transition-colors"
                  style={{ background: "#1a1a1a" }}
                >
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "3.5rem", color: "#c8b89a", opacity: 0.25, lineHeight: 1, marginBottom: "0.5rem" }}>{v.index}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "#f5f0e8", marginBottom: "0.75rem" }}>{v.title}</h3>
                  <p style={{ fontWeight: 300, color: "#777", lineHeight: 1.8, fontSize: "0.875rem" }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TEAM ══════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Team illustration — shown below heading on mobile, left col on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1 mt-8 md:mt-0"
            >
              <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
              <div className="relative border-2 bg-white p-4 sm:p-6" style={{ borderColor: "#0a0a0a" }}>
                <div className="h-52 sm:h-64"><TeamIllustration /></div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 px-3 sm:px-4 py-1.5 sm:py-2" style={{ background: "#0a0a0a" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>◆ The People Behind It</span>
              </div>
            </motion.div>

            {/* Team cards */}
            <div className="order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 sm:mb-10"
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>— The Team</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.75rem" }}>
                  Built by Experts,<br /><span style={{ fontStyle: "italic" }}>For Students.</span>
                </h2>
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 border-2 transition-all"
                    style={{ borderColor: "#0a0a0a", background: "white" }}
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: member.bg, color: member.text, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
                      {member.initials}
                    </div>
                    <div className="min-w-0">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#0a0a0a" }}>{member.name}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9e8a6e", marginTop: "0.15rem" }}>{member.role}</p>
                    </div>
                    <div className="ml-auto shrink-0" style={{ color: "#d4cabc" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══════════════════════════════════ */}
        <section style={{ background: "#f0e8d8" }} className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 sm:mb-16">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>— Our Journey</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.75rem" }}>
                How We Got <span style={{ fontStyle: "italic" }}>Here.</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "#d4cabc" }}/>

              {[
                { year: "2022", title: "The Idea", desc: "Founded after realizing most career tests were outdated, generic, and unhelpful for modern students." },
                { year: "2023", title: "First Model", desc: "Launched our first AI prediction model trained on 50,000+ real career trajectories across Asia and Europe." },
                { year: "2024", title: "10K Users", desc: "Reached 10,000 active users across 200+ universities with a 95% satisfaction rate on career matches." },
                { year: "2025", title: "Global Expansion", desc: "Expanded to serve students in 40+ countries with multilingual support and region-specific career data." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5 sm:gap-8 mb-10 sm:mb-12 relative"
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 border-2 flex items-center justify-center z-10 relative" style={{ background: "#0a0a0a", borderColor: "#0a0a0a" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 500, color: "#c8b89a", letterSpacing: "0.05em" }}>{item.year}</span>
                    </div>
                  </div>
                  <div className="pt-2 pb-8 border-b" style={{ borderColor: "#d4cabc", flex: 1 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#0a0a0a" }}>{item.title}</h3>
                    <p style={{ fontWeight: 300, color: "#777", lineHeight: 1.8, fontSize: "0.875rem", marginTop: "0.5rem" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════ */}
        <section style={{ background: "#0a0a0a" }} className="py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(20vw, 28vw, 28vw)", color: "#f5f0e8", opacity: 0.03, lineHeight: 1 }}>JOIN</span>
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8b89a" }}>— Ready?</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f5f0e8", lineHeight: 1.1, marginTop: "1rem", marginBottom: "1.5rem" }}>
              Start Your Career<br /><span style={{ fontStyle: "italic", color: "#c8b89a" }}>Journey Today.</span>
            </h2>
            <p style={{ fontWeight: 300, color: "#666", lineHeight: 1.8, maxWidth: "40ch", margin: "0 auto 2.5rem" }}>
              Join thousands of students who found their direction with CareerAI.
            </p>
            <div className="flex justify-center gap-4 sm:gap-5 flex-wrap">
              <Link href="/prediction"
                className="px-6 sm:px-8 py-3.5 sm:py-4 transition-all"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#c8b89a", color: "#0a0a0a", border: "2px solid #c8b89a" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#9e8a6e"; el.style.borderColor = "#9e8a6e"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "#c8b89a"; el.style.borderColor = "#c8b89a"; }}
              >
                Try Free Prediction →
              </Link>
              <Link href="/register"
                className="px-6 sm:px-8 py-3.5 sm:py-4 transition-all"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#f5f0e8", border: "2px solid #333" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "#555"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "#333"; }}
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}