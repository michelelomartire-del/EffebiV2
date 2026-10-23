import { CONTAINER } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";

const SERVICES = [
  { t: "Amministrazione condominiale", d: "Contabilità, assemblee e fornitori, con compensi da listino e rendiconti leggibili." },
  { t: "Gestione affitti", d: "Entrate e uscite per ogni unità, con rendiconto per voce." },
  { t: "Pratiche tecniche e catastali", d: "Architetti, ingegneri e termotecnici in studio per lavori e bonus." },
  { t: "Energia", d: "Diagnosi, forniture e Comunità Energetiche, in collaborazione con Eniminds." },
  { t: "Portale per i condòmini", d: "Documenti, segnalazioni e pagamenti dal telefono, 24 ore su 24." },
];

export function Features() {
  return (
    <section id="chi-siamo" aria-labelledby="features-title" className="bg-surface py-24">
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <SectionHeading id="features-title" eyebrow="Chi siamo" title="Un solo studio, tutte le competenze dell'edificio." />
          <p className="m-0 max-w-[56ch] text-lead text-body">
            In Via Emilia 168 lavorano allo stesso tavolo l'amministratrice e i tecnici. Quando c'è un problema non vi
            rimbalziamo tra uffici: lo risolviamo qui.
          </p>
        </div>
        <ul className="m-0 grid list-none gap-[2px] overflow-hidden rounded-[10px] border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <li key={s.t} className="flex min-h-[180px] flex-col gap-3 bg-surface px-7 py-8">
              <span className="font-display text-[14px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 text-[24px] leading-[1.2]">{s.t}</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-body">{s.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
