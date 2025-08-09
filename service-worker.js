const CACHE_NAME = "skillbarter-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  // add any images you want cached here, e.g.:
  "me.PNG",
  "pfp.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/men/67.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Clean up old caches if needed
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
  );
});
