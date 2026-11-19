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

/* Independent orbital motion: depth, proximity response and reduced-motion support. */
document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.hero-art').forEach(art => {
    const nodes = Array.from(art.querySelectorAll('.art-node'));
    if (nodes.length !== 3 || art.dataset.constellationReady) return;
    art.dataset.constellationReady = 'true';
    art.classList.add('smartpath-constellation','constellation-3d');
    art.setAttribute('role','group');
    art.setAttribute('aria-label','SmartPath: Community, Science and Technology');
    const center=art.querySelector('.art-orbit');
    if(center) center.innerHTML='<img src="/assets/logo.png" alt="SmartPath logo" loading="lazy">';
    const config=[
      {name:'Community',color:'#00a5a9',speed:.24,phase:-1.45,rx:.36,ry:.23,tilt:-.25},
      {name:'Science',color:'#ff6b60',speed:-.19,phase:.65,rx:.32,ry:.31,tilt:.65},
      {name:'Technology',color:'#415b6b',speed:.16,phase:2.6,rx:.39,ry:.18,tilt:-.75}
    ];
    nodes.forEach((node,i)=>{
      node.textContent=config[i].name;
      node.style.setProperty('--node-color',config[i].color);
      node.setAttribute('tabindex','0');
      node.setAttribute('aria-label',config[i].name+' pillar');
    });
    let last=0, elapsed=0, pointer=null, focused=-1, raf=0;
    const draw=()=>{
      const w=art.clientWidth,h=art.clientHeight;
      const size=Math.min(w,h);
      nodes.forEach((node,i)=>{
        const c=config[i], angle=c.phase+elapsed*c.speed;
        const x=Math.cos(angle)*size*c.rx;
        const y=Math.sin(angle)*size*c.ry*Math.cos(c.tilt)+Math.cos(angle)*size*.07*Math.sin(c.tilt);
        const depth=Math.sin(angle)*Math.cos(c.tilt);
        const px=w/2+x,py=h/2+y;
        const distance=pointer?Math.hypot(pointer.x-px,pointer.y-py):Infinity;
        const proximity=Math.max(0,1-distance/145);
        const active=focused===i?1:proximity;
        const scale=(.89+(.17*(depth+1)/2))*(1+active*.42);
        node.style.left='50%';node.style.top='50%';node.style.right='auto';node.style.bottom='auto';
        node.style.transform='translate(-50%,-50%) translate3d('+x+'px,'+y+'px,'+(depth*75)+'px) scale('+scale+')';
        node.style.zIndex=String(depth<-.16?2:depth>.2?9:6);
        node.style.opacity=String(.83+Math.max(0,depth)*.17);
        node.style.setProperty('--node-glow',String(active));
      });
      if(center) center.style.zIndex='5';
    };
    const frame=now=>{
      if(!art.isConnected)return;
      if(last&&!reduced.matches&&!document.hidden)elapsed+=Math.min((now-last)/1000,.05);
      last=now;draw();raf=requestAnimationFrame(frame);
    };
    art.addEventListener('pointermove',e=>{
      const r=art.getBoundingClientRect();
      pointer={x:e.clientX-r.left,y:e.clientY-r.top};
    });
    art.addEventListener('pointerleave',()=>{pointer=null;});
    nodes.forEach((node,i)=>{
      node.addEventListener('focus',()=>{focused=i;});
      node.addEventListener('blur',()=>{focused=-1;});
    });
    const observer=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){if(!raf)raf=requestAnimationFrame(frame);}
      else{cancelAnimationFrame(raf);raf=0;last=0;}
    },{threshold:0});
    observer.observe(art);
  });
});
