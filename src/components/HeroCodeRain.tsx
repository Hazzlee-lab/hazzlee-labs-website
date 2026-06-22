"use client";

import { useEffect, useRef } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

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

const SIGNAL_WORDS = [
  "AI",
  "api",
  "audit",
  "auto",
  "build",
  "clean",
  "crm",
  "dash",
  "forms",
  "launch",
  "ops",
  "portal",
  "rescue",
  "secure",
  "ship",
  "speed",
  "systems",
  "ux",
  "web",
  "workflow",
];

const BG = "#050D1A";
const BLUE_CORE = "#2563EB";
const BLUE_DIM = "#1D4ED8";
const CYAN_ACCENT = "#18E0FF";
const DESKTOP_DPR_LIMIT = 1.7;
const MOBILE_DPR_LIMIT = 1.1;
const DESKTOP_COL_WIDTH = 23;
const MOBILE_COL_WIDTH = 28;
const DESKTOP_FRAME_INTERVAL_MS = 1000 / 45;
const MOBILE_FRAME_INTERVAL_MS = 1000 / 30;
// Start the animation only after the page is idle or the user engages, keeping
// the canvas off the main thread during the initial load / TBT window.
const RAIN_IDLE_TIMEOUT_MS = 3000;
const RAIN_FALLBACK_DELAY_MS = 3200;
const DESKTOP_SIGNAL_CHANCE = 0.075;

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

function isMobileViewport() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function supportsPointerInteraction() {
  return window.matchMedia("(pointer: fine)").matches;
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
    const cyan = hexToRgb(CYAN_ACCENT);
    const animateRain = !prefersReducedMotion();
    const mobileViewport = isMobileViewport();
    const enablePointer = animateRain && supportsPointerInteraction() && !mobileViewport;
    const colWidth = mobileViewport ? MOBILE_COL_WIDTH : DESKTOP_COL_WIDTH;
    const frameInterval = mobileViewport ? MOBILE_FRAME_INTERVAL_MS : DESKTOP_FRAME_INTERVAL_MS;

    let frame = 0;
    let animationFrame = 0;
    let lastDrawAt = 0;
    let initialStartArmed = false;
    let hasStartedInitial = false;
    let idleStartHandle: number | undefined;
    let fallbackStartTimer = 0;
    let teardownInitialStart: (() => void) | undefined;
    const idleWindow = window as IdleWindow;
    let width = 0;
    let height = 0;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let opacities: number[] = [];
    let sizes: number[] = [];
    let glyphIndex: number[] = [];
    let glyphTimer: number[] = [];
    let signalWords: Array<string | null> = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const fontBySize = new Map<number, string>();
    let isVisible = true;
    let isDocumentVisible = true;

    let resizeFrame = 0;

    function getFont(size: number) {
      const cached = fontBySize.get(size);
      if (cached) return cached;

      const font = `${size}px "Courier New", monospace`;
      fontBySize.set(size, font);
      return font;
    }

    function pickSignalWord() {
      if (mobileViewport || Math.random() > DESKTOP_SIGNAL_CHANCE) {
        return null;
      }

      return SIGNAL_WORDS[Math.floor(Math.random() * SIGNAL_WORDS.length)];
    }

    function shouldAnimate() {
      return animateRain && isVisible && isDocumentVisible;
    }

    function stopAnimationLoop() {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function scheduleDraw() {
      if (!shouldAnimate() || animationFrame) {
        return;
      }

      animationFrame = requestAnimationFrame(drawLoop);
    }

    function armInitialStart() {
      if (initialStartArmed) return;
      initialStartArmed = true;

      const begin = () => {
        if (hasStartedInitial) return;
        hasStartedInitial = true;
        teardownInitialStart?.();
        teardownInitialStart = undefined;
        scheduleDraw();
      };

      const interactionOptions: AddEventListenerOptions = { passive: true, once: true };
      window.addEventListener("scroll", begin, interactionOptions);
      window.addEventListener("pointerdown", begin, interactionOptions);
      window.addEventListener("pointermove", begin, interactionOptions);
      window.addEventListener("keydown", begin, { once: true });

      if (idleWindow.requestIdleCallback) {
        idleStartHandle = idleWindow.requestIdleCallback(begin, { timeout: RAIN_IDLE_TIMEOUT_MS });
      } else {
        fallbackStartTimer = window.setTimeout(begin, RAIN_FALLBACK_DELAY_MS);
      }

      teardownInitialStart = () => {
        window.removeEventListener("scroll", begin);
        window.removeEventListener("pointerdown", begin);
        window.removeEventListener("pointermove", begin);
        window.removeEventListener("keydown", begin);
        if (idleStartHandle !== undefined) {
          idleWindow.cancelIdleCallback?.(idleStartHandle);
          idleStartHandle = undefined;
        }
        if (fallbackStartTimer) {
          window.clearTimeout(fallbackStartTimer);
          fallbackStartTimer = 0;
        }
      };
    }

    function queueAnimationLoop() {
      if (!shouldAnimate() || animationFrame) {
        return;
      }

      if (!hasStartedInitial) {
        armInitialStart();
        return;
      }

      scheduleDraw();
    }

    function setupFromSize(nextWidth: number, nextHeight: number) {
      const roundedWidth = Math.max(1, Math.round(nextWidth));
      const roundedHeight = Math.max(1, Math.round(nextHeight));

      if (roundedWidth === Math.round(width) && roundedHeight === Math.round(height)) {
        return false;
      }

      width = roundedWidth;
      height = roundedHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, mobileViewport ? MOBILE_DPR_LIMIT : DESKTOP_DPR_LIMIT);
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / colWidth);
      drops = [];
      speeds = [];
      opacities = [];
      sizes = [];
      glyphIndex = [];
      glyphTimer = [];
      signalWords = [];

      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * height;
        speeds[i] = 0.35 + Math.random() * 1.05;
        opacities[i] = mobileViewport ? 0.26 + Math.random() * 0.48 : 0.2 + Math.random() * 0.58;
        sizes[i] = mobileViewport ? 13 + Math.floor(Math.random() * 4) : 11 + Math.floor(Math.random() * 5);
        glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
        glyphTimer[i] = Math.floor(Math.random() * 20);
        signalWords[i] = pickSignalWord();
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);
      return true;
    }

    function drawFrame(advanceDrops: boolean) {
      frame += 1;
      ctx.fillStyle = mobileViewport ? "rgba(5, 13, 26, 0.13)" : "rgba(5, 13, 26, 0.09)";
      ctx.fillRect(0, 0, width, height);

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
          signalWords[i] = pickSignalWord();
        }

        const signalWord = signalWords[i];
        const glyph = signalWord ?? GLYPHS[glyphIndex[i]];
        const fontSize = sizes[i];
        ctx.font = getFont(fontSize);

        const color = signalWord ? cyan : !mobileViewport && i % 6 === 0 ? cyan : i % 5 === 0 ? blue : blueDim;
        const leadOp = Math.min(1, effectiveOp * (signalWord ? 2.45 : 2.12));
        if (!mobileViewport) {
          ctx.shadowBlur = signalWord ? 10 : 7;
          ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${signalWord ? 0.55 : 0.38})`;
        }
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${leadOp})`;
        ctx.fillText(glyph, i * colWidth, y);
        ctx.shadowBlur = 0;

        const trailCount = (mobileViewport ? 4 : 8) + Math.floor(effectiveOp * (mobileViewport ? 5 : 11));
        for (let t = 1; t <= trailCount; t++) {
          const ty = y - t * (fontSize + 3);
          if (ty < -60 || ty > height + 60) continue;

          const trailOp = effectiveOp * Math.pow(1 - t / (trailCount + 1), mobileViewport ? 1.55 : 1.42) * (mobileViewport ? 0.82 : 0.9);
          if (trailOp < 0.008) continue;

          const trailGlyph = GLYPHS[(glyphIndex[i] + t * 3) % GLYPHS.length];
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${trailOp})`;
          ctx.fillText(trailGlyph, i * colWidth, ty);
        }

        if (animateRain && advanceDrops) {
          drops[i] += speeds[i] * (mobileViewport ? 1.5 : 1.75);

          if (drops[i] > height + 60) {
            drops[i] = -80 - Math.random() * 200;
            speeds[i] = 0.35 + Math.random() * 1.05;
            opacities[i] = mobileViewport ? 0.26 + Math.random() * 0.48 : 0.2 + Math.random() * 0.58;
            glyphIndex[i] = Math.floor(Math.random() * GLYPHS.length);
            signalWords[i] = pickSignalWord();
          }
        }
      }

      if (advanceDrops && enablePointer && frame % 3 === 0) {
        const scanY = (frame * 1.4) % height;
        const grad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        grad.addColorStop(0, "rgba(37,99,235,0)");
        grad.addColorStop(0.5, "rgba(24,224,255,0.042)");
        grad.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 2, width, 4);
      }
    }

    function drawLoop(timestamp: number) {
      animationFrame = 0;

      if (!shouldAnimate()) {
        return;
      }

      if (lastDrawAt && timestamp - lastDrawAt < frameInterval) {
        scheduleDraw();
        return;
      }

      lastDrawAt = timestamp;
      drawFrame(true);
      scheduleDraw();
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

        stopAnimationLoop();
        drawFrame(false);
        queueAnimationLoop();
      });
    });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (shouldAnimate()) {
        queueAnimationLoop();
      } else {
        stopAnimationLoop();
      }
    }, { rootMargin: "64px 0px" });

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (shouldAnimate()) {
        queueAnimationLoop();
      } else {
        stopAnimationLoop();
      }
    };

    resizeObserver.observe(canvasEl);
    visibilityObserver.observe(parentEl);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (enablePointer) {
      parentEl.addEventListener("pointermove", updatePointer);
      parentEl.addEventListener("pointerleave", clearPointer);
    }

    return () => {
      if (enablePointer) {
        parentEl.removeEventListener("pointermove", updatePointer);
        parentEl.removeEventListener("pointerleave", clearPointer);
      }
      stopAnimationLoop();
      teardownInitialStart?.();
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
