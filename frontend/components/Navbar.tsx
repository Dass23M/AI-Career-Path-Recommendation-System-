"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Navbar() {
  const auth     = useContext(AuthContext);
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogout = () => {
    auth?.logout();
    setOpen(false);
    router.push("/");
  };

  const active = (href: string) => pathname === href;

  const monoLink = (href: string): React.CSSProperties => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: active(href) ? "#0a0a0a" : "#888",
    fontWeight: active(href) ? 500 : 400,
    textDecoration: "none",
    transition: "color 0.2s",
  });

  const publicLinks = [
    { href: "/",          label: "Home"       },
    { href: "/about",     label: "About"      },
    { href: "/prediction",label: "Prediction" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard"  },
    { href: "/profile",   label: "My Profile" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Mono:wght@400;500&display=swap');
        .nl:hover { color: #0a0a0a !important; }
        .drawer { transform: translateX(100%); transition: transform 0.32s cubic-bezier(0.4,0,0.2,1); }
        .drawer.open { transform: translateX(0); }
      `}</style>

      {/* ── Navbar bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(245,240,232,0.95)", backdropFilter: "blur(12px)", borderColor: "#d4cabc" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "#0a0a0a", textDecoration: "none" }}>
            Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            {publicLinks.map(l => (
              <Link key={l.href} href={l.href} className="nl" style={monoLink(l.href)}>{l.label}</Link>
            ))}

            {auth?.user ? (
              <>
                <Link href="/dashboard" className="nl" style={monoLink("/dashboard")}>Dashboard</Link>

                {/* Profile avatar button */}
                <Link
                  href="/profile"
                  title="My Profile"
                  className="w-9 h-9 flex items-center justify-center border-2 transition-all"
                  style={{ borderColor: active("/profile") ? "#9e8a6e" : "#0a0a0a", background: active("/profile") ? "#0a0a0a" : "transparent", color: active("/profile") ? "#c8b89a" : "#0a0a0a" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0a0a0a"; el.style.color = "#c8b89a"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (!active("/profile")) { el.style.background = "transparent"; el.style.color = "#0a0a0a"; } }}
                >
                  <IconUser />
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 transition-all"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", border: "1.5px solid #0a0a0a", color: "#0a0a0a", background: "transparent", cursor: "pointer" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#0a0a0a"; el.style.color = "#f5f0e8"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#0a0a0a"; }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nl" style={monoLink("/login")}>Login</Link>
                <Link
                  href="/register"
                  className="px-5 py-2 transition-all"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "#0a0a0a", color: "#f5f0e8", border: "1.5px solid #0a0a0a", textDecoration: "none" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#9e8a6e"; el.style.borderColor = "#9e8a6e"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0a0a0a"; el.style.borderColor = "#0a0a0a"; }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile right side ── */}
          <div className="flex md:hidden items-center gap-3">
            {auth?.user && (
              <Link
                href="/profile"
                className="w-8 h-8 flex items-center justify-center border"
                style={{ borderColor: "#0a0a0a", color: "#0a0a0a" }}
              >
                <IconUser />
              </Link>
            )}
            <button
              onClick={() => setOpen(p => !p)}
              aria-label="Toggle navigation"
              className="w-9 h-9 flex items-center justify-center border-2 transition-all"
              style={{ borderColor: "#0a0a0a", background: open ? "#0a0a0a" : "transparent", color: open ? "#c8b89a" : "#0a0a0a" }}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{ background: "rgba(10,10,10,0.45)", backdropFilter: "blur(3px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      {/* ── Slide-in drawer ── */}
      <aside
        className={`drawer fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col${open ? " open" : ""}`}
        style={{ width: "min(300px, 82vw)", background: "#f5f0e8", borderLeft: "2px solid #0a0a0a" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#d4cabc" }}>
          <Link href="/" onClick={() => setOpen(false)} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0a0a0a", textDecoration: "none" }}>
            Career<span style={{ color: "#9e8a6e", fontStyle: "italic" }}>AI</span>
          </Link>
          <button onClick={() => setOpen(false)} style={{ color: "#888", background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}>
            <IconClose />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-5">

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.6rem" }}>Navigation</p>

          {publicLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3.5 border-b"
              style={{ borderColor: "#e8e0d0", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: active(l.href) ? "#0a0a0a" : "#888", fontWeight: active(l.href) ? 500 : 400, textDecoration: "none" }}
            >
              {l.label}
              {active(l.href) && <span style={{ color: "#9e8a6e" }}><IconArrow /></span>}
            </Link>
          ))}

          {auth?.user && (
            <>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb", marginTop: "1.5rem", marginBottom: "0.6rem" }}>Account</p>

              {authLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b"
                  style={{ borderColor: "#e8e0d0", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: active(l.href) ? "#0a0a0a" : "#888", fontWeight: active(l.href) ? 500 : 400, textDecoration: "none" }}
                >
                  {l.label}
                  {active(l.href) && <span style={{ color: "#9e8a6e" }}><IconArrow /></span>}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Footer / auth actions */}
        <div className="px-5 py-5 border-t space-y-3" style={{ borderColor: "#d4cabc" }}>
          {auth?.user ? (
            <button
              onClick={handleLogout}
              className="w-full py-3.5 flex items-center justify-center transition-all"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#0a0a0a", border: "1.5px solid #0a0a0a", cursor: "pointer" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#0a0a0a"; el.style.color = "#f5f0e8"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#0a0a0a"; }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full py-3.5 flex items-center justify-center"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#0a0a0a", color: "#f5f0e8", border: "1.5px solid #0a0a0a", textDecoration: "none" }}
              >
                Create Account →
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full py-3.5 flex items-center justify-center"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "transparent", color: "#0a0a0a", border: "1.5px solid #0a0a0a", textDecoration: "none" }}
              >
                Sign In
              </Link>
            </>
          )}

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ccc", textAlign: "center", paddingTop: "0.25rem" }}>
            ◆ CareerAI · AI Career Platform
          </p>
        </div>
      </aside>
    </>
  );
}