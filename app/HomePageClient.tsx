"use client";

import { useState, useEffect } from "react";
import { DragOverlay } from "@/components/home/DragOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { DemoSection } from "@/components/home/DemoSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { FAQSection } from "@/components/home/FAQSection";

const AUDIO_MIME_TYPES = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/flac",
  "audio/m4a",
  "audio/aac",
  "audio/webm",
]);

const AUDIO_EXTENSIONS = [
  ".mp3",
  ".wav",
  ".ogg",
  ".flac",
  ".m4a",
  ".aac",
  ".webm",
  ".aiff",
  ".wma",
];

const isAudioFile = (file: File): boolean => {
  if (AUDIO_MIME_TYPES.has(file.type)) return true;
  if (file.type.startsWith("audio/")) return true;
  const fileName = file.name.toLowerCase();
  return AUDIO_EXTENSIONS.some((ext) => fileName.endsWith(ext));
};

const hasAudioFiles = (dataTransfer: DataTransfer | null): boolean => {
  if (!dataTransfer?.items) return false;
  for (let i = 0; i < dataTransfer.items.length; i++) {
    if (dataTransfer.items[i].kind === "file") {
      const file = dataTransfer.items[i].getAsFile();
      if (file && isAudioFile(file)) return true;
    }
  }
  return false;
};

export function HomePageClient() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (hasAudioFiles(e.dataTransfer)) {
        e.dataTransfer!.dropEffect = "copy";
        setIsDragging(true);
      }
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // relatedTarget is null only when the cursor leaves the browser window
      if (e.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (hasAudioFiles(e.dataTransfer)) {
        e.dataTransfer!.dropEffect = "copy";
      }
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer?.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === "file") {
            const droppedFile = e.dataTransfer.items[i].getAsFile();
            if (droppedFile && isAudioFile(droppedFile)) {
              setFile(droppedFile);
              return;
            }
          }
        }
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
    <>
      <DragOverlay isDragging={isDragging} />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <DemoSection file={file} setFile={setFile} />
      <TimelineSection />
      <FAQSection />
    </>
  );
}
