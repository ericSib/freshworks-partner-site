type SectionTagProps = {
  children: React.ReactNode;
};

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent mb-6">
      {children}
    </span>
  );
}
