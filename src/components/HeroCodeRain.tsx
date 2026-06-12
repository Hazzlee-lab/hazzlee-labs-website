"use client";

import { useEffect, useRef } from "react";

const GLYPHS = [
  "0",
  "1",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  ";",
  ":",
  "<",
  ">",
  "=>",
  "//",
  "=>>",
  "&&",
  "||",
  "!=",
  "==",
  "++",
  "--",
  "fn",
  "if",
  "{}",
  "**",
  "/*",
  "*/",
  "0x",
  "01",
  "10",
  "11",
  "00",
  "λ",
  "∑",
  "∂",
  "∅",
  "∞",
  "≡",
  "∈",
  "⊕",
  "var",
  "let",
  "int",
  "def",
  "try",
  "for",
  "new",
  "git",
  "_.",
  "...",
  "$(",
  ")=>",
  "◈",
  "▸",
  "◆",
  "░",
  "▒",
];

const BG = "#050A14";
const BLUE_CORE = "#0066FF";
const CYAN_CORE = "#18E0FF";

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroCodeRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;
    const canvasEl: HTMLCanvasElement = canvasMaybe;

    const context = canvasEl.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const blue = hexToRgb(BLUE_CORE);
    const cyan = hexToRgb(CYAN_CORE);
    const reducedMotion = prefersReducedMotion();

    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let opacities: number[] = [];
    let sizes: number[] = [];
    let glyphIndex: number[] = [];
    let glyphTimer: number[] = [];

    function setup() {
      const parent = canvasEl.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colWidth = 18;
      cols = Math.ceil(width / colWidth);
      drops = [];
      speeds = [];
      opacities = [];
      sizes = [];
      glyphIndex = [];
      glyphTimer = [];

      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * height;
        speeds[i] = 0.4 + Math.random() * 1.1;
        opacities[i] = 0.18 + Math.random() * 0.62;
        sizes[i] = 11 + Math.floor(Math.random() * 5);
        glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
        glyphTimer[i] = Math.floor(Math.random() * 20);
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);
    }

    function draw() {
      frame += 1;
      ctx.fillStyle = "rgba(5, 10, 20, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const colWidth = 18;

      for (let i = 0; i < cols; i++) {
        const y = drops[i];
        const op = opacities[i];

        glyphTimer[i] -= 1;
        if (glyphTimer[i] <= 0) {
          glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
          glyphTimer[i] = 6 + Math.floor(Math.random() * 18);
        }

        const glyph = GLYPHS[glyphIndex[i]];
        const fontSize = sizes[i];
        ctx.font = `${fontSize}px "Courier New", monospace`;

        const color = i % 4 === 0 ? cyan : blue;
        const leadOp = Math.min(1, op * 2.45);
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.58)`;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${leadOp})`;
        ctx.fillText(glyph, i * colWidth, y);

        const trailCount = 8 + Math.floor(op * 14);
        for (let t = 1; t <= trailCount; t++) {
          const ty = y - t * (fontSize + 3);
          if (ty < -60 || ty > height + 60) continue;

          const trailOp = op * Math.pow(1 - t / (trailCount + 1), 1.45) * 0.9;
          if (trailOp < 0.008) continue;

          const trailGlyph = GLYPHS[(glyphIndex[i] + t * 3) % GLYPHS.length];
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${trailOp})`;
          ctx.fillText(trailGlyph, i * colWidth, ty);
        }

        if (!reducedMotion) {
          drops[i] += speeds[i] * 1.7;

          if (drops[i] > height + 60) {
            drops[i] = -80 - Math.random() * 200;
            speeds[i] = 0.4 + Math.random() * 1.1;
            opacities[i] = 0.18 + Math.random() * 0.62;
            glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
          }
        }
      }

      if (!reducedMotion && frame % 3 === 0) {
        const scanY = (frame * 1.4) % height;
        const grad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        grad.addColorStop(0, "rgba(0,102,255,0)");
        grad.addColorStop(0.5, "rgba(24,224,255,0.045)");
        grad.addColorStop(1, "rgba(0,102,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 2, width, 4);
      }

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    setup();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrame);
      setup();
      draw();
    });

    if (canvasEl.parentElement) {
      resizeObserver.observe(canvasEl.parentElement);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hero-code-rain ${className}`}
    />
  );
}
