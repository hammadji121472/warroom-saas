"use client";

import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { CheckCircle2, Zap, Shield, Rocket, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">WarRoom SaaS</span>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <a 
                href="/dashboard" 
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
              >
                Dashboard
              </a>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-300 hover:text-white transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <Rocket className="h-3.5 w-3.5" /> Next-Gen War Room SaaS
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent max-w-3xl">
          Command Your Business Strategy In Real-Time
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Monitor crypto signals, manage operational workflows, and scale your automated war-room operations with high precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          {isSignedIn ? (
            <a 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
            >
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </a>
          ) : (
            <SignUpButton mode="modal">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </button>
            </SignUpButton>
          )}
        </div>

        {/* Pricing Cards Section */}
        <section className="mt-24 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Starter Plan</h3>
              <p className="text-slate-400 text-sm mb-6">Essential tools for individual operators.</p>
              <div className="text-3xl font-extrabold text-white mb-6">$0 <span className="text-sm font-normal text-slate-400">/ month</span></div>
              
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Basic Signals & Data</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Standard Execution Speed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Community Access</li>
              </ul>
            </div>

            <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-blue-600/50 relative flex flex-col justify-between shadow-xl shadow-blue-900/20">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Pro War-Room</h3>
              <p className="text-slate-400 text-sm mb-6">Full suite of automated tools & real-time analytics.</p>
              <div className="text-3xl font-extrabold text-white mb-6">$29 <span className="text-sm font-normal text-slate-400">/ month</span></div>

              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> High-frequency Signals</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Priority API Latency</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Automated Bot Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> 24/7 Priority Support</li>
              </ul>
            </div>

            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-md shadow-blue-600/30">
              Subscribe via Stripe
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} WarRoom SaaS. All rights reserved.
      </footer>
    </div>
  );
}