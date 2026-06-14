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

const BG = "#050D1A";
const BLUE_CORE = "#2563EB";
const BLUE_DIM = "#1D4ED8";

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

function supportsRichMotion() {
  return (
    !prefersReducedMotion() &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(max-width: 700px)").matches
  );
}

function readObservedSize(entry: ResizeObserverEntry) {
  const borderBox = entry.borderBoxSize?.[0];
  if (borderBox && borderBox.inlineSize > 0 && borderBox.blockSize > 0) {
    return {
      width: borderBox.inlineSize,
      height: borderBox.blockSize,
    };
  }

  return {
    width: entry.contentRect.width,
    height: entry.contentRect.height,
  };
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
    const parentEl = canvasEl.parentElement;
    if (!parentEl) return;

    const blue = hexToRgb(BLUE_CORE);
    const blueDim = hexToRgb(BLUE_DIM);
    const richMotion = supportsRichMotion();

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
    const pointer = { x: -9999, y: -9999, active: false };

    let resizeFrame = 0;

    function setupFromSize(nextWidth: number, nextHeight: number) {
      const roundedWidth = Math.max(1, Math.round(nextWidth));
      const roundedHeight = Math.max(1, Math.round(nextHeight));

      if (roundedWidth === Math.round(width) && roundedHeight === Math.round(height)) {
        return false;
      }

      width = roundedWidth;
      height = roundedHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colWidth = 24;
      cols = Math.ceil(width / colWidth);
      drops = [];
      speeds = [];
      opacities = [];
      sizes = [];
      glyphIndex = [];
      glyphTimer = [];

      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * height;
        speeds[i] = 0.35 + Math.random() * 1.05;
        opacities[i] = 0.32 + Math.random() * 0.56;
        sizes[i] = 14 + Math.floor(Math.random() * 5);
        glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
        glyphTimer[i] = Math.floor(Math.random() * 20);
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);
      return true;
    }

    function draw() {
      frame += 1;
      ctx.fillStyle = "rgba(5, 13, 26, 0.12)";
      ctx.fillRect(0, 0, width, height);

      const colWidth = 24;

      for (let i = 0; i < cols; i++) {
        const y = drops[i];
        const op = opacities[i];
        const x = i * colWidth;
        const proximity = pointer.active
          ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 260)
          : 0;
        const effectiveOp = Math.min(1, op + proximity * 0.38);

        glyphTimer[i] -= 1;
        if (glyphTimer[i] <= 0) {
          glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
          glyphTimer[i] = 6 + Math.floor(Math.random() * 18);
        }

        const glyph = GLYPHS[glyphIndex[i]];
        const fontSize = sizes[i];
        ctx.font = `${fontSize}px "Courier New", monospace`;

        const color = i % 5 === 0 ? blue : blueDim;
        const leadOp = Math.min(1, effectiveOp * 2.1);
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.62)`;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${leadOp})`;
        ctx.fillText(glyph, i * colWidth, y);

        const trailCount = 7 + Math.floor(effectiveOp * 12);
        for (let t = 1; t <= trailCount; t++) {
          const ty = y - t * (fontSize + 3);
          if (ty < -60 || ty > height + 60) continue;

          const trailOp = effectiveOp * Math.pow(1 - t / (trailCount + 1), 1.55) * 0.82;
          if (trailOp < 0.008) continue;

          const trailGlyph = GLYPHS[(glyphIndex[i] + t * 3) % GLYPHS.length];
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${trailOp})`;
          ctx.fillText(trailGlyph, i * colWidth, ty);
        }

        if (richMotion) {
          drops[i] += speeds[i] * 1.7;

          if (drops[i] > height + 60) {
            drops[i] = -80 - Math.random() * 200;
            speeds[i] = 0.35 + Math.random() * 1.05;
            opacities[i] = 0.32 + Math.random() * 0.56;
            glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
          }
        }
      }

      if (richMotion && frame % 3 === 0) {
        const scanY = (frame * 1.4) % height;
        const grad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        grad.addColorStop(0, "rgba(37,99,235,0)");
        grad.addColorStop(0.5, "rgba(37,99,235,0.035)");
        grad.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 2, width, 4);
      }

      if (richMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function updatePointer(event: PointerEvent) {
      pointer.x = event.offsetX;
      pointer.y = event.offsetY;
      pointer.active = true;
    }

    function clearPointer() {
      pointer.active = false;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (!entry) return;

      const { width: nextWidth, height: nextHeight } = readObservedSize(entry);
      if (nextWidth < 1 || nextHeight < 1) return;

      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const changed = setupFromSize(nextWidth, nextHeight);
        if (!changed && frame > 0) return;

        cancelAnimationFrame(animationFrame);
        draw();
      });
    });

    resizeObserver.observe(canvasEl);

    if (richMotion) {
      parentEl.addEventListener("pointermove", updatePointer);
      parentEl.addEventListener("pointerleave", clearPointer);
    }

    return () => {
      if (richMotion) {
        parentEl.removeEventListener("pointermove", updatePointer);
        parentEl.removeEventListener("pointerleave", clearPointer);
      }
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
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
