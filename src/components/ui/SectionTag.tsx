type SectionTagProps = {
  children: React.ReactNode;
};

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange px-4 py-1.5 bg-orange/10 rounded-full mb-4">
      {children}
    </span>
  );
}
