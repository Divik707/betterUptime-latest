"use client";

import { useState, useEffect, useRef } from "react";

const statusData = [
  { name: "api.stripe.com", status: "up", latency: "42ms", uptime: "99.98%" },
  { name: "github.com", status: "up", latency: "67ms", uptime: "99.95%" },
  { name: "myapp.vercel.app", status: "down", latency: "—", uptime: "97.12%" },
  { name: "db.supabase.co", status: "up", latency: "28ms", uptime: "100%" },
  { name: "cdn.cloudflare.com", status: "up", latency: "11ms", uptime: "99.99%" },
];

const features = [
  {
    icon: "⚡",
    title: "30-second checks",
    desc: "We ping your website every 30 seconds from 20+ global locations so you know the moment something breaks.",
  },
  {
    icon: "🌍",
    title: "Global monitoring",
    desc: "Monitors run from North America, Europe, Asia, and Australia — no blind spots, no excuses.",
  },
  {
    icon: "📊",
    title: "Beautiful dashboards",
    desc: "Clean, real-time dashboards with uptime history, response times, and incident timelines.",
  },
  {
    icon: "🔔",
    title: "Instant alerts",
    desc: "Get notified via Slack, email, SMS, or PagerDuty the second your site goes down.",
  },
  {
    icon: "🔒",
    title: "SSL monitoring",
    desc: "Track certificate expiry dates and get alerts before they cause issues for your users.",
  },
  {
    icon: "📈",
    title: "SLA reporting",
    desc: "Auto-generated uptime reports for your team or clients with beautiful charts.",
  },
];

const stats = [
  { value: "99.9%", label: "Average uptime tracked" },
  { value: "20+", label: "Global locations" },
  { value: "2M+", label: "Checks per minute" },
  { value: "<1s", label: "Alert delivery time" },
];

function BarChart() {
  const bars = [100, 100, 100, 98, 100, 100, 100, 100, 95, 100, 100, 100, 100, 100, 99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 100, 100, 100, 100, 100];
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "40px" }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.max(h * 0.4, h === 0 ? 40 : 4)}px`,
            background: h === 0 ? "#ef4444" : h < 100 ? "#f59e0b" : "#22c55e",
            borderRadius: "2px",
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function TypingText({ texts }: { texts: string[] }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[current];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrent((c) => (c + 1) % texts.length);
    }
  }, [displayed, deleting, current, texts]);

  return (
    <span style={{ color: "#34d399", borderRight: "2px solid #34d399", paddingRight: "4px" }}>
      {displayed}
    </span>
  );
}

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | { status: "up" | "down"; latency: string; code: number }>(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheck = async () => {
    if (!url) return;
    setChecking(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2200));
    const isDown = url.includes("down") || url.includes("fail") || url.includes("error");
    setResult(
      isDown
        ? { status: "down", latency: "—", code: 503 }
        : { status: "up", latency: `${Math.floor(Math.random() * 80 + 20)}ms`, code: 200 }
    );
    setChecking(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #050810;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        .syne { font-family: 'Syne', sans-serif; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(5,8,16,0.7);
          backdrop-filter: blur(20px);
          transition: background 0.3s;
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 8px;
        }

        .nav-logo .dot {
          width: 8px; height: 8px;
          background: #34d399;
          border-radius: 50%;
          box-shadow: 0 0 10px #34d399;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .nav-links { display: flex; gap: 32px; }
        .nav-links a {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-links a:hover { color: #fff; }

        .nav-cta {
          background: #34d399;
          color: #050810;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 22px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .nav-cta:hover { background: #6ee7b7; transform: translateY(-1px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(52,211,153,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent);
        }

        .hero-glow {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -60%);
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          top: 30%; right: 10%;
          pointer-events: none;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #34d399;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }

        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -3px;
          text-align: center;
          max-width: 900px;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .hero h1 .dim { color: rgba(255,255,255,0.25); }

        .hero-sub {
          font-size: clamp(16px, 2vw, 19px);
          color: rgba(255,255,255,0.45);
          text-align: center;
          max-width: 520px;
          line-height: 1.65;
          margin-top: 24px;
          font-weight: 300;
          animation: fadeUp 0.6s ease 0.2s both;
        }

        /* URL CHECK BOX */
        .check-box {
          margin-top: 48px;
          width: 100%;
          max-width: 580px;
          animation: fadeUp 0.6s ease 0.3s both;
        }

        .check-input-row {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .check-input-row:focus-within {
          border-color: rgba(52,211,153,0.4);
          box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
        }

        .check-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 18px 20px;
          color: #fff;
          font-family: 'DM Mono', 'DM Sans', monospace;
          font-size: 15px;
        }

        .check-input::placeholder { color: rgba(255,255,255,0.2); }

        .check-btn {
          background: #34d399;
          color: #050810;
          border: none;
          cursor: pointer;
          padding: 0 28px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.02em;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .check-btn:hover:not(:disabled) { background: #6ee7b7; }
        .check-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .result-card {
          margin-top: 16px;
          padding: 18px 22px;
          border-radius: 12px;
          display: flex; align-items: center; gap: 14px;
          animation: fadeUp 0.4s ease both;
        }

        .result-card.up {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
        }

        .result-card.down {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
        }

        .result-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .result-dot.up { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
        .result-dot.down { background: #ef4444; box-shadow: 0 0 8px #ef4444; }

        /* DASHBOARD PREVIEW */
        .dashboard-preview {
          margin-top: 80px;
          width: 100%;
          max-width: 900px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          animation: fadeUp 0.6s ease 0.4s both;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }

        .dashboard-topbar {
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 14px 20px;
          display: flex; align-items: center; gap: 8px;
        }

        .topbar-dot { width: 10px; height: 10px; border-radius: 50%; }

        .dashboard-body { padding: 24px; }

        .monitor-row {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .monitor-row:last-child { border-bottom: none; }

        .monitor-status {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .monitor-status.up { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
        .monitor-status.down { background: #ef4444; box-shadow: 0 0 6px #ef4444; animation: blink 1s ease infinite; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .monitor-name { flex: 1; font-size: 13px; color: rgba(255,255,255,0.7); font-family: monospace; }

        .monitor-latency {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          width: 50px; text-align: right;
        }

        .monitor-uptime {
          font-size: 12px;
          width: 55px; text-align: right;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
        }

        /* STATS */
        .stats-section {
          padding: 100px 48px;
          display: flex; justify-content: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          max-width: 900px; width: 100%;
        }

        .stat-item {
          background: #050810;
          padding: 48px 40px;
          text-align: center;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -2px;
          color: #fff;
          line-height: 1;
        }

        .stat-label {
          margin-top: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
        }

        /* FEATURES */
        .features-section {
          padding: 0 48px 120px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #34d399;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .section-title .dim { color: rgba(255,255,255,0.2); }

        .section-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          max-width: 400px;
          line-height: 1.6;
          margin-bottom: 64px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          overflow: hidden;
        }

        .feature-card {
          background: #050810;
          padding: 40px 36px;
          transition: background 0.3s;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(52,211,153,0.04), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card:hover { background: rgba(255,255,255,0.02); }
        .feature-card:hover::before { opacity: 1; }

        .feature-icon {
          font-size: 28px;
          margin-bottom: 20px;
          display: block;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }

        .feature-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
          font-weight: 300;
        }

        /* ABOUT */
        .about-section {
          padding: 80px 48px 120px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .about-visual {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .about-visual::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(52,211,153,0.12), transparent 70%);
          border-radius: 50%;
        }

        .about-chart-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }

        .uptime-number {
          font-family: 'Syne', sans-serif;
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -3px;
          color: #34d399;
          line-height: 1;
          margin-bottom: 8px;
        }

        .uptime-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 28px;
        }

        .about-text { }

        .about-text p {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .about-text p strong {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        /* CTA */
        .cta-section {
          padding: 80px 48px 140px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(52,211,153,0.1), transparent 70%);
          top: 0; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .cta-section h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800;
          letter-spacing: -2.5px;
          line-height: 1.05;
          max-width: 700px;
          margin-bottom: 24px;
        }

        .cta-section p {
          font-size: 17px;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          max-width: 440px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .cta-btns { display: flex; gap: 16px; }

        .btn-primary {
          background: #34d399;
          color: #050810;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 36px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          border: none; cursor: pointer;
        }

        .btn-primary:hover { background: #6ee7b7; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(52,211,153,0.3); }

        .btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 16px 36px;
          border-radius: 100px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s;
          cursor: pointer;
        }

        .btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #fff; transform: translateY(-2px); }

        /* FOOTER */
        footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 32px 48px;
          display: flex; align-items: center; justify-content: space-between;
        }

        footer p {
          font-size: 13px;
          color: rgba(255,255,255,0.2);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          nav { padding: 16px 20px; }
          .nav-links { display: none; }
          .hero { padding: 100px 20px 60px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .about-section { grid-template-columns: 1fr; gap: 40px; padding: 40px 20px 80px; }
          .features-section, .stats-section { padding-left: 20px; padding-right: 20px; }
          .cta-section { padding: 60px 20px 100px; }
          .cta-btns { flex-direction: column; align-items: center; }
          footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo syne">
          <div className="dot" />
          Pulsewatch
        </div>
        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
          <a href="#">Status</a>
        </div>
        <a href="#" className="nav-cta">Start free →</a>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div className="badge">
          <span style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", display: "inline-block" }} />
          Monitoring 2k endpoints presently
        </div>

        <h1 className="syne">
          Know before<br />
          <span className="dim">your users do</span>
        </h1>

        <p className="hero-sub">
          Instant uptime monitoring for websites, APIs, and servers.
          Get alerted in seconds when something breaks —{" "}
          <TypingText texts={["before it costs you.", "before customers complain.", "before your boss notices.", "while you sleep."]} />
        </p>

        {/* URL CHECK */}
        <div className="check-box">
          <div className="check-input-row">
            <input
              className="check-input"
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
            <button className="check-btn" onClick={handleCheck} disabled={checking || !url}>
              {checking ? "Checking…" : "Check now"}
            </button>
          </div>

          {checking && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(52,211,153,0.4)", borderTopColor: "#34d399", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              Pinging from 20 locations…
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {result && (
            <div className={`result-card ${result.status}`}>
              <div className={`result-dot ${result.status}`} />
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>
                  {result.status === "up" ? "✓ Site is UP" : "✗ Site is DOWN"}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
                  HTTP {result.code} · Latency {result.latency} · Checked from 20 locations
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="dashboard-preview">
          <div className="dashboard-topbar">
            <div className="topbar-dot" style={{ background: "#ef4444" }} />
            <div className="topbar-dot" style={{ background: "#f59e0b" }} />
            <div className="topbar-dot" style={{ background: "#22c55e" }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>pulsewatch.io/dashboard</span>
          </div>
          <div className="dashboard-body">
            <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>Live Monitors</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>Last checked: just now</span>
            </div>
            {statusData.map((m) => (
              <div className="monitor-row" key={m.name}>
                <div className={`monitor-status ${m.status}`} />
                <span className="monitor-name">{m.name}</span>
                <BarChart />
                <span className="monitor-latency">{m.latency}</span>
                <span className="monitor-uptime" style={{ color: m.uptime === "100%" ? "#34d399" : m.status === "down" ? "#ef4444" : "#f59e0b" }}>
                  {m.uptime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value syne">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-label">Features</div>
        <h2 className="section-title syne">
          Everything you need<br />
          <span className="dim">to stay online.</span>
        </h2>
        <p className="section-sub">
          Built for developers, loved by ops teams. No fluff — just the tools that matter.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title syne">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-visual">
          <div className="about-chart-label">30-day uptime</div>
          <div className="uptime-number">99.97%</div>
          <div className="uptime-sub">across all monitored endpoints</div>
          <BarChart />
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            {[
              { color: "#22c55e", label: "Operational" },
              { color: "#f59e0b", label: "Degraded" },
              { color: "#ef4444", label: "Down" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-text">
          <div className="section-label">About</div>
          <h2 className="section-title syne" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 24 }}>
            Built for teams that<br />
            <span className="dim">can't afford downtime.</span>
          </h2>
          <p>
            <strong>PulseWatch</strong> was born out of frustration. We were tired of finding out our websites were down from angry customers instead of our own tools.
          </p>
          <p>
            We built a monitoring platform that's <strong>fast, honest, and actually useful</strong> — with real-time dashboards, multi-location checks, and alerts that don't wake you up for false positives.
          </p>
          <p>
            Whether you're a solo developer or an enterprise ops team, PulseWatch gives you <strong>complete visibility</strong> over your infrastructure in minutes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <h2 className="syne">
          Start monitoring<br />in 60 seconds.
        </h2>
        <p>No credit card. No setup headaches. Just paste your URL and we'll handle the rest.</p>
        <div className="cta-btns">
          <button className="btn-primary">Get started free →</button>
          <button className="btn-ghost">View live demo</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="nav-logo syne" style={{ fontSize: 16 }}>
          <div className="dot" />
          PulseWatch
        </div>
        <p>© 2025 PulseWatch. Built with obsession over uptime.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Status", "Docs"].map((l) => (
            <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}