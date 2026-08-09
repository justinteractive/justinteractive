"use client";

import { useLayoutEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { projects, CARD_HEIGHT, SLOT_STEP } from "@/data/projects";
import { lerpColor, clearResolvedColorCache, lerp } from "@/lib/color";
import { useReyoozCaseStudyTransition } from "@/components/case-study/CaseStudyTransition";
import { REYOOZ_RETURN_HOME_KEY } from "@/data/reyoozCaseStudy";
import YouTubeModal from "@/components/YouTubeModal";
import styles from "./ProjectScrollExperience.module.css";

const N = projects.length;

export default function ProjectScrollExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const navLogoRef = useRef<HTMLParagraphElement>(null);
  const navAboutRef = useRef<HTMLParagraphElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filmstripItemRefs = useRef<(HTMLElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const snapRef = useRef<Snap | null>(null);
  const snapSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const {
    isTransitioning,
    startTransition,
    TransitionOverlay,
  } = useReyoozCaseStudyTransition();

  const closeVideoModal = useCallback(() => setVideoModal(null), []);

  const handleHeroClick = useCallback((index: number) => {
    const project = projects[index];
    const snap = snapRef.current;
    const activeIndex = snap?.currentSnapIndex ?? 0;

    // Active hero with a video: open the modal instead of a no-op snap.
    if (project.videoUrl && activeIndex === index) {
      setVideoModal({ url: project.videoUrl, title: project.name });
      return;
    }

    snap?.goTo(index);
  }, []);

  const handleCaseStudyClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      slug: string,
      index: number
    ) => {
      if (slug !== "reyooz" || isTransitioning) return;

      e.preventDefault();

      const headlineEl = textBlockRefs.current[index]?.querySelector("h1");
      const heroEl = filmstripItemRefs.current[index];
      const project = projects[index];
      if (!headlineEl || !heroEl) return;

      startTransition({
        headlineEl: headlineEl as HTMLElement,
        heroEl,
        fromBg: project.bgColor,
        fromHeadlineColor: project.headlineColor,
        toBg: "var(--color-reyooz-headline)",
        toHeadlineColor: "var(--color-reyooz-surface)",
      });
    },
    [isTransitioning, startTransition]
  );

  useLayoutEffect(() => {
    function update(scrollY: number) {
      const vh = window.innerHeight;
      const centerTop = vh / 2 - CARD_HEIGHT / 2;

      const raw = scrollY / vh;
      const clamped = Math.max(0, Math.min(N - 1, raw));
      const index = Math.min(N - 2, Math.floor(clamped));
      const t = clamped - index;

      const current = projects[index];
      const next = projects[Math.min(index + 1, N - 1)];

      if (stageRef.current) {
        stageRef.current.style.backgroundColor = lerpColor(
          current.bgColor,
          next.bgColor,
          t
        );
      }

      const navColor = lerpColor(current.textColor, next.textColor, t);
      if (navLogoRef.current) navLogoRef.current.style.color = navColor;
      if (navAboutRef.current) navAboutRef.current.style.color = navColor;

      const textDrift = 32;
      textBlockRefs.current.forEach((block, i) => {
        if (!block) return;
        let opacity = 0;
        let ty = 0;
        if (i === index) {
          opacity = 1 - t;
          ty = -t * textDrift;
        } else if (i === index + 1) {
          opacity = t;
          ty = (1 - t) * textDrift;
        }
        block.style.opacity = String(opacity);
        block.style.transform = `translateY(${ty}px)`;
        block.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });

      // Active hero Y-centered; prev/next sit CARD_GAP (120px) away.
      const stripY = -(clamped * SLOT_STEP);
      if (filmstripRef.current) {
        filmstripRef.current.style.transform = `translate3d(0, ${stripY}px, 0)`;
      }

      filmstripItemRefs.current.forEach((item, i) => {
        if (!item) return;
        item.style.top = `${i * SLOT_STEP + centerTop}px`;

        const distance = Math.abs(i - clamped);
        let op: number;
        if (distance < 1) {
          op = 1 - distance * 0.6;
        } else {
          op = Math.max(0, 0.4 - (distance - 1) * 0.4);
        }
        item.style.opacity = String(op);
      });

      // Crossfade: outgoing dot active→inactive, incoming dot inactive→active
      const inactiveDotColor = lerpColor(current.dotColor, next.dotColor, t);

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;

        if (i === index) {
          dot.style.backgroundColor = lerpColor(
            current.activeDotColor,
            next.dotColor,
            t
          );
          dot.style.opacity = "1";
          dot.style.transform = `scale(${lerp(1, 0.85, t)})`;
        } else if (i === index + 1) {
          dot.style.backgroundColor = lerpColor(
            current.dotColor,
            next.activeDotColor,
            t
          );
          dot.style.opacity = "1";
          dot.style.transform = `scale(${lerp(0.85, 1, t)})`;
        } else {
          dot.style.backgroundColor = inactiveDotColor;
          dot.style.opacity = "1";
          dot.style.transform = "scale(0.85)";
        }
      });
    }

    const easing = (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x));
    const duration = 1.2;

    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const isNavigating = { current: false };

    const snap = new Snap(lenis, {
      type: "lock",
      distanceThreshold: "100%",
      debounce: 0,
      duration,
      easing,
      onSnapStart: () => {
        isNavigating.current = true;
      },
      onSnapComplete: () => {
        isNavigating.current = false;
      },
    });
    snapRef.current = snap;

    const snapSections = snapSectionRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (snapSections.length > 0) {
      snap.addElements(snapSections, { align: "start" });
    } else {
      for (let i = 0; i < N; i++) {
        snap.add(i * window.innerHeight);
      }
    }

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      update(scroll);
    });

    const reyoozIndex = projects.findIndex((p) => p.slug === "reyooz");
    const shouldRestoreReyooz =
      reyoozIndex >= 0 &&
      sessionStorage.getItem(REYOOZ_RETURN_HOME_KEY) === "1";

    if (shouldRestoreReyooz) {
      document.body.style.overflow = "";
      snap.resize();
      const targetScroll = reyoozIndex * window.innerHeight;
      lenis.scrollTo(targetScroll, { immediate: true });
      snap.currentSnapIndex = reyoozIndex;
      requestAnimationFrame(() => {
        sessionStorage.removeItem(REYOOZ_RETURN_HOME_KEY);
      });
    }

    update(lenis.scroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const onResize = () => {
      clearResolvedColorCache();
      snap.resize();
      update(lenis.scroll);
    };
    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      e.preventDefault();

      if (isNavigating.current || lenis.isScrolling === "smooth") {
        return;
      }

      if (e.key === "ArrowDown") snap.next();
      else snap.previous();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      snap.destroy();
      snapRef.current = null;
      lenis.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      {TransitionOverlay}

      {videoModal ? (
        <YouTubeModal
          url={videoModal.url}
          title={videoModal.title}
          onClose={closeVideoModal}
        />
      ) : null}

      <div className={styles.scrollTrack}>
        {projects.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => {
              snapSectionRefs.current[i] = el;
            }}
            className={styles.snapSection}
            aria-hidden
          />
        ))}
      </div>

      <div ref={stageRef} className={styles.stage}>
        <nav className={styles.nav}>
          <p ref={navLogoRef}>Justinteractive</p>
          <p ref={navAboutRef} className={styles.about}>
            About
          </p>
        </nav>

        <div className={styles.contentRow}>
          <div className={styles.textCol}>
            {projects.map((p, i) => (
              <div
                key={p.slug}
                ref={(el) => {
                  textBlockRefs.current[i] = el;
                }}
                className={styles.textBlock}
              >
                <h1 style={{ color: p.headlineColor }}>{p.name}</h1>
                <p className={styles.desc} style={{ color: p.textColor }}>
                  {p.description}
                </p>
                <Link
                  href={`/case-study/${p.slug}`}
                  className={styles.cta}
                  style={{ color: p.textColor }}
                  onClick={(e) => handleCaseStudyClick(e, p.slug, i)}
                  aria-disabled={isTransitioning || undefined}
                >
                  Open Case Study{" "}
                  <span
                    className={styles.arrow}
                    style={{ color: p.arrowColor }}
                  >
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filmstripColumn}>
          <div className={styles.projectWindow}>
            <div ref={filmstripRef} className={styles.filmstrip}>
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  ref={(el) => {
                    filmstripItemRefs.current[i] = el;
                  }}
                  className={`${styles.filmstripItem} ${styles.filmstripItemButton}`}
                  aria-label={
                    p.videoUrl ? `Play ${p.name} video` : `Go to ${p.name}`
                  }
                  onClick={() => handleHeroClick(i)}
                >
                  {p.isPlaceholder ? (
                    <div className={styles.placeholder}>
                      {p.name} — placeholder
                    </div>
                  ) : (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="714px"
                      style={{ objectFit: "cover" }}
                      priority={i <= 1}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.slideNav}>
            {projects.map((p, i) => (
              <button
                type="button"
                key={p.slug}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className={styles.slideDot}
                aria-label={`Go to ${p.name}`}
                onClick={() => snapRef.current?.goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
