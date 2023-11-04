import CryptoJS from 'crypto-js'
import localforage from 'localforage'


localforage.config({
  name        : 'cache-test',
  version     : 0.1,
  storeName   : 'graphql_cache_test',
  description : 'testing graphql cache'
});

async function staleWhileRevalidate(event) {
  const cachedResponse = await getCache(event.request.clone());
  const fetchPromise = fetch(event.request.clone())
    .then((response) => {
      setCache(event.request.clone(), response.clone());
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
  const serializedHeaders = {};
  for (const entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  const serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  const body = await request.json();
  const id = CryptoJS.MD5(body.query).toString();

  const entry = {
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now()
  };
  localforage.setItem(id, entry)
}

async function getCache(request) {
  let data;
  try {
    const body = await request.json();
    const id = CryptoJS.MD5(body.query).toString();
    data = await localforage.getItem(id);
    if (!data) return null;

    const cacheControl = request.headers.get('Cache-Control');
    const maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
    if (Date.now() - data.timestamp > maxAge * 1000) {
      console.log(`Cache expired. Load from API endpoint.`);
      return null;
    }

    console.log(`Load response from cache.`);
    return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

const version = '{{ version }}';

self.addEventListener('install', function(event) {
  console.log('service worker installed');
  event?.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener("activate", (event) => {
  self.clients.matchAll({
    includeUncontrolled: true
  }).then(function(clientList) {
    const urls = clientList.map(function(client) {
      return client.url;
    });
    console.log('[ServiceWorker] Matching clients:', urls.join(', '));
  });
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== version) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {

      console.log('[ServiceWorker] Claiming clients for version', version);
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', async (event) => {
  if (event?.request?.method === 'POST') {
    event?.respondWith?.(staleWhileRevalidate(event));
  }
});

// cache failed mutations and save to indexedDb  (task results)
// every 10 secs attempt to resend mutation, if succeeds then remove from indexdb
