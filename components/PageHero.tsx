import FadeSplit from "@/components/FadeSplit";
import type { Photo } from "@/lib/photos";

// Top of inner pages: the faded editorial split, with an <h1>.
export default function PageHero({
  eyebrow,
  title,
  script,
  intro,
  photo,
  focus,
  labels,
}: {
  eyebrow: string;
  title: React.ReactNode;
  script?: string;
  intro: string;
  photo: Photo;
  focus?: string;
  labels?: string[];
}) {
  return (
    <FadeSplit as="h1" priority eyebrow={eyebrow} title={title} subtitle={script} photo={photo} focus={focus} labels={labels}>
      <p>{intro}</p>
    </FadeSplit>
  );
}
