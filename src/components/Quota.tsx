import { useState } from "react";
import { CONTAINER, PLANS } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { ButtonLink } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

const eur = (v: number) => v.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function Quota() {
  const [planIdx, setPlanIdx] = useState(1);
  const [units, setUnits] = useState(12);
  const plan = PLANS[planIdx];
  return (
    <section id="quota" aria-labelledby="quota-title" className="py-24">
      <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2`}>
        <div className="flex flex-col gap-7">
          <SectionHeading
            id="quota-title"
            eyebrow="Calcola la quota"
            title="Quanto costa il vostro condominio."
            description="Scegli il piano e muovi il cursore: è il compenso annuale dello studio, calcolato sul listino reale."
          />
          <fieldset className="m-0 border-0 p-0">
            <legend className="sr-only">Piano di amministrazione</legend>
            <div className="flex flex-wrap gap-2">
              {PLANS.map((p, i) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex min-h-12 items-center rounded-[6px] border px-[18px] text-[15px] font-bold",
                    i === planIdx ? "border-accent bg-accent text-white" : "border-[#d9ccb8] bg-surface text-ink hover:border-ink"
                  )}
                >
                  <input type="radio" name="piano" value={p.id} checked={i === planIdx} onChange={() => setPlanIdx(i)} className="sr-only" />
                  {p.name} · {p.price} €
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex max-w-[520px] flex-col gap-2.5">
            <div className="flex justify-between text-[16px]">
              <label htmlFor="units-range">Unità immobiliari</label>
              <output htmlFor="units-range" className="font-bold tabular-nums">{units}</output>
            </div>
            <input
              id="units-range"
              type="range"
              min={2}
              max={120}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              aria-valuetext={`${units} unità immobiliari`}
              className="w-full accent-[#b4532f]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-10" aria-live="polite">
          <span className="text-small text-body">Totale annuale, piano {plan.name}</span>
          <span data-fx="rise" className="self-start font-display text-[clamp(52px,7vw,84px)] font-semibold leading-none text-accent tabular-nums">{eur(plan.price * units)}</span>
          <span className="text-small text-body">IVA esclusa · {units} unità × {plan.price} €</span>
          <ButtonLink href="#form-contatto" className="mt-4 self-start">Richiedi il preventivo</ButtonLink>
          <p className="m-0 mt-2 text-[13px] leading-[1.5] text-body">
            Manutenzioni, fornitori e imposte sono spese del condominio: restano nei rendiconti, separate dal compenso.
          </p>
        </div>
      </div>
    </section>
  );
}
