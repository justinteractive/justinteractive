import { lerpColor } from "@/lib/color";
import {
  animate,
  CASE_STUDY_TRANSITION_MS,
  EXIT_ADJACENT_HERO_SLIDE_PX,
  getExitSubtitleFadeT,
  getReyoozCaseStudyLayout,
  getReyoozAdjacentHeroLayout,
  getReyoozHomeLayout,
} from "@/lib/motion";

type Rect = { left: number; top: number; width: number; height: number };

export type OverlayLayers = {
  bg: HTMLElement;
  headline: HTMLElement;
  hero: HTMLElement;
  nav: HTMLElement;
  content: HTMLElement;
  homeReveal: HTMLElement;
  homePrevHero: HTMLElement;
  homeNextHero: HTMLElement;
  homeSlideNav: HTMLElement;
  homeTextCol: HTMLElement;
};

export function getOverlayLayers(overlay: HTMLElement): OverlayLayers {
  return {
    bg: overlay.querySelector('[data-layer="bg"]') as HTMLElement,
    headline: overlay.querySelector('[data-layer="headline"]') as HTMLElement,
    hero: overlay.querySelector('[data-layer="hero"]') as HTMLElement,
    nav: overlay.querySelector('[data-layer="nav"]') as HTMLElement,
    content: overlay.querySelector('[data-layer="content"]') as HTMLElement,
    homeReveal: overlay.querySelector(
      '[data-layer="homeReveal"]'
    ) as HTMLElement,
    homePrevHero: overlay.querySelector(
      '[data-layer="homePrevHero"]'
    ) as HTMLElement,
    homeNextHero: overlay.querySelector(
      '[data-layer="homeNextHero"]'
    ) as HTMLElement,
    homeSlideNav: overlay.querySelector(
      '[data-layer="homeSlideNav"]'
    ) as HTMLElement,
    homeTextCol: overlay.querySelector(
      '[data-layer="homeTextCol"]'
    ) as HTMLElement,
  };
}

function applyHeroFrame(el: HTMLElement, rect: Rect) {
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

function applyHeadlineFrame(
  el: HTMLElement,
  left: number,
  top: number,
  fontSize: number
) {
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.fontSize = `${fontSize}px`;
}

function applyTextColFrame(
  el: HTMLElement,
  layout: { left: number; top: number; maxWidth: number }
) {
  el.style.left = `${layout.left}px`;
  el.style.top = `${layout.top}px`;
  el.style.maxWidth = `${layout.maxWidth}px`;
}

export type ForwardTransitionInput = {
  headlineFrom: Rect;
  heroFrom: Rect;
  startFontSize: number;
  fromBg: string;
  fromHeadlineColor: string;
  toBg: string;
  toHeadlineColor: string;
};

export async function runForwardTransition(
  layers: OverlayLayers,
  input: ForwardTransitionInput
) {
  const caseLayout = getReyoozCaseStudyLayout(window.innerWidth);

  applyHeadlineFrame(
    layers.headline,
    input.headlineFrom.left,
    input.headlineFrom.top,
    input.startFontSize
  );
  applyHeroFrame(layers.hero, input.heroFrom);
  layers.bg.style.backgroundColor = input.fromBg;
  layers.nav.style.opacity = "0";
  layers.homeReveal.style.opacity = "0";
  layers.homeReveal.style.transform = "translateX(56px)";
  layers.homePrevHero.style.opacity = "0";
  layers.homeNextHero.style.opacity = "0";
  layers.homeSlideNav.style.opacity = "0";
  layers.homeTextCol.style.opacity = "0";
  layers.content.style.top = "900px";
  layers.content.style.bottom = "0";
  layers.content.style.left = "0";
  layers.content.style.right = "0";
  layers.content.style.opacity = "0";
  layers.content.style.transform = "translateX(-56px)";

  await animate(CASE_STUDY_TRANSITION_MS, (t) => {
    layers.bg.style.backgroundColor = lerpColor(input.fromBg, input.toBg, t);
    layers.headline.style.color = lerpColor(
      input.fromHeadlineColor,
      input.toHeadlineColor,
      t
    );

    applyHeadlineFrame(
      layers.headline,
      input.headlineFrom.left +
        (caseLayout.headline.left - input.headlineFrom.left) * t,
      input.headlineFrom.top +
        (caseLayout.headline.top - input.headlineFrom.top) * t,
      input.startFontSize +
        (caseLayout.headline.fontSize - input.startFontSize) * t
    );

    applyHeroFrame(layers.hero, {
      left: input.heroFrom.left + (caseLayout.hero.left - input.heroFrom.left) * t,
      top: input.heroFrom.top + (caseLayout.hero.top - input.heroFrom.top) * t,
      width:
        input.heroFrom.width +
        (caseLayout.hero.width - input.heroFrom.width) * t,
      height:
        input.heroFrom.height +
        (caseLayout.hero.height - input.heroFrom.height) * t,
    });

    layers.nav.style.opacity = String(Math.max(0, (t - 0.35) / 0.65));
    layers.content.style.opacity = String(Math.max(0, (t - 0.25) / 0.75));
    layers.content.style.transform = `translateX(${-56 + 56 * t}px)`;
  });
}

export type ExitTransitionInput = {
  headlineFrom: Rect;
  heroFrom: Rect;
  startFontSize: number;
  caseBg: string;
  caseHeadlineColor: string;
  homeBg: string;
  homeHeadlineColor: string;
};

export function primeExitTransition(
  layers: OverlayLayers,
  input: ExitTransitionInput
) {
  applyHeadlineFrame(
    layers.headline,
    input.headlineFrom.left,
    input.headlineFrom.top,
    input.startFontSize
  );
  applyHeroFrame(layers.hero, input.heroFrom);
  layers.bg.style.backgroundColor = input.caseBg;
  layers.headline.style.color = input.caseHeadlineColor;
  layers.nav.style.opacity = "1";
  layers.content.style.top = `${getReyoozCaseStudyLayout(window.innerWidth).heroBandHeight}px`;
  layers.content.style.bottom = "0";
  layers.content.style.left = "0";
  layers.content.style.right = "0";
  layers.content.style.opacity = "1";
  layers.content.style.transform = "translateX(0)";
  layers.homeReveal.style.opacity = "0";
  layers.homeReveal.style.transform = "translateX(72px)";
  layers.homePrevHero.style.opacity = "0";
  layers.homePrevHero.style.transform = `translateY(${-EXIT_ADJACENT_HERO_SLIDE_PX}px)`;
  layers.homeNextHero.style.opacity = "0";
  layers.homeNextHero.style.transform = `translateY(${EXIT_ADJACENT_HERO_SLIDE_PX}px)`;
  layers.homeSlideNav.style.opacity = "0";

  const homeLayout = getReyoozHomeLayout(window.innerWidth, window.innerHeight);
  applyTextColFrame(layers.homeTextCol, homeLayout.subtitle);
  layers.homeTextCol.style.opacity = "0";

  const adjacentLayout = getReyoozAdjacentHeroLayout(
    window.innerWidth,
    window.innerHeight
  );
  applyHeroFrame(layers.homePrevHero, adjacentLayout.prev);
  applyHeroFrame(layers.homeNextHero, adjacentLayout.next);

  return {
    homeLayout,
    adjacentLayout,
  };
}

type ExitTransitionContext = ReturnType<typeof primeExitTransition>;

async function animateExitTransition(
  layers: OverlayLayers,
  input: ExitTransitionInput,
  { homeLayout, adjacentLayout }: ExitTransitionContext
) {
  await animate(CASE_STUDY_TRANSITION_MS, (t) => {
    layers.bg.style.backgroundColor = lerpColor(input.caseBg, input.homeBg, t);
    layers.headline.style.color = lerpColor(
      input.caseHeadlineColor,
      input.homeHeadlineColor,
      t
    );

    applyHeadlineFrame(
      layers.headline,
      input.headlineFrom.left +
        (homeLayout.headline.left - input.headlineFrom.left) * t,
      input.headlineFrom.top +
        (homeLayout.headline.top - input.headlineFrom.top) * t,
      input.startFontSize +
        (homeLayout.headline.fontSize - input.startFontSize) * t
    );

    applyHeroFrame(layers.hero, {
      left: input.heroFrom.left + (homeLayout.hero.left - input.heroFrom.left) * t,
      top: input.heroFrom.top + (homeLayout.hero.top - input.heroFrom.top) * t,
      width:
        input.heroFrom.width +
        (homeLayout.hero.width - input.heroFrom.width) * t,
      height:
        input.heroFrom.height +
        (homeLayout.hero.height - input.heroFrom.height) * t,
    });

    layers.nav.style.opacity = String(Math.max(0, 1 - t / 0.4));
    layers.content.style.opacity = String(Math.max(0, 1 - t / 0.5));
    layers.content.style.transform = `translateX(${-48 * t}px)`;
    layers.homeReveal.style.opacity = String(Math.min(1, Math.max(0, (t - 0.15) / 0.85)));
    layers.homeReveal.style.transform = `translateX(${72 - 72 * t}px)`;

    const adjacentT = Math.min(1, Math.max(0, (t - 0.2) / 0.75));
    layers.homePrevHero.style.opacity = String(
      adjacentLayout.prev.opacity * adjacentT
    );
    layers.homePrevHero.style.transform = `translateY(${
      -EXIT_ADJACENT_HERO_SLIDE_PX * (1 - adjacentT)
    }px)`;
    layers.homeNextHero.style.opacity = String(
      adjacentLayout.next.opacity * adjacentT
    );
    layers.homeNextHero.style.transform = `translateY(${
      EXIT_ADJACENT_HERO_SLIDE_PX * (1 - adjacentT)
    }px)`;
    layers.homeSlideNav.style.opacity = String(adjacentT);
    layers.homeTextCol.style.opacity = String(getExitSubtitleFadeT(t));
  });
}

export async function runExitTransition(
  layers: OverlayLayers,
  input: ExitTransitionInput,
  primed?: ExitTransitionContext
) {
  const ctx = primed ?? primeExitTransition(layers, input);
  await animateExitTransition(layers, input, ctx);
}
