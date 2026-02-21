"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    auth?.logout();
    router.push("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "rgba(245, 240, 232, 0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "#d4cabc",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#0a0a0a",
          }}
        >
          Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">

          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/prediction" className="nav-link">Prediction</Link>

          {auth?.user ? (
            <>
              {/* Profile Icon */}
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{ borderColor: "#0a0a0a" }}
              >
                👤
              </Link>

              <button
                onClick={handleLogout}
                className="nav-link px-5 py-2 border"
                style={{
                  borderColor: "#0a0a0a",
                  color: "#0a0a0a",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 border"
                style={{
                  background: "#0a0a0a",
                  color: "#f5f0e8",
                  borderColor: "#0a0a0a",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}