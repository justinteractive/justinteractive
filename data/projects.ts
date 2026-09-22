export type Project = {
  slug: string;
  name: string;
  /** CSS var reference, e.g. var(--project-camio-bg) */
  bgColor: string;
  textColor: string;
  headlineColor: string;
  arrowColor: string;
  dotColor: string;
  activeDotColor: string;
  description: string;
  /** Path under /public/images once real screenshots are exported from Figma */
  image: string;
  /** YouTube watch/share URL — when set, the project hero opens this in a modal */
  videoUrl?: string;
  /** Set true once theme tokens and image are the real sampled values */
  isPlaceholder?: boolean;
};

function theme(slug: string) {
  const t = `--project-${slug}`;
  return {
    bgColor: `var(${t}-bg)`,
    textColor: `var(${t}-text)`,
    headlineColor: `var(${t}-headline)`,
    arrowColor: `var(${t}-accent)`,
    dotColor: `var(${t}-dot)`,
    activeDotColor: `var(${t}-dot-active)`,
  };
}

// Card height matches the Figma "Project Window" frame (498px).
export const CARD_HEIGHT = 498;

// Minimum gap between the in-focus hero and the previous/next hero (desktop).
export const CARD_GAP = 120;

// Distance between consecutive hero tops in the filmstrip: card + gap.
export const SLOT_STEP = CARD_HEIGHT + CARD_GAP;

export const projects: Project[] = [
  {
    slug: "camio",
    name: "Camio",
    ...theme("camio"),
    description:
      "A global operating system for everything that exists in every office in the world - from furniture to light fittings, concrete to carpets.",
    image: "/images/camio-hero.jpg",
    videoUrl: "https://youtu.be/2paFnIItA5U",
  },
  {
    slug: "reyooz",
    name: "Reyooz",
    ...theme("reyooz"),
    description: "One of the UK's earliest circular economy platforms, built years before sustainability became an industry expectation.",
    image: "/images/reyooz-hero.jpg",
  },
  {
    slug: "barclays",
    name: "Barclays",
    ...theme("barclays"),
    description: "A new AI powered banking experience for colleagues and employees. Consolidating the global HR content and services into a single, centralised platform.",
    image: "/images/barclays-hero.png",
  },
  {
    slug: "gunvor",
    name: "Gunvor",
    ...theme("gunvor"),
    description: "Redesigning commodities trading, credit risk, and legal - end to end - for one of the world's largest independent trading houses.",
    image: "/images/gunvor-hero.jpg",
  },
  {
    slug: "saxo",
    name: "Saxo Bank",
    ...theme("saxo"),
    description: "Designed the foundational principles and design system behind Saxo Bank's award-winning trading platform.",
    image: "/images/saxo-hero.jpg",
  },
  {
    slug: "iplayer",
    name: "BBC iPlayer",
    ...theme("iplayer"),
    description: "Watch, catch up, and discover — the BBC's home for on-demand TV and radio.",
    image: "/images/iplayer-hero.jpg",
  },
  {
    slug: "sedition",
    name: "Sedition",
    ...theme("sedition"),
    description: "A curated marketplace for collecting and trading digital art from world-renowned artists, trusted by global brands from Samsung to Marriott.",
    image: "/images/sedition-hero.jpg"
  },
];

/**
 * Bg/headline colors for a project's case study hero band. Most projects reuse
 * their homepage colors as-is; Reyooz's case study page uses a deliberately
 * inverted palette as its distinct brand treatment.
 */
export function getCaseStudyThemeColors(project: Project) {
  if (project.slug === "reyooz") {
    return {
      bg: "var(--color-reyooz-headline)",
      headline: "var(--color-reyooz-surface)",
    };
  }
  return { bg: project.bgColor, headline: project.headlineColor };
}
