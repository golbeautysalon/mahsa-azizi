const CACHE="mahsa-azizi-v5-auto-update";
const ASSETS=["./manifest.webmanifest","./icon-192.png","./icon-512.png","./images/cover.jpg","./images/page01.jpg","./images/page02.jpg","./images/page03.jpg","./images/page04.jpg","./images/last-logo.jpg"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener("fetch",e=>{if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).catch(()=>caches.match("./index.html")));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;})))});
