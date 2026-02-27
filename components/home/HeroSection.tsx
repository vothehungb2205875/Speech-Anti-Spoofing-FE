"use client";

import { useScrollTo } from "@/hooks/useScrollTo";
import { HeroSectionContent } from "./HeroSectionContent";

export function HeroSection() {
  const scrollTo = useScrollTo();

  return (
    <HeroSectionContent 
      onTryDetectionClick={scrollTo}
      onLearnMoreClick={scrollTo}
    />
  );
}
