import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ReyoozCaseStudyEnter from "@/components/case-study/ReyoozCaseStudyEnter";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyRoute({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  if (params.slug === "reyooz") {
    return <ReyoozCaseStudyEnter />;
  }

  return <CaseStudyPage project={project} />;
}
