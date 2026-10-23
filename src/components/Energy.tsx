import energyRooftop from "@/assets/energy-rooftop.webp";
import { CONTAINER } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";

const POINTS = [
  "Diagnosi energetica e rinegoziazione luce e gas",
  "Studio di fattibilità fotovoltaico e Comunità Energetica",
  "Bonus fiscali e pratiche edilizie, con i tecnici dello studio",
];

export function Energy() {
  return (
    <section id="energia" aria-labelledby="energy-title" className="bg-ink py-24 text-bg">
      <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
        <img src={energyRooftop} alt="Tetto di un condominio con impianto fotovoltaico" loading="lazy" decoding="async" className="block aspect-[3/2] w-full rounded-[10px] object-cover" />
        <div className="flex flex-col gap-6">
          <SectionHeading
            dark
            id="energy-title"
            eyebrow="Energia · in collaborazione con Eniminds"
            title="Bollette più leggere, numeri alla mano."
            description="Gli energy manager di Eniminds analizzano le forniture delle parti comuni e portano in assemblea proposte con costi e ritorno chiari."
          />
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[16px] text-bg">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3"><span aria-hidden="true" className="text-accent-soft">—</span>{p}</li>
            ))}
          </ul>
          <p className="m-0 text-[13px] text-on-dark-muted">I risparmi effettivi variano da edificio a edificio: li calcoliamo sul vostro.</p>
        </div>
      </div>
    </section>
  );
}
