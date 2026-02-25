"use client";

import { useState, useEffect, useRef } from "react";
import { DragOverlay } from "@/components/home/DragOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { DemoSection } from "@/components/home/DemoSection";
import { TimelineSection } from "@/components/home/TimelineSection";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current++;
      if (dragCounter.current === 1) setIsDragging(true);
    };
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };
    const onDragOver = (e: DragEvent) => e.preventDefault();
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      const dropped = e.dataTransfer?.files?.[0];
      if (dropped && dropped.type.startsWith("audio/")) {
        setFile(dropped);
      }
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  return (
    <div className="bg-[#f4f4f4] text-gray-900">
      <DragOverlay isDragging={isDragging} />
      <HeroSection />
      <StatsSection />
      <DemoSection file={file} setFile={setFile} />
      <TimelineSection />
    </div>
  );
}
