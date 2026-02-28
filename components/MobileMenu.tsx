"use client";

import { memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScrollTo } from "@/hooks/useScrollTo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = memo(function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const scrollTo = useScrollTo();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleNavClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const sectionLinks = [
    { label: "Stats", href: "#stats" },
    { label: "About", href: "#about" },
    { label: "Demo", href: "#demo" },
    { label: "Roadmap", href: "#timeline" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-[#020817] border-b border-white/8 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-0 text-sm text-slate-400 px-6 py-4">
          {/* Home Link */}
          <Link
            href="/"
            onClick={handleNavClick}
            className="py-3 px-2 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-b border-white/5"
          >
            Home
          </Link>

          {/* Section Links */}
          {sectionLinks.map((item) => (
            <a
              key={item.label}
              href={isHomePage ? item.href : `/${item.href}`}
              onClick={(e) => {
                if (isHomePage) {
                  scrollTo(e as any);
                }
                handleNavClick();
              }}
              className="py-3 px-2 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-b border-white/5"
            >
              {item.label}
            </a>
          ))}

          {/* Request Demo Link */}
          <Link
            href="/request-demo"
            onClick={handleNavClick}
            className="py-3 px-2 mt-2 bg-white text-black rounded-lg font-bold text-center hover:bg-cyan-300 transition-colors"
          >
            Request Demo
          </Link>
        </nav>
      </div>
    </>
  );
});
