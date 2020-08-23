const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
  '/',
  '/css/styles.css',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/imgs/dish.png',
  '/pages/fallback.html',
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      } 
    })
  })
}

// Listen for install events 
self.addEventListener("install", event => {
  //console.log("Service worker has been installed :)", event)
 event.waitUntil(caches.open(staticCacheName).then(cache => {
   console.log("Caching shell")
   cache.addAll(assets)
 }))
})

// Any changes made to this file will reinstall the service worker when the browser reloads

// activate service worker. Event handler
self.addEventListener("activate", event => {
  //console.log("sw activated :)")
  // this deletes old caches
  event.waitUntil(
    caches.keys().then(keys => {
      console.log(keys)
      return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCache)
      .map(key => caches.delete(key)))
    })
  )
})


// fetch events
// Service workers can listen to fetch events which are request to a server
// self.addEventListener("", event => {
//   console.log("Fetch event ", event)
// })

self.addEventListener("fetch", event => {
  console.log("fetch event ", event);
  if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
    // respond with a resource from the cache for every requests
    event.respondWith(
      //  we attach respondWith() to prevent the browser 's default response.
      caches.match(event.request).then
      // event.request is just our array of assets.
      (cachesRes => {
        // Return resources stored in local cache else return rsources from server
        return cachesRes || fetch(event.request).then(fetchRes => {
          return caches.open(dynamicCache).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            limitCacheSize(dynamicCache, 20)
            return fetchRes;
          })
        });
      }).catch(() => caches.match('/pages/fallback.html'))
    )
  }
}
)

// For sw browser cache is not always helpful because, we have no control on what the browser can store


// On 22/08/2020 I paused on the 18th video of the tutorial. The tutorial illustrated how we can delete cached files to provide updated stateic files to our service worker :)