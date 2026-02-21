"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { getMyProfile } from "@/services/profileService";

// ── Icons ──────────────────────────────────────────────
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconMap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

// ── Skill Radar — only renders with real skills ────────
const SkillRadar = ({ skills }: { skills: string[] }) => {
  const count  = Math.min(skills.length, 6);
  const points = Array.from({ length: count }).map((_, i) => {
    const angle = (i * (360 / count) - 90) * Math.PI / 180;
    return `${50 + 38 * Math.cos(angle)},${50 + 38 * Math.sin(angle)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[1, 0.67, 0.33].map((s, i) => (
        <circle key={i} cx="50" cy="50" r={40 * s} stroke="#e8e0d0" strokeWidth="0.8" fill={i === 0 ? "#faf8f4" : "none"}/>
      ))}
      {Array.from({ length: count }).map((_, i) => {
        const a = (i * (360 / count) - 90) * Math.PI / 180;
        return <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(a)} y2={50 + 40 * Math.sin(a)} stroke="#e8e0d0" strokeWidth="0.8"/>;
      })}
      {count > 2 && <polygon points={points} fill="#0a0a0a" fillOpacity="0.12" stroke="#0a0a0a" strokeWidth="1.5"/>}
      {Array.from({ length: count }).map((_, i) => {
        const a = (i * (360 / count) - 90) * Math.PI / 180;
        const x = 50 + 38 * Math.cos(a), y = 50 + 38 * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#c8b89a"/>
            <text x={x} y={y - 5} textAnchor="middle" fill="#555" fontSize="5" fontFamily="monospace">{skills[i]?.trim().slice(0, 5)}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ── Empty state ────────────────────────────────────────
const Empty = ({ msg, href }: { msg: string; href: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
    <span style={{ color: "#e8e0d0" }}><IconAlert /></span>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ccc", textAlign: "center" }}>{msg}</p>
    <Link href={href} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px" }}>
      + Add in Profile
    </Link>
  </div>
);

const navItems = [
  { label: "Overview",   href: "/dashboard",  icon: <IconTarget />, active: true  },
  { label: "Prediction", href: "/prediction", icon: <IconBrain />,  active: false },
  { label: "Profile",    href: "/profile",    icon: <IconUser />,   active: false },
  { label: "Roadmap",    href: "/roadmap",    icon: <IconMap />,    active: false },
];

// ── Page ───────────────────────────────────────────────
export default function DashboardPage() {
  const [profile,   setProfile]   = useState<any>(null);
  const [loading,   setLoading]   = useState(true);
  const [noProfile, setNoProfile] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyProfile();
        res.data?.data ? setProfile(res.data.data) : setNoProfile(true);
      } catch { setNoProfile(true); }
      finally  { setLoading(false); }
    })();
  }, []);

  // ── All values derived strictly from API data ─────
  const fullName  = profile?.fullName  || "";
  const education = profile?.education || "";
  const expLevel  = profile?.experienceLevel || "";
  const skills    = Array.isArray(profile?.skills)    ? profile.skills.filter(Boolean)    : [];
  const interests = Array.isArray(profile?.interests) ? profile.interests.filter(Boolean) : [];

  const firstName = fullName.split(" ")[0] || "";
  const initials  = fullName
    ? fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const completedFields = [
    !!fullName, !!education, skills.length > 0, interests.length > 0,
  ].filter(Boolean).length;
  const profilePct  = Math.round((completedFields / 4) * 100);
  const missingFields = [
    !fullName           && "Full Name",
    !education          && "Education",
    skills.length === 0 && "Skills",
    interests.length === 0 && "Interests",
  ].filter(Boolean) as string[];

  if (loading) return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f0e8" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Loading...</span>
      </div>
    </ProtectedRoute>
  );

  return (
    <ProtectedRoute>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
          .dash-card { border: 1.5px solid #e8e0d0; background: white; }
          .dash-nav  { display:flex; align-items:center; gap:.6rem; padding:.65rem .85rem; font-family:'DM Mono',monospace; font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; transition:all .2s; border-left:2px solid transparent; color:#888; }
          .dash-nav:hover  { color:#0a0a0a; border-left-color:#c8b89a; background:#f5f0e8; }
          .dash-nav.on     { color:#0a0a0a; border-left-color:#0a0a0a; background:#f5f0e8; }
          .abtn { display:flex; align-items:center; justify-content:space-between; width:100%; padding:.85rem 1rem; font-family:'DM Mono',monospace; font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; transition:all .2s; border:1.5px solid #0a0a0a; cursor:pointer; text-decoration:none; }
        `}</style>

        <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
          <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="mb-10">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9e8a6e" }}>— CareerAI</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#0a0a0a", lineHeight: 1.05, marginTop: "0.4rem" }}>
                Dashboard<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>.</span>
              </h1>
            </div>

            {/* No profile alert */}
            {noProfile && (
              <div className="mb-8 p-5 flex items-start gap-4 bg-white" style={{ border: "1.5px solid #e8e0d0", borderLeftWidth: "3px", borderLeftColor: "#9e8a6e" }}>
                <span style={{ color: "#9e8a6e", marginTop: "2px" }}><IconAlert /></span>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0a" }}>No profile found</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "#888", marginTop: "0.25rem" }}>Create your profile to unlock AI-powered career predictions.</p>
                  <Link href="/profile" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-block", marginTop: "0.5rem" }}>Create Profile →</Link>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-4 gap-6">

              {/* ══ SIDEBAR ══ */}
              <div className="lg:col-span-1 space-y-4">

                {/* Avatar */}
                <div className="dash-card p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center" style={{ background: "#0a0a0a", border: "2px solid #0a0a0a" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: "#c8b89a" }}>{initials}</span>
                  </div>

                  {fullName
                    ? <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#0a0a0a" }}>{fullName}</p>
                    : <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#ccc", letterSpacing: "0.08em" }}>Name not set</p>
                  }
                  {expLevel
                    ? <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8a6e", marginTop: "0.2rem" }}>{expLevel}</p>
                    : <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "#ccc", marginTop: "0.2rem" }}>Level not set</p>
                  }
                  {education && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "#888", marginTop: "0.4rem", lineHeight: 1.4 }}>{education}</p>
                  )}

                  {/* Completeness bar */}
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "#e8e0d0" }}>
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa" }}>Profile</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: profilePct === 100 ? "#9e8a6e" : "#aaa" }}>{profilePct}%</span>
                    </div>
                    <div className="h-1 w-full" style={{ background: "#e8e0d0" }}>
                      <div className="h-1" style={{ width: `${profilePct}%`, background: profilePct === 100 ? "#9e8a6e" : "#0a0a0a", transition: "width 0.6s ease" }}/>
                    </div>
                    {missingFields.length > 0 && (
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.52rem", color: "#bbb", marginTop: "0.5rem", textAlign: "left", lineHeight: 1.6 }}>
                        Missing: {missingFields.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nav */}
                <div className="dash-card overflow-hidden">
                  <div className="px-4 py-3 border-b" style={{ borderColor: "#e8e0d0" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb" }}>Navigation</span>
                  </div>
                  {navItems.map((item, i) => (
                    <Link key={i} href={item.href} className={`dash-nav${item.active ? " on" : ""}`}>
                      <span style={{ color: item.active ? "#9e8a6e" : "#ccc" }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Actions */}
                <div className="dash-card p-4 space-y-2">
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.5rem" }}>Quick Actions</p>
                  <Link href="/prediction" className="abtn" style={{ background: "#0a0a0a", color: "#f5f0e8" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}>
                    <span className="flex items-center gap-2"><IconBrain/>Run Prediction</span><IconArrow/>
                  </Link>
                  <Link href="/profile" className="abtn" style={{ background: "transparent", color: "#0a0a0a" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="#0a0a0a"; el.style.color="#f5f0e8"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color="#0a0a0a"; }}>
                    <span className="flex items-center gap-2"><IconUser/>Edit Profile</span><IconArrow/>
                  </Link>
                </div>
              </div>

              {/* ══ MAIN ══ */}
              <div className="lg:col-span-3 space-y-6">

                {/* Welcome */}
                <div className="bg-white relative overflow-hidden" style={{ border: "2px solid #0a0a0a" }}>
                  <div className="h-1" style={{ background: "linear-gradient(to right,#0a0a0a,#c8b89a,#0a0a0a)" }}/>
                  <div className="p-7">
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e8a6e" }}>◆ Welcome back</span>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.8rem", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.4rem" }}>
                      {firstName
                        ? <>Hello, <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>{firstName}.</span></>
                        : <>Hello, <span style={{ fontStyle: "italic", color: "#9e8a6e" }}>welcome.</span></>}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "#888", marginTop: "0.5rem", lineHeight: 1.7, maxWidth: "52ch" }}>
                      {profilePct === 0
                        ? "Create your profile to unlock AI-powered career predictions."
                        : profilePct < 100
                        ? `Profile ${profilePct}% complete. Add ${missingFields.join(" and ")} to improve prediction accuracy.`
                        : "Your profile is complete. Run an AI prediction to get your personalized career roadmap."}
                    </p>
                    {profilePct < 100 && (
                      <Link href="/profile" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px", marginTop: "1rem" }}>
                        Complete Profile <IconArrow/>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Stats — real data only */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "#e8e0d0" }}>
                  {[
                    { label: "Skills",     value: skills.length > 0 ? skills.length : "—",    icon: <IconChart/>,  dark: true  },
                    { label: "Interests",  value: interests.length > 0 ? interests.length : "—", icon: <IconHeart/>,  dark: false },
                    { label: "Experience", value: expLevel || "—",                               icon: <IconShield/>, dark: false },
                    { label: "Profile",    value: `${profilePct}%`,                             icon: <IconTarget/>, dark: false },
                  ].map((s, i) => (
                    <div key={i} className="p-5" style={{ background: s.dark ? "#0a0a0a" : "white" }}>
                      <div className="mb-3" style={{ color: s.dark ? "#c8b89a" : "#ccc" }}>{s.icon}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem", color: s.dark ? "#c8b89a" : "#0a0a0a", lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: s.dark ? "#555" : "#aaa", marginTop: "0.3rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Skills + Interests — real data */}
                <div className="grid md:grid-cols-2 gap-6">

                  {/* Skills */}
                  <div className="dash-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>Skill Map</p>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", marginTop: "0.15rem" }}>Your Skills</h3>
                      </div>
                      <Link href="/profile" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px" }}>Edit</Link>
                    </div>
                    <div className="h-44">
                      {skills.length >= 3
                        ? <SkillRadar skills={skills}/>
                        : <Empty msg={skills.length === 0 ? "No skills added yet" : "Add 3+ skills to see radar"} href="/profile"/>
                      }
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: "#e8e0d0" }}>
                        {skills.map((s: string, i: number) => (
                          <span key={i} className="px-2 py-0.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", background: "#f5f0e8", color: "#888", border: "1px solid #e8e0d0" }}>{s.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interests */}
                  <div className="dash-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>Interests</p>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", marginTop: "0.15rem" }}>What Drives You</h3>
                      </div>
                      <Link href="/profile" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px" }}>Edit</Link>
                    </div>
                    {interests.length > 0
                      ? (
                        <div className="flex flex-wrap gap-2">
                          {interests.map((s: string, i: number) => (
                            <span key={i} className="px-3 py-1.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", background: i % 2 === 0 ? "#0a0a0a" : "#f5f0e8", color: i % 2 === 0 ? "#c8b89a" : "#888", border: `1px solid ${i % 2 === 0 ? "#0a0a0a" : "#e8e0d0"}` }}>{s.trim()}</span>
                          ))}
                        </div>
                      )
                      : <Empty msg="No interests added yet" href="/profile"/>
                    }

                    <div className="mt-5 pt-5 border-t" style={{ borderColor: "#e8e0d0" }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.4rem" }}>Education</p>
                      {education
                        ? <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "0.875rem", color: "#0a0a0a" }}>{education}</p>
                        : <Link href="/profile" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#ccc", textDecoration: "underline", textUnderlineOffset: "3px" }}>+ Add education</Link>
                      }
                    </div>
                  </div>
                </div>

                {/* Profile summary table */}
                <div className="dash-card p-6">
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.4rem" }}>Profile Summary</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", marginBottom: "1.25rem" }}>Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-px" style={{ background: "#e8e0d0" }}>
                    {[
                      { label: "Full Name",       value: fullName  || null, icon: <IconUser/>   },
                      { label: "Education",        value: education || null, icon: <IconChart/>  },
                      { label: "Experience Level", value: expLevel  || null, icon: <IconShield/> },
                      { label: "Skills Count",     value: skills.length > 0 ? `${skills.length} skill${skills.length !== 1 ? "s" : ""}` : null, icon: <IconTarget/> },
                    ].map((field, i) => (
                      <div key={i} className="p-4 bg-white flex items-start gap-3">
                        <span style={{ color: field.value ? "#9e8a6e" : "#e8e0d0", marginTop: "2px" }}>{field.icon}</span>
                        <div>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>{field.label}</p>
                          {field.value
                            ? <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "0.875rem", color: "#0a0a0a", marginTop: "0.2rem" }}>{field.value}</p>
                            : <Link href="/profile" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#ccc", textDecoration: "underline", textUnderlineOffset: "3px", display: "inline-block", marginTop: "0.2rem" }}>Not set — Add now</Link>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA — adapts to profile state */}
                <div className="p-8 relative overflow-hidden" style={{ border: "2px solid #0a0a0a", background: "#0a0a0a" }}>
                  <div className="absolute -right-8 -bottom-8 select-none pointer-events-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "8rem", color: "#f5f0e8", opacity: 0.04, lineHeight: 1 }}>AI</div>
                  <div className="relative grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8b89a" }}>◆ Next Step</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.6rem", color: "#f5f0e8", lineHeight: 1.15, marginTop: "0.4rem" }}>
                        {profilePct === 100
                          ? <>Run Your AI<br/><span style={{ fontStyle: "italic", color: "#c8b89a" }}>Career Prediction.</span></>
                          : <>Complete Your<br/><span style={{ fontStyle: "italic", color: "#c8b89a" }}>Profile First.</span></>}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "#666", marginTop: "0.5rem", lineHeight: 1.7 }}>
                        {profilePct === 100
                          ? "Your profile is ready. Get your personalized step-by-step career plan."
                          : `Add ${missingFields.join(", ")} to unlock AI predictions.`}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end">
                      <Link
                        href={profilePct === 100 ? "/prediction" : "/profile"}
                        className="flex items-center gap-2 px-6 py-3.5 transition-all"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#c8b89a", color: "#0a0a0a", border: "2px solid #c8b89a" }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="#9e8a6e"; el.style.borderColor="#9e8a6e"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="#c8b89a"; el.style.borderColor="#c8b89a"; }}
                      >
                        {profilePct === 100 ? <><IconBrain/> Run Prediction →</> : <><IconUser/> Complete Profile →</>}
                      </Link>
                      {profilePct === 100 && (
                        <Link href="/profile"
                          className="flex items-center gap-2 px-6 py-3.5 transition-all"
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#f5f0e8", border: "2px solid #333" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#555"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#333"; }}>
                          <IconUser/> Edit Profile
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}