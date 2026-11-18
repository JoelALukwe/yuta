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
