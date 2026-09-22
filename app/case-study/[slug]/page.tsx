import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudyEnter from "@/components/case-study/CaseStudyEnter";

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

  return <CaseStudyEnter project={project} />;
}
