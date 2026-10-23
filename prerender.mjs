// Dopo la build: scrive l'HTML completo della pagina dentro dist/index.html,
// così Google legge tutti i testi senza eseguire JavaScript.
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const file = path.resolve("dist/index.html");
const template = fs.readFileSync(file, "utf8");
const { render } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);
const html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
if (html === template) throw new Error("prerender: segnaposto #root non trovato");
fs.writeFileSync(file, html);
fs.rmSync("dist-ssr", { recursive: true, force: true });
console.log("prerender: dist/index.html generato con il contenuto completo");
