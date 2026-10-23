import { AREAS, BRAND, CONTACT, CONTAINER, LEGAL_LINKS, LISTINGS } from "@/lib/constants";
import { Logo } from "./ui/Logo";

const CREDITS = [
  { title: "Bologna Portici 349", creator: "GFreihalter", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Bologna_Portici_349.jpg" },
  { title: "Portico san luca", creator: "Puscas Vadim (Nebbius)", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Portico_san_luca.jpg" },
  { title: "Arcate del Portico di Santo Stefano", creator: "Agnese.pi", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Arcate_del_Portico_di_Santo_Stefano.jpg" },
  { title: "Strada Maggiore", creator: "MarkPagl", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Strada_Maggiore.jpg" },
  { title: "Castel de' Britti", creator: "ALEXFUSEALBA", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Castel_de%27_Britti.jpg" },
];

const link = "text-bg no-underline hover:text-accent-soft";
const head = "m-0 text-[12px] uppercase tracking-[0.12em] text-on-dark-muted";

export function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-[72px] text-on-dark">
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo inverse />
            <p className="m-0 font-display text-[18px] font-medium italic leading-[1.4] text-bg">{BRAND.payoff}</p>
            <p className="m-0 text-[13px] text-on-dark-muted">
              Energia e lavori tecnici in collaborazione con{" "}
              <a href="https://eniminds.com/" target="_blank" rel="noopener noreferrer" className="text-on-dark hover:text-accent-soft">Eniminds</a>.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <p className={head}>Studio</p>
            <a href={CONTACT.emailHref} className={link}>{CONTACT.email}</a>
            <span>{CONTACT.street}, {CONTACT.city}</span>
            <span>{CONTACT.hours}</span>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <p className={head}>Zone servite</p>
            <p className="m-0 leading-[1.6]">{AREAS.join(" · ")}</p>
          </div>
          <nav aria-label="Informazioni legali" className="flex flex-col gap-2.5 text-[15px]">
            <p className={head}>Informazioni legali</p>
            {LEGAL_LINKS.map((l) => <a key={l.href} href={l.href} className={link}>{l.label}</a>)}
            <a href={LISTINGS.paginegialle} target="_blank" rel="noopener noreferrer" className={link}>Scheda PagineGialle</a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-[#4a3d35] pt-6 text-[12.5px] leading-[1.6] text-on-dark-muted">
          <p className="m-0">© 2026 {BRAND.legal} · P.IVA {BRAND.vat}</p>
          <p className="m-0">
            Fotografie via Wikimedia Commons:{" "}
            {CREDITS.map((c, i) => (
              <span key={c.page}>
                <a href={c.page} target="_blank" rel="noopener noreferrer" className="text-on-dark hover:text-accent-soft">“{c.title}”</a> di {c.creator},{" "}
                <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-on-dark hover:text-accent-soft">{c.license}</a>
                {i < CREDITS.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
