var TOTAL = 6;
var current = 0;
var pageLabels = ["Before you start","AI makers","Methods","Go further","Quick reference","Production note"];

function buildJump(){
  var sel = document.getElementById('jumpSelect');
  sel.innerHTML = '';
  pageLabels.forEach(function(label, i){
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = (i+1) + '. ' + label;
    sel.appendChild(opt);
  });
}

function render(){
  document.querySelectorAll('.page').forEach(function(p){
    p.classList.toggle('active', parseInt(p.getAttribute('data-page')) === current);
  });
  document.getElementById('jumpSelect').value = current;
  document.getElementById('pageCount').textContent = (current+1) + ' / ' + TOTAL;
  document.getElementById('backBtn').disabled = (current === 0);
  document.getElementById('nextBtn').disabled = (current === TOTAL-1);
  if(current === 4) renderGrid();
  window.scrollTo({top:0, behavior:'smooth'});
}

function changePage(delta){
  var next = current + delta;
  if(next < 0 || next > TOTAL-1) return;
  current = next;
  render();
}

function jumpByTime(val){
  if(val === '') return;
  current = parseInt(val);
  render();
}

/* ================= FILTERABLE REFERENCE GRID ================= */
var resources = [
  {title:"Does ChatGPT tell the truth?", provider:"OpenAI Help Center", format:"article", level:"Beginner", time:"5 min read", why:"Official explainer of hallucination and how to verify answers.", url:"https://help.openai.com/en/articles/8313428-does-chatgpt-tell-the-truth"},
  {title:"Claude's incorrect or misleading responses", provider:"Claude Help Center (Anthropic)", format:"article", level:"Beginner", time:"4 min read", why:"The same explanation from a second AI maker.", url:"https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on"},
  {title:"AI Overviews in Google Search", provider:"Google Search Help", format:"article", level:"Beginner", time:"5 min read", why:"How AI summaries in search work, and how to open the sources.", url:"https://support.google.com/websearch/answer/14901683?hl=en"},
  {title:"SIFT (The Four Moves)", provider:"Mike Caulfield · Hapgood", format:"article", level:"Intermediate", time:"10 min read", why:"A four-step method for checking any claim or source.", url:"https://hapgood.us/2019/06/19/sift-the-four-moves/"},
  {title:"Reliable sources", provider:"Wikipedia (Simple English)", format:"article", level:"Beginner", time:"6 min read", why:"What makes any source trustworthy.", url:"https://simple.wikipedia.org/wiki/Wikipedia:Reliable_sources"},
  {title:"AI Competency Framework for Students", provider:"UNESCO", format:"article", level:"Intermediate", time:"20+ min", why:"The bigger global picture of responsible AI use.", url:"https://www.unesco.org/en/articles/ai-competency-framework-students"},
  {title:"PIB Fact Check", provider:"Press Information Bureau, Govt. of India", format:"govt", level:"Beginner", time:"2 min per claim", why:"Verify claims about government schemes or policies.", url:"https://factcheck.pib.gov.in/"},
  {title:"Crash Course: Navigating Digital Information", provider:"PBS/Complexly, MediaWise & Stanford", format:"video", level:"Beginner", time:"~13 min/episode", why:"A captioned video series on fact-checking and lateral reading.", url:"https://thecrashcourse.com/topic/navigatingdigitalinfo/"}
];
var activeFormat = 'all';
var activeLevel = 'all';

function badgeFor(format){
  if(format === 'article') return '<span class="badge article">Article</span>';
  if(format === 'video') return '<span class="badge video">Video</span>';
  if(format === 'govt') return '<span class="badge govt">Government tool</span>';
  return '';
}

function renderGrid(){
  var grid = document.getElementById('resourceGrid');
  grid.innerHTML = '';
  var shown = 0;
  resources.forEach(function(r){
    var matchFormat = (activeFormat === 'all' || r.format === activeFormat);
    var matchLevel = (activeLevel === 'all' || r.level === activeLevel);
    if(!matchFormat || !matchLevel) return;
    shown++;
    var a = document.createElement('a');
    a.className = 'rcard' + (r.format === 'govt' ? ' govt' : '');
    a.href = r.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML =
      badgeFor(r.format) +
      '<p class="rcard-title">'+r.title+'</p>' +
      '<p class="rcard-provider">'+r.provider+' · '+r.level+' · '+r.time+'</p>' +
      '<p class="rcard-why">'+r.why+'</p>' +
      '<div class="rcard-footer"><span>Open link</span><span class="go">Visit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg></span></div>';
    grid.appendChild(a);
  });
  document.getElementById('resultCount').textContent = shown + ' of ' + resources.length + ' resources shown';
}

document.querySelectorAll('#formatFilters .filter-chip').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('#formatFilters .filter-chip').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    activeFormat = btn.getAttribute('data-format');
    renderGrid();
  });
});
document.querySelectorAll('#levelFilters .filter-chip').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('#levelFilters .filter-chip').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    activeLevel = btn.getAttribute('data-level');
    renderGrid();
  });
});

document.addEventListener('DOMContentLoaded', function(){
  buildJump();
  render();
});