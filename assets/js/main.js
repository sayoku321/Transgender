(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle (persist with localStorage)
    const themeKey = 'lg_theme';
    const themeBtn = $('#themeToggle');
    const saved = localStorage.getItem(themeKey);
    if(saved === 'light'){ document.body.classList.add('theme-light'); }
    themeBtn?.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      localStorage.setItem(themeKey, document.body.classList.contains('theme-light') ? 'light':'dark');
    });

    // Smooth scroll for sidebar links

    $$('.side-nav a').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if(href && href.startsWith('#')){
          e.preventDefault();
          const target = $(href);
          if(target){
            target.scrollIntoView({behavior:'smooth', block:'start'});
            history.pushState(null, '', href);
          }
        }
      });
    });

    // Active section highlight on scroll (IntersectionObserver)
    const sections = $$('.section');
    const navLinks = $$('.side-nav a');
    const map = new Map();
    sections.forEach(sec => {
      map.set('#'+sec.id, sec);
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = '#'+entry.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href')===id));
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px', threshold:[0,1]});
    sections.forEach(sec=>obs.observe(sec));

    // Accessible accordion enhancement

    $$('.accordion').forEach(d => {
      const summary = d.querySelector('summary');
      if(summary){
        summary.setAttribute('role','button');
        summary.setAttribute('aria-expanded', d.hasAttribute('open') ? 'true':'false');
        summary.addEventListener('click', ()=>{
          const expanded = d.hasAttribute('open');
          summary.setAttribute('aria-expanded', expanded ? 'true':'false');
        });
      }
    });
  });
})();
