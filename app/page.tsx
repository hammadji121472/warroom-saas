export const dynamic = "force-dynamic";

import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Zap, Rocket, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">WarRoom SaaS</span>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-3">
              <a 
                href="/dashboard" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
              >
                Go to Dashboard
              </a>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 text-center flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <Rocket className="h-4 w-4" /> Next-Gen War Room SaaS
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          Command Your Business Strategy In Real-Time
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl">
          Monitor key signals, manage operational war-rooms, and collaborate with enterprise operators with high precision.
        </p>

        <div className="mt-8 flex gap-4">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-lg shadow-lg shadow-blue-500/20 transition cursor-pointer">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a 
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-lg shadow-lg shadow-blue-500/20 transition"
            >
              Open Dashboard <ArrowRight className="h-5 w-5" />
            </a>
          </SignedIn>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        © WarRoom SaaS. All rights reserved.
      </footer>
    </div>
  );
}