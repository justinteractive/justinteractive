"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import { reyoozCaseStudySections } from "@/data/reyoozCaseStudy";
import styles from "./ReyoozCaseStudy.module.css";

type Props = {
  animateIn?: boolean;
  isExiting?: boolean;
  onBackHome?: (
    headlineEl: HTMLElement | null,
    heroEl: HTMLElement | null
  ) => void;
};

const NAV_OVER_CONTENT_THRESHOLD_PX = 72;

export default function ReyoozCaseStudy({
  animateIn = false,
  isExiting = false,
  onBackHome,
}: Props) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [navOverContent, setNavOverContent] = useState(false);

  useEffect(() => {
    const content = document.getElementById("case-study-content");
    if (!content) return;

    const updateNavTheme = () => {
      const top = content.getBoundingClientRect().top;
      setNavOverContent(top <= NAV_OVER_CONTENT_THRESHOLD_PX);
    };

    updateNavTheme();
    window.addEventListener("scroll", updateNavTheme, { passive: true });
    window.addEventListener("resize", updateNavTheme);

    return () => {
      window.removeEventListener("scroll", updateNavTheme);
      window.removeEventListener("resize", updateNavTheme);
    };
  }, []);

  return (
    <main
      className={`${styles.page} ${animateIn ? styles.pageAnimateIn : ""} ${
        isExiting ? styles.pageExiting : ""
      }`}
    >
      <nav
        className={`${styles.nav} ${navOverContent ? styles.navOnContent : ""}`}
      >
        {onBackHome ? (
          <button
            type="button"
            className={styles.backHome}
            onClick={() => onBackHome(headlineRef.current, heroRef.current)}
            disabled={isExiting}
          >
            ← Back Home
          </button>
        ) : (
          <Link href="/">← Back Home</Link>
        )}
        <span>About</span>
      </nav>

      <div className={styles.heroBand}>
        <div ref={heroRef} className={styles.heroWindow}>
          <Image
            src="/images/reyooz-hero.jpg"
            alt="Reyooz"
            fill
            sizes="714px"
            className={styles.heroImage}
            priority
          />
        </div>

        <a
          href="#case-study-content"
          className={styles.scrollDown}
          aria-label="Scroll down"
        >
          <span className={styles.scrollDownInner}>
            <svg
              className={styles.scrollDownIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.scrollDownLabel}>Scroll</span>
          </span>
        </a>

        <h1 ref={headlineRef} className={styles.heroTitle}>
          Reyooz
        </h1>
      </div>

      <CaseStudyContent
        sections={reyoozCaseStudySections}
        className={[
          styles.contentScrollOver,
          animateIn ? styles.contentAnimateIn : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </main>
  );
}
