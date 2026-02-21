"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MarqueeBar from "@/components/Marqueebar";

// ── Inline SVG Illustrations ──────────────────────────────
const BrainCircuitIllustration = () => (
  <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Grid dots */}
    {Array.from({ length: 6 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={40 + col * 48} cy={30 + row * 52} r="2" fill="#222" opacity="0.4" />
      ))
    )}
    {/* Brain outline */}
    <path d="M160 240 C120 240 90 210 90 175 C90 155 100 138 116 128 C112 118 112 105 120 97 C128 89 140 87 150 91 C155 82 164 76 176 76 C185 76 193 80 198 87 C203 80 213 76 224 76 C236 76 245 82 250 91 C260 87 272 89 280 97 C288 105 288 118 284 128 C300 138 310 155 310 175 C310 210 280 240 240 240 Z" stroke="#111" strokeWidth="2.5" fill="#f5f0e8"/>
    {/* Brain lobes detail */}
    <path d="M200 240 L200 160" stroke="#111" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M140 150 C148 140 158 136 168 140" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M145 165 C150 155 162 152 172 156" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M230 150 C238 140 248 136 258 140" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M228 165 C234 155 246 152 256 156" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Circuit paths */}
    <path d="M310 175 L360 175 L360 100 L330 100" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M330 100 L310 80" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="360" cy="175" r="5" fill="#111"/>
    <circle cx="330" cy="100" r="5" fill="#111"/>
    <path d="M360 100 L390 100" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="392" cy="100" r="3" fill="none" stroke="#111" strokeWidth="1.5"/>
    
    <path d="M90 175 L50 175 L50 260 L80 260" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="50" cy="175" r="5" fill="#111"/>
    <path d="M80 260 L50 280" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="50" cy="280" r="5" fill="#111"/>
    
    {/* Nodes */}
    <circle cx="180" cy="120" r="8" fill="#111"/>
    <circle cx="220" cy="120" r="8" fill="#111"/>
    <circle cx="200" cy="145" r="6" fill="#555"/>
    <path d="M180 120 L200 145 L220 120" stroke="#111" strokeWidth="1" opacity="0.5"/>
    
    {/* Floating labels */}
    <rect x="330" y="55" width="68" height="22" rx="4" fill="#111"/>
    <text x="364" y="70" textAnchor="middle" fill="#f5f0e8" fontSize="9" fontFamily="monospace">AI ENGINE</text>
    
    <rect x="10" y="268" width="76" height="22" rx="4" fill="#111"/>
    <text x="48" y="283" textAnchor="middle" fill="#f5f0e8" fontSize="9" fontFamily="monospace">YOUR DATA</text>
    
    {/* Decorative arrows */}
    <path d="M320 66 L332 60" stroke="#111" strokeWidth="1.5" markerEnd="url(#arr)" strokeLinecap="round"/>
    <path d="M86 268 L80 262" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RoadmapIllustration = () => (
  <svg viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background grid */}
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 6 }).map((_, col) => (
        <rect key={`${row}-${col}`} x={20 + col * 58} y={20 + row * 65} width="40" height="50" rx="4" fill="none" stroke="#e8e0d0" strokeWidth="1"/>
      ))
    )}
    {/* Path line */}
    <path d="M60 290 C60 200 160 200 160 120 C160 60 240 60 240 120 C240 180 340 180 340 100" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeDasharray="none"/>
    {/* Steps/milestones */}
    {[
      { cx: 60, cy: 290, label: "START", sublabel: "Profile" },
      { cx: 160, cy: 200, label: "LEARN", sublabel: "Skills" },
      { cx: 240, cy: 120, label: "BUILD", sublabel: "Projects" },
      { cx: 340, cy: 100, label: "LAND", sublabel: "Career" },
    ].map((node, i) => (
      <g key={i}>
        <circle cx={node.cx} cy={node.cy} r="22" fill="#f5f0e8" stroke="#111" strokeWidth="2.5"/>
        <circle cx={node.cx} cy={node.cy} r="14" fill={i === 3 ? "#111" : "none"} stroke="#111" strokeWidth="1.5"/>
        <text x={node.cx} y={node.cy - 32} textAnchor="middle" fill="#111" fontSize="9" fontFamily="monospace" fontWeight="bold">{node.label}</text>
        <text x={node.cx} y={node.cy - 22} textAnchor="middle" fill="#777" fontSize="8" fontFamily="monospace">{node.sublabel}</text>
        {i === 3 && <path d="M334 94 L340 100 L346 94" stroke="#f5f0e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>}
      </g>
    ))}
    {/* Step numbers */}
    <text x="60" y="294" textAnchor="middle" fill="#111" fontSize="11" fontFamily="monospace" fontWeight="bold">1</text>
    <text x="160" y="204" textAnchor="middle" fill="#111" fontSize="11" fontFamily="monospace" fontWeight="bold">2</text>
    <text x="240" y="124" textAnchor="middle" fill="#111" fontSize="11" fontFamily="monospace" fontWeight="bold">3</text>
    {/* Decorative elements */}
    <rect x="280" y="220" width="80" height="50" rx="6" fill="#111"/>
    <text x="320" y="242" textAnchor="middle" fill="#c8b89a" fontSize="8" fontFamily="monospace">TIMELINE</text>
    <text x="320" y="258" textAnchor="middle" fill="#f5f0e8" fontSize="10" fontFamily="monospace" fontWeight="bold">8 months</text>
  </svg>
);

const SkillGapIllustration = () => (
  <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Radar chart */}
    {[1, 0.7, 0.4].map((scale, i) => (
      <polygon
        key={i}
        points={`${180},${140 - 100 * scale} ${180 + 86.6 * scale},${140 - 50 * scale} ${180 + 86.6 * scale},${140 + 50 * scale} ${180},${140 + 100 * scale} ${180 - 86.6 * scale},${140 + 50 * scale} ${180 - 86.6 * scale},${140 - 50 * scale}`}
        stroke="#ddd"
        strokeWidth="1"
        fill={i === 0 ? "#f5f0e8" : "none"}
      />
    ))}
    {/* Axis lines */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle - 90) * Math.PI / 180;
      return <line key={i} x1={180} y1={140} x2={180 + 100 * Math.cos(rad)} y2={140 + 100 * Math.sin(rad)} stroke="#ccc" strokeWidth="1"/>;
    })}
    {/* Current skills polygon */}
    <polygon
      points="180,60 245,100 238,185 180,215 122,185 135,100"
      stroke="#111"
      strokeWidth="2"
      fill="#111"
      fillOpacity="0.12"
    />
    {/* Target skills polygon */}
    <polygon
      points="180,40 262,90 262,190 180,240 98,190 98,90"
      stroke="#888"
      strokeWidth="1.5"
      strokeDasharray="5 3"
      fill="none"
    />
    {/* Skill labels */}
    {[
      { angle: -90, label: "Python", x: 180, y: 28 },
      { angle: -30, label: "Data", x: 276, y: 82 },
      { angle: 30, label: "ML", x: 276, y: 202 },
      { angle: 90, label: "Stats", x: 180, y: 252 },
      { angle: 150, label: "SQL", x: 84, y: 202 },
      { angle: 210, label: "Viz", x: 84, y: 82 },
    ].map((s, i) => (
      <text key={i} x={s.x} y={s.y} textAnchor="middle" fill="#111" fontSize="10" fontFamily="monospace" fontWeight="bold">{s.label}</text>
    ))}
    {/* Legend */}
    <rect x="10" y="250" width="10" height="10" rx="1" fill="#111" fillOpacity="0.2" stroke="#111" strokeWidth="1.5"/>
    <text x="25" y="259" fill="#555" fontSize="8" fontFamily="monospace">Your Skills</text>
    <line x1="90" y1="255" x2="102" y2="255" stroke="#888" strokeWidth="1.5" strokeDasharray="3 2"/>
    <text x="107" y="259" fill="#555" fontSize="8" fontFamily="monospace">Target</text>
  </svg>
);

// ── types ──────────────────────────────────────────────
interface Step { step: string; title: string; desc: string; illustration: React.ReactNode; }
interface Feature { icon: React.ReactNode; title: string; desc: string; }
interface Career { title: string; growth: string; icon: React.ReactNode; }
interface Testimonial { name: string; role: string; text: string; initials: string; }
interface Faq { q: string; a: string; }

// ── Icon Components ────────────────────────────────────
const IconTarget = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
const IconMap = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconBook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="16" y2="10"/>
  </svg>
);
const IconTrend = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconChat = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="15" y2="10"/>
  </svg>
);
const IconCode = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconData = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const IconDesign = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="4"/><path d="M4 20h4l10.5-10.5a2.83 2.83 0 0 0-4-4L4 16v4z"/>
  </svg>
);
const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconCPU = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IconCloud = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    <line x1="12" y1="12" x2="12" y2="18"/><polyline points="9 15 12 18 15 15"/>
  </svg>
);

// ── data ────────────────────────────────────────────────
const steps: Step[] = [
  {
    step: "01",
    title: "Create Your Profile",
    desc: "Tell us about your education, skills, interests, and goals. Our AI listens to every detail.",
    illustration: <BrainCircuitIllustration />,
  },
  {
    step: "02",
    title: "AI Analyzes Your Data",
    desc: "Our deep learning model compares your profile against thousands of career trajectories.",
    illustration: <SkillGapIllustration />,
  },
  {
    step: "03",
    title: "Get Your Career Roadmap",
    desc: "Receive a personalized, step-by-step career plan with learning resources and timelines.",
    illustration: <RoadmapIllustration />,
  },
];

const features: Feature[] = [
  { icon: <IconTarget />, title: "AI-Powered Career Matching", desc: "Our algorithm evaluates 50+ data points from your profile to recommend careers with the highest success probability." },
  { icon: <IconChart />, title: "Skill Gap Analysis", desc: "Instantly see which skills you need to develop to become competitive in your target career field." },
  { icon: <IconMap />, title: "Personalized Roadmaps", desc: "Get a step-by-step learning and career plan tailored specifically to your current level and ambitions." },
  { icon: <IconBook />, title: "Curated Learning Resources", desc: "Access hand-picked courses, certifications, and projects aligned with your recommended career path." },
  { icon: <IconTrend />, title: "Industry Trend Insights", desc: "Stay ahead with real-time data on growing fields, in-demand roles, and emerging technologies." },
  { icon: <IconChat />, title: "AI Career Advisor Chat", desc: "Chat anytime with our AI advisor to ask career questions, get resume tips, and interview prep." },
];

const careers: Career[] = [
  { title: "Software Engineer", growth: "25%", icon: <IconCode /> },
  { title: "Data Scientist", growth: "36%", icon: <IconData /> },
  { title: "UX Designer", growth: "19%", icon: <IconDesign /> },
  { title: "Cybersecurity Analyst", growth: "32%", icon: <IconShield /> },
  { title: "AI/ML Engineer", growth: "40%", icon: <IconCPU /> },
  { title: "Cloud Architect", growth: "28%", icon: <IconCloud /> },
];

const testimonials: Testimonial[] = [
  { name: "Amara Silva", role: "Frontend Engineer at a Tech Startup", text: "I had no idea what to do after graduation. CareerAI showed me exactly what skills I needed and I landed my dream job in 8 months.", initials: "AS" },
  { name: "Rohan Perera", role: "Data Analyst at a Finance Firm", text: "The skill gap analysis was eye-opening. I focused on the right things instead of wasting time on irrelevant courses.", initials: "RP" },
  { name: "Nadia Khan", role: "UX Designer at an Agency", text: "The AI matched me to UX design when I thought I'd go into marketing. Best pivot of my life — now I love my work!", initials: "NK" },
];

const faqs: Faq[] = [
  { q: "Is this free to use?", a: "Yes! You can create a free account and get your first career prediction completely free. Premium plans unlock advanced features." },
  { q: "How accurate is the AI prediction?", a: "Our model achieves 95% alignment accuracy based on user follow-up surveys 12 months after receiving recommendations." },
  { q: "What data does the AI use?", a: "We analyze your academic background, skills, personal interests, personality indicators, and current market trends." },
  { q: "Can I use this if I am already working?", a: "Absolutely. Career transitions are one of our most popular use cases. The AI adapts recommendations based on your existing experience." },
];

// ── page ────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* Google Fonts import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #f5f0e8;
          --ink: #0a0a0a;
          --ink-light: #222;
          --warm-gray: #888;
          --accent: #c8b89a;
          --accent-dark: #9e8a6e;
        }

        body { background: var(--cream); }

        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-mono { font-family: 'DM Mono', 'Courier New', monospace; }
        .font-body { font-family: 'DM Sans', system-ui, sans-serif; }

        .text-stroke {
          -webkit-text-stroke: 2px var(--ink);
          color: transparent;
        }

        .ruled-line {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            #e8e0d0 31px,
            #e8e0d0 32px
          );
        }

        .tag-pill {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border: 1px solid currentColor;
          border-radius: 2px;
        }
      `}</style>

      <div className="font-body" style={{ background: "var(--cream)", color: "var(--ink)" }}>

        {/* ========== HERO ========== */}
        <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative overflow-hidden">
          {/* Decorative ruled lines */}
          <div className="absolute inset-0 ruled-line opacity-40 pointer-events-none" />

          {/* Large decorative letter */}
          <div className="absolute -top-8 -right-8 font-display font-black text-[22vw] leading-none text-stroke opacity-5 pointer-events-none select-none" style={{ WebkitTextStroke: "2px #111" }}>AI</div>

          <div className="relative grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="tag-pill" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>
                  ◆ AI-Powered Career Intelligence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display font-black mt-6 mb-6 leading-[1.05]"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--ink)" }}
              >
                Discover<br />
                <span style={{ color: "var(--accent-dark)", fontStyle: "italic" }}>Your Future</span><br />
                Career.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-base leading-relaxed mb-8 max-w-sm"
                style={{ color: "var(--warm-gray)", fontWeight: 300 }}
              >
                Our intelligent system analyzes your skills, education, and interests
                to recommend the perfect career path — then gives you the roadmap to get there.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex gap-4 flex-wrap"
              >
                <Link
                  href="/prediction"
                  className="font-mono text-sm tracking-wide px-7 py-3.5 transition-all"
                  style={{
                    background: "var(--ink)",
                    color: "var(--cream)",
                    border: "2px solid var(--ink)",
                    letterSpacing: "0.06em",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "var(--accent-dark)"; (e.target as HTMLElement).style.borderColor = "var(--accent-dark)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "var(--ink)"; (e.target as HTMLElement).style.borderColor = "var(--ink)"; }}
                >
                  TRY FREE PREDICTION →
                </Link>
                <Link
                  href="/register"
                  className="font-mono text-sm tracking-wide px-7 py-3.5 transition-all"
                  style={{
                    background: "transparent",
                    color: "var(--ink)",
                    border: "2px solid var(--ink)",
                    letterSpacing: "0.06em",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--ink)"; el.style.color = "var(--cream)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--ink)"; }}
                >
                  CREATE ACCOUNT
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-xs mt-8"
                style={{ color: "var(--warm-gray)", letterSpacing: "0.08em" }}
              >
                TRUSTED BY STUDENTS FROM{" "}
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>200+ UNIVERSITIES</span>{" "}
                WORLDWIDE
              </motion.p>
            </div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative border frame */}
                <div className="absolute inset-0 border-2 translate-x-4 translate-y-4" style={{ borderColor: "var(--accent)" }}/>
                <div className="absolute inset-0 border-2 bg-white" style={{ borderColor: "var(--ink)" }}>
                  <BrainCircuitIllustration />
                </div>
                {/* Tag */}
                <div className="absolute -bottom-5 -left-5 px-4 py-2" style={{ background: "var(--ink)", color: "var(--cream)" }}>
                  <span className="font-mono text-xs tracking-widest">NEURAL MATCHING</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== STATS ========== */}
        <section style={{ background: "var(--ink)", color: "var(--cream)" }} className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {(
              [["10K+", "Students Guided"], ["95%", "Prediction Accuracy"], ["200+", "Career Paths Mapped"], ["24/7", "AI Availability"]] as [string,string][]
            ).map(([num, label], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-6 text-center"
              >
                <div className="font-display font-black text-5xl mb-2" style={{ color: "var(--accent)" }}>{num}</div>
                <div className="font-mono text-xs tracking-widest" style={{ color: "#888", textTransform: "uppercase" }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== MARQUEE ========== */}
        <MarqueeBar />

        {/* ========== HOW IT WORKS ========== */}
        <section className="max-w-7xl mx-auto px-6 py-28">
          <div className="mb-20">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent-dark)" }}>— Process</span>
            <h2 className="font-display font-black text-5xl md:text-6xl mt-3" style={{ color: "var(--ink)" }}>
              Three Steps to Your<br />
              <span style={{ fontStyle: "italic" }}>Dream Career.</span>
            </h2>
          </div>

          <div className="space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Text */}
                <div>
                  <div className="font-display font-black text-8xl leading-none mb-6" style={{ color: "var(--accent)", opacity: 0.4 }}>{s.step}</div>
                  <h3 className="font-display font-bold text-3xl mb-4" style={{ color: "var(--ink)" }}>{s.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--warm-gray)", fontWeight: 300, maxWidth: "36ch" }}>{s.desc}</p>
                  <div className="mt-8 h-px" style={{ background: "var(--accent)", maxWidth: "200px" }}/>
                </div>
                {/* Illustration */}
                <div className="relative">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 border-2" style={{ borderColor: "var(--accent)" }}/>
                  <div className="relative border-2 p-6 bg-white" style={{ borderColor: "var(--ink)" }}>
                    <div className="h-64">{s.illustration}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section style={{ background: "var(--ink)" }} className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>— Features</span>
              <h2 className="font-display font-black text-5xl mt-3" style={{ color: "var(--cream)" }}>
                Everything You Need<br/>
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>to Succeed.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px" style={{ background: "#333" }}>
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ background: "#1a1a1a" } as any}
                  className="p-8 transition-colors"
                  style={{ background: "var(--ink-light)" }}
                >
                  <div className="mb-5" style={{ color: "var(--accent)" }}>{f.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--cream)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#888", fontWeight: 300 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TRENDING CAREERS ========== */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent-dark)" }}>— Trending Now</span>
            <h2 className="font-display font-black text-5xl mt-3" style={{ color: "var(--ink)" }}>
              High-Growth Career<br />
              <span style={{ fontStyle: "italic" }}>Paths in 2025.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {careers.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-6 p-6 border-2 transition-all cursor-pointer group"
                style={{ borderColor: "var(--ink)", background: "white" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--cream)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--ink)"; }}
              >
                <div className="transition-colors">{c.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-lg">{c.title}</h3>
                  <p className="font-mono text-sm mt-1" style={{ color: "var(--accent-dark)", letterSpacing: "0.06em" }}>↑ {c.growth} GROWTH</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <section style={{ background: "#f0e8d8" }} className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent-dark)" }}>— Success Stories</span>
              <h2 className="font-display font-black text-5xl mt-3" style={{ color: "var(--ink)" }}>
                Students Who Found<br />
                <span style={{ fontStyle: "italic" }}>Their Path.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 border-2 bg-white relative"
                  style={{ borderColor: "var(--ink)" }}
                >
                  {/* Large quote mark */}
                  <div className="font-display font-black text-8xl leading-none absolute top-2 right-6 opacity-10" style={{ color: "var(--ink)" }}>"</div>
                  <p className="text-sm leading-relaxed mb-8 relative" style={{ color: "#555", fontWeight: 300, fontStyle: "italic" }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: "var(--accent)" }}>
                    <div className="w-11 h-11 flex items-center justify-center font-mono text-sm font-bold" style={{ background: "var(--ink)", color: "var(--cream)" }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: "var(--ink)" }}>{t.name}</p>
                      <p className="font-mono text-xs" style={{ color: "var(--warm-gray)", letterSpacing: "0.05em" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="max-w-4xl mx-auto px-6 py-24">
          <div className="mb-14">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent-dark)" }}>— FAQ</span>
            <h2 className="font-display font-black text-5xl mt-3" style={{ color: "var(--ink)" }}>Common Questions.</h2>
          </div>

          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="mb-0 border-t-2 py-8"
              style={{ borderColor: "var(--ink)" }}
            >
              <div className="flex gap-6">
                <span className="font-mono text-sm font-bold shrink-0 mt-1" style={{ color: "var(--accent-dark)" }}>0{i + 1}</span>
                <div>
                  <h4 className="font-display font-bold text-xl mb-3" style={{ color: "var(--ink)" }}>{faq.q}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--warm-gray)", fontWeight: 300, maxWidth: "60ch" }}>{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t-2" style={{ borderColor: "var(--ink)" }}/>
        </section>

        {/* ========== CTA ========== */}
        <section style={{ background: "var(--ink)" }} className="py-28 relative overflow-hidden">
          {/* Big background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-display font-black text-[25vw] leading-none opacity-5" style={{ color: "var(--cream)" }}>GO</span>
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>— Start Now</span>
            <h2 className="font-display font-black mt-4 mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--cream)" }}>
              Your Future Career<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Starts Here.</span>
            </h2>
            <p className="mb-12 text-base" style={{ color: "#888", fontWeight: 300, maxWidth: "42ch", margin: "0 auto 3rem" }}>
              Join 10,000+ students who used AI to find direction, build skills, and land meaningful careers.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                href="/prediction"
                className="font-mono text-sm tracking-wide px-8 py-4 transition-all"
                style={{ background: "var(--accent)", color: "var(--ink)", border: "2px solid var(--accent)", letterSpacing: "0.08em" }}
              >
                TRY FREE PREDICTION →
              </Link>
              <Link
                href="/register"
                className="font-mono text-sm tracking-wide px-8 py-4 transition-all"
                style={{ background: "transparent", color: "var(--cream)", border: "2px solid #444", letterSpacing: "0.08em" }}
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}