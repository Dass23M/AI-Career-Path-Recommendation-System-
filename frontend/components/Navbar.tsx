"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    auth?.logout();
    router.push("/");
    setMenuOpen(false);
  };

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
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
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#0a0a0a",
              textDecoration: "none",
            }}
          >
            Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/prediction" className="nav-link">Prediction</Link>

            {auth?.user ? (
              <>
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
                  style={{ borderColor: "#0a0a0a", color: "#0a0a0a" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">Login</Link>
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

          {/* Hamburger Button (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#0a0a0a",
                borderRadius: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#0a0a0a",
                borderRadius: "2px",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#0a0a0a",
                borderRadius: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(10,10,10,0.2)", backdropFilter: "blur(2px)" }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 md:hidden flex flex-col"
        style={{
          width: "75vw",
          maxWidth: "320px",
          background: "rgba(245, 240, 232, 0.98)",
          backdropFilter: "blur(16px)",
          borderLeft: "1px solid #d4cabc",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingTop: "80px",
          paddingLeft: "28px",
          paddingRight: "28px",
          paddingBottom: "32px",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "18px",
            right: "20px",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#0a0a0a",
          }}
        >
          ✕
        </button>

        {/* Logo in drawer */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#0a0a0a",
            textDecoration: "none",
            marginBottom: "32px",
            display: "block",
          }}
        >
          Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/prediction", label: "Prediction" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                color: "#0a0a0a",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid #e8e2d8",
                display: "block",
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </Link>
          ))}

          {auth?.user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.05rem",
                  color: "#0a0a0a",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid #e8e2d8",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>👤</span> Profile
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  marginTop: "24px",
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #0a0a0a",
                  background: "transparent",
                  color: "#0a0a0a",
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.05rem",
                  color: "#0a0a0a",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid #e8e2d8",
                  display: "block",
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: "24px",
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  background: "#0a0a0a",
                  color: "#f5f0e8",
                  border: "1px solid #0a0a0a",
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}