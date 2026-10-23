import heroImg from "@/assets/hero-building.webp";
import { BRAND, RATING } from "@/lib/constants";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/motion";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto grid w-full max-w-[1280px] items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2">
      <Reveal className="flex flex-col gap-7">
        <p className="eyebrow m-0">Bologna · San Lazzaro di Savena · Ozzano · Castel San Pietro</p>
        <h1 id="hero-title" className="m-0 text-display font-medium italic tracking-[-0.01em]">
          {BRAND.payoff}
          <span className="sr-only"> EffeBi, amministratore di condominio a Bologna e provincia.</span>
        </h1>
        <p className="m-0 max-w-[52ch] text-[19px] leading-[1.6] text-body">
          Amministrazione condominiale a Bologna e provincia. Conti leggibili, risposte rapide e un solo interlocutore:
          Francesca Borelli, con architetti, ingegneri e termotecnici in studio.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="#form-contatto" size="lg">Richiedi un parere gratuito</ButtonLink>
          <ButtonLink href="#prezzi" variant="quiet" size="lg">Vedi il listino</ButtonLink>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 border-t border-line p-0 pt-4 text-small text-body">
          <li><strong className="text-ink">{RATING.display} su 5</strong> · recensioni PagineGialle</li>
          <li><strong className="text-ink">Primo parere</strong> gratuito</li>
          <li><strong className="text-ink">Preventivo</strong> entro 48 ore</li>
        </ul>
      </Reveal>
      <div className="relative mx-auto w-full max-w-[480px]">
        <img
          src={heroImg}
          alt="Facciata di un condominio con portici a Bologna"
          width={768}
          height={1376}
          fetchPriority="high"
          decoding="async"
          className="arch block aspect-[4/5] w-full object-cover"
        />
        <figure className="absolute -left-6 bottom-8 m-0 max-w-[240px] rounded-lg bg-ink p-5 text-small text-bg">
          <blockquote className="m-0">«Professionalità, presenza costante e trasparenza assoluta.»</blockquote>
          <figcaption className="mt-1 text-[12px] text-on-dark-muted">Calypso I. · PagineGialle</figcaption>
        </figure>
      </div>
    </section>
  );
}
