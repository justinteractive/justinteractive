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

/** Case study hero band breakpoint — matches CaseStudyPage/ReyoozCaseStudy module CSS. */
const CASE_STUDY_MOBILE_BREAKPOINT = 768;

/**
 * Case study page hero layout (headline + hero image window).
 * Mirrors the CSS in CaseStudyPage.module.css / ReyoozCaseStudy.module.css —
 * keep these numbers in sync with those media queries.
 */
export function getCaseStudyHeroLayout(
  viewportWidth: number,
  viewportHeight: number
) {
  if (viewportWidth <= CASE_STUDY_MOBILE_BREAKPOINT) {
    const heroWidth = viewportWidth - 40;
    const heroHeight = 280;
    const fontSize = 60;
    // .heroTitle is bottom-anchored on mobile; approximate a `top` for a
    // single-line, line-height:1 headline of this font size.
    const headlineTop = viewportHeight - 40 - fontSize;
    return {
      headline: { left: 20, top: headlineTop, fontSize },
      hero: { left: 20, top: 120, width: heroWidth, height: heroHeight },
      heroBandHeight: Math.max(900, viewportHeight),
    };
  }

  const heroLeft =
    viewportWidth <= 1200
      ? (viewportWidth - 714) / 2
      : viewportWidth * 0.25 + 75;

  return {
    headline: { left: 80, top: 412, fontSize: 128 },
    hero: { left: heroLeft, top: 242, width: 714, height: 498 },
    heroBandHeight: 900,
  };
}

/** Homepage breakpoint — matches ProjectScrollExperience.module.css. */
const HOME_MOBILE_BREAKPOINT = 640;

/** Caps how wide the homepage content can spread on large monitors — matches
 *  .stageInner's max-width in ProjectScrollExperience.module.css. */
const HOME_MAX_WIDTH = 1800;

/** Homepage screen layout (content column + filmstrip hero). */
export function getHomeHeroLayout(
  viewportWidth: number,
  viewportHeight: number,
  cardHeight = 498
) {
  if (viewportWidth <= HOME_MOBILE_BREAKPOINT) {
    const heroLeft = 24;
    const heroTop = 96;
    const heroWidth = viewportWidth - 72;
    const heroHeight = heroWidth / (714 / 498);
    const headlineFontSize = 72;
    return {
      headline: {
        left: 24,
        top: heroTop + heroHeight + 32,
        fontSize: headlineFontSize,
      },
      subtitle: {
        left: 24,
        top: heroTop + heroHeight + 32 + headlineFontSize + 8,
        maxWidth: viewportWidth - 48,
      },
      hero: {
        left: heroLeft,
        top: heroTop,
        width: heroWidth,
        height: heroHeight,
      },
    };
  }

  const filmstripRight = 80;
  const slideNavWidth = 12;
  const columnGap = 64;
  const heroWidth = 714;
  // .textCol's min-height — .contentRow centers vertically against this.
  const textColHeight = 320;
  const textPaddingTop = 24;
  const textGap = 16;
  const headlineFontSize = 128;

  // Mirrors .stageInner: content is centered and capped at HOME_MAX_WIDTH,
  // so extra viewport width becomes side margin instead of stretching the
  // gap between the text column and the hero image.
  const stageInnerWidth = Math.min(viewportWidth, HOME_MAX_WIDTH);
  const stageInnerLeft = (viewportWidth - stageInnerWidth) / 2;
  const textColTop = viewportHeight / 2 - textColHeight / 2;

  return {
    headline: {
      left: stageInnerLeft + 80,
      top: textColTop + textPaddingTop,
      fontSize: headlineFontSize,
    },
    subtitle: {
      left: stageInnerLeft + 80,
      top: textColTop + textPaddingTop + headlineFontSize + textGap,
      maxWidth: 700,
    },
    hero: {
      left:
        stageInnerLeft +
        stageInnerWidth -
        filmstripRight -
        slideNavWidth -
        columnGap -
        heroWidth,
      top: viewportHeight / 2 - cardHeight / 2,
      width: heroWidth,
      height: cardHeight,
    },
  };
}

/** Prev/next peek heroes on the homepage screen, adjacent to the active hero. */
export function getAdjacentHeroLayout(
  viewportWidth: number,
  viewportHeight: number,
  slotStep = 618,
  cardHeight = 498
) {
  const { hero } = getHomeHeroLayout(viewportWidth, viewportHeight, cardHeight);

  if (viewportWidth <= HOME_MOBILE_BREAKPOINT) {
    // Mobile filmstrip is horizontal: prev/next peek from left/right, not above/below.
    return {
      prev: {
        left: hero.left - slotStep,
        top: hero.top,
        width: hero.width,
        height: hero.height,
        opacity: 0.4,
      },
      next: {
        left: hero.left + slotStep,
        top: hero.top,
        width: hero.width,
        height: hero.height,
        opacity: 0.4,
      },
    };
  }

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

/** Vertical offset for adjacent heroes sliding into peek position on exit (desktop). */
export const EXIT_ADJACENT_HERO_SLIDE_PX = 30;

/** Normalized exit progress when portfolio subtitle fade begins (after headline home). */
export const EXIT_SUBTITLE_FADE_START = 0.78;

export function getExitSubtitleFadeT(t: number) {
  return Math.min(
    1,
    Math.max(0, (t - EXIT_SUBTITLE_FADE_START) / (1 - EXIT_SUBTITLE_FADE_START))
  );
}
