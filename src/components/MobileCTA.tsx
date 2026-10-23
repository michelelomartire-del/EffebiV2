import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";

/** Barra di conversione per smartphone: compare dopo l'apertura, sparisce vicino al modulo. */
export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const past = window.scrollY > window.innerHeight * 0.85;
      const contact = document.getElementById("contatti");
      const near = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(past && !near);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={CONTACT.formAnchor} className="flex h-12 items-center justify-center rounded-[6px] bg-accent text-[16px] font-bold text-white no-underline shadow-lg">
        Preventivo gratuito
      </a>
    </div>
  );
}
