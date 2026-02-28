"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface AudioSample {
  id: number;
  label: string;
  src: string;
}

interface AudioTab {
  id: number;
  title: string;
  description: string;
  samples: AudioSample[];
}

const audioTabs: AudioTab[] = [
  {
    id: 1,
    title: "Modern Voice Synthesis Technology",
    description: "Modern speech synthesis systems can recreate a person's voice to read new content",
    samples: [
      { id: 1, label: "Target Voice (Training Data)", src: "/audio/Sample_1.1.wav" },
      { id: 2, label: "Synthesized Voice (Generated)", src: "/audio/Sample_1.2.wav" },
    ],
  },
  {
    id: 2,
    title: "Voice Conversion: Speech A → Speech B",
    description: "Transform the speaker's voice while keeping the original content unchanged",
    samples: [
      { id: 3, label: "Voice A (Original)", src: "/audio/Sample_2.1.wav" },
      { id: 4, label: "Voice B (Target)", src: "/audio/Sample_2.2.wav" },
      { id: 5, label: "Voice B Speaking Content A", src: "/audio/Sample_2.3.wav" },
    ],
  },
  {
    id: 3,
    title: "Voice Continuation",
    description: "Speech completion with the speaker's exact voice and style",
    samples: [
      { id: 6, label: "Complete Original Audio", src: "/audio/Sample_3.1.wav" },
      { id: 7, label: "Short Excerpt (Model Input)", src: "/audio/Sample_3.2.wav" },
      { id: 8, label: "Generated Continuation", src: "/audio/Sample_3.3.wav" },
    ],
  },
];

export function AudioSamples() {
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const progressRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const endedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<{ [key: number]: number }>({});
  const [duration, setDuration] = useState<{ [key: number]: number }>({});
  const [isDragging, setIsDragging] = useState<number | null>(null);

  // Cleanup setTimeout on unmount
  useEffect(() => () => { if (endedTimerRef.current) clearTimeout(endedTimerRef.current); }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === null) return;
      
      const progressBar = progressRefs.current[isDragging];
      const audio = audioRefs.current[isDragging];
      
      if (progressBar && audio) {
        const rect = progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = percent * (duration[isDragging] || 0);
        setCurrentTime((prev) => ({ ...prev, [isDragging]: audio.currentTime }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, duration]);

  const handlePlay = useCallback((id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      if (isPlaying === id) {
        audio.pause();
        setIsPlaying(null);
      } else {
        // Pause all other audios
        Object.values(audioRefs.current).forEach((a) => a?.pause());
        audio.play();
        setIsPlaying(id);
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback((id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      setCurrentTime((prev) => ({ ...prev, [id]: audio.currentTime }));
    }
  }, []);

  const handleLoadedMetadata = useCallback((id: number) => {
    const audio = audioRefs.current[id];
    if (audio && isFinite(audio.duration) && audio.duration > 0) {
      setDuration((prev) => ({ ...prev, [id]: audio.duration }));
    }
  }, []);

  const handleEnded = useCallback((id: number) => {
    setIsPlaying(null);
    setCurrentTime((prev) => ({ ...prev, [id]: duration[id] || 0 }));
    if (endedTimerRef.current) clearTimeout(endedTimerRef.current);
    endedTimerRef.current = setTimeout(() => {
      setCurrentTime((prev) => ({ ...prev, [id]: 0 }));
    }, 500);
  }, [duration]);

  const handleProgressClick = useCallback((id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRefs.current[id];
    if (audio) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = percent * (duration[id] || 0);
      setCurrentTime((prev) => ({ ...prev, [id]: audio.currentTime }));
    }
  }, [duration]);

  const handleProgressMouseDown = useCallback((id: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(id);
    handleProgressClick(id, e);
  }, [handleProgressClick]);

  const formatTime = useCallback((time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return (
    <>
      <div className="audio-samples-container">
        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Deepfake Audio Samples
        </h4>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {audioTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm md:text-base font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-black border-b-black"
                  : "text-gray-500 border-b-transparent hover:text-gray-700"
              }`}
            >
              {`Example ${tab.id}`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {audioTabs.map((tab) => (
          activeTab === tab.id && (
            <div key={tab.id} className="space-y-4">
              <div>
                <h5 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {tab.title}
                </h5>
                <p className="text-sm text-gray-600 mb-4">
                  {tab.description}
                </p>
              </div>

              <div className="space-y-3">
                {tab.samples.map((sample) => (
                  <div
                    key={sample.id}
                    className="bg-white rounded-xl p-4 md:p-5 border border-gray-200 hover:border-cyan-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handlePlay(sample.id)}
                        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {isPlaying === sample.id ? (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zm5.5 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 0012.75 3h-1.5z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-sm md:text-base font-medium text-gray-700">
                            {sample.label}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                            {formatTime(currentTime[sample.id] || 0)} / {formatTime(duration[sample.id] || 0)}
                          </span>
                        </div>

                        <div
                          ref={(el) => {
                            if (el) progressRefs.current[sample.id] = el;
                          }}
                          onMouseDown={(e) => handleProgressMouseDown(sample.id, e)}
                          onClick={(e) => handleProgressClick(sample.id, e)}
                          className={`w-full h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden transition-all ${
                            isDragging === sample.id ? "h-3" : "hover:h-3"
                          }`}
                        >
                          <div
                            className="h-full bg-black"
                            style={{
                              width: duration[sample.id] ? `${((currentTime[sample.id] || 0) / duration[sample.id]) * 100}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Audio Elements */}
        {audioTabs.map((tab) =>
          tab.samples.map((sample) => (
            <audio
              key={sample.id}
              ref={(el) => {
                if (!el) return;
                audioRefs.current[sample.id] = el;
                // If metadata already loaded (e.g. from browser cache), read duration immediately
                if (el.readyState >= 1 && isFinite(el.duration) && el.duration > 0) {
                  setDuration((prev) =>
                    prev[sample.id] === el.duration ? prev : { ...prev, [sample.id]: el.duration }
                  );
                }
              }}
              src={sample.src}
              preload="metadata"
              onLoadedMetadata={() => handleLoadedMetadata(sample.id)}
              onDurationChange={() => handleLoadedMetadata(sample.id)}
              onTimeUpdate={() => handleTimeUpdate(sample.id)}
              onEnded={() => handleEnded(sample.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
