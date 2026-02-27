"use client";

import { useScrollTo } from "@/hooks/useScrollTo";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";
import { StatsSectionContent } from "./StatsSectionContent";

export function StatsSection() {
  const scrollTo = useScrollTo();
  const { ref, isVisible } = useIntersectionAnimation();

  return (
    <div ref={ref}>
      <StatsSectionContent 
        onTryDetectionClick={scrollTo}
        titleAnimationClass={isVisible ? "animate-fade-in-up" : "opacity-0"}
      />
    </div>
  );
}
