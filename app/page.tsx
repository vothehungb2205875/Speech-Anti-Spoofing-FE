"use client";

import { useState, useEffect, useRef } from "react";
import { DragOverlay } from "@/components/home/DragOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { DemoSection } from "@/components/home/DemoSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    const isAudioFile = (file: File): boolean => {
      return file.type.startsWith("audio/");
    };

    const hasAudioFiles = (dataTransfer: DataTransfer | null): boolean => {
      if (!dataTransfer?.files || dataTransfer.files.length === 0) return false;
      // Check if any file is audio
      for (let i = 0; i < dataTransfer.files.length; i++) {
        if (isAudioFile(dataTransfer.files[i])) return true;
      }
      return false;
    };

    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      // Only show overlay if dragging files (not text/selection)
      if (hasAudioFiles(e.dataTransfer)) {
        e.dataTransfer!.dropEffect = "copy";
        dragCounter.current++;
        if (dragCounter.current === 1) setIsDragging(true);
      } else {
        e.dataTransfer!.dropEffect = "none";
      }
    };
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };
    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      // Keep showing overlay only if files are valid audio
      if (hasAudioFiles(e.dataTransfer)) {
        e.dataTransfer!.dropEffect = "copy";
      } else {
        e.dataTransfer!.dropEffect = "none";
        dragCounter.current = 0;
        setIsDragging(false);
      }
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      const dropped = e.dataTransfer?.files?.[0];
      if (dropped && isAudioFile(dropped)) {
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
      <AboutSection />
      <DemoSection file={file} setFile={setFile} />
      <TimelineSection />
      <FAQSection />
    </div>
  );
}
