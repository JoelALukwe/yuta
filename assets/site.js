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
      const statusEl = form.querySelector('.status, #form-feedback, [role="status"]');
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

/* SmartPath connected-care constellation: shared across every hero-art instance. */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.hero-art').forEach((art) => {
    const nodes = [...art.querySelectorAll('.art-node')];
    if (nodes.length !== 3 || art.dataset.constellationReady) return;
    art.dataset.constellationReady = 'true';
    art.classList.add('smartpath-constellation');
    art.setAttribute('aria-label', 'SmartPath connects Community, Science and Technology');
    const center = art.querySelector('.art-orbit');
    if (center) {
      center.innerHTML = '<img src="/assets/logo.png" alt="SmartPath logo" loading="lazy">';
    }
    const colors = ['#00a5a9', '#ff6b60', '#415b6b'];
    const names = ['Community', 'Science', 'Technology'];
    nodes.forEach((node, i) => {
      node.textContent = names[i];
      node.style.setProperty('--node-color', colors[i]);
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', names[i] + ': connected care pillar');
    });
    let phase = 0, last = 0, paused = false, tiltX = 0, tiltY = 0;
    const position = () => {
      const w = art.clientWidth, h = art.clientHeight;
      const radius = Math.min(w, h) * 0.37;
      nodes.forEach((node, i) => {
        const angle = phase + i * Math.PI * 2 / 3 - Math.PI / 2;
        const depth = Math.sin(angle + 0.5);
        node.style.left = '50%';
        node.style.top = '50%';
        node.style.right = 'auto';
        node.style.bottom = 'auto';
        node.style.transform = 'translate(-50%, -50%) translate3d(' + (Math.cos(angle) * radius) + 'px,' + (Math.sin(angle) * radius * .77) + 'px,' + (depth * 32) + 'px) scale(' + (1 + depth * .08) + ')';
        node.style.zIndex = String(Math.round(5 + depth * 3));
      });
      art.style.setProperty('--tilt-x', tiltX + 'deg');
      art.style.setProperty('--tilt-y', tiltY + 'deg');
    };
    const frame = (now) => {
      if (!document.documentElement.contains(art)) return;
      if (!reduceMotion.matches && !paused && !document.hidden) phase += Math.min((now - (last || now)) / 1000, .05) * .24;
      last = now;
      position();
      requestAnimationFrame(frame);
    };
    art.addEventListener('pointermove', (event) => {
      if (reduceMotion.matches) return;
      const r = art.getBoundingClientRect();
      tiltY = ((event.clientX - r.left) / r.width - .5) * 13;
      tiltX = -((event.clientY - r.top) / r.height - .5) * 13;
    });
    art.addEventListener('pointerleave', () => { tiltX = 0; tiltY = 0; paused = false; });
    nodes.forEach(node => {
      node.addEventListener('pointerenter', () => { paused = true; });
      node.addEventListener('pointerleave', () => { paused = false; });
      node.addEventListener('focus', () => { paused = true; });
      node.addEventListener('blur', () => { paused = false; });
    });
    requestAnimationFrame(frame);
  });
});
