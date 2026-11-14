// Prüft alle Seiten vor jedem Commit: Screenshots (Handy 390 px + Desktop 1440 px, ganze Seite)
// und Warnungen bei übergroßen Bildern oder horizontalem Überlauf.
// Aufruf:  node tools/check.mjs [ausgabeordner]   (Standard: %TEMP%/hs-check)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const out = resolve(process.argv[2] || join(tmpdir(), "hs-check"));
mkdirSync(out, { recursive: true });
const edgePaths = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = edgePaths.find(existsSync);
if (!browser) { console.error("Kein Edge/Chrome gefunden"); process.exit(2); }

const port = 9333;
const profile = join(tmpdir(), "hs-check-profile");
const proc = spawn(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  try { const t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); wsUrl = t.find((x) => x.type === "page")?.webSocketDebuggerUrl; } catch {}
  if (!wsUrl) await sleep(200);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map(); const waiters = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method) for (const w of [...waiters]) if (w.method === m.method) { waiters.splice(waiters.indexOf(w), 1); w.res(m.params); }
});
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); }).then((m) => { if (m.error) throw new Error(method + ": " + m.error.message); return m.result; });
const once = (method) => new Promise((res) => waiters.push({ method, res }));
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result.value;
await send("Page.enable");

const PROBE = `(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
  scrollTo(0, 0);
  const t = ms => new Promise(r => setTimeout(r, ms));
  await Promise.race([Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))), t(5000)]);
  await Promise.race([document.fonts.ready, t(2000)]);
  const vw = innerWidth, vh = innerHeight, issues = [];
  for (const img of document.images) {
    const r = img.getBoundingClientRect();
    if (!r.width || getComputedStyle(img).visibility === 'hidden') continue;
    if (img.closest('.hs-lots,.hs-track')) continue; // Laufbänder dürfen breiter sein
    if (r.height > vh * 1.1) issues.push('Bild höher als Bildschirm: ' + img.getAttribute('src') + ' (' + Math.round(r.width) + '×' + Math.round(r.height) + ')');
    if (r.right > vw + 1 || r.left < -1) issues.push('Bild ragt seitlich heraus: ' + img.getAttribute('src'));
  }
  if (document.documentElement.scrollWidth > vw + 1) issues.push('Horizontaler Überlauf: Seite ' + document.documentElement.scrollWidth + ' px bei ' + vw + ' px Breite');
  return { h: document.documentElement.scrollHeight, issues };
})()`;

const pages = readdirSync(root).filter((f) => f.endsWith(".html"));
const views = [{ name: "mobil", width: 390, height: 844, mobile: true, scale: 2 }, { name: "desktop", width: 1440, height: 900, mobile: false, scale: 1 }];
let problems = 0;
for (const v of views) {
  await send("Emulation.setDeviceMetricsOverride", { width: v.width, height: v.height, deviceScaleFactor: v.scale, mobile: v.mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: v.mobile });
  for (const f of pages) {
    const loaded = once("Page.loadEventFired");
    await send("Page.navigate", { url: pathToFileURL(join(root, f)).href });
    await Promise.race([loaded, sleep(10000)]);
    const { h, issues } = await evaluate(PROBE);
    await sleep(300);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: v.width, height: Math.min(h, 16000), scale: v.mobile ? 0.5 : 0.5 } });
    const file = join(out, `${v.name}-${f.replace(".html", "")}.jpg`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    problems += issues.length;
    console.log(`${issues.length ? "✗" : "✓"} ${v.name.padEnd(7)} ${f.padEnd(32)} ${h} px  → ${file}`);
    for (const i of issues) console.log("     " + i);
  }
}
ws.close(); proc.kill();
console.log(problems ? `\n${problems} Problem(e) gefunden.` : "\nKeine Probleme gefunden.");
process.exit(problems ? 1 : 0);
