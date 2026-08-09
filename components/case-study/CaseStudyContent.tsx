import type { CaseStudySection } from "@/data/caseStudyTypes";
import CaseStudyMediaRow from "@/components/case-study/CaseStudyMediaRow";
import styles from "./CaseStudyContent.module.css";

type Props = {
  sections: CaseStudySection[];
  id?: string;
  className?: string;
};

function SectionProse({
  section,
}: {
  section: CaseStudySection;
}) {
  if (section.label === "Impact") {
    return (
      <div className={styles.prose}>
        <p>{section.body[0]}</p>
        <p>{section.body[1]}</p>
        <ul className={styles.impactList}>
          {section.body.slice(2).map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.prose}>
      {section.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

function SectionSidebar({
  sidebar,
}: {
  sidebar: NonNullable<CaseStudySection["sidebar"]>;
}) {
  return (
    <aside className={styles.sidebar}>
      {sidebar.map((group) => (
        <div key={group.label} className={styles.sidebarGroup}>
          <p className={styles.sidebarLabel}>{group.label}</p>
          {group.items.map((item) => (
            <p key={item} className={styles.sidebarItem}>
              {item}
            </p>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default function CaseStudyContent({
  sections,
  id = "case-study-content",
  className,
}: Props) {
  return (
    <div id={id} className={[styles.content, className].filter(Boolean).join(" ")}>
      {sections.map((section) => {
        const hasSidebar = Boolean(section.sidebar?.length);
        const hasMedia = Boolean(section.media?.length);

        return (
          <section
            key={section.label}
            className={
              hasSidebar
                ? `${styles.section} ${styles.sectionWithSidebar}`
                : styles.section
            }
          >
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>{section.label}</p>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
            </div>

            {hasSidebar ? (
              <div className={styles.sectionBodyRow}>
                <SectionProse section={section} />
                <SectionSidebar sidebar={section.sidebar!} />
              </div>
            ) : (
              <SectionProse section={section} />
            )}

            {hasMedia && (
              <div className={styles.mediaRows}>
                {section.media!.map((row, index) => (
                  <CaseStudyMediaRow key={`${section.label}-media-${index}`} row={row} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
