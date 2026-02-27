"use client";

import { useScrollTo } from "@/hooks/useScrollTo";
import { StatsCarousel } from "./StatsCarousel";
import { DownArrow } from "./DownArrow";

export function StatsSection() {
  const scrollTo = useScrollTo();
  return (
    <section id="stats" className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-500 uppercase mb-3">Every Minute of Every Day</p>
          <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
            Defend Your Organization in the Age of<br/>
            <span className="text-transparent bg-clip-text" style={{ backgroundColor: "#06b6d4" }}>
              AI-Generated Media &amp; Voice Explosion
            </span>
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Every minute, billions of audio communications are transmitted — and AI is making voice fraud easier than ever.
            Data from <span className="font-semibold text-gray-700">DOMO Data Never Sleeps 12</span> reveals the scale of the threat.
          </p>
        </div>

        <StatsCarousel />

        <div className="rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #020817 0%, #0d1f3c 100%)" }}>
          <div>
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-2">The threat hidden in every call</p>
            <h4 className="text-white font-bold text-xl leading-snug">
              Among the millions of voices transmitted every minute,<br className="hidden md:block"/>
              how many are real?
            </h4>
          </div>
          <a href="#demo"
            onClick={scrollTo}
            className="flex-shrink-0 px-6 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            Try Detection Now
            <DownArrow className="text-black" />
          </a>
        </div>
      </div>
    </section>
  );
}
