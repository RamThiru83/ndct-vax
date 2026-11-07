/* ===== registry ===== */
var App = { mods: [], byId: {}, refs: {}, widgets: {}, liveCache: {}, prog: { quiz: {}, done: {} } };
var K = {};
function registerModule(m) { App.mods.push(m); App.byId[m.id] = m; }
function registerRef(r) { App.refs[r.id] = r; }
App.order = ['m00', 'm01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10', 'cap'];

/* ===== small helpers ===== */
K.f = function (x, d) { return (x === null || x === undefined || isNaN(x)) ? 'n/a' : Number(x).toFixed(d === undefined ? 2 : d); };
K.pct = function (x, d) { return (x === null || x === undefined || isNaN(x)) ? 'n/a' : (100 * x).toFixed(d === undefined ? 1 : d) + '%'; };
K.sgn = function (x, d) { return (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(d === undefined ? 2 : d); };
K.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
K.stats = function (items) { return '<div class="stats">' + items.map(function (a) { return '<div class="stat"><small>' + a[0] + '</small><b>' + a[1] + '</b></div>'; }).join('') + '</div>'; };
K.tbl = function (head, rows, cls) {
  return '<div class="tw"><table class="data ' + (cls || '') + '"><thead><tr>' + head.map(function (h, i) { return '<th' + (i ? ' class="r"' : '') + '>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
    rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i ? ' class="r"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
};
K.verdict = function (txt, kind) { return '<div class="verdict ' + (kind || '') + '">' + txt + '</div>'; };
K.mean = PM.mean; K.sd = PM.sd;
K.hist = function (vals, lo, hi, nb) { return Chart.hist(vals, lo, hi, nb); };
K.save = function (filename, text, btn) {
  var done = function (msg) { if (btn) { var o = btn.textContent; btn.textContent = msg; setTimeout(function () { btn.textContent = o; }, 2200); } };
  try {
    if (window.claude && window.claude.use) {
      window.claude.use('downloads').then(function (d) {
        if (!d) { done('Downloads unavailable here'); return; }
        d.save({ filename: filename, data: text }).then(function () { done('Saved'); }, function (e) { done(e && e.code === 'declined' ? 'Cancelled' : 'Could not save'); });
      }, function () { done('Downloads unavailable here'); });
    } else { var bl = new Blob([text], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500); done('Saved'); }
  } catch (e) { done('Downloads unavailable here'); }
};
K.copy = function (text, btn) {
  var ok = function () { var o = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = o; }, 1800); };
  try { navigator.clipboard.writeText(text).then(ok, function () { K.fallbackCopy(text); ok(); }); } catch (e) { K.fallbackCopy(text); ok(); }
};
K.fallbackCopy = function (text) { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { } document.body.removeChild(t); };
/* time-sliced loop so the page stays responsive */
K.run = function (n, step, prog, done, token) {
  var i = 0;
  function tick() {
    var t0 = Date.now();
    while (i < n && Date.now() - t0 < 28) { step(i); i++; }
    if (prog) prog(i, n);
    if (token && token.stop) return;
    if (i < n) setTimeout(tick, 0); else if (done) done();
  }
  setTimeout(tick, 0);
};
/* ===== progress: see sync.js ===== */
App.live = {};
App.computeLive = function () { App.fillLive(); };
App.fillLive = function () { Array.prototype.forEach.call(document.querySelectorAll('[data-live]'), function (s) { var v = App.live[s.getAttribute('data-live')]; s.textContent = v === undefined ? '…' : v; }); };

/* ===== widget panel framework ===== */
K.titles = {};
K.widget = function (name, fn) { App.widgets[name] = fn; };
K.uid = 0;
K.panel = function (root, title) {
  var tryTxt = root.getAttribute('data-try');
  root.classList.add('wg'); root.innerHTML = '<div class="wg-h"><b></b><button class="btn sm" type="button">Reset</button></div>' + (tryTxt ? '<p class="wg-try"><b>Try</b> <span></span></p>' : '') + '<div class="wg-c"></div><div class="wg-b" hidden></div><div class="wg-o"></div><div class="wg-n" aria-live="polite" hidden><b>Notice</b> <span></span></div>';
  if (tryTxt) root.querySelector('.wg-try span').textContent = tryTxt;
  root.querySelector('b').textContent = title;
  var P = { root: root, v: {}, defs: {}, ui: {}, out: root.querySelector('.wg-o'), cbox: root.querySelector('.wg-c'), bbox: root.querySelector('.wg-b'), token: { stop: false } };
  var pend = false;
  P.draw = function () { };
  var nbox = root.querySelector('.wg-n');
  /* P.notice(html): a short live comment on what the learner just did; P.notice('') hides it */
  P.notice = function (html) { nbox.hidden = !html; nbox.querySelector('span').innerHTML = html || ''; return P; };
  P.onchange = function () { P.draw(); };
  P.touch = function () { if (pend) return; pend = true; requestAnimationFrame(function () { pend = false; P.onchange(); }); };
  function ctl(cls, key, label, html) { var d = document.createElement('div'); d.className = 'ctl ' + cls; var id = 'w' + (++K.uid); d.innerHTML = html.replace(/#ID#/g, id).replace('#LABEL#', label); P.cbox.appendChild(d); return d; }
  P.slider = function (key, label, min, max, step, def, fmt) {
    P.v[key] = def; P.defs[key] = def; fmt = fmt || function (x) { return String(x); };
    var d = ctl('', key, label, '<label for="#ID#"><span>#LABEL#</span><output></output></label><input id="#ID#" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + def + '">');
    var inp = d.querySelector('input'), o = d.querySelector('output'); o.textContent = fmt(def);
    inp.addEventListener('input', function () { P.v[key] = parseFloat(inp.value); o.textContent = fmt(P.v[key]); P.touch(); });
    P.ui[key] = function (v) { inp.value = v; o.textContent = fmt(v); }; return P;
  };
  P.select = function (key, label, opts, def) {
    P.v[key] = def; P.defs[key] = def;
    var d = ctl('', key, label, '<label for="#ID#"><span>#LABEL#</span></label><select id="#ID#">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (String(o[0]) === String(def) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>');
    var s = d.querySelector('select'); s.addEventListener('change', function () { var raw = s.value; P.v[key] = (raw !== '' && !isNaN(raw) && String(parseFloat(raw)) === raw) ? parseFloat(raw) : raw; P.touch(); });
    P.ui[key] = function (v) { s.value = v; }; return P;
  };
  P.number = function (key, label, def, min, max, step) {
    P.v[key] = def; P.defs[key] = def;
    var d = ctl('', key, label, '<label for="#ID#"><span>#LABEL#</span></label><input id="#ID#" type="number" min="' + min + '" max="' + max + '" step="' + (step || 1) + '" value="' + def + '">');
    var inp = d.querySelector('input'); inp.addEventListener('input', function () { var x = parseFloat(inp.value); if (!isNaN(x)) { P.v[key] = x; P.touch(); } });
    P.ui[key] = function (v) { inp.value = v; }; return P;
  };
  P.check = function (key, label, def) {
    P.v[key] = !!def; P.defs[key] = !!def;
    var d = ctl('chk', key, label, '<input id="#ID#" type="checkbox"' + (def ? ' checked' : '') + '><label for="#ID#">#LABEL#</label>');
    var inp = d.querySelector('input'); inp.addEventListener('change', function () { P.v[key] = inp.checked; P.touch(); });
    P.ui[key] = function (v) { inp.checked = !!v; }; return P;
  };
  P.btn = function (label, fn, primary) {
    P.bbox.hidden = false; var b = document.createElement('button'); b.type = 'button'; b.className = 'btn' + (primary ? ' pri' : ''); b.textContent = label;
    b.addEventListener('click', function () { fn(b); }); P.bbox.appendChild(b); return b;
  };
  P.progress = function () { P.bbox.hidden = false; var w = document.createElement('div'); w.className = 'prog'; w.style.flex = '1 1 120px'; w.style.maxWidth = '260px'; w.innerHTML = '<i></i>'; P.bbox.appendChild(w); var i = w.firstChild; return function (a, b) { i.style.width = (100 * a / b).toFixed(0) + '%'; }; };
  P.reset = function () { P.token.stop = true; P.token = { stop: false }; Object.keys(P.defs).forEach(function (k) { P.v[k] = P.defs[k]; if (P.ui[k]) P.ui[k](P.defs[k]); }); if (P.onreset) P.onreset(); P.draw(); };
  root.querySelector('.wg-h .btn').addEventListener('click', P.reset);
  if (!P.cbox.children.length) { } return P;
};
K.mount = function (root) {
  var name = root.getAttribute('data-widget'), fn = App.widgets[name];
  if (!fn) { root.textContent = 'This interactive element is not available: ' + name; return; }
  var P = K.panel(root, K.titles[name] || name);
  try { fn(P, root.getAttribute('data-set')); P.draw(); if (!P.cbox.children.length) P.cbox.style.display = 'none'; } catch (e) { P.out.innerHTML = '<p class="note">This interactive element hit an error: ' + K.esc(e.message) + '</p>'; if (window.console) console.error(name, e); }
};

/* ===== quiz ===== */
App.quizHtml = function (mod) {
  var saved = App.prog.quiz[mod.id] || [];
  return mod.quiz.map(function (q, i) {
    var a = saved[i];
    return '<div class="q" data-m="' + mod.id + '" data-i="' + i + '"><div class="qt">' + (i + 1) + '. ' + q.q + '</div>' + q.options.map(function (o, j) {
      var cls = (a === undefined || a === null) ? '' : (j === q.answer ? ' right' : (j === a ? ' wrong' : ''));
      return '<button type="button" class="opt' + cls + '" data-j="' + j + '"><span class="k">' + 'ABCD'[j] + '</span><span>' + o + '</span></button>';
    }).join('') + '<div class="whysrc" hidden>' + q.why + '</div>' + ((a !== undefined && a !== null) ? '<div class="why"><b>' + (a === q.answer ? 'Correct. ' : 'Not quite. ') + '</b><span class="whyt">' + q.why + '</span></div>' : '') + '</div>';
  }).join('') + '<p class="num" id="qscore"></p>';
};
/* a module's quiz with any published instructor edits applied (used by the mastery check) */
App.quizLive = function (m) {
  if (!App.over || !Object.keys(App.over).some(function (k) { return k.indexOf(m.id + ':') === 0; }) || !App.blocksOf) return m.quiz;
  try {
    var blocks = App.blocksOf(m.id), om = App.resolveOver(m.id, blocks);
    Object.keys(om).forEach(function (k) { om[k].innerHTML = K.clean(App.over[k].html); });
    var root = blocks.length ? blocks[0].closest('.col') : null;
    return m.quiz.map(function (q, i) {
      var qd = root && root.querySelector('.q[data-i="' + i + '"]'); if (!qd) return q;
      var o = {}; for (var k in q) o[k] = q[k];
      o.q = qd.querySelector('.qt').innerHTML.replace(/^\s*\d+\.\s*/, '');
      o.options = Array.prototype.map.call(qd.querySelectorAll('.opt > span:last-child'), function (x) { return x.innerHTML; });
      var w = qd.querySelector('.whysrc'); if (w) o.why = w.innerHTML;
      return o;
    });
  } catch (e) { return m.quiz; }
};
App.quizScore = function (mod) { var s = App.prog.quiz[mod.id] || [], c = 0, d = 0; mod.quiz.forEach(function (q, i) { if (s[i] !== undefined && s[i] !== null) { d++; if (s[i] === q.answer) c++; } }); return { c: c, d: d, n: mod.quiz.length }; };
App.wireQuiz = function (root, mod) {
  var sc = root.querySelector('#qscore');
  function upd() { var s = App.quizScore(mod); sc.innerHTML = 'Answered ' + s.d + ' of ' + s.n + ', correct ' + s.c + '. ' + (s.d ? '<button type="button" class="btn sm" id="qreset">Reset quiz</button>' : ''); var r = sc.querySelector('#qreset'); if (r) r.onclick = function () { App.prog.quiz[mod.id] = []; App.prog.qt[mod.id] = Date.now(); App.save(); App.route(true); }; }
  upd();
  Array.prototype.forEach.call(root.querySelectorAll('.q'), function (qd) {
    qd.addEventListener('click', function (ev) {
      var b = ev.target.closest('.opt'); if (!b) return;
      var i = +qd.getAttribute('data-i'), q = mod.quiz[i], arr = App.prog.quiz[mod.id] = App.prog.quiz[mod.id] || [];
      if (arr[i] !== undefined && arr[i] !== null) return;
      var j = +b.getAttribute('data-j'); arr[i] = j; var P = App.prog; P.first[mod.id] = P.first[mod.id] || {}; if (P.first[mod.id][i] === undefined) P.first[mod.id][i] = (j === q.answer) ? 1 : 0; P.qt[mod.id] = Date.now(); App.save();
      Array.prototype.forEach.call(qd.querySelectorAll('.opt'), function (o, k) { if (k === q.answer) o.classList.add('right'); else if (k === j) o.classList.add('wrong'); });
      var src = qd.querySelector('.whysrc'), w = document.createElement('div'); w.className = 'why'; w.innerHTML = '<b>' + (j === q.answer ? 'Correct. ' : 'Not quite. ') + '</b><span class="whyt">' + (src ? src.innerHTML : q.why) + '</span>'; qd.appendChild(w); upd(); App.markNav();
    });
  });
};

/* ===== pages ===== */
App.mods_sorted = function () { return App.order.map(function (id) { return App.byId[id]; }).filter(Boolean); };
App.MARK = '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#0B5D63"/><rect x="24" y="9" width="16" height="7" rx="2" fill="#E0A93B"/><path d="M22 20 H42 V47 a6 6 0 0 1 -6 6 H28 a6 6 0 0 1 -6 -6 Z" fill="none" stroke="#fff" stroke-width="4.5" stroke-linejoin="round"/><path d="M26.5 35 H37.5 V46.5 a2.5 2.5 0 0 1 -2.5 2.5 H29 a2.5 2.5 0 0 1 -2.5 -2.5 Z" fill="#E0A93B"/></svg>';
App.INSTRUCTOR = '<p class="instr"><span>Course instructor</span><b>Dr Ramachandran Thiruvengadam</b><span>Associate Professor, Maternal and Child Health, <span class="nw">BRIC-THSTI</span></span></p>';
App.LOGO = '<a class="inst-logo" href="https://thsti.res.in" target="_blank" rel="noopener"><img alt="BRIC-THSTI" src="data:image/png;base64,__LOGO__"></a>';
App.modLabel = function (m) { return typeof m.num === 'number' ? String(m.num) : 'C'; };
App.buildNav = function () {
  var h = '<a class="brand" href="#home">' + App.MARK + '<span class="tx"><b>NDCT-Vax</b><span>Vaccine trials under the NDCT Rules</span></span></a>' + App.LOGO + App.INSTRUCTOR + '<p class="themerow"><button type="button" class="btn sm themebtn"></button></p>' + App.chipHtml() + '<nav class="nav">';
  h += '<a href="#home" data-p="home"><span class="n"></span><span>Start here</span><span></span></a>';
  h += '<a href="#howto" data-p="howto"><span class="n"></span><span>How to use this course</span><span></span></a>';
  var parts = {}, order = [];
  App.mods_sorted().forEach(function (m) { if (!parts[m.part]) { parts[m.part] = []; order.push(m.part); } parts[m.part].push(m); });
  order.forEach(function (p) {
    h += '<div class="navgrp">' + p + '</div>';
    parts[p].forEach(function (m) { var lk = App.lockInfo(m); h += '<a href="#' + m.id + '" data-p="' + m.id + '"' + (lk ? ' class="lk" title="' + lk + '"' : '') + '><span class="n">' + App.modLabel(m) + '</span><span>' + m.title + '</span><span class="dn" data-d="' + m.id + '">' + (lk ? '' : '') + '</span></a>'; });
  });
  h += '<div class="navgrp">Tools and reference</div>';
  h += '<a href="#rules" data-p="rules"><span class="n"></span><span>Rule reader</span><span></span></a>';
  h += '<a href="#forms" data-p="forms"><span class="n"></span><span>Form navigator</span><span></span></a>';
  h += '<a href="#mastery" data-p="mastery"><span class="n"></span><span>Mastery check</span><span></span></a>';
  h += '<a href="#notes" data-p="notes"><span class="n"></span><span>My notes and answers</span><span></span></a>';
  if (App.acct.isInstructor()) h += '<a href="#dashboard" data-p="dashboard"><span class="n"></span><span>Class dashboard</span><span></span></a>';
  [['clock', 'Timelines sheet'], ['glossary', 'Glossary'], ['sources', 'Sources and currency']].forEach(function (r) { if (App.refs[r[0]]) h += '<a href="#' + r[0] + '" data-p="' + r[0] + '"><span class="n"></span><span>' + r[1] + '</span><span></span></a>'; });
  h += '<a href="#about" data-p="about"><span class="n"></span><span>About this course</span><span></span></a></nav>';
  document.getElementById('rail').innerHTML = h;
  App.theme.label();
};
App.markNav = function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-d]'), function (s) { var id = s.getAttribute('data-d'); s.textContent = App.lockInfo(App.byId[id]) ? 'locked' : (App.prog.done[id] ? '✓' : ''); });
  Array.prototype.forEach.call(document.querySelectorAll('#rail a[data-p]'), function (a) { if (a.getAttribute('data-p') === App.cur) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
};
App.pageHome = function () {
  var mods = App.mods_sorted(), done = mods.filter(function (m) { return App.prog.done[m.id]; }).length;
  var h = '<p class="eyebrow">Self-study course for clinical researchers</p><h1>Regulating vaccine clinical development in India</h1>' +
    '<p class="lede">How a vaccine moves from the laboratory to licensure under the New Drugs and Clinical Trials Rules, 2019: who decides, which form goes where, how the clock runs, and what you owe trial participants. Read from the Rules themselves.</p>' +
    '<div class="callout key"><b>How the course works</b><p>Each module follows one fictional vaccine, VX-01, through one stage of its regulatory life. You read the rule that decides the question, use a tool (a timeline calculator, a form finder, a decision tree) to apply it, and then make the call yourself in short case tasks. Each module ends with a quiz, and worked answers are kept in a separate step so that you attempt the tasks first.</p></div>' +
    '<p>The primary source is the CDSCO consolidated text of the <b>New Drugs and Clinical Trials Rules, 2019</b> [G.S.R. 227(E), 19 March 2019], as amended up to G.S.R. 778(E), 14 October 2022. Every rule the course cites can be read verbatim in the <a href="#rules">Rule reader</a>. Where the Rules hand over to other instruments (manufacturing licences, GMP, lot release), the course says so and names the instrument.</p>' +
    '<div class="callout warn"><b>Currency</b><p>Instruments issued after October 2022 are not in the consolidated text. Modules that may be affected carry a <b>Pending update</b> notice. See <a href="#sources">Sources and currency</a>. This course is for teaching; it is not legal or regulatory advice on a specific product.</p></div>' +
    App.CODE_HTML +
    '<p><b>Niyam</b>, the study assistant, explains a passage, gives an example or quizzes you on it: select text in a module, or press <b>Ask Niyam</b>. Niyam is an AI and can make mistakes; the text of the Rules is the authority. It is switched off during the quiz.</p>';
  h += '<div class="prog" aria-hidden="true"><i style="width:' + (100 * done / mods.length).toFixed(0) + '%"></i></div><p class="num" style="color:var(--muted);font-size:14px">' + done + ' of ' + mods.length + ' modules marked complete.</p>';
  h += '<h3>Start where you are</h3><div class="home-grid">';
  h += App.homeBanner();
  var m0 = App.byId.m00;
  if (m0) h += '<a class="card" href="#m00"><small>Start here</small><b>Module 0: ' + m0.title + '</b><span>' + m0.summary + '</span></a>';
  h += '<a class="card" href="#rules"><small>Primary source</small><b>Rule reader</b><span>All 107 rules and the First to Seventh Schedules, verbatim and searchable, with amendment notes.</span></a>';
  h += '<a class="card" href="#forms"><small>Tool</small><b>Form navigator</b><span>Every CT form: what it is for, which rule governs it, and what comes next.</span></a>';
  h += '<a class="card" href="#mastery"><small>Self-test</small><b>Mastery check</b><span>A mixed quiz drawn from every module, with a list of modules to revisit.</span></a></div>';
  [['Foundations', 'Foundations'], ['Clinical development', 'Clinical development: permission, supply, conduct and safety'], ['Licensure and beyond', 'Licensure and beyond']].forEach(function (g) {
    var list = mods.filter(function (m) { return m.part === g[0] && m.id !== 'm00'; }); if (!list.length) return;
    h += '<h3>' + g[1] + '</h3><div class="home-grid">';
    list.forEach(function (m) { h += '<a class="card" href="#' + m.id + '"><small>Module ' + App.modLabel(m) + ' · ~' + m.minutes + ' min' + (m.pending ? ' · pending update' : '') + (App.lockInfo(m) ? ' · locked' : (App.prog.done[m.id] ? ' · done' : '')) + '</small><b>' + m.title + '</b><span>' + m.summary + '</span></a>'; });
    h += '</div>';
  });
  var cap = App.byId.cap; if (cap) h += '<h3>Capstone</h3><div class="home-grid"><a class="card" href="#cap"><small>Guided project</small><b>' + cap.title + '</b><span>' + cap.summary + '</span></a></div>';
  return { html: h };
};
App.pageAbout = function () {
  return { html: '<p class="eyebrow">About</p><h1>About this course</h1>' +
    '<h3>Purpose and audience</h3><p>The course is for PhD scholars and early-career investigators who will design, run or support vaccine trials in India. It assumes basic clinical research methods and awareness of Good Clinical Practice. No prior regulatory knowledge is needed.</p>' +
    '<h3>Course instructor</h3><p>Dr Ramachandran Thiruvengadam, MD, DCH, PhD, Associate Professor, Maternal and Child Health Programme, BRIC-Translational Health Science and Technology Institute (BRIC-THSTI), Faridabad.</p>' +
    '<h3>Source and scope</h3><p>The course is built on one primary instrument: the New Drugs and Clinical Trials Rules, 2019, made by the Central Government under sections 12 and 33 of the Drugs and Cosmetics Act, 1940 [G.S.R. 227(E), 19 March 2019]. The text used is the CDSCO consolidated copy, as amended vide G.S.R. 778(E), 14 October 2022. Rule numbers, timelines and forms are taken from that text and can be read verbatim in the Rule reader. No secondary commentary is used.</p>' +
    '<p>The Rules contain no chapter on vaccines. A vaccine is a new drug under rule 2(1)(w)(v) and is always deemed to be one, so it follows the full pathway. Topics that the Rules hand to other instruments, such as the manufacturing licence, Good Manufacturing Practice and lot release under the Drugs and Cosmetics Rules, 1945, the Good Clinical Practices Guidelines and the ICMR National Ethical Guidelines, are marked <b>Interface</b> and are not taught from the NDCT text.</p>' +
    '<h3>Currency</h3><p>Instruments issued after October 2022 are listed on the <a href="#sources">Sources and currency</a> page with their status. Modules that may be affected carry a Pending update notice until the instrument has been reviewed.</p>' +
    '<h3>The case</h3><p>VX-01, the institute that develops it, its trial sites and its participants are fictional. Any resemblance to a real product or study is coincidental. No participant data are used anywhere.</p>' +
    '<h3>Limits</h3><p>This course teaches how the Rules work. It is not legal advice, and it does not replace reading the current instrument, consulting the regulator (for example through a pre-submission meeting under rule 98), or institutional regulatory support.</p>' };
};
App.pageRef = function (id) { var r = App.refs[id]; return { html: '<p class="eyebrow">Reference</p><h1>' + r.title + '</h1>' + (id === 'glossary' ? '<input class="search" id="gsearch" type="search" placeholder="Search terms" aria-label="Search glossary">' : '') + '<div class="' + (id === 'glossary' ? 'gl' : '') + '" id="refbody">' + r.html + '</div>', after: function (root) {
  var s = root.querySelector('#gsearch'); if (!s) return;
  s.addEventListener('input', function () { var q = s.value.toLowerCase(); Array.prototype.forEach.call(root.querySelectorAll('#refbody > p'), function (p) { p.hidden = q && p.textContent.toLowerCase().indexOf(q) < 0; }); });
} }; };
/* ===== case-led module shown as steps: Essentials, Case 1..n, Check yourself, Worked answers, Full notes ===== */
App.pageCaseModule = function (m, prev, next) {
  var ncase = m.cases.length, P = App.prog;
  var taskHtml = function (t, i) { return '<div class="task" data-ti="' + i + '" id="' + m.id + '-task-' + i + '"><h3>Task ' + (i + 1) + '. ' + t.title + ' <span class="lvl">' + t.level + '</span></h3>' + t.scenario + t.questions.map(function (q) { return '<p>' + q + '</p>'; }).join('') +
    '<p class="tolink"><a href="#" data-goto="' + m.id + '-ans-' + i + '">Check your answer</a> (opens the worked answer)</p></div>'; };
  var steps = [{ key: 'ess', label: 'Essentials', sub: '5 min', cls: 'learn' }];
  m.cases.forEach(function (c, k) { steps.push({ key: c.id, label: 'Case ' + (k + 1), sub: c.tasks.length + ' tasks', cls: 'practise', title: c.title, tasks: c.tasks }); });
  steps.push({ key: 'quiz', label: 'Quiz', sub: m.quiz.length + ' questions', cls: 'check' });
  steps.push({ key: 'answers', label: 'Answers', sub: 'worked', cls: 'answers' });
  var hasNotes = m.sections && m.sections.length;
  if (hasNotes) steps.push({ key: 'notes', label: 'Notes', sub: 'reference', cls: 'notes' });
  var stepTitle = function (s) { return s.title ? s.label + '. ' + s.title : ({ Quiz: 'Check yourself', Answers: 'Worked answers', Notes: 'Reference notes' }[s.label] || s.label); };
  var h = '<p class="eyebrow">' + m.part + ' · ' + (typeof m.num === 'number' ? 'Module ' + m.num : m.num) + '</p><h1>' + m.title + '</h1>';
  h += '<nav class="stepbar" aria-label="Steps in this module">' + steps.map(function (s, i) {
    return '<button type="button" class="stp ' + s.cls + '" data-step="' + i + '" aria-controls="' + m.id + '-st-' + s.key + '"><span class="stl">' + s.label + '</span><span class="sts">' + s.sub + '</span><span class="tick" aria-hidden="true"></span></button>'; }).join('') + '</nav>';
  var nav = function (i) {
    var a = steps[i - 1], b = steps[i + 1];
    return '<div class="stepnav">' + (a ? '<button type="button" class="btn" data-step="' + (i - 1) + '">← ' + stepTitle(a) + '</button>' : '<span></span>') +
      (b ? '<button type="button" class="btn pri" data-step="' + (i + 1) + '">Next: ' + stepTitle(b) + ' →</button>' : '<span></span>') + '</div>';
  };
  var storyBox = function (open) { return m.story ? '<details class="story"' + (open ? ' open' : '') + '><summary>The story in this module</summary><p>' + m.story + '</p></details>' : ''; };
  steps.forEach(function (s, i) {
    var body = '';
    if (s.key === 'ess') {
      body = (m.pending ? '<div class="callout warn pending"><b>Pending update</b><p>' + m.pending + '</p></div>' : '') + '<p class="lede">' + m.summary + '</p><div class="meta"><span><b>Rules</b> ' + m.book + '</span><span><b>Study time</b> about ' + m.minutes + ' minutes</span></div>' +
        '<div class="goals"><b>After this module you can</b><ul>' + m.objectives.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul></div>' +
        '<p class="flowhint">Work through the steps in the bar above, one at a time. Start with the essentials, then do each case: read what you need and the situation, try the simulator, and write your answer to each task before checking the worked answer. Finish with the quiz.</p>' +
        '<section class="sec essentials" id="' + m.id + '-ess"><h2>The essentials</h2>' + App.fillExplainers(m.essentials, m) + '</section>' + storyBox(true);
    } else if (s.tasks) {
      var c = m.cases[i - 1];
      body = storyBox(i === 1) + '<section class="sec case" id="' + m.id + '-' + c.id + '"><div class="ccard"><div class="chead">' +
        '<span class="cnum">Case ' + i + ' of ' + ncase + '</span><h2 class="ctitle">' + c.title + '</h2>' +
        '<span class="caim">In this case you will ' + c.aim + '</span><span class="cfoot">' + c.tasks.length + ' tasks · about ' + (c.minutes || 10) + ' min</span></div><div class="cbody">' +
        '<div class="need"><b>What you need</b>' + App.fillExplainers(c.need, m) + '</div>' +
        '<div class="situation"><b>The situation</b>' + App.fillExplainers(c.scenario, m) + '</div>' + (c.widgets || '') +
        '<div class="turn"><b class="turnh">Your turn</b>' + c.tasks.map(function (n) { return taskHtml(m.tasks[n], n); }).join('') + '</div>' +
        '<div class="takeaway"><b>Take-away</b><p>' + c.takeaway + '</p></div></div></div></section>';
    } else if (s.key === 'quiz') {
      body = '<section class="sec quizsec" id="' + m.id + '-quiz"><h2>Check yourself</h2><p>Answer each question to see the explanation. Wrong answers are explained too.</p><div id="quizbox">' + App.quizHtml(m) + '</div></section>';
    } else if (s.key === 'answers') {
      body = '<section class="sec anssec" id="' + m.id + '-answers"><h2>Worked answers</h2><p>Open an answer only after you have written your own.</p>' +
        m.tasks.map(function (t, k) { return '<details class="ans" id="' + m.id + '-ans-' + k + '"><summary>Task ' + (k + 1) + '. ' + t.title + '</summary><div>' + t.answer + '<p class="tolink"><a href="#" data-goto="' + m.id + '-task-' + k + '">Back to Task ' + (k + 1) + '</a></p></div></details>'; }).join('') + '</section>' +
        '<div class="callout key"><b>Finished?</b><p><button type="button" class="btn pri" id="markdone">' + (P.done[m.id] ? 'Marked complete (click to undo)' : 'Mark this module complete') + '</button></p></div>';
    } else if (s.key === 'notes') {
      var strip = function (x) { return x.replace(/<div data-widget="[^"]*"[^>]*><\/div>/g, '<p class="muted">The simulator for this part is in the cases.</p>').replace(/<ul class="try">[\s\S]*?<\/ul>/g, ''); };
      body = '<p class="flowhint">Short reference notes for this module, to revise from or look things up. You do not need them to complete the cases.</p>' + m.sections.map(function (x) { return '<section class="sec" id="' + m.id + '-' + x.id + '"><h2>' + x.title + '</h2>' + strip(x.html) + '</section>'; }).join('') + App.readingHtml(m);
    }
    h += '<div class="step" id="' + m.id + '-st-' + s.key + '" data-si="' + i + '"' + (i ? ' hidden' : '') + '>' + body + nav(i) + '</div>';
  });
  h += '<div class="pager"><span>' + (prev ? '<a class="btn" href="#' + prev.id + '">← ' + prev.title + '</a>' : '') + '</span><span>' + (next ? '<a class="btn" href="#' + next.id + '">' + next.title + ' →</a>' : '') + '</span></div>';
  return { html: h, after: function (root) {
    App.wireQuiz(root.querySelector('#quizbox'), m);
    var key = 'ndv.step.' + m.id, cur = 0;
    var bar = root.querySelectorAll('.stp'), panes = root.querySelectorAll('.step');
    function show(i, scroll) {
      i = Math.max(0, Math.min(steps.length - 1, i)); cur = i; App.stopExplainers();
      Array.prototype.forEach.call(panes, function (p, k) { p.hidden = k !== i; });
      Array.prototype.forEach.call(bar, function (b, k) { b.classList.toggle('on', k === i); if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      try { localStorage.setItem(key, String(i)); if (i > 0) localStorage.setItem('ndv.ess.' + m.id, '1'); } catch (e) {}
      marks && marks();
      if (App.onStep) App.onStep(m, steps[i]);
      if (scroll !== false) root.querySelector('.stepbar').scrollIntoView({ block: 'start' });
    }
    function marks() {
      steps.forEach(function (s, i) {
        var done = false;
        if (s.tasks) done = s.tasks.every(function (n) { var ta = root.querySelector('#' + m.id + '-task-' + n + ' textarea'), a = P.ans[m.id + '|t' + n]; return ta ? !!ta.value.trim() : !!(a && a.t && a.t.trim()); });
        else if (s.key === 'quiz') { var q = P.quiz[m.id] || []; done = m.quiz.every(function (_, k) { return q[k] !== undefined && q[k] !== null; }); }
        else if (s.key === 'ess') { try { done = localStorage.getItem('ndv.ess.' + m.id) === '1'; } catch (e) { done = cur > 0; } }
        bar[i].classList.toggle('done', done); bar[i].setAttribute('aria-label', s.label + (done ? ', done' : ''));
      });
    }
    root.addEventListener('click', function (e) {
      var st = e.target.closest('[data-step]');
      if (st) { e.preventDefault(); show(+st.getAttribute('data-step')); return; }
      var g = e.target.closest('[data-goto]'); if (!g) return;
      e.preventDefault();
      var el = document.getElementById(g.getAttribute('data-goto')); if (!el) return;
      var pane = el.closest('.step'); if (pane) show(+pane.getAttribute('data-si'), false);
      if (el.tagName === 'DETAILS') el.open = true;
      el.scrollIntoView({ block: 'start' });
    });
    root.addEventListener('input', function () { setTimeout(marks, 50); });
    root.addEventListener('click', function () { setTimeout(marks, 50); });
    var saved = 0; try { saved = +localStorage.getItem(key) || 0; } catch (e) {}
    show(saved, false); marks();
    var b = root.querySelector('#markdone'); b.onclick = function () { if (P.done[m.id]) delete P.done[m.id]; else P.done[m.id] = true; P.dt[m.id] = Date.now(); App.save(); App.markNav(); b.textContent = P.done[m.id] ? 'Marked complete (click to undo)' : 'Mark this module complete'; };
  } };
};

App.pageModule = function (m) {
  var all = App.mods_sorted(), idx = all.indexOf(m), prev = all[idx - 1], next = all[idx + 1];
  var lk = App.lockInfo(m); if (lk && !App.blocking) return { html: '<p class="eyebrow">' + m.part + '</p><h1>' + m.title + '</h1><div class="callout warn"><b>Not available yet</b><p>' + lk + ' Your instructor releases modules in sequence.</p></div><div class="pager"><span><a class="btn" href="#home">← Course home</a></span><span></span></div>' };
  if (m.format === 'cases') return App.pageCaseModule(m, prev, next);
  var h = '<p class="eyebrow">' + m.part + ' · ' + (typeof m.num === 'number' ? 'Module ' + m.num : m.num) + '</p><h1>' + m.title + '</h1><p class="lede">' + m.summary + '</p>' +
    '<div class="meta"><span><b>Source</b> ' + m.book + '</span><span><b>Study time</b> about ' + m.minutes + ' minutes</span></div>' +
    (m.format === 'cases' ? '<div class="goals"><b>After this module you can</b><ul>' + m.objectives.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul></div>'
      : '<div class="callout key"><b>After this module you can</b><ul>' + m.objectives.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul></div>');
  var taskHtml = function (t, i) { return '<div class="task" data-ti="' + i + '" id="' + m.id + '-task-' + i + '"><h3>Task ' + (i + 1) + '. ' + t.title + ' <span class="lvl">' + t.level + '</span></h3>' + t.scenario + t.questions.map(function (q) { return '<p>' + q + '</p>'; }).join('') +
    (m.format === 'cases' ? '<p class="tolink"><a href="#" data-goto="' + m.id + '-ans-' + i + '">Check your answer</a> (worked answers are at the end of the page)</p>' : '') + '</div>'; };
  if (m.format === 'cases') {
    /* case-led layout. Colour code: learn (essentials, what you need), practise (tasks), check (quiz), answers. */
    var ncase = m.cases.length, ntask = m.tasks.length, cmin = m.cases.reduce(function (a, c) { return a + (c.minutes || 10); }, 0);
    h += '<div class="flow" role="navigation" aria-label="How to work through this module">' +
      '<button type="button" class="fl learn" data-goto="' + m.id + '-ess"><b>The essentials</b><span>5 min</span></button>' +
      '<button type="button" class="fl practise" data-goto="' + m.id + '-cases"><b>' + ncase + ' cases, ' + ntask + ' tasks</b><span>about ' + cmin + ' min</span></button>' +
      '<button type="button" class="fl check" data-goto="' + m.id + '-quiz"><b>Check yourself</b><span>' + m.quiz.length + ' questions</span></button>' +
      '<button type="button" class="fl answers" data-goto="' + m.id + '-answers"><b>Worked answers</b><span>compare yours</span></button></div>' +
      '<p class="flowhint">Read the essentials, then work through the cases in order. In each case, read what you need, then the situation, try the simulator, and write your answer to each task in its box before checking the worked answer.</p>';
    h += '<section class="sec essentials" id="' + m.id + '-ess"><h2>The essentials</h2>' + App.fillExplainers(m.essentials, m) + '</section>';
    if (m.story) h += '<div class="story" id="' + m.id + '-cases"><b>The story in this module</b><p>' + m.story + '</p></div>';
    m.cases.forEach(function (c, k) {
      h += '<section class="sec case" id="' + m.id + '-' + c.id + '"><details class="ccard"' + (k === 0 ? ' open' : '') + '><summary>' +
        '<span class="cnum">Case ' + (k + 1) + ' of ' + ncase + '</span><span class="ctitle">' + c.title + '</span>' +
        '<span class="caim">In this case you will ' + c.aim + '</span><span class="cfoot">' + c.tasks.length + ' tasks · about ' + (c.minutes || 10) + ' min</span></summary><div class="cbody">' +
        '<div class="need"><b>What you need</b>' + App.fillExplainers(c.need, m) + '</div>' +
        '<div class="situation"><b>The situation</b>' + App.fillExplainers(c.scenario, m) + '</div>' + (c.widgets || '') +
        '<div class="turn"><b class="turnh">Your turn</b>' + c.tasks.map(function (n) { return taskHtml(m.tasks[n], n); }).join('') + '</div>' +
        '<div class="takeaway"><b>Take-away</b><p>' + c.takeaway + '</p></div>' +
        (k < ncase - 1 ? '<p class="nextc"><button type="button" class="btn" data-next="' + m.id + '-' + m.cases[k + 1].id + '">Next: Case ' + (k + 2) + '. ' + m.cases[k + 1].title + '</button></p>' : '') +
        '</div></details></section>';
    });
    h += '<section class="sec quizsec" id="' + m.id + '-quiz"><h2>Check yourself</h2><p>Answer each question to see the explanation. Wrong answers are explained too.</p><div id="quizbox">' + App.quizHtml(m) + '</div></section>';
  } else {
  m.sections.forEach(function (s) { h += '<section class="sec" id="' + m.id + '-' + s.id + '"><h2>' + s.title + '</h2>' + s.html + '</section>'; });
  h += '<section class="sec"><h2>Key points</h2><ul class="kp">' + m.keyPoints.map(function (k) { return '<li>' + k + '</li>'; }).join('') + '</ul></section>';
  h += '<section class="sec"><h2>Check your understanding</h2><p>Answer each question to see the explanation. Wrong answers are explained too.</p><div id="quizbox">' + App.quizHtml(m) + '</div></section>';
  h += '<section class="sec"><h2>Case tasks</h2><p>Attempt each task before opening the worked answers at the end of this page.</p>';
  m.tasks.forEach(function (t, i) { h += taskHtml(t, i); });
  h += '</section>';
  }
  h += '<section class="sec' + (m.format === 'cases' ? ' anssec" id="' + m.id + '-answers' : '') + '"><h2>Worked answers</h2>' + (m.format === 'cases' ? '<p>Open an answer only after you have written your own.</p>' : '');
  m.tasks.forEach(function (t, i) { h += '<details class="ans" id="' + m.id + '-ans-' + i + '"><summary>Task ' + (i + 1) + '. ' + t.title + '</summary><div>' + t.answer + (m.format === 'cases' ? '<p class="tolink"><a href="#" data-goto="' + m.id + '-task-' + i + '">Back to Task ' + (i + 1) + '</a></p>' : '') + '</div></details>'; });
  h += '</section>';
  if (m.format === 'cases' && m.sections && m.sections.length) {
    var strip = function (x) { return x.replace(/<div data-widget="[^"]*"[^>]*><\/div>/g, '<p class="muted">The simulator for this part is in the cases above.</p>').replace(/<ul class="try">[\s\S]*?<\/ul>/g, ''); };
    h += '<details class="fullnotes"><summary>Full notes for this module (optional reading)</summary>';
    m.sections.forEach(function (s) { h += '<section class="sec" id="' + m.id + '-' + s.id + '"><h2>' + s.title + '</h2>' + strip(s.html) + '</section>'; });
    h += '</details>';
  }
  h += '<div class="callout key"><b>Finished?</b><p><button type="button" class="btn pri" id="markdone">' + (App.prog.done[m.id] ? 'Marked complete (click to undo)' : 'Mark this module complete') + '</button></p></div>';
  h += '<div class="pager"><span>' + (prev ? '<a class="btn" href="#' + prev.id + '">← ' + prev.title + '</a>' : '') + '</span><span>' + (next ? '<a class="btn" href="#' + next.id + '">' + next.title + ' →</a>' : '') + '</span></div>';
  return { html: h, after: function (root) {
    App.wireQuiz(root.querySelector('#quizbox'), m);
    root.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto],[data-next]'); if (!g) return;
      e.preventDefault();
      var el = document.getElementById(g.getAttribute('data-goto') || g.getAttribute('data-next')); if (!el) return;
      var d = el.tagName === 'DETAILS' ? el : el.querySelector('details.ccard') || el.closest('details');
      if (d) d.open = true; var host = el.closest('details.ccard'); if (host) host.open = true;
      if (g.hasAttribute('data-next')) { var cur = g.closest('details.ccard'); if (cur) cur.open = false; }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    var b = root.querySelector('#markdone'); b.onclick = function () { if (App.prog.done[m.id]) delete App.prog.done[m.id]; else App.prog.done[m.id] = true; App.prog.dt[m.id] = Date.now(); App.save(); App.markNav(); b.textContent = App.prog.done[m.id] ? 'Marked complete (click to undo)' : 'Mark this module complete'; };
  } };
};

/* ===== mastery check ===== */
App.mastery = null;
App.pageMastery = function () {
  var total = 0; App.mods_sorted().forEach(function (m) { if (!App.lockInfo(m)) total += m.quiz.length; });
  var h = '<p class="eyebrow">Self-test</p><h1>Mastery check</h1><p class="lede">A mixed set of questions drawn at random from every module, with explanations after each answer. The summary at the end lists the modules to revisit.</p>';
  h += '<div class="callout key"><b>Choose a length</b><p>' + [10, 20, 40].map(function (n) { return '<button type="button" class="btn" data-n="' + n + '">' + n + ' questions</button> '; }).join('') + '</p><p>' + total + ' questions are in the pool.</p></div><div id="mbody"></div>';
  return { html: h, after: function (root) {
    var body = root.querySelector('#mbody');
    function start(n) {
      var pool = []; App.mods_sorted().forEach(function (m) { if (App.lockInfo(m)) return; App.quizLive(m).forEach(function (q, i) { pool.push({ m: m, q: q }); }); });
      for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
      App.mastery = { items: pool.slice(0, n), i: 0, ans: [] }; show();
    }
    function show() {
      var S = App.mastery; if (!S) return;
      if (S.i >= S.items.length) {
        var c = 0, byMod = {}; S.items.forEach(function (it, k) { var ok = S.ans[k] === it.q.answer; if (ok) c++; byMod[it.m.id] = byMod[it.m.id] || { t: 0, ok: 0, m: it.m }; byMod[it.m.id].t++; if (ok) byMod[it.m.id].ok++; });
        var rows = Object.keys(byMod).map(function (k) { var o = byMod[k]; return [o.m.title, o.ok + ' of ' + o.t, o.ok === o.t ? 'Secure' : '<a href="#' + o.m.id + '">Revisit</a>']; });
        App.prog.mc.push({ at: Date.now(), n: S.items.length, c: c }); App.prog.mc = App.prog.mc.slice(-50); App.save();
        body.innerHTML = '<h3>Result: ' + c + ' of ' + S.items.length + ' (' + Math.round(100 * c / S.items.length) + '%)</h3>' + K.tbl(['Module', 'Correct', 'Next step'], rows) + '<p><button type="button" class="btn pri" id="again">Start again</button></p>';
        body.querySelector('#again').onclick = function () { App.mastery = null; body.innerHTML = ''; };
        return;
      }
      var it = S.items[S.i], q = it.q;
      body.innerHTML = '<p class="num" style="color:var(--muted)">Question ' + (S.i + 1) + ' of ' + S.items.length + ' · ' + it.m.title + '</p><div class="q"><div class="qt">' + q.q + '</div>' + q.options.map(function (o, j) { return '<button type="button" class="opt" data-j="' + j + '"><span class="k">' + 'ABCD'[j] + '</span><span>' + o + '</span></button>'; }).join('') + '<div id="mfb"></div></div>';
      var qd = body.querySelector('.q'), answered = false;
      qd.addEventListener('click', function (ev) {
        var b = ev.target.closest('.opt'); if (!b || answered) return; answered = true; var j = +b.getAttribute('data-j'); S.ans[S.i] = j;
        Array.prototype.forEach.call(qd.querySelectorAll('.opt'), function (o, k) { if (k === q.answer) o.classList.add('right'); else if (k === j) o.classList.add('wrong'); });
        qd.querySelector('#mfb').innerHTML = '<div class="why"><b>' + (j === q.answer ? 'Correct. ' : 'Not quite. ') + '</b>' + q.why + '</div><p style="margin-top:10px"><button type="button" class="btn pri" id="nx">' + (S.i + 1 === S.items.length ? 'See result' : 'Next question') + '</button></p>';
        qd.querySelector('#nx').onclick = function () { S.i++; show(); };
      });
    }
    Array.prototype.forEach.call(root.querySelectorAll('[data-n]'), function (b) { b.onclick = function () { start(+b.getAttribute('data-n')); }; });
    if (App.mastery) show();
  } };
};

/* ===== router ===== */
App.cur = 'home';
App.route = function (keepScroll) {
  if (App.stopExplainers) App.stopExplainers();
  var id = (location.hash || '#home').slice(1) || 'home', page;
  if (id === 'home') page = App.pageHome(); else if (id === 'about') page = App.pageAbout(); else if (id === 'howto') page = App.pageHowto(); else if (id === 'rules') page = App.pageRules(); else if (id === 'forms') page = App.pageForms(); else if (id === 'mastery') page = App.pageMastery(); else if (id === 'account') page = App.pageAccount(); else if (id === 'notes') page = App.pageNotes(); else if (id === 'dashboard' && App.acct.isInstructor()) page = App.pageDashboard();
  else if (App.byId[id]) page = App.pageModule(App.byId[id]); else if (App.refs[id]) page = App.pageRef(id); else { id = 'home'; page = App.pageHome(); }
  App.cur = id;
  var root = document.getElementById('page');
  root.innerHTML = '<div class="col">' + page.html + '<div class="foot">Source: New Drugs and Clinical Trials Rules, 2019 (CDSCO consolidated text, as amended to 14 October 2022). VX-01 and all cases are fictional. For teaching; not regulatory advice.</div></div>';
  App.clearEdbar(); if (App.byId[id] ? !App.lockInfo(App.byId[id]) : App.editable(id)) App.decorate(root, App.byId[id] || { id: id });
  Array.prototype.forEach.call(root.querySelectorAll('[data-widget]'), K.mount);
  App.fillLive(); if (page.after) page.after(root);
  if (App.byId[id] && !App.lockInfo(App.byId[id])) { App.wireExplainers(root, App.byId[id]); if (!(App.edit && App.acct.isInstructor())) App.linkDefs(root, App.byId[id]); }
  App.markNav(); App.askBtn(); if (App.niyam) App.niyam.route();
  document.getElementById('rail').classList.remove('open');
  if (!keepScroll) window.scrollTo(0, 0);
};
App.afterAccount = function () { App.buildNav(); App.route(true); };
/* ===== light / dark theme toggle (remembered in this browser; default follows the device) ===== */
App.theme = {
  stored: function () { try { var t = localStorage.getItem('ndv.theme'); return t === 'light' || t === 'dark' ? t : null; } catch (e) { return null; } },
  current: function () { return document.documentElement.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); },
  apply: function (t) { if (t) document.documentElement.setAttribute('data-theme', t); App.theme.label(); },
  label: function () { var next = App.theme.current() === 'dark' ? 'light' : 'dark';
    Array.prototype.forEach.call(document.querySelectorAll('.themebtn'), function (b) { b.textContent = next === 'dark' ? 'Dark theme' : 'Light theme'; b.setAttribute('aria-label', 'Switch to ' + next + ' theme'); b.setAttribute('aria-pressed', String(next === 'light')); }); },
  toggle: function () { var t = App.theme.current() === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('ndv.theme', t); } catch (e) {} App.theme.apply(t); }
};
App.init = function () {
  if (App.niyam) App.niyam.init();
  App.theme.apply(App.theme.stored());
  document.addEventListener('click', function (e) { if (e.target.closest('.themebtn')) App.theme.toggle(); });
  App.load(); App.buildNav();
  document.getElementById('menu').addEventListener('click', function () { document.getElementById('rail').classList.toggle('open'); });
  window.addEventListener('hashchange', function () { App.route(); });
  var first = false; function go() { if (first) return; first = true; App.buildNav(); App.route(); }
  setTimeout(go, 1400);
  Promise.all([App.acct.init(), App.loadRemote()]).then(function () { if (!first) go(); else { App.buildNav(); App.route(true); } }, go);
  setTimeout(App.computeLive, 60);
};
