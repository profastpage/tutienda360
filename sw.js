/**
 * TuTienda360 - Service Worker
 * Cache estratégico para PWA
 */

const CACHE_NAME = 'tutienda360-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/favoritos.html',
    '/producto-detalle.html',
    '/carrito.html',
    '/checkout.html',
    '/login.html',
    '/categorias.html',
    '/styles/main.css',
    '/styles/producto.css',
    '/styles/favoritos.css',
    '/scripts/theme.js',
    '/scripts/favoritos.js',
    '/scripts/favoritos-page.js',
    '/scripts/utils.js',
    '/scripts/main.js',
    '/scripts/producto-detalle.js'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache abierto');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache viejo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Estrategia: Cache First, luego Network
self.addEventListener('fetch', (event) => {
    // Ignorar peticiones que no sean GET
    if (event.request.method !== 'GET') return;

    // Ignorar peticiones externas (APIs, CDN)
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Retornar desde cache
                    return cachedResponse;
                }

                // Si no está en cache, hacer fetch a la red
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Clonar la respuesta porque es un stream
                        const responseClone = networkResponse.clone();

                        // Abrir cache y guardar la respuesta
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Solo cachear respuestas exitosas
                                if (networkResponse.status === 200) {
                                    cache.put(event.request, responseClone);
                                }
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // Si falla la red, retornar offline page
                        return caches.match('/index.html');
                    });
            })
    );
});

// Mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
