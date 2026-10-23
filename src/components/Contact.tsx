import { useState, type FormEvent } from "react";
import stradaMaggiore from "@/assets/strada-maggiore.webp";
import { BRAND, CONTACT, CONTAINER, WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";
const EMPTY = { nome: "", email: "", condominio: "", unita: "", messaggio: "", consenso: false };

const field = "w-full min-w-0 rounded-[6px] border border-[#d9ccb8] bg-[#fbf8f3] px-3.5 py-3 text-[16px] text-ink focus:border-accent focus:outline-none";
const label = "flex flex-col gap-1.5 text-[14px] font-medium";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(EMPTY);
  const set = (k: keyof typeof EMPTY) => (e: { target: { type?: string; checked?: boolean; value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? Boolean(e.target.checked) : e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Richiesta dal sito — ${BRAND.full}`,
          from_name: form.nome,
          nome: form.nome,
          email: form.email,
          condominio: form.condominio,
          unita: form.unita,
          messaggio: form.messaggio,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && data?.success) {
        setStatus("sent");
        setForm(EMPTY);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contatti" aria-labelledby="contact-title" className="py-24">
      <div className={`${CONTAINER} grid gap-14 lg:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="contact-title"
            eyebrow="Contatti"
            title="Parliamone in studio."
            description="Il primo parere è gratuito. Raccontateci il condominio: vi diciamo come lo gestiremmo, anche se oggi ha un altro amministratore."
          />
          <address className="flex flex-col gap-1.5 text-[16px] not-italic leading-[1.6]">
            <a href={CONTACT.emailHref} className="font-bold">{CONTACT.email}</a>
            <span>{CONTACT.street} · {CONTACT.city}</span>
            <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" className="text-small">Apri in mappa</a>
            <span className="text-body">{CONTACT.hours}</span>
          </address>
          <img src={stradaMaggiore} alt="Strada Maggiore a Bologna, sotto i portici" loading="lazy" decoding="async" data-fx="tilt" className="arch hidden aspect-[4/5] w-full max-w-[360px] object-cover lg:block" />
        </div>

        <form id="form-contatto" onSubmit={onSubmit} className="flex scroll-mt-24 flex-col gap-[18px] self-start rounded-xl border border-line bg-surface p-7 sm:p-9">
          <label className={label}>Nome e cognome<input name="nome" required autoComplete="name" value={form.nome} onChange={set("nome")} className={field} /></label>
          <label className={label}>Email<input name="email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={field} /></label>
          <div className="grid grid-cols-[2fr_1fr] gap-3.5">
            <label className={label}>Indirizzo del condominio<input name="condominio" required autoComplete="street-address" value={form.condominio} onChange={set("condominio")} className={field} /></label>
            <label className={label}>Unità<input name="unita" type="number" min={2} max={300} value={form.unita} onChange={set("unita")} className={field} /></label>
          </div>
          <label className={label}>Come possiamo aiutarvi?<textarea name="messaggio" rows={4} required value={form.messaggio} onChange={set("messaggio")} className={`${field} resize-y`} /></label>
          <label className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-body">
            <input type="checkbox" required checked={form.consenso} onChange={set("consenso")} className="mt-[3px] size-4 shrink-0 accent-[#b4532f]" />
            <span>
              Ho letto l'<a href="/privacy.html" target="_blank" rel="noopener">informativa privacy</a> e acconsento al
              trattamento dei dati per essere ricontattato. I dati restano allo studio e non vengono ceduti a terzi.
            </span>
          </label>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
          <Button type="submit" size="lg" className="self-start" disabled={status === "sending"}>
            {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
          </Button>
          <p aria-live="polite" className="m-0 min-h-6 text-small">
            {status === "sent" && <span className="text-salvia">Richiesta inviata. Vi rispondiamo entro un giorno lavorativo.</span>}
            {status === "error" && (
              <span className="text-accent">
                Invio non riuscito. Scriveteci direttamente a <a href={CONTACT.emailHref}>{CONTACT.email}</a>.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
