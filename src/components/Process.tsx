import castelBritti from "@/assets/castel-britti.webp";
import porticoSantostefano from "@/assets/portico-santostefano.webp";
import porticoSanLuca from "@/assets/portico-sanluca.webp";
import teamStudio from "@/assets/team-studio.webp";
import { CONTAINER } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";

const STEPS = [
  { when: "Giorno 1", t: "Il primo parere", d: "Ci raccontate il condominio. Valutiamo conti, contratti e stato dell'edificio, senza impegno.", img: teamStudio, alt: "Lo studio durante una consulenza" },
  { when: "Entro 48 ore", t: "Il preventivo", d: "Un'offerta analitica, voce per voce, pronta per il consiglio e l'assemblea.", img: porticoSantostefano, alt: "Arcate del portico di Santo Stefano a Bologna" },
  { when: "Prima assemblea", t: "La nomina", d: "Vi affianchiamo in convocazione e delibera, con le maggioranze previste dall'art. 1136 c.c.", img: porticoSanLuca, alt: "Il portico di San Luca a Bologna" },
  { when: "Entro 30 giorni", t: "Le consegne", d: "Recuperiamo documenti e contabilità dal precedente amministratore e attiviamo l'app per tutti.", img: castelBritti, alt: "Castel de' Britti, sul territorio servito dallo studio" },
];

export function Process() {
  return (
    <section id="come-funziona" aria-labelledby="process-title" className="py-24">
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        <SectionHeading
          id="process-title"
          eyebrow="Come iniziamo"
          title="Cambiare amministratore, in quattro passi."
          description="Seguiamo noi l'intero percorso. A voi resta solo la scelta."
        />
        <ol className="m-0 grid list-none gap-7 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.t} className="flex flex-col gap-4">
              <img src={s.img} alt={s.alt} loading="lazy" decoding="async" data-fx="tilt" className="will-change-transform block aspect-[4/3] w-full rounded-[120px_120px_6px_6px] object-cover" />
              <p className="m-0 text-[13px] font-bold uppercase tracking-[0.1em] text-salvia">{s.when}</p>
              <h3 className="m-0 text-[26px] leading-[1.15]">{s.t}</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-body">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
