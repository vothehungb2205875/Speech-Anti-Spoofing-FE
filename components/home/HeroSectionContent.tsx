// Server Component - Purely presentational
import { WaveCanvas } from "./WaveCanvas";
import { DownArrow } from "./DownArrow";

interface HeroSectionContentProps {
  onTryDetectionClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onLearnMoreClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroSectionContent({
  onTryDetectionClick,
  onLearnMoreClick,
}: HeroSectionContentProps) {
  return (
    <section
      className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 40%, #0d1f3c 70%, #060d1a 100%)" }}
    >
      <WaveCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(2,8,23,0.92) 30%, rgba(2,8,23,0.50) 60%, transparent 100%)", zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(2,8,23,0.70) 0%, transparent 25%, transparent 75%, rgba(2,8,23,0.80) 100%)", zIndex: 2 }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-6 py-12 md:py-16 w-full" style={{ zIndex: 10 }}>
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-2.5 md:px-4 py-1.5 text-xs md:text-sm text-cyan-300/80 mb-4 md:mb-8">
          <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">New model: XLSR-SLS speech deepfake detection</span>
          <span className="sm:hidden">XLSR-SLS Detection</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-3 md:mb-6">
          Protect Every Voice <br className="hidden sm:block" />
          <span className="text-[#06b6d4] italic">From AI Manipulation</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mb-6 md:mb-10 font-light leading-relaxed">
          Enterprise-grade Speech Deepfake Detection powered by neural networks and advanced spectral analysis.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <a
            href="#demo"
            onClick={onTryDetectionClick}
            className="w-full sm:w-auto px-6 md:px-7 py-3 md:py-3.5 bg-white text-black rounded-xl font-bold hover:bg-cyan-300 transition-colors flex items-center justify-center md:justify-start gap-2 text-sm md:text-base"
          >
            Try Detection
            <DownArrow className="text-black inline" />
          </a>
          <a
            href="#about"
            onClick={onLearnMoreClick}
            className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer"
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}
