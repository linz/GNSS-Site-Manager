// ServiceWorker in Typescript
// - found Events to use by looking at typings/globals/service_worker_api/index.d.ts and
//   looking for the 'on' event functions.

function debugEvent (event: Event): void {
  console.debug('Event: ', event.type, event);
};

function debugMsg(...args:any[]): void {
  var msg = '';
  for (var i = 0; i < args.length; i++) {
    msg += args[i];
  }
  console.debug(msg);
};

// caches you want to keep
const expectedCaches = [
  'expected-cache'
];
const cacheName = 'mystie-dynamic';

function cleanCache(event:any): void {
  // let caches = self.caches;
  console.log('  clean out cache (1)');
  event.waitUntil(
    self.caches.keys().then((cacheNames:string[]) => {
      return Promise.all(
        cacheNames.map((cacheName:string) => {
            console.log('try to delete cache: ', cacheName);
            if (!/^mysite-/.test(cacheName)) {
              // Typescript wants a Promise
              return self.caches.has('does not exist');
            }
            if (expectedCaches.indexOf(cacheName) === -1) {
              console.log('    delete: ', cacheName);
              return self.caches.delete(cacheName);
            } else {
              // Typescript wants a Promise
              return self.caches.has('does not exist');
            }
          }
        ));
    })
  );
};

self.addEventListener('install', debugEvent);

self.addEventListener('activate', (event:ExtendableEvent) => {
  debugEvent(event);
  cleanCache(event);
});

self.addEventListener('fetch', (event: FetchEvent) => {
  debugEvent(event);
  // Retrieve from Cache and if not available then retrieve from network and store in cache
  // TODO: Implement https://github.com/GoogleChrome/sw-precache - it updates cache if content changes
  // TODO: For this version you need to stop the service worker so the cache is cleared upon activation
  // let caches: CacheStorage;
  event.respondWith(
    self.caches.open(cacheName).then((cache: Cache) => {
      return cache.match(event.request).then((response: Response) => {
        if (response) {
          debugMsg('Retrieve item from cache: ', event.request.url);
          return response;
        }
        return self.fetch(event.request).then((response:Response) => {
          debugMsg('Item NOT in cache - retrieve from network and cache it (if valid): ', event.request.url);
          if (event.request.method.toString() === 'GET') {
            if (event.request.url.toString().startsWith('http')) {
              cache.put(event.request, response.clone());
            }
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener('notificationclick', debugEvent);

// Don't think is used
self.addEventListener('notificationclose', debugEvent);

self.addEventListener('message', debugEvent);

self.addEventListener('push', debugEvent);

self.addEventListener('pushsubscriptionchange', debugEvent);

self.addEventListener('sync', debugEvent);

self.addEventListener('controllerchange', debugEvent);

self.addEventListener('updatefound', debugEvent);

self.addEventListener('statechanged', debugEvent);

self.addEventListener('error', debugEvent);

// Don't think is used
// self.addEventListener('navigate', (event:SWEvent) => {
//   debugEvent(event);
// });
