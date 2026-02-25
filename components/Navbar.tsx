"use client";

import { useScrollTo } from "@/hooks/useScrollTo";

export function Navbar() {
  const scrollTo = useScrollTo();

  return (
    <header className="fixed w-full bg-[#020817]/80 backdrop-blur-md border-b border-white/8 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="font-bold text-lg text-white">YUNX DETEKTION</h1>
        <nav className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#stats"     onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">Features</a>
          <a href="#demo"      onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">Demo</a>
          <a href="#timeline"  onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">Roadmap</a>
        </nav>
        <a href="#demo" onClick={scrollTo}
          className="bg-white text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-cyan-300 transition-colors"
        >
          Request Demo
        </a>
      </div>
    </header>
  );
}
