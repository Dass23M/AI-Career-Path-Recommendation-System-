"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/services/authService";
import { motion } from "framer-motion";

const RegisterIllustration = () => (
  <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Grid dots */}
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={30 + col * 58} cy={30 + row * 58} r="2" fill="#222" opacity="0.25" />
      ))
    )}
    {/* Person silhouette */}
    <circle cx="210" cy="130" r="52" stroke="#111" strokeWidth="2.5" fill="#f5f0e8"/>
    <circle cx="210" cy="130" r="35" stroke="#111" strokeWidth="1.5" fill="white"/>
    {/* Body shape */}
    <path d="M120 320 Q120 260 210 255 Q300 260 300 320 L310 400 L110 400 Z" stroke="#111" strokeWidth="2.5" fill="#f5f0e8"/>
    <path d="M130 330 Q130 275 210 270 Q290 275 290 330" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
    {/* Plus / add icon on shoulder */}
    <circle cx="300" cy="240" r="22" fill="#111"/>
    <line x1="300" y1="231" x2="300" y2="249" stroke="#c8b89a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="291" y1="240" x2="309" y2="240" stroke="#c8b89a" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Circuit lines */}
    <path d="M330 240 L380 240 L380 120 L340 120" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="380" cy="240" r="4" fill="#111"/>
    <path d="M120 300 L70 300 L70 420" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="70" cy="300" r="4" fill="#111"/>
    <circle cx="70" cy="420" r="6" fill="none" stroke="#111" strokeWidth="2"/>
    {/* Labels */}
    <rect x="290" y="105" width="90" height="22" rx="0" fill="#111"/>
    <text x="335" y="120" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" letterSpacing="1">NEW MEMBER</text>
    <rect x="32" y="428" width="76" height="22" rx="0" fill="#111"/>
    <text x="70" y="443" textAnchor="middle" fill="#f5f0e8" fontSize="9" fontFamily="monospace" letterSpacing="1">JOIN NOW</text>
    {/* Stars/sparks */}
    {[[370, 80], [60, 100], [350, 400], [80, 200]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="#c8b89a" strokeWidth="1.5"/>
        <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    {/* Face detail */}
    <circle cx="199" cy="126" r="4" fill="#0a0a0a"/>
    <circle cx="221" cy="126" r="4" fill="#0a0a0a"/>
    <path d="M200 142 Q210 150 220 142" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser({ name: formData.name, email: formData.email, password: formData.password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Amara Silva" },
    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .auth-input {
          width: 100%;
          border: 1.5px solid #d4cabc;
          background: #faf8f4;
          padding: 0.85rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #0a0a0a;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-input::placeholder { color: #bbb; }
        .auth-input:focus { border-color: #0a0a0a; background: white; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center min-h-screen">

          {/* LEFT — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md mx-auto order-2 lg:order-1"
          >
            {/* Header */}
            <div className="mb-10">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— Get started</span>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3rem)", color: "#0a0a0a", marginTop: "0.5rem", lineHeight: 1.1 }}>
                Create your<br /><span style={{ fontStyle: "italic" }}>Career<span style={{ color: "#9e8a6e" }}>AI</span></span><br />account.
              </h1>
            </div>

            {/* Form card */}
            <div className="border-2 bg-white p-8" style={{ borderColor: "#0a0a0a" }}>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        required
                        className="auth-input"
                      />
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-6 p-3 border-l-2" style={{ borderColor: "#c0392b", background: "#fdf0ee" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#c0392b", letterSpacing: "0.05em" }}>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-8 transition-all"
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
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </form>
            </div>

            {/* Bottom link */}
            <p className="mt-6 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 300, color: "#888" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#0a0a0a", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Sign in
              </Link>
            </p>

            {/* Decorative line */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase" }}>Free · No credit card</span>
              <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
            </div>
          </motion.div>

          {/* RIGHT — Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block order-1 lg:order-2"
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 translate-x-4 translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
              <div className="relative border-2 bg-white p-8" style={{ borderColor: "#0a0a0a" }}>
                <RegisterIllustration />
              </div>
              <div className="absolute -bottom-5 -left-5 px-4 py-2" style={{ background: "#0a0a0a" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>
                  ◆ Join 10,000+ Students
                </span>
              </div>
            </div>

            <div className="mt-16 pl-2">
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— What you get</p>
              <div className="mt-4 space-y-3">
                {["Free career prediction", "Personalized skill roadmap", "AI advisor chat access"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ color: "#c8b89a", fontSize: "0.7rem" }}>◆</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "#555" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}