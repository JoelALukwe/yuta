(()=>{'use strict';
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e;};
const validUrl=u=>typeof u==='string'&&/^\/(?:uploads|assets)\/[a-z0-9_./-]+$/i.test(u)&&!u.includes('..');
function cardPartner(p){const a=make('article','card'),status=make('span','eyebrow',p.status||'Relationship under review'),h=make('h3','',p.name||'Organisation'),d=make('p','',p.description||'');a.append(status,h);if(p.description)a.append(d);if(validUrl(p.logo)){const img=make('img');img.src=p.logo;img.alt=(p.name||'Organisation')+' logo';img.loading='lazy';img.className='partner-logo';a.prepend(img);}return a;}
function cardLocation(p,i){if(!Number.isFinite(Number(p.lat))||!Number.isFinite(Number(p.lon)))return null;const a=make('article','location-card');a.id='cms-location-'+i;a.dataset.lat=p.lat;a.dataset.lon=p.lon;a.dataset.status=p.status||'exploratory';a.append(make('span','status',p.status||'Status to verify'),make('h3','',p.name||'Location'),make('p','',p.description||''));return a;}
function cardStory(p){const a=make('article','card');if(validUrl(p.image)){const img=make('img');img.src=p.image;img.alt=p.alt||p.title||'SmartPath story';img.loading='lazy';a.append(img);}a.append(make('h3','',p.title||'Story'),make('p','',p.summary||p.description||''));if(validUrl(p.url)){const link=make('a','text-link','Read story');link.href=p.url;a.append(link);}return a;}
function gallery(p){const a=make('figure','media-tile');if(validUrl(p.url)){const img=make('img');img.src=p.url;img.alt=p.alt||p.caption||'SmartPath programme photograph';img.loading='lazy';a.append(img);}if(p.caption)a.append(make('figcaption','',p.caption));return a;}
async function init(){let data;try{const r=await fetch('/content/site.json',{cache:'no-store'});if(!r.ok)return;data=await r.json();}catch{return;}
const partners=document.querySelector('[data-cms-partners]');if(partners&&Array.isArray(data.partners)&&data.partners.length)partners.replaceChildren(...data.partners.map(cardPartner));
const loc=document.querySelector('[data-cms-locations]');if(loc&&Array.isArray(data.locations)){const nodes=data.locations.map(cardLocation).filter(Boolean);if(nodes.length){loc.replaceChildren(...nodes);window.dispatchEvent(new Event('smartpath:locations-updated'));}}
const stories=document.querySelector('[data-cms-stories]');if(stories&&Array.isArray(data.stories)&&data.stories.length)stories.replaceChildren(...data.stories.map(cardStory));
const galleryTarget=document.querySelector('[data-cms-gallery]');if(galleryTarget&&Array.isArray(data.gallery)&&data.gallery.length)galleryTarget.replaceChildren(...data.gallery.map(gallery));
const ironGallery=document.querySelector('[data-cms-iron-gallery]');if(ironGallery&&Array.isArray(data.ironGallery)&&data.ironGallery.length)ironGallery.replaceChildren(...data.ironGallery.map(gallery));
}
document.addEventListener('DOMContentLoaded',init);
})();
