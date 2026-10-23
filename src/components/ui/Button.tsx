import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[6px] font-bold no-underline transition-colors duration-200 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-ink hover:text-white",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
  quiet: "text-ink underline decoration-1 underline-offset-[5px] hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-[17px]",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export const ButtonLink = forwardRef<HTMLAnchorElement, Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">>(
  function ButtonLink({ variant = "primary", size = "md", children, className, ...rest }, ref) {
    return (
      <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
        {children}
      </a>
    );
  }
);

export const Button = forwardRef<HTMLButtonElement, Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">>(
  function Button({ variant = "primary", size = "md", children, className, type = "button", ...rest }, ref) {
    return (
      <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
        {children}
      </button>
    );
  }
);
