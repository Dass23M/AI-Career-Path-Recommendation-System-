"use client";

import { useState, useContext, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";
import { AuthContext } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// ── Illustration ───────────────────────────────────────
const LoginIllustration = () => (
  <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={30 + col * 58} cy={30 + row * 58} r="2" fill="#222" opacity="0.25"/>
      ))
    )}
    {/* Outer decorative rings */}
    <circle cx="210" cy="190" r="110" stroke="#e8e0d0" strokeWidth="1.5" fill="none" strokeDasharray="6 5"/>
    <circle cx="210" cy="190" r="80" stroke="#d4cabc" strokeWidth="1" fill="#faf8f4"/>
    {/* Lock body */}
    <rect x="150" y="215" width="120" height="95" rx="8" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="2"/>
    <rect x="162" y="227" width="96" height="71" rx="4" fill="#1a1a1a"/>
    {/* Lock shackle */}
    <path d="M170 215 L170 175 Q170 140 210 140 Q250 140 250 175 L250 215"
      stroke="#0a0a0a" strokeWidth="14" fill="none" strokeLinecap="round"/>
    <path d="M170 215 L170 175 Q170 140 210 140 Q250 140 250 175 L250 215"
      stroke="#f5f0e8" strokeWidth="9" fill="none" strokeLinecap="round"/>
    {/* Keyhole */}
    <circle cx="210" cy="255" r="13" fill="#c8b89a"/>
    <rect x="207" y="265" width="7" height="18" rx="3.5" fill="#c8b89a"/>
    {/* Circuit lines left */}
    <path d="M150 262 L90 262 L90 180 L60 180" stroke="#c8b89a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="60" cy="180" r="5" fill="#0a0a0a" stroke="#c8b89a" strokeWidth="1.5"/>
    <path d="M90 262 L60 290" stroke="#c8b89a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="60" cy="290" r="4" fill="#c8b89a"/>
    {/* Circuit lines right */}
    <path d="M270 250 L340 250 L340 140 L370 140" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="370" cy="140" r="5" fill="#0a0a0a" stroke="#111" strokeWidth="1.5"/>
    <path d="M340 250 L370 278" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="370" cy="278" r="4" fill="#111"/>
    {/* Label tags */}
    <rect x="290" y="105" width="100" height="22" fill="#0a0a0a"/>
    <text x="340" y="120" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" letterSpacing="1">SECURE LOGIN</text>
    <rect x="28" y="378" width="80" height="22" fill="#0a0a0a"/>
    <text x="68" y="393" textAnchor="middle" fill="#f5f0e8" fontSize="9" fontFamily="monospace" letterSpacing="1">VERIFIED</text>
    {/* Decorative crosses */}
    {[[370, 360], [55, 110], [355, 400], [75, 320]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="#c8b89a" strokeWidth="1.5"/>
        <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    {/* AI text in center */}
    <text x="210" y="200" textAnchor="middle" fill="#c8b89a" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="3" opacity="0.5">CAREER AI</text>
  </svg>
);

// ── Icons ──────────────────────────────────────────────
const IconEye = ({ open }: { open: boolean }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconSpinner = () => (
  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
  </svg>
);

// ── Login Content ──────────────────────────────────────
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useContext(AuthContext) as any;

  const redirect = searchParams?.get("redirect") || "/";

  const [formData, setFormData]       = useState({ email: "", password: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched]         = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleBlur = (name: string) => {
    setTouched(t => ({ ...t, [name]: true }));
    setActiveField(null);
  };

  const getFieldError = (name: string): string => {
    if (!touched[name]) return "";
    const v = (formData as any)[name];
    if (!v) return "This field is required";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(formData);
      login(res.data.data.token);
      router.push(redirect);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 1;

  const perks = [
    "AI-powered career predictions",
    "Personalized skill roadmaps",
    "Real-time market insights",
  ];

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
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .auth-input::placeholder { color: #ccc; }
        .auth-input:focus {
          border-color: #0a0a0a;
          background: white;
          box-shadow: inset 3px 0 0 #0a0a0a;
        }
        .auth-input.has-error { border-color: #c0392b; background: #fdf9f9; }
        .auth-input.has-error:focus { box-shadow: inset 3px 0 0 #c0392b; }
        .auth-input.is-valid { border-color: #27ae60; }
        .auth-input.is-valid:focus { box-shadow: inset 3px 0 0 #27ae60; }

        .pw-toggle {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: #0a0a0a; }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f5f0e8;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 lg:min-h-screen items-center py-10 lg:py-0">

            {/* ── LEFT — Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none order-1"
            >
              {/* Mobile mini illustration */}
              <div className="lg:hidden mb-8">
                <div className="relative w-36 mx-auto">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 border-2" style={{ borderColor: "#c8b89a" }}/>
                  <div className="relative border-2 bg-white p-3" style={{ borderColor: "#0a0a0a" }}>
                    <div className="h-32"><LoginIllustration /></div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— Welcome back</span>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "#0a0a0a", lineHeight: 1.08, marginTop: "0.5rem" }}>
                  Sign in to your<br />
                  <span style={{ fontStyle: "italic" }}>Career<span style={{ color: "#9e8a6e" }}>AI</span></span><br />
                  account.
                </h1>
              </div>

              {/* ── Form card ── */}
              <div className="border-2 bg-white" style={{ borderColor: "#0a0a0a" }}>
                {/* Top accent bar */}
                <div className="h-1" style={{ background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }}/>

                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">

                  {/* Progress indicator */}
                  <div className="flex gap-1.5 mb-7">
                    {["email", "password"].map((f, i) => {
                      const val = (formData as any)[f];
                      const done = f === "email"
                        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
                        : !!val;
                      return (
                        <div key={i} className="flex-1 h-0.5 transition-all duration-500"
                          style={{ background: done ? "#0a0a0a" : "#e8e0d0" }}/>
                      );
                    })}
                  </div>

                  <div className="space-y-5">

                    {/* Email */}
                    <div>
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
                        onBlur={() => handleBlur("email")}
                        autoComplete="email"
                        required
                        className={`auth-input${getFieldError("email") ? " has-error" : touched.email && formData.email && !getFieldError("email") ? " is-valid" : ""}`}
                      />
                      <AnimatePresence>
                        {getFieldError("email") && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#c0392b", marginTop: "0.35rem", letterSpacing: "0.04em" }}>
                            {getFieldError("email")}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "password" ? "#0a0a0a" : "#888", transition: "color 0.2s" }}>
                          Password
                        </label>
                        <Link href="/forgot-password"
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#9e8a6e", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setActiveField("password")}
                          onBlur={() => handleBlur("password")}
                          autoComplete="current-password"
                          required
                          style={{ paddingRight: "2.8rem" }}
                          className={`auth-input${getFieldError("password") ? " has-error" : touched.password && formData.password ? " is-valid" : ""}`}
                        />
                        <button type="button" className="pw-toggle" onClick={() => setShowPassword(p => !p)} tabIndex={-1}>
                          <IconEye open={showPassword} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {getFieldError("password") && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#c0392b", marginTop: "0.35rem", letterSpacing: "0.04em" }}>
                            {getFieldError("password")}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Server error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-5 p-3 border-l-2" style={{ borderColor: "#c0392b", background: "#fdf0ee" }}>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#c0392b", letterSpacing: "0.04em" }}>{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !isValid}
                    className="submit-btn mt-7"
                    style={{ background: loading ? "#888" : isValid ? "#0a0a0a" : "#d4cabc" }}
                    onMouseEnter={e => { if (!loading && isValid) (e.currentTarget as HTMLElement).style.background = "#9e8a6e"; }}
                    onMouseLeave={e => { if (!loading && isValid) (e.currentTarget as HTMLElement).style.background = "#0a0a0a"; }}
                  >
                    {loading ? <><IconSpinner /> Signing in...</> : "Sign In →"}
                  </button>

                  {/* Terms note */}
                  <p className="mt-4 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#bbb", lineHeight: 1.6 }}>
                    Protected by industry-standard encryption.{" "}
                    <Link href="/" style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</Link>
                  </p>
                </form>
              </div>

              {/* Register link */}
              <p className="mt-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#888" }}>
                Don't have an account?{" "}
                <Link href="/register" style={{ color: "#0a0a0a", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Create one free
                </Link>
              </p>

              {/* Divider */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "#bbb", textTransform: "uppercase", whiteSpace: "nowrap" }}>Free · No credit card</span>
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
              </div>

              {/* Mobile perks */}
              <div className="lg:hidden mt-8 pt-6 border-t" style={{ borderColor: "#e8e0d0" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.75rem" }}>— What awaits you</p>
                <div className="space-y-3">
                  {perks.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span style={{ color: "#c8b89a", fontSize: "0.7rem", flexShrink: 0 }}>◆</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#555" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT — Illustration (desktop only) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden lg:block order-2"
            >
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 translate-x-4 translate-y-4 border-2" style={{ borderColor: "#c8b89a" }}/>
                <div className="relative border-2 bg-white p-8" style={{ borderColor: "#0a0a0a" }}>
                  <LoginIllustration />
                </div>
                <div className="absolute -bottom-5 -left-5 px-4 py-2" style={{ background: "#0a0a0a" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>◆ Secure Access</span>
                </div>
              </div>

              <div className="mt-14 pl-2">
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— What awaits you</p>
                <div className="mt-4 space-y-3">
                  {perks.map((item, i) => (
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
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f0e8" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>
            Loading...
          </span>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}