"use client";

import { useState, useContext, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";

// ── Illustration ───────────────────────────────────────
const LoginIllustration = () => (
  <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={30 + col * 58} cy={30 + row * 58} r="2" fill="#222" opacity="0.25"/>
      ))
    )}
    <circle cx="180" cy="180" r="80" stroke="#111" strokeWidth="3" fill="#f5f0e8"/>
    <circle cx="180" cy="180" r="55" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="6 4"/>
    <circle cx="180" cy="180" r="28" stroke="#111" strokeWidth="2" fill="white"/>
    <rect x="130" y="280" width="100" height="80" rx="6" fill="#111"/>
    <rect x="140" y="290" width="80" height="60" rx="4" fill="#1a1a1a"/>
    <path d="M155 280 L155 240 Q155 210 180 210 Q205 210 205 240 L205 280" stroke="#111" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <circle cx="180" cy="318" r="10" fill="#c8b89a"/>
    <rect x="177" y="326" width="6" height="16" rx="3" fill="#c8b89a"/>
    {[[350,90],[50,140],[340,380],[90,60]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x} y1={y-7} x2={x} y2={y+7} stroke="#c8b89a" strokeWidth="1.5"/>
        <line x1={x-7} y1={y} x2={x+7} y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    <rect x="295" y="182" width="90" height="22" fill="#111"/>
    <text x="340" y="197" textAnchor="middle" fill="#c8b89a" fontSize="8" fontFamily="monospace" letterSpacing="1">SECURE LOGIN</text>
    <text x="180" y="185" textAnchor="middle" fill="#9e8a6e" fontSize="22" fontFamily="serif" fontStyle="italic">AI</text>
  </svg>
);

// ── Form content ───────────────────────────────────────
function LoginContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { login }    = useContext(AuthContext) as any;
  const redirect     = searchParams?.get("redirect") || "/dashboard";

  const [formData,    setFormData]    = useState({ email: "", password: "" });
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(formData);
      login(res.data.data.token);
      router.push(redirect);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

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
          transition: border-color 0.2s, background 0.2s;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .auth-input::placeholder { color: #ccc; }
        .auth-input:focus { border-color: #0a0a0a; background: white; }
        
        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: #0a0a0a;
          color: #f5f0e8;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover:not(:disabled) { background: #9e8a6e; }
        .submit-btn:disabled { background: #aaa; cursor: not-allowed; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>

        {/* ── Mobile header (hidden on lg) ── */}
        <div
          className="lg:hidden flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10"
          style={{ background: "rgba(245,240,232,0.95)", backdropFilter: "blur(8px)", borderColor: "#d4cabc" }}
        >
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", textDecoration: "none" }}>
            Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
          </Link>
          <Link href="/register" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e8a6e", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Register
          </Link>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 lg:min-h-screen items-center py-10 lg:py-0">

            {/* LEFT — Illustration (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block"
            >
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 translate-x-4 translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
                <div className="relative border-2 bg-white p-8" style={{ borderColor: "#0a0a0a" }}>
                  <LoginIllustration />
                </div>
                <div className="absolute -bottom-5 -left-5 px-4 py-2" style={{ background: "#0a0a0a" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>◆ Secure · Encrypted</span>
                </div>
              </div>

              <div className="mt-14 pl-2">
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— CareerAI Platform</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem", color: "#0a0a0a", marginTop: "0.5rem", lineHeight: 1.2 }}>
                  Your path to the<br /><span style={{ fontStyle: "italic", color: "#9e8a6e" }}>right career.</span>
                </h2>
              </div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none"
            >
              {/* Mobile mini illustration */}
              <div className="lg:hidden mb-7">
                <div className="relative w-40 mx-auto">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 border-2" style={{ borderColor: "#c8b89a" }}/>
                  <div className="relative border-2 bg-white p-3" style={{ borderColor: "#0a0a0a" }}>
                    <div className="h-36"><LoginIllustration /></div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-7 lg:mb-10">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— Welcome back</span>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3rem)", color: "#0a0a0a", lineHeight: 1.1, marginTop: "0.5rem" }}>
                  Sign in to<br />
                  <span style={{ fontStyle: "italic" }}>Career<span style={{ color: "#9e8a6e" }}>AI</span></span>
                </h1>
              </div>

              {/* Form card */}
              <div className="border-2 bg-white" style={{ borderColor: "#0a0a0a" }}>

                {/* Gold top bar */}
                <div className="h-1" style={{ background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }}/>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8">

                  {/* Email */}
                  <div className="mb-5">
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "email" ? "#0a0a0a" : "#888", display: "block", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      required
                      autoComplete="email"
                      className="auth-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "password" ? "#0a0a0a" : "#888", transition: "color 0.2s" }}>
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      required
                      autoComplete="current-password"
                      className="auth-input"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mb-5 p-3 border-l-2" style={{ borderColor: "#c0392b", background: "#fdf0ee" }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#c0392b", letterSpacing: "0.04em" }}>{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={loading} className="submit-btn">
                    {loading
                      ? <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
                          Signing in...
                        </span>
                      : "Sign in →"
                    }
                  </button>
                </form>
              </div>

              {/* Register link */}
              <p className="mt-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#888" }}>
                Don't have an account?{" "}
                <Link href="/register" style={{ color: "#0a0a0a", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Create one
                </Link>
              </p>

              {/* Security note */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "#bbb", textTransform: "uppercase", whiteSpace: "nowrap" }}>Secure · Encrypted</span>
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page ───────────────────────────────────────────────
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f0e8" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Loading...</span>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}