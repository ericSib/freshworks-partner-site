import { Link } from "@/i18n/navigation";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

const variants = {
  primary:
    "bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/25 hover:shadow-orange/40",
  secondary:
    "bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/25",
  outline:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
