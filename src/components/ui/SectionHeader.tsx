import SectionTag from "./SectionTag";

type SectionHeaderProps = {
  tag: string;
  headline: string;
  subheadline?: string;
  light?: boolean;
};

export default function SectionHeader({
  tag,
  headline,
  subheadline,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-20">
      <SectionTag>{tag}</SectionTag>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] ${
          light ? "text-surface" : "text-deep"
        }`}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className={`text-lg max-w-2xl mt-5 leading-relaxed ${
            light ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
