import Image from "next/image";
import type { CaseStudyMediaRow as CaseStudyMediaRowType } from "@/data/caseStudyTypes";
import styles from "./CaseStudyContent.module.css";

type Props = {
  row: CaseStudyMediaRowType;
};

export default function CaseStudyMediaRow({ row }: Props) {
  if (row.type !== "image-grid") return null;

  const columns = row.columns ?? 2;

  return (
    <div className={styles.mediaRow}>
      <div className={styles.imageGrid} data-columns={columns}>
        {row.images.map((image) => (
          <figure key={image.src}>
            <div className={styles.imageGridCell}>
              <Image src={image.src} alt={image.alt} fill sizes="50vw" />
            </div>
            {image.caption && (
              <figcaption className={styles.imageGridCaption}>
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
