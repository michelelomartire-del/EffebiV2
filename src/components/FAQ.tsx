import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";

const FAQS = [
  ["Come si cambia amministratore di condominio?", "Serve una delibera dell'assemblea approvata dalla maggioranza degli intervenuti che rappresenti almeno 500 millesimi (art. 1136 c.c.). Vi affianchiamo dalla richiesta di convocazione al passaggio di consegne con il precedente amministratore."],
  ["Il primo incontro è gratuito?", "Sì. Analizziamo la situazione del condominio anche se oggi è gestito da un altro amministratore e, se lo desiderate, prepariamo un preventivo da presentare agli altri condòmini."],
  ["Cosa è incluso nel compenso?", "Dipende dal piano: da 100 € per unità all'anno. Alla nomina ricevete l'elenco analitico di tutte le voci (art. 1129 c.c.): nessun costo non concordato."],
  ["Dove consulto i documenti del condominio?", "Ogni condòmino ha un accesso personale a portale e app: rendiconti, verbali, fatture, regolamento ed estratto conto, 24 ore su 24."],
  ["Cosa succede in caso di guasto o emergenza?", "Aprite una segnalazione dall'app con foto e la seguite fino alla chiusura. Nei piani Completo ed Energia+ c'è la reperibilità h24 per le urgenze."],
  ["Come si riducono i costi energetici?", "Con Eniminds analizziamo le bollette delle parti comuni, rinegoziamo le forniture e valutiamo efficientamento, fotovoltaico e Comunità Energetiche, con costi e ritorno chiari in assemblea."],
  ["Le assemblee si possono fare online?", "Sì, se previsto dal regolamento o con il consenso della maggioranza (art. 66 disp. att. c.c.). Organizziamo assemblee online e ibride con verbale in giornata."],
  ["Gestite anche piccoli condomini?", "Sì. Fino a otto condòmini l'amministratore non è obbligatorio: proponiamo un servizio su misura a canone fisso."],
] as const;

/** Accordion: tutte le risposte sono nell'HTML (leggibili da Google), solo nascoste a vista. */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface py-24">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-9 px-6">
        <SectionHeading id="faq-title" eyebrow="Domande frequenti" title="Prima ancora di chiederci." />
        <div className="border-t border-line">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="border-b border-line">
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full justify-between gap-6 border-0 bg-transparent py-[22px] text-left font-display text-[22px] font-semibold leading-[1.3] text-ink"
                >
                  {q}
                  <span aria-hidden="true" className="text-[24px] leading-none text-accent">{open === i ? "−" : "+"}</span>
                </button>
              </h3>
              <p id={`faq-${i}`} hidden={open !== i} className="m-0 mb-6 max-w-[72ch] text-[16.5px] leading-[1.65] text-body">{a}</p>
            </div>
          ))}
        </div>
        <p className="m-0 text-[13px] text-body">Indicazioni pratiche, non consulenza legale: per il vostro caso chiedete in studio.</p>
      </div>
    </section>
  );
}
