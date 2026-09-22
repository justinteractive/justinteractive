"use client";

import { useEffect, useState, useCallback } from "react";
import type { Project } from "@/data/projects";
import { getCaseStudyThemeColors } from "@/data/projects";
import ReyoozCaseStudy from "@/components/case-study/ReyoozCaseStudy";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import {
  useCaseStudyExit,
  CASE_STUDY_ENTERED_KEY,
} from "@/components/case-study/CaseStudyTransition";

type Props = {
  project: Project;
};

export default function CaseStudyEnter({ project }: Props) {
  const [animateIn, setAnimateIn] = useState(false);
  const { isExiting, startExit, ExitOverlay } = useCaseStudyExit();

  useEffect(() => {
    const entered = sessionStorage.getItem(CASE_STUDY_ENTERED_KEY);
    sessionStorage.removeItem(CASE_STUDY_ENTERED_KEY);
    if (!entered) setAnimateIn(true);
    document.body.style.overflow = "";
  }, []);

  const handleBackHome = useCallback(
    (headlineEl: HTMLElement | null, heroEl: HTMLElement | null) => {
      if (isExiting || !headlineEl || !heroEl) return;

      const { bg, headline } = getCaseStudyThemeColors(project);

      startExit({
        project,
        headlineEl,
        heroEl,
        caseBg: bg,
        caseHeadlineColor: headline,
        homeBg: project.bgColor,
        homeHeadlineColor: project.headlineColor,
      });
    },
    [isExiting, project, startExit]
  );

  return (
    <>
      {ExitOverlay}
      {project.slug === "reyooz" ? (
        <ReyoozCaseStudy
          animateIn={animateIn}
          onBackHome={handleBackHome}
          isExiting={isExiting}
        />
      ) : (
        <CaseStudyPage
          project={project}
          animateIn={animateIn}
          onBackHome={handleBackHome}
          isExiting={isExiting}
        />
      )}
    </>
  );
}
