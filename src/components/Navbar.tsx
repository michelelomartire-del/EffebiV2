import { useState } from "react";
import { CONTACT, NAV_LINKS } from "@/lib/constants";
import { Logo } from "./ui/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center gap-6 px-6">
        <a href="#top" aria-label="EffeBi Amministrazioni Condominiali, torna all'inizio" className="no-underline">
          <Logo />
        </a>
        <nav aria-label="Sezioni" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-[15px] font-medium text-ink no-underline hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={CONTACT.formAnchor}
          className="ml-auto hidden min-h-11 items-center rounded-[6px] bg-accent px-5 text-[15px] font-bold text-white no-underline hover:bg-ink hover:text-white sm:inline-flex lg:ml-2"
        >
          Preventivo gratuito
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-menu"
          className="ml-auto flex size-11 items-center justify-center text-ink sm:ml-0 lg:hidden"
        >
          <span className="sr-only">{open ? "Chiudi il menù" : "Apri il menù"}</span>
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            <path d={open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open ? (
        <nav id="nav-menu" aria-label="Menù principale" className="border-t border-line bg-bg px-6 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lead text-ink no-underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
