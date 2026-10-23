import { useState } from "react";
import { CONTAINER } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { SectionHeading } from "./ui/SectionHeading";

type Row = { a: string; b: string; tone?: "ok" | "warn" };
const TABS: { id: string; title: string; desc: string; kpis: [string, string][]; rows: Row[] }[] = [
  {
    id: "rendiconti", title: "Rendiconti", desc: "Spese divise per voce e millesimi, fatture scaricabili, estratto conto personale.",
    kpis: [["Saldo cassa", "€ 18.420"], ["Rate incassate", "94%"], ["Spese anno", "€ 41.300"]],
    rows: [{ a: "Pulizie scale · ottobre", b: "€ 380" }, { a: "Energia parti comuni", b: "€ 612" }, { a: "Manutenzione ascensore", b: "€ 245" }, { a: "Rata 4/6 · interno 3", b: "Pagata", tone: "ok" }],
  },
  {
    id: "segnalazioni", title: "Segnalazioni", desc: "Un guasto si segnala in 30 secondi, con foto, e si segue fino alla chiusura.",
    kpis: [["Aperte", "2"], ["Chiuse nel mese", "7"], ["Tempo medio", "36 h"]],
    rows: [{ a: "Luce cortile spenta", b: "In corso", tone: "warn" }, { a: "Perdita garage box 4", b: "Tecnico fissato", tone: "warn" }, { a: "Citofono interno 8", b: "Risolta", tone: "ok" }, { a: "Cancello automatico", b: "Risolta", tone: "ok" }],
  },
  {
    id: "assemblee", title: "Assemblee", desc: "Convocazione, deleghe e voto da remoto. Il verbale arriva in giornata.",
    kpis: [["Prossima", "14 nov"], ["Deleghe", "5"], ["Quorum", "612‰"]],
    rows: [{ a: "Approvazione rendiconto 2025", b: "OdG 1" }, { a: "Preventivo facciata", b: "OdG 2" }, { a: "Studio fotovoltaico", b: "OdG 3" }, { a: "Varie ed eventuali", b: "OdG 4" }],
  },
  {
    id: "consumi", title: "Consumi", desc: "Consumi comuni confrontati con l'anno precedente, con i consigli degli energy manager.",
    kpis: [["kWh mese", "1.840"], ["vs 2025", "−12%"], ["Costo medio", "0,24 €"]],
    rows: [{ a: "Illuminazione scale", b: "−18%", tone: "ok" }, { a: "Ascensore", b: "−4%", tone: "ok" }, { a: "Autoclave", b: "+2%", tone: "warn" }, { a: "Cancelli e citofoni", b: "−9%", tone: "ok" }],
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <section id="portale" aria-labelledby="showcase-title" className="bg-surface2 py-24">
      <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <SectionHeading id="showcase-title" eyebrow="Il portale dei condòmini" title="Ogni documento, a portata di telefono." />
          <div role="tablist" aria-label="Funzioni del portale" className="flex flex-col gap-1.5">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls="portale-demo"
                onClick={() => setActive(i)}
                className={cn("flex flex-col gap-1 rounded-lg border-0 px-[18px] py-4 text-left text-ink", i === active ? "bg-surface" : "bg-transparent hover:bg-surface/60")}
              >
                <span className="text-[16px] font-bold">{t.title}</span>
                <span className="text-[14.5px] leading-[1.5] text-body">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <div id="portale-demo" role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="overflow-hidden rounded-xl border border-[#d9ccb8] bg-surface">
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-3 text-[13px] text-body">
            <span className="rounded bg-accent px-2 py-1 text-[11px] font-bold tracking-[0.12em] text-white">DEMO</span>
            <span>Dati di esempio · condominio fittizio</span>
          </div>
          <div className="flex flex-col gap-5 p-7">
            <h3 className="m-0 text-[26px] leading-[1.2]">{tab.title}</h3>
            <dl className="m-0 grid grid-cols-3 gap-3">
              {tab.kpis.map(([l, v]) => (
                <div key={l} className="flex flex-col gap-1.5 rounded-lg bg-bg p-4">
                  <dt className="text-[12.5px] text-body">{l}</dt>
                  <dd className="m-0 font-display text-[24px] font-semibold leading-none">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="m-0 list-none p-0">
              {tab.rows.map((r) => (
                <li key={r.a} className="flex justify-between gap-4 border-b border-[#eee5d8] py-3 text-[14.5px] last:border-b-0">
                  <span>{r.a}</span>
                  <span className={cn("font-bold", r.tone === "ok" && "text-salvia", r.tone === "warn" && "text-accent")}>{r.b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
