/** Energia: edificio 3D (three.js) guidato dallo scorrimento. I testi restano HTML, leggibili da Google. */
const STEPS = [
  { t: "Diagnosi, piano per piano", d: "Leggiamo i consumi delle parti comuni e di ogni appartamento che aderisce." },
  { t: "Fotovoltaico sul tetto", d: "Un impianto da 30 kWp produce a Bologna circa 36.000 kWh l'anno." },
  { t: "Energia condivisa", d: "Con una Comunità Energetica l'energia va agli appartamenti e ai vicini, e genera incentivi." },
  { t: "Il risparmio, in assemblea", d: "Portiamo i numeri del vostro edificio: costi, incentivi e anni di rientro." },
];
const label = "pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-[6px] px-3 py-2 opacity-0";

export function Energy() {
  return (
    <section id="energia" data-fx="energy" aria-labelledby="energy-title" className="relative h-[340vh] bg-ink text-bg">
      <div className="sticky top-0 grid h-[100svh] auto-rows-[minmax(0,1fr)] overflow-hidden lg:grid-cols-[1.1fr_1fr]">
        <div data-fx="stage3d" className="relative min-h-0 min-w-0" aria-hidden="true">
          <div data-fx="label" className={`${label} bg-bg text-[14px] font-bold text-ink`}>≈ 36.000 kWh l'anno</div>
          <div data-fx="label" className={`${label} bg-accent text-[14px] font-bold text-white`}>Energia condivisa · CER</div>
          <div data-fx="label" className={`${label} bg-bg font-display text-[22px] font-semibold text-ink`}>Bollette comuni più leggere</div>
        </div>
        <div className="flex min-h-0 flex-col justify-center gap-[18px] px-[clamp(24px,4vw,64px)] py-8">
          <p className="eyebrow m-0 !text-accent-soft">Energia · in collaborazione con Eniminds</p>
          <h2 id="energy-title" className="m-0 text-[clamp(30px,3.4vw,48px)] leading-[1.08] !text-bg">Bollette più leggere, numeri alla mano.</h2>
          <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
            {STEPS.map((s, i) => (
              <li key={s.t} data-fx="estep" className="flex gap-4 opacity-35 transition-opacity duration-[400ms]">
                <span className="min-w-7 font-display text-[26px] font-semibold leading-none text-accent-soft">{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <strong className="text-[17px]">{s.t}</strong>
                  <span data-fx="edesc" className="text-[15px] leading-[1.5] text-on-dark">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="m-0 text-[12.5px] text-on-dark-muted">Esempio illustrativo: produzione, risparmi e incentivi si calcolano sul vostro edificio.</p>
        </div>
      </div>
    </section>
  );
}
