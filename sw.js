importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(
  new RegExp('/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'caktus-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 10
      })
    ]
  })
)

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.(?:js|css)$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'simon-game-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        // Cache for 10 hours.
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  // Use the cache if it's available.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'simon-game-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

// // Todo lo demás usa Network First
workbox.routing.registerRoute(
  new RegExp('/^https?.*/'),
  new workbox.strategies.NetworkFirst()
)
