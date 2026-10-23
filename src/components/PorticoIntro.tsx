import { BRAND } from "@/lib/constants";

const FRAMES = Array.from({ length: 8 }, (_, i) => ({ z: -i * 600 - 300, fill: i % 2 ? "#a64a29" : "#b4532f" }));
const stripes = (dir: string, step: number, w: number) =>
  `repeating-linear-gradient(to ${dir},rgba(42,33,28,0) 0 ${step - w}px,rgba(42,33,28,.15) ${step - w}px ${step}px)`;

/** Apertura: si cammina sotto il portico per due schermate, poi si esce alla luce e compare lo slogan.
 *  Puramente decorativa (aria-hidden): il titolo vero della pagina è nell'Hero. */
export function PorticoIntro() {
  const plane = "absolute [transform-style:preserve-3d]";
  return (
    <section data-fx="intro" aria-hidden="true" className="relative h-[300vh] bg-bg">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg [perspective:900px]">
        <div data-fx="scale" className="absolute left-1/2 top-1/2 size-0 [transform-style:preserve-3d]">
          <div data-fx="scene" className="absolute left-0 top-0 size-0 [transform-style:preserve-3d]">
            <div className={plane} style={{ left: -1200, top: 800, width: 2400, height: 7600, transformOrigin: "50% 0", transform: "translateZ(1200px) rotateX(-90deg)", backgroundColor: "#d9ccb8", backgroundImage: `${stripes("bottom", 300, 8)},linear-gradient(to bottom,rgba(246,241,233,0) 40%,#f6f1e9 100%)` }} />
            <div className={plane} style={{ left: -1200, top: -800, width: 2400, height: 7600, transformOrigin: "50% 0", transform: "translateZ(1200px) rotateX(-90deg)", backgroundColor: "#8f4a2d", backgroundImage: "linear-gradient(to bottom,rgba(246,241,233,0) 40%,#f6f1e9 100%)" }} />
            <div className={plane} style={{ left: -1200, top: -800, width: 7600, height: 1600, transformOrigin: "0 50%", transform: "translateZ(1200px) rotateY(90deg)", backgroundColor: "#c79a7c", backgroundImage: `${stripes("right", 600, 40)},linear-gradient(to right,rgba(246,241,233,0) 40%,#f6f1e9 100%)` }} />
            <div className={plane} style={{ left: 1200, top: -800, width: 7600, height: 1600, transformOrigin: "0 50%", transform: "translateZ(1200px) rotateY(90deg)", backgroundColor: "#b98a6c", backgroundImage: `${stripes("right", 600, 40)},linear-gradient(to right,rgba(246,241,233,0) 40%,#f6f1e9 100%)` }} />
            {FRAMES.map((f) => (
              <div key={f.z} data-fx="frame" className="absolute [backface-visibility:hidden]" style={{ left: -1200, top: -800, width: 2400, height: 1600, transform: `translateZ(${f.z}px)` }}>
                <svg viewBox="0 0 2400 1600" width="2400" height="1600" className="block">
                  <path fill={f.fill} fillRule="evenodd" d="M0 0H2400V1600H0Z M750 1600V650A450 450 0 0 1 1650 650V1600Z" />
                  <path fill="#f1e6d6" d="M720 630h60v34h-60zM1620 630h60v34h-60zM0 0h2400v36H0z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
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
