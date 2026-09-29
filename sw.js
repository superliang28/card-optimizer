/* Service worker: app shell cached for offline use; data files fetched network-first so quarterly updates show up. */
const VERSION = 'whichcard-v1';
const SHELL = ['./', './index.html', './app.js', './styles.css', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'];
const DATA = ['./data/cards.json', './data/categories.json', './data/merchants.json', './data/profile.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL.concat(DATA)).catch(() => null)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== 'GET') return;
  const isData = url.pathname.includes('/data/');
  const isShell = SHELL.some((s) => url.pathname.endsWith(s.replace('./', '/'))) || url.pathname.endsWith('/');
  if (!isData && !isShell) return;
  // Network first (so updates land), falling back to cache when offline. Cache key ignores the ?v= cache-buster.
  const cacheKey = new Request(url.origin + url.pathname);
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res && res.ok) caches.open(VERSION).then((c) => c.put(cacheKey, res.clone()));
      return res;
    }).catch(() => caches.match(cacheKey).then((hit) => hit || caches.match('./index.html')))
  );
});
