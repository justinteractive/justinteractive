import type { CaseStudySection } from "@/data/caseStudyTypes";

export type { CaseStudySection } from "@/data/caseStudyTypes";

export const reyoozCaseStudySections: CaseStudySection[] = [
  {
    label: "About the Project",
    title: "Bootstrapping a startup from £0 to £1m in three years.",
    body: [
      "In 2014, sustainability wasn't yet a boardroom priority. Construction and commercial real estate generated enormous volumes of perfectly usable furniture, equipment and materials that were routinely sent to landfill because disposing of them was easier than finding them a second life.",
      "The idea for Reyooz came from a simple frustration.",
      "Freecycle had demonstrated that people wanted to give things away, but the platform was fragile, unstructured and completely unsuitable for organisations managing thousands of assets across commercial buildings.",
      "Having spent years designing complex trading systems for investment banks, I wondered: What if we applied the same marketplace and logistics thinking used for global commodities trading to physical assets inside the built environment?",
      "That question became Reyooz.",
      "Over the following six years I founded and led the company, growing it from an idea and grant-funded MVP into one of the UK's earliest circular economy technology platforms, helping organisations redistribute millions of pounds of surplus assets instead of sending them to waste.",
    ],
    sidebar: [
      {
        label: "Role",
        items: ["Head of Product", "Designer", "Engineer"],
      },
      {
        label: "Tools",
        items: ["Figma", "Claude Code", "Cursor", "Javascript", "PHP", "MySQL"],
      },
      {
        label: "Responsibilities",
        items: [
          "Design Systems",
          "Dev Ops",
          "User Testing",
          "Data Analysis",
          "Research",
          "Design Direction",
          "Product Strategy",
        ],
      },
    ],
  },
  {
    label: "Discovering the real problem",
    title: "Product discovery by doing the job.",
    body: [
      "Rather than interviewing users from a distance, we became the users.",
      "We partnered with Land Securities, British Land and some of the UK's largest commercial landlords.",
      "Every project began the same way.",
      "An office would be handed over with only a few weeks before demolition or refurbishment.",
      "Our team would walk through the building, audit every asset, photograph everything, decide whether it should be sold, donated, stored or recycled, publish listings and coordinate the entire logistics for the building clearance.",
      "Every friction point became a product insight.",
      "Every manual workaround became an opportunity for automation.",
      "The software wasn't designed in isolation.",
      "It was designed from empty office floors, loading bays and warehouse whiteboards while solving the operational problem in real time.",
    ],
  },
  {
    label: "Building the Product Around Reality",
    title: "Building the Product in Production.",
    body: [
      "As Founder and CEO, I also acted as the company's Head of Product.",
      "Rather than relying on lengthy specification documents, I worked directly alongside facilities managers, building managers, logistics teams, charities and buyers to understand how decisions were really made.",
      "Many improvements started as sketches in my notebook before becoming working prototypes in code.",
      "Because I was building the platform myself, I could deploy improvements immediately, observe behaviour and iterate again the same day.",
      "This tight feedback loop allowed Reyooz to evolve around genuine operational needs rather than assumptions.",
      "Features such as asset auditing, photography workflows, listing generation, logistics management and reporting all emerged from real customer projects rather than feature roadmaps.",
    ],
  },
  {
    label: "AI Before AI was Mainstream",
    title: "Early adoption of Artificial Intelligence",
    body: [
      "Long before generative AI became mainstream, Reyooz was already using machine learning to reduce manual work.",
      "Beginning in 2016 we introduced image recognition and rule-based automation to identify furniture, estimate dimensions, calculate weight, infer materials and generate metadata automatically.",
      "This significantly reduced the effort required to catalogue thousands of assets while improving the consistency of environmental reporting.",
      "The goal wasn't AI for its own sake.",
      "The goal was making large-scale reuse operationally viable.",
    ],
  },
  {
    label: "Building Both Sides of the Marketplace",
    title: "Building a Marketplace From Scratch",
    body: [
      "A marketplace only works when supply and demand grow together.",
      "While we onboarded landlords and commercial clients, I personally built the demand side from zero.",
      "I began by contacting London charities, schools and community organisations one by one.",
      "Over time that network expanded into universities, NHS organisations, health centres, local authorities, small businesses and eventually major corporations embracing circular procurement.",
      "The platform ultimately supported a community of more than 25,000 active buyers, demonstrating that second-life assets could become a trusted purchasing channel rather than a compromise.",
    ],
  },
  {
    label: "growing the team",
    title: "Scaling the Business",
    body: [
      "As demand accelerated, I grew Reyooz into a multidisciplinary team of fifteen full-time employees.",
      "Alongside leading the company, I continued directing product strategy while specialists managed Shopify commerce, marketing and customer acquisition.",
      "The business evolved alongside the emergence of sustainability and circular economy initiatives across both public and private sectors.",
      "What began as an unconventional idea gradually became aligned with a major global movement.",
    ],
  },
  {
    label: "Impact",
    title: "Social, Environmental and Economic Impact",
    body: [
      "Over seven years Reyooz demonstrated that circular economy technology could operate commercially at scale.",
      "Highlights included:",
      "Founded and scaled the company from concept to an established circular economy platform.",
      "Secured early-stage funding through Founders Fund and Nominet Trust.",
      "Partnered with major commercial landlords including Land Securities and British Land.",
      "Built one of the UK's earliest AI-assisted asset auditing systems.",
      "Grew a marketplace of more than 25,000 active buyers.",
      "Built and led a team of fifteen full-time employees.",
      "Helped support NHS emergency hospital projects during the COVID-19 pandemic.",
      "Diverted thousands of tonnes of furniture and equipment from landfill while proving reuse could become operationally viable for enterprise organisations.",
    ],
  },
];

export const REYOOZ_CASE_STUDY_ENTERED_KEY = "reyooz-case-study-entered";
export const REYOOZ_RETURN_HOME_KEY = "reyooz-return-home";
