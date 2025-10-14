// script.js
// PDF-based search (verbatim). Supports multiple PDFs, Khmer/English. No generated content.

const $file = document.getElementById('file');
const $q = document.getElementById('q');
const $exact = document.getElementById('exact');
const $case = document.getElementById('case');
const $results = document.getElementById('results');
const $fileCount = document.getElementById('fileCount');
const $slideCount = document.getElementById('slideCount');
const $resultCount = document.getElementById('resultCount');
const $tips = document.getElementById('tips');

// TOC dropdown
const $tocBtn = document.getElementById('tocBtn');
const $tocMenu = document.getElementById('tocMenu');
const $tocClose = document.getElementById('tocClose');
const $tocList = document.getElementById('tocList');

// Data model: [{docId, name, page, text}]
let SLIDES = [];
let DOCS = []; // [{id, name, pages}]

// --- PDF loading helpers ---
async function loadPDF(file, id) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = pdf.numPages;
  const name = file.name.replace(/\.pdf$/i, '');
  DOCS.push({ id, name, pages });

  for (let p = 1; p <= pages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    // Join text items, preserve rough line breaks
    const lines = [];
    let lastY = null;
    let buf = [];
    for (const item of content.items) {
      const str = item.str || '';
      const y = Math.round(item.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 6) {
        // new line
        lines.push(buf.join(' '));
        buf = [];
      }
      buf.push(str);
      lastY = y;
    }
    if (buf.length) lines.push(buf.join(' '));
    const text = lines.join('\n');
    SLIDES.push({ docId: id, name, page: p, text });
  }
}

function updateCounts() {
  $fileCount.textContent = DOCS.length;
  $slideCount.textContent = SLIDES.length;
}

function renderTOC() {
  // group by doc
  const groups = new Map();
  SLIDES.forEach(s => {
    if (!groups.has(s.docId)) groups.set(s.docId, []);
    groups.get(s.docId).push(s);
  });
  $tocList.innerHTML = [...groups.entries()].map(([docId, pages]) => {
    const doc = DOCS.find(d => d.id === docId);
    const items = pages
      .sort((a,b)=>a.page-b.page)
      .map(s => `<a class="link" data-jump="${docId}:${s.page}">${doc.name} — Slide ${s.page}</a>`).join('');
    return `<div class="group">
      <div class="group-title">${doc.name} <span class="muted small">(${pages.length} slides)</span></div>
      ${items}
    </div>`;
  }).join('') || `<div class="muted small">No slides loaded yet.</div>`;
}

function toggleTOC(show) {
  $tocMenu.hidden = (show === undefined) ? !$tocMenu.hidden : !show ? true : false;
}

// --- Search ---
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

function highlight(text, query, opt) {
  if (!query) return escapeHtml(text);
  const flags = opt.case ? 'g' : 'gi';
  if (opt.exact) {
    const re = new RegExp(escapeReg(query), flags);
    return escapeHtml(text).replace(re, m => `<mark>${escapeHtml(m)}</mark>`);
  }
  // ANY of the terms; Khmer-friendly: split by whitespace; if none, do substring
  const words = query.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return escapeHtml(text);
  let html = escapeHtml(text);
  // Deduplicate small function-words? Keep simple: highlight all tokens
  [...new Set(words)].forEach(w => {
    const re = new RegExp(escapeReg(w), flags);
    html = html.replace(re, m => `<mark>${escapeHtml(m)}</mark>`);
  });
  return html;
}

function matchSlide(text, query, opt) {
  if (!query) return true;
  const src = opt.case ? text : text.toLowerCase();
  const q  = opt.case ? query : query.toLowerCase();
  if (opt.exact) return src.includes(q);
  const tokens = q.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  // Match if any token occurs (broad recall for Khmer + English)
  return tokens.some(tok => src.includes(tok));
}

function renderResults() {
  const query = $q.value.trim();
  const opt = { exact: $exact.checked, case: $case.checked };

  const hits = SLIDES.filter(s => matchSlide(s.text, query, opt))
                     .sort((a,b)=> (a.name.localeCompare(b.name)) || (a.page-b.page));

  $resultCount.textContent = `${hits.length} result${hits.length !== 1 ? 's' : ''}`;
  $tips.style.display = SLIDES.length ? 'none' : '';

  $results.innerHTML = hits.map(s => {
    const h = highlight(s.text, query, opt);
    return `
      <article class="card" role="listitem" tabindex="0" data-doc="${s.docId}" data-page="${s.page}">
        <h3>${s.name} — Slide ${s.page}<span class="badge">verbatim</span></h3>
        <div class="meta">File: ${escapeHtml(s.name)}.pdf • Page: ${s.page}</div>
        <div class="text">${h}</div>
        <div class="actions">
          <button data-copy="${s.docId}:${s.page}">Copy slide text</button>
        </div>
      </article>
    `;
  }).join('') || `<p class="muted">No matches yet. Upload PDF(s) and search any words, phrases, or questions.</p>`;
}

// --- Event wiring ---
$file.addEventListener('change', async (e) => {
  const files = [...e.target.files].filter(f => f.type === 'application/pdf');
  if (!files.length) return;

  // Reset state when new files are chosen (optional: comment out to append)
  SLIDES = [];
  DOCS = [];
  $results.innerHTML = `<p class="muted">Loading PDFs…</p>`;

  let idSeq = 0;
  for (const f of files) {
    const id = `doc${++idSeq}`;
    try {
      await loadPDF(f, id);
    } catch (err) {
      console.error('PDF load failed:', f.name, err);
    }
  }
  updateCounts();
  renderTOC();
  renderResults();
});

// search input
let t;
$q.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(renderResults, 120);
});
$exact.addEventListener('change', renderResults);
$case.addEventListener('change', renderResults);

// keyboard shortcuts
document.addEventListener('keydown', (e)=>{
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); $q.focus(); $q.select(); }
  if(e.key==='Escape'){ if ($q.value) { $q.value=''; renderResults(); } }
});

// results actions
$results.addEventListener('click', (e)=>{
  const copyBtn = e.target.closest('button[data-copy]');
  if (copyBtn) {
    const [docId, page] = copyBtn.dataset.copy.split(':');
    const s = SLIDES.find(x => x.docId===docId && x.page===+page);
    if (s) {
      navigator.clipboard?.writeText(s.text);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=>copyBtn.textContent='Copy slide text', 1000);
    }
  }
});

// TOC interactions
$tocBtn.addEventListener('click', ()=> toggleTOC(true) );
$tocClose.addEventListener('click', ()=> toggleTOC(false) );
document.addEventListener('click', (e)=>{
  if (!$tocMenu.contains(e.target) && !$tocBtn.contains(e.target)) {
    toggleTOC(false);
  }
});
$tocList.addEventListener('click', (e)=>{
  const link = e.target.closest('a[data-jump]');
  if (!link) return;
  const [docId, pageStr] = link.dataset.jump.split(':');
  const card = document.querySelector(`article[data-doc="${docId}"][data-page="${pageStr}"]`);
  toggleTOC(false);
  if (card) {
    card.scrollIntoView({behavior:'smooth', block:'start'});
    card.focus();
  } else {
    // If not rendered (e.g., filtered by search), clear search and render all
    $q.value = '';
    renderResults();
    setTimeout(()=>{
      const again = document.querySelector(`article[data-doc="${docId}"][data-page="${pageStr}"]`);
      again?.scrollIntoView({behavior:'smooth', block:'start'});
      again?.focus();
    }, 50);
  }
});

// initial state
renderResults();
