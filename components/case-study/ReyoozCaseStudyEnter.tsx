"use client";

import { useEffect, useState, useCallback } from "react";
import ReyoozCaseStudy from "@/components/case-study/ReyoozCaseStudy";
import { useReyoozCaseStudyExit } from "@/components/case-study/CaseStudyTransition";
import {
  REYOOZ_CASE_STUDY_ENTERED_KEY,
} from "@/data/reyoozCaseStudy";

export default function ReyoozCaseStudyEnter() {
  const [animateIn, setAnimateIn] = useState(false);
  const { isExiting, startExit, ExitOverlay } = useReyoozCaseStudyExit();

  useEffect(() => {
    const entered = sessionStorage.getItem(REYOOZ_CASE_STUDY_ENTERED_KEY);
    sessionStorage.removeItem(REYOOZ_CASE_STUDY_ENTERED_KEY);
    if (!entered) setAnimateIn(true);
    document.body.style.overflow = "";
  }, []);

  const handleBackHome = useCallback(
    (headlineEl: HTMLElement | null, heroEl: HTMLElement | null) => {
      if (isExiting || !headlineEl || !heroEl) return;

      startExit({
        headlineEl,
        heroEl,
        caseBg: "var(--color-reyooz-headline)",
        caseHeadlineColor: "var(--color-reyooz-surface)",
        homeBg: "var(--project-reyooz-bg)",
        homeHeadlineColor: "var(--project-reyooz-headline)",
      });
    },
    [isExiting, startExit]
  );

  return (
    <>
      {ExitOverlay}
      <ReyoozCaseStudy
        animateIn={animateIn}
        onBackHome={handleBackHome}
        isExiting={isExiting}
      />
    </>
  );
}
