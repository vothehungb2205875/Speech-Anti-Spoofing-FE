"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SlideStep {
  id: number;
  src: string;
}

const slideSteps: SlideStep[] = [
  { id: 1, src: "/images/Step_1.png" },
  { id: 2, src: "/images/Step_2.png" },
  { id: 3, src: "/images/Step_3.png" },
  { id: 4, src: "/images/Step_4.png" },
  { id: 5, src: "/images/Step_5.png" },
  { id: 6, src: "/images/Step_6.png" },
];

export function VideoPlayer() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideSteps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black relative">
      <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
        {/* Only current + next slide mounted — avoids holding all 6 images in GPU memory.
           Next slide is pre-mounted at opacity 0 so it is decoded before it becomes current. */}
        {slideSteps.map((slide, i) => {
          const isCurrent = i === currentSlide;
          const isNext    = i === (currentSlide + 1) % slideSteps.length;
          if (!isCurrent && !isNext) return null;
          return (
            <Image
              key={slide.id}
              src={slide.src}
              alt={`Step ${slide.id}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{
                opacity: isCurrent ? 1 : 0,
                transition: "opacity 0.6s ease",
                willChange: "opacity",
                pointerEvents: "none",
                userSelect: "none",
              }}
              draggable={false}
              priority={i === 0}
            />
          );
        })}
      </div>
    </div>
  );
}
