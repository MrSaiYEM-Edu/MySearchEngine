// script.js (instrumented)
// Loads HRM1–HRM5, extracts pages verbatim in order, builds slides, adds counters + logs.

document.addEventListener('DOMContentLoaded', () => {
  const PDF_LIST = [
    { file:'HRM1.pdf', id:'ch1', title:'Chapter 1' },
    { file:'HRM2.pdf', id:'ch2', title:'Chapter 2' },
    { file:'HRM3.pdf', id:'ch3', title:'Chapter 3' },
    { file:'HRM4.pdf', id:'ch4', title:'Chapter 4' },
    { file:'HRM5.pdf', id:'ch5', title:'Chapter 5' },
  ];

  const deck     = document.getElementById('deck');
  const chapNav  = document.getElementById('chapNav');
  const $q       = document.getElementById('q');
  const $exact   = document.getElementById('exact');
  const $case    = document.getElementById('case');
  const $count   = document.getElementById('count');
  const $export  = document.getElementById('exportBtn');

  // Small counter UI in the header (right side of the search tools)
  const counters = document.createElement('span');
  counters.className = 'muted small';
  counters.style.marginLeft = '8px';
  counters.id = 'loadCounters';
  document.querySelector('.bar-tools')?.appendChild(counters);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const escapeHtml = s => s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const escReg     = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

  const match = (txt, q, opt) => {
    if (!q) return true;
    const src = opt.case ? txt : txt.toLowerCase();
    const qq  = opt.case ? q   : q.toLowerCase();
    if (opt.exact) return src.includes(qq);
    const tokens = qq.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return true;
    return tokens.some(t => src.includes(t));
  };
  const hl = (txt, q, opt) => {
    if (!q) return escapeHtml(txt);
    const flags = opt.case ? 'g' : 'gi';
    if (opt.exact) {
      const re = new RegExp(escReg(q), flags);
      return escapeHtml(txt).replace(re, m => `<mark>${escapeHtml(m)}</mark>`);
    }
    let html = escapeHtml(txt);
    const tokens = [...new Set(q.trim().split(/\s+/).filter(Boolean))];
    tokens.forEach(t => {
      const re = new RegExp(escReg(t), flags);
      html = html.replace(re, m => `<mark>${escapeHtml(m)}</mark>`);
    });
    return html;
  };

  async function loadPdf(url){ return await pdfjsLib.getDocument({ url }).promise; }

  async function extractVerbatim(pdf) {
    const pages = pdf.numPages;
    const out = [];
    for (let p=1;p<=pages;p++){
      const page = await pdf.getPage(p);
      const tc = await page.getTextContent();

      // sort by Y desc, X asc
      const items = tc.items.slice().sort((a,b)=>{
        const ay = Math.round(a.transform[5]), by = Math.round(b.transform[5]);
        if (ay !== by) return by - ay;
        const ax = Math.round(a.transform[4]), bx = Math.round(b.transform[4]);
        return ax - bx;
      });

      // build lines (hasEOL + Y-gap; add spaces for Latin only)
      const lines=[]; let line='', lastY=null, lastX=null;
      for (const it of items){
        const s = it.str ?? '';
        const x = Math.round(it.transform[4]), y = Math.round(it.transform[5]);
        if (lastY!==null && Math.abs(y-lastY)>6){ lines.push(line.trimEnd()); line=''; lastX=null; }
        const needSpace = lastX!==null && x-lastX>8 && /[\p{Latin}\p{N}]/u.test(s);
        line += (needSpace?' ':'') + s;
        if (it.hasEOL){ lines.push(line.trimEnd()); line=''; lastX=null; lastY=y; } else { lastX=x; lastY=y; }
      }
      if (line) lines.push(line.trimEnd());
      out.push(lines.join('\n'));
    }
    return out;
  }

  function section(chap, chapTitle, page, text) {
    const sec = document.createElement('section');
    sec.id = `${chap}-${page}`;
    sec.dataset.chap = chap;
    sec.dataset.page = String(page);
    sec.innerHTML = `
      <div class="kicker">${chapTitle} — Slide ${page}</div>
      <h2 class="slide-title">${chapTitle}</h2>
      <div class="pagebox"><div class="text">${escapeHtml(text)}</div></div>
    `;
    return sec;
  }

  // search
  function runSearch(){
    const q = $q.value.trim();
    const opt = { exact:$exact.checked, case:$case.checked };
    const secs = [...deck.querySelectorAll('section')];

    let visible = 0;
    secs.forEach(sec => {
      const raw = sec.querySelector('.text').textContent || '';
      const show = match(raw, q, opt);
      sec.style.display = show ? '' : 'none';
      if (show) {
        sec.querySelector('.text').innerHTML = hl(raw, q, opt);
        visible++;
      }
    });
    $count.textContent = `${visible} match${visible!==1?'es':''}`;
  }

  function initSpy(){
    const chapLinks = [...chapNav.querySelectorAll('a')];
    const sections  = [...deck.querySelectorAll('section')];
    const linkFor   = chap => chapLinks.find(a => a.getAttribute('href').startsWith(`#${chap}-`));
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (!entry.isIntersecting) return;
        const chap = entry.target.dataset.chap;
        chapLinks.forEach(a => a.classList.remove('active'));
        linkFor(chap)?.classList.add('active');
      });
    }, { rootMargin:'-35% 0px -60% 0px', threshold:[0,1] });
    sections.forEach(s => io.observe(s));
  }

  function initControls(){
    const controls = document.createElement('div');
    controls.className = 'slide-controls';
    controls.innerHTML = `
      <button type="button" aria-label="Previous slide">‹ Prev</button>
      <button type="button" aria-label="Next slide">Next ›</button>
    `;
    document.body.appendChild(controls);
    const [prev,next] = controls.querySelectorAll('button');

    const sections = () => [...deck.querySelectorAll('section')].filter(s=>s.style.display!=='none');
    const curIdx = () => {
      const s = sections(), y = window.scrollY + window.innerHeight*0.35;
      let idx = 0; for (let i=0;i<s.length;i++){ if (s[i].offsetTop <= y) idx=i; } return idx;
    };
    const go = i => { const s = sections(); if (i>=0 && i<s.length) s[i].scrollIntoView({behavior:'smooth', block:'start'}); };

    prev.addEventListener('click', ()=> go(curIdx()-1));
    next.addEventListener('click', ()=> go(curIdx()+1));
    window.addEventListener('keydown', (e)=>{
      const tag = (e.target && e.target.tagName)||''; if (/(INPUT|TEXTAREA|SELECT)/.test(tag)) return;
      if (['PageDown','ArrowDown',' '].includes(e.key)) { e.preventDefault(); go(curIdx()+1); }
      if (['PageUp','ArrowUp'].includes(e.key))         { e.preventDefault(); go(curIdx()-1); }
      if (e.key==='Home') { e.preventDefault(); go(0); }
      if (e.key==='End')  { e.preventDefault(); go(sections().length-1); }
    });
  }

  // export as data.js for “baked” version
  function exportData() {
    const secs = [...deck.querySelectorAll('section')];
    const entries = secs.map(sec => {
      const name = sec.querySelector('.kicker').textContent.replace(/ — Slide \d+$/,'');
      const page = Number(sec.dataset.page||'1');
      const text = sec.querySelector('.text').textContent || '';
      return `  { name:${JSON.stringify(name)}, page:${page}, text:${JSON.stringify(text)} }`;
    }).join(',\n');
    const blob = new Blob([
      `// data.js — exported slides (verbatim)\n`,
      `const SLIDES_EMBED = [\n${entries}\n];\nexport default SLIDES_EMBED;\n`
    ], {type:'text/javascript'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.js';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Init
  (async function init(){
    deck.innerHTML = `<section style="min-height:40vh;align-content:center">
      <div class="pagebox"><div class="text muted">Loading HRM1–HRM5…</div></div>
    </section>`;

    // Allow URL ?files= override
    const paramFiles = (new URLSearchParams(location.search).get('files')||'')
      .split(',').map(s=>s.trim()).filter(Boolean);
    const list = paramFiles.length
      ? paramFiles.map((f,i)=>({ file:f, id:`ch${i+1}`, title:`Chapter ${i+1}` }))
      : PDF_LIST;

    deck.innerHTML = '';
    let totalSlides = 0, loadedChaps = 0;

    // Build chapter nav (links jump to first page of each chapter)
    chapNav.innerHTML = list.map(ch => `<a href="#${ch.id}-1">${ch.title}</a>`).join('');

    // Load in given order (1 → 5)
    for (const ch of list){
      try{
        const pdf = await loadPdf(ch.file);
        const slides = await extractVerbatim(pdf);
        console.log(`[${ch.title}] loaded: ${slides.length} pages`);
        slides.forEach((text, idx) => deck.appendChild(section(ch.id, ch.title, idx+1, text)));
        totalSlides += slides.length; loadedChaps++;
      }catch(err){
        console.warn(`Failed to load ${ch.file}:`, err);
        deck.appendChild(section(ch.id, ch.title, 1, `⚠️ Could not load ${ch.file} — check filename, path, or case sensitivity.`));
      }
    }

    // Counters in header
    document.getElementById('loadCounters').textContent =
      `Chapters: ${loadedChaps}/${list.length} • Slides: ${totalSlides}`;

    // Activate features
    runSearch();
    initSpy();
    initControls();

    // Hook search
    let t;
    $q.addEventListener('input', ()=>{ clearTimeout(t); t=setTimeout(runSearch,120); });
    $exact.addEventListener('change', runSearch);
    $case.addEventListener('change', runSearch);

    // Export button
    $export.addEventListener('click', exportData);
  })();
});
