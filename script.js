// script.js
// Build slides (sections) for all pages in HRM1–HRM5 (verbatim), with search + chapter nav.
// Also includes an "Export data" to download data.js with SLIDES_EMBED for permanent embedding.

document.addEventListener('DOMContentLoaded', () => {
  const PDF_LIST = [
    { file:'HRM1.pdf', id:'ch1', title:'Chapter 1' },
    { file:'HRM2.pdf', id:'ch2', title:'Chapter 2' },
    { file:'HRM3.pdf', id:'ch3', title:'Chapter 3' },
    { file:'HRM4.pdf', id:'ch4', title:'Chapter 4' },
    { file:'HRM5.pdf', id:'ch5', title:'Chapter 5' },
  ];

  const deck = document.getElementById('deck');
  const chapNav = document.getElementById('chapNav');
  const $q = document.getElementById('q');
  const $exact = document.getElementById('exact');
  const $case = document.getElementById('case');
  const $count = document.getElementById('count');
  const $export = document.getElementById('exportBtn');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Search helpers
  const escapeHtml = s => s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const escReg = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
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

  // Extraction
  async function loadPdf(url){ return await pdfjsLib.getDocument({ url }).promise; }

  async function extractVerbatim(pdf) {
    const pages = pdf.numPages;
    const slides = [];
    for (let p=1;p<=pages;p++){
      const page = await pdf.getPage(p);
      const tc = await page.getTextContent();
      // Sort Y desc, X asc
      const items = tc.items.slice().sort((a,b)=>{
        const ay = Math.round(a.transform[5]), by = Math.round(b.transform[5]);
        if (ay !== by) return by - ay;
        const ax = Math.round(a.transform[4]), bx = Math.round(b.transform[4]);
        return ax - bx;
      });
      // Line building with hasEOL + Y-gap; space for Latin only
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
      slides.push(lines.join('\n'));
    }
    return slides; // array of page texts
  }

  // Build slides in DOM
  function renderSlides(chap, chapTitle, arr) {
    // Chapter anchor
    const chapAnchor = document.createElement('a');
    chapAnchor.href = `#${chap}-1`;
    chapAnchor.textContent = chapTitle;
    chapNav.appendChild(chapAnchor);

    arr.forEach((text, i) => {
      const sec = document.createElement('section');
      sec.id = `${chap}-${i+1}`;
      sec.dataset.chap = chap;
      sec.dataset.page = String(i+1);
      sec.innerHTML = `
        <div class="kicker">${chapTitle} — Slide ${i+1}</div>
        <h2 class="slide-title">${chapTitle}</h2>
        <div class="pagebox">
          <div class="text">${escapeHtml(text)}</div>
        </div>
      `;
      deck.appendChild(sec);
    });
  }

  // Search/filter
  function runSearch(){
    const q = $q.value.trim();
    const opt = { exact:$exact.checked, case:$case.checked };
    let visible = 0;
    deck.querySelectorAll('section').forEach(sec => {
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

  // Scroll spy by chapter
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

  // Prev/Next buttons
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

  // Export embedded data
  function exportData(slidesByChapter){
    const entries = [];
    slidesByChapter.forEach(({chap, title, pages})=>{
      pages.forEach((text, idx)=>{
        entries.push(`  { name:${JSON.stringify(title)}, page:${idx+1}, text:${JSON.stringify(text)} }`);
      });
    });
    const blob = new Blob(
      [
        `// data.js — exported from your PDFs (verbatim)\n`,
        `const SLIDES_EMBED = [\n${entries.join(',\n')}\n];\n`,
        `export default SLIDES_EMBED;\n`
      ],
      {type:'text/javascript'}
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.js';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ---- Load all chapters (from URL ?files= or default list) ----
  (async function init(){
    // Focus shortcut
    document.addEventListener('keydown', (e)=> {
      if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); $q.focus(); $q.select(); }
      if (e.key==='Escape'){ if ($q.value) { $q.value=''; runSearch(); } }
    });

    deck.innerHTML = `<section style="min-height:40vh;align-content:center">
      <div class="pagebox"><div class="text muted">Loading chapters…</div></div>
    </section>`;

    // Allow URL override: ?files=a.pdf,b.pdf,c.pdf…
    const paramFiles = (new URLSearchParams(location.search).get('files')||'')
      .split(',').map(s=>s.trim()).filter(Boolean);
    const list = paramFiles.length
      ? paramFiles.map((f,i)=>({ file:f, id:`ch${i+1}`, title:`Chapter ${i+1}` }))
      : PDF_LIST;

    deck.innerHTML = ''; // clear loader

    const collected = []; // for export
    for (const ch of list){
      try{
        const pdf = await loadPdf(ch.file);
        const slides = await extractVerbatim(pdf);
        renderSlides(ch.id, ch.title, slides);
        collected.push({ chap: ch.id, title: ch.title, pages: slides });
      }catch(err){
        // write an error slide so order remains clear
        const sec = document.createElement('section');
        sec.innerHTML = `
          <div class="kicker">${ch.title}</div>
          <h2 class="slide-title">${ch.title}</h2>
          <div class="pagebox"><div class="text">Failed to load ${ch.file}: ${err.message}</div></div>`;
        deck.appendChild(sec);
      }
    }

    // Build chapter nav & spy
    chapNav.innerHTML = list.map(ch => `<a href="#${ch.id}-1">${ch.title}</a>`).join('');
    initSpy();
    runSearch();
    initControls();

    // Bind search
    let t;
    $q.addEventListener('input', ()=>{ clearTimeout(t); t=setTimeout(runSearch, 120); });
    $exact.addEventListener('change', runSearch);
    $case.addEventListener('change', runSearch);

    // Export
    $export.addEventListener('click', ()=> exportData(collected));
  })();
});
