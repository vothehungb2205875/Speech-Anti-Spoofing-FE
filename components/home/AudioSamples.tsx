"use client";

import { useState, useRef } from "react";

interface AudioSample {
  id: number;
  title: string;
  src: string;
}

const audioSamples: AudioSample[] = [
  { id: 1, title: "Sample 1", src: "/audio/test_audio.mp3" },
  { id: 2, title: "Sample 2", src: "/audio/test_audio copy.mp3" },
  { id: 3, title: "Sample 3", src: "/audio/test_audio copy 2.mp3" },
];

export function AudioSamples() {
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<{ [key: number]: number }>({});
  const [duration, setDuration] = useState<{ [key: number]: number }>({});

  const handlePlay = (id: number) => {
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
  };

  const handleTimeUpdate = (id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      setCurrentTime((prev) => ({ ...prev, [id]: audio.currentTime }));
    }
  };

  const handleLoadedMetadata = (id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      setDuration((prev) => ({ ...prev, [id]: audio.duration }));
    }
  };

  const handleEnded = (id: number) => {
    setIsPlaying(null);
    setCurrentTime((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleProgressClick = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRefs.current[id];
    if (audio) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * (duration[id] || 0);
    }
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style>{`
        .audio-samples-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .audio-samples-container::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .audio-samples-container::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 4px;
        }
        .audio-samples-container::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
      <div className="audio-samples-container">
        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Deepfake Audio Samples
        </h4>

        <div className="space-y-3">
          {audioSamples.map((sample) => (
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
                    {sample.title}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                    {formatTime(currentTime[sample.id] || 0)} / {formatTime(duration[sample.id] || 0)}
                  </span>
                </div>

                <div
                  onClick={(e) => handleProgressClick(sample.id, e)}
                  className="w-full h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden hover:h-3 transition-all"
                >
                  <div
                    className="h-full bg-black transition-all duration-100"
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

        {audioSamples.map((sample) => (
          <audio
            key={sample.id}
            ref={(el) => {
              if (el) audioRefs.current[sample.id] = el;
            }}
            src={sample.src}
            onTimeUpdate={() => handleTimeUpdate(sample.id)}
            onLoadedMetadata={() => handleLoadedMetadata(sample.id)}
            onEnded={() => handleEnded(sample.id)}
          />
        ))}
      </div>
    </>
  );
}
