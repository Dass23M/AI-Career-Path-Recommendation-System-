"use client";

import Link from "next/link";

const FooterLinkGroup = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <h4
      className="mb-5 text-xs tracking-widest uppercase"
      style={{ fontFamily: "'DM Mono', monospace", color: "#c8b89a", letterSpacing: "0.15em" }}
    >
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            className="text-sm transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#888", fontWeight: 300 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f5f0e8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#888"; }}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400&display=swap');
      `}</style>

      <footer style={{ background: "#0a0a0a", color: "#f5f0e8" }}>

        {/* Top decorative rule */}
        <div style={{ height: "2px", background: "linear-gradient(to right, #0a0a0a, #c8b89a, #0a0a0a)" }} />

        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* 
            Mobile:  1 col stacked
            md:      2 col (brand + links side by side)
            lg:      4 col original layout
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand — full width on mobile, spans normally on lg */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.5rem", color: "#f5f0e8", letterSpacing: "-0.02em" }}
              >
                Career<span style={{ color: "#c8b89a", fontStyle: "italic" }}>AI</span>
              </Link>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#555", fontWeight: 300, maxWidth: "22ch" }}
              >
                Smart career prediction powered by artificial intelligence.
              </p>

              {/* Decorative index line */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "#1e1e1e" }}>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#333" }}
                >
                  Est. 2025 · AI Platform
                </span>
              </div>
            </div>

            {/* Link groups — 2 col on mobile, 1 col each on lg */}
            <FooterLinkGroup
              title="Product"
              links={[
                { label: "Career Prediction", href: "/prediction" },
                { label: "Dashboard",         href: "/dashboard"  },
                { label: "Skill Analysis",    href: "/"           },
                { label: "Roadmaps",          href: "/"           },
              ]}
            />

            <FooterLinkGroup
              title="Company"
              links={[
                { label: "About",   href: "/about" },
                { label: "Contact", href: "/"      },
                { label: "Blog",    href: "/"      },
                { label: "Careers", href: "/"      },
              ]}
            />

            <FooterLinkGroup
              title="Legal"
              links={[
                { label: "Privacy Policy",   href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Cookie Policy",    href: "/" },
              ]}
            />

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1e1e1e" }}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <span
              className="text-xs tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace", color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              © {new Date().getFullYear()} CareerAI Platform. All rights reserved.
            </span>
            <div className="flex items-center gap-1">
              {["◆", "◆", "◆"].map((d, i) => (
                <span key={i} style={{ color: i === 1 ? "#c8b89a" : "#222", fontSize: "0.5rem" }}>{d}</span>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}