"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, BarChart3, ArrowRight, Sparkles, CheckCircle2, AlertTriangle, Crosshair, RefreshCw } from "lucide-react";
import { useState } from "react";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

interface AnalysisData {
  overview: string;
  vulnerabilities: string[];
  counterStrategy: string;
}

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [error, setError] = useState("");

  const { isSignedIn } = useUser();

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "Analysis failed. Please check the URL.");
      }
    } catch (err) {
      setError("Something went wrong. Make sure server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-xl tracking-wider text-white">
            <span className="p-2 bg-blue-600 rounded-lg text-white"><Zap className="w-5 h-5" /></span>
            WAR-ROOM <span className="text-blue-500 text-xs font-semibold px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full">SaaS v3.8</span>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-400 hover:text-white transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/25 transition">
                  Start Free Trial
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-12 px-6 max-w-5xl mx-auto text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4" /> Powered by Gemini Intelligence Engine
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Turn Competitor Websites Into <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Actionable Growth Playbooks</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time automated scraping, market vulnerability assessment, and executive tactical strategy generated in under 10 seconds.
          </p>
        </motion.div>

        {/* Input & Action Button (Protected by Auth Gate) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto p-2 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-2"
        >
          <input 
            type="text" 
            placeholder="Enter Competitor Domain (e.g. notion.so)" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 outline-none text-sm font-medium"
          />

          <SignedOut>
            <SignInButton mode="modal">
              <button 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
              >
                <ArrowRight className="w-4 h-4" />
                Run Analysis
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>
          </SignedIn>
        </motion.div>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-400 text-sm font-medium">{error}</p>
        )}
      </section>

      {/* Dynamic Results Display */}
      {result && (
        <section className="max-w-4xl mx-auto px-6 py-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-2xl space-y-6 text-left backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><BarChart3 className="w-6 h-6" /></span>
              <h2 className="text-xl font-bold text-white">Competitive Intelligence Briefing</h2>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Market Overview</h3>
              <p className="text-slate-200 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">{result.overview}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Vulnerabilities & Market Gaps
              </h3>
              <ul className="space-y-2">
                {result.vulnerabilities.map((v, i) => (
                  <li key={i} className="flex items-start gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-slate-300 text-sm">
                    <span className="text-amber-400 font-bold">•</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-emerald-400" /> Counter-Attack Strategy
              </h3>
              <p className="text-emerald-300 font-medium bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl leading-relaxed">
                {result.counterStrategy}
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Credit-Based Commercial Pricing</h2>
        <p className="text-slate-400 mb-12">Start free with 3 credits, upgrade anytime for unlimited enterprise reports.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <h3 className="text-xl font-bold text-white">Starter Free</h3>
            <p className="text-3xl font-extrabold text-white mt-4">$0 <span className="text-sm text-slate-500 font-normal">/ forever</span></p>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 3 Full Analysis Credits</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Standard PDF Report Export</li>
            </ul>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition">
                  Get Started Free
                </button>
              </SignUpButton>
            </SignedOut>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-900/30 to-slate-900 border border-blue-500/40 text-left relative overflow-hidden">
            <span className="absolute top-4 right-4 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full text-white">POPULAR</span>
            <h3 className="text-xl font-bold text-white">Agency Pro</h3>
            <p className="text-3xl font-extrabold text-white mt-4">$49 <span className="text-sm text-slate-500 font-normal">/ month</span></p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited Competitor Reports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Executive Custom PDF Branding</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Priority Gemini Processing</li>
            </ul>
            <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition">
              Subscribe via Stripe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}