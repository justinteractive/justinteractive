import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import type { CaseStudySection } from "@/data/caseStudyTypes";
import styles from "./CaseStudyPage.module.css";

type Props = {
  project: Project;
  sections?: CaseStudySection[];
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

export default function CaseStudyPage({ project, sections }: Props) {
  const contentSections = sections ?? placeholderSections(project);

  return (
    <main
      className={styles.page}
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
          <Link href="/">← Back Home</Link>
          <span>About</span>
        </nav>

        <h1 className={styles.heroTitle}>{project.name}</h1>
      </div>

      <CaseStudyContent sections={contentSections} />
    </main>
  );
}
