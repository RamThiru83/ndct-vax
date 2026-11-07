/* ===== NDCT-Vax interactive tools =====
   regClock (statutory deadlines), routeFinder (which permission route for a trial), saePathway (rule 42 timelines),
   compCalc (Seventh Schedule formulae), psurCalendar (Fifth Schedule), waiverCheck (rules 75(7) and 80(7)),
   drill (one scenario at a time; data in App.DRILLS[set], defined in the module files). */
App.DRILLS = App.DRILLS || {};
K.titles.regClock = 'Regulatory clock'; K.titles.routeFinder = 'Trial permission route'; K.titles.saePathway = 'SAE reporting and compensation clock';
K.titles.compCalc = 'Compensation calculator (Seventh Schedule)'; K.titles.psurCalendar = 'PSUR calendar (Fifth Schedule)'; K.titles.waiverCheck = 'Local clinical trial waiver check'; K.titles.drill = 'Decide';

/* ---- dates ---- */
var ND = {};
ND.parse = function (s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null; };
ND.iso = function (d) { return d.toISOString().slice(0, 10); };
ND.fmt = function (d) { return d ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'n/a'; };
ND.addDays = function (d, n) { var x = new Date(d.getTime()); x.setUTCDate(x.getUTCDate() + n); return x; };
ND.addMonths = function (d, n) { var x = new Date(d.getTime()); x.setUTCMonth(x.getUTCMonth() + n); return x; };
ND.isWork = function (d, hol) { var w = d.getUTCDay(); return w !== 0 && w !== 6 && !hol[ND.iso(d)]; };
ND.addWork = function (d, n, hol) { var x = new Date(d.getTime()), k = 0, step = n < 0 ? -1 : 1; while (k < Math.abs(n)) { x = ND.addDays(x, step); if (ND.isWork(x, hol)) k++; } return x; };
ND.today = function () { var t = new Date(); return ND.iso(new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()))); };
ND.hol = function (txt) { var h = {}; String(txt || '').split(/[\s,;]+/).forEach(function (s) { if (ND.parse(s)) h[s] = 1; }); return h; };
ND.add = function (d, n, unit, hol) { return unit === 'wd' ? ND.addWork(d, n, hol) : unit === 'd' ? ND.addDays(d, n) : unit === 'h' ? ND.addDays(d, Math.ceil(n / 24)) : unit === 'y' ? ND.addMonths(d, 12 * n) : d; };
ND.unitTxt = { wd: 'working days', d: 'days', h: 'hours', y: 'years' };
/* extra controls on a widget panel */
function ndCtl(P, html) { var d = document.createElement('div'); d.className = 'ctl'; d.innerHTML = html; P.cbox.appendChild(d); return d; }
function ndDate(P, key, label, def) {
  P.v[key] = def; P.defs[key] = def; var id = 'w' + (++K.uid);
  var d = ndCtl(P, '<label for="' + id + '"><span>' + label + '</span></label><input id="' + id + '" type="date" value="' + def + '">'), inp = d.querySelector('input');
  inp.addEventListener('input', function () { P.v[key] = inp.value; P.touch(); }); P.ui[key] = function (v) { inp.value = v; }; return P;
}
function ndText(P, key, label, def, ph) {
  P.v[key] = def; P.defs[key] = def; var id = 'w' + (++K.uid);
  var d = ndCtl(P, '<label for="' + id + '"><span>' + label + '</span></label><textarea id="' + id + '" rows="2" placeholder="' + (ph || '') + '"></textarea>'), inp = d.querySelector('textarea'); inp.value = def;
  inp.addEventListener('input', function () { P.v[key] = inp.value; P.touch(); }); P.ui[key] = function (v) { inp.value = v; }; return P;
}
var WD_NOTE = 'The Rules do not define “working days”. This tool counts Monday to Friday and skips any holidays you list; the day of receipt is not counted. Check the Government of India holiday list for the year.';

/* ---- 1. regulatory clock ---- */
App.CLOCKS = [
  ['r8', 'Ethics Committee registration: decision on Form CT-01', '8(3)', 45, 'wd', 'Date the CLA received the application', 'If no communication within the period, registration is deemed granted; inform the CLA in Form CT-02A before the committee starts work (rule 8(3A)).'],
  ['r10', 'Ethics Committee renewal: apply before expiry', '10(1)', -90, 'd', 'Date registration expires', 'Apply ninety days before expiry; if received by then, registration continues until an order is passed.'],
  ['r12', 'Ethics Committee: report a change in membership', '12(4)', 30, 'wd', 'Date of the change', ''],
  ['r22', 'Clinical trial permission (general route): decision', '22(2)', 90, 'wd', 'Date the CLA received Form CT-04', 'If no communication within the period, permission is deemed granted; inform the CLA in Form CT-06A before starting (rule 22(2A)).'],
  ['r23', 'Clinical trial permission, drug discovered (or researched, and to be made and marketed) in India: disposal', '23(1)', 30, 'wd', 'Date the CLA received a complete Form CT-04', 'If no communication within the period, permission is deemed granted; inform the CLA in Form CT-4A before starting (rule 23(2)).'],
  ['r24', 'Clinical trial permission, drug approved and marketed in a rule 101 country: disposal', '24', 90, 'wd', 'Date the CLA received Form CT-04', 'If no communication within the period, permission is deemed granted; inform the CLA in Form CT-06A before starting.'],
  ['r22r', 'Request reconsideration after rejection', '22(3) proviso', 60, 'wd', 'Date of rejection', ''],
  ['r22a', 'Appeal to the Central Government against a decision', '22(4)', 45, 'd', 'Date the decision was received', 'The Government disposes of the appeal within sixty working days.'],
  ['r25iv', 'Inform the CLA of an Ethics Committee approval', '25(iv)', 15, 'wd', 'Date the Ethics Committee granted approval', ''],
  ['r25ix', 'Report reasons for terminating a trial', '25(ix)', 30, 'wd', 'Date of termination', ''],
  ['r25x', 'Forward the analysed SAE report (CLA, EC chairperson, institute)', '25(x)', 14, 'd', 'Date the SAE occurred', 'As per Table 5 of the Third Schedule and Chapter VI.'],
  ['r42', 'Investigator reports an SAE (CLA, sponsor, Ethics Committee)', '42(1)', 24, 'h', 'Date the SAE occurred', 'Twenty-four hours: the tool shows the next calendar day.'],
  ['r26', 'Validity of permission to initiate a trial (CT-06 or CT-4A)', '26', 2, 'y', 'Date of issue', 'Unless extended by the CLA.'],
  ['r28', 'Academic trial: Ethics Committee tells the CLA its view on a possible overlap', '28(2)', 30, 'wd', 'Date the EC received the application', 'The CLA then clarifies within thirty working days; silence means no permission is required (rule 28(3)).'],
  ['r53', 'Permission to manufacture the investigational vaccine (CT-10 → CT-11)', '53(1)', 90, 'wd', 'Date the CLA received Form CT-10', 'If no communication, deemed granted; inform the CLA in Form CT-11A before manufacturing (rule 53(2A)).'],
  ['r54', 'Validity of CT-11', '54(1)', 3, 'y', 'Date of issue', 'May be extended by one year in exceptional circumstances (rule 54(2)).'],
  ['r68', 'Licence to import for a clinical trial (CT-16 → CT-17)', '68(1)', 90, 'd', 'Date the CLA received Form CT-16', 'Note: this clock is in days, not working days.'],
  ['r69', 'Validity of CT-17', '69(1)', 3, 'y', 'Date of issue', ''],
  ['r76', 'Permission to import a new drug for sale (CT-18 → CT-19/CT-20)', '76', 90, 'wd', 'Date the CLA received Form CT-18', ''],
  ['r81', 'Permission to manufacture a new drug for sale (CT-21 → CT-22/CT-23)', '81(1)', 90, 'wd', 'Date the CLA received Form CT-21', ''],
  ['r98', 'Pre-submission meeting: CLA points out an incomplete request', '98(4)', 30, 'd', 'Date the CLA received the request', ''],
  ['r99', 'Request a post-submission meeting on a query', '99(1)', 15, 'd', 'Date the query was received', ''],
  ['r100', 'Expert committee recommends on a matter referred to it', '100', 60, 'd', 'Date of reference', '']
];
K.widget('regClock', function (P, set) {
  var opts = App.CLOCKS.map(function (c) { return [c[0], c[1] + ' (rule ' + c[2] + ')']; });
  P.select('k', 'Which clock?', opts, set && App.CLOCKS.some(function (c) { return c[0] === set; }) ? set : 'r22');
  ndDate(P, 'start', 'Start date', '2026-12-01');
  ndText(P, 'hol', 'Holidays to skip (YYYY-MM-DD, optional)', '2026-12-25', '2026-12-25, 2027-01-26');
  var last = null;
  P.draw = function () {
    var c = App.CLOCKS.filter(function (x) { return x[0] === P.v.k; })[0], d0 = ND.parse(P.v.start);
    if (!c || !d0) { P.out.innerHTML = '<p class="note">Enter a start date.</p>'; return; }
    var hol = ND.hol(P.v.hol), d1 = ND.add(d0, c[3], c[4], hol), back = c[3] < 0;
    var span = Math.round((d1 - d0) / 864e5);
    P.out.innerHTML = K.stats([['Starts', ND.fmt(d0)], [back ? 'Apply by' : 'Deadline', ND.fmt(d1)], ['Rule', c[2]], ['Clock', Math.abs(c[3]) + ' ' + ND.unitTxt[c[4]] + (back ? ' before' : '')]]) +
      '<p><b>Start:</b> ' + c[5] + '. ' + (c[4] === 'wd' ? 'That is ' + Math.abs(span) + ' calendar days.' : '') + '</p>' + (c[6] ? K.verdict(c[6], /deemed/.test(c[6]) ? 'good' : '') : '') +
      (c[4] === 'wd' ? '<p class="note">' + WD_NOTE + '</p>' : '');
    if (last && last.k !== P.v.k) {
      var a = App.CLOCKS.filter(function (x) { return x[0] === last.k; })[0];
      if (a && a[4] !== c[4] && (a[4] === 'wd' || c[4] === 'wd')) P.notice('This clock runs in ' + ND.unitTxt[c[4]] + '; the previous one ran in ' + ND.unitTxt[a[4]] + '. The same number can mean a very different date.');
      else P.notice('');
    }
    last = { k: P.v.k };
  };
});

/* ---- 2. trial permission route ---- */
K.widget('routeFinder', function (P) {
  P.select('disc', 'Was the vaccine discovered in India?', [['no', 'No'], ['yes', 'Yes']], 'no');
  P.select('rd', 'Is its research and development being done in India, and is it to be manufactured and marketed in India?', [['no', 'No'], ['yes', 'Yes']], 'yes');
  P.select('abroad', 'Is it already approved and marketed in a country specified under rule 101?', [['no', 'No'], ['yes', 'Yes']], 'no');
  P.select('govt', 'Is the applicant funded or owned, wholly or partially, by the Central or a State Government?', [['no', 'No'], ['yes', 'Yes']], 'yes');
  P.check('complete', 'The application is complete as per the Rules', true);
  P.draw = function () {
    var v = P.v, h = '', rule, clock, form;
    if (v.disc === 'yes' || v.rd === 'yes') { rule = '23'; clock = 'thirty working days'; form = 'CT-4A'; }
    else if (v.abroad === 'yes') { rule = '24'; clock = 'ninety working days'; form = 'CT-06A'; }
    else { rule = '22'; clock = 'ninety working days'; form = 'CT-06A'; }
    h += K.stats([['Apply in', 'Form CT-04 (rule 21)'], ['Decided under', 'Rule ' + rule], ['Clock', clock], ['Deemed approval form', form]]);
    if (rule === '23') h += K.verdict('Rule 23 applies to an application that is <b>complete</b> and meets condition (i) or (ii). The CLA grants, rejects, or asks for deficiencies to be rectified within thirty working days; with no communication, permission is deemed granted and you inform the CLA in Form CT-4A before starting.' + (v.complete ? '' : ' <b>Your application is not complete, so the thirty-day route cannot start.</b>'), v.complete ? 'good' : 'bad');
    else if (rule === '24') h += K.verdict('Rule 24: a new drug already approved and marketed in a country specified under rule 101 is disposed of within ninety working days. Which countries are specified is set by an order under rule 101, not by the Rules themselves.', 'warn');
    else h += K.verdict('Rule 22: the general route, decided within ninety working days, with deemed approval and Form CT-06A if there is no communication.');
    h += '<p><b>Fee:</b> ' + (v.govt === 'yes' ? 'none for a trial by a person of an institution funded or owned, wholly or partially, by the Central or a State Government (rule 21(2), proviso).' : 'as specified in the Sixth Schedule.') + '</p>';
    P.out.innerHTML = h;
    P.notice(rule === '23' ? 'An Indian vaccine qualifies through either limb: discovery in India, or Indian R&D plus manufacture and marketing in India.' : '');
  };
});

/* ---- 3. SAE pathway (rule 42) ---- */
K.widget('saePathway', function (P) {
  P.select('kind', 'Outcome of the serious adverse event', [['death', 'Death'], ['injury', 'Permanent disability or other injury']], 'death');
  ndDate(P, 'occ', 'Date the SAE occurred', '2027-03-02');
  ndDate(P, 'know', 'Date the sponsor and investigator knew of it', '2027-03-03');
  ndDate(P, 'rec', 'Date the investigator\'s report reached the EC and the CLA', '2027-03-03');
  P.draw = function () {
    var o = ND.parse(P.v.occ), k = ND.parse(P.v.know), r = ND.parse(P.v.rec);
    if (!o || !k || !r) { P.out.innerHTML = '<p class="note">Enter all three dates.</p>'; return; }
    var death = P.v.kind === 'death', ord = ND.addDays(r, 90), items = [];
    items.push([ND.addDays(o, 1), 'Investigator reports the SAE to the CLA, the sponsor and the Ethics Committee', '42(1)', 'within twenty-four hours of occurrence']);
    items.push([ND.addDays(o, 14), 'Analysed SAE report to the CLA, EC chairperson and institute (condition of permission)', '25(x)', 'within fourteen days of occurrence']);
    if (death) items.push([ND.addDays(k, 14), 'Sponsor and investigator send their analysed reports on the death to the CLA and the head of the institution', '42(2)(ii)', 'within fourteen days of knowledge of occurrence']);
    else items.push([ND.addDays(k, 14), 'Sponsor and investigator send analysed reports to the CLA, EC chairperson and head of the institution', '42(3)(i)', 'within fourteen days of the reporting of the SAE (tool counts from the date of knowledge)']);
    items.push([ND.addDays(r, 30), 'Ethics Committee sends its report and its opinion on compensation (Seventh Schedule)', death ? '42(2)(iii)' : '42(3)(ii)', 'within thirty days of receiving the report']);
    items.push([ND.addDays(r, 60), death ? 'Independent expert committee recommends on cause and compensation' : 'If the CLA constitutes one, the expert committee recommends', death ? '42(2)(v)' : '42(3)(iii)', 'within sixty days of receipt of the report']);
    items.push([ord, 'CLA decides relatedness and orders the quantum of compensation', death ? '42(2)(viii)' : '42(3)(iv)', 'within ninety days of receipt of the report']);
    items.push([ND.addDays(ord, 30), 'Sponsor pays the compensation (if related)', death ? '42(2)(ix)' : '42(3)(v)', 'within thirty days of receipt of the order (tool assumes the order arrives on the last permitted day)']);
    items.push([ND.addWork(ord, 30, {}), 'Sponsor tells the CLA the details of compensation provided', '25(xi), 25(xii)', 'within thirty working days of receipt of the order (Monday to Friday counted; holidays not skipped)']);
    items.sort(function (a, b) { return a[0] - b[0]; });
    P.out.innerHTML = '<ol class="tl">' + items.map(function (x) { return '<li><b class="d">' + ND.fmt(x[0]) + '</b> ' + x[1] + ' <small>Rule ' + x[2] + ': ' + x[3] + '</small></li>'; }).join('') + '</ol>' +
      '<p class="note">Medical management is free for as long as the investigator thinks it is needed, or until the injury is shown to be unrelated, whichever is earlier (rule 40(1)). All dates are illustrative; the Rules count most of these periods in days.</p>';
    var gap = Math.round((r - o) / 864e5);
    P.notice(gap > 1 ? 'The investigator\'s report reached the committee ' + gap + ' days after the event. Rule 42(1) allows twenty-four hours; a late report must come with reasons for the delay.' : '');
  };
});

/* ---- 4. compensation (Seventh Schedule) ---- */
App.FACTOR = { 16: 228.54, 17: 227.49, 18: 226.38, 19: 225.22, 20: 224.00, 21: 222.71, 22: 221.37, 23: 219.95, 24: 218.47, 25: 216.91, 26: 215.28, 27: 213.57, 28: 211.79, 29: 209.92, 30: 207.98, 31: 205.95, 32: 203.85, 33: 201.66, 34: 199.40, 35: 197.06, 36: 194.64, 37: 192.14, 38: 189.56, 39: 186.90, 40: 184.17, 41: 181.37, 42: 178.49, 43: 175.54, 44: 172.52, 45: 169.44, 46: 166.29, 47: 163.07, 48: 159.80, 49: 156.47, 50: 153.09, 51: 149.67, 52: 146.20, 53: 142.68, 54: 139.13, 55: 135.56, 56: 131.95, 57: 128.33, 58: 124.70, 59: 121.05, 60: 117.41, 61: 113.77, 62: 110.14, 63: 106.52, 64: 102.93, 65: 99.37 };
App.factorFor = function (age) { age = Math.floor(age); return age <= 16 ? App.FACTOR[16] : age >= 65 ? App.FACTOR[65] : App.FACTOR[age]; };
App.inr = function (x) { return '₹' + Math.round(x).toLocaleString('en-IN'); };
K.widget('compCalc', function (P) {
  P.select('kind', 'Clinical trial related outcome', [['death', 'Death'], ['dis', 'Permanent disability'], ['cong', 'Congenital anomaly or birth defect'], ['hosp', 'Chronic life-threatening disease, or reversible SAE that resolved']], 'death');
  P.number('age', 'Age of the trial subject (years)', 25, 0, 100, 1);
  P.select('R', 'Risk factor R at enrolment', [[4, '4.0  Healthy volunteer or subject of no risk'], [3, '3.0  Mild risk'], [2, '2.0  Moderate risk'], [1, '1.0  High risk (expected survival 6 to 24 months)'], [0.5, '0.5  Terminally ill (expected survival not more than 6 months)']], 4);
  P.check('m90', 'Expected mortality 90% or more within 30 days', false);
  P.number('D', 'Percentage disability (D)', 40, 1, 100, 1);
  P.number('W', 'Minimum wage per day of an unskilled worker in Delhi (₹, enter the current figure)', 0, 0, 5000, 1);
  P.number('N', 'Days of hospitalisation (N)', 5, 0, 365, 1);
  P.draw = function () {
    var v = P.v, F = App.factorFor(v.age), B = 800000, C = v.m90 ? 200000 : B * F * v.R / 99.37, h = '';
    var deathLine = v.m90 ? 'Expected mortality of 90% or more within 30 days: fixed amount ₹2,00,000.' : 'Compensation = (B × F × R) / 99.37 = (8,00,000 × ' + F.toFixed(2) + ' × ' + v.R + ') / 99.37 = <b>' + App.inr(C) + '</b>';
    if (v.kind === 'death') h = K.stats([['B (base amount)', '₹8,00,000'], ['F (age ' + Math.floor(v.age) + ')', F.toFixed(2)], ['R', v.R], ['Compensation', App.inr(C)]]) + '<p>' + deathLine + '</p>';
    else if (v.kind === 'dis') { var X = C * v.D * 90 / (100 * 100); h = K.stats([['C (death amount)', App.inr(C)], ['D', v.D + '%'], ['Compensation', App.inr(X)]]) + '<p>Compensation = (C × D × 90) / (100 × 100), where C is what would have been due on death: ' + deathLine + '</p>'; }
    else if (v.kind === 'cong') h = K.stats([['Compensation', '₹4,00,000']]) + '<p>The Schedule sets the quantum at half of the base amount in the formula for death (B = ₹8 lacs). Where the birth defect can be fully corrected, or causes permanent disability, the sponsor also provides medical management for as long as required, over and above the compensation.</p>';
    else h = (v.W > 0 ? K.stats([['W', App.inr(v.W)], ['N', v.N + ' days'], ['Compensation', App.inr(2 * v.W * v.N)]]) : '') + '<p>Compensation = 2 × W × N. ' + (v.W > 0 ? '' : '<b>Enter W.</b> The Rules link W to the minimum wage of an unskilled worker in Delhi but do not state the figure, so it must be taken from the current notification.') + '</p>';
    P.out.innerHTML = h + '<p class="note">Formulae and the age factor table are from the Seventh Schedule. The CLA decides the quantum by order, on the expert committee\'s recommendation (rule 42). Illustrative only.</p>';
    P.notice(v.kind === 'death' && v.R === 4 ? 'Healthy volunteers carry the highest risk factor, 4.0, so a related death or disability in a vaccine trial attracts the largest compensation.' : '');
  };
});

/* ---- 5. PSUR calendar (Fifth Schedule) ---- */
K.widget('psurCalendar', function (P) {
  ndDate(P, 'appr', 'Date permission was granted', '2029-04-15');
  P.draw = function () {
    var a = ND.parse(P.v.appr); if (!a) { P.out.innerHTML = '<p class="note">Enter a date.</p>'; return; }
    var rows = [], s = a, i;
    for (i = 1; i <= 4; i++) { var e = ND.addMonths(a, 6 * i); rows.push(['PSUR ' + i + ' (six-monthly)', ND.fmt(s) + ' to ' + ND.fmt(ND.addDays(e, -1)), ND.fmt(ND.addDays(ND.addDays(e, -1), 30))]); s = e; }
    for (i = 3; i <= 4; i++) { var e2 = ND.addMonths(a, 12 * i); rows.push(['PSUR ' + (i + 2) + ' (annual)', ND.fmt(s) + ' to ' + ND.fmt(ND.addDays(e2, -1)), ND.fmt(ND.addDays(ND.addDays(e2, -1), 30))]); s = e2; }
    P.out.innerHTML = K.tbl(['Report', 'Interval', 'Due by'], rows) + '<p class="note">Fifth Schedule: six-monthly for the first two years after approval, annually for the next two; each due within thirty calendar days of the last day of the reporting period. Serious unexpected adverse reactions are reported within fifteen days of initial receipt, whatever the PSUR cycle. The CLA may extend the total duration.</p>';
  };
});

/* ---- 6. local clinical trial waiver (rules 75(7) and 80(7)) ---- */
K.widget('waiverCheck', function (P) {
  P.select('route', 'Application', [['imp', 'Import for sale (Form CT-18, rule 75(7))'], ['mfg', 'Manufacture for sale (Form CT-21, rule 80(7))']], 'imp');
  P.check('a', 'Approved and marketed in a country specified under rule 101, with no major unexpected serious adverse events reported', true);
  P.check('b', 'Import only: a global clinical trial permitted by the CLA is ongoing in India, and the drug has meanwhile been approved in a rule 101 country', false);
  P.check('c', 'No probability or evidence of a difference in the Indian population affecting pharmacokinetics, pharmacodynamics, safety or efficacy', true);
  P.check('d', 'Written undertaking to conduct a Phase IV trial as per a design approved by the CLA', false);
  P.check('e', 'Indicated in a life-threatening or serious disease, a disease of special relevance to India, an unmet need, or a rare or orphan condition (proviso)', false);
  P.draw = function () {
    var v = P.v, h;
    if (v.route === 'imp') {
      var ok = (v.a || v.b) && v.c && v.d;
      h = '<p>Rule 75(7) reads: (i) <i>or</i> (ii), <i>and</i> (iii), <i>and</i> (iv).</p>' + K.verdict(ok ? 'As written, all the conditions are met: the local clinical trial <b>may not be required</b>. “May” leaves the decision with the CLA.' : 'Not all the conditions are met, so the waiver in rule 75(7) does not apply as written.' + (v.e ? ' The proviso lets the CLA <b>relax “this condition”</b> for such diseases; which condition it relaxes is for the CLA to decide.' : ''), ok ? 'good' : 'bad');
    } else {
      h = '<p>Rule 80(7) reads: (i) approved in a rule 101 country <i>or</i> (ii) no population difference, <i>and</i> (iii) Phase IV undertaking. Its conjunctions differ from rule 75(7). Read both before relying on either.</p>' +
        K.verdict('Conditions ticked: ' + ['(i) ' + (v.a ? 'met' : 'not met'), '(ii) ' + (v.c ? 'met' : 'not met'), '(iii) ' + (v.d ? 'met' : 'not met')].join('; ') + '. Whether the waiver applies is for the CLA.' + (v.e ? ' The proviso allows relaxation for such diseases.' : ''), 'warn');
    }
    h += '<div class="callout warn pending"><b>Pending</b><p>Which countries are “specified under rule 101” is set by an order, not by the Rules. Check the current order before using this tool on a real product.</p></div>';
    P.out.innerHTML = h;
    P.notice(!v.d ? 'Without the Phase IV undertaking, neither waiver applies as written.' : '');
  };
});

/* ---- 7. decision drill ---- */
K.widget('drill', function (P, set) {
  var items = App.DRILLS[set] || [], st = { i: 0, ok: 0, done: false, ans: null };
  P.onreset = function () { st = { i: 0, ok: 0, done: false, ans: null }; };
  P.root.classList.add('drill');
  P.draw = function () {
    if (!items.length) { P.out.innerHTML = '<p class="note">No items.</p>'; return; }
    if (st.i >= items.length) { P.out.innerHTML = '<p><b>' + st.ok + ' of ' + items.length + '</b> on the first try. Press Reset to go again.</p>'; P.notice(''); return; }
    var it = items[st.i];
    P.out.innerHTML = '<p class="num" style="color:var(--muted)">' + (st.i + 1) + ' of ' + items.length + '</p><p class="dq">' + it.s + '</p>' + it.o.map(function (o, j) { return '<button type="button" class="opt" data-j="' + j + '"><span class="k">' + 'ABCDE'[j] + '</span><span>' + o + '</span></button>'; }).join('') + '<div class="dfb"></div>';
    Array.prototype.forEach.call(P.out.querySelectorAll('.opt'), function (b) {
      b.onclick = function () {
        if (st.ans !== null) return; var j = +b.getAttribute('data-j'); st.ans = j; if (j === it.a) st.ok++;
        Array.prototype.forEach.call(P.out.querySelectorAll('.opt'), function (o, k) { if (k === it.a) o.classList.add('right'); else if (k === j) o.classList.add('wrong'); });
        P.out.querySelector('.dfb').innerHTML = '<div class="why"><b>' + (j === it.a ? 'Correct. ' : 'Not quite. ') + '</b>' + it.why + '</div><p style="margin-top:10px"><button type="button" class="btn pri">' + (st.i + 1 === items.length ? 'See score' : 'Next') + '</button></p>';
        P.out.querySelector('.dfb .btn').onclick = function () { st.i++; st.ans = null; P.draw(); };
        App.linkRules(P.out, true);
      };
    });
    App.linkRules(P.out, true);
  };
});
