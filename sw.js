// 화면 파일을 네트워크에서 먼저 받고, 오프라인일 때만 캐시를 씁니다.
// 캐시 이름을 바꾸면 이전 캐시는 활성화될 때 지워집니다.

const CACHE_NAME = 'unit-converter-v3';

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './privacy.html',
    './icon-192.png',
    './icon-512.png',
    './icon-maskable-192.png',
    './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => Promise.allSettled(STATIC_ASSETS.map((url) => cache.add(url))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((names) => Promise.all(
                names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    let url;
    try {
        url = new URL(request.url);
    } catch (e) {
        return;
    }
    if (url.origin !== self.location.origin) return;

    event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response && response.ok && response.type === 'basic') {
            cache.put(request, response.clone());
        }
        return response;
    } catch (e) {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
            return (await cache.match('./index.html'))
                || (await cache.match('./'))
                || Response.error();
        }
        return Response.error();
    }
}
