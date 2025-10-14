// script.js
// Verbatim search + exact PDF page view. Embedded data from HRM4.pdf (49 slides).
// Multiple PDFs supported at runtime (Upload / drag-drop / ?files=HRM4.pdf).

/* ------------------- Embedded verbatim slides ------------------- */
/* Source: HRM4.pdf — Employee Testing and Selection (exact text lines) */
const SLIDES_EMBED = [
  {name:"HRM4",page:1,text:`Compiled by Peng Putheara, MBA 1
Chapter 4
Employee Testing and 
Selection`},
  {name:"HRM4",page:2,text:`Compiled by Peng Putheara, MBA 2
Learning Objectives
Learning objectives:
After you have read this chapter, you should be able to:
Define Selection.
Identify the environment factors that affect the selection process.
Describe the general selection process, typical selection decision process, 
and typical selection responsibilities.
Explain the importance of the preliminary interview.
Identify the types of questions that should be asked on an application form.
Describe the basic conditions that should be met if the selection tests are to 
be used in the screening process.
Describe the types of employment tests.
Describe the basic types of interviewing.
Describe the various method of interviewing.
Explain the legal implications of interviewing.
Explain why reference checks and background investigations are conducted.
Explain the reasons for pre-employment physical examinations.`},
  {name:"HRM4",page:3,text:`Compiled by Peng Putheara, MBA 3
Employee Testing and Selection
Employee testing and selection is the 
use of various tools and techniques to 
select the best candidates for the job. 
These tools cover the selection 
process, basic testing techniques, 
background and reference checks, 
ethical and legal questions in testing, 
types of tests, and work samples and 
simulations.
Definition`},
  {name:"HRM4",page:4,text:`Compiled by Peng Putheara, MBA 4
Why Careful Selection Is 
Important?
HR manager’s performance depends on the 
performance of subordinates
The cost to recruit and hire is high
Legal implications of incompetent hiring are 
costly and can result in negligent hiring
litigation`},
  {name:"HRM4",page:5,text:`Compiled by Peng Putheara, MBA 5
Signification of Selection
Selection: The process of choosing from a 
group of applicants those individuals best 
suited for a particular position in an 
organization.
After recruitment, the next step is the 
identification of the best quality of selection 
decision would greatly depend on 
recruitment success.`},
  {name:"HRM4",page:6,text:`Compiled by Peng Putheara, MBA 6
Signification of Selection (Cont’d) 
When competitors have the same technology, 
differences in people become important
Selection process is also affected by the other HR 
functions (Training, Compensation)
Goal of selection process is to find a fit between 
individuals and the job or organization, otherwise 
will cause high turnover which is very costly for 
the organization`},
  {name:"HRM4",page:7,text:`Compiled by Peng Putheara, MBA 7
Factors Affecting Selection Process
1. Legal Considerations
Make sure that useful selection tools should 
also be legally defensible 
Thus, requires extensive knowledge of the 
legal aspects of selection (needs lawyers).`},
  {name:"HRM4",page:8,text:`Compiled by Peng Putheara, MBA 8
Factors Affecting Selection (Cont’d)
2. Speed of Decision Making
Make sure that useful selection tools should 
also be legally defensible
Some positions might need to be filled 
immediately while other can wait.
If speed is necessary, there will be more 
danger to have legal problems.`},
  {name:"HRM4",page:9,text:`Compiled by Peng Putheara, MBA 9
Factors Affecting Selection (Cont’d)
3. Organizational Hierarchy
The higher vacant position is in the hierarchy, 
the higher will also be the need to give 
careful attention to selection (Top-level 
Executive vs. Clerical Position).`},
  {name:"HRM4",page:10,text:`Compiled by Peng Putheara, MBA 10
Factors Affecting Selection (Cont’d)
4. Types of Organization
Private businesses are stricter because 
selection could affect their profitability.
Government offices are less strict, probably 
giving only a competitive examination. 
Not-for-profit organizations (especially those 
with low salary levels) seek not only the 
qualifications but also the dedication to the 
job.`},
  {name:"HRM4",page:11,text:`Compiled by Peng Putheara, MBA 11
Factors Affecting Selection (Cont’d)
5. Probationary Period
Those with probationary periods can 
evaluate an employee’s ability based on 
established performance (can substitute 
certain phases of the selection process).
Those which do not have should be more 
careful with the other phases of selection`},
  {name:"HRM4",page:12,text:`Compiled by Peng Putheara, MBA 12
Selection Process
1. Preliminary Interview
Purpose: To eliminate those who 
obviously do not meet the position’s 
requirements.
Also to steer the prospective employee 
to anther position.
Thus, can maximize recruitment and 
selection effectiveness.`},
  {name:"HRM4",page:13,text:`Compiled by Peng Putheara, MBA 13
Selection Process (Cont’d)
2. Review of Application
Have employee complete an application 
form, and employer will review the form.
Form should be well-designed to provide 
the required data.
Because it is standardized, may be more 
helpful than resumes (Different Forms).`},
  {name:"HRM4",page:14,text:`Compiled by Peng Putheara, MBA 14
Selection Process (Cont’d)
The information contained in a completed 
application for employment is compared to the job 
description to determine whether a potential match 
exists between the firm’s requirements and the 
applicant’s qualifications.
Danger: Applicants frequently exaggerate their 
qualifications.`},
  {name:"HRM4",page:15,text:`Compiled by Peng Putheara, MBA 15
Selection Process (Cont’d)
3. Review of Resumes
No hard and fast rules for designing resumes.
If the resume is being prepared in response to 
an ad. or knowledge of a specific job opening, 
the resume should reflect the skills and 
abilities of the applicant that apply to the open 
position.`},
  {name:"HRM4",page:16,text:`Compiled by Peng Putheara, MBA 16
Selection Process (Cont’d)
4. Administration of Selection Test
Becoming more prevalent for assessing an 
applicant’s qualifications and potential for 
success. 
Selection testing can be a reliable and 
accurate way to select qualified candidates 
from a pool of applicants.
However, selection tests must be job related.`},
  {name:"HRM4",page:17,text:`Compiled by Peng Putheara, MBA 17
Types of Employment Tests
1. Cognitive Aptitude Tests
Used to determine general reasoning ability, 
memory, vocabulary, verbal fluency, and 
numerical ability.
Helpful to identify job candidates who have 
extensive knowledge bases.
Identify who can adapt quickly to job changes 
and rapid technological advances.`},
  {name:"HRM4",page:18,text:`Compiled by Peng Putheara, MBA 18
Types of Employment Tests 
(Cont’d)
2. Psychomotor Abilities Tests
To measure strength, coordination, and dexterity.
Especially important due to miniaturization in 
assembly operations.
3. Job Knowledge Tests
Measure candidate’s knowledge of the duties of the 
job for which he or she is applying.
May also be specially designed based on the data 
derived from job analysis.`},
  {name:"HRM4",page:19,text:`Compiled by Peng Putheara, MBA 19
Types of Employment Tests 
(Cont’d)
4. Work-Sample Tests (Simulations)
Require an applicant to perform a task or set of 
tasks representative of the job.
Try a simulated job (Much effective to have them 
do actual jobs).
5. Vocational Interest Tests
Show the occupation a person is most interested in 
and the one likely to provide satisfaction.
Can be used in screening applicants, but their 
primary use has been in counseling and vocational 
guidance.`},
  {name:"HRM4",page:20,text:`Compiled by Peng Putheara, MBA 20
Types of Employment Tests 
(Cont’d)
6. Personality Tests
Used to classify personality types.
Use as selection tools, they lack face 
validity.
Honesty and integrity are important 
personality traits to consider in the 
selection process.`},
  {name:"HRM4",page:21,text:`Compiled by Peng Putheara, MBA 21
How to Validate a Test
Analyze job & 
write description
1
Choose the 
tests 2
Administer 
tests 3
Relate scores & 
criteria 4
Cross-validate
& revalidate
5`},
  {name:"HRM4",page:22,text:`Compiled by Peng Putheara, MBA 22
Types of Employment Tests 
(Cont’d)
7. Genetic Tests
Can determine whether a person carries the 
gene mutation for certain diseases, including 
heart disease, colon cancer, breast cancer.
Predictive testing allows employers to reject 
certain employees and maintain a more 
productive workforce.
Allows employers to foresee likely health-care 
costs and to avoid hiring at risk candidates.
It enables therapeutic intervention, thereby 
allowing carriers to get appropriate therapy.`},
  {name:"HRM4",page:23,text:`Compiled by Peng Putheara, MBA 23
Types of Employment Tests 
(Cont’d)
8. Grapho-Analysis (Handwriting Analysis)
Involves using a trained analyst to examine the 
lines, loops, hooks, strokes, curves, and 
flourishes in a person’s handwriting to assess 
the person’s personality, performance, 
emotional problems, and honesty.`},
  {name:"HRM4",page:24,text:`Compiled by Peng Putheara, MBA 24
Hand Writing Tests
Graphology may not be used as a screening 
test as it is not reliable.`},
  {name:"HRM4",page:25,text:`Compiled by Peng Putheara, MBA 25
Interview
An interview is a procedure designed to 
obtain information from a person through oral 
responses to oral inquiries.
A selection interview is a selection procedure 
designed to predict future job performance 
on the basis of applicants’ oral responses to 
oral inquiries.
Definition`},
  {name:"HRM4",page:26,text:`Compiled by Peng Putheara, MBA 26
Employment Interview 
1. Employment Interview
Permits the employer to get some idea of 
the applicant’s appearance, job knowledge, 
intelligence, and personality.
2. Purposes of Interview
Obtaining information about applicants.
Providing information about organization. 
Establishing friendship.`},
  {name:"HRM4",page:27,text:`Compiled by Peng Putheara, MBA 27
Employment Interview (Cont’d) 
3. How to interview successfully
Never argue
Conduct the interview in a quiet atmosphere.
Try to avoid being unduly influenced by the 
applicant’s trivial mannerisms or superficial 
resemblance to other people you know.
Determine the questions you want to ask 
before beginning the interview.
Give your entire attention to the applicant.`},
  {name:"HRM4",page:28,text:`Compiled by Peng Putheara, MBA 28
Employment Interview (Cont’d) 
Put the applicant at ease.
Listen attentively.
Keep the conversation at a level suited to the 
applicant.
Observe closely the applicant’s speech, mannerisms 
and attire if these characteristics are important to the 
job.`},
  {name:"HRM4",page:29,text:`Compiled by Peng Putheara, MBA 29
Employment Interview (Cont’d) 
4. Problems in conducting interview
To avoid the possibility of running into legal problems 
with the EEOC, the interviewer should refrain from: 
Direct or indirect inquiries will reveal the applicant’s 
national, ethnic, or racial origin.
Questions to female applicants on marital status, number 
and age of children, pregnancy, or future child-bearing 
plans.
Inquiries about arrest or conviction records, unless such 
information is demonstrably job-related.`},
  {name:"HRM4",page:30,text:`Compiled by Peng Putheara, MBA 30
Types of Interviews 
1. Unstructured (Nondirective) Interview
Applicant do much of the talking.
Obtains different information from different 
candidates.
Likelihood that ill-advised, potentially discriminatory
information will be discussed.
Applicant may volunteer information the interviewer
does not need or want to know (and may claim that
he did not get the job because of this information.`},
  {name:"HRM4",page:31,text:`Compiled by Peng Putheara, MBA 31
Types of Interviews (Cont’d) 
2. Structured (Directive) Interview
Provides interviews with a planned format for 
questioning candidates. 
Interviewers are trained in questioning and 
recording responses. 
Using a structured format results in answers which 
are uniform in nature.
Increasing reliability and accuracy of interview by 
reducing the subjectivity and inconsistency of 
unstructured interviews.`},
  {name:"HRM4",page:32,text:`Compiled by Peng Putheara, MBA 32
Types of Interviews (Cont’d) 
3. Behavior Description Interviewing
Situational behaviors are carefully selected
for their relevance to job success.
Benchmark answers derived from behaviors
of successful employees are prepared for
use in rating applicant responses.`},
  {name:"HRM4",page:33,text:`Compiled by Peng Putheara, MBA 33
Methods of Interviewing (Cont’d) 
Depending on level of position to be filled 
and the labor market to be tapped
1. One-on-One Interview
Often less threatening (Because only one 
interviewer).
2. Group Interview
May provide useful insights into the candidate’s
interpersonal competence as they engage in
group discussion.
Also saves time for busy professionals and 
executives.`},
  {name:"HRM4",page:34,text:`Compiled by Peng Putheara, MBA 34
Methods of Interviewing (Cont’d) 
3. Board Interview
Interviewee’s anxiety level is often quite high
(Thus, may affect the results).
4. Stress Interview
Purpose is to determine the applicant’s tolerance
for stress.
Important if the job requires the ability to deal
with a high level of stress.
Thus, the stress does not seem to be appropriate
for the majority of situation.`},
  {name:"HRM4",page:35,text:`Compiled by Peng Putheara, MBA 35
Methods of Interviewing (Cont’d) 
5. Videotaped Interview
Used to reduce cost (still cover more 
applicants).
A structured interview may be used.
To assure standardized treatment of other 
similarly conducted interviews, the interviewer 
may not interact with the candidate but only 
repeat the question, if necessary.`},
  {name:"HRM4",page:36,text:`Compiled by Peng Putheara, MBA 36
Methods of Interviewing (Cont’d) 
6. Realistic Job Previews
Both interviewers and applicants exaggerate, 
resulting to dissatisfaction.
Employees who had RJP exhibit lower 
turnover and greater job satisfaction.`},
  {name:"HRM4",page:37,text:`Compiled by Peng Putheara, MBA 37
5 Steps in Interview Design
Job Analysis
Rate the Job Duties
Create Interview
Questions
Create Benchmark
Answers
Appoint Panel & 
Conduct Interviews`},
  {name:"HRM4",page:38,text:`Compiled by Peng Putheara, MBA 38
Personal Reference Checks 
Most organizations use both the mail and the 
telephone to check reference. 
Generally, telephone checks are preferable 
because they save time and provide for greater 
candor. 
The most reliable information usually comes 
from supervisors, who are in the best position to 
report on an applicant’s work habits and 
performance.`},
  {name:"HRM4",page:39,text:`Compiled by Peng Putheara, MBA 39
Personal Reference (Cont’d) 
It is often advisable, however, to obtain 
written verification of information relating 
to the job titles, duties, and pay levels 
from the former employer’s HR office. 
By using sources in addition to former 
employers, organizations can obtain 
valuable information about an applicant’s 
character and habits.`},
  {name:"HRM4",page:40,text:`Compiled by Peng Putheara, MBA 40
Reference Check Form`},
  {name:"HRM4",page:41,text:`Compiled by Peng Putheara, MBA 41
Reference Check Form (Cont.)`},
  {name:"HRM4",page:42,text:`Compiled by Peng Putheara, MBA 42
Sample of a Reference Check Form
Applicant Name ............................................................................................
Company Contacted.....................................Date........................................
Person Contacted.............................Title.....................................................
1- Dates of Employment From............................To..............................................
2- Positions & Duties Held.....................................................................................
3- Attendance Record Poor Average Good
4- Reasons for Termination Discharged Resigned 
5- Job Performance Rating Poor Average Good
6- Friendliness Distant Approachable Warm
7- Attitude Uncooperative Cooperative
8- Knowledge of Field Poor Average Good
9- Strengths and Weaknesses.............................................................................
10- Any Additional Information Obtained...........................................................
Signature of Person Conducting Reference Check.................................`},
  {name:"HRM4",page:43,text:`Compiled by Peng Putheara, MBA 43
1. Explain and illustrate the basic ways in which you 
can classify selection interviews.
2. Briefly describe each of the following possible types 
of interviews: unstructured panel interviews; 
structured sequential interviews; job-related 
structured interviews.
3. For what sorts of jobs do you think computerized 
interviews are most appropriate? Why?`},
  {name:"HRM4",page:44,text:`Compiled by Peng Putheara, MBA 44
Physical Examination 
Many organizations require a medical 
examination before an employee is hired. 
To determine whether he or she is physically 
capable of performing the job.
But also to determine the applicant’s eligibility 
for group life, health, and disability insurance. 
Because of the expense, medical examinations 
are normally given as one of the last steps in the 
selection process.`},
  {name:"HRM4",page:45,text:`Compiled by Peng Putheara, MBA 45
Physical Examination (Cont’d) 
The expense of medical examinations has also 
caused many organizations to have applicants 
complete a health questionnaire when they fill 
out their application form. 
If no serious medical problems are indicated 
on the medical questionnaire, the applicant is 
not normally required to have a medical 
examination.`},
  {name:"HRM4",page:46,text:`Compiled by Peng Putheara, MBA 46
Making Selection Decisions 
A value judgment based on all of the 
information gathered in the previous steps must 
be made to select the most qualified individual.
If the previous steps have been performed 
properly, the chances of making a successful 
judgment are improved dramatically.`},
  {name:"HRM4",page:47,text:`Compiled by Peng Putheara, MBA 47
Responsibility of Making Selection 
Decisions 
It is assigned to different levels of management in 
different organizations: 
In some organizations, the HRD handles the 
completion of application forms, conducts 
preliminary interviews, testing, and reference 
checking, and arranges for physical exams.
But, diagnostic interview and final selection 
decision usually left to the manager of 
department.`},
  {name:"HRM4",page:48,text:`Compiled by Peng Putheara, MBA 48
Responsibility of Making Selection 
Decisions (Cont’d) 
In other organizations, the HRD handles 
all of the steps up to the final selection 
decision.
Under this system, the HRD gives the 
manager with a job opening a list of three 
to five qualified applicants.`},
  {name:"HRM4",page:49,text:`Compiled by Peng Putheara, MBA 49
Responsibility of Making Selection 
Decisions (Cont’d)
The manager then choose the individual 
that he or she feels will be the best 
employee based on all the information 
provided by the HRD.
Many organizations leave the final choice 
to the manager with the job opening, 
subject to the approval of those at higher 
levels of management.`},
];

/* ------------------- App state & DOM ------------------- */
const $file = document.getElementById('file');
const $q = document.getElementById('q');
const $exact = document.getElementById('exact');
const $case = document.getElementById('case');
const $autoExact = document.getElementById('autoExact');
const $results = document.getElementById('results');
const $fileCount = document.getElementById('fileCount');
const $slideCount = document.getElementById('slideCount');
const $resultCount = document.getElementById('resultCount');
const $tips = document.getElementById('tips');
const $tocBtn = document.getElementById('tocBtn');
const $tocMenu = document.getElementById('tocMenu');
const $tocClose = document.getElementById('tocClose');
const $tocList = document.getElementById('tocList');

const $modal = document.getElementById('modal');
const $modalTitle = document.getElementById('modalTitle');
const $modalClose = document.getElementById('modalClose');
const $pageCanvas = document.getElementById('pageCanvas');
const $zoomIn = document.getElementById('zoomIn');
const $zoomOut = document.getElementById('zoomOut');

let SLIDES = [...SLIDES_EMBED.map((s,i)=>({...s, docId:`embed-${s.name}`, _idx:i}))];
let DOCS = []; // runtime-loaded PDFs for exact view
let SCALE = 1.2;

function setCounts(){ $fileCount.textContent = DOCS.length; $slideCount.textContent = SLIDES.length; }
function setStatus(msg){ $results.innerHTML = `<p class="muted">${msg}</p>`; }
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

/* ------------------- TOC ------------------- */
function renderTOC(){
  const groups = new Map();
  SLIDES.forEach(s => { const key = `${s.name}`; (groups.get(key) ?? groups.set(key,[]).get(key)).push(s); });
  const html = [...groups.entries()].map(([name, pages])=>{
    pages.sort((a,b)=>a.page-b.page);
    const items = pages.map(s=>`<a class="link" data-jump="${s.name}:${s.page}">${s.name} — Slide ${s.page}</a>`).join('');
    return `<div class="group">
      <div class="group-title">${name} <span class="muted small">(${pages.length} slides)</span></div>
      ${items}
    </div>`;
  }).join('');
  $tocList.innerHTML = html || `<div class="muted small">No slides loaded yet.</div>`;
}
function toggleTOC(show){ $tocMenu.hidden = (show===undefined)?!$tocMenu.hidden:!show; }

/* ------------------- Search ------------------- */
function matchSlide(text, query, opt){
  if(!query) return true;
  const src = opt.case? text : text.toLowerCase();
  const q = opt.case? query : query.toLowerCase();
  if(opt.exact) return src.includes(q);
  const tokens = q.trim().split(/\s+/).filter(Boolean);
  if(tokens.length===0) return true;
  return tokens.some(t=>src.includes(t)); // OR-match (robust for Khmer + English)
}
function highlight(text, query, opt){
  if(!query) return escapeHtml(text);
  const flags = opt.case ? 'g' : 'gi';
  if(opt.exact){
    const re = new RegExp(escapeReg(query), flags);
    return escapeHtml(text).replace(re, m=>`<mark>${escapeHtml(m)}</mark>`);
  }
  const tokens = [...new Set(query.trim().split(/\s+/).filter(Boolean))];
  let html = escapeHtml(text);
  tokens.forEach(t=>{
    const re = new RegExp(escapeReg(t), flags);
    html = html.replace(re, m=>`<mark>${escapeHtml(m)}</mark>`);
  });
  return html;
}
function renderResults(){
  const query = $q.value.trim();
  const opt = { exact:$exact.checked, case:$case.checked };
  const hits = SLIDES.filter(s=>matchSlide(s.text, query, opt))
                     .sort((a,b)=> (a.name.localeCompare(b.name)) || (a.page-b.page));
  $resultCount.textContent = `${hits.length} result${hits.length!==1?'s':''}`;
  $tips.style.display = SLIDES.length ? 'none' : '';
  $results.innerHTML = hits.map(s=>{
    const h = highlight(s.text, query, opt);
    return `<article class="card" role="listitem" tabindex="0" data-name="${s.name}" data-page="${s.page}">
      <h3>${s.name} — Slide ${s.page}<span class="badge">verbatim</span></h3>
      <div class="meta">File: ${escapeHtml(s.name)}.pdf • Page: ${s.page}</div>
      <div class="text">${h}</div>
      <div class="actions">
        <button data-open="${s.name}:${s.page}">Open exact slide</button>
        <button data-copy="${s.name}:${s.page}">Copy slide text</button>
      </div>
    </article>`;
  }).join('') || `<p class="muted">No matches yet. Upload PDF(s) or add <code>?files=HRM4.pdf</code>, then search.</p>`;
}

/* ------------------- Exact PDF rendering ------------------- */
function getDocByName(name){ return DOCS.find(d=>d.name===name) || null; }
async function ensureDocLoaded(name){
  // If already loaded via upload/URL, return it; else try fetch from same path: `${name}.pdf`
  let doc = getDocByName(name);
  if(doc) return doc;
  try{
    const url = `${name}.pdf`; // requires the PDF in the repo root
    const pdf = await pdfjsLib.getDocument({ url }).promise;
    doc = { id:`url-${name}`, name, pages: pdf.numPages, pdf };
    DOCS.push(doc); setCounts();
    return doc;
  }catch(e){
    // Not fatal—user can upload
    throw new Error(`Could not load ${name}.pdf. Upload the PDF or use ?files=${name}.pdf`);
  }
}
let SCALE = 1.2;
async function openExact(name, pageNo){
  try{
    const doc = await ensureDocLoaded(name);
    const page = await doc.pdf.getPage(Number(pageNo));
    const vp = page.getViewport({ scale: SCALE });
    const ctx = $pageCanvas.getContext('2d');
    $pageCanvas.width = Math.floor(vp.width);
    $pageCanvas.height = Math.floor(vp.height);
    $modalTitle.textContent = `${doc.name} — Slide ${pageNo}`;
    $modal.hidden = false;
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
  }catch(err){
    $modal.hidden = false;
    const ctx = $pageCanvas.getContext('2d');
    ctx.clearRect(0,0,$pageCanvas.width,$pageCanvas.height);
    $pageCanvas.width = 900; $pageCanvas.height = 140;
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--ink').trim() || '#222';
    ctx.font = '16px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.fillText(err.message, 20, 40);
    ctx.fillText('Tip: Upload the PDF via the button, or place it in the repo and open with ?files=HRM4.pdf', 20, 80);
  }
}
function closeModal(){ $modal.hidden = true; }
document.getElementById('modalClose').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.getElementById('zoomIn').addEventListener('click', async ()=>{
  SCALE = Math.min(3, SCALE + 0.2);
  const m = $modalTitle.textContent.match(/(.+)\s—\sSlide\s(\d+)/); if(m) openExact(m[1], m[2]);
});
document.getElementById('zoomOut').addEventListener('click', async ()=>{
  SCALE = Math.max(0.6, SCALE - 0.2);
  const m = $modalTitle.textContent.match(/(.+)\s—\sSlide\s(\d+)/); if(m) openExact(m[1], m[2]);
});

/* ------------------- Upload / drag-drop / URL auto-load ------------------- */
async function loadLocal(files){
  SLIDES = []; DOCS = []; setCounts();
  setStatus('Loading PDF(s)…');
  let id = 0;
  for (const f of files){
    if (f.type !== 'application/pdf') continue;
    try{
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const name = f.name.replace(/\.pdf$/i,'');
      DOCS.push({ id:`local-${++id}`, name, pages: pdf.numPages, pdf });
      for (let p=1; p<=pdf.numPages; p++){
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const items = content.items.slice().sort((a,b)=>{
          const ay = Math.round(a.transform[5]), by = Math.round(b.transform[5]);
          if (ay !== by) return by - ay;
          const ax = Math.round(a.transform[4]), bx = Math.round(b.transform[4]);
          return ax - bx;
        });
        const lines=[]; let line='', lastY=null, lastX=null;
        for (const it of items){
          const str = it.str ?? '';
          const x = Math.round(it.transform[4]); const y = Math.round(it.transform[5]);
          if (lastY!==null && Math.abs(y-lastY)>6){ lines.push(line.trimEnd()); line=''; lastX=null; }
          const needsSpace = lastX!==null && x-lastX>8 && /[\p{Latin}\p{N}]/u.test(str);
          line += (needsSpace?' ':'') + str;
          if (it.hasEOL){ lines.push(line.trimEnd()); line=''; lastX=null; lastY=y; } else { lastX=x; lastY=y; }
        }
        if (line) lines.push(line.trimEnd());
        SLIDES.push({ name, page:p, text:lines.join('\n') });
      }
    }catch(e){
      setStatus(`Failed to open ${f.name}: ${e.message}`);
    }
  }
  setCounts(); renderTOC(); renderResults();
}
$file.addEventListener('change', e=>{
  const files = [...e.target.files]; if (files.length) loadLocal(files);
});
['dragenter','dragover'].forEach(evt =>
  document.addEventListener(evt, e=>{ e.preventDefault(); e.dataTransfer.dropEffect='copy'; })
);
document.addEventListener('drop', e=>{
  e.preventDefault(); const files=[...(e.dataTransfer?.files||[])]; if(files.length) loadLocal(files);
});
(async function autoLoad(){
  // Pre-load embedded slides for search immediately
  setCounts(); renderTOC(); renderResults();
  // Optional: load PDFs from URL param to enable exact view without upload
  const list = (new URLSearchParams(location.search).get('files')||'').split(',').map(s=>s.trim()).filter(Boolean);
  for (const path of list){
    try{
      const pdf = await pdfjsLib.getDocument({ url: path }).promise;
      const name = path.split('/').pop().replace(/\.pdf$/i,'') || `doc${DOCS.length+1}`;
      DOCS.push({ id:`url-${name}`, name, pages: pdf.numPages, pdf });
      setCounts();
    }catch(e){ /* ignore; exact view will show guidance */ }
  }
})();

/* ------------------- Events ------------------- */
let debounce;
$q.addEventListener('input', ()=>{ clearTimeout(debounce); debounce=setTimeout(renderResults,120); });
$exact.addEventListener('change', renderResults);
$case.addEventListener('change', renderResults);
document.addEventListener('keydown', (e)=>{
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); $q.focus(); $q.select(); }
  if(e.key==='Escape'){ if($q.value){ $q.value=''; renderResults(); } }
});
$results.addEventListener('click', async (e)=>{
  const openBtn = e.target.closest('button[data-open]');
  const copyBtn = e.target.closest('button[data-copy]');
  if(openBtn){
    const [name,page] = openBtn.dataset.open.split(':');
    await openExact(name, page);
  }
  if(copyBtn){
    const [name,page] = copyBtn.dataset.copy.split(':');
    const s = SLIDES.find(x=>x.name===name && x.page===Number(page));
    if(s){
      navigator.clipboard?.writeText(s.text);
      copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy slide text', 900);
      if ($autoExact.checked) openExact(name, page);
    }
  }
});
$tocBtn.addEventListener('click', ()=>toggleTOC(true));
$tocClose.addEventListener('click', ()=>toggleTOC(false));
document.addEventListener('click', (e)=>{ if(!$tocMenu.contains(e.target) && !$tocBtn.contains(e.target)) toggleTOC(false); });
$tocList.addEventListener('click', async (e)=>{
  const link = e.target.closest('a[data-jump]'); if(!link) return;
  const [name,page] = link.dataset.jump.split(':'); toggleTOC(false); await openExact(name, page);
});
