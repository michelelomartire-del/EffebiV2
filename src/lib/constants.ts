export const SITE_URL = "https://www.effebiamministrazioni.it";

/** Telefono volutamente non pubblicato: si contatta lo studio dal modulo o via email. */
export const CONTACT = {
  formAnchor: "#form-contatto",
  email: "info@effebiamministrazioni.it",
  emailHref: `mailto:info@effebiamministrazioni.it?subject=${encodeURIComponent("Richiesta preventivo amministrazione condominiale")}`,
  street: "Via Emilia 168",
  city: "40068 San Lazzaro di Savena (BO)",
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Via Emilia 168, 40068 San Lazzaro di Savena BO")}`,
  hours: "Lunedì–giovedì · 8:30–17:00",
};

export const BRAND = {
  name: "EffeBi",
  full: "EffeBi Amministrazioni Condominiali",
  legal: "Studio EffeBi Amministrazioni Condominiali",
  vat: "03659601201",
  payoff: "Il condominio, finalmente trasparente.",
};

export const AREAS = [
  "Bologna",
  "San Lazzaro di Savena",
  "Ozzano dell'Emilia",
  "Castel San Pietro Terme",
  "Castenaso",
  "Pianoro",
  "Casalecchio di Reno",
];

/** Web3Forms: chiave di invio del modulo. */
export const WEB3FORMS_ACCESS_KEY = "b2d6d883-85e1-4d93-9811-47e65cb0a9b2";

export const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy.html" },
  { label: "Cookie policy", href: "/privacy.html#cookie" },
];

export const LISTINGS = {
  paginegialle: "https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena",
  paginegialleReviews: "https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena#recensioni",
  paginebianche: "https://www.paginebianche.it/scheda/studioeffebiamministrazionicondominiali-sanlazzarodisavena-80f1cd87-a9be-4021-b79e-9c93db18d5e1",
};

export const RATING = { value: 5, display: "5,0", count: 2 };

export const NAV_LINKS = [
  { id: "chi-siamo", label: "Chi siamo" },
  { id: "portale", label: "Portale" },
  { id: "energia", label: "Energia" },
  { id: "prezzi", label: "Prezzi" },
  { id: "contatti", label: "Contatti" },
];

/** Listino reale, IVA esclusa, per unità immobiliare e anno. */
export const PLANS = [
  {
    id: "essenziale", name: "Essenziale", price: 100, popular: false,
    tagline: "Ordine e conti sempre in regola.",
    features: ["Contabilità, preventivo e rendiconto annuale", "Assemblea ordinaria, in presenza o online", "Portale e app condòmini 24/7", "Pagamento digitale delle rate", "Registri obbligatori digitali", "Assistenza in orario d'ufficio"],
  },
  {
    id: "completo", name: "Completo", price: 130, popular: true,
    tagline: "Manutenzioni ed emergenze sotto controllo.",
    features: ["Tutto il piano Essenziale", "Fino a 2 assemblee straordinarie", "Manutenzioni con ticket e foto", "Reperibilità h24 per le emergenze", "Controllo bollette e contratti fornitori", "Recupero crediti stragiudiziale", "Report trimestrale per il consiglio"],
  },
  {
    id: "energia-plus", name: "Energia+", price: 170, popular: false,
    tagline: "Risparmio energetico e valore per l'edificio.",
    features: ["Tutto il piano Completo", "Diagnosi energetica con Eniminds", "Rinegoziazione forniture luce e gas", "Monitoraggio dei consumi", "Studio fotovoltaico e Comunità Energetica", "Consulenza su bonus e pratiche edilizie", "Referente dedicato"],
  },
] as const;

export const CONTAINER = "mx-auto w-full max-w-[1280px] px-6";
export const SECTION = "py-24";
