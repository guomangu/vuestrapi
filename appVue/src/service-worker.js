// Ce fichier est généré automatiquement par la commande `npx workbox-cli generateSW workbox-config.js`
/* eslint-disable */
/* eslint-disable */ 
// Reste du code...
console.log("goood 1");
// Importez les bibliothèques de workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Paramétrer le mode debug pour les environnements de développement
workbox.setConfig({ debug: true });

// Pré-cache les fichiers statiques
workbox.precaching.precacheAndRoute(
  self.__WB_MANIFEST,
  // {url: '/manifest.json', revision: '1'},
  );










  

  self.addEventListener('message', (event) => {
    if (event.data.type === 'updateCache') {
      const url = new URL(event.data.url, self.location.origin);
      event.waitUntil(updateCacheForURL(url));
    }
  });
  
  async function updateCacheForURL(url) {
    const cache = await caches.open('dynamic-route-cache');
    const cachedResponse = await cache.match(url);
  
    if (cachedResponse) {
      // L'URL est déjà en cache, rien à faire
      return;
    }
  
    // L'URL n'est pas en cache, récupérez-la en ligne et mettez-la en cache
    const response = await fetch(url);
    cache.put(url, response.clone());
  }
  
  // Utilisez Workbox pour gérer le cache des routes dynamiques
  workbox.routing.registerRoute(
    new RegExp('.*'), 
    new workbox.strategies.CacheFirst({
      cacheName: 'dynamic-route-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          // Définissez une durée de mise en cache appropriée selon vos besoins
          maxAgeSeconds: 60 * 60 * 24 * 7,
        }),
      ],
    })
  );
  
  
  




  //============================
  
  // workbox.routing.registerRoute(
  //   ({ url }) => {
  //     const pathMatch = '.*'; // Matches alphanumeric strings with dashes
  //     return pathMatch.test(url.pathname);
  //   },
  //   new workbox.strategies.StaleWhileRevalidate({
  //     cacheName: 'dynamic-route-cache',
  //   })
  // );

// Cache les pages HTML de navigation avec NetworkFirst strategy
// workbox.routing.registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'html-cache',
//   })
// );



// workbox.routing.registerRoute(
//   new RegExp('/^\/[a-zA-Z-]+$/'),
//   async ({ event }) => {
//     const networkFirst = new workbox.strategies.NetworkFirst({
//       cacheName: 'my-cache',
//     });
//     let response;
//     try {
//       response = await networkFirst.handle({ event });
//     } catch (error) {
//       console.log('Network request failed, trying to get response from cache');
//       const cache = await caches.open('my-cache');
//       response = await cache.match(event.request);
//     }

//     // If response is still null, then we can return a placeholder or fallback page.
//     if (!response) {
//       // return caches.match('offline.html');
//       return;
//     }

//     return response;
//   }
// );


console.log("goood 2");