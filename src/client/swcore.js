// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
// console.log("SW startup");
var debugEvent = function (event) {
  console.debug("Event: ", event.type, event);
};

var debugMsg = function() {
  var msg = "";
  for (var i = 0; i < arguments.length; i++) {
    msg += arguments[i];
  }
  console.debug(msg);
}

// caches you want to keep
var expectedCaches = [
  'expected-cache'
];
var cacheName = "mystie-dynamic";

var cleanCache1 = function (event) {
  console.log("  clean out cache (1)");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log("try to delete cache: ", cacheName);
          if (!/^mysite-/.test(cacheName)) {
            return;
          }
          if (expectedCaches.indexOf(cacheName) == -1) {
            console.log("    delete: ", cacheName)
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
};

var cleanCache2 = function (event) {
  console.log("  clean out cache (2)");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          return true;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
}

self.addEventListener('install', function (event) {
  debugEvent(event);
});

self.addEventListener('activate', function (event) {
  debugEvent(event)
  cleanCache1(event);
});

self.addEventListener('fetch', function (event) {
  debugEvent(event);
  // Retrieve from Cache and if not available then retrieve from network and store in cache
  // TODO: Implement https://github.com/GoogleChrome/sw-precache - it updates cache if content changes
  // TODO: For this version you need to stop the service worker so the cache is cleared upon activation
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (response) {
          debugMsg("Retrieve item from cache: ", event.request.url);
          return response;
        }
        return fetch(event.request).then(function (response) {
            debugMsg("Item NOT in cache - retrieve from network and cache it (if valid): ", event.request.url);
            if (event.request.method.toString() === "GET") {
              if (event.request.url.toString().startsWith("http")) {
                cache.put(event.request, response.clone());
              }
            }
            return response;
          });
      });
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  debugEvent(event);
});

self.addEventListener('notificationclose', function (event) {
  debugEvent(event);
});

self.addEventListener('message', function (event) {
  debugEvent(event);
});

self.addEventListener('push', function (event) {
  debugEvent(event);
});

self.addEventListener('pushsubscriptionchange', function (event) {
  debugEvent(event);
});

self.addEventListener('sync', function (event) {
  debugEvent(event);
});

self.addEventListener('controllerchange', function (event) {
  debugEvent(event);
});

self.addEventListener('updatefound', function (event) {
  debugEvent(event);
});

self.addEventListener('statechanged', function (event) {
  debugEvent(event);
});

self.addEventListener('error', function (event) {
  debugEvent(event);
});

self.addEventListener('navigate', function (event) {
  debugEvent(event);
});

