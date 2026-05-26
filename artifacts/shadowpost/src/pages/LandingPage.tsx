import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/context/WalletContext";
import { useLocation } from "wouter";

function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(29,78,216,0.12) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/3 -left-20 w-[400px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
      />
    </div>
  );
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
      </svg>
    ),
    label: "NaCl Encrypted",
    desc: "End-to-end locally",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
      </svg>
    ),
    label: "Walrus Storage",
    desc: "via Tatum API",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    label: "Tatum Sui RPC",
    desc: "Mainnet delivery",
  },
];

const steps = [
  {
    n: "01",
    title: "Encrypt Locally",
    body: "Your message is sealed in your browser with NaCl box encryption using the recipient's public key. The plaintext never leaves your device.",
    tag: "TweetNaCl · Client-side",
    color: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.25)",
    tagColor: "#A78BFA",
  },
  {
    n: "02",
    title: "Store on Walrus",
    body: "The encrypted blob is uploaded to Walrus decentralized storage via Tatum's Storage API. Walrus distributes the data across nodes — no single point of failure.",
    tag: "Walrus · Tatum Storage API",
    color: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
    tagColor: "#60A5FA",
  },
  {
    n: "03",
    title: "Deliver on Sui",
    body: "A Sui transaction records the Walrus blob ID on-chain, transferring a Secret object to the recipient. All RPC calls route through Tatum's Sui Mainnet nodes.",
    tag: "Sui Mainnet · Tatum RPC",
    color: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
    tagColor: "#4ADE80",
  },
];

export default function LandingPage() {
  const { connected, isConnecting, openModal } = useWallet();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected) setLocation("/dashboard");
  }, [connected, setLocation]);

  const handleEnter = () => {
    if (isConnecting) return;
    if (connected) {
      setLocation("/dashboard");
      return;
    }
    setLoading(true);
    openModal();
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen gradient-mesh grid-pattern flex flex-col">
      <AnimatedOrbs />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 h-16">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M10 2L3 6.5v7L10 18l7-4.5v-7L10 2z" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 2v16M3 6.5l7 4.5 7-4.5" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">ShadowPost</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--sui-text-dim)] px-3 py-1.5 rounded-full border border-[var(--sui-border)] bg-[var(--sui-surface)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Mainnet
          </span>
          <button
            onClick={handleEnter}
            disabled={loading || isConnecting}
            className="text-sm font-medium text-[var(--sui-blue-bright)] hover:text-white transition-colors"
          >
            {isConnecting ? "Connecting…" : "Launch App →"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "var(--sui-text-dim)" }}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-400 shrink-0">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            Zero-knowledge secret delivery
          </div>

          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight mb-3 leading-none"
            style={{ color: "var(--sui-text)" }}
          >
            Drop secrets.
          </h1>
          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-none"
            style={{ background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Not identities.
          </h1>

          <p className="text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed" style={{ color: "var(--sui-text-dim)" }}>
            Send encrypted secrets on-chain. NaCl box encryption, Walrus storage, Sui delivery. Only the recipient can read it.
          </p>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={handleEnter}
              disabled={loading || isConnecting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 0 40px rgba(37,99,235,0.35)" }}
            >
              {isConnecting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Connecting…
                </span>
              ) : (
                "Enter Vault →"
              )}
            </motion.button>
            <span className="text-xs" style={{ color: "var(--sui-text-muted)" }}>
              No signup · Wallet only
            </span>
          </div>
        </motion.div>
      </div>

      {/* Feature strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 flex justify-center gap-6 sm:gap-12 px-6 pb-10"
      >
        {features.map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <span style={{ color: "var(--sui-text-muted)" }}>{f.icon}</span>
            <div>
              <div className="text-[11px] font-medium" style={{ color: "var(--sui-text-dim)" }}>
                {f.label}
              </div>
              <div className="text-[10px]" style={{ color: "var(--sui-text-muted)" }}>
                {f.desc}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── How it works ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 px-6 pb-16 max-w-4xl mx-auto w-full"
      >
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--sui-blue-bright)" }}>
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Three steps. Zero trust required.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: s.color, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black" style={{ color: s.border }}>{s.n}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.25)", color: s.tagColor, border: `1px solid ${s.border}` }}
                >
                  {s.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--sui-text-dim)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Powered by ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="relative z-10 pb-10 flex flex-col items-center gap-3"
      >
        <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "var(--sui-text-muted)" }}>
          Powered by
        </p>
        <div className="flex items-center gap-5">
          {[
            { name: "Tatum", sub: "RPC + Storage API", color: "#F59E0B" },
            { name: "Walrus", sub: "Decentralized Storage", color: "#60A5FA" },
            { name: "Sui", sub: "Mainnet Blockchain", color: "#22D3EE" },
          ].map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-black" style={{ color: p.color }}>{p.name}</span>
              <span className="text-[9px]" style={{ color: "var(--sui-text-muted)" }}>{p.sub}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
