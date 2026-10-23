import { useEffect } from "react";
import { initFx } from "@/lib/fx";

/** Avvia gli effetti di scorrimento dopo che la pagina è stata agganciata da React. */
export function ScrollFx() {
  useEffect(() => initFx(), []);
  return null;
}
