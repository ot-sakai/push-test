var CACHE_NAME = 'pwasample';
var urlsToCache = [
    './',
    './index.html',
    './main.js',
    './manifest.json',
    './service-worker.js',
    './firebase-messaging-sw.js',
    './modules/config.mjs',
    './modules/token.mjs' 
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                if(response) return response;

                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(function(response) {
                    if(!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CHACH_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                })
                
            })
    );
});
