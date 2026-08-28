import './style.css';
import './a11y.css';

type CueId = 'laser' | 'outline' | 'pixel' | 'freeze' | 'zoom' | 'shake';
type Mode = 'landing' | 'demo' | 'live' | 'privacy' | 'terms' | 'missing';

const cueList: { id: CueId; key: string; label: string; note: string }[] = [
  { id: 'laser', key: '1', label: 'Laser', note: 'Twin cyan beams' },
  { id: 'outline', key: '2', label: 'Outline', note: 'Signal edges' },
  { id: 'pixel', key: '3', label: 'Pixel burst', note: 'Amber fragments' },
  { id: 'freeze', key: '4', label: 'Freeze', note: 'Hold this frame' },
  { id: 'zoom', key: '5', label: 'Zoom', note: 'Punch toward lens' },
  { id: 'shake', key: '6', label: 'Shake', note: 'Short camera jolt' }
];

const app = document.querySelector<HTMLDivElement>('#app')!;
let mode: Mode = 'landing';
let activeCue: CueId | null = null;
let videoStream: MediaStream | null = null;
let video: HTMLVideoElement | null = null;
let raf = 0;
let freezeFrame: ImageData | null = null;
let pixelUntil = 0;
let usingSample = false;
let startTime = performance.now();
let cueSequence = 0;

const routeForPath = (): Mode => {
  if (location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1') return 'demo';
  if (location.pathname === '/camera') return 'live';
  if (location.pathname === '/privacy') return 'privacy';
  if (location.pathname === '/terms') return 'terms';
  if (location.pathname === '/' || location.pathname === '/index.html') return 'landing';
  return 'missing';
};

const storageKey = (key: string) => `${mode === 'demo' ? 'demo:' : ''}camera-fx-cues:${key}`;

function template(body: string, current: Mode) {
  return `
    <header class="site-header"><a class="wordmark" href="/" data-route aria-label="Camera FX Cues home"><span aria-hidden="true">▣</span> CAMERA FX CUES</a>
      <nav aria-label="Primary"><a href="/demo" data-route${current === 'demo' ? ' aria-current="page"' : ''}>Demo</a><a href="#how" ${current !== 'landing' ? 'hidden' : ''}>How it works</a><a href="/privacy" data-route${current === 'privacy' ? ' aria-current="page"' : ''}>Privacy</a></nav>
    </header>
    <p id="offline-notice" class="offline-notice" hidden role="status">Offline. Reconnect before starting a camera.</p>
    <main id="main" class="mode-${current}" tabindex="-1">${body}</main>
    <footer><p>Playful camera cues for small teams.</p><p><a href="/privacy" data-route>Privacy</a> <a href="/terms" data-route>Terms</a> <span>Built by Param Factory · v1.0.0</span></p></footer>
    <div id="route-status" class="sr-only" aria-live="polite"></div>`;
}

function landing() {
  return template(`
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow">LOCAL CAMERA EFFECTS // NO ACCOUNT</p><h1 id="hero-title">Trigger camera effects with keys</h1>
        <p class="lead">For game-jam and classroom teams who need playful camera cues without sending video away.</p>
        <div class="hero-actions"><a class="button primary" href="/?demo=1" data-route>Try it with sample data</a><span>Opens the sample signal. Your real presets stay untouched.</span></div>
        <div class="facts" aria-label="Product facts"><p><span>01</span> Camera stays in your browser</p><p><span>02</span> Works with six number keys</p><p><span>03</span> Starts without an account</p></div>
      </div>
      <figure class="hero-art"><img src="/assets/demoscene-hero.webp" width="900" height="506" fetchpriority="high" decoding="async" alt="A pixel-art camera control room with cyan light beams." /><figcaption>ORIGINAL SCENE PLATE // GENERATED FOR THIS TOOL</figcaption></figure>
    </section>
    <section class="entry-panel" aria-labelledby="start-title"><div><p class="eyebrow">BEFORE YOU START</p><h2 id="start-title">Choose a camera or sample signal</h2><p>Camera permission is requested only after you choose your camera.</p></div><div class="entry-actions"><button class="button primary" id="open-camera">Use your camera</button><button class="button quiet" id="open-sample">Open sample signal</button></div><aside class="safety-note" aria-labelledby="safety-title"><h3 id="safety-title">Motion and light warning</h3><p>Effects use sudden motion and bright contrast. If these may affect you, turn on reduced motion or do not start.</p></aside><p id="camera-message" class="status" role="status"></p></section>
    <section id="how" class="how" aria-labelledby="how-title"><p class="eyebrow">THREE STEPS</p><h2 id="how-title">Run a cue in your scene</h2><ol><li><b>1. Pick a source.</b><span>Allow your camera or start the sample signal.</span></li><li><b>2. Press a number key.</b><span>Keys 1–6 trigger the six effects.</span></li><li><b>3. Save a preset.</b><span>Keep your cue choice on this device.</span></li></ol></section>
    <section class="privacy-note" aria-labelledby="boundary-title"><h2 id="boundary-title">What Camera FX Cues does not do</h2><p>It does not record, store, or upload camera video. It has no analytics, advertising, accounts, or third-party scripts.</p></section>
  `, 'landing');
}

function cueGrid() {
  return `<div class="cue-grid" role="group" aria-label="Cue controls">${cueList.map(c => `<button class="cue" data-cue="${c.id}" aria-pressed="false"><span class="cue-key">${c.key}</span><span><b>${c.label}</b><small>${c.note}</small></span></button>`).join('')}</div>`;
}

function instrument(kind: 'demo' | 'live') {
  const isDemo = kind === 'demo';
  return template(`
    ${isDemo ? `<aside class="demo-banner"><strong>DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE</strong><span>Demo presets remain only until you reset or start for real.</span><button id="reset-demo">Reset demo</button><button id="start-real">Start for real</button></aside>` : ''}
    <section class="instrument" aria-labelledby="instrument-title"><div class="instrument-top"><div><p class="eyebrow">${isDemo ? 'GAME-JAM DESK // SAMPLE SIGNAL' : 'LIVE INPUT // LOCAL ONLY'}</p><h1 id="instrument-title">${isDemo ? 'Try all six camera cues' : 'Control your camera effects'}</h1><p class="instrument-help">Press 1–6, click a cue, or use Tab then Enter. Press Escape to clear an effect.</p></div><a href="/" data-route class="back-link">← Back to start</a></div>
      <aside class="safety-note instrument-warning" aria-labelledby="instrument-safety-title"><h2 id="instrument-safety-title">Motion and light warning</h2><p>Effects use sudden motion and bright contrast. Turn on reduced motion or stop if you feel discomfort.</p></aside>
      <div class="stage-shell"><div class="stage" id="stage"><canvas id="camera-canvas" width="960" height="540" aria-label="${isDemo ? 'Game-jam desk sample signal with an active outline cue' : 'Your camera preview'}"></canvas><div class="scanlines" aria-hidden="true"></div><div class="laser-overlay" aria-hidden="true"><i></i><i></i></div><div class="stage-readout" aria-live="polite"><span id="source-readout">${isDemo ? 'JAM DESK // SAMPLE SIGNAL' : 'CONNECTING CAMERA'}</span><span id="cue-readout">${isDemo ? 'OUTLINE' : 'READY'}</span></div></div></div>
      <div class="cue-panel"><div><h2>Effect cues</h2><p>One cue can run at a time. Freeze stays until you clear it.</p></div>${cueGrid()}</div>
      <section class="preset-panel" aria-labelledby="preset-title"><div><p class="eyebrow">LOCAL PRESETS</p><h2 id="preset-title">Save this cue setting</h2><p>Presets stay in this browser. Demo presets stay separate.</p></div><form id="preset-form"><label for="preset-name">Preset name</label><div class="preset-row"><input id="preset-name" name="preset-name" maxlength="28" placeholder="Boss intro" required><button class="button primary" type="submit">Save preset</button></div><p id="preset-feedback" class="status" role="status"></p></form><div id="preset-list" class="preset-list" aria-live="polite"></div></section>
      <section id="error-panel" class="error-panel" hidden aria-labelledby="error-title"><h2 id="error-title">Camera did not start</h2><p id="camera-error">Allow camera access, then try again. You can also use the sample signal.</p><button id="retry-camera" class="button primary">Try camera again</button><a href="/demo" data-route class="button quiet">Use sample signal</a></section>
    </section>
  `, kind);
}

function textPage(type: 'privacy' | 'terms') {
  const privacy = type === 'privacy';
  return template(`<article class="legal"><p class="eyebrow">${privacy ? 'PRIVACY' : 'TERMS'}</p><h1>${privacy ? 'Your camera stays on your device' : 'Use this cue tool safely'}</h1>${privacy ? `<h2>Camera access</h2><p>Camera FX Cues asks for camera permission only after you choose it. Video is processed in the current browser tab. It is never uploaded, recorded, or stored.</p><h2>Local settings</h2><p>Saved presets use browser storage on this device. Demo presets use a separate demo storage area. You can clear them from the preset controls or your browser settings.</p><h2>No tracking</h2><p>This site has no analytics, advertising, accounts, or third-party scripts.</p>` : `<h2>Use with consent</h2><p>Get permission before showing someone on camera. Do not use the tool to identify people or collect video.</p><h2>Availability</h2><p>This tool is provided as-is. Effects can vary by browser and camera hardware.</p><h2>Your choices</h2><p>You control camera permission and local presets. You can stop the camera by leaving the page or closing the tab.</p>`}</article>`, type);
}

function missing() { return template(`<article class="legal missing"><p class="eyebrow">404 // SIGNAL LOST</p><h1>This cue page is not here</h1><p>Return to the camera control room and choose a source.</p><a href="/" data-route class="button primary">Open Camera FX Cues</a></article>`, 'missing'); }

function render(next = routeForPath()) {
  stopCamera();
  cancelAnimationFrame(raf);
  activeCue = null; freezeFrame = null; pixelUntil = 0;
  mode = next;
  app.innerHTML = next === 'landing' ? landing() : next === 'demo' ? instrument('demo') : next === 'live' ? instrument('live') : next === 'privacy' || next === 'terms' ? textPage(next) : missing();
  const titles: Record<Mode, string> = { landing: 'Camera FX Cues — Trigger camera effects with keys', demo: 'Demo — Camera FX Cues', live: 'Camera input — Camera FX Cues', privacy: 'Privacy — Camera FX Cues', terms: 'Terms — Camera FX Cues', missing: 'Signal lost — Camera FX Cues' };
  document.title = titles[next];
  const descriptions: Record<Mode, string> = { landing: 'Trigger playful camera effects with clear keys. Built for game jams and classrooms.', demo: 'Try six camera cues on a game-jam desk sample signal.', live: 'Use local camera input with six keyboard-triggered effects.', privacy: 'Camera FX Cues processes video in the current browser tab.', terms: 'Terms for using Camera FX Cues safely.', missing: 'This Camera FX Cues page is not available.' };
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', descriptions[next]);
  const canonicalPath = next === 'landing' ? '/' : next === 'demo' ? '/demo' : location.pathname;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://camera-fx-cues.sociobot.in${canonicalPath}`);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', titles[next]);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', descriptions[next]);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', titles[next]);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', descriptions[next]);
  const h1 = document.querySelector<HTMLElement>('h1');
  document.querySelector('#route-status')!.textContent = h1?.textContent || 'Page loaded';
  if (h1) h1.tabIndex = -1;
  bindCommon();
  updateConnectivity();
  if (next === 'demo') startSample(true);
  if (next === 'live') startCamera();
}

function navigate(path: string) { history.pushState({}, '', path); render(); focusRouteHeading(); window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }

function focusRouteHeading() { requestAnimationFrame(() => document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })); }

function bindCommon() {
  document.querySelectorAll<HTMLElement>('[data-route]').forEach(link => link.addEventListener('click', event => { const href = link.getAttribute('href'); if (!href || href.startsWith('#')) return; event.preventDefault(); navigate(href); }));
  document.querySelector('#open-camera')?.addEventListener('click', () => navigate('/camera'));
  document.querySelector('#open-sample')?.addEventListener('click', () => navigate('/demo'));
  document.querySelector('#reset-demo')?.addEventListener('click', resetDemo);
  document.querySelector('#start-real')?.addEventListener('click', () => { clearStoragePrefix('demo:camera-fx-cues:'); navigate('/camera'); });
  document.querySelector('#retry-camera')?.addEventListener('click', startCamera);
  document.querySelectorAll<HTMLButtonElement>('[data-cue]').forEach(button => button.addEventListener('click', () => triggerCue(button.dataset.cue as CueId)));
  document.querySelector<HTMLFormElement>('#preset-form')?.addEventListener('submit', savePreset);
  renderPresets();
}

function stopCamera() { if (videoStream) { videoStream.getTracks().forEach(track => track.stop()); videoStream = null; } if (video) { video.pause(); video.srcObject = null; video = null; } }

async function startCamera() {
  usingSample = false;
  const errorPanel = document.querySelector<HTMLElement>('#error-panel'); errorPanel?.setAttribute('hidden', '');
  const source = document.querySelector('#source-readout'); if (source) source.textContent = 'REQUESTING CAMERA';
  if (!navigator.mediaDevices?.getUserMedia) return cameraFailed('This browser cannot access a camera. Use the sample signal instead.');
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    video = document.createElement('video'); video.muted = true; video.playsInline = true; video.srcObject = videoStream;
    await video.play(); if (source) source.textContent = 'CAMERA LOCAL'; drawLoop();
  } catch (error) { cameraFailed(error instanceof DOMException && error.name === 'NotAllowedError' ? 'Camera permission was not allowed. Allow it in your browser, then try again.' : 'No camera was found or it is busy. Close another camera app, then try again.'); }
}

function cameraFailed(message: string) { const panel = document.querySelector<HTMLElement>('#error-panel'); const p = document.querySelector('#camera-error'); const source = document.querySelector('#source-readout'); if (p) p.textContent = message; if (source) source.textContent = 'NO CAMERA'; panel?.removeAttribute('hidden'); startSample(); }

function startSample(seedOutline = false) { usingSample = true; startTime = performance.now(); const source = document.querySelector('#source-readout'); if (source) source.textContent = mode === 'demo' ? 'JAM DESK // SAMPLE SIGNAL' : 'SAMPLE SIGNAL'; if (seedOutline) { activeCue = 'outline'; updateCueUi(); } drawLoop(); }

function drawLoop() {
  const canvas = document.querySelector<HTMLCanvasElement>('#camera-canvas'); if (!canvas) return;
  const ctx = canvas.getContext('2d', { willReadFrequently: true }); if (!ctx) return;
  const draw = (now: number) => { if (!document.body.contains(canvas)) return; renderFrame(ctx, canvas, now); raf = requestAnimationFrame(draw); }; cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
}

function renderFrame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, now: number) {
  const w = canvas.width, h = canvas.height;
  if (activeCue === 'freeze' && freezeFrame) { ctx.putImageData(freezeFrame, 0, 0); return; }
  if (!usingSample && video && video.readyState >= 2) ctx.drawImage(video, 0, 0, w, h);
  else drawSample(ctx, w, h, now);
  if (activeCue === 'outline') applyOutline(ctx, w, h);
  if (activeCue === 'pixel' || now < pixelUntil) drawPixels(ctx, w, h, now);
}

function drawSample(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  const t = (now - startTime) / 1000;
  ctx.fillStyle = '#081126'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#111b3d'; ctx.fillRect(0, 0, w, 330);
  ctx.fillStyle = '#1b2450'; ctx.fillRect(0, 330, w, 210);
  for (let x = 0; x < w; x += 80) { ctx.fillStyle = x % 160 ? '#202a59' : '#182148'; ctx.fillRect(x, 330, 80, 210); }

  // A whiteboard, monitor, keyboard, controller, and mug make this a clear game-jam desk.
  ctx.fillStyle = '#e9e4d8'; ctx.fillRect(54, 45, 330, 174);
  ctx.fillStyle = '#273357'; ctx.fillRect(68, 61, 302, 142);
  ctx.fillStyle = '#50f5d0'; ctx.fillRect(92, 86, 174, 12); ctx.fillRect(92, 116, 234, 8);
  ctx.fillStyle = '#ff4f87'; ctx.fillRect(92, 145, 112, 12);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(291, 78, 48, 48);
  ctx.fillStyle = '#0a0d20'; ctx.fillRect(430, 67, 264, 192);
  ctx.strokeStyle = '#7871ff'; ctx.lineWidth = 8; ctx.strokeRect(430, 67, 264, 192);
  ctx.fillStyle = '#111b3d'; ctx.fillRect(449, 87, 226, 148);
  ctx.fillStyle = '#50f5d0'; ctx.fillRect(474, 111, 150, 11); ctx.fillRect(474, 140, 116, 11);
  ctx.fillStyle = '#ff4f87'; ctx.fillRect(474, 174, 174, 13);
  ctx.fillStyle = '#7871ff'; ctx.fillRect(548, 259, 28, 57); ctx.fillRect(502, 309, 120, 14);
  ctx.fillStyle = '#090b18'; ctx.fillRect(38, 350, 884, 116);
  ctx.fillStyle = '#3a315b'; ctx.fillRect(73, 376, 282, 65);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 10; col++) { ctx.fillStyle = (row + col) % 3 ? '#7871ff' : '#50f5d0'; ctx.fillRect(90 + col * 24, 388 + row * 15, 15, 8); }
  ctx.fillStyle = '#ffd166'; ctx.fillRect(754, 359, 88, 82);
  ctx.fillStyle = '#081126'; ctx.fillRect(772, 373, 52, 44);
  ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 10; ctx.strokeRect(838, 375, 35, 38);
  ctx.fillStyle = '#ff4f87'; ctx.fillRect(635, 374, 82, 52);
  ctx.fillStyle = '#f7f4e9'; ctx.fillRect(653, 390, 12, 12); ctx.fillRect(688, 390, 12, 12);
  const pulse = 8 + Math.sin(t * 2) * 3;
  ctx.fillStyle = '#50f5d0'; ctx.fillRect(626 - pulse / 2, 444 - pulse / 2, pulse, pulse);
  ctx.fillStyle = '#050713'; ctx.fillRect(84, 466, 20, 74); ctx.fillRect(858, 466, 20, 74);
}

function applyOutline(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const image = ctx.getImageData(0, 0, w, h), data = image.data, out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) { out[i] = data[i] * .42; out[i + 1] = data[i + 1] * .42; out[i + 2] = data[i + 2] * .5; out[i + 3] = 255; }
  for (let y = 1; y < h - 1; y += 2) for (let x = 1; x < w - 1; x += 2) { const i = (y * w + x) * 4; const a = data[i] + data[i + 1] + data[i + 2]; const b = data[i + 4] + data[i + 5] + data[i + 6]; const c = data[i + w * 4] + data[i + w * 4 + 1] + data[i + w * 4 + 2]; if (Math.abs(a - b) + Math.abs(a - c) > 120) { for (const offset of [0, 4, w * 4]) { out[i + offset] = 80; out[i + offset + 1] = 245; out[i + offset + 2] = 208; out[i + offset + 3] = 255; } } }
  ctx.putImageData(new ImageData(out, w, h), 0, 0);
}

function drawPixels(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) { const t = (now - startTime) / 1000; for (let i = 0; i < 100; i++) { const angle = i * 2.4; const r = ((i * 23 + t * 150) % 410); ctx.fillStyle = i % 3 ? '#ffd166' : '#ff4f87'; ctx.fillRect(w / 2 + Math.cos(angle) * r, h / 2 + Math.sin(angle) * r, 10, 10); } }

function triggerCue(cue: CueId) {
  const canvas = document.querySelector<HTMLCanvasElement>('#camera-canvas'); if (!canvas) return;
  const sequence = ++cueSequence;
  activeCue = activeCue === cue && cue !== 'freeze' ? null : cue;
  if (cue === 'freeze' && activeCue === 'freeze') { const ctx = canvas.getContext('2d'); freezeFrame = ctx?.getImageData(0, 0, canvas.width, canvas.height) || null; }
  const durations: Partial<Record<CueId, number>> = { laser: 500, pixel: 500, zoom: 420, shake: 480 };
  if (cue === 'pixel') pixelUntil = performance.now() + durations.pixel!;
  const duration = durations[cue];
  if (duration) window.setTimeout(() => { if (sequence === cueSequence && activeCue === cue) clearCue(); }, duration);
  updateCueUi();
}

function clearCue() { cueSequence++; activeCue = null; freezeFrame = null; pixelUntil = 0; document.querySelector<HTMLCanvasElement>('#camera-canvas')?.classList.remove('is-frozen'); updateCueUi(); }

function updateCueUi() {
  const stage = document.querySelector('#stage'); cueList.forEach(cue => stage?.classList.toggle(`is-${cue.id}`, activeCue === cue.id));
  document.querySelectorAll<HTMLButtonElement>('[data-cue]').forEach(button => { const active = button.dataset.cue === activeCue; button.setAttribute('aria-pressed', String(active)); button.classList.toggle('active', active); });
  const label = activeCue ? cueList.find(c => c.id === activeCue)?.label.toUpperCase() : 'READY'; const readout = document.querySelector('#cue-readout'); if (readout) readout.textContent = label || 'READY';
}

function presetData(): { name: string; cue: CueId | null }[] { try { return JSON.parse(localStorage.getItem(storageKey('presets')) || '[]'); } catch { return []; } }
function renderPresets() { const list = document.querySelector('#preset-list'); if (!list) return; const presets = presetData(); list.innerHTML = presets.length ? presets.map((preset, index) => `<div class="preset"><button data-load-preset="${index}"><b>${escapeHtml(preset.name)}</b><span>${preset.cue ? cueList.find(c => c.id === preset.cue)?.label : 'No effect'}</span></button><button class="remove-preset" data-remove-preset="${index}" aria-label="Remove ${escapeHtml(preset.name)}">×</button></div>`).join('') : '<p class="empty">Saved presets will appear here.</p>';
  list.querySelectorAll<HTMLButtonElement>('[data-load-preset]').forEach(button => button.addEventListener('click', () => { const preset = presetData()[Number(button.dataset.loadPreset)]; if (preset?.cue) triggerCue(preset.cue); }));
  list.querySelectorAll<HTMLButtonElement>('[data-remove-preset]').forEach(button => button.addEventListener('click', () => { const presets = presetData(); presets.splice(Number(button.dataset.removePreset), 1); localStorage.setItem(storageKey('presets'), JSON.stringify(presets)); renderPresets(); }));
}
function savePreset(event: SubmitEvent) { event.preventDefault(); const form = event.currentTarget as HTMLFormElement; const input = form.elements.namedItem('preset-name') as HTMLInputElement; const name = input.value.trim(); const feedback = document.querySelector('#preset-feedback'); if (!name) { if (feedback) feedback.textContent = 'Name this preset before saving it.'; return; } const presets = presetData(); presets.unshift({ name, cue: activeCue }); localStorage.setItem(storageKey('presets'), JSON.stringify(presets.slice(0, 8))); input.value = ''; if (feedback) feedback.textContent = `Saved ${name} on this device.`; renderPresets(); }
function resetDemo() { clearStoragePrefix('demo:camera-fx-cues:'); clearCue(); startSample(true); const feedback = document.querySelector('#preset-feedback'); if (feedback) feedback.textContent = 'Demo reset. The sample signal and outline cue are ready.'; renderPresets(); }
function clearStoragePrefix(prefix: string) { Object.keys(localStorage).filter(key => key.startsWith(prefix)).forEach(key => localStorage.removeItem(key)); }
function escapeHtml(value: string) { const div = document.createElement('div'); div.textContent = value; return div.innerHTML; }
function updateConnectivity() { const notice = document.querySelector<HTMLElement>('#offline-notice'); if (!notice) return; notice.hidden = navigator.onLine; }

window.addEventListener('keydown', event => { if (!['demo', 'live'].includes(mode) || event.metaKey || event.ctrlKey || event.altKey) return; const target = event.target as HTMLElement; if (target.matches('input, textarea')) return; if (event.key === 'Escape') { clearCue(); return; } const cue = cueList.find(c => c.key === event.key); if (cue) { event.preventDefault(); triggerCue(cue.id); } });
window.addEventListener('popstate', () => { render(); focusRouteHeading(); });
window.addEventListener('beforeunload', stopCamera);
window.addEventListener('online', updateConnectivity);
window.addEventListener('offline', updateConnectivity);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
render();
