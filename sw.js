const CACHE = 'atendimento-bv-v2';
const ASSETS = ['./manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  if(e.request.url.includes('firestore') || e.request.url.includes('googleapis')) return;
  // Navegação (a página em si) sempre busca da rede primeiro, pra nunca travar numa versão antiga.
  if(e.request.mode === 'navigate'){
    e.respondWith(fetch(e.request).catch(()=> caches.match('./index.html')));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached=> cached || fetch(e.request))
  );
});
