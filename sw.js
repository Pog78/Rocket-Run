const CACHE_NAME = 'rocket-run-v1';

// List EVERY file your game needs to run offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './assets/app-icon.png',
    './assets/BackgroundMusic.mp3',
    './assets/ButtonClick.wav',
    './assets/CoinCollect.wav',
    './assets/Crash.wav',
    './assets/ShieldShatter.wav',
    './assets/Start.wav',
    './assets/Warp.wav'
];

// Install Event: Cache all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Event: Serve from cache if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached version if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});

// Activate Event: Clean up old caches when you update the version number
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
