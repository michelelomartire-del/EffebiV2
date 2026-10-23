import { BRAND } from "@/lib/constants";

/** Apertura: si cammina sotto il portico per due schermate, poi si esce alla luce e compare lo slogan.
 *  Disegnata su un solo canvas 2D: leggera anche su smartphone. Puramente decorativa (aria-hidden): il titolo vero della pagina è nell'Hero. */
export function PorticoIntro() {
  return (
    <section data-fx="intro" aria-hidden="true" className="relative h-[300vh] bg-bg">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg">
        <canvas data-fx="pcanvas" className="absolute inset-0 block size-full" />
        <div data-fx="slogan" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[18px] p-6 text-center opacity-0">
          <svg viewBox="24 24 82 54" className="h-12 w-[72px]"><path fill="#B4532F" d="M24 78L24 36C24 29.37 29.37 24 36 24C42.63 24 48 29.37 48 36L48 78ZM53 78L53 36C53 29.37 58.37 24 65 24C71.63 24 77 29.37 77 36L77 78ZM82 78L82 36C82 29.37 87.37 24 94 24C100.63 24 106 29.37 106 36L106 78Z" /></svg>
          <p className="m-0 max-w-[14ch] font-display text-[clamp(40px,6.5vw,92px)] font-medium italic leading-[1.05] text-ink">{BRAND.payoff}</p>
          <p className="eyebrow m-0">EffeBi · Amministrazioni Condominiali · Bologna</p>
        </div>
        <p data-fx="hint" className="absolute inset-x-0 bottom-7 m-0 text-center text-[14px] font-bold tracking-[0.08em] text-bg">
          Scorri per entrare sotto il portico ↓
        </p>
      </div>
    </section>
  );
}
