import { CONTAINER, PLANS } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { SectionHeading } from "./ui/SectionHeading";

export function Pricing() {
  return (
    <section id="prezzi" aria-labelledby="pricing-title" className="bg-surface py-24">
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        <SectionHeading
          id="pricing-title"
          eyebrow="Listino"
          title="Tre piani, prezzi scritti."
          description="Prezzo per unità immobiliare all'anno, IVA esclusa. Quello che leggete qui è quello che si delibera in assemblea."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <article key={p.id} className={cn("flex flex-col gap-[18px] rounded-xl border p-8", p.popular ? "border-accent bg-bg" : "border-line bg-surface")}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="m-0 text-[28px] leading-none">{p.name}</h3>
                {p.popular ? <span className="rounded bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">Il più scelto</span> : null}
              </div>
              <p className="m-0">
                <span data-fx="rise" className="font-display text-[52px] font-semibold leading-none text-accent">{p.price} €</span>
                <span className="text-small text-body"> / unità · anno, IVA esclusa</span>
              </p>
              <p className="m-0 text-[16px] text-body">{p.tagline}</p>
              <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-line p-0 pt-[18px] text-[15px] leading-[1.45]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5"><span aria-hidden="true" className="font-bold text-salvia">✓</span>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
