"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getOverlayLayers,
  primeExitTransition,
  runExitTransition,
  runForwardTransition,
} from "@/lib/reyoozTransition";
import {
  REYOOZ_CASE_STUDY_ENTERED_KEY,
  REYOOZ_RETURN_HOME_KEY,
} from "@/data/reyoozCaseStudy";
import { projects } from "@/data/projects";
import styles from "./CaseStudyTransition.module.css";

const REYOOZ_PROJECT_INDEX = projects.findIndex((p) => p.slug === "reyooz");

type ForwardElements = {
  headlineEl: HTMLElement;
  heroEl: HTMLElement;
  fromBg: string;
  fromHeadlineColor: string;
  toBg: string;
  toHeadlineColor: string;
};

type ExitElements = {
  headlineEl: HTMLElement;
  heroEl: HTMLElement;
  caseBg: string;
  caseHeadlineColor: string;
  homeBg: string;
  homeHeadlineColor: string;
};

function TransitionOverlay({
  overlayRef,
}: {
  overlayRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div ref={overlayRef} className={styles.overlay} hidden aria-hidden>
      <div className={styles.bg} data-layer="bg" />
      <div className={styles.homeReveal} data-layer="homeReveal">
        <nav className={styles.homeNav}>
          <span>Justinteractive</span>
          <span>About</span>
        </nav>
        <div className={styles.homeAdjacentHero} data-layer="homePrevHero">
          <Image
            src="/images/camio-hero.jpg"
            alt=""
            fill
            sizes="714px"
          />
        </div>
        <div className={styles.homeAdjacentHero} data-layer="homeNextHero">
          <Image
            src="/images/barclays-hero.png"
            alt=""
            fill
            sizes="714px"
          />
        </div>
        <div className={styles.homeSlideNav} data-layer="homeSlideNav" aria-hidden>
          {projects.map((project, index) => {
            const isActive = index === REYOOZ_PROJECT_INDEX;
            return (
              <span
                key={project.slug}
                className={styles.homeSlideDot}
                data-active={isActive || undefined}
                style={{
                  backgroundColor: isActive
                    ? project.activeDotColor
                    : projects[REYOOZ_PROJECT_INDEX]?.dotColor,
                }}
              />
            );
          })}
        </div>
      </div>
      <nav className={styles.nav} data-layer="nav">
        <span>← Back Home</span>
        <span>About</span>
      </nav>
      <div className={styles.hero} data-layer="hero">
        <Image
          src="/images/reyooz-hero.jpg"
          alt=""
          fill
          sizes="714px"
          priority
        />
      </div>
      <h1 className={styles.headline} data-layer="headline">
        Reyooz
      </h1>
      <div
        className={styles.homeTextCol}
        data-layer="homeTextCol"
        style={{
          color: projects[REYOOZ_PROJECT_INDEX]?.textColor,
        }}
      >
        <p className={styles.homeSubtitle}>
          {projects[REYOOZ_PROJECT_INDEX]?.description}
        </p>
        <span className={styles.homeCta}>
          Open Case Study{" "}
          <span
            className={styles.homeCtaArrow}
            style={{
              color: projects[REYOOZ_PROJECT_INDEX]?.arrowColor,
            }}
          >
            →
          </span>
        </span>
      </div>
      <div className={styles.contentReveal} data-layer="content" />
    </div>
  );
}

export function useReyoozCaseStudyTransition() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const startTransition = useCallback(
    async (elements: ForwardElements) => {
      if (isTransitioning) return;
      const overlay = overlayRef.current;
      if (!overlay) return;

      setIsTransitioning(true);
      overlay.hidden = false;
      document.body.style.overflow = "hidden";

      const layers = getOverlayLayers(overlay);
      const headlineFrom = elements.headlineEl.getBoundingClientRect();
      const heroFrom = elements.heroEl.getBoundingClientRect();
      const startFontSize = parseFloat(
        getComputedStyle(elements.headlineEl).fontSize
      );

      layers.headline.textContent = elements.headlineEl.textContent;

      await runForwardTransition(layers, {
        headlineFrom,
        heroFrom,
        startFontSize,
        fromBg: elements.fromBg,
        fromHeadlineColor: elements.fromHeadlineColor,
        toBg: elements.toBg,
        toHeadlineColor: elements.toHeadlineColor,
      });

      sessionStorage.setItem(REYOOZ_CASE_STUDY_ENTERED_KEY, "1");
      router.push("/case-study/reyooz");
    },
    [isTransitioning, router]
  );

  return {
    isTransitioning,
    startTransition,
    TransitionOverlay: <TransitionOverlay overlayRef={overlayRef} />,
  };
}

export function useReyoozCaseStudyExit() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const startExit = useCallback(
    async (elements: ExitElements) => {
      if (isExiting) return;
      const overlay = overlayRef.current;
      if (!overlay) return;

      overlay.hidden = false;
      document.body.style.overflow = "hidden";

      const layers = getOverlayLayers(overlay);
      const headlineFrom = elements.headlineEl.getBoundingClientRect();
      const heroFrom = elements.heroEl.getBoundingClientRect();
      const startFontSize = parseFloat(
        getComputedStyle(elements.headlineEl).fontSize
      );

      layers.headline.textContent = elements.headlineEl.textContent;

      const exitInput = {
        headlineFrom,
        heroFrom,
        startFontSize,
        caseBg: elements.caseBg,
        caseHeadlineColor: elements.caseHeadlineColor,
        homeBg: elements.homeBg,
        homeHeadlineColor: elements.homeHeadlineColor,
      };

      const ctx = primeExitTransition(layers, exitInput);
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
      setIsExiting(true);

      await runExitTransition(layers, exitInput, ctx);

      sessionStorage.setItem(REYOOZ_RETURN_HOME_KEY, "1");
      document.body.style.overflow = "";
      router.push("/", { scroll: false });
    },
    [isExiting, router]
  );

  return {
    isExiting,
    startExit,
    ExitOverlay: <TransitionOverlay overlayRef={overlayRef} />,
  };
}
