/* Dressing du matin : l’appli s’ouvre même sans réseau. La page est rechargée depuis le réseau quand il est là (mises à jour), sinon depuis le cache. */
const CACHE = "dm-v16";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("dm-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (r.mode === "navigate" && u.origin === self.location.origin) {
    e.respondWith(fetch(r).then((res) => {
      if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put("./index.html", cp)); }
      return res;
    }).catch(() => caches.match("./index.html").then((m) => m || caches.match("./"))));
    return;
  }
  const fonts = u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com";
  if (u.origin === self.location.origin || fonts) {
    e.respondWith(caches.match(r).then((hit) => {
      const net = fetch(r).then((res) => {
        if (res && (res.ok || (fonts && res.type === "opaque"))) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
  }
});
