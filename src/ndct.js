/* ===== NDCT-Vax: primary-source layer =====
   App.NDCT (content/rules_data.js) holds the verbatim text of the Rules. This file renders it:
   - the Rule reader page (#rules) and the Form navigator (#forms);
   - "Read the rule" blocks inside modules: <div data-rule="22,23"></div>, <div data-sched="fifth" data-find="periodic safety" data-n="6"></div>,
     <div data-inst="gsr364"></div>;
   - a popover with the verbatim rule when a learner taps any "rule 22" reference in course text. */
App.CODE_HTML = '';
App.ruleBy = {};
(App.NDCT.rules || []).forEach(function (r) { App.ruleBy[r.n] = r; });
App.schedBy = {};
(App.NDCT.schedules || []).forEach(function (s) { App.schedBy[s.id] = s; });
App.instBy = {};
(App.NDCT.instruments || []).forEach(function (s) { App.instBy[s.id] = s; });
App.chapTitle = {};
(App.NDCT.chapters || []).forEach(function (c) { App.chapTitle[c.num] = c.title; });

function ndEsc(s) { return K.esc(String(s)).replace(/&lt;sup&gt;([A-Z]?\d+)&lt;\/sup&gt;/g, '<sup class="fn" title="Amendment note $1">$1</sup>'); }
function ndCls(p) {
  if (/^(<sup>[A-Z]?\d+<\/sup>)?\[?\((\d+[A-Z]?)\)/.test(p)) return 'l1';
  if (/^(<sup>[A-Z]?\d+<\/sup>)?\[?\(([ivxl]+)\)/.test(p) || /^[ivx]+\.\s/.test(p)) return 'l2';
  if (/^(<sup>[A-Z]?\d+<\/sup>)?\[?\(([a-z]{1,2})\)/.test(p) || /^[a-e]\.\s/.test(p)) return 'l3';
  if (/^(<sup>[A-Z]?\d+<\/sup>)?\[?(PROVIDED|Provided|Explanation)/.test(p)) return 'pv';
  return 'l0';
}
App.parasHtml = function (paras) { return paras.map(function (p) { return '<p class="rp ' + ndCls(p) + '">' + ndEsc(p) + '</p>'; }).join(''); };
App.ruleText = function (n) {
  var r = App.ruleBy[n]; if (!r) return '';
  return 'Rule ' + r.n + '. ' + r.title + ' (Chapter ' + r.chapter + ')\n' + r.paras.join('\n').replace(/<\/?sup>/g, '');
};
App.ruleHtml = function (n, open) {
  var r = App.ruleBy[n]; if (!r) return '<p class="note">Rule ' + n + ' not found.</p>';
  return '<details class="rule"' + (open ? ' open' : '') + ' id="rule-' + r.n + '"><summary><span class="rn">Rule ' + r.n + '</span> ' + K.esc(r.title) + '</summary><div class="rbody"><p class="rmeta">Chapter ' + r.chapter + ': ' + K.esc(App.chapTitle[r.chapter] || '') + '</p>' + App.parasHtml(r.paras) + App.fnHtml(r.paras) + '</div></details>';
};
App.fnHtml = function (paras) {
  var seen = {}, out = [];
  paras.join(' ').replace(/<sup>([A-Z]?\d+)<\/sup>/g, function (_, k) { if (!seen[k] && App.NDCT.footnotes[k]) { seen[k] = 1; out.push('<li><b>' + k + '</b> ' + K.esc(App.NDCT.footnotes[k]) + '</li>'); } return _; });
  return out.length ? '<ul class="rfn">' + out.join('') + '</ul>' : '';
};
App.SRC_LINE = 'Verbatim from the New Drugs and Clinical Trials Rules, 2019 (CDSCO consolidated text, as amended to G.S.R. 778(E), 14 October 2022).';

/* blocks placed in module text */
App.renderRuleBlocks = function (root) {
  Array.prototype.forEach.call(root.querySelectorAll('[data-rule]'), function (el) {
    if (el.__done) return; el.__done = true;
    var ns = el.getAttribute('data-rule').split(',').map(function (x) { return +x.trim(); });
    el.className = 'readrule';
    el.innerHTML = '<p class="rr-h"><b>Read the rule</b> <span>' + App.SRC_LINE + '</span></p>' + ns.map(function (n) { return App.ruleHtml(n, false); }).join('');
  });
  Array.prototype.forEach.call(root.querySelectorAll('[data-sched]'), function (el) {
    if (el.__done) return; el.__done = true;
    var s = App.schedBy[el.getAttribute('data-sched')]; if (!s) return;
    var f = (el.getAttribute('data-find') || '').toLowerCase(), n = +(el.getAttribute('data-n') || 6), i0 = 0;
    if (f) { i0 = -1; s.paras.some(function (p, i) { if (p.toLowerCase().indexOf(f) >= 0) { i0 = i; return true; } return false; }); }
    if (i0 < 0) { el.innerHTML = ''; return; }
    el.className = 'readrule';
    var paras = s.paras.slice(i0, i0 + n);
    el.innerHTML = '<p class="rr-h"><b>Read the rule</b> <span>' + App.SRC_LINE + '</span></p><details class="rule"><summary><span class="rn">' + s.name + '</span> ' + K.esc(el.getAttribute('data-label') || 'extract') + '</summary><div class="rbody">' + App.parasHtml(paras) + App.fnHtml(paras) + '<p class="rmeta">Extract. The full Schedule is in the <a href="#rules">Rule reader</a>.</p></div></details>';
  });
  Array.prototype.forEach.call(root.querySelectorAll('[data-inst]'), function (el) {
    if (el.__done) return; el.__done = true;
    var s = App.instBy[el.getAttribute('data-inst')]; if (!s) return;
    el.className = 'readrule';
    el.innerHTML = '<p class="rr-h"><b>Read the instrument</b> <span>Verbatim from the Gazette of India.</span></p><details class="rule"><summary>' + K.esc(s.title) + '</summary><div class="rbody"><p class="rstat">' + K.esc(s.status) + '</p>' + App.parasHtml(s.paras) + '</div></details>';
  });
};

/* tap "rule 22" anywhere in course text to see the rule */
App.linkRules = function (root, inWidget) {
  if (App.edit && App.acct && App.acct.isInstructor && App.acct.isInstructor()) return;
  var col = inWidget ? root : root.querySelector('.col'); if (!col) return;
  var w = document.createTreeWalker(col, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
    return n.parentNode.closest(inWidget ? '.readrule,a,.rl,textarea,summary,h1' : '.readrule,a,button,.rl,textarea,.q,summary,[data-widget],.wg,h1,.stepbar') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }), list = [], n;
  while ((n = w.nextNode())) if (/\brules? \d{1,3}\b/i.test(n.nodeValue)) list.push(n);
  list.forEach(function (tn) {
    var frag = document.createDocumentFragment(), s = tn.nodeValue, re = /\b(rules?) (\d{1,3})((?:\(\w{1,4}\))*)/gi, last = 0, m;
    while ((m = re.exec(s))) {
      if (!App.ruleBy[+m[2]]) continue;
      frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      var a = document.createElement('span'); a.className = 'rl'; a.setAttribute('role', 'button'); a.tabIndex = 0; a.setAttribute('data-r', m[2]); a.textContent = m[0];
      frag.appendChild(a); last = m.index + m[0].length;
    }
    if (!last) return;
    frag.appendChild(document.createTextNode(s.slice(last))); tn.parentNode.replaceChild(frag, tn);
  });
};
App.rulePop = function (n) {
  var r = App.ruleBy[n]; if (!r) return;
  var d = document.getElementById('rulepop');
  if (!d) {
    d = document.createElement('div'); d.id = 'rulepop'; d.className = 'rulepop'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    document.body.appendChild(d);
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-close]')) d.hidden = true; if (e.target.closest('[data-goread]')) { d.hidden = true; App.ruleTarget = +e.target.closest('[data-goread]').getAttribute('data-goread'); location.hash = 'rules'; if (App.cur === 'rules') App.route(); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') d.hidden = true; });
  }
  d.innerHTML = '<div class="rp-card"><div class="rp-head"><b>Rule ' + r.n + '. ' + K.esc(r.title) + '</b><button type="button" class="btn sm" data-close>Close</button></div><div class="rp-body"><p class="rmeta">Chapter ' + r.chapter + ': ' + K.esc(App.chapTitle[r.chapter] || '') + '</p>' + App.parasHtml(r.paras) + App.fnHtml(r.paras) + '<p class="rmeta">' + App.SRC_LINE + '</p></div><div class="rp-foot"><button type="button" class="btn" data-goread="' + r.n + '">Open in the Rule reader</button></div></div>';
  d.hidden = false; d.querySelector('[data-close]').focus();
};
document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('.rl[data-r]'); if (a) { e.preventDefault(); App.rulePop(+a.getAttribute('data-r')); } });
document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('rl')) { e.preventDefault(); App.rulePop(+e.target.getAttribute('data-r')); } });

(function () {
  var base = App.route;
  App.route = function (keep) {
    base(keep);
    var root = document.getElementById('page');
    App.renderRuleBlocks(root);
    if (App.byId[App.cur] || App.refs[App.cur]) App.linkRules(root);
  };
})();

/* ===== Rule reader ===== */
App.pageRules = function () {
  var N = App.NDCT, h = '<p class="eyebrow">Primary source</p><h1>Rule reader</h1>' +
    '<p class="lede">The New Drugs and Clinical Trials Rules, 2019, verbatim. Search for a word or a rule number, or open a chapter.</p>' +
    '<div class="callout key"><b>About this text</b><p>' + K.esc(N.source) + '. Text was extracted from the official PDFs; layout of long tables (for example the fee table in the Sixth Schedule) may be imperfect, so check tables against the PDF. Superscript numbers mark amendments and are explained under each rule. The forms of the Eighth Schedule are summarised in the <a href="#forms">Form navigator</a>.</p></div>' +
    '<input class="search" id="rsearch" type="search" placeholder="Search the Rules, for example: deemed, Form CT-06, 24 hours, 22" aria-label="Search the Rules"><p class="num" id="rcount" style="color:var(--muted)"></p>';
  var byCh = {}; N.rules.forEach(function (r) { (byCh[r.chapter] = byCh[r.chapter] || []).push(r); });
  N.chapters.forEach(function (c) {
    h += '<section class="rchap" data-ch="' + c.num + '"><h2>Chapter ' + c.num + ' <span class="rct">' + K.esc(c.title) + '</span></h2>' + (byCh[c.num] || []).map(function (r) { return App.ruleHtml(r.n, false); }).join('') + '</section>';
  });
  h += '<section class="rchap"><h2>Schedules</h2>' + N.schedules.map(function (s) { return '<details class="rule" id="sched-' + s.id + '"><summary><span class="rn">' + s.name + '</span> ' + K.esc(s.pre ? 'Fee payable (table as extracted; check against the PDF)' : (s.paras[0] && s.paras[0].length < 160 ? s.paras[0] : '')) + '</summary><div class="rbody">' + (s.pre ? '<div class="pretab">' + s.paras.map(function (l) { return K.esc(l); }).join('<br>') + '</div>' : App.parasHtml(s.paras) + App.fnHtml(s.paras)) + '</div></details>'; }).join('') + '</section>';
  h += '<section class="rchap"><h2>Later instruments</h2><p>Text of notifications issued after the consolidated copy. Read the status line first: a draft is not law.</p>' + (N.instruments || []).map(function (s) { return '<details class="rule" id="inst-' + s.id + '"><summary>' + K.esc(s.title) + '</summary><div class="rbody"><p class="rstat">' + K.esc(s.status) + '</p>' + App.parasHtml(s.paras) + '</div></details>'; }).join('') + '</section>';
  return { html: h, after: function (root) {
    var inp = root.querySelector('#rsearch'), cnt = root.querySelector('#rcount'), all = root.querySelectorAll('details.rule');
    function run() {
      var q = inp.value.trim().toLowerCase(), k = 0;
      if (/^\d{1,3}$/.test(q)) { var el = root.querySelector('#rule-' + q); Array.prototype.forEach.call(all, function (d) { d.hidden = d !== el; d.open = d === el; }); cnt.textContent = el ? 'Rule ' + q : 'No rule ' + q; return; }
      Array.prototype.forEach.call(all, function (d) { var hit = !q || d.textContent.toLowerCase().indexOf(q) >= 0; d.hidden = !hit; d.open = !!q && hit && q.length > 2; if (hit) k++; });
      Array.prototype.forEach.call(root.querySelectorAll('.rchap'), function (s) { s.hidden = !!q && !s.querySelector('details.rule:not([hidden])'); });
      cnt.textContent = q ? k + ' match' + (k === 1 ? '' : 'es') : '';
    }
    var t; inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 180); });
    if (App.ruleTarget) { var el = root.querySelector('#rule-' + App.ruleTarget); App.ruleTarget = null; if (el) { el.open = true; setTimeout(function () { el.scrollIntoView({ block: 'start' }); }, 30); } }
  } };
};

/* ===== Form navigator ===== */
App.FORMS = [
  ['CT-01', 'Application for registration or renewal of an Ethics Committee (clinical trial / BA-BE, or biomedical and health research)', '8, 10, 17', 'Ethics Committee → CLA (rule 8) or authority designated by DHR (rule 17)', 'CT-02 or CT-03'],
  ['CT-02', 'Grant of registration of an Ethics Committee for clinical trial or BA/BE study', '8, 9', 'CLA', 'Valid five years (rule 9)'],
  ['CT-02A', 'Information to initiate functioning of an Ethics Committee on deemed registration', '8(3A)', 'Ethics Committee → CLA', 'Becomes the record of deemed registration'],
  ['CT-03', 'Grant of registration of an Ethics Committee for biomedical and health research', '17', 'Authority designated by DHR', 'Valid five years (rule 17(9))'],
  ['CT-04', 'Application for permission to conduct a clinical trial of a new drug or investigational new drug', '21', 'Sponsor / applicant → CLA', 'CT-06; or CT-4A (rule 23) or CT-06A (rules 22, 24) on deemed approval'],
  ['CT-4A', 'Information to initiate a clinical trial on automatic approval (drug discovered, or researched and to be made and marketed, in India)', '23(2)', 'Applicant → CLA', 'Valid two years (rule 26)'],
  ['CT-05', 'Application for permission to conduct a bioavailability or bioequivalence study', '33', 'Applicant → CLA', 'CT-07'],
  ['CT-06', 'Permission to conduct a clinical trial', '22, 25, 26, 29, 30', 'CLA', 'Valid two years (rule 26)'],
  ['CT-06A', 'Information to initiate a clinical trial on deemed approval', '22(2A), 24', 'Applicant → CLA', 'Becomes the record of deemed approval'],
  ['CT-07', 'Permission to conduct a bioavailability or bioequivalence study', '34 to 38', 'CLA', ''],
  ['CT-07A', 'Information to initiate a BA/BE study on deemed approval', '34', 'Applicant → CLA', ''],
  ['CT-08', 'Application for registration or renewal of a BA/BE study centre', '45, 48', 'Centre → CLA', 'CT-09'],
  ['CT-09', 'Grant of registration of a BA/BE study centre', '47 to 51', 'CLA', 'Valid five years (rule 48)'],
  ['CT-10', 'Application for permission to manufacture a new drug or IND for clinical trial, BA/BE study, or examination, test and analysis', '52', 'Manufacturer → CLA', 'CT-11; or CT-11A on deemed approval'],
  ['CT-11', 'Permission to manufacture a new drug or IND for clinical trial, BA/BE study, or examination, test and analysis', '53 to 58', 'CLA', 'Valid three years (rule 54); then licence under the D&C Rules, 1945 (rule 56)'],
  ['CT-11A', 'Information to manufacture on deemed approval', '53(2A)', 'Manufacturer → CLA', ''],
  ['CT-12', 'Application by a formulation manufacturer for permission to manufacture an unapproved API for developing a formulation', '59', 'Formulation manufacturer → CLA', 'CT-14'],
  ['CT-13', 'Application by an API manufacturer for permission to manufacture an unapproved API', '59, 60', 'API manufacturer → CLA', 'CT-15'],
  ['CT-14 / CT-14A', 'Permission (or deemed-approval information) to manufacture a formulation of an unapproved API for test, analysis, clinical trial or BA/BE study', '60 to 64', 'CLA / manufacturer', ''],
  ['CT-15 / CT-15A', 'Permission (or deemed-approval information) to manufacture an unapproved API', '60 to 64', 'CLA / manufacturer', ''],
  ['CT-16', 'Application for a licence to import a new drug or IND for clinical trial, BA/BE study, or examination, test and analysis', '67', 'Importer → CLA', 'CT-17'],
  ['CT-17', 'Licence to import a new drug or IND for clinical trial, BA/BE study, or examination, test and analysis', '68 to 72', 'CLA', 'Valid three years (rule 69)'],
  ['CT-18', 'Application for permission to import a new drug for sale or distribution', '75', 'Importer → CLA', 'CT-19 (API) or CT-20 (formulation)'],
  ['CT-19 / CT-20', 'Permission to import a new drug (API / formulation) for sale or distribution', '76 to 78', 'CLA', 'Then import licence under the D&C Rules, 1945 (rule 79)'],
  ['CT-21', 'Application for permission to manufacture a new drug for sale or distribution', '80', 'Manufacturer → CLA', 'CT-22 (API) or CT-23 (formulation)'],
  ['CT-22 / CT-23', 'Permission to manufacture a new drug (API / formulation) for sale or distribution', '81 to 84', 'CLA', 'Then manufacturing licence under the D&C Rules, 1945 (rule 83)'],
  ['CT-24', 'Application by a Government hospital or medical institution to import an unapproved new drug for patients', '86', 'Medical officer (certified by head) → CLA', 'CT-25'],
  ['CT-25', 'Licence to import an unapproved new drug for treatment of patients', '87 to 90', 'CLA', 'Valid three years (rule 88)'],
  ['CT-26', 'Application to manufacture an unapproved new drug that is under clinical trial, for a patient with a life-threatening disease', '91', 'Manufacturer → CLA (after EC recommendation)', 'CT-27'],
  ['CT-27', 'Permission to manufacture an unapproved new drug under clinical trial for such a patient', '92 to 95', 'CLA', 'Valid one year (rule 93)'],
  ['CT-07B / CT-07C', 'DRAFT ONLY: application for, and grant of, registration of a Clinical Research Organisation', 'Draft 38B, 38C (G.S.R. 364(E))', '—', 'Not in force unless finally notified']
];
App.pageForms = function () {
  var h = '<p class="eyebrow">Tool</p><h1>Form navigator</h1><p class="lede">The forms of the Eighth Schedule: what each is for, the rule that governs it, who files or issues it, and what follows. Tap a rule number to read the rule.</p>' +
    '<input class="search" id="fsearch" type="search" placeholder="Filter, for example: import, Ethics, deemed" aria-label="Filter forms">' +
    '<div class="tw"><table class="data forms"><thead><tr><th>Form</th><th>Purpose</th><th>Rules</th><th>Who</th><th>What follows</th></tr></thead><tbody>' +
    App.FORMS.map(function (f) { return '<tr' + (/DRAFT/.test(f[1]) ? ' class="draft"' : '') + '><td><b>' + f[0] + '</b></td><td>' + K.esc(f[1]) + '</td><td>' + f[2].replace(/(^|[\s,])(\d{1,3})(?![\dA-Z])/g, function (all, pre, x) { return pre + (App.ruleBy[+x] && !/Draft/.test(f[2]) ? '<span class="rl" role="button" tabindex="0" data-r="' + x + '">' + x + '</span>' : x); }) + '</td><td>' + K.esc(f[3]) + '</td><td>' + K.esc(f[4]) + '</td></tr>'; }).join('') +
    '</tbody></table></div><p class="note">CLA: Central Licencing Authority (the Drugs Controller, India; rule 3). DHR: Department of Health Research. Form purposes are paraphrased from the form titles in the Eighth Schedule; the forms themselves are in the CDSCO PDF.</p>';
  return { html: h, after: function (root) {
    var inp = root.querySelector('#fsearch');
    inp.addEventListener('input', function () { var q = inp.value.toLowerCase(); Array.prototype.forEach.call(root.querySelectorAll('tbody tr'), function (tr) { tr.hidden = q && tr.textContent.toLowerCase().indexOf(q) < 0; }); });
  } };
};
