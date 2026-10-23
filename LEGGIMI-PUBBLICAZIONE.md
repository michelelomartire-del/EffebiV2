# Sito EffeBi v2 — come pubblicarlo

Questa cartella replica la struttura del repository `michelelomartire-del/EffeBi`.
Ogni file va copiato nello stesso percorso del repository, sostituendo quello esistente.

## 1. File da CARICARE (sostituiscono gli esistenti)
- `index.html`, `package.json`, `vite.config.ts`
- `prerender.mjs` (nuovo)
- `src/main.tsx`, `src/entry-server.tsx` (nuovo), `src/App.tsx`, `src/index.css`
- `src/lib/constants.ts`
- tutti i file in `src/components/` e `src/components/ui/`
- `src/assets/*.webp` (nuove foto ottimizzate: da 4,2 MB a 1,3 MB)
- cartella `public/` (nuova): favicon, icone, immagine social, robots.txt, sitemap.xml, privacy.html

## 1b. Animazioni 3D (v3)
- Nuovi file: `src/lib/fx.ts`, `src/components/PorticoIntro.tsx`, `src/components/ScrollFx.tsx`. Aggiornati: `Energy.tsx`, `App.tsx`, `Hero.tsx`, `Process.tsx`, `Contact.tsx`, `Quota.tsx`, `Pricing.tsx`, `Testimonials.tsx`, `package.json` (aggiunto three.js).
- three.js viene incluso nel sito, non caricato da servizi esterni: nessun impatto su privacy e cookie.

## 2. File da ELIMINARE dal repository
- `package-lock.json`: viene rigenerato automaticamente con le nuove dipendenze
- `src/assets/*.jpg`: sostituite dalle .webp
- `src/components/ShowcasePanels.tsx`
- `src/components/ui/Counter.tsx`, `src/components/ui/OpenStatus.tsx`, `src/components/ui/Stars.tsx`
- cartella `Brandbook/`: non va pubblicata con il sito, conservala altrove

Restano invariati: `src/lib/reviews.ts`, `src/utils/cn.ts`, `src/components/ui/motion.tsx`, `src/vite-env.d.ts`, `tsconfig.json`, `.gitignore`, `.gitattributes`, `src/assets/credits.json`.

## 3. Cosa cambia per Google (SEO)
- Il comando `npm run build` ora scrive tutto il testo della pagina direttamente nell'HTML. Prima la pagina arrivava vuota: Google vedeva solo il titolo.
- Indirizzo canonico, anteprime social e dati strutturati puntano a `https://www.effebiamministrazioni.it`.
- Ci sono `robots.txt`, `sitemap.xml`, l'immagine social e la favicon con i tre archi.
- I caratteri sono ospitati dentro il sito: niente richieste a Google Fonts, sito più veloce e nessun cookie di terzi.

## 4. Vercel e dominio
1. In Vercel → Project → Settings → Build: Framework "Vite", build command `npm run build`, output `dist` (sono i valori predefiniti).
2. In Settings → Domains: aggiungi `www.effebiamministrazioni.it` e `effebiamministrazioni.it`, con reindirizzamento verso www. Poi imposta i record DNS che Vercel ti indica presso il registrar del dominio.
3. Dopo la pubblicazione, apri [Google Search Console](https://search.google.com/search-console), verifica il dominio e invia `https://www.effebiamministrazioni.it/sitemap.xml`.

## 5. Privacy e cookie: soluzione gratuita
- Il sito **non ha cookie di profilazione né statistiche** e non carica servizi esterni. In questa situazione basta un'informativa e **non serve il banner dei cookie** (Linee guida cookie del Garante, 10 giugno 2021).
- L'informativa è in `public/privacy.html`, già collegata al footer e al modulo. Non serve un servizio a pagamento come iubenda.
- **Da verificare** (non sono un legale): ragione sociale del titolare e tempi di conservazione. È consigliabile farla rileggere dal consulente dello studio.
- Se in futuro aggiungi Google Analytics, mappe incorporate o pixel social, servono un banner di consenso e un aggiornamento dell'informativa. Esistono soluzioni gratuite, come il piano free di iubenda o CookieYes, oppure Klaro (open source).

## 6. Web3Forms
Nella dashboard di Web3Forms imposta come email di destinazione `info@effebiamministrazioni.it`. La chiave resta la stessa.
