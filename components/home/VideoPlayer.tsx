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
  const [nextSlide, setNextSlide] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextSlide(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideSteps.length);
        setNextSlide(false);
      }, 600);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.95);
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes slideOutLeft {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
            clip-path: inset(0 0 0 0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px) scale(0.95);
            clip-path: inset(0 0 0 100%);
          }
        }

        .slide-in {
          animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .slide-out {
          animation: slideOutLeft 0.6s ease-in forwards;
        }
      `}</style>

      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
        <div className="w-full h-full relative">
          {slideSteps.map((step, index) => (
            <img
              key={step.id}
              src={step.src}
              alt={`Step ${step.id}`}
              className={`block w-full h-full object-contain bg-black ${
                index === currentSlide 
                  ? nextSlide ? "slide-out" : "slide-in" 
                  : "hidden"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
