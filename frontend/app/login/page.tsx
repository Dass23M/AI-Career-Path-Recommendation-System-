"use client";

import { useState, useContext, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authService";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";

const LoginIllustration = () => (
  <svg
    viewBox="0 0 420 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={30 + col * 58}
          cy={30 + row * 58}
          r="2"
          fill="#222"
          opacity="0.25"
        />
      ))
    )}
    <circle cx="180" cy="180" r="80" stroke="#111" strokeWidth="3" fill="#f5f0e8" />
    <circle
      cx="180"
      cy="180"
      r="55"
      stroke="#111"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="6 4"
    />
    <circle cx="180" cy="180" r="28" stroke="#111" strokeWidth="2" fill="white" />
    <rect x="130" y="280" width="100" height="80" rx="6" fill="#111" />
    <rect x="140" y="290" width="80" height="60" rx="4" fill="#1a1a1a" />
    <path
      d="M155 280 L155 240 Q155 210 180 210 Q205 210 205 240 L205 280"
      stroke="#111"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="180" cy="318" r="10" fill="#c8b89a" />
    <rect x="177" y="326" width="6" height="16" rx="3" fill="#c8b89a" />
    <text
      x="180"
      y="185"
      textAnchor="middle"
      fill="#9e8a6e"
      fontSize="22"
      fontFamily="serif"
      fontStyle="italic"
    >
      AI
    </text>
  </svg>
);

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useContext(AuthContext) as any;

  // Safe access — during build / initial render it will be null
  const redirect = searchParams?.get("redirect") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);
      login(res.data.data.token);
      router.push(redirect);
      // Optional: router.refresh(); // if you want to re-fetch server data after login
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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

        .auth-input::placeholder {
          color: #bbb;
        }

        .auth-input:focus {
          border-color: #0a0a0a;
          background: white;
        }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* LEFT - illustration (static-friendly) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative max-w-sm mx-auto">
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 border-2"
                style={{ borderColor: "#c8b89a" }}
              />
              <div
                className="relative border-2 bg-white p-8"
                style={{ borderColor: "#0a0a0a" }}
              >
                <LoginIllustration />
              </div>
            </div>
          </motion.div>

          {/* RIGHT - form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="mb-10">
              <span className="text-xs tracking-widest text-[#9e8a6e] uppercase">
                — Welcome back
              </span>
              <h1 className="text-4xl font-bold mt-2">
                Sign in to <span className="italic">CareerAI</span>
              </h1>
            </div>

            <div className="border-2 bg-white p-8 border-black">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-xs mb-2 uppercase tracking-wider text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs mb-2 uppercase tracking-wider text-gray-500">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border-l-2 border-red-500 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-black text-white uppercase tracking-widest text-sm hover:bg-[#9e8a6e] transition disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in →"}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="underline text-black font-medium">
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8] text-gray-600">
          Loading sign-in page...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}