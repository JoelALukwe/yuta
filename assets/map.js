(()=>{'use strict';const host=document.getElementById('smartpath-map');if(!host)return;const frame=host.querySelector('iframe');if(!frame)return;let active='all';
function locations(){return Array.from(document.querySelectorAll('.location-card[data-lat]')).map(c=>({id:c.id,title:c.querySelector('h3')?.textContent||'SmartPath location',status:c.dataset.status||'exploratory',lat:Number(c.dataset.lat),lon:Number(c.dataset.lon)}))}
function send(type,more={}){frame.contentWindow?.postMessage({source:'smartpath-atlas',type,...more},location.origin)}
function filter(value){active=value;document.querySelectorAll('.filter-btn[data-filter]').forEach(b=>{let yes=b.dataset.filter===value;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});document.querySelectorAll('.location-card[data-status]').forEach(c=>c.hidden=value!=='all'&&c.dataset.status!==value);send('filter',{filter:value})}
function redraw(){send('locations',{locations:locations(),filter:active})}
document.querySelectorAll('.filter-btn[data-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.source!=='smartpath-atlas')return;if(e.data.type==='ready')redraw();if(e.data.type==='focus'){const card=document.getElementById(e.data.id);if(card){filter('all');card.scrollIntoView({behavior:'smooth',block:'center'})}}});
window.addEventListener('smartpath:locations-updated',()=>setTimeout(redraw,50));frame.addEventListener('load',redraw);filter('all');
})();