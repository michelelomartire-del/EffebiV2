// @ts-nocheck
/* Portale 3D: dati di esempio, valori del pannello e scena three.js interattiva (trascina, tocca, apri i piani). */
let _pd = null;
export function pData() {
  if (_pd) return _pd;
  const sur = ['Rossi','Bianchi','Neri','Gallo','Ferri','Conti','Marchi','Serra','Testa','Villa','Greco','Bruni','Costa','Fabbri','Rinaldi','Barbieri','Lodi','Pace','Sala','Monti'];
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const units = []; let w = 0;
  for (let f = 1; f <= 5; f++) for (let k = 0; k < 4; k++) { const wt = (k < 2 ? 1.15 : 0.9) * (1 + f * 0.04); w += wt; units.push({ i: units.length, n: units.length + 1, f, k, fam: 'Fam. ' + sur[units.length][0] + '.', wt }); }
  const pay = { 3: 'due', 8: 'late', 11: 'due', 15: 'late', 17: 'due' };
  const votes = ['si','si','no','si','del','si','si','no','si','si','ast','si','no','si','si','del','si','no','si','si'];
  let acc = 0;
  units.forEach((u, i) => {
    u.mill = i === 19 ? 1000 - acc : Math.round(u.wt / w * 1000); if (i < 19) acc += u.mill;
    u.pay = pay[i] || 'ok'; u.kwh = Math.round(140 + rnd() * 260);
    u.hist = Array.from({ length: 6 }, () => Math.round(u.kwh * (0.72 + rnd() * 0.5))); u.vote = votes[i];
  });
  const tickets = [
    { i: 0, t: 'Infiltrazione dal tetto', where: 'Copertura', st: 2, at: 'roof' },
    { i: 1, t: 'Ascensore fermo al 3° piano', where: 'Vano ascensore · 3° piano', st: 1, at: 'core' },
    { i: 2, t: 'Luce autorimessa spenta', where: 'Autorimessa', st: 3, at: 'ground' },
    { i: 3, t: 'Citofono interno 10', where: 'Interno 10 · 3° piano', st: 0, at: 'unit', unit: 9 }
  ];
  const order = [4, 12, 0, 17, 9, 2, 15, 7, 19, 11, 5, 14, 1, 8, 18, 3, 10, 6, 16, 13];
  return (_pd = { units, tickets, order });
}
export function pColor(u, L, voted) {
  if (L === 0) return { ok: 0x6f7d5c, due: 0xd9b07a, late: 0xb4532f }[u.pay];
  if (L === 1) return u.i === 9 ? 0xd98a6a : 0xe9dfd0;
  if (L === 2) { const t = Math.min(1, Math.max(0, (u.kwh - 140) / 260)); const a = [0xf1, 0xe6, 0xd6], b = [0xb4, 0x53, 0x2f]; return a.map((v, j) => Math.round(v + (b[j] - v) * t)).reduce((x, v) => x * 256 + v, 0); }
  if (!voted.has(u.i)) return 0x6b5d53;
  return { si: 0x6f7d5c, del: 0x9aa886, no: 0xb4532f, ast: 0xb8aca0 }[u.vote];
}
export function pVoteStats(state) {
  const d = pData(), n = state.pVoted || 0, set = new Set(d.order.slice(0, n));
  let yes = 0, no = 0, ast = 0, mill = 0;
  d.units.forEach(u => { if (!set.has(u.i)) return; mill += u.mill; if (u.vote === 'si' || u.vote === 'del') yes += u.mill; else if (u.vote === 'no') no += u.mill; else ast += u.mill; });
  return { set, n, yes, no, ast, mill };
}
export function portalVals(state, setState, ctx) {
  const s = state, d = pData(), L = s.pLayer || 0, sel = s.pSel || null;
  const U = sel && sel[0] === 'u' ? d.units[+sel.slice(1)] : null, T = sel && sel[0] === 't' ? d.tickets[+sel.slice(1)] : null;
  const eur = v => '€ ' + Math.round(v).toLocaleString('it-IT');
  const ink = '#2a211c', ok = '#6f7d5c', warn = '#b4532f', due = '#8a6236';
  const payL = { ok: ['Pagata', ok], due: ['In scadenza', due], late: ['In ritardo', warn] };
  const voteL = { si: ['Favorevole', ok], del: ['Favorevole (delega)', ok], no: ['Contrario', warn], ast: ['Astenuto', '#5a4d44'] };
  const stepsL = ['Aperta', 'Tecnico assegnato', 'In lavorazione', 'Chiusa'];
  const V = pVoteStats(state), vs = s.pVote || 'idle';
  const names = ['Rendiconti', 'Segnalazioni', 'Consumi', 'Assemblee'];
  const r = { pLayers: names.map((t, i) => ({ t, n: '0' + (i + 1), sel: i === L, bg: i === L ? ink : '#fff', fg: i === L ? '#f6f1e9' : ink, bd: i === L ? ink : '#d9ccb8', pick: () => setState({ pLayer: i, pSel: null }) })) };
  const paid = d.units.filter(u => u.pay === 'ok').length, avg = Math.round(d.units.reduce((a, u) => a + u.kwh, 0) / 20);
  r.pKpis = [
    [{ l: 'Saldo cassa', v: '€ 18.420', c: ink }, { l: 'Rate pagate', v: paid + ' su 20', c: ok }, { l: 'In ritardo', v: '2', c: warn }],
    [{ l: 'Aperte', v: '3', c: warn }, { l: 'Chiuse nel mese', v: '7', c: ok }, { l: 'Tempo medio', v: '36 h', c: ink }],
    [{ l: 'Parti comuni', v: '1.840 kWh', c: ink }, { l: 'vs ottobre 2025', v: '−12%', c: ok }, { l: 'Media interni', v: avg + ' kWh', c: ink }],
    [{ l: 'Votanti', v: V.n + ' su 20', c: ink }, { l: 'Favorevoli', v: V.yes + '‰', c: ok }, { l: 'Esito', v: vs === 'done' ? (V.yes > 500 ? 'Approvato' : 'Respinto') : vs === 'running' ? 'In corso' : 'Da votare', c: vs === 'done' ? (V.yes > 500 ? ok : warn) : ink }]
  ][L];
  r.pLegend = [
    [{ c: '#6f7d5c', l: 'Pagata' }, { c: '#d9b07a', l: 'In scadenza' }, { c: '#b4532f', l: 'In ritardo' }],
    [{ c: '#b4532f', l: 'Segnalazione aperta' }, { c: '#6f7d5c', l: 'Chiusa' }],
    [{ c: '#f1e6d6', l: 'Consumo basso' }, { c: '#b4532f', l: 'Consumo alto' }],
    [{ c: '#6f7d5c', l: 'Favorevole' }, { c: '#b4532f', l: 'Contrario' }, { c: '#b8aca0', l: 'Astenuto' }, { c: '#6b5d53', l: 'Non ancora votato' }]
  ][L];
  r.pExplode = !!s.pExplode; r.pExplodeBg = s.pExplode ? '#b4532f' : 'transparent';
  r.pToggleExplode = () => setState({ pExplode: !s.pExplode });
  r.pReset = () => { setState({ pSel: null, pExplode: false }); if (ctx.reset) ctx.reset(); };
  r.pHasBars = false; r.pHasSteps = false; r.pIsVote = false; r.pHasList = false; r.pBars = []; r.pSteps = []; r.pList = []; r.pRows = [];
  r.pYesW = (V.yes / 10) + '%';
  r.pVoteLabel = vs === 'running' ? 'Votazione in corso…' : vs === 'done' ? 'Ripeti la votazione' : 'Avvia la votazione';
  r.pStartVote = () => {
    if (state.pVote === 'running') return;
    clearInterval(ctx.vi); setState({ pVote: 'running', pVoted: 0 });
    let n = 0;
    ctx.vi = setInterval(() => { n += 1; if (n >= 20) { clearInterval(ctx.vi); setState({ pVoted: 20, pVote: 'done' }); } else setState({ pVoted: n }); }, 260);
  };
  if (T) {
    r.pEyebrow = T.where; r.pTitle = T.t; r.pSub = 'Aperta dal condòmino dall\'app, con foto. Ogni passaggio arriva come notifica.';
    r.pHasSteps = true; r.pSteps = stepsL.map((l, i) => ({ l, i: i + 1, dot: i < T.st ? ok : i === T.st ? warn : '#d9ccb8', fg: i <= T.st ? ink : '#9b8f84' }));
    r.pRows = [{ a: 'Stato', b: stepsL[T.st], c: T.st === 3 ? ok : warn }, { a: 'Ticket', b: '#' + (2041 + T.i), c: ink }];
    return r;
  }
  if (U) {
    r.pEyebrow = 'Interno ' + U.n + ' · ' + U.f + '° piano'; r.pTitle = U.fam;
    if (L === 0) { r.pSub = 'Estratto conto personale, aggiornato a ogni pagamento.'; r.pRows = [{ a: 'Millesimi', b: U.mill + '‰', c: ink }, { a: 'Quota annuale', b: eur(U.mill * 41.3), c: ink }, { a: 'Rata 5 di 6', b: payL[U.pay][0], c: payL[U.pay][1] }, { a: 'Prossima scadenza', b: '30 novembre', c: ink }]; }
    if (L === 1) { const t = d.tickets.find(x => x.unit === U.i); r.pSub = t ? 'Una segnalazione aperta per questo interno.' : 'Nessuna segnalazione aperta per questo interno.'; r.pRows = t ? [{ a: t.t, b: stepsL[t.st], c: warn }] : [{ a: 'Segnalazioni aperte', b: 'Nessuna', c: ok }]; }
    if (L === 2) { const mx = Math.max(...U.hist); r.pSub = 'Consumo stimato dal contatore dell\'interno.'; r.pRows = [{ a: 'Ottobre', b: U.kwh + ' kWh', c: ink }, { a: 'Rispetto alla media', b: (U.kwh >= avg ? '+' : '−') + Math.abs(Math.round((U.kwh / avg - 1) * 100)) + '%', c: U.kwh > avg ? warn : ok }]; r.pHasBars = true; r.pBars = U.hist.map((v, j) => ({ h: Math.round(v / mx * 100) + '%', m: ['mag', 'giu', 'lug', 'ago', 'set', 'ott'][j], c: j === 5 ? '#b4532f' : '#d9ccb8' })); }
    if (L === 3) { const seen = V.set.has(U.i); r.pSub = 'Punto 3 · Studio fotovoltaico sul tetto.'; r.pRows = [{ a: 'Millesimi', b: U.mill + '‰', c: ink }, { a: 'Voto', b: seen ? voteL[U.vote][0] : 'In attesa', c: seen ? voteL[U.vote][1] : '#9b8f84' }, { a: 'Modalità', b: U.vote === 'del' ? 'Delega' : U.k % 2 ? 'Online' : 'In presenza', c: ink }]; }
    return r;
  }
  if (L === 0) { r.pEyebrow = 'Rendiconto 2026'; r.pTitle = 'Ogni euro, tracciato.'; r.pSub = 'Toccate un appartamento per vedere quota e stato dei pagamenti.'; r.pRows = [{ a: 'Pulizie scale', b: '€ 4.560', c: ink }, { a: 'Energia parti comuni', b: '€ 7.344', c: ink }, { a: 'Manutenzione ascensore', b: '€ 2.940', c: ink }, { a: 'Assicurazione fabbricato', b: '€ 3.120', c: ink }]; }
  if (L === 1) { r.pEyebrow = 'Segnalazioni'; r.pTitle = '3 aperte, 1 chiusa.'; r.pSub = 'Toccate un segnaposto sull\'edificio o una voce qui sotto.'; r.pHasList = true; r.pList = d.tickets.map(t => ({ t: t.t, s: stepsL[t.st], c: t.st === 3 ? ok : warn, pick: () => setState({ pSel: 't' + t.i }) })); }
  if (L === 2) { r.pEyebrow = 'Consumi · ottobre'; r.pTitle = 'Chi consuma, e quanto.'; r.pSub = 'Più è intenso il colore, più l\'interno consuma. Toccatene uno.'; r.pRows = [{ a: 'Illuminazione scale', b: '−18%', c: ok }, { a: 'Ascensore', b: '−4%', c: ok }, { a: 'Autoclave', b: '+2%', c: warn }]; r.pHasBars = true; r.pBars = [1620, 1580, 1490, 1710, 1930, 1840].map((v, j) => ({ h: Math.round(v / 1930 * 100) + '%', m: ['mag', 'giu', 'lug', 'ago', 'set', 'ott'][j], c: j === 5 ? '#b4532f' : '#d9ccb8' })); }
  if (L === 3) { r.pEyebrow = 'Assemblea · 14 novembre'; r.pTitle = 'Punto 3 · Fotovoltaico sul tetto.'; r.pSub = 'Voto in presenza e online, conteggiato in millesimi in tempo reale.'; r.pIsVote = true; r.pRows = [{ a: 'Favorevoli', b: V.yes + '‰', c: ok }, { a: 'Contrari', b: V.no + '‰', c: warn }, { a: 'Astenuti', b: V.ast + '‰', c: '#5a4d44' }]; }
  return r;
}
export async function initPortal(host, tip, getState, setState, ctx) {
    if (!host) return;
  await new Promise(res => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { o.disconnect(); res(); } }, { rootMargin: '400px' }); o.observe(host); ctx.wait = o; });
  if (ctx.dead) return;
  const THREE = await import('three');
  const d = pData(), mobile = innerWidth < 768;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = () => Math.max(1, host.clientWidth), H = () => Math.max(1, host.clientHeight);
  const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: mobile ? 'low-power' : 'default' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 2)); renderer.setSize(W(), H(), false);
  renderer.shadowMap.enabled = !mobile; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene(); const cam = new THREE.PerspectiveCamera(34, W() / H(), 0.1, 300);
  scene.add(new THREE.HemisphereLight(0xfff3e2, 0x2a211c, 1.0));
  const sun = new THREE.DirectionalLight(0xffe6c8, 1.5); sun.position.set(14, 26, 18); sun.castShadow = !mobile; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 20, bottom: -8, near: 1, far: 70 }); scene.add(sun);
  const rim = new THREE.DirectionalLight(0xd98a6a, 0.6); rim.position.set(-16, 10, -14); scene.add(rim);
  const root = new THREE.Group(); scene.add(root);
  const M = (c, o) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.8 }, o || {}));
  const mSlab = M(0xf1e6d6), mCore = M(0x4a3d35), mCol = M(0xb4532f), mGround = M(0x352a24, { roughness: 1 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(26, 72), mGround); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.01; ground.receiveShadow = true; root.add(ground);
  const ringG = new THREE.RingGeometry(9.8, 9.86, 96); const ringM = new THREE.MeshBasicMaterial({ color: 0x6b5d53, transparent: true, opacity: 0.6 });
  [9.8, 13, 17].forEach(rr => { const g = new THREE.Mesh(new THREE.RingGeometry(rr, rr + 0.05, 128), ringM); g.rotation.x = -Math.PI / 2; root.add(g); });
  const FH = 2.7, floors = [];
  const box = (w, h, dd, m, x, y, z, g) => { const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, dd), m); me.position.set(x, y, z); me.castShadow = me.receiveShadow = true; g.add(me); return me; };
  for (let f = 0; f <= 6; f++) { const g = new THREE.Group(); root.add(g); floors.push(g); }
  const g0 = floors[0];
  box(11.4, 0.25, 7.6, mSlab, 0, 0.12, 0, g0);
  box(10.6, 2.2, 5.4, M(0x5a4a40), 0, 1.35, -0.9, g0);
  for (let i = 0; i < 6; i++) box(0.45, 2.45, 0.45, mCol, -5.3 + i * 2.12, 1.45, 3.45, g0);
  const shopM = new THREE.MeshStandardMaterial({ color: 0x241b16, emissive: 0xffb36b, emissiveIntensity: 0.55 });
  for (let i = 0; i < 5; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.6), shopM); p.position.set(-4.24 + i * 2.12, 1.15, 1.86); g0.add(p); }
  const units = d.units.map(u => {
    const g = floors[u.f];
    const mat = new THREE.MeshStandardMaterial({ color: 0xe9dfd0, roughness: 0.45, metalness: 0.05, transparent: true, opacity: 0.92, emissive: 0x000000 });
    const me = box(4.55, 2.2, 3.15, mat, u.k % 2 ? 2.8 : -2.8, 0.25 + 1.1, u.k < 2 ? 1.75 : -1.75, g);
    const ed = new THREE.LineSegments(new THREE.EdgesGeometry(me.geometry), new THREE.LineBasicMaterial({ color: 0xf6f1e9, transparent: true, opacity: 0.45 }));
    me.add(ed); me.userData = { id: 'u' + u.i, u, col: new THREE.Color(0xe9dfd0) };
    return me;
  });
  for (let f = 1; f <= 5; f++) { box(11.4, 0.25, 7.6, mSlab, 0, 0.12, 0, floors[f]); box(0.9, 2.2, 2.6, mCore, 0, 1.35, 0, floors[f]); }
  const roof = floors[6]; box(11.6, 0.3, 7.8, mSlab, 0, 0.15, 0, roof);
  [[0, 0.55, 3.8, 11.6, 0.5, 0.2], [0, 0.55, -3.8, 11.6, 0.5, 0.2], [5.7, 0.55, 0, 0.2, 0.5, 7.8], [-5.7, 0.55, 0, 0.2, 0.5, 7.8]].forEach(([x, y, z, w, h, dd]) => box(w, h, dd, M(0xb4532f), x, y, z, roof));
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xb4532f, emissive: 0xb4532f, emissiveIntensity: 0.5, roughness: 0.4 });
  const pinOk = new THREE.MeshStandardMaterial({ color: 0x6f7d5c, emissive: 0x6f7d5c, emissiveIntensity: 0.4, roughness: 0.4 });
  const pins = d.tickets.map(t => {
    const g = new THREE.Group();
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), t.st === 3 ? pinOk : pinMat);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.9, 20), t.st === 3 ? pinOk : pinMat); cone.rotation.x = Math.PI; cone.position.y = -0.55;
    head.position.y = 0.3; g.add(head, cone);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.62, 40), new THREE.MeshBasicMaterial({ color: t.st === 3 ? 0x6f7d5c : 0xd98a6a, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = -1.05; g.add(ring);
    head.userData = { id: 't' + t.i, t };
    let parent = roof, pos = [-2.6, 1.9, 1.2];
    if (t.at === 'core') { parent = floors[3]; pos = [0, 3.4, 1.6]; }
    if (t.at === 'ground') { parent = g0; pos = [3.2, 3.2, 2.6]; }
    if (t.at === 'unit') { parent = floors[3]; pos = [2.8, 3.6, 3.4]; }
    g.position.set(...pos); parent.add(g); g.userData = { ring, head, base: pos[1] };
    return g;
  });
  const pick = units.concat(pins.map(p => p.userData.head));
  let rotY = 0.65, rotT = 0.65, phi = 0.42, phiT = 0.42, lastUser = 0, hover = null, running = false, raf = 0, last = performance.now(), time = 0, expl = 0;
  ctx.reset = () => { rotT = 0.65; phiT = 0.42; lastUser = performance.now(); };
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let down = null, moved = false;
  const el = renderer.domElement;
  const hit = e => { const r = el.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, cam); const L = getState().pLayer || 0; const cand = L === 1 ? pick : units; const h = ray.intersectObjects(cand, false)[0]; return h ? h.object : null; };
  const tipText = o => {
    const L = getState().pLayer || 0, V = pVoteStats(getState());
    if (o.userData.t) return o.userData.t.t + ' · ' + ['Aperta', 'Tecnico assegnato', 'In lavorazione', 'Chiusa'][o.userData.t.st];
    const u = o.userData.u, base = 'Int. ' + u.n + ' · ' + u.fam + ' · ';
    if (L === 0) return base + { ok: 'pagata', due: 'in scadenza', late: 'in ritardo' }[u.pay];
    if (L === 1) return base + (u.i === 9 ? '1 segnalazione' : 'nessuna segnalazione');
    if (L === 2) return base + u.kwh + ' kWh';
    return base + (V.set.has(u.i) ? { si: 'favorevole', del: 'favorevole (delega)', no: 'contrario', ast: 'astenuto' }[u.vote] : 'in attesa');
  };
  const onDown = e => { down = { x: e.clientX, y: e.clientY, r: rotT, p: phiT }; moved = false; el.setPointerCapture(e.pointerId); host.style.cursor = 'grabbing'; };
  const onMove = e => {
    if (down) {
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
      if (moved) { rotT = down.r + dx * 0.008; phiT = Math.min(0.95, Math.max(0.12, down.p + dy * 0.004)); lastUser = performance.now(); }
    }
    const o = down && moved ? null : hit(e);
    hover = o;
    if (o) { const r = host.getBoundingClientRect(); tip.textContent = tipText(o); tip.style.opacity = '1'; const x = Math.min(r.width - tip.offsetWidth - 8, e.clientX - r.left + 14); tip.style.transform = 'translate(' + x + 'px,' + (e.clientY - r.top - 40) + 'px)'; el.style.cursor = 'pointer'; }
    else { tip.style.opacity = '0'; el.style.cursor = ''; }
  };
  const onUp = e => {
    host.style.cursor = '';
    if (down && !moved) { const o = hit(e); setState({ pSel: o ? o.userData.id : null }); lastUser = performance.now(); }
    down = null;
  };
  const onLeave = () => { hover = null; tip.style.opacity = '0'; };
  el.addEventListener('pointerdown', onDown); el.addEventListener('pointermove', onMove); el.addEventListener('pointerup', onUp); el.addEventListener('pointerleave', onLeave);
  const tmp = new THREE.Color();
  const frame = now => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; time += dt;
    const st = getState(), L = st.pLayer || 0, sel = st.pSel || null, V = pVoteStats(getState());
    if (!reduce && !down && now - lastUser > 3500 && !hover) rotT += dt * 0.12;
    rotY += (rotT - rotY) * Math.min(1, dt * 6); phi += (phiT - phi) * Math.min(1, dt * 6);
    root.rotation.y = rotY;
    expl += ((st.pExplode ? 1 : 0) - expl) * Math.min(1, dt * 5);
    floors.forEach((g, f) => { g.position.y = f * FH + (f > 0 ? (f - 0.6) * expl * 1.7 : 0); });
    const asp = W() / H(), R = (asp < 1.1 ? 50 / asp * 1.05 : 46) + expl * 8;
    cam.position.set(0, 9 + Math.sin(phi) * R, Math.cos(phi) * R); cam.lookAt(0, 9.5 + expl * 4.5, 0);
    units.forEach(me => {
      const u = me.userData.u, on = sel === me.userData.id, dim = sel && !on;
      me.userData.col.lerp(tmp.setHex(pColor(u, L, V.set)), Math.min(1, dt * 8));
      me.material.color.copy(me.userData.col);
      me.material.opacity += ((dim ? 0.28 : 0.92) - me.material.opacity) * Math.min(1, dt * 8);
      const glow = on ? 0.35 + Math.sin(time * 5) * 0.15 : hover === me ? 0.25 : 0;
      me.material.emissive.copy(me.userData.col).multiplyScalar(glow);
      const sc = on ? 1.06 : 1; me.scale.x += (sc - me.scale.x) * Math.min(1, dt * 10); me.scale.z = me.scale.y = me.scale.x;
    });
    pins.forEach((p, i) => {
      p.visible = L === 1;
      p.position.y = p.userData.base + Math.sin(time * 2 + i) * 0.15;
      const k = (time * 0.8 + i * 0.3) % 1; p.userData.ring.scale.setScalar(1 + k * 1.6); p.userData.ring.material.opacity = 0.8 * (1 - k);
      const on = sel === 't' + i; p.scale.setScalar(on ? 1.35 : hover === p.userData.head ? 1.15 : 1);
    });
    renderer.render(scene, cam);
    raf = running ? requestAnimationFrame(frame) : 0;
  };
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } });
  io.observe(host);
  const ro = new ResizeObserver(() => { renderer.setSize(W(), H(), false); cam.aspect = W() / H(); cam.updateProjectionMatrix(); });
  ro.observe(host);
  ctx.off = () => { running = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerup', onUp); el.removeEventListener('pointerleave', onLeave); renderer.dispose(); el.remove(); };
}
