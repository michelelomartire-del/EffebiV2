// @ts-nocheck
import { Fragment, useEffect, useRef, useState } from "react";
import { initPortal, portalVals } from "@/lib/portal3d";

/** Portale: edificio 3D interattivo con quattro viste (rendiconti, segnalazioni, consumi, assemblee). Dati di esempio. */
export function Showcase() {
  const [state, setRaw] = useState({ pLayer: 0, pSel: null, pExplode: false, pVote: "idle", pVoted: 0 });
  const ref = useRef(state);
  ref.current = state;
  const setState = (u) => setRaw((s) => ({ ...s, ...u }));
  const ctx = useRef({}).current;
  const hostRef = useRef(null), tipRef = useRef(null);
  useEffect(() => {
    ctx.dead = false;
    initPortal(hostRef.current, tipRef.current, () => ref.current, setState, ctx).catch((e) => console.warn("Portale 3D non disponibile", e));
    return () => { ctx.dead = true; clearInterval(ctx.vi); if (ctx.wait) ctx.wait.disconnect(); if (ctx.off) ctx.off(); };
  }, []);
  const { pLayers, pKpis, pLegend, pExplode, pExplodeBg, pToggleExplode, pReset, pEyebrow, pTitle, pSub, pRows, pHasBars, pBars, pHasSteps, pSteps, pIsVote, pYesW, pStartVote, pVoteLabel, pHasList, pList } = portalVals(state, setState, ctx);
  return (
    <section id="portale" style={{ background: "#e9dfd0", padding: "96px 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "32px", alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#b4532f" }}>Il portale dei condòmini</div>
            <h2 style={{ font: "600 clamp(34px,4vw,52px)/1.08 Newsreader,serif", margin: "0" }}>Il vostro condominio, come una casa di vetro.</h2>
          </div>
          <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#5a4d44", margin: "0", maxWidth: "56ch" }}>Ogni appartamento, ogni euro, ogni guasto e ogni voto, sull'edificio vero. Ruotatelo, toccate un interno, cambiate vista.</p>
        </div>
        <div role="tablist" aria-label="Viste del portale" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {pLayers.map((l, li) => (<Fragment key={li}>
            <button type="button" role="tab" aria-selected={l.sel} onClick={l.pick} style={{ border: `1px solid ${l.bd}`, background: l.bg, color: l.fg, padding: "12px 18px", borderRadius: "999px", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}><span style={{ font: "500 13px Newsreader,serif", opacity: ".7" }}>{l.n}</span>{l.t}</button>
          </Fragment>))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "stretch" }}>
          <div style={{ flex: "2 1 560px", minWidth: "0", background: "#2a211c", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "600px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: "1px solid #3d322b", fontSize: "13px", color: "#c9b8a6" }}>
              <span style={{ background: "#b4532f", color: "#fff", fontWeight: "700", letterSpacing: ".12em", fontSize: "11px", padding: "4px 8px", borderRadius: "4px" }}>DEMO</span>
              <span>portale.effebiamministrazioni.it · Condominio Via dei Tigli 12 · dati di esempio</span>
            </div>
            <div data-fx="portal3d" ref={hostRef} style={{ position: "relative", flex: "1", minHeight: "520px", cursor: "grab", touchAction: "pan-y" }}>
              <div style={{ position: "absolute", left: "16px", top: "16px", right: "16px", display: "flex", gap: "10px", flexWrap: "wrap", pointerEvents: "none", zIndex: "2" }}>
                {pKpis.map((k, ki) => (<Fragment key={ki}>
                  <div style={{ background: "rgba(246,241,233,.96)", color: "#2a211c", borderRadius: "10px", padding: "10px 14px", display: "flex", flexDirection: "column", gap: "4px", minWidth: "120px" }}>
                    <span style={{ fontSize: "11.5px", color: "#5a4d44", fontWeight: "500" }}>{k.l}</span>
                    <span style={{ font: "600 24px/1 Newsreader,serif", color: k.c }}>{k.v}</span>
                  </div>
                </Fragment>))}
              </div>
              <div data-fx="ptip" ref={tipRef} style={{ position: "absolute", left: "0", top: "0", opacity: "0", pointerEvents: "none", zIndex: "3", background: "#f6f1e9", color: "#2a211c", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(0,0,0,.25)", transition: "opacity .15s" }}></div>
              <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap", zIndex: "2" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", background: "rgba(42,33,28,.85)", borderRadius: "8px", padding: "8px 12px", fontSize: "12.5px", color: "#e4d9ca" }}>
                  {pLegend.map((g, gi) => (<Fragment key={gi}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "10px", height: "10px", borderRadius: "3px", background: g.c }}></span>{g.l}</span>
                  </Fragment>))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button type="button" onClick={pToggleExplode} aria-pressed={pExplode} style={{ border: "1px solid #5a4d44", background: pExplodeBg, color: "#f6f1e9", borderRadius: "999px", padding: "9px 14px", fontSize: "13px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>Apri i piani</button>
                  <button type="button" onClick={pReset} style={{ border: "1px solid #5a4d44", background: "transparent", color: "#f6f1e9", borderRadius: "999px", padding: "9px 14px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Centra</button>
                </div>
              </div>
            </div>
          </div>
          <aside aria-live="polite" style={{ flex: "1 1 320px", background: "#fff", borderRadius: "14px", padding: "28px", display: "flex", flexDirection: "column", gap: "18px", minWidth: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#6f7d5c" }}>{pEyebrow}</span>
              <h3 style={{ font: "600 28px/1.15 Newsreader,serif", margin: "0" }}>{pTitle}</h3>
              <p style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5a4d44", margin: "0" }}>{pSub}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pRows.map((r, ri) => (<Fragment key={ri}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "11px 0", borderBottom: "1px solid #eee5d8", fontSize: "14.5px" }}>
                  <span style={{ color: "#5a4d44" }}>{r.a}</span><span style={{ fontWeight: "700", color: r.c, textAlign: "right" }}>{r.b}</span>
                </div>
              </Fragment>))}
            </div>
            {pHasBars ? (<>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "12.5px", color: "#5a4d44" }}>Ultimi 6 mesi · kWh</span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "90px" }}>
                  {pBars.map((x, xi) => (<Fragment key={xi}>
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ width: "100%", height: x.h, background: x.c, borderRadius: "4px 4px 0 0", transition: "height .5s" }}></div>
                      <span style={{ fontSize: "11px", color: "#5a4d44" }}>{x.m}</span>
                    </div>
                  </Fragment>))}
                </div>
              </div>
            </>) : null}
            {pHasSteps ? (<>
              <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {pSteps.map((t, ti) => (<Fragment key={ti}>
                  <li style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "14.5px", color: t.fg }}><span style={{ width: "22px", height: "22px", borderRadius: "50%", background: t.dot, color: "#fff", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.i}</span>{t.l}</li>
                </Fragment>))}
              </ol>
            </>) : null}
            {pIsVote ? (<>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#5a4d44" }}><span>Favorevoli</span><span>maggioranza: 500‰</span></div>
                <div style={{ position: "relative", height: "14px", background: "#f1e8db", borderRadius: "7px", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: pYesW, background: "#6f7d5c", transition: "width .3s" }}></div>
                  <div style={{ position: "absolute", left: "50%", top: "-2px", bottom: "-2px", width: "2px", background: "#2a211c" }}></div>
                </div>
                <button type="button" onClick={pStartVote} style={{ alignSelf: "flex-start", background: "#b4532f", color: "#fff", border: "0", borderRadius: "6px", padding: "12px 18px", fontSize: "14.5px", fontWeight: "700", cursor: "pointer" }}>{pVoteLabel}</button>
              </div>
            </>) : null}
            {pHasList ? (<>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {pList.map((t, ti) => (<Fragment key={ti}>
                  <button type="button" onClick={t.pick} style={{ textAlign: "left", border: "1px solid #eee5d8", background: "#fbf8f3", borderRadius: "8px", padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#2a211c" }}><span>{t.t}</span><span style={{ fontWeight: "700", color: t.c }}>{t.s}</span></button>
                </Fragment>))}
              </div>
            </>) : null}
            <p style={{ fontSize: "12.5px", color: "#5a4d44", margin: "auto 0 0", lineHeight: "1.5" }}>Trascinate per ruotare. Ogni condòmino, nel portale vero, vede solo i propri dati e i totali del condominio.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
