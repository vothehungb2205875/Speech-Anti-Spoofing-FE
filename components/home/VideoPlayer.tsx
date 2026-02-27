"use client";

import { useState, useEffect } from "react";

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
    <>
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-enter {
          animation: fadeInSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black relative">
        <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
          {/* Current slide with fade transition */}
          <img
            src={slideSteps[currentSlide].src}
            alt={`Step ${slideSteps[currentSlide].id}`}
            className="absolute w-full h-full object-cover slide-enter"
            key={`slide-${currentSlide}`}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </>
  );
}
