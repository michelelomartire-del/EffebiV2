export type Segment = { t: string; hl?: boolean };

export type Review = {
  id: string;
  author: string;
  initials: string;
  title: string;
  context: string;
  source: "PagineGialle";
  /** Testo integrale della recensione, suddiviso per evidenziare i passaggi chiave (il testo non è modificato). */
  segments: Segment[];
};

/**
 * Recensioni reali pubblicate su PagineGialle, moderate e verificate dalla redazione.
 * Fonte: https://www.paginegialle.it/studioeffebiamministrazionicondominiali-sanlazzarodisavena#recensioni
 */
export const REVIEWS: Review[] = [
  {
    id: "calypso-i",
    author: "Calypso I.",
    initials: "CI",
    title: "Molto soddisfatti",
    context: "Condominio di 12 famiglie · clienti da circa 3 anni",
    source: "PagineGialle",
    segments: [
      { t: "La signora Francesca assiste il nostro condominio di 12 famiglie, da circa 3 anni con " },
      { t: "professionalità, presenza costante e trasparenza assoluta", hl: true },
      {
        t: ". Ci ha aiutato inizialmente a risolvere alcune problematiche (molto pesanti) derivanti dalla vecchia gestione con ",
      },
      { t: "precisione e correttezza estrema", hl: true },
      {
        t: ". Molti di noi si sono subito convinti che era la persona giusta per gestire non solo i nostri costi ma anche per ",
      },
      { t: "valorizzare al meglio il nostro immobile", hl: true },
      { t: ". Speriamo di continuare così." },
    ],
  },
  {
    id: "roberto-m",
    author: "Roberto M.",
    initials: "RM",
    title: "Molto bene",
    context: "Condòmino · parere gratuito e consulenza in studio",
    source: "PagineGialle",
    segments: [
      { t: "Ho incontrato l'Amministratrice la prima volta per un " },
      { t: "parere gratuito", hl: true },
      {
        t: " presso una associazione di quartiere. Successivamente presso il suo studio per una consulenza specifica sul mio caso piuttosto complesso che il mio attuale Amministratore non era interessato a risolvere. Ho ricevuto ",
      },
      { t: "risposte esaustive e immediate", hl: true },
      {
        t: ". Porterò sicuramente un suo preventivo per la gestione ordinaria del mio palazzo all'attenzione degli altri condòmini.",
      },
    ],
  },
];

/** Distribuzione delle valutazioni come riportata su PagineGialle. */
export const RATING_BREAKDOWN = [
  { label: "Eccellente", count: 2 },
  { label: "Ottimo", count: 0 },
  { label: "Buono", count: 0 },
  { label: "Discreto", count: 0 },
  { label: "Mediocre", count: 0 },
];

/** Le qualità citate dai clienti nelle recensioni. */
export const REVIEW_THEMES = [
  "Professionalità",
  "Presenza costante",
  "Trasparenza assoluta",
  "Precisione e correttezza",
  "Risposte esaustive e immediate",
  "Primo parere gratuito",
];
