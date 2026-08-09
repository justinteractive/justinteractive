export type CaseStudySidebarGroup = {
  label: string;
  items: string[];
};

export type CaseStudyImageGrid = {
  type: "image-grid";
  columns?: 2 | 3;
  images: { src: string; alt: string; caption?: string }[];
};

export type CaseStudyMediaRow = CaseStudyImageGrid;

export type CaseStudySection = {
  label: string;
  title: string;
  body: string[];
  sidebar?: CaseStudySidebarGroup[];
  media?: CaseStudyMediaRow[];
};
