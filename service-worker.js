self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    event.waitUntil(
        caches.open("auto-booking-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/styles.css",
                "/script.js",
                "/manifest.json",
                "/icon.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});