"use client";

import { useState, useEffect } from "react";

const DOMO_STATS = [
  { stat: "16,000",    unit: "videos/min",    label: "TikTok users upload videos",              logo: "/icons/tiktok-icon-light.svg",       color: "#010101" },
  { stat: "362,962",   unit: "hours/min",     label: "Netflix subscribers streamed content",    logo: "/icons/netflix-icon.svg",            color: "#E50914" },
  { stat: "5.9M",      unit: "searches/min",  label: "People perform Google searches",          logo: "/icons/google.svg",                  color: "#4285F4" },
  { stat: "1,041,666", unit: "answers/min",   label: "Siri answers questions",                  logo: "/icons/apple.svg",                   color: "#555555" },
  { stat: "18.8M",     unit: "texts/min",     label: "Text messages sent worldwide",            logo: "/icons/IMessage_logo.svg",           color: "#34C759" },
  { stat: "8,574",     unit: "visitors/min",  label: "Google AI's Gemini receives visitors",    logo: "/icons/gemini.svg",                  color: "#8E75B2" },
  { stat: "852",       unit: "stays/min",     label: "Travelers book Airbnb stays",             logo: "/icons/airbnb.svg",                  color: "#FF5A5F" },
  { stat: "3,472,222", unit: "views/min",     label: "YouTube video views recorded",            logo: "/icons/youtube.svg",                 color: "#FF0000" },
  { stat: "4,080",     unit: "records/min",   label: "Records compromised in data breaches",    logo: "/icons/hack-the-box.svg",            color: "#ef4444" },
  { stat: "138.9M",    unit: "reels/min",     label: "Reels played on Facebook + Instagram",    logo: "/icons/instagram-icon.svg",          color: "#E1306C" },
  { stat: "1,563",     unit: "hours/min",     label: "Fortnite users watch live streams",       logo: "/icons/epicgames-icon-light.svg",    color: "#313131" },
  { stat: "251.1M",    unit: "emails/min",    label: "Emails sent around the world",            logo: "/icons/gmail.svg",                   color: "#EA4335" },
  { stat: "1.04M",     unit: "messages/min",  label: "Messages sent on Slack",                  logo: "/icons/slack.svg",                   color: "#4A154B" },
  { stat: "9,000",     unit: "members/min",   label: "Members apply for jobs on LinkedIn",      logo: "/icons/linkedin.svg",                color: "#0A66C2" },
  { stat: "$126,763",  unit: "orders/min",    label: "DoorDash diners place in orders",         logo: "/icons/doordash.svg",                color: "#FF3008" },
  { stat: "1.15B",     unit: "steps/min",     label: "Americans take steps tracked digitally",  logo: "/icons/apple.svg",                   color: "#10b981" },
  { stat: "288",       unit: "downloads/min", label: "People download Zoom",                    logo: "/icons/zoom.svg",                    color: "#2D8CFF" },
  { stat: "$43.6M",    unit: "spent/min",     label: "Cyber Week shoppers spend globally",      logo: "/icons/shopify.svg",                 color: "#96BF48" },
  { stat: "3.3M",      unit: "snaps/min",     label: "Snapchat users send Snaps",               logo: "/icons/snapchat.svg",                color: "#cccc00" },
  { stat: "229M",      unit: "minutes/day",   label: "Meeting minutes recorded on MSFT Teams",  logo: "/icons/microsoft-teams.svg",         color: "#6264A7" },
];

export function StatsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const total = DOMO_STATS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 2800);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (idx: number) => setCurrent((idx + total) % total);
  const getCard = (offset: number) => DOMO_STATS[(current + offset + total) % total];

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex gap-4 items-center justify-center overflow-hidden px-12 py-4">
        {[-1, 0, 1].map((offset) => {
          const item = getCard(offset);
          const isCenter = offset === 0;
          return (
            <div
              key={`${current}-${offset}`}
              onClick={() => offset !== 0 && go(current + offset)}
              className="transition-all duration-500 rounded-2xl flex-shrink-0 cursor-pointer flex flex-col"
              style={{
                width:   isCenter ? 280 : 220,
                height:  168,
                opacity: isCenter ? 1 : 0.45,
                transform: isCenter ? "scale(1)" : "scale(0.88)",
                background: isCenter ? `${item.color}12` : "#f9fafb",
                border: `1.5px solid ${isCenter ? item.color + "40" : "#e5e7eb"}`,
                padding: isCenter ? "22px 24px" : "18px 18px",
                pointerEvents: offset !== 0 ? "auto" : "none",
                overflow: "hidden",
              }}
            >
              <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: isCenter ? `${item.color}18` : "#f3f4f6" }}>
                  <img
                    src={item.logo}
                    alt=""
                    className="w-4 h-4 object-contain"
                    style={{ opacity: isCenter ? 1 : 0.4 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <span className="font-extrabold tracking-tight leading-none"
                    style={{ fontSize: isCenter ? 26 : 20, color: isCenter ? item.color : "#9ca3af" }}>
                    {item.stat}
                  </span>
                  <span className="ml-1.5 text-xs font-semibold"
                    style={{ color: isCenter ? item.color + "99" : "#d1d5db" }}>
                    {item.unit}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-snug flex-1 overflow-hidden"
                style={{
                  color: isCenter ? "#374151" : "#9ca3af",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}>
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <button onClick={() => go(current - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={() => go(current + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="flex justify-center gap-1.5 mt-5">
        {DOMO_STATS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === current ? 20 : 6,
              height: 6,
              background: i === current ? "#06b6d4" : "#d1d5db",
            }}
          />
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        {current + 1} / {total} · Source: DOMO Data Never Sleeps 12
      </p>
    </div>
  );
}
