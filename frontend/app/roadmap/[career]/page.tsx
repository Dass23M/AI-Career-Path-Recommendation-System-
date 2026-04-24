"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getRoadmap } from "@/data/roadmapData";
import ProtectedRoute from "@/components/ProtectedRoute";

// ── Icons ──────────────────────────────────────────────
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconSalary = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconTrend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconTool = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconBadge = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconCompany = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

// Phase color palette following the existing design
const PHASE_STYLES = [
  { bg: "#0a0a0a", text: "#c8b89a", border: "#0a0a0a", labelBg: "#c8b89a", labelText: "#0a0a0a" },
  { bg: "#9e8a6e", text: "#fff", border: "#9e8a6e", labelBg: "#9e8a6e", labelText: "#fff" },
  { bg: "#0a0a0a", text: "#c8b89a", border: "#0a0a0a", labelBg: "#c8b89a", labelText: "#0a0a0a" },
  { bg: "#c8b89a", text: "#0a0a0a", border: "#0a0a0a", labelBg: "#0a0a0a", labelText: "#c8b89a" },
];

export default function RoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.career as string;
  const roadmap = getRoadmap(slug);

  // ── Not Found ──────────────────────────────────────────
  if (!roadmap) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#f5f0e8" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>
            — 404 Not Found
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "3rem", color: "#0a0a0a", marginTop: "0.5rem" }}>
            Career Not Found
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#595959", margin: "1rem 0 2rem" }}>
            We don't have a roadmap for this career yet.
          </p>
          <button
            onClick={() => router.back()}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "#0a0a0a", color: "#f5f0e8", padding: "0.9rem 2rem", border: "none", cursor: "pointer" }}
          >
            ← Go Back
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #faf8f4; }
          ::-webkit-scrollbar-thumb { background: #d4cabc; }
          .rm-tag {
            display: inline-block;
            padding: 0.3rem 0.7rem;
            font-family: 'DM Mono', monospace;
            font-size: 0.68rem;
            letter-spacing: 0.05em;
            background: #f5f0e8;
            border: 1.5px solid #d4cabc;
            color: #595959;
            transition: border-color 0.15s, color 0.15s;
          }
          .rm-tag:hover { border-color: #9e8a6e; color: #0a0a0a; }
          .phase-connector {
            width: 2px;
            background: linear-gradient(to bottom, #0a0a0a, #d4cabc);
            flex-shrink: 0;
          }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

        <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
          <div className="max-w-6xl mx-auto px-6 py-16">

            {/* ── Breadcrumb / Back ── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 transition-all"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e8a6e", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#0a0a0a"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9e8a6e"}
              >
                <IconArrow /> Back to Prediction
              </button>
            </motion.div>

            {/* ── Hero Header ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>
                — Career Roadmap
              </span>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: "#0a0a0a", lineHeight: 1.05, marginTop: "0.4rem" }}>
                {roadmap.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>
                  {roadmap.title.split(" ").slice(-1)[0]}.
                </span>
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#595959", marginTop: "1rem", maxWidth: "64ch", fontSize: "0.95rem", lineHeight: 1.75 }}>
                {roadmap.description}
              </p>
            </motion.div>

            {/* ── Stats Strip ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2" style={{ borderColor: "#0a0a0a" }}>
                {[
                  { icon: <IconSalary />, label: "Avg. Salary", value: roadmap.avgSalary },
                  { icon: <IconTrend />, label: "Job Growth", value: roadmap.jobGrowth },
                  { icon: <IconClock />, label: "Time to First Job", value: roadmap.timeToJob },
                  { icon: null, label: "Roadmap Phases", value: `${roadmap.phases.length} Phases` },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-5"
                    style={{
                      borderRight: i < 3 ? "1.5px solid #0a0a0a" : "none",
                      borderBottom: "none",
                      background: i === 0 ? "#0a0a0a" : "white",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-2" style={{ color: i === 0 ? "#c8b89a" : "#9e8a6e" }}>
                      {stat.icon}
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: i === 0 ? "#c8b89a" : "#9e8a6e" }}>
                        {stat.label}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.3rem", color: i === 0 ? "#f5f0e8" : "#0a0a0a", lineHeight: 1.2 }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Main Two-Column Layout ── */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">

              {/* ── Phases Column (2/3) ── */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                  <div className="mb-6 flex items-center gap-3">
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.5rem", color: "#0a0a0a" }}>
                      Your Learning Roadmap
                    </h2>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#0a0a0a", color: "#c8b89a", padding: "0.25rem 0.6rem" }}>
                      Step-by-step
                    </span>
                  </div>

                  {/* Phase cards with vertical connector */}
                  <div className="relative">
                    {roadmap.phases.map((phase, i) => {
                      const style = PHASE_STYLES[i % PHASE_STYLES.length];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.12, duration: 0.5 }}
                          className="relative mb-0"
                        >
                          {/* Vertical connector line */}
                          {i < roadmap.phases.length - 1 && (
                            <div
                              style={{
                                position: "absolute",
                                left: "2rem",
                                top: "100%",
                                width: "2px",
                                height: "32px",
                                background: "linear-gradient(to bottom, #0a0a0a 0%, #d4cabc 100%)",
                                zIndex: 1,
                              }}
                            />
                          )}

                          <div
                            className="border-2 bg-white mb-8"
                            style={{ borderColor: "#0a0a0a" }}
                          >
                            {/* Phase Header */}
                            <div
                              className="flex items-center justify-between px-6 py-4"
                              style={{ background: style.bg, borderBottom: "none" }}
                            >
                              <div className="flex items-center gap-4">
                                <span
                                  style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "2rem",
                                    fontWeight: 500,
                                    color: style.text,
                                    opacity: 0.35,
                                    lineHeight: 1,
                                    letterSpacing: "-0.03em",
                                    minWidth: "2.5rem",
                                  }}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <div
                                    style={{
                                      fontFamily: "'DM Mono', monospace",
                                      fontSize: "0.58rem",
                                      letterSpacing: "0.15em",
                                      textTransform: "uppercase",
                                      color: style.text,
                                      opacity: 0.65,
                                      marginBottom: "0.2rem",
                                    }}
                                  >
                                    Phase {i + 1}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: "'Playfair Display', Georgia, serif",
                                      fontWeight: 700,
                                      fontSize: "1.15rem",
                                      color: style.text,
                                    }}
                                  >
                                    {phase.title}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-1.5 px-3 py-1.5"
                                style={{ background: style.labelBg, flexShrink: 0 }}
                              >
                                <span style={{ color: style.labelText, display: "flex" }}>
                                  <IconClock />
                                </span>
                                <span
                                  style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.06em",
                                    color: style.labelText,
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {phase.duration}
                                </span>
                              </div>
                            </div>

                            {/* Topics List */}
                            <div className="px-6 py-5">
                              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                {phase.topics.map((topic, j) => (
                                  <div key={j} className="flex items-start gap-2.5">
                                    <span
                                      className="flex-shrink-0 flex items-center justify-center mt-0.5"
                                      style={{
                                        width: "18px",
                                        height: "18px",
                                        background: "#0a0a0a",
                                        color: "#c8b89a",
                                        borderRadius: "0",
                                      }}
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        color: "#0a0a0a",
                                        lineHeight: 1.5,
                                      }}
                                    >
                                      {topic}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* ── Sidebar (1/3) ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="lg:col-span-1 space-y-6"
                style={{ position: "sticky", top: "2rem" }}
              >

                {/* Tools & Technologies */}
                <div className="border-2 bg-white p-5" style={{ borderColor: "#0a0a0a" }}>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: "#e8e0d0" }}>
                    <span style={{ color: "#9e8a6e" }}><IconTool /></span>
                    <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a0a" }}>
                      Tools & Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.topTools.map((tool, i) => (
                      <span key={i} className="rm-tag">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="border-2 p-5" style={{ borderColor: "#0a0a0a", background: "#0a0a0a" }}>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: "#222" }}>
                    <span style={{ color: "#c8b89a" }}><IconBadge /></span>
                    <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8b89a" }}>
                      Key Certifications
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {roadmap.certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#9e8a6e", marginTop: "0.1rem", flexShrink: 0 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "#d4cabc", lineHeight: 1.5 }}>
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Companies */}
                <div className="border-2 bg-white p-5" style={{ borderColor: "#0a0a0a" }}>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: "#e8e0d0" }}>
                    <span style={{ color: "#9e8a6e" }}><IconCompany /></span>
                    <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a0a" }}>
                      Top Employers
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {roadmap.companies.map((co, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#e8e0d0" }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#0a0a0a" }}>{co}</span>
                        <span style={{ color: "#c8b89a", fontSize: "0.5rem" }}>◆</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip box */}
                <div className="p-4 border" style={{ borderColor: "#d4cabc", background: "#faf8f4" }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#a0a0a0", lineHeight: 1.9 }}>
                    ◆ Build projects at every phase<br />
                    ◆ Network actively on LinkedIn<br />
                    ◆ Contribute to open source
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Footer CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-16 border-2 bg-white"
              style={{ borderColor: "#0a0a0a" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }} />
              <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>
                    ◆ Your Journey Starts Now
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.8rem", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.4rem" }}>
                    Ready to become a{" "}
                    <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>{roadmap.title}?</span>
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#595959", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    Follow the phases above, stay consistent, and you'll be job-ready.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => router.back()}
                    className="px-6 py-3 transition-all"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: "#0a0a0a", border: "1.5px solid #0a0a0a", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f0e8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    ← New Prediction
                  </button>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="px-6 py-3 transition-all"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#0a0a0a", color: "#f5f0e8", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}
                  >
                    Back to Top ↑
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}
