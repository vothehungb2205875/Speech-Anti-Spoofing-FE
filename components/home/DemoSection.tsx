"use client";

import { useState, useEffect, useRef } from "react";
import { useIntersectionAnimation } from "@/hooks/useIntersectionAnimation";
import axios from "axios";
import { HelpCircle } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

interface DemoSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

interface TooltipPosition {
  top: number;
  left: number;
}

const Tooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 40,
        left: rect.left + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <span
      ref={triggerRef}
      className="inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-cyan-600 transition-colors cursor-help" />

      {isVisible && (
        <span
          className="fixed px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-100 transition-opacity z-50 pointer-events-none"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: "translateX(-50%)",
            display: "inline-block",
          }}
        >
          {text}
          <span
            className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"
            style={{
              left: "50%",
              display: "block",
            }}
          ></span>
        </span>
      )}
    </span>
  );
};

export function DemoSection({ file, setFile }: DemoSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionAnimation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingValid, setIsDraggingValid] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const VALID_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/flac", "audio/mp4", "audio/ogg", "audio/webm"];
  const VALID_EXTENSIONS = [".mp3", ".wav", ".flac", ".m4a", ".ogg"];

  useEffect(() => {
    setResult(null);
  }, [file]);

  const validateFile = (selectedFile: File): boolean => {
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExtension = VALID_EXTENSIONS.some(ext => fileName.endsWith(ext));
    const hasValidType = VALID_AUDIO_TYPES.includes(selectedFile.type);

    if (!hasValidExtension && !hasValidType) {
      setError("Invalid file format. Please use MP3, WAV, FLAC, M4A, or OGG");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setError(`File too large. Maximum size is 5MB (your file: ${sizeMB}MB)`);
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setResult(null);
      } else {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setResult(null);
      } else {
        setFile(null);
      }
    }
    setIsDragging(false);
  };

  const handleSectionDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    // Check if files are being dragged
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingValid(true);
      e.dataTransfer.dropEffect = 'copy';
    } else {
      setIsDraggingValid(false);
      e.dataTransfer.dropEffect = 'none';
    }
  };

  const handleSectionDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
      setIsDraggingValid(true);
    }
  };

  const handleSectionDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDraggingValid(true);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setResult(null);
      } else {
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    
    if (!validateFile(file)) {
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("audio_file", file);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/`, formData);
      //const res = await axios.post(`http://localhost:8000/`, formData);
      setResult(res.data);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 429) {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Detection failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isReal = result?.predicted_label === "bonafide";

  return (
    <section 
      id="demo" 
      className="py-16 md:py-24 bg-white relative"
      onDragOver={handleSectionDragOver}
      onDragLeave={handleSectionDragLeave}
      onDrop={handleSectionDrop}
    >
      {/* Global cursor overlay during drag */}
      {isDragging && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none"
          style={{ cursor: isDraggingValid ? "copy" : "not-allowed" }}
        />
      )}
      
      {isDragging && isDraggingValid && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <svg className="w-16 h-16 text-cyan-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <p className="text-lg font-semibold text-gray-800">Drop your audio file here</p>
            <p className="text-sm text-gray-500 mt-1">MP3 · WAV · FLAC · M4A · OGG</p>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        <div>
          <h3 ref={titleRef} className={`text-4xl md:text-5xl font-bold mb-6 text-cyan-600 ${titleVisible ? "animate-fade-in-up" : "opacity-0"}`}>Free Deepfake Voice Detection</h3>
          <p className="text-gray-600 mb-6">
            Test our detection engine at no cost - Free trial available until May 31, 2026.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer flex flex-col items-center gap-2 bg-white transition-colors"
              style={{ borderColor: file ? "#22c55e" : "#d1d5db" }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {file ? (
                <>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <rect x="0"  y="10" width="3" height="4"  rx="1.5" fill="#22c55e"/>
                    <rect x="5"  y="6"  width="3" height="12" rx="1.5" fill="#22c55e"/>
                    <rect x="10" y="2"  width="3" height="20" rx="1.5" fill="#22c55e"/>
                    <rect x="15" y="5"  width="3" height="14" rx="1.5" fill="#22c55e"/>
                    <rect x="20" y="0"  width="3" height="24" rx="1.5" fill="#22c55e"/>
                    <rect x="25" y="4"  width="3" height="16" rx="1.5" fill="#22c55e"/>
                    <rect x="30" y="7"  width="3" height="10" rx="1.5" fill="#22c55e"/>
                    <rect x="35" y="9"  width="3" height="6"  rx="1.5" fill="#22c55e"/>
                  </svg>
                  <span className="text-sm font-semibold text-green-600 text-center break-all">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    {file.size > 1024 * 1024 
                      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                      : `${(file.size / 1024).toFixed(1)} KB`} 
                    · Click to change
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl text-gray-300">🎙</span>
                  <span className="text-sm text-gray-500 text-center">
                    <span className="font-semibold text-gray-700">Click to select</span> or drag & drop anywhere on the page
                  </span>
                  <span className="text-xs text-gray-400">MP3 · WAV · FLAC · M4A · OGG</span>
                </>
              )}
            </label>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="py-3.5 bg-black hover:bg-gray-800 cursor-pointer text-white rounded-xl font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Analyzing...
                </>
              ) : "Run Detection"}
            </button>
          </form>

          <div className="mt-4 rounded-xl border overflow-hidden transition-all duration-300"
            style={{ minHeight: 140, background: result ? "white" : "#f9fafb", borderColor: result ? (isReal ? "#bbf7d0" : "#fecaca") : "#e5e7eb" }}
          >
            {result ? (
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: isReal ? "#dcfce7" : "#fee2e2" }}
                  >
                    <span className="text-lg">{isReal ? "✓" : "✕"}</span>
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: isReal ? "#16a34a" : "#dc2626" }}>
                      {isReal ? "Real Voice — Bonafide" : "Deepfake Detected — Spoofed"}
                      <span className="ml-2">
                        <Tooltip 
                          text={isReal 
                            ? "This audio is genuine human speech, not artificially synthesized" 
                            : "This audio is identified as synthetically generated or manipulated using AI"
                          } 
                        />
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-xs">{result.filename}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 font-medium">Bonafide (Real)</span>
                        <Tooltip text="Probability that this is real, authentic human speech" />
                      </div>
                      <span className="font-semibold text-gray-700">{(result.bonafide_prob * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${result.bonafide_prob * 100}%`, background: "#22c55e" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 font-medium">Spoof (Fake)</span>
                        <Tooltip text="Probability that this is spoofed, synthetic, or AI-generated audio" />
                      </div>
                      <span className="font-semibold text-gray-700">{(result.spoof_prob * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${result.spoof_prob * 100}%`, background: "#ef4444" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2 py-10 text-gray-300">
                <svg width="32" height="20" viewBox="0 0 40 24" fill="none">
                  <rect x="0"  y="10" width="3" height="4"  rx="1.5" fill="#d1d5db"/>
                  <rect x="5"  y="6"  width="3" height="12" rx="1.5" fill="#d1d5db"/>
                  <rect x="10" y="2"  width="3" height="20" rx="1.5" fill="#d1d5db"/>
                  <rect x="15" y="5"  width="3" height="14" rx="1.5" fill="#d1d5db"/>
                  <rect x="20" y="0"  width="3" height="24" rx="1.5" fill="#d1d5db"/>
                  <rect x="25" y="4"  width="3" height="16" rx="1.5" fill="#d1d5db"/>
                  <rect x="30" y="7"  width="3" height="10" rx="1.5" fill="#d1d5db"/>
                  <rect x="35" y="9"  width="3" height="6"  rx="1.5" fill="#d1d5db"/>
                </svg>
                <span className="text-sm">Detection result will appear here</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-80">
          <VideoPlayer />
        </div>
      </div>
    </section>
  );
}
