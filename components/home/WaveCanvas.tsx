"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { color: "rgba(34,211,238,0.75)",  speed: 0.28, amp: 52, freq: 0.0055, yFrac: 0.42, width: 2.0 },
  { color: "rgba(34,211,238,0.35)",  speed: 0.18, amp: 38, freq: 0.0040, yFrac: 0.50, width: 1.3 },
  { color: "rgba(34,211,238,0.18)",  speed: 0.22, amp: 28, freq: 0.0070, yFrac: 0.56, width: 0.9 },
  { color: "rgba(99,102,241,0.60)",  speed: 0.34, amp: 58, freq: 0.0062, yFrac: 0.48, width: 1.7 },
  { color: "rgba(99,102,241,0.28)",  speed: 0.20, amp: 35, freq: 0.0048, yFrac: 0.58, width: 1.1 },
  { color: "rgba(59,130,246,0.55)",  speed: 0.30, amp: 46, freq: 0.0050, yFrac: 0.54, width: 1.5 },
  { color: "rgba(59,130,246,0.22)",  speed: 0.16, amp: 26, freq: 0.0075, yFrac: 0.62, width: 0.8 },
  { color: "rgba(20,184,166,0.45)",  speed: 0.38, amp: 40, freq: 0.0058, yFrac: 0.44, width: 1.3 },
  { color: "rgba(20,184,166,0.18)",  speed: 0.14, amp: 22, freq: 0.0085, yFrac: 0.60, width: 0.7 },
  { color: "rgba(139,92,246,0.22)",  speed: 0.25, amp: 30, freq: 0.0032, yFrac: 0.66, width: 0.8 },
];

function generateWaveformData(count: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const v =
      Math.sin(t * Math.PI * 18) * 0.55 +
      Math.sin(t * Math.PI * 37 + 1.2) * 0.28 +
      Math.sin(t * Math.PI * 73 + 0.5) * 0.12 +
      Math.sin(t * Math.PI * 5)  * 0.35 +
      (Math.random() - 0.5)      * 0.08;
    data.push(Math.max(-1, Math.min(1, v)));
  }
  return data;
}

const WAVEFORM_DATA = generateWaveformData(512);

// Pre-computed per-bar scanned colour — avoids 3× Math.round() × 512 per frame during scan phase
const BAR_COLORS = WAVEFORM_DATA.map((_, i) => {
  const ratio = i / WAVEFORM_DATA.length;
  const r = Math.round(34  + (99  - 34)  * ratio);
  const g = Math.round(211 + (102 - 211) * ratio);
  const b = Math.round(238 + (241 - 238) * ratio);
  return `rgba(${r},${g},${b},0.85)`;
});

export function WaveCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const visibleRef   = useRef<boolean>(true);
  // Cached canvas logical dimensions — updated by resize, read by animate to avoid layout reflow
  const wRef         = useRef<number>(0);
  const hRef         = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let waveT    = 0;
    let scanLoop = 0;
    const startTime = performance.now();

    // Fully stop RAF when hero scrolled out, restart when back in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visibleRef.current;
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const applyResize = () => {
      const dpr = window.devicePixelRatio || 1;
      wRef.current  = canvas.offsetWidth;
      hRef.current  = canvas.offsetHeight;
      canvas.width  = wRef.current  * dpr;
      canvas.height = hRef.current  * dpr;
      ctx.scale(dpr, dpr);
    };
    const resize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 100);
    };
    applyResize();
    window.addEventListener("resize", resize);

    const drawWaves = (W: number, H: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      WAVES.forEach((wave) => {
        const yBase = H * wave.yFrac;
        const steps = Math.ceil(W / 3);
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth   = wave.width;
        ctx.lineJoin    = "round";
        ctx.lineCap     = "round";
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * W;
          const y =
            yBase +
            Math.sin(x * wave.freq + waveT * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 0.6 + waveT * wave.speed * 0.7 + 1.3) * wave.amp * 0.35;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.restore();
    };

    const drawScan = (W: number, H: number, scanProgress: number, alpha: number) => {
      const cx  = W * 0.5;
      const cy  = H * 0.5;
      const wW  = W * 0.72;
      const wH  = H * 0.20;
      const x0  = cx - wW / 2;
      const count    = WAVEFORM_DATA.length;
      const barW     = wW / count;
      const scannedX = x0 + wW * Math.min(scanProgress + 0.02, 1.04);

      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.font      = "600 11px 'SF Mono','Fira Code',monospace";
      ctx.fillStyle = "rgba(34,211,238,0.55)";
      ctx.fillText("ANALYZING AUDIO SAMPLE", x0, cy - wH - 32);

      for (let i = 0; i < count; i++) {
        const bx      = x0 + i * barW;
        const barH    = Math.abs(WAVEFORM_DATA[i]) * wH;
        const scanned = bx < scannedX;
        const atScan  = Math.abs(bx - scannedX) < wW * 0.022;
        if (atScan) {
          ctx.fillStyle = "rgba(255,255,255,0.95)";
        } else if (scanned) {
          ctx.fillStyle = BAR_COLORS[i];
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.10)";
        }
        ctx.fillRect(bx, cy - barH, Math.max(1, barW - 0.5), barH);
        ctx.fillRect(bx, cy,        Math.max(1, barW - 0.5), barH);
      }

      if (scanProgress < 0.98) {
        const lx   = scannedX;
        if (Math.abs(lx - cachedGradLx) > 1 || !cachedGrad) {
          cachedGrad = ctx.createLinearGradient(lx - 20, 0, lx + 4, 0);
          cachedGrad.addColorStop(0,   "rgba(34,211,238,0)");
          cachedGrad.addColorStop(0.6, "rgba(34,211,238,0.15)");
          cachedGrad.addColorStop(1,   "rgba(255,255,255,0.92)");
          cachedGradLx = lx;
        }
        ctx.fillStyle = cachedGrad;
        ctx.fillRect(lx - 20, cy - wH - 12, 24, wH * 2 + 24);
        [cy - wH - 12, cy + wH + 12].forEach((dy) => {
          ctx.beginPath();
          ctx.arc(lx, dy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.fill();
        });
      }

      if (scanProgress >= 1) {
        const resultAlpha = Math.min(1, (scanProgress - 1) * 5);
        const isReal  = scanLoop % 2 === 0;
        const label   = isReal ? "✓  BONAFIDE — Real Voice" : "✕  SPOOFED — Deepfake Detected";
        ctx.globalAlpha = alpha * resultAlpha;
        ctx.font        = "700 15px 'SF Mono','Fira Code',monospace";
        ctx.fillStyle   = isReal ? "rgba(52,211,153,1)" : "rgba(248,113,113,1)";
        const tw = ctx.measureText(label).width;
        ctx.fillText(label, cx - tw / 2, cy + wH + 48);
        const confW = 220; const confX = cx - confW / 2; const confY = cy + wH + 62;
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.beginPath(); ctx.roundRect(confX, confY, confW, 4, 2); ctx.fill();
        ctx.fillStyle = isReal ? "rgba(52,211,153,0.85)" : "rgba(248,113,113,0.85)";
        ctx.beginPath(); ctx.roundRect(confX, confY, confW * (isReal ? 0.941 : 0.873), 4, 2); ctx.fill();
        ctx.globalAlpha = alpha * resultAlpha * 0.55;
        ctx.font = "500 11px 'SF Mono','Fira Code',monospace";
        ctx.fillStyle = "rgba(148,163,184,1)";
        const confLabel = isReal ? "Confidence: 94.1%" : "Confidence: 87.3%";
        const cw = ctx.measureText(confLabel).width;
        ctx.fillText(confLabel, cx - cw / 2, confY + 18);
      }

      ctx.globalAlpha = alpha * 0.18;
      ctx.strokeStyle = "rgba(34,211,238,1)";
      ctx.lineWidth   = 0.5;
      ctx.setLineDash([4, 6]);
      ctx.strokeRect(x0 - 10, cy - wH - 18, wW + 20, wH * 2 + 36);
      ctx.setLineDash([]);
      ctx.restore();
    };

    const WAVE_DUR = 4000; const FADE_DUR = 1000; const SCAN_DUR = 3400;
    const HOLD_DUR = 2200; const BACK_DUR = 1000;
    const CYCLE = WAVE_DUR + FADE_DUR + SCAN_DUR + HOLD_DUR + BACK_DUR;

    // Gradient cache — recreate only when scan-line moves more than 1px
    let cachedGradLx = -9999;
    let cachedGrad: CanvasGradient | null = null;

    const animate = (now: number) => {
      if (!visibleRef.current) {
        rafRef.current = 0; // signal: loop stopped, observer will restart
        return;
      }
      // Use cached dimensions — updated by resize handler, no layout reflow
      const W = wRef.current;
      const H = hRef.current;
      ctx.clearRect(0, 0, W, H);
      const elapsed   = now - startTime;
      const cycleTime = elapsed % CYCLE;
      const loopCount = Math.floor(elapsed / CYCLE);
      if (loopCount > scanLoop) scanLoop = loopCount;

      if (cycleTime < WAVE_DUR) {
        drawWaves(W, H, 1);
      } else if (cycleTime < WAVE_DUR + FADE_DUR) {
        const p = (cycleTime - WAVE_DUR) / FADE_DUR;
        drawWaves(W, H, 1 - p); drawScan(W, H, 0, p);
      } else if (cycleTime < WAVE_DUR + FADE_DUR + SCAN_DUR) {
        drawScan(W, H, (cycleTime - WAVE_DUR - FADE_DUR) / SCAN_DUR, 1);
      } else if (cycleTime < WAVE_DUR + FADE_DUR + SCAN_DUR + HOLD_DUR) {
        drawScan(W, H, 1 + (cycleTime - WAVE_DUR - FADE_DUR - SCAN_DUR) / HOLD_DUR, 1);
      } else {
        const p = (cycleTime - WAVE_DUR - FADE_DUR - SCAN_DUR - HOLD_DUR) / BACK_DUR;
        drawScan(W, H, 2, 1 - p); drawWaves(W, H, p);
      }

      waveT += 0.016;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (resizeTimer) clearTimeout(resizeTimer);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1, willChange: "transform" }} />;
}
