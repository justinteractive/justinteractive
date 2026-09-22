"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getOverlayLayers,
  primeExitTransition,
  runExitTransition,
  runForwardTransition,
  CASE_STUDY_ENTERED_KEY,
  CASE_STUDY_RETURN_HOME_KEY,
} from "@/lib/caseStudyTransition";
import { projects, type Project } from "@/data/projects";
import styles from "./CaseStudyTransition.module.css";

export { CASE_STUDY_ENTERED_KEY, CASE_STUDY_RETURN_HOME_KEY };

type ForwardElements = {
  project: Project;
  headlineEl: HTMLElement;
  heroEl: HTMLElement;
  fromBg: string;
  fromHeadlineColor: string;
  toBg: string;
  toHeadlineColor: string;
};

type ExitElements = {
  project: Project;
  headlineEl: HTMLElement;
  heroEl: HTMLElement;
  caseBg: string;
  caseHeadlineColor: string;
  homeBg: string;
  homeHeadlineColor: string;
};

function TransitionOverlay({
  overlayRef,
  project,
}: {
  overlayRef: RefObject<HTMLDivElement>;
  project: Project;
}) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[index - 1] ?? project;
  const nextProject = projects[index + 1] ?? project;

  return (
    <div ref={overlayRef} className={styles.overlay} hidden aria-hidden>
      <div className={styles.bg} data-layer="bg" />
      <div className={styles.homeReveal} data-layer="homeReveal">
        <nav className={styles.homeNav}>
          <span>Justinteractive</span>
          <span>About</span>
        </nav>
        <div className={styles.homeAdjacentHero} data-layer="homePrevHero">
          <Image src={prevProject.image} alt="" fill sizes="714px" />
        </div>
        <div className={styles.homeAdjacentHero} data-layer="homeNextHero">
          <Image src={nextProject.image} alt="" fill sizes="714px" />
        </div>
        <div className={styles.homeSlideNav} data-layer="homeSlideNav" aria-hidden>
          {projects.map((p, i) => {
            const isActive = i === index;
            return (
              <span
                key={p.slug}
                className={styles.homeSlideDot}
                data-active={isActive || undefined}
                style={{
                  backgroundColor: isActive ? p.activeDotColor : project.dotColor,
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
        <Image src={project.image} alt="" fill sizes="714px" priority />
      </div>
      <h1 className={styles.headline} data-layer="headline">
        {project.name}
      </h1>
      <div
        className={styles.homeTextCol}
        data-layer="homeTextCol"
        style={{ color: project.textColor }}
      >
        <p className={styles.homeSubtitle}>{project.description}</p>
        <span className={styles.homeCta}>
          Open Case Study{" "}
          <span className={styles.homeCtaArrow} style={{ color: project.arrowColor }}>
            →
          </span>
        </span>
      </div>
      <div className={styles.contentReveal} data-layer="content" />
    </div>
  );
}

export function useCaseStudyTransition() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const startTransition = useCallback(
    async (elements: ForwardElements) => {
      if (isTransitioning) return;
      const overlay = overlayRef.current;
      if (!overlay) return;

      setActiveProject(elements.project);
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

      sessionStorage.setItem(CASE_STUDY_ENTERED_KEY, "1");
      router.push(`/case-study/${elements.project.slug}`);
    },
    [isTransitioning, router]
  );

  return {
    isTransitioning,
    startTransition,
    TransitionOverlay: (
      <TransitionOverlay overlayRef={overlayRef} project={activeProject} />
    ),
  };
}

export function useCaseStudyExit() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const startExit = useCallback(
    async (elements: ExitElements) => {
      if (isExiting) return;
      const overlay = overlayRef.current;
      if (!overlay) return;

      setActiveProject(elements.project);
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

      sessionStorage.setItem(CASE_STUDY_RETURN_HOME_KEY, elements.project.slug);
      document.body.style.overflow = "";
      router.push("/", { scroll: false });
    },
    [isExiting, router]
  );

  return {
    isExiting,
    startExit,
    ExitOverlay: <TransitionOverlay overlayRef={overlayRef} project={activeProject} />,
  };
}
