"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResult(data.result || "Analysis complete!");
    } catch (err) {
      setResult("Error running strategy analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="border-b border-slate-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-500">
              WarRoom SaaS
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Command Your Business Strategy In Real-Time
            </p>
          </div>
          <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20">
            System Operational
          </span>
        </header>

        {/* Input Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Strategic Input / Market Scenario
          </h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your business scenario or metric to analyze..."
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500 transition"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-medium py-3 rounded-lg transition shadow-lg"
          >
            {loading ? "Analyzing Strategy..." : "Execute Analysis"}
          </button>
        </section>

        {/* Output Section */}
        {result && (
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-200 mb-2">
              WarRoom Decision Output
            </h2>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono whitespace-pre-wrap">
              {result}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}