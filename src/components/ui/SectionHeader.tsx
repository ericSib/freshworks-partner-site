import SectionTag from "./SectionTag";

type SectionHeaderProps = {
  tag: string;
  headline: string;
  subheadline?: string;
};

export default function SectionHeader({
  tag,
  headline,
  subheadline,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <SectionTag>{tag}</SectionTag>
      <h2 className="text-3xl sm:text-4xl font-bold text-navy">
        {headline}
      </h2>
      {subheadline && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          {subheadline}
        </p>
      )}
    </div>
  );
}
