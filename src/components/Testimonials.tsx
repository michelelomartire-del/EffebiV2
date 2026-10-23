import { CONTAINER, LISTINGS, RATING } from "@/lib/constants";
import { REVIEWS } from "@/lib/reviews";
import { SectionHeading } from "./ui/SectionHeading";

export function Testimonials() {
  return (
    <section id="recensioni" aria-labelledby="testimonials-title" className="py-24">
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2`}>
        <div className="flex flex-col gap-5">
          <SectionHeading id="testimonials-title" eyebrow="Recensioni" title="Cosa dicono i condòmini." />
          <p className="m-0 flex flex-wrap items-baseline gap-3">
            <span data-fx="rise" className="font-display text-[64px] font-semibold leading-none text-accent">{RATING.display}</span>
            <span className="text-[15px] text-body">
              su 5 · {RATING.count} recensioni verificate su{" "}
              <a href={LISTINGS.paginegialleReviews} target="_blank" rel="noopener noreferrer">PagineGialle</a>
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.id} className="m-0 flex flex-col gap-4 rounded-xl border border-line bg-surface p-8">
              <blockquote className="m-0 font-display text-[21px] font-medium italic leading-[1.5]">
                «{r.segments.map((s, i) => (s.hl ? <strong key={i} className="font-medium text-accent">{s.t}</strong> : <span key={i}>{s.t}</span>))}»
              </blockquote>
              <figcaption className="text-small text-body">
                <strong className="text-ink">{r.author}</strong> · {r.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
