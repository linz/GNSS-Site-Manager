// ServiceWorker in Typescript
// - found Events to use by looking at typings/globals/service_worker_api/index.d.ts and
//   looking for the 'on' event functions.

var debugEvent = function (event: any) {
  console.debug('Event: ', event.type, event);
};

var debugMsg = function (...args: any[]) {
  var msg = '';
  for (var i = 0; i < args.length; i++) {
    msg += args[i];
  }
  console.debug(msg);
};

// caches you want to keep
var expectedCaches = [
  'expected-cache'
];
var cacheName = 'mystie-dynamic';

var cleanCache1 = function (event: any) {
  // let caches = self.caches;
  console.log('  clean out cache (1)');
  event.waitUntil(
    self.caches.keys().then(function (cacheNames: string[]) {
      return Promise.all(
        cacheNames.map(function (cacheName: string) {
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

self.addEventListener('install', function (event: InstallEvent) {
  debugEvent(event);
});

self.addEventListener('activate', function (event: ExtendableEvent) {
  debugEvent(event);
  cleanCache1(event);
});

self.addEventListener('fetch', function (event: FetchEvent) {
  debugEvent(event);
  console.log('Fetch event');
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
        return self.fetch(event.request).then(function (response: Response) {
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

self.addEventListener('notificationclick', function (event: NotificationEvent) {
  debugEvent(event);
});

// Don't think is used
self.addEventListener('notificationclose', function (event: NotificationEvent) {
  debugEvent(event);
});

self.addEventListener('message', function (event: MessageEvent) {
  debugEvent(event);
});

self.addEventListener('push', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('pushsubscriptionchange', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('sync', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('controllerchange', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('updatefound', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('statechanged', function (event: Event) {
  debugEvent(event);
});

self.addEventListener('error', function (event: ErrorEvent) {
  debugEvent(event);
});

// Don't think is used
// self.addEventListener('navigate', function (event:SWEvent) {
//   debugEvent(event);
// });
