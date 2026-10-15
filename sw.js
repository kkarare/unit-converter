// ==========================================
// 🚀 SI·US 단위 변환기 서비스 워커 (sw.js)
// 제작: AI 개발부장 대박이 🐟
// 역할: 오프라인 캐싱 및 초고속 PWA 실행 지원
// ==========================================

const CACHE_NAME = 'unit-converter-v1';

// 오프라인 구동에 필수적인 기본 에셋 목록
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// 1. 서비스 워커 설치 단계 (Install)
// 앱 구동에 필요한 파일들을 브라우저 캐시에 사전 저장합니다.
self.addEventListener('install', (event) => {
    console.log('[Service Worker] 설치 중... 🫡');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] 핵심 파일 사전 캐싱 진행 중... 📦');
            // 파일이 아직 생성되지 않았더라도 설치가 실패하지 않도록 안전하게 개별 캐싱
            return Promise.allSettled(
                STATIC_ASSETS.map((url) => 
                    cache.add(url).catch((err) => {
                        console.warn(`[Service Worker] '${url}' 캐싱 대기 (파일 생성 전일 수 있음):`, err.message);
                    })
                )
            );
        }).then(() => {
            // 대기 상태를 건너뛰고 새 서비스 워커를 즉시 활성화
            return self.skipWaiting();
        })
    );
});

// 2. 서비스 워커 활성화 단계 (Activate)
// 구버전 캐시를 청소하고 클라이언트 제어권을 즉시 가져옵니다.
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] 활성화 완료! 이전 캐시 정리 중... 🧹');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('[Service Worker] 구버전 캐시 삭제:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => {
            // 현재 열려 있는 모든 클라이언트 페이지를 즉시 제어
            return self.clients.claim();
        })
    );
});

// 3. 네트워크 요청 가로채기 단계 (Fetch)
// 캐시 우선(Cache-First) 전략: 비행기 모드나 오프라인에서도 즉시 번개처럼 앱이 실행됩니다!
self.addEventListener('fetch', (event) => {
    // GET 요청만 캐싱 처리 (POST 등 기타 요청 제외)
    if (event.request.method !== 'GET') return;

    // 브라우저 확장 프로그램 요청(chrome-extension 등) 제외
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1) 캐시에 이미 있으면 캐시된 데이터 즉시 반환 (초고속 로딩)
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2) 캐시에 없으면 네트워크로 받아와서 캐시에 보관 후 반환
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // 오프라인 상태에서 페이지 이동 시 기본 index.html 반환
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html') || caches.match('./');
                }
            });
        })
    );
});
