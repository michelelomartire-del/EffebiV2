import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Curva firma della pagina. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.5, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Entra in scena quando copre lo schermo, una sola volta. Con reduced motion
 * il contenuto non viene mai nascosto: il fallback è la pagina finita.
 * Qui non si usa mai opacity: il testo è visibile mentre entra (solo traslazione).
 */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y }}
      whileInView={{ y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

/** Genitore che scagliona l'entrata dei figli (titolo → testo → immagine). */
export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function StaggerItem({ children, className, variants = fadeUp }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
