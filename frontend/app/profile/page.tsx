"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { getMyProfile, saveProfile, deleteProfile } from "@/services/profileService";

// ── Icons ──────────────────────────────────────────────
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconEducation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconSkills = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconHeart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconLevel = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconBrain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

// ── Dashboard Quick Stats ──────────────────────────────
const DashboardStats = ({ formData }: { formData: any }) => {
  const skillCount  = formData.skills    ? formData.skills.split(",").filter(Boolean).length  : 0;
  const interestCount = formData.interests ? formData.interests.split(",").filter(Boolean).length : 0;
  const profileComplete = [formData.fullName, formData.education, formData.skills, formData.interests].filter(Boolean).length;
  const completePct = Math.round((profileComplete / 4) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-8" style={{ background: "#e8e0d0" }}>
      {[
        { label: "Profile Complete", value: `${completePct}%`, icon: <IconTarget />, accent: completePct === 100 },
        { label: "Skills Listed",    value: skillCount,        icon: <IconSkills />, accent: false },
        { label: "Interests",        value: interestCount,     icon: <IconHeart />,  accent: false },
        { label: "Experience",       value: formData.experienceLevel || "—", icon: <IconLevel />, accent: false },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: stat.accent ? "#9e8a6e" : "#ccc" }}>{stat.icon}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb" }}>◆</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.6rem", color: stat.accent ? "#9e8a6e" : "#0a0a0a" }}>{stat.value}</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginTop: "0.25rem" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// ── Profile Completeness Bar ───────────────────────────
const CompletenessBar = ({ formData }: { formData: any }) => {
  const fields = [
    { key: "fullName",  label: "Name"       },
    { key: "education", label: "Education"  },
    { key: "skills",    label: "Skills"     },
    { key: "interests", label: "Interests"  },
  ];
  return (
    <div className="mb-8 p-6 border-2" style={{ borderColor: "#e8e0d0", background: "#faf8f4" }}>
      <div className="flex justify-between items-center mb-4">
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>Profile Completeness</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#9e8a6e", fontWeight: 500 }}>
          {fields.filter(f => (formData as any)[f.key]).length} / {fields.length} complete
        </span>
      </div>
      <div className="flex gap-2">
        {fields.map((f, i) => (
          <div key={i} className="flex-1">
            <div className="h-1.5 rounded-none mb-2" style={{ background: (formData as any)[f.key] ? "#0a0a0a" : "#e8e0d0" }}/>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: (formData as any)[f.key] ? "#0a0a0a" : "#ccc" }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Quick Actions ──────────────────────────────────────
const QuickActions = () => (
  <div className="space-y-3">
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.75rem" }}>Quick Actions</p>
    {[
      { label: "Run AI Prediction",   href: "/prediction", icon: <IconBrain />,  primary: true  },
      { label: "View Dashboard",      href: "/dashboard",  icon: <IconTarget />, primary: false },
    ].map((action, i) => (
      <Link key={i} href={action.href}
        className="flex items-center justify-between w-full px-5 py-3.5 transition-all"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: action.primary ? "#0a0a0a" : "white",
          color: action.primary ? "#f5f0e8" : "#0a0a0a",
          border: "1.5px solid #0a0a0a",
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#9e8a6e"; el.style.borderColor = "#9e8a6e"; el.style.color = "#fff"; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.background = action.primary ? "#0a0a0a" : "white"; el.style.borderColor = "#0a0a0a"; el.style.color = action.primary ? "#f5f0e8" : "#0a0a0a"; }}
      >
        <span className="flex items-center gap-2">{action.icon}{action.label}</span>
        <IconArrow />
      </Link>
    ))}
  </div>
);

// ── Recent Activity ────────────────────────────────────
const RecentActivity = () => (
  <div className="mt-6 border-t pt-6" style={{ borderColor: "#e8e0d0" }}>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.75rem" }}>Recent Activity</p>
    {[
      { text: "Profile last updated", time: "Just now"   },
      { text: "AI prediction run",    time: "2 days ago" },
      { text: "Account created",      time: "This month" },
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#f0ebe0" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "#555" }}>{item.text}</span>
        <span className="flex items-center gap-1.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#bbb" }}>
          <IconClock />{item.time}
        </span>
      </div>
    ))}
  </div>
);

// ── Main Page ──────────────────────────────────────────
export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "", education: "", skills: "", interests: "", experienceLevel: "beginner",
  });
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [message,  setMessage]  = useState<{ type: "success" | "error" | "delete"; text: string } | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await getMyProfile();
        const data = res.data.data;
        setFormData({
          fullName:        data.fullName        || "",
          education:       data.education       || "",
          skills:          data.skills?.join(", ")    || "",
          interests:       data.interests?.join(", ") || "",
          experienceLevel: data.experienceLevel || "beginner",
        });
      } catch { /* no profile yet */ }
      finally  { setLoading(false); }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await saveProfile({
        ...formData,
        skills:    formData.skills.split(",").map(s => s.trim()),
        interests: formData.interests.split(",").map(s => s.trim()),
      });
      setMessage({ type: "success", text: "Profile saved successfully" });
    } catch {
      setMessage({ type: "error", text: "Failed to save profile. Please try again." });
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile? This cannot be undone.")) return;
    try {
      await deleteProfile();
      setFormData({ fullName: "", education: "", skills: "", interests: "", experienceLevel: "beginner" });
      setMessage({ type: "delete", text: "Profile deleted successfully" });
    } catch {
      setMessage({ type: "error", text: "Delete failed. Please try again." });
    }
  };

  const fields = [
    { name: "fullName",  label: "Full Name",              type: "text",   placeholder: "Amara Silva",                   icon: <IconUser />,      hint: "Your display name on the platform" },
    { name: "education", label: "Education Level",         type: "text",   placeholder: "Bachelor's in Computer Science", icon: <IconEducation />, hint: "Highest qualification or current study" },
    { name: "skills",    label: "Skills",                  type: "text",   placeholder: "Python, React, SQL",            icon: <IconSkills />,    hint: "Separate skills with commas" },
    { name: "interests", label: "Interests & Passions",    type: "text",   placeholder: "AI, Design, Finance",           icon: <IconHeart />,     hint: "Topics that genuinely excite you" },
  ];

  const msgStyle: Record<string, { border: string; bg: string; color: string }> = {
    success: { border: "#9e8a6e", bg: "#faf8f4",  color: "#7a6a52" },
    error:   { border: "#c0392b", bg: "#fdf0ee",  color: "#c0392b" },
    delete:  { border: "#555",    bg: "#f5f0e8",  color: "#555"    },
  };

  if (loading) return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f0e8" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>
          Loading profile...
        </div>
      </div>
    </ProtectedRoute>
  );

  return (
    <ProtectedRoute>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
          .prof-input {
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
          .prof-input::placeholder { color: #ccc; }
          .prof-input:focus { border-color: #0a0a0a; background: white; }
          .prof-select {
            width: 100%;
            border: 1.5px solid #d4cabc;
            background: #faf8f4;
            padding: 0.85rem 1rem 0.85rem 2.8rem;
            font-family: 'DM Mono', monospace;
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #0a0a0a;
            outline: none;
            appearance: none;
            cursor: pointer;
            transition: border-color 0.2s;
          }
          .prof-select:focus { border-color: #0a0a0a; background: white; }
        `}</style>

        <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
          <div className="max-w-7xl mx-auto px-6 py-20">

            {/* ── Page header ── */}
            <div className="mb-12">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>— Dashboard / Profile</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "#0a0a0a", lineHeight: 1.05, marginTop: "0.5rem" }}>
                My Profile<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>.</span>
              </h1>
            </div>

            {/* ── Dashboard Stats ── */}
            <DashboardStats formData={formData} />

            {/* ── Main grid ── */}
            <div className="grid lg:grid-cols-3 gap-8">

              {/* LEFT — Form (2 cols) */}
              <div className="lg:col-span-2">

                {/* Completeness bar */}
                <CompletenessBar formData={formData} />

                {/* Form card */}
                <div className="border-2 bg-white" style={{ borderColor: "#0a0a0a" }}>
                  <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: "#e8e0d0" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "#0a0a0a" }}>Edit Profile</h2>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginTop: "0.25rem" }}>
                      5 fields · updates your AI predictions
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-6">
                      {fields.map((field) => (
                        <div key={field.name}>
                          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === field.name ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                            <span style={{ color: activeField === field.name ? "#9e8a6e" : "#ccc", transition: "color 0.2s" }}>{field.icon}</span>
                            {field.label}
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: activeField === field.name ? "#9e8a6e" : "#ccc", transition: "color 0.2s" }}>
                              {field.icon}
                            </div>
                            <input
                              type={field.type}
                              name={field.name}
                              value={(formData as any)[field.name]}
                              placeholder={field.placeholder}
                              onChange={handleChange}
                              onFocus={() => setActiveField(field.name)}
                              onBlur={() => setActiveField(null)}
                              required={field.name === "fullName" || field.name === "education"}
                              className="prof-input"
                            />
                          </div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#bbb", marginTop: "0.35rem" }}>{field.hint}</p>
                        </div>
                      ))}

                      {/* Experience level */}
                      <div>
                        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "experienceLevel" ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                          <span style={{ color: activeField === "experienceLevel" ? "#9e8a6e" : "#ccc" }}><IconLevel /></span>
                          Experience Level
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#ccc" }}><IconLevel /></div>
                          <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            onFocus={() => setActiveField("experienceLevel")}
                            onBlur={() => setActiveField(null)}
                            className="prof-select"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                          {/* Custom chevron */}
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                          </div>
                        </div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#bbb", marginTop: "0.35rem" }}>Helps calibrate career recommendations</p>
                      </div>
                    </div>

                    {/* Message */}
                    {message && (
                      <div className="mt-6 p-4 border-l-2 flex items-center gap-3" style={{ borderColor: msgStyle[message.type].border, background: msgStyle[message.type].bg }}>
                        {message.type === "success" && <span style={{ color: "#9e8a6e" }}><IconCheck /></span>}
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: msgStyle[message.type].color, letterSpacing: "0.05em" }}>{message.text}</p>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-4 flex items-center justify-center gap-2 transition-all"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", background: saving ? "#555" : "#0a0a0a", color: "#f5f0e8", border: "none", cursor: saving ? "not-allowed" : "pointer" }}
                        onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; }}
                        onMouseLeave={e => { if (!saving) (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}
                      >
                        <IconSave />
                        {saving ? "Saving..." : "Save Profile"}
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-6 py-4 flex items-center gap-2 transition-all"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: "#c0392b", border: "1.5px solid #c0392b", cursor: "pointer" }}
                        onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#c0392b"; el.style.color = "white"; }}
                        onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#c0392b"; }}
                      >
                        <IconTrash />
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* RIGHT — Dashboard sidebar (1 col) */}
              <div className="space-y-6">

                {/* Avatar card */}
                <div className="border-2 bg-white p-6 text-center" style={{ borderColor: "#0a0a0a" }}>
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center border-2" style={{ background: "#0a0a0a", borderColor: "#0a0a0a" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.6rem", color: "#c8b89a" }}>
                      {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "—"}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a" }}>
                    {formData.fullName || "Your Name"}
                  </p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8a6e", marginTop: "0.25rem" }}>
                    {formData.experienceLevel} · CareerAI Member
                  </p>

                  {/* Skills tags */}
                  {formData.skills && (
                    <div className="flex flex-wrap gap-2 justify-center mt-5 pt-5 border-t" style={{ borderColor: "#e8e0d0" }}>
                      {formData.skills.split(",").slice(0, 4).map((s, i) => (
                        <span key={i} className="px-2 py-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f5f0e8", color: "#888", border: "1px solid #e8e0d0" }}>
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="border-2 bg-white p-6" style={{ borderColor: "#0a0a0a" }}>
                  <QuickActions />
                  <RecentActivity />
                </div>

                {/* Tip card */}
                <div className="border-2 p-6" style={{ borderColor: "#c8b89a", background: "#0a0a0a" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8b89a" }}>◆ Pro Tip</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "#888", lineHeight: 1.7, marginTop: "0.75rem" }}>
                    The more detail you add to your skills and interests, the more accurate your AI career prediction becomes.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}