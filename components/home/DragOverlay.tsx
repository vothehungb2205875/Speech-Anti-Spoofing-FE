export function DragOverlay({ isDragging }: { isDragging: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999,
        opacity: isDragging ? 1 : 0,
        background: "rgba(2,8,23,0.78)",
        backdropFilter: isDragging ? "blur(6px)" : "none",
        transition: "opacity 200ms ease, backdrop-filter 200ms ease",
      }}
    >
      <div
        className="absolute inset-6 rounded-3xl flex flex-col items-center justify-center gap-5"
        style={{
          border: "2px dashed rgba(34,211,238,0.65)",
          boxShadow: "0 0 60px rgba(34,211,238,0.12), inset 0 0 60px rgba(34,211,238,0.04)",
          transform: isDragging ? "scale(1)" : "scale(0.96)",
          transition: "transform 200ms ease",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(34,211,238,0.1)",
            border: "1.5px solid rgba(34,211,238,0.4)",
            boxShadow: "0 0 24px rgba(34,211,238,0.2)",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v10M12 3L8.5 6.5M12 3l3.5 3.5" stroke="rgba(34,211,238,0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="rgba(34,211,238,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M8 13.5c0-1.2.6-2.4 2-3" stroke="rgba(99,102,241,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 13.5c0-1.2-.6-2.4-2-3" stroke="rgba(99,102,241,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5.5 15c0-2.2 1.5-5 4-6" stroke="rgba(59,130,246,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M18.5 15c0-2.2-1.5-5-4-6" stroke="rgba(59,130,246,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="text-center">
          <p className="text-white font-semibold text-xl tracking-wide mb-1">
            Drop audio file anywhere
          </p>
          <p className="text-slate-400 text-sm">MP3 · WAV · FLAC · M4A · OGG</p>
        </div>
      </div>
    </div>
  );
}
