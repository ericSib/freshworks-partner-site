type CheckIconProps = {
  className?: string;
  strokeWidth?: number;
};

export default function CheckIcon({
  className = "w-4 h-4 text-accent",
  strokeWidth = 3,
}: CheckIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}
