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

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let waveT    = 0;
    let scanLoop = 0;
    const startTime = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawWaves = (alpha: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.save();
      ctx.globalAlpha = alpha;
      WAVES.forEach((wave) => {
        const yBase = H * wave.yFrac;
        const steps = Math.ceil(W / 2);
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

    const drawScan = (scanProgress: number, alpha: number) => {
      const W   = canvas.offsetWidth;
      const H   = canvas.offsetHeight;
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
          const ratio = i / count;
          const r = Math.round(34  + (99  - 34)  * ratio);
          const g = Math.round(211 + (102 - 211) * ratio);
          const b = Math.round(238 + (241 - 238) * ratio);
          ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.10)";
        }
        ctx.fillRect(bx, cy - barH, Math.max(1, barW - 0.5), barH);
        ctx.fillRect(bx, cy,        Math.max(1, barW - 0.5), barH);
      }

      if (scanProgress < 0.98) {
        const lx   = scannedX;
        const grad = ctx.createLinearGradient(lx - 20, 0, lx + 4, 0);
        grad.addColorStop(0,   "rgba(34,211,238,0)");
        grad.addColorStop(0.6, "rgba(34,211,238,0.15)");
        grad.addColorStop(1,   "rgba(255,255,255,0.92)");
        ctx.fillStyle = grad;
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

    const animate = (now: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const elapsed   = now - startTime;
      const cycleTime = elapsed % CYCLE;
      const loopCount = Math.floor(elapsed / CYCLE);
      if (loopCount > scanLoop) scanLoop = loopCount;

      if (cycleTime < WAVE_DUR) {
        drawWaves(1);
      } else if (cycleTime < WAVE_DUR + FADE_DUR) {
        const p = (cycleTime - WAVE_DUR) / FADE_DUR;
        drawWaves(1 - p); drawScan(0, p);
      } else if (cycleTime < WAVE_DUR + FADE_DUR + SCAN_DUR) {
        drawScan((cycleTime - WAVE_DUR - FADE_DUR) / SCAN_DUR, 1);
      } else if (cycleTime < WAVE_DUR + FADE_DUR + SCAN_DUR + HOLD_DUR) {
        drawScan(1 + (cycleTime - WAVE_DUR - FADE_DUR - SCAN_DUR) / HOLD_DUR, 1);
      } else {
        const p = (cycleTime - WAVE_DUR - FADE_DUR - SCAN_DUR - HOLD_DUR) / BACK_DUR;
        drawScan(2, 1 - p); drawWaves(p);
      }

      waveT += 0.016;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}
