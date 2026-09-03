"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { getCareerSlug } from "@/data/roadmapData";
import { getMyProfile } from "@/services/profileService";

// ── Dataset Options ────────────────────────────────────
const EDUCATION_OPTIONS = ["Bachelor's", "Master's", "PhD"];

const SKILLS_OPTIONS = [
  ".NET", "AI", "Adobe Creative Suite", "Adobe Illustrator", "Adobe Photoshop",
  "Adobe XD", "Agile", "Algorithms", "Analytics", "Android", "Automation",
  "Big Data", "Business Analysis", "C#", "C++", "CRM", "CSS", "Cloud Computing",
  "Communication", "Content Creation", "Content Strategy", "Content Writing",
  "Copywriting", "Creativity", "Cybersecurity", "Data Analysis", "Data Mining",
  "Data Science", "Data Structures", "Data Visualization", "Data Warehousing",
  "Deep Learning", "DevOps", "Digital Illustration", "Digital Marketing", "ETL",
  "Econometrics", "Embedded Systems", "Excel", "Financial Analysis",
  "Graphic Design", "HTML", "Illustration", "Interaction Design", "IoT", "Java",
  "JavaScript", "Linux", "Machine Learning", "Marketing Strategy", "Microservices",
  "NLP", "Natural Language Processing", "Negotiation", "Network Security",
  "Node.js", "Project Management", "Prototyping", "Python", "R", "React",
  "Research", "Risk Analysis", "SEO", "SQL", "Social Media", "Software Design",
  "Spring", "Statistical Analysis", "Statistics", "Storytelling", "System Design",
  "TensorFlow", "UI Design", "UI/UX", "UX", "UX Design", "UX Research",
  "UX/UI", "User Research",
];

const INTERESTS_OPTIONS = [
  "AI", "Academia", "Analytics", "Arts", "Automation", "Biotech", "Business",
  "Coding", "Communications", "Content", "Cybersecurity", "Data Analysis",
  "Data Analytics", "Data Science", "Design", "Digital Media", "Electronics",
  "Engineering", "Finance", "Gaming", "Healthcare", "Innovation", "Language",
  "Linguistics", "Management", "Marketing", "Media", "Mobile Apps", "Research",
  "Security", "Social Media", "Software Development", "Software Engineering",
  "Statistics", "Technology", "User Experience", "Web Design", "Web Development",
];

// ── Inline SVG Illustrations ───────────────────────────
const PredictionIllustration = () => (
  <svg viewBox="0 0 520 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 12 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={20 + col * 44} cy={20 + row * 52} r="1.5" fill="#222" opacity="0.2" />
      ))
    )}
    <path d="M40 100 L480 100" stroke="#d4cabc" strokeWidth="2" strokeDasharray="6 4" />
    {[
      { cx: 80,  label: "Profile",  sub: "Your Info",    filled: true  },
      { cx: 200, label: "Skills",   sub: "What you know", filled: true  },
      { cx: 320, label: "AI Model", sub: "Processing",   filled: false },
      { cx: 440, label: "Career",   sub: "Your Path",    filled: false },
    ].map((node, i) => (
      <g key={i}>
        {i < 3 && (
          <line x1={node.cx + 28} y1="100" x2={node.cx + 120} y2="100"
            stroke={i < 1 ? "#9e8a6e" : "#d4cabc"} strokeWidth="2" />
        )}
        <circle cx={node.cx} cy="100" r="28" fill={node.filled ? "#0a0a0a" : "#f5f0e8"} stroke="#0a0a0a" strokeWidth="2" />
        {i === 2 && <circle cx="320" cy="100" r="18" fill="none" stroke="#c8b89a" strokeWidth="1.5" strokeDasharray="4 3" />}
        <text x={node.cx} y="105" textAnchor="middle" fill={node.filled ? "#c8b89a" : "#555"} fontSize="13" fontFamily="monospace" fontWeight="bold">{`0${i + 1}`}</text>
        <text x={node.cx} y="145" textAnchor="middle" fill="#0a0a0a" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{node.label}</text>
        <text x={node.cx} y="158" textAnchor="middle" fill="#888" fontSize="8" fontFamily="monospace">{node.sub}</text>
      </g>
    ))}
    {[[305, 80], [335, 80], [320, 65]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#c8b89a" strokeWidth="1.2" />
        <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#c8b89a" strokeWidth="1.2" />
      </g>
    ))}
  </svg>
);

const ResultIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24">
    <circle cx="60" cy="60" r="54" fill="#f5f0e8" stroke="#0a0a0a" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="38" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeDasharray="5 3" />
    <circle cx="60" cy="60" r="20" fill="#0a0a0a" />
    <path d="M60 46 L63 56 L74 56 L65 63 L68 74 L60 67 L52 74 L55 63 L46 56 L57 56 Z" fill="#c8b89a" />
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = angle * Math.PI / 180;
      return <circle key={i} cx={60 + 46 * Math.cos(rad)} cy={60 + 46 * Math.sin(rad)} r="3" fill={i % 2 === 0 ? "#0a0a0a" : "#c8b89a"} />;
    })}
  </svg>
);

// ── Icons ──────────────────────────────────────────────
const IconEducation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const IconSkills = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconInterests = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconClose = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSpinner = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

// ── Single-Select Dropdown ─────────────────────────────
interface SingleSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function SingleSelect({ value, onChange, options, placeholder, icon, isActive, onFocus, onBlur }: SingleSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
        onBlur();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const handleOpen = () => {
    setOpen(true);
    onFocus();
  };

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setSearch("");
    onBlur();
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={handleOpen}
        className="pred-input flex items-center justify-between cursor-pointer select-none"
        style={{
          borderColor: isActive || open ? "#0a0a0a" : "#d4cabc",
          background: isActive || open ? "white" : "#faf8f4",
          paddingLeft: "2.8rem",
        }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: isActive || open ? "#9e8a6e" : "#ccc" }}>
          {icon}
        </div>
        <span style={{ color: value ? "#0a0a0a" : "#ccc", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
          {value || placeholder}
        </span>
        <span style={{ color: "#aaa", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", display: "flex" }}>
          <IconChevron />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 border-2 bg-white shadow-lg"
          style={{ borderColor: "#0a0a0a", maxHeight: "220px", overflowY: "auto" }}>
          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: "#e8e0d0" }}>
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #d4cabc",
                padding: "0.35rem 0.6rem",
                fontSize: "0.8rem",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                background: "#faf8f4",
              }}
            />
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#aaa", fontFamily: "'DM Mono', monospace" }}>
              No results
            </div>
          ) : (
            filtered.map(opt => (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                style={{
                  padding: "0.6rem 1rem",
                  fontSize: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  cursor: "pointer",
                  background: value === opt ? "#f5f0e8" : "white",
                  color: value === opt ? "#9e8a6e" : "#0a0a0a",
                  borderLeft: value === opt ? "2px solid #9e8a6e" : "2px solid transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = "#faf8f4"; }}
                onMouseLeave={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                {opt}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── Multi-Select Dropdown ──────────────────────────────
interface MultiSelectProps {
  values: string[];
  onChange: (vals: string[]) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function MultiSelect({ values, onChange, options, placeholder, icon, isActive, onFocus, onBlur }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
        onBlur();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  const remove = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter(v => v !== opt));
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={() => { setOpen(o => !o); onFocus(); }}
        className="pred-input cursor-pointer select-none"
        style={{
          borderColor: isActive || open ? "#0a0a0a" : "#d4cabc",
          background: isActive || open ? "white" : "#faf8f4",
          paddingLeft: "2.8rem",
          minHeight: "46px",
          height: "auto",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.3rem",
          paddingTop: values.length > 0 ? "0.5rem" : undefined,
          paddingBottom: values.length > 0 ? "0.5rem" : undefined,
          paddingRight: "2rem",
        }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: isActive || open ? "#9e8a6e" : "#ccc", top: values.length > 0 ? "50%" : undefined }}>
          {icon}
        </div>

        {values.length === 0 ? (
          <span style={{ color: "#ccc", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            {placeholder}
          </span>
        ) : (
          values.map(v => (
            <span key={v} style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              background: "#0a0a0a", color: "#c8b89a",
              padding: "0.15rem 0.5rem",
              fontSize: "0.7rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
            }}>
              {v}
              <span onClick={(e) => remove(v, e)} style={{ cursor: "pointer", opacity: 0.7, display: "flex" }}>
                <IconClose />
              </span>
            </span>
          ))
        )}

        <span style={{
          position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
          color: "#aaa", transition: "transform 0.2s",
          ...(open ? { transform: "translateY(-50%) rotate(180deg)" } : {}),
          display: "flex",
        }}>
          <IconChevron />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 border-2 bg-white shadow-lg"
          style={{ borderColor: "#0a0a0a", maxHeight: "220px", overflowY: "auto" }}>
          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: "#e8e0d0" }}>
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #d4cabc",
                padding: "0.35rem 0.6rem",
                fontSize: "0.8rem",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                background: "#faf8f4",
              }}
            />
          </div>
          {/* Count badge */}
          {values.length > 0 && (
            <div style={{ padding: "0.4rem 1rem", fontSize: "0.65rem", color: "#9e8a6e", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", borderBottom: "1px solid #e8e0d0" }}>
              {values.length} selected · click to deselect
            </div>
          )}
          {filtered.length === 0 ? (
            <div style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "#aaa", fontFamily: "'DM Mono', monospace" }}>
              No results
            </div>
          ) : (
            filtered.map(opt => {
              const selected = values.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggle(opt)}
                  style={{
                    padding: "0.6rem 1rem",
                    fontSize: "0.85rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: selected ? "#f5f0e8" : "white",
                    color: selected ? "#9e8a6e" : "#0a0a0a",
                    borderLeft: selected ? "2px solid #9e8a6e" : "2px solid transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = "#faf8f4"; }}
                  onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = "white"; }}
                >
                  {opt}
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9e8a6e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────
export default function PredictionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    education: "",
    skills: [] as string[],
    interests: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyProfile();
        const data = res.data.data;
        if (data) {
          setFormData({
            education: data.education || "",
            skills: data.skills || [],
            interests: data.interests || [],
          });
        }
      } catch (err) {
        // No profile found, stick to empty defaults
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.education) { setError("Please select your education level."); return; }
    if (formData.skills.length === 0) { setError("Please select at least one skill."); return; }
    if (formData.interests.length === 0) { setError("Please select at least one interest."); return; }

    setLoading(true);
    setError("");
    setResult(null);
    try {
      const token = localStorage.getItem("token");
      const { education, skills, interests } = formData;
      const payload = { education, skills, interests };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${apiUrl}/ai/predict`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.prediction);
    } catch {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
          .pred-input {
            width: 100%;
            border: 1.5px solid #d4cabc;
            background: #faf8f4;
            padding: 0.85rem 1rem 0.85rem 2.8rem;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            font-weight: 300;
            color: #0a0a0a;
            outline: none;
            transition: border-color 0.2s, background 0.2s;
          }
          .pred-input::placeholder { color: #ccc; }
          .pred-input:focus { border-color: #0a0a0a; background: white; }
          .pred-input.active { border-color: #0a0a0a; background: white; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .spin { animation: spin 1s linear infinite; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #faf8f4; }
          ::-webkit-scrollbar-thumb { background: #d4cabc; }
        `}</style>

        <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
          <div className="max-w-4xl mx-auto px-6 py-20">

            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>
                — AI Career Intelligence
              </span>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#0a0a0a", lineHeight: 1.05, marginTop: "0.5rem" }}>
                Career Prediction<br />
                <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>Engine.</span>
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#595959", marginTop: "1rem", maxWidth: "50ch", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Fill in your profile below. Our deep learning model will analyze your data against thousands of career trajectories.
              </p>
            </motion.div>

            {/* ── Process Illustration ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mb-12">
              <div className="border-2 bg-white px-6 pt-6 pb-4 relative" style={{ borderColor: "#0a0a0a" }}>
                <div className="absolute -top-3 left-6 px-3" style={{ background: "#f5f0e8" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>How It Works</span>
                </div>
                <div className="h-44"><PredictionIllustration /></div>
              </div>
            </motion.div>

            {/* ── Form + Side Panel ── */}
            <div className="grid lg:grid-cols-5 gap-8">

              {/* Form — 3 cols */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-3">
                <div className="border-2 bg-white p-8" style={{ borderColor: "#0a0a0a" }}>
                  <div className="mb-6 pb-6 border-b" style={{ borderColor: "#e8e0d0" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.4rem", color: "#0a0a0a" }}>
                      Your Profile
                    </h2>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#a0a0a0", textTransform: "uppercase", marginTop: "0.25rem" }}>
                      3 fields · ~1 minute
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">

                      {/* Education — single select */}
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "education" ? "#0a0a0a" : "#595959", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                          <span style={{ color: activeField === "education" ? "#9e8a6e" : "#ccc", transition: "color 0.2s" }}><IconEducation /></span>
                          Education Level
                        </label>
                        <SingleSelect
                          value={formData.education}
                          onChange={val => setFormData({ ...formData, education: val })}
                          options={EDUCATION_OPTIONS}
                          placeholder="Select your qualification"
                          icon={<IconEducation />}
                          isActive={activeField === "education"}
                          onFocus={() => setActiveField("education")}
                          onBlur={() => setActiveField(null)}
                        />
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#bbb", marginTop: "0.4rem" }}>
                          Your highest qualification or current study
                        </p>
                      </motion.div>

                      {/* Skills — multi select */}
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.46 }}>
                        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "skills" ? "#0a0a0a" : "#595959", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                          <span style={{ color: activeField === "skills" ? "#9e8a6e" : "#ccc", transition: "color 0.2s" }}><IconSkills /></span>
                          Key Skills
                          {formData.skills.length > 0 && (
                            <span style={{ marginLeft: "auto", background: "#0a0a0a", color: "#c8b89a", padding: "0.1rem 0.45rem", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace" }}>
                              {formData.skills.length}
                            </span>
                          )}
                        </label>
                        <MultiSelect
                          values={formData.skills}
                          onChange={vals => setFormData({ ...formData, skills: vals })}
                          options={SKILLS_OPTIONS}
                          placeholder="Select your skills"
                          icon={<IconSkills />}
                          isActive={activeField === "skills"}
                          onFocus={() => setActiveField("skills")}
                          onBlur={() => setActiveField(null)}
                        />
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#bbb", marginTop: "0.4rem" }}>
                          Select all skills that apply to you
                        </p>
                      </motion.div>

                      {/* Interests — multi select */}
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.54 }}>
                        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "interests" ? "#0a0a0a" : "#595959", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                          <span style={{ color: activeField === "interests" ? "#9e8a6e" : "#ccc", transition: "color 0.2s" }}><IconInterests /></span>
                          Interests & Passions
                          {formData.interests.length > 0 && (
                            <span style={{ marginLeft: "auto", background: "#0a0a0a", color: "#c8b89a", padding: "0.1rem 0.45rem", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace" }}>
                              {formData.interests.length}
                            </span>
                          )}
                        </label>
                        <MultiSelect
                          values={formData.interests}
                          onChange={vals => setFormData({ ...formData, interests: vals })}
                          options={INTERESTS_OPTIONS}
                          placeholder="Select your interests"
                          icon={<IconInterests />}
                          isActive={activeField === "interests"}
                          onFocus={() => setActiveField("interests")}
                          onBlur={() => setActiveField(null)}
                        />
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#bbb", marginTop: "0.4rem" }}>
                          What topics genuinely excite you?
                        </p>
                      </motion.div>

                    </div>

                    {error && (
                      <div className="mt-6 p-3 border-l-2" style={{ borderColor: "#c0392b", background: "#fdf0ee" }}>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#c0392b", letterSpacing: "0.05em" }}>{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 mt-8 flex items-center justify-center gap-3 transition-all"
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: loading ? "#555" : "#0a0a0a",
                        color: "#f5f0e8",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; }}
                      onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}
                    >
                      {loading ? (
                        <><span className="spin"><IconSpinner /></span>Analyzing your profile...</>
                      ) : (
                        "Run AI Prediction →"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Side Panel — 2 cols */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="lg:col-span-2 space-y-6">

                {/* What we analyze */}
                <div className="border-2 p-6" style={{ borderColor: "#0a0a0a", background: "white" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", marginBottom: "1rem" }}>
                    What We Analyze
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "50+ data points", sub: "from your profile" },
                      { label: "1,000+ careers",  sub: "in our database"  },
                      { label: "Real-time trends", sub: "market analysis"  },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span style={{ color: "#c8b89a", fontSize: "0.6rem", marginTop: "0.2rem", flexShrink: 0 }}>◆</span>
                        <div>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", fontWeight: 500, color: "#0a0a0a" }}>{item.label}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#595959" }}>{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="border-2 p-6" style={{ borderColor: "#0a0a0a", background: "#0a0a0a" }}>
                  {[["95%", "Accuracy Rate"], ["8 mo", "Avg. Time to Hire"], ["10K+", "Users Guided"]].map(([num, label], i) => (
                    <div key={i} className={`py-4 ${i < 2 ? "border-b" : ""}`} style={{ borderColor: "#222" }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.8rem", color: "#c8b89a" }}>{num}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#a0a0a0" }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Privacy note */}
                <div className="p-4 border" style={{ borderColor: "#d4cabc", background: "#faf8f4" }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#a0a0a0", lineHeight: 1.8 }}>
                    ◆ Your data is encrypted<br />◆ Never sold to third parties<br />◆ Delete anytime
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Result ── */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="mt-12"
                >
                  <div className="border-2 bg-white relative overflow-hidden" style={{ borderColor: "#0a0a0a" }}>
                    <div className="h-1" style={{ background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }} />
                    <div className="p-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="shrink-0"><ResultIllustration /></div>
                      <div className="flex-1 text-center md:text-left">
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>
                          ◆ Your AI-Matched Career
                        </span>
                        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.5rem" }}>
                          {result.career}
                        </h2>
                        {result.description && (
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#595959", marginTop: "1rem", lineHeight: 1.7, maxWidth: "55ch" }}>
                            {result.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                          {/* View Roadmap — navigates to the career roadmap page */}
                          <button
                            onClick={() => router.push(`/roadmap/${getCareerSlug(result.career)}`)}
                            className="px-6 py-3 transition-all text-sm"
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              fontSize: "0.7rem",
                              background: "#0a0a0a",
                              color: "#f5f0e8",
                              border: "1.5px solid #0a0a0a",
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; (e.currentTarget as HTMLElement).style.borderColor = "#9e8a6e"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; (e.currentTarget as HTMLElement).style.borderColor = "#0a0a0a"; }}
                          >
                            View Roadmap →
                          </button>
                          {/* New Prediction — resets the form */}
                          <button
                            onClick={() => { setResult(null); setFormData({ education: "", skills: [], interests: [] }); }}
                            className="px-6 py-3 transition-all text-sm"
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              fontSize: "0.7rem",
                              background: "transparent",
                              color: "#0a0a0a",
                              border: "1.5px solid #0a0a0a",
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f0e8"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                          >
                            New Prediction
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 font-bold text-8xl leading-none opacity-5 select-none pointer-events-none" style={{ fontFamily: "Georgia, serif", color: "#0a0a0a" }}>
                      AI
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}