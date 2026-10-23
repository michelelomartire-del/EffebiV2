import { cn } from "@/utils/cn";

const ARCHES = "M24 78L24 36C24 29.37 29.37 24 36 24C42.63 24 48 29.37 48 36L48 78ZM53 78L53 36C53 29.37 58.37 24 65 24C71.63 24 77 29.37 77 36L77 78ZM82 78L82 36C82 29.37 87.37 24 94 24C100.63 24 106 29.37 106 36L106 78Z";

/** Simbolo: i tre archi del portico (brandbook, direzione 1a). */
export function LogoMark({ className, color = "#B4532F" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="24 24 82 54" className={className} aria-hidden="true" focusable="false">
      <path fill={color} d={ARCHES} />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-[26px] w-10 shrink-0" color={inverse ? "#F6F1E9" : "#B4532F"} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[24px] font-semibold", inverse ? "text-bg" : "text-ink")}>EffeBi</span>
        <span className={cn("mt-[3px] text-[10.5px] uppercase tracking-[0.14em]", inverse ? "text-on-dark-muted" : "text-body")}>
          Amministrazioni Condominiali
        </span>
      </span>
    </span>
  );
}
