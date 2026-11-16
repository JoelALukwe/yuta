document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('smartpath-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);

  const themeButtons = document.querySelectorAll('[id="theme-toggle"]');
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('smartpath-theme', nextTheme);
    });
  });

  const navToggle = document.querySelector('[aria-controls="site-nav"]');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const forms = document.querySelectorAll('form[data-contact-form="true"]');
  forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const statusEl = form.querySelector('.status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      if (statusEl) statusEl.textContent = 'Sending…';
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({ message: 'Request failed.' }));

        if (!response.ok) {
          throw new Error(result.message || 'Unable to send message.');
        }

        form.reset();
        if (statusEl) {
          statusEl.textContent = result.message || 'Message sent successfully.';
          statusEl.classList.remove('error');
        }
      } catch (error) {
        if (statusEl) {
          statusEl.textContent = error.message || 'Failed to send message.';
          statusEl.classList.add('error');
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});

// Progressive enhancement: visible fallback if the official logo asset fails.
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('img[src="/assets/logo.png"]').forEach(img=>{img.addEventListener('error',()=>{img.src='/assets/logo.svg';},{once:true});if(img.complete&&img.naturalWidth===0)img.src='/assets/logo.svg';});
  const nav=document.getElementById('site-nav');if(nav){nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('is-open');document.querySelector('[aria-controls="site-nav"]')?.setAttribute('aria-expanded','false');}});}
  document.querySelectorAll('[id="theme-toggle"]').forEach(b=>b.setAttribute('aria-label','Toggle light and dark theme'));
});

document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a.smartpath-admin-entry').forEach(a=>{a.href='/admin.html';a.setAttribute('aria-label','Open SmartPath content administration');});});

/* Progressive, accessible motion; never hide content without observer support */
document.addEventListener('DOMContentLoaded',()=>{if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const targets=document.querySelectorAll('.section-heading,.people-card,.partner-showcase-card,.person,.profile-feature,.location-card');const obs=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}},{threshold:.08,rootMargin:'0px 0px -25px 0px'});targets.forEach(el=>{el.classList.add('reveal-on-scroll');obs.observe(el)})});

/* Motion enhancement: subtle cursor-follow highlight on cards */
document.addEventListener('DOMContentLoaded',()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||window.matchMedia('(pointer: coarse)').matches)return;document.querySelectorAll('.people-card,.partner-showcase-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height*100)+'%')});card.addEventListener('pointerleave',()=>{card.style.removeProperty('--pointer-x');card.style.removeProperty('--pointer-y')})})});

/* Shared SmartPath visual experience */
document.addEventListener('DOMContentLoaded',()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const icons={community:'♧',science:'⚗',technology:'⌘',care:'♡',pathway:'◇',evidence:'▥',school:'⌂'};
 const kind=t=>/school|teen|girl|adolesc/i.test(t)?'school':/community|partner|people|outreach/i.test(t)?'community':/science|research|diagnos|ferritin/i.test(t)?'science':/technology|data|digital/i.test(t)?'technology':/impact|evidence|measure/i.test(t)?'evidence':/care|treat|iron|maternal/i.test(t)?'care':'pathway';
 document.querySelectorAll('main .card-grid>.card').forEach(card=>{if(card.querySelector('.card-icon,img')||card.closest('.partner-directory,[data-cms-partners]'))return;const h=card.querySelector('h2,h3');if(!h)return;card.classList.add('experience-card');const i=document.createElement('span');i.className='experience-glyph';i.setAttribute('aria-hidden','true');i.textContent=icons[kind(h.textContent)];card.prepend(i)});
 document.querySelectorAll('main .section-heading').forEach(h=>{const i=document.createElement('span');i.className='heading-glyph';i.setAttribute('aria-hidden','true');i.textContent=icons[kind(h.textContent)];h.classList.add('experience-heading');h.append(i)});
 if(!reduce&&'IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('experience-visible');ob.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px 45px 0px'});document.querySelectorAll('main .section-heading,main .card,main .person,main .location-card').forEach(el=>{el.classList.add('experience-reveal');ob.observe(el)})}
 if(document.body.classList.contains('iron-identity')){const hero=document.querySelector('main .hero-copy');if(hero){const im=document.createElement('img');im.src='/assets/partners/iron-it-out.png';im.alt='Iron It Out campaign logo';im.className='iron-campaign-mark';hero.prepend(im)}}
});
