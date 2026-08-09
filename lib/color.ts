type Rgb = { r: number; g: number; b: number };

let probeEl: HTMLSpanElement | null = null;

function getProbeEl(): HTMLSpanElement {
  if (!probeEl && typeof document !== "undefined") {
    probeEl = document.createElement("span");
    probeEl.style.display = "none";
    document.documentElement.appendChild(probeEl);
  }
  return probeEl!;
}

const resolvedColorCache = new Map<string, string>();

export function clearResolvedColorCache() {
  resolvedColorCache.clear();
}

/** Resolve a CSS color (hex, rgb, or var()) to an rgb(r, g, b) string. */
export function resolveCssColor(color: string): string {
  const trimmed = color.trim();
  if (!trimmed.startsWith("var(")) return trimmed;

  if (typeof document === "undefined") return trimmed;

  const cached = resolvedColorCache.get(trimmed);
  if (cached) return cached;

  const el = getProbeEl();
  el.style.color = trimmed;
  const resolved = getComputedStyle(el).color;
  resolvedColorCache.set(trimmed, resolved);
  return resolved;
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function parseColor(color: string): Rgb {
  const resolved = resolveCssColor(color);

  if (resolved.startsWith("#")) {
    return hexToRgb(resolved);
  }

  const match = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return { r: +match[1], g: +match[2], b: +match[3] };
  }

  throw new Error(`Unable to parse color: ${color}`);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpColor(colorA: string, colorB: string, t: number) {
  const a = parseColor(colorA);
  const b = parseColor(colorB);
  return `rgb(${Math.round(lerp(a.r, b.r, t))}, ${Math.round(
    lerp(a.g, b.g, t)
  )}, ${Math.round(lerp(a.b, b.b, t))})`;
}
