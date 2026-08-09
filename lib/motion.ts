/** Standard ease-in-out for page transitions (< 1.5s). */
export const CASE_STUDY_TRANSITION_MS = 1200;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function animate(
  duration: number,
  onFrame: (t: number) => void,
  easing: (t: number) => number = easeInOutCubic
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    function frame(now: number) {
      const raw = Math.min(1, (now - start) / duration);
      onFrame(easing(raw));
      if (raw < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

export function getReyoozCaseStudyLayout(viewportWidth: number) {
  return {
    headline: { left: 80, top: 412, fontSize: 128 },
    hero: {
      left: viewportWidth * 0.25 + 75,
      top: 242,
      width: 714,
      height: 498,
    },
    heroBandHeight: 900,
  };
}

/** Homepage Reyooz screen layout (content row + filmstrip). */
export function getReyoozHomeLayout(
  viewportWidth: number,
  viewportHeight: number,
  cardHeight = 498
) {
  const filmstripRight = 80;
  const slideNavWidth = 12;
  const columnGap = 64;
  const heroWidth = 714;
  const contentTop = 242;
  const textPaddingTop = 24;
  const textGap = 16;
  const headlineFontSize = 128;

  return {
    headline: {
      left: 80,
      top: contentTop + textPaddingTop,
      fontSize: headlineFontSize,
    },
    subtitle: {
      left: 80,
      top: contentTop + textPaddingTop + headlineFontSize + textGap,
      maxWidth: 700,
    },
    hero: {
      left: viewportWidth - filmstripRight - slideNavWidth - columnGap - heroWidth,
      top: viewportHeight / 2 - cardHeight / 2,
      width: heroWidth,
      height: cardHeight,
    },
  };
}

/** Prev/next peek heroes on the Reyooz project screen (filmstrip index 1). */
export function getReyoozAdjacentHeroLayout(
  viewportWidth: number,
  viewportHeight: number,
  slotStep = 618,
  cardHeight = 498
) {
  const { hero } = getReyoozHomeLayout(viewportWidth, viewportHeight, cardHeight);
  const centerTop = viewportHeight / 2 - cardHeight / 2;

  return {
    prev: {
      left: hero.left,
      top: centerTop - slotStep,
      width: hero.width,
      height: hero.height,
      opacity: 0.4,
    },
    next: {
      left: hero.left,
      top: centerTop + slotStep,
      width: hero.width,
      height: hero.height,
      opacity: 0.4,
    },
  };
}

/** Vertical offset for adjacent heroes sliding into peek position on exit. */
export const EXIT_ADJACENT_HERO_SLIDE_PX = 30;

/** Normalized exit progress when portfolio subtitle fade begins (after headline home). */
export const EXIT_SUBTITLE_FADE_START = 0.78;

export function getExitSubtitleFadeT(t: number) {
  return Math.min(
    1,
    Math.max(0, (t - EXIT_SUBTITLE_FADE_START) / (1 - EXIT_SUBTITLE_FADE_START))
  );
}
