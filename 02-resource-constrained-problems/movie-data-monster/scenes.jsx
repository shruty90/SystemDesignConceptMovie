// scenes.jsx — "The Data Monster" — a kid-friendly short about the Resource-Constrained Toolbox heroes

const { Easing, interpolate, clamp, useScene } = window;

const W = 1920, H = 1080;
const DARK = '#0a0a12';
const RED = '#ff4d4d';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const CYAN = '#38bdf8';
const PURPLE = '#a78bfa';
const PINK = '#f472b6';
const TEAL = '#2dd4bf';
const ORANGE = '#fb923c';
const SLATE = '#94a3b8';
const CREAM = '#e2e8f0';

function pulse(t, speed = 1) { return 0.5 + 0.5 * Math.sin(t * speed * Math.PI * 2); }
function el(tag, props, ...children) { return React.createElement(tag, props, ...children); }
function svgRoot(children) {
  return el('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { position: 'absolute', top: 0, left: 0 } }, el('g', null, ...children));
}
function bg() { return el('rect', { x: 0, y: 0, width: W, height: H, fill: DARK }); }
function title(text, op, sub, subOp) {
  return el('g', null,
    el('text', { x: W/2, y: 110, textAnchor: 'middle', fill: CREAM, fontSize: 52, fontFamily: 'Georgia, serif', fontWeight: 'bold', opacity: op }, text),
    sub ? el('text', { x: W/2, y: 160, textAnchor: 'middle', fill: SLATE, fontSize: 26, fontFamily: 'Georgia, serif', fontStyle: 'italic', opacity: subOp ?? op }, sub) : null,
  );
}
function caption(text, op, y = H - 110) {
  return el('text', { x: W/2, y, textAnchor: 'middle', fill: CREAM, fontSize: 34, fontFamily: 'Georgia, serif', opacity: op }, text);
}

// Reusable friendly mascot: round body + big eyes + simple mouth. mood: 'happy'|'focused'|'gasp'
function mascot(cx, cy, scale, color, mood, t) {
  const blink = pulse(t, 0.35) > 0.94;
  const eyeH = blink ? 1 : 14;
  const bob = Math.sin(t * 2) * 6;
  return el('g', { transform: `translate(${cx}, ${cy + bob}) scale(${scale})` },
    el('circle', { cx: 0, cy: 0, r: 90, fill: color }),
    el('circle', { cx: 0, cy: 0, r: 90, fill: 'none', stroke: '#00000022', strokeWidth: 4 }),
    // eyes
    el('ellipse', { cx: -28, cy: -10, rx: 13, ry: eyeH, fill: '#0a0a12' }),
    el('ellipse', { cx: 28, cy: -10, rx: 13, ry: eyeH, fill: '#0a0a12' }),
    // mouth
    mood === 'happy'
      ? el('path', { d: 'M -30 25 Q 0 55 30 25', stroke: '#0a0a12', strokeWidth: 8, fill: 'none', strokeLinecap: 'round' })
      : mood === 'gasp'
      ? el('circle', { cx: 0, cy: 32, r: 14, fill: '#0a0a12' })
      : el('line', { x1: -22, y1: 30, x2: 22, y2: 30, stroke: '#0a0a12', strokeWidth: 8, strokeLinecap: 'round' }),
  );
}

// ── SCENE 1: THE VILLAIN ──
function SceneProblem() {
  const { progress: p, localTime: t } = useScene();
  const serverScale = interpolate([0, 0.12], [0, 1], Easing.easeOutBack)(p);
  const monsterScale = interpolate([0.15, 0.55], [0, 1], Easing.easeOutElastic)(p);
  const ramFill = interpolate([0.35, 0.9], [0.15, 0.97], Easing.easeInCubic)(p);
  const ramColor = ramFill > 0.8 ? RED : ramFill > 0.5 ? AMBER : GREEN;
  const titleOp = interpolate([0, 0.08], [0, 1])(p);
  const lineOp = interpolate([0.65, 0.78], [0, 1])(p);
  const shake = p > 0.8 ? Math.sin(t * 30) * 6 * (p - 0.8) * 5 : 0;

  return svgRoot([
    bg(),
    title('Meet the Villain', titleOp),
    el('g', { transform: 'translate(480, 560)' },
      el('g', { transform: `scale(${serverScale})` },
        el('rect', { x: -90, y: -130, width: 180, height: 260, rx: 20, fill: '#1e293b', stroke: '#334155', strokeWidth: 3 }),
        el('text', { x: 0, y: -70, textAnchor: 'middle', fill: CYAN, fontSize: 22, fontFamily: 'Georgia, serif', fontWeight: 'bold' }, 'Tiny Server'),
        el('text', { x: 0, y: -20, textAnchor: 'middle', fill: SLATE, fontSize: 18, fontFamily: 'Georgia, serif' }, '512 MB of memory'),
        el('rect', { x: -65, y: 10, width: 130, height: 26, rx: 6, fill: '#0f172a', stroke: '#334155', strokeWidth: 2 }),
        el('rect', { x: -62, y: 13, width: 124 * ramFill, height: 20, rx: 4, fill: ramColor }),
        el('text', { x: 0, y: 75, textAnchor: 'middle', fill: SLATE, fontSize: 16, fontFamily: 'Georgia, serif' }, ramFill > 0.8 ? 'uh oh...' : 'feeling fine'),
      ),
    ),
    el('text', { x: W/2, y: 545, textAnchor: 'middle', fill: '#475569', fontSize: 46, fontFamily: 'Georgia, serif', fontStyle: 'italic', opacity: interpolate([0.2,0.3],[0,0.7])(p) }, 'vs.'),
    el('g', { transform: `translate(${1420+shake}, ${560+shake*0.4}) scale(${monsterScale})` },
      el('rect', { x: -220, y: -230, width: 440, height: 460, rx: 28, fill: '#1a0a0a', stroke: RED, strokeWidth: 4, filter: `drop-shadow(0 0 ${18+pulse(t,1.4)*22}px ${RED}55)` }),
      el('ellipse', { cx: -70, cy: -70, rx: 26, ry: 30, fill: '#0a0a12' }),
      el('ellipse', { cx: 70, cy: -70, rx: 26, ry: 30, fill: '#0a0a12' }),
      el('circle', { cx: -70, cy: -75, r: 7, fill: RED }),
      el('circle', { cx: 70, cy: -75, r: 7, fill: RED }),
      el('path', { d: 'M -70 40 Q 0 -10 70 40', stroke: '#0a0a12', strokeWidth: 12, fill: 'none', strokeLinecap: 'round' }),
      el('text', { x: 0, y: 130, textAnchor: 'middle', fill: RED, fontSize: 46, fontFamily: 'Georgia, serif', fontWeight: 'bold' }, '10 GB FILE'),
      el('text', { x: 0, y: 180, textAnchor: 'middle', fill: '#ff8a8a', fontSize: 22, fontFamily: 'Georgia, serif' }, 'too big to swallow whole!'),
    ),
    caption('"The data doesn\u2019t fit. Now what?"', lineOp),
  ]);
}

// ── Hero intro scene factory ──
function heroScene({ name, role, tagline, color, demo, mood = 'happy' }) {
  return function HeroScene() {
    const { progress: p, localTime: t } = useScene();
    const cardOp = interpolate([0, 0.1], [0, 1])(p);
    const scale = interpolate([0, 0.12], [0.6, 1], Easing.easeOutBack)(p);
    const nameOp = interpolate([0.15, 0.25], [0, 1])(p);
    const roleOp = interpolate([0.28, 0.38], [0, 1])(p);
    const demoOp = interpolate([0.4, 0.5], [0, 1])(p);
    const tagOp = interpolate([0.75, 0.85], [0, 1])(p);
    return svgRoot([
      bg(),
      mascot(W/2, 380, scale, color, mood, t),
      el('text', { x: W/2, y: 620, textAnchor: 'middle', fill: color, fontSize: 56, fontFamily: 'Georgia, serif', fontWeight: 'bold', opacity: nameOp }, name),
      el('text', { x: W/2, y: 665, textAnchor: 'middle', fill: SLATE, fontSize: 24, fontFamily: 'Georgia, serif', fontStyle: 'italic', opacity: roleOp }, role),
      el('g', { opacity: demoOp }, demo(p, t)),
      caption(tagline, tagOp, H - 90),
    ]);
  };
}

// Chunky the Streamer: slurps data from a hose, never floods
function chunkyDemo(p, t) {
  const flow = ((t * 0.6) % 1);
  return el('g', { transform: 'translate(0, 760)' },
    el('rect', { x: W/2 - 260, y: -60, width: 160, height: 120, rx: 12, fill: '#1a0a0a', stroke: RED, strokeWidth: 2 }),
    el('text', { x: W/2 - 180, y: 5, textAnchor: 'middle', fill: RED, fontSize: 18, fontFamily: 'Georgia, serif' }, '10 GB'),
    el('path', { d: `M ${W/2 - 100} 0 Q ${W/2} 60 ${W/2 + 100} 0`, stroke: TEAL, strokeWidth: 10, fill: 'none', strokeLinecap: 'round' }),
    ...[0,1,2].map(i => {
      const fp = (flow + i / 3) % 1;
      const x = (W/2 - 100) + fp * 200;
      const y = Math.sin(fp * Math.PI) * 60;
      return el('rect', { key: i, x: x - 10, y: y - 8, width: 20, height: 16, rx: 4, fill: CYAN, opacity: 0.9 });
    }),
    el('rect', { x: W/2 + 100, y: -50, width: 140, height: 100, rx: 10, fill: '#0a1a2a', stroke: CYAN, strokeWidth: 2 }),
    el('text', { x: W/2 + 170, y: 5, textAnchor: 'middle', fill: CYAN, fontSize: 16, fontFamily: 'Georgia, serif' }, '64 MB'),
    el('text', { x: W/2 + 170, y: 28, textAnchor: 'middle', fill: SLATE, fontSize: 14, fontFamily: 'Georgia, serif' }, 'at a time'),
  );
}

// Sorty: sorts small piles then staples the master list
function sortyDemo(p, t) {
  const piles = [0,1,2,3];
  return el('g', { transform: 'translate(0, 760)' },
    ...piles.map((i) => {
      const x = W/2 - 300 + i * 200;
      const settle = clamp(p * 3 - i * 0.3, 0, 1);
      return el('g', { key: i, transform: `translate(${x}, 0)` },
        ...[0,1,2].map(j => el('rect', { key: j, x: -40, y: -10 - j * 14 * settle, width: 80, height: 12, rx: 3, fill: PURPLE, opacity: 0.5 + j * 0.2 })),
        el('text', { x: 0, y: 40, textAnchor: 'middle', fill: SLATE, fontSize: 15, fontFamily: 'Georgia, serif' }, 'sorted pile'),
      );
    }),
  );
}

// Heapy: juggler, always tosses the smallest ball first
function heapyDemo(p, t) {
  const balls = [GREEN, AMBER, CYAN, PINK, ORANGE];
  return el('g', { transform: 'translate(0, 780)' },
    ...balls.map((c, i) => {
      const phase = (t * 1.1 + i * 0.4) % (Math.PI * 2);
      const x = W/2 - 200 + i * 100;
      const y = -Math.abs(Math.sin(phase)) * 90;
      return el('circle', { key: i, cx: x, cy: y, r: 20, fill: c });
    }),
    el('text', { x: W/2, y: 60, textAnchor: 'middle', fill: SLATE, fontSize: 16, fontFamily: 'Georgia, serif' }, 'smallest one out first!'),
  );
}

// Patch: mail sorter cubbyholes, same address -> same slot
function patchDemo(p, t) {
  const slots = 5;
  return el('g', { transform: 'translate(0, 740)' },
    ...Array.from({ length: slots }, (_, i) => {
      const x = W/2 - 320 + i * 160;
      return el('g', { key: i },
        el('rect', { x: x - 50, y: -10, width: 100, height: 80, rx: 8, fill: '#111827', stroke: ORANGE, strokeWidth: 2 }),
      );
    }),
    ...Array.from({ length: 5 }, (_, i) => {
      const fp = ((t * 0.5 + i / 5) % 1);
      const slot = i % slots;
      const targetX = W/2 - 320 + slot * 160;
      const startX = W/2 - 320 + slot * 160;
      const y = -120 + fp * 120;
      const op = fp > 0.85 ? 0 : 1;
      return el('rect', { key: `env${i}`, x: startX - 18, y, width: 36, height: 22, rx: 4, fill: ORANGE, opacity: op * 0.9 });
    }),
  );
}

// Ghost: bloom filter, translucent watchdog, "seen it!"
function ghostDemo(p, t) {
  const items = 6;
  return el('g', { transform: 'translate(0, 760)' },
    ...Array.from({ length: items }, (_, i) => {
      const fp = ((t * 0.5 + i / items) % 1);
      const x = W/2 - 350 + fp * 700;
      const seen = fp > 0.5;
      return el('g', { key: i, opacity: fp < 0.05 || fp > 0.95 ? 0 : 1 },
        el('circle', { cx: x, cy: 0, r: 16, fill: seen ? GREEN : PINK, opacity: 0.85 }),
        seen ? el('text', { x, y: -28, textAnchor: 'middle', fill: GREEN, fontSize: 14, fontFamily: 'Georgia, serif' }, 'seen it!') : null,
      );
    }),
  );
}

// Checkpoint: saves progress, stamps checkmarks along a bar
function checkpointDemo(p, t) {
  const marks = 5;
  return el('g', { transform: 'translate(0, 760)' },
    el('rect', { x: W/2 - 320, y: -8, width: 640, height: 16, rx: 8, fill: '#0f172a', stroke: '#334155', strokeWidth: 2 }),
    el('rect', { x: W/2 - 318, y: -6, width: 636 * clamp(p * 1.2, 0, 1), height: 12, rx: 6, fill: TEAL }),
    ...Array.from({ length: marks }, (_, i) => {
      const x = W/2 - 320 + (i + 1) * (640 / (marks + 1));
      const show = p > (i + 1) / (marks + 2);
      return el('g', { key: i, opacity: show ? 1 : 0.25 },
        el('circle', { cx: x, cy: 0, r: 14, fill: show ? TEAL : '#334155' }),
        show ? el('text', { x, y: 6, textAnchor: 'middle', fill: '#0a0a12', fontSize: 16, fontWeight: 'bold' }, '\u2713') : null,
      );
    }),
  );
}

const SceneChunky = heroScene({ name: 'Chunky', role: 'The Streamer', tagline: '"Never swallow the whole file \u2014 sip it, gulp by gulp."', color: TEAL, demo: chunkyDemo });
const SceneSorty = heroScene({ name: 'Sorty', role: 'The Librarian', tagline: '"Sort small piles first \u2014 staple the master list later."', color: PURPLE, demo: sortyDemo, mood: 'focused' });
const SceneHeapy = heroScene({ name: 'Heapy', role: 'The Juggler', tagline: '"Always toss out the smallest one first."', color: GREEN, demo: heapyDemo });
const ScenePatch = heroScene({ name: 'Patch', role: 'The Mail Sorter', tagline: '"Same address, same cubby \u2014 every single time."', color: ORANGE, demo: patchDemo });
const SceneGhost = heroScene({ name: 'Ghost', role: 'The Watchdog', tagline: '"I almost never forget \u2014 and I barely take up any room."', color: PINK, demo: ghostDemo });
const SceneCheckpoint = heroScene({ name: 'Checkpoint', role: 'The Scribe', tagline: '"If we get knocked down, we don\u2019t start from zero."', color: TEAL, demo: checkpointDemo, mood: 'focused' });

// ── CLIMAX: the ticking-clock showdown ──
function SceneClimax() {
  const { progress: p, localTime: t } = useScene();
  const titleOp = interpolate([0, 0.06], [0, 1])(p);
  // countdown timer: starts at 10, hits 0 near the end
  const secondsLeft = Math.max(0, Math.ceil(10 - p * 10.5));
  const ramFill = interpolate([0, 0.75], [0.9, 0.15], Easing.easeOutCubic)(p);
  const ramColor = ramFill > 0.7 ? RED : ramFill > 0.4 ? AMBER : GREEN;
  const shakeAmt = ramFill > 0.65 ? Math.sin(t * 35) * (ramFill - 0.65) * 30 : 0;
  const heroSteps = [
    { name: 'Chunky', color: TEAL, at: 0.1 },
    { name: 'Patch', color: ORANGE, at: 0.28 },
    { name: 'Sorty', color: PURPLE, at: 0.46 },
    { name: 'Heapy', color: GREEN, at: 0.64 },
    { name: 'Checkpoint', color: TEAL, at: 0.8 },
  ];
  const activeIdx = heroSteps.reduce((acc, h, i) => (p >= h.at ? i : acc), -1);
  const winOp = interpolate([0.9, 0.98], [0, 1])(p);
  const flashRed = ramFill > 0.75 ? pulse(t, 5) * (ramFill - 0.75) * 2 : 0;

  return svgRoot([
    bg(),
    el('rect', { x: 0, y: 0, width: W, height: H, fill: RED, opacity: flashRed * 0.25 }),
    el('g', { transform: `translate(${shakeAmt}, ${shakeAmt * 0.6})` },
      title('Race Against the Clock!', titleOp),
      // countdown
      el('text', { x: W/2, y: 260, textAnchor: 'middle', fill: secondsLeft <= 3 ? RED : CREAM, fontSize: 140, fontFamily: 'Georgia, serif', fontWeight: 'bold', opacity: interpolate([0.05,0.15],[0,1])(p) }, String(secondsLeft)),
      // RAM gauge
      el('g', { transform: 'translate(960, 380)' },
        el('rect', { x: -300, y: 0, width: 600, height: 40, rx: 10, fill: '#0f172a', stroke: '#334155', strokeWidth: 2 }),
        el('rect', { x: -296, y: 4, width: 592 * ramFill, height: 32, rx: 8, fill: ramColor }),
        el('text', { x: 0, y: 70, textAnchor: 'middle', fill: SLATE, fontSize: 20, fontFamily: 'Georgia, serif' }, 'server memory'),
      ),
      // heroes taking their turn, one at a time
      ...heroSteps.map((h, i) => {
        const active = i === activeIdx;
        const done = p > h.at + 0.16;
        const scale = active ? 1 + pulse(t, 3) * 0.06 : 0.85;
        const x = 260 + i * 350;
        return el('g', { key: i, transform: `translate(${x}, 620) scale(${scale})`, opacity: interpolate([h.at - 0.04, h.at + 0.02], [0.3, 1])(p) },
          el('circle', { cx: 0, cy: 0, r: 80, fill: h.color, opacity: active ? 1 : 0.55 }),
          el('text', { x: 0, y: 8, textAnchor: 'middle', fill: '#0a0a12', fontSize: 20, fontFamily: 'Georgia, serif', fontWeight: 'bold' }, h.name),
          done ? el('text', { x: 0, y: -100, textAnchor: 'middle', fill: GREEN, fontSize: 30 }, '\u2713') : null,
        );
      }),
      caption('Every hero, one job, right on time.', interpolate([0.3,0.4],[0,1])(p), H - 130),
      // last-second win banner
      el('text', { x: W/2, y: H - 60, textAnchor: 'middle', fill: GREEN, fontSize: 40, fontFamily: 'Georgia, serif', fontWeight: 'bold', opacity: winOp }, 'MADE IT \u2014 WITH TIME TO SPARE!'),
    ),
  ]);
}

// ── VICTORY ──
function SceneVictory() {
  const { progress: p, localTime: t } = useScene();
  const titleScale = interpolate([0, 0.2], [0.5, 1], Easing.easeOutElastic)(p);
  const titleOp = interpolate([0, 0.1], [0, 1])(p);
  const rowOp = interpolate([0.3, 0.42], [0, 1])(p);
  const mottoOp = interpolate([0.6, 0.7], [0, 1])(p);
  const heroes = [
    { name: 'Chunky', color: TEAL }, { name: 'Sorty', color: PURPLE }, { name: 'Heapy', color: GREEN },
    { name: 'Patch', color: ORANGE }, { name: 'Ghost', color: PINK }, { name: 'Checkpoint', color: TEAL },
  ];
  return svgRoot([
    bg(),
    ...Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2 + t * 0.3;
      const radius = 220 + Math.sin(t * 0.5 + i) * 90 + i * 6;
      const px = W/2 + Math.cos(angle) * radius;
      const py = 420 + Math.sin(angle) * radius * 0.4;
      const c = heroes[i % heroes.length].color;
      return el('circle', { key: i, cx: px, cy: py, r: 3, fill: c, opacity: titleOp * (0.2 + pulse(t, 0.3 + i * 0.02) * 0.3) });
    }),
    el('g', { transform: `translate(${W/2}, 300) scale(${titleScale})` },
      el('text', { x: 0, y: 0, textAnchor: 'middle', fill: GREEN, fontSize: 74, fontFamily: 'Georgia, serif', fontWeight: 'bold', opacity: titleOp }, 'DATA MONSTER: DEFEATED'),
    ),
    ...heroes.map((h, i) => {
      const x = W/2 - 500 + i * 200;
      return el('g', { key: i, transform: `translate(${x}, 560)`, opacity: rowOp },
        el('circle', { cx: 0, cy: 0, r: 60, fill: h.color }),
        el('text', { x: 0, y: 6, textAnchor: 'middle', fill: '#0a0a12', fontSize: 15, fontFamily: 'Georgia, serif', fontWeight: 'bold' }, h.name),
      );
    }),
    caption('"Stream. Sort in pieces. Merge smart. Never forget where you left off."', mottoOp, H - 150),
    el('text', { x: W/2, y: H - 90, textAnchor: 'middle', fill: SLATE, fontSize: 20, fontFamily: 'Georgia, serif', opacity: mottoOp }, 'The End'),
  ]);
}

window.SceneProblem = SceneProblem;
window.SceneChunky = SceneChunky;
window.SceneSorty = SceneSorty;
window.SceneHeapy = SceneHeapy;
window.ScenePatch = ScenePatch;
window.SceneGhost = SceneGhost;
window.SceneCheckpoint = SceneCheckpoint;
window.SceneClimax = SceneClimax;
window.SceneVictory = SceneVictory;
