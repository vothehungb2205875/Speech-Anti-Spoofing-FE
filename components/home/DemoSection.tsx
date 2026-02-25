"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface DemoSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export function DemoSection({ file, setFile }: DemoSectionProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    setResult(null);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio_file", file);
    try {
      const res = await axios.post("http://localhost:8000", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isReal = result?.predicted_label === "bonafide";

  return (
    <section id="demo" className="py-20 bg-[#f4f4f4]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        <div>
          <h3 className="text-3xl font-bold mb-6">Free Deepfake Voice Detection</h3>
          <p className="text-gray-600 mb-6">
            Test our detection engine at no cost - Free trial available until May 31, 2026.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer flex flex-col items-center gap-2 bg-white transition-colors"
              style={{ borderColor: file ? "#22c55e" : "#d1d5db" }}
            >
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => { setFile(e.target.files?.[0] || null); setResult(null); }}
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
                  <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB · Click to change</span>
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

            <button
              type="submit"
              disabled={!file || loading}
              className="py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-xs">{result.filename}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 font-medium">Bonafide (Real)</span>
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
                      <span className="text-gray-500 font-medium">Spoof (Fake)</span>
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
        <div className="bg-white rounded-2xl shadow-lg h-80 flex items-center justify-center text-gray-400">
          Video Demo Placeholder
        </div>
      </div>
    </section>
  );
}
