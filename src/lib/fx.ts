// @ts-nocheck
/* Effetti di scorrimento EffeBi: portico 3D, foto in profondità, numeri in prospettiva, edificio 3D (three.js).
   Rispetta "riduci movimento" e si alleggerisce sotto i 768px. Gira solo nel browser (useEffect). */
export function initFx(): () => void {
  let dead = false;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = innerWidth < 768, k = mobile ? 0.5 : 1;
  const q = n => Array.from(document.querySelectorAll('[data-fx="' + n + '"]'));
  const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const intro = q('intro')[0], scene = q('scene')[0], wrap = q('scale')[0], frames = q('frame'), slogan = q('slogan')[0], hint = q('hint')[0];
  const tilts = q('tilt'), energy = q('energy')[0], rises = q('rise');
  const off = [];
  const D = 600, N = frames.length;
  if (intro) { if (reduce) intro.style.display = 'none'; else intro.style.height = mobile ? '220vh' : '300vh'; }
  let three = null;
  const onScroll = () => {
    const vh = innerHeight;
    if (intro && !reduce) {
      const r = intro.getBoundingClientRect(), p = cl(-r.top / (r.height - vh));
      const sc = Math.max(innerWidth / 1440, vh / 900) * (mobile ? 1.25 : 1);
      wrap.style.transform = 'scale3d(' + sc + ',' + sc + ',' + sc + ')';
      const cam = p * (N * D + 900);
      scene.style.transform = 'translateZ(' + cam.toFixed(1) + 'px)';
      frames.forEach((f, i) => {
        const z = -i * D - 300 + cam;
        f.style.visibility = z > 760 ? 'hidden' : 'visible';
        f.style.opacity = (1 - cl(-z / (N * D)) * 0.8).toFixed(3);
      });
      const sp = cl((p - 0.74) / 0.2);
      slogan.style.opacity = sp; slogan.style.transform = 'scale(' + (0.9 + 0.1 * sp) + ')';
      hint.style.opacity = 1 - cl(p * 6);
    }
    if (!reduce) tilts.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const c = cl((r.top + r.height / 2 - vh / 2) / vh, -1, 1), a = Math.abs(c), dir = i % 2 ? 1 : -1;
      el.style.transform = 'perspective(1100px) rotateX(' + (c * 24 * k).toFixed(2) + 'deg) rotateY(' + (c * 16 * dir * k).toFixed(2) + 'deg) translateZ(' + ((1 - a) * 60 * k).toFixed(1) + 'px) scale(' + (0.82 + 0.18 * (1 - a)).toFixed(3) + ')';
    });
    if (energy && three) { const r = energy.getBoundingClientRect(); three.setP(cl(-r.top / (r.height - vh))); }
  };
  if (!reduce && 'IntersectionObserver' in window) {
    rises.forEach(el => Object.assign(el.style, { display: 'inline-block', transformOrigin: '50% 100%', transform: 'perspective(700px) rotateX(88deg) translateY(30px)', opacity: '0', transition: 'transform 1200ms cubic-bezier(.16,1,.3,1), opacity 700ms ease' }));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; el.style.transitionDelay = (rises.indexOf(el) % 3) * 140 + 'ms';
      el.style.transform = 'none'; el.style.opacity = '1'; io.unobserve(el);
    }), { threshold: 0.4 });
    rises.forEach(el => io.observe(el));
    off.push(() => io.disconnect());
  }
  if (energy) initThree(q('stage3d')[0], q('label'), q('estep'), q('edesc'), { reduce, mobile })
    .then(t => { if (dead) { t.dispose(); return; } three = t; off.push(() => t.dispose()); onScroll(); })
    .catch(e => console.warn('3D non disponibile', e));
  let raf = 0;
  const tick = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; onScroll(); }); };
  addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick);
  off.push(() => { removeEventListener('scroll', tick); removeEventListener('resize', tick); });
  onScroll();
  return () => { dead = true; off.forEach(f => f()); };
}

export async function initThree(host, labels, steps, descs, { reduce, mobile }) {
  const THREE = await import('three');
  const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const W = () => Math.max(1, host.clientWidth), H = () => Math.max(1, host.clientHeight);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 2));
  renderer.setSize(W(), H(), false);
  renderer.shadowMap.enabled = !mobile; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x2a211c, 70, 140);
  const cam = new THREE.PerspectiveCamera(32, W() / H(), 0.1, 400);
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x3a2a20, 0.85));
  const sun = new THREE.DirectionalLight(0xffe2bf, 1.7); sun.position.set(22, 34, 26); sun.castShadow = !mobile;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 120 }); scene.add(sun);
  const M = (c, o) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.85 }, o || {}));
  const mWall = M(0xb4532f), mWall2 = M(0x9b4527), mTrim = M(0xf1e6d6), mInner = M(0x7a3a22), mShut = M(0x6f7d5c), mGround = M(0x3a2e27, { roughness: 1 }), mN1 = M(0xc58a5e), mN2 = M(0xd8b48a);
  const root = new THREE.Group(); scene.add(root);
  const bld = new THREE.Group(); root.add(bld);
  const box = (w, h, d, m, x, y, z, g) => { const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); me.position.set(x, y, z); me.castShadow = me.receiveShadow = true; (g || bld).add(me); return me; };
  const ground = new THREE.Mesh(new THREE.CircleGeometry(48, 64), mGround); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; root.add(ground);
  const BW = 14, GH = 3.8, FH = 2.7, NF = 4, FRONT = 6.5, TOP = GH + NF * FH;
  box(BW - 0.4, GH, 8, mInner, 0, GH / 2, -0.5);
  box(BW, NF * FH, 11, mWall, 0, GH + NF * FH / 2, 1);
  box(BW, 0.15, 3.2, mTrim, 0, 0.075, 5);
  const nA = 6, span = BW / nA, r = 0.82;
  const sh = new THREE.Shape(); sh.moveTo(-BW / 2, 0); sh.lineTo(BW / 2, 0); sh.lineTo(BW / 2, GH); sh.lineTo(-BW / 2, GH); sh.lineTo(-BW / 2, 0);
  for (let i = 0; i < nA; i++) { const cx = -BW / 2 + span * (i + 0.5), top = GH - 0.5; const h = new THREE.Path(); h.moveTo(cx - r, 0.02); h.lineTo(cx + r, 0.02); h.lineTo(cx + r, top - r); h.absarc(cx, top - r, r, 0, Math.PI, false); h.lineTo(cx - r, 0.02); sh.holes.push(h); }
  const arc = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.7, bevelEnabled: false }), mWall); arc.position.set(0, 0, FRONT - 0.7); arc.castShadow = arc.receiveShadow = true; bld.add(arc);
  for (let i = 0; i <= nA; i++) box(0.5, 0.2, 0.8, mTrim, -BW / 2 + span * i, GH - 0.5 - r * 2 + 0.4, FRONT - 0.3);
  for (let f = 0; f <= NF; f++) box(BW + 0.2, 0.18, 0.22, mTrim, 0, GH + f * FH, FRONT + 0.05);
  box(BW + 0.7, 0.5, 11.7, mTrim, 0, TOP + 0.25, 1);
  box(BW, 0.5, 0.2, mWall2, 0, TOP + 0.75, FRONT - 0.1); box(BW, 0.5, 0.2, mWall2, 0, TOP + 0.75, -4.4);
  const mWin = [], wins = [];
  for (let f = 0; f < NF; f++) {
    const mw = new THREE.MeshStandardMaterial({ color: 0x241b16, emissive: 0xffc98a, emissiveIntensity: 0, roughness: 0.35 }); mWin.push(mw);
    for (let c = 0; c < 5; c++) {
      const x = -BW / 2 + (c + 0.5) * BW / 5, y = GH + f * FH + FH * 0.52;
      box(1.2, 1.8, 0.06, mTrim, x, y, FRONT + 0.02);
      const g = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.55), mw); g.position.set(x, y, FRONT + 0.06); bld.add(g); wins.push(g.position);
      box(0.42, 1.6, 0.05, mShut, x - 0.85, y, FRONT + 0.04); box(0.42, 1.6, 0.05, mShut, x + 0.85, y, FRONT + 0.04);
    }
    for (let c = 0; c < 4; c++) {
      const z = -3.5 + c * 2.6, y = GH + f * FH + FH * 0.52;
      box(0.06, 1.8, 1.2, mTrim, BW / 2 + 0.02, y, z);
      const g = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.55), mw); g.rotation.y = Math.PI / 2; g.position.set(BW / 2 + 0.06, y, z); bld.add(g);
    }
  }
  const mShop = new THREE.MeshStandardMaterial({ color: 0x241b16, emissive: 0xffb36b, emissiveIntensity: 0.6 });
  for (let i = 0; i < nA; i++) { const g = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.2), mShop); g.position.set(-BW / 2 + span * (i + 0.5), 1.2, 3.52); bld.add(g); }
  const mPanel = new THREE.MeshStandardMaterial({ color: 0x1d2a3d, metalness: 0.6, roughness: 0.28, emissive: 0x0b1626 });
  const panels = [];
  for (let rr = 0; rr < 3; rr++) for (let c = 0; c < 6; c++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.07, 1.15), mPanel);
    p.rotation.x = -0.38; p.castShadow = true; p.userData.y = TOP + 1.05; p.position.set(-BW / 2 + 1.5 + c * 2.2, p.userData.y + 9, -2.6 + rr * 2.7); p.visible = false;
    bld.add(p); panels.push(p);
  }
  const nb = [];
  const mNw = new THREE.MeshStandardMaterial({ color: 0x241b16, emissive: 0xffc98a, emissiveIntensity: 0 });
  [[-17, 9, 9, 0.5, mN1], [17, 7.5, 8, 1, mN2]].forEach(([x, h, w, z, m]) => {
    box(w, h, 9, m, x, h / 2, z, root); box(w + 0.4, 0.35, 9.4, mTrim, x, h + 0.17, z, root);
    for (let f = 0; f < Math.floor(h / 2.6); f++) for (let c = 0; c < 3; c++) { const g = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), mNw); g.position.set(x - w / 2 + (c + 0.5) * w / 3, 1.6 + f * 2.6, z + 4.52); root.add(g); }
    nb.push(new THREE.Vector3(x, h + 0.5, z));
  });
  const src = new THREE.Vector3(0, TOP + 1.4, 0.5);
  const targets = [wins[2], wins[7], wins[12], wins[17], wins[5], wins[14]].map(v => v.clone()).concat(nb);
  const curves = targets.map(t => { const mid = src.clone().lerp(t, 0.5); mid.y += 5 + Math.abs(t.x) * 0.15; return new THREE.QuadraticBezierCurve3(src, mid, t); });
  const mFlow = new THREE.MeshBasicMaterial({ color: 0xffb36b, transparent: true, opacity: 0 });
  const mTube = new THREE.MeshBasicMaterial({ color: 0xffb36b, transparent: true, opacity: 0 });
  const K = mobile ? 4 : 7, dots = [];
  curves.forEach((cv, ci) => {
    const tb = new THREE.Mesh(new THREE.TubeGeometry(cv, 40, 0.035, 6, false), mTube); root.add(tb);
    for (let j = 0; j < K; j++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), mFlow); d.userData = { cv, off: j / K + ci * 0.13 }; root.add(d); dots.push(d); }
  });
  const anchors = [new THREE.Vector3(0, TOP + 3.2, 0.5), curves[curves.length - 2].getPoint(0.5), new THREE.Vector3(BW / 4, GH + 4, FRONT)];
  const showAt = [0.5, 0.66, 0.8];
  let target = reduce ? 1 : 0, cur = target, running = false, raf = 0, last = performance.now(), time = 0;
  const update = () => {
    root.rotation.y = -0.95 + ease(cl(cur / 0.9)) * 1.25;
    const s = 0.9 + 0.1 * ease(cl(cur / 0.15)); bld.scale.setScalar(s);
    const asp = W() / H(), fit = asp < 1.4 ? 1.4 / asp : 1;
    const rad = Math.min(130, ((mobile ? 58 : 46) - cur * 6) * fit);
    cam.position.set(0, 11 + cur * 7, rad); cam.lookAt(0, 7.5, 0);
    mWin.forEach((m, f) => { m.emissiveIntensity = 1.7 * ease(cl((cur - 0.15 - f * 0.055) / 0.08)); });
    mNw.emissiveIntensity = 1.2 * ease(cl((cur - 0.64) / 0.1));
    panels.forEach((p, j) => { const t = cl((cur - 0.4 - j * 0.009) / 0.1); p.visible = t > 0; p.position.y = p.userData.y + 9 * (1 - ease(t)); });
    const fo = cl((cur - 0.62) / 0.08);
    mTube.opacity = 0.28 * fo; mFlow.opacity = fo;
    dots.forEach(d => { d.visible = fo > 0; if (fo > 0) d.userData.cv.getPoint((time * 0.22 + d.userData.off) % 1, d.position); });
    const w = W(), h = H(), v = new THREE.Vector3();
    labels.forEach((el, i) => {
      v.copy(anchors[i]); root.localToWorld(v); v.project(cam);
      const o = ease(cl((cur - showAt[i]) / 0.06));
      el.style.opacity = o.toFixed(3);
      const lw = el.offsetWidth, lh = el.offsetHeight, pad = 12;
      const lx = Math.min(w - lw - pad, Math.max(pad, (v.x * 0.5 + 0.5) * w - lw / 2));
      const ly = Math.min(h - pad, Math.max(lh + pad, (-v.y * 0.5 + 0.5) * h));
      el.style.transform = 'translate(' + lx.toFixed(1) + 'px,' + (ly - lh).toFixed(1) + 'px) translateY(' + ((1 - o) * 16).toFixed(1) + 'px)';
    });
    const act = cur < 0.12 ? -1 : cur < 0.4 ? 0 : cur < 0.62 ? 1 : cur < 0.78 ? 2 : 3;
    steps.forEach((el, i) => { el.style.opacity = i === act ? '1' : '.35'; });
    if (mobile) descs.forEach((el, i) => { el.style.display = i === act ? '' : 'none'; });
    renderer.render(scene, cam);
  };
  const loop = now => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; time += dt;
    cur += (target - cur) * Math.min(1, dt * 10);
    if (Math.abs(target - cur) < 0.002) cur = target;
    update();
    raf = running ? requestAnimationFrame(loop) : 0;
  };
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }, { rootMargin: '100px' });
  io.observe(host);
  const ro = new ResizeObserver(() => { renderer.setSize(W(), H(), false); cam.aspect = W() / H(); cam.updateProjectionMatrix(); update(); });
  ro.observe(host);
  update();
  return {
    setP: p => { if (!reduce) target = p; },
    dispose: () => { running = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); renderer.dispose(); renderer.domElement.remove(); }
  };
}
