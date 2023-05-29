import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';





// router.beforeEach(async (to, from, next) => {
//     // const pathMatch = /^\/[a-zA-Z-]+$/;
  
//     // // Vérifie si l'URL actuelle et la nouvelle URL correspondent à la route dynamique
//     // if (pathMatch.test(from.path) && pathMatch.test(to.path)) {
//     //   // Mettre à jour le cache
//     //   const cache = await caches.open('dynamic-route-cache');
//     //   const response = await fetch(to.fullPath);
//     //   await cache.put(to.fullPath, response.clone());
  
//     //   // Configurer Workbox pour utiliser la stratégie StaleWhileRevalidate
//     //   registerRoute(
//     //     ({ url }) => pathMatch.test(url.pathname),
//     //     new StaleWhileRevalidate({
//     //       cacheName: 'dynamic-route-cache',
//     //     //   plugins: [
//     //     //     new ExpirationPlugin({
//     //     //       maxEntries: 50,
//     //     //       maxAgeSeconds: 7 * 24 * 60 * 60, // 1 semaine
//     //     //     }),
//     //     //   ],
//     //     })
//     //   );
//     // }
  
//     next();
//   });























  
// if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js');
  });
// }




createApp(App).use(store).use(router).mount('#app')

