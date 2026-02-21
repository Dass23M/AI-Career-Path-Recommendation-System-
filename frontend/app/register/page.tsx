"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";

// ── Illustration ───────────────────────────────────────
const RegisterIllustration = () => (
  <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={30 + col * 58} cy={30 + row * 58} r="2" fill="#222" opacity="0.25"/>
      ))
    )}
    <circle cx="210" cy="130" r="52" stroke="#111" strokeWidth="2.5" fill="#f5f0e8"/>
    <circle cx="210" cy="130" r="35" stroke="#111" strokeWidth="1.5" fill="white"/>
    <path d="M120 320 Q120 260 210 255 Q300 260 300 320 L310 400 L110 400 Z" stroke="#111" strokeWidth="2.5" fill="#f5f0e8"/>
    <path d="M130 330 Q130 275 210 270 Q290 275 290 330" stroke="#111" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
    <circle cx="300" cy="240" r="22" fill="#111"/>
    <line x1="300" y1="231" x2="300" y2="249" stroke="#c8b89a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="291" y1="240" x2="309" y2="240" stroke="#c8b89a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M330 240 L380 240 L380 120 L340 120" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="380" cy="240" r="4" fill="#111"/>
    <path d="M120 300 L70 300 L70 420" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="70" cy="300" r="4" fill="#111"/>
    <circle cx="70" cy="420" r="6" fill="none" stroke="#111" strokeWidth="2"/>
    <rect x="290" y="105" width="90" height="22" fill="#111"/>
    <text x="335" y="120" textAnchor="middle" fill="#c8b89a" fontSize="9" fontFamily="monospace" letterSpacing="1">NEW MEMBER</text>
    <rect x="32" y="428" width="76" height="22" fill="#111"/>
    <text x="70" y="443" textAnchor="middle" fill="#f5f0e8" fontSize="9" fontFamily="monospace" letterSpacing="1">JOIN NOW</text>
    {[[370,80],[60,100],[350,400],[80,200]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#c8b89a" strokeWidth="1.5"/>
        <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="#c8b89a" strokeWidth="1.5"/>
      </g>
    ))}
    <circle cx="199" cy="126" r="4" fill="#0a0a0a"/>
    <circle cx="221" cy="126" r="4" fill="#0a0a0a"/>
    <path d="M200 142 Q210 150 220 142" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// ── Password strength calculator ───────────────────────
const getStrength = (pw: string) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))    score++;
  const levels = [
    { label: "Weak",     color: "#c0392b" },
    { label: "Fair",     color: "#e67e22" },
    { label: "Good",     color: "#c8b89a" },
    { label: "Strong",   color: "#27ae60" },
    { label: "Strong",   color: "#27ae60" },
  ];
  return { score, ...levels[score] };
};

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
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconSpinner = () => (
  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
  </svg>
);

// ── Main ───────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");
  const [activeField,   setActiveField]   = useState<string | null>(null);
  const [showPassword,  setShowPassword]  = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [touched,       setTouched]       = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleBlur = (name: string) => {
    setTouched(t => ({ ...t, [name]: true }));
    setActiveField(null);
  };

  // Inline validation
  const getFieldError = (name: string): string => {
    if (!touched[name]) return "";
    const v = (formData as any)[name];
    if (!v) return "This field is required";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    if (name === "password" && v.length < 8) return "Password must be at least 8 characters";
    if (name === "confirmPassword" && v !== formData.password) return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser({ name: formData.name, email: formData.email, password: formData.password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(formData.password);

  const benefits = [
    "Free career prediction",
    "Personalized skill roadmap",
    "AI advisor chat access",
  ];

  // Is form valid enough to enable submit
  const isValid =
    formData.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword;

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
        .auth-input:focus { border-color: #0a0a0a; background: white; box-shadow: inset 3px 0 0 #0a0a0a; }
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.35s ease; }
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
                    <div className="h-32"><RegisterIllustration /></div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— Get started</span>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "#0a0a0a", lineHeight: 1.08, marginTop: "0.5rem" }}>
                  Create your<br />
                  <span style={{ fontStyle: "italic" }}>Career<span style={{ color: "#9e8a6e" }}>AI</span></span><br />
                  account.
                </h1>
              </div>

              {/* ── Form card ── */}
              <div className="border-2 bg-white" style={{ borderColor: "#0a0a0a" }}>
                <div className="h-1" style={{ background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }}/>

                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">

                  {/* Progress indicator */}
                  <div className="flex gap-1.5 mb-7">
                    {["name","email","password","confirmPassword"].map((f, i) => {
                      const val = (formData as any)[f];
                      const done = f === "email"
                        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
                        : f === "password"
                        ? val.length >= 8
                        : f === "confirmPassword"
                        ? val && val === formData.password
                        : !!val;
                      return (
                        <div key={i} className="flex-1 h-0.5 transition-all duration-500" style={{ background: done ? "#0a0a0a" : "#e8e0d0" }}/>
                      );
                    })}
                  </div>

                  <div className="space-y-5">

                    {/* Full Name */}
                    <div>
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "name" ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                        Full Name
                        {touched.name && !getFieldError("name") && formData.name && (
                          <span style={{ color: "#27ae60" }}><IconCheck /></span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Amara Silva"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => handleBlur("name")}
                        autoComplete="name"
                        required
                        className={`auth-input${getFieldError("name") ? " has-error" : touched.name && formData.name ? " is-valid" : ""}`}
                      />
                      <AnimatePresence>
                        {getFieldError("name") && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#c0392b", marginTop: "0.35rem", letterSpacing: "0.04em" }}>
                            {getFieldError("name")}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "email" ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                        Email Address
                        {touched.email && !getFieldError("email") && formData.email && (
                          <span style={{ color: "#27ae60" }}><IconCheck /></span>
                        )}
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
                        className={`auth-input${getFieldError("email") ? " has-error" : touched.email && formData.email ? " is-valid" : ""}`}
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
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "password" ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                        Password
                        {formData.password && (
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", color: strength.color, textTransform: "uppercase" }}>
                            {strength.label}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Min. 8 characters"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setActiveField("password")}
                          onBlur={() => handleBlur("password")}
                          autoComplete="new-password"
                          required
                          style={{ paddingRight: "2.8rem" }}
                          className={`auth-input${getFieldError("password") ? " has-error" : touched.password && formData.password.length >= 8 ? " is-valid" : ""}`}
                        />
                        <button type="button" className="pw-toggle" onClick={() => setShowPassword(p => !p)} tabIndex={-1}>
                          <IconEye open={showPassword} />
                        </button>
                      </div>

                      {/* Strength bar */}
                      {formData.password && (
                        <div className="flex gap-1 mt-2">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="flex-1 h-0.5 transition-all duration-300" style={{ background: i <= strength.score ? strength.color : "#e8e0d0" }}/>
                          ))}
                        </div>
                      )}

                      <AnimatePresence>
                        {getFieldError("password") && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#c0392b", marginTop: "0.35rem", letterSpacing: "0.04em" }}>
                            {getFieldError("password")}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Password hints */}
                      {activeField === "password" && formData.password && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2.5 space-y-1">
                          {[
                            { rule: formData.password.length >= 8,          text: "At least 8 characters" },
                            { rule: /[A-Z]/.test(formData.password),        text: "One uppercase letter"  },
                            { rule: /[0-9]/.test(formData.password),        text: "One number"            },
                            { rule: /[^A-Za-z0-9]/.test(formData.password), text: "One special character" },
                          ].map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span style={{ color: h.rule ? "#27ae60" : "#ccc", transition: "color 0.2s", flexShrink: 0 }}><IconCheck /></span>
                              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.05em", color: h.rule ? "#555" : "#bbb", transition: "color 0.2s" }}>{h.text}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: activeField === "confirmPassword" ? "#0a0a0a" : "#888", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", transition: "color 0.2s" }}>
                        Confirm Password
                        {formData.confirmPassword && formData.confirmPassword === formData.password && (
                          <span style={{ color: "#27ae60" }}><IconCheck /></span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onFocus={() => setActiveField("confirmPassword")}
                          onBlur={() => handleBlur("confirmPassword")}
                          autoComplete="new-password"
                          required
                          style={{ paddingRight: "2.8rem" }}
                          className={`auth-input${getFieldError("confirmPassword") ? " has-error" : touched.confirmPassword && formData.confirmPassword === formData.password && formData.confirmPassword ? " is-valid" : ""}`}
                        />
                        <button type="button" className="pw-toggle" onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                          <IconEye open={showConfirm} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {getFieldError("confirmPassword") && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#c0392b", marginTop: "0.35rem", letterSpacing: "0.04em" }}>
                            {getFieldError("confirmPassword")}
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
                    {loading ? <><IconSpinner /> Creating account...</> : "Create Account →"}
                  </button>

                  {/* Terms note */}
                  <p className="mt-4 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#bbb", lineHeight: 1.6 }}>
                    By creating an account you agree to our{" "}
                    <Link href="/" style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms</Link>
                    {" & "}
                    <Link href="/" style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</Link>
                  </p>
                </form>
              </div>

              {/* Sign in link */}
              <p className="mt-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#888" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#0a0a0a", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Sign in
                </Link>
              </p>

              {/* Divider */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "#bbb", textTransform: "uppercase", whiteSpace: "nowrap" }}>Free · No credit card</span>
                <div className="flex-1 h-px" style={{ background: "#d4cabc" }}/>
              </div>

              {/* Mobile benefits */}
              <div className="lg:hidden mt-8 pt-6 border-t" style={{ borderColor: "#e8e0d0" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.75rem" }}>— What you get</p>
                <div className="space-y-3">
                  {benefits.map((item, i) => (
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
                  <RegisterIllustration />
                </div>
                <div className="absolute -bottom-5 -left-5 px-4 py-2" style={{ background: "#0a0a0a" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#c8b89a", textTransform: "uppercase" }}>◆ Join 10,000+ Students</span>
                </div>
              </div>

              <div className="mt-14 pl-2">
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e8a6e", textTransform: "uppercase" }}>— What you get</p>
                <div className="mt-4 space-y-3">
                  {benefits.map((item, i) => (
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