"use client";

import { useState, useCallback } from "react";
import { useScrollTo } from "@/hooks/useScrollTo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const scrollTo = useScrollTo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => setIsMobileMenuOpen((v) => !v), []);
  const handleMenuClose = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header
      className="fixed w-full bg-[#020817]/80 backdrop-blur-md border-b border-white/8 z-50"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a href="/" className="font-bold text-lg md:text-xl text-white hover:text-cyan-400 transition-colors">YUNX DETEKTION</a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm text-slate-400 flex-1 justify-center">
            <a href="/" className="hover:text-white transition-colors cursor-pointer">
              Home
            </a>
            <a href="#stats" onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">
              Stats
            </a>
            <a href="#about" onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">
              About
            </a>
            <a href="#demo" onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">
              Demo
            </a>
            <a href="#timeline" onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">
              Roadmap
            </a>
            <a href="#faq" onClick={scrollTo} className="hover:text-white transition-colors cursor-pointer">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <a
            href="/request-demo"
            className="hidden md:inline-block bg-white text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Request Demo
          </a>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
