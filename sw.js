/* Service worker do CCOM Braga: guarda a "casca" da aplicação para abrir depressa e mostrar o último ecrã sem rede.
   Os dados (ocorrências, previsão, avisos) NUNCA ficam em cache aqui: vêm sempre da rede. */
const V='ccom-v4',CASCA=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CASCA)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){ // página e ícones: rede primeiro, cache se estiver offline
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
  if(/unpkg\.com|cdn\.jsdelivr|fonts\.(googleapis|gstatic)|cdnjs\.cloudflare\.com/.test(u.host)){ // bibliotecas: cache primeiro
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(ch=>ch.put(r,c))}return x})))}
  // tudo o resto (APIs de dados, mapas, satélite): diretamente da rede
});
