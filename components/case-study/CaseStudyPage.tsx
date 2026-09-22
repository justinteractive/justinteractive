"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import type { Project } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import type { CaseStudySection } from "@/data/caseStudyTypes";
import styles from "./CaseStudyPage.module.css";

type Props = {
  project: Project;
  sections?: CaseStudySection[];
  animateIn?: boolean;
  isExiting?: boolean;
  onBackHome?: (
    headlineEl: HTMLElement | null,
    heroEl: HTMLElement | null
  ) => void;
};

function placeholderSections(project: Project): CaseStudySection[] {
  return [
    {
      label: "Overview",
      title: `${project.name} case study`,
      body: [
        `Case study body content goes here — port section-by-section from the matching "Folio / ${project.name} / Case Study" frame in Figma.`,
      ],
    },
  ];
}

export default function CaseStudyPage({
  project,
  sections,
  animateIn = false,
  isExiting = false,
  onBackHome,
}: Props) {
  const contentSections = sections ?? placeholderSections(project);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className={`${styles.page} ${animateIn ? styles.pageAnimateIn : ""} ${
        isExiting ? styles.pageExiting : ""
      }`}
      style={
        {
          "--case-study-hero-bg": project.bgColor,
          "--case-study-hero-headline": project.headlineColor,
          "--case-study-hero-text": project.textColor,
        } as CSSProperties
      }
    >
      <div className={styles.heroBand}>
        <nav className={styles.nav}>
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
            <span>← Back Home</span>
          )}
          <span>About</span>
        </nav>

        <div ref={heroRef} className={styles.heroWindow}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="714px"
            className={styles.heroImage}
            priority
          />
        </div>

        <h1 ref={headlineRef} className={styles.heroTitle}>
          {project.name}
        </h1>
      </div>

      <CaseStudyContent
        sections={contentSections}
        className={animateIn ? styles.contentAnimateIn : undefined}
      />
    </main>
  );
}
