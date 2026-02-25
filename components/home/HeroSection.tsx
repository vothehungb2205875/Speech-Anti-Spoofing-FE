"use client";

import { useScrollTo } from "@/hooks/useScrollTo";
import { WaveCanvas } from "./WaveCanvas";
import { DownArrow } from "./DownArrow";

export function HeroSection() {
  const scrollTo = useScrollTo();

  return (
    <section
      className="relative h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 40%, #0d1f3c 70%, #060d1a 100%)" }}
    >
      <WaveCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(2,8,23,0.92) 30%, rgba(2,8,23,0.50) 60%, transparent 100%)", zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(2,8,23,0.70) 0%, transparent 25%, transparent 75%, rgba(2,8,23,0.80) 100%)", zIndex: 2 }} />
      <div className="relative max-w-6xl mx-auto px-6 pt-16" style={{ zIndex: 10 }}>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-1.5 text-sm text-cyan-300/80 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          New model: XLSR-SLS speech deepfake detection
        </div>
        <h2 className="text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
          Protect Every Voice <br />
          <span className="text-[#06b6d4] italic">From AI Manipulation</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mb-10 font-light leading-relaxed">
          Enterprise-grade Speech Deepfake Detection powered by neural networks and advanced spectral analysis.
        </p>
        <div className="flex items-center gap-4">
          <a href="#demo" onClick={scrollTo} className="px-7 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-cyan-300 transition-colors flex items-center gap-2">
            Try Detection
            <DownArrow className="text-black" />
          </a>
          <a href="#tech" onClick={scrollTo} className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer">
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}
