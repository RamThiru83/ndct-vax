App.DRILLS.m07 = [
  { s: 'A 3-year-old in VX-01 Phase II has a febrile seizure 8 hours after vaccination and is admitted overnight. Within what time must the investigator report it, and to whom?', o: ['Fourteen days, to the CLA only', 'Twenty-four hours of occurrence, to the CLA, the sponsor and the EC that approved the protocol', 'Seven days, to the sponsor', 'At the next six-monthly report'], a: 1, why: 'Rule 42(1). Hospitalisation makes it an SAE (rule 2(1)(ff)). A late report must come with reasons for the delay.' },
  { s: 'Which of these would make an injury "trial related" under rule 41?', o: ['Any injury during the trial period, whatever the cause', 'An adverse effect of the investigational product, a protocol violation or negligence leading to the SAE, a trial procedure, or an effect on a child in utero from a parent\'s participation, among others', 'Only death', 'Only injuries the sponsor accepts'], a: 1, why: 'Rule 41 lists seven grounds, (a) to (g).' },
  { s: 'The child recovers fully after two days in hospital. Which Seventh Schedule formula applies if the CLA finds the SAE trial-related?', o: ['The death formula', 'The permanent disability formula', 'Compensation = 2 × W × N, linked to days of hospitalisation (reversible SAE that resolved)', 'No compensation; only medical management'], a: 2, why: 'Seventh Schedule para 2(iii), (iv): for life-threatening disease and reversible SAE that resolved, compensation is linked to days of hospitalisation, at double the minimum wage of an unskilled worker in Delhi per day.' },
  { s: 'Who pays for the child\'s medical management while it is unclear whether the seizure is related?', o: ['The family, until relatedness is decided', 'The sponsor, free, as long as the investigator thinks it is needed or until the injury is shown to be unrelated, whichever is earlier', 'The hospital', 'The EC'], a: 1, why: 'Rule 40(1). Financial compensation is in addition to medical management expenses (rule 39(3)).' },
  { s: 'A healthy 25-year-old volunteer in Phase I dies, and the CLA finds the death trial-related. What risk factor R does the Seventh Schedule assign?', o: ['0.5', '1.0', '2.0', '4.0'], a: 3, why: 'Seventh Schedule para 1: R = 4.0 for healthy volunteers or trial subjects of no risk.' }
];
registerModule({
  id: 'm07', num: 7, part: 'Clinical development',
  title: 'Safety reporting, medical management and compensation',
  book: 'Rules 39 to 43, 25(x) to 25(xii); Third Schedule Table 5; Seventh Schedule',
  minutes: 150,
  summary: 'What to report, to whom and how fast when something goes wrong in a vaccine trial; who pays for care; how relatedness is decided; and how compensation is calculated.',
  objectives: ['Classify an event and start the right reporting clock', 'Trace the death and injury pathways in rule 42 with every deadline', 'Apply the seven grounds of relatedness in rule 41', 'Explain free medical management (rule 40)', 'Calculate compensation with the Seventh Schedule formulae'],
  format: 'cases',
  ruleRefs: [39, 40, 41, 42, 43],
  reading: [],
  essentials: `
<ul>
<li><b>Investigator</b>: report every SAE to the CLA, the sponsor and the approving EC within <b>twenty-four hours</b> of occurrence; give reasons if late (rule 42(1)).</li>
<li><b>Analysed reports</b> within <b>fourteen days</b>: to the CLA, the EC chairperson and the institute (rule 25(x), Third Schedule Table 5); for a death, sponsor and investigator report within fourteen days of knowledge of occurrence (rule 42(2)(ii)).</li>
<li><b>EC</b>: its report and opinion on compensation within <b>thirty days</b> of receiving the report (rule 42(2)(iii), (3)(ii)).</li>
<li><b>Expert committee</b>: for deaths, always; for injuries, if the CLA chooses; recommends within <b>sixty days</b> (rule 42(2)(v), (3)(iii)).</li>
<li><b>CLA</b>: decides relatedness and quantum by order within <b>ninety days</b>; the sponsor pays within <b>thirty days</b> of the order (rule 42(2)(viii)–(ix), (3)(iv)–(v)) and reports details to the CLA within thirty working days (rule 25(xi), (xii)).</li>
<li>Relatedness: seven grounds in rule 41, including adverse effect of the product, protocol violation or negligence, trial procedures, and harm to a child in utero.</li>
<li>Free medical management by the sponsor (rule 40); compensation is <b>in addition</b> (rule 39(3)). The Seventh Schedule gives the formulae: death (B × F × R) / 99.37; disability; congenital anomaly; hospitalisation 2 × W × N.</li>
</ul>`,
  story: 'VX-01 Phase II is under way. A child has a febrile seizure and is hospitalised; later, in a separate study, a healthy adult volunteer dies of a cause that is at first unclear. The team must meet every reporting deadline and understand how compensation would be decided.',
  defs: {
    'expert committee': 'An independent committee constituted by the CLA to examine SAEs of death (and, if the CLA so decides, of injury) and recommend cause and compensation (rule 42).',
    'medical management': 'Treatment and other necessary activities for the injured subject, provided free by the sponsor (rule 40).',
    'base amount': 'B in the Seventh Schedule death formula: 8 lacs.',
    'risk factor': 'R in the Seventh Schedule: from 0.5 (terminally ill) to 4.0 (healthy volunteer), by the subject\'s condition at enrolment.'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'The first twenty-four hours, and the first fourteen days', aim: 'start the right clocks for an SAE in a vaccine trial.', minutes: 40,
      need: `<p>Two different duties run in parallel: the investigator's <b>immediate</b> report (twenty-four hours) and the <b>analysed</b> report (fourteen days). Table 5 of the Third Schedule lists the data elements. Medical management starts at once and is free (rule 40).</p>
<div data-rule="42"></div><div data-sched="third" data-find="TABLE 5" data-n="22" data-label="Table 5: data elements for reporting SAEs"></div>`,
      scenario: '<p>The febrile seizure occurs on Tuesday 2 March 2027 at 22:00. The site investigator learns of it the next morning and reports by email at 15:00 on 3 March.</p>',
      widgets: '<div data-widget="drill" data-set="m07"></div>',
      tasks: [0, 1],
      takeaway: 'Report within twenty-four hours, analyse within fourteen days, treat free from the start, and record everything Table 5 asks for.'
    },
    {
      id: 'c2', title: 'Relatedness and the decision pathway', aim: 'trace rule 42\'s pathway and apply rule 41.', minutes: 50,
      need: `<p>For a death, the pathway always goes through an independent expert committee. For permanent disability or other injury, the CLA decides, and may constitute an expert committee where it considers it necessary. In both, the CLA decides relatedness and quantum by order within ninety days of receiving the report. Rule 41 defines what counts as trial-related.</p>
<div data-rule="39,40,41"></div>`,
      scenario: '<p>In a separate VX-01 study, a healthy 25-year-old volunteer dies at home nine days after the second dose. The sponsor learns of it on day ten.</p>',
      widgets: '<div data-widget="saePathway"></div>',
      tasks: [2, 3],
      takeaway: 'Deaths go to an expert committee; the CLA decides relatedness on the rule 41 grounds and orders compensation within ninety days.'
    },
    {
      id: 'c3', title: 'Calculating compensation', aim: 'apply the Seventh Schedule formulae.', minutes: 45,
      need: `<p>The Seventh Schedule has four formulae. Death: compensation = (B × F × R) / 99.37, with B = 8 lacs, F from the age table (Annexure 1) and R from 0.5 to 4.0; a fixed 2 lacs where expected mortality was 90% or more within 30 days. Permanent disability: (C × D × 90) / (100 × 100), where C is the death amount and D the percentage disability. Congenital anomaly or birth defect: half the base amount, plus medical management for correctable deformity or permanent disability. Chronic life-threatening disease and resolved reversible SAE: 2 × W × N, with W the daily minimum wage of an unskilled worker in Delhi and N the days of hospitalisation.</p>
<div data-sched="seventh" data-find="FORMULAE" data-n="35" data-label="formulae and age factor table"></div>`,
      scenario: '<p>Compute illustrative compensation for the cases in this module, assuming the CLA finds each trial-related.</p>',
      widgets: '<div data-widget="compCalc"></div>',
      tasks: [4, 5],
      takeaway: 'Healthy volunteers carry the highest risk factor; for resolved hospitalisations, compensation tracks days in hospital at twice the minimum wage.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Death and injury pathways compared', html: '<table class="data"><tr><th>Step</th><th>Death (rule 42(2))</th><th>Disability or injury (rule 42(3))</th></tr><tr><td>Investigator report</td><td colspan="2">24 hours of occurrence, to CLA, sponsor, EC (42(1))</td></tr><tr><td>Sponsor and investigator analysed reports</td><td>14 days of knowledge of occurrence, to CLA and head of institution</td><td>14 days of reporting, to CLA, EC chair and head of institution</td></tr><tr><td>EC report with compensation opinion</td><td>30 days of receiving the investigator\'s report</td><td>30 days of receiving the report</td></tr><tr><td>Expert committee</td><td>Always; recommends within 60 days</td><td>If the CLA decides; within 60 days</td></tr><tr><td>CLA order</td><td>90 days of receipt of the report</td><td>90 days of receipt of the report</td></tr><tr><td>Payment</td><td colspan="2">30 days of receipt of the order</td></tr></table>' },
    { id: 'n2', title: 'Biomedical and health research', html: '<p>For research overseen by a Chapter IV committee, medical management and compensation follow the ICMR National Ethical Guidelines (rule 43). <span class="iface">Interface</span></p>' }
  ],
  keyPoints: ['Twenty-four hours (investigator report) and fourteen days (analysed report) are separate duties.', 'Deaths always go to an independent expert committee; injuries if the CLA decides.', 'The CLA orders relatedness and quantum within ninety days; payment within thirty days of the order.', 'Rule 41: seven grounds of relatedness, including harm to a child in utero.', 'Medical management is free and separate from compensation.', 'Seventh Schedule: death (B × F × R) / 99.37 with R = 4 for healthy volunteers; disability; congenital anomaly; 2 × W × N for hospitalisation.'],
  quiz: [
    { q: 'Within what time must the investigator report an SAE?', options: ['Twenty-four hours of occurrence', 'Fourteen days', 'Seven working days', 'Thirty days'], answer: 0, why: 'Rule 42(1).' },
    { q: 'Who must always examine an SAE of death?', options: ['The EC alone', 'An independent expert committee constituted by the CLA', 'The State Licencing Authority', 'The sponsor\'s safety board'], answer: 1, why: 'Rule 42(2)(i), (v).' },
    { q: 'Within how long must the CLA pass its order on compensation?', options: ['Thirty days', 'Sixty days', 'Ninety days of receipt of the report', 'One year'], answer: 2, why: 'Rule 42(2)(viii) and (3)(iv).' },
    { q: 'In the death formula, what is R for a healthy volunteer?', options: ['0.5', '1.0', '3.0', '4.0'], answer: 3, why: 'Seventh Schedule para 1, risk factor scale.' },
    { q: 'Is compensation in place of free medical management?', options: ['Yes', 'No, it is in addition to medical management expenses', 'Only for deaths', 'Only if the sponsor agrees'], answer: 1, why: 'Rule 39(3).' },
    { q: 'A baby is born with a birth defect after the mother took part in a trial. Under rule 41, can this be trial related?', options: ['No, the baby was not a trial subject', 'Yes: adverse effect on a child in utero because of a parent\'s participation is a listed ground', 'Only if the father took part', 'Only in Phase IV'], answer: 1, why: 'Rule 41(f). The Seventh Schedule para 2(ii) covers congenital anomaly or birth defect.' }
  ],
  tasks: [
    { id: 't0', title: 'Was the report on time?', level: 'Apply', scenario: '<p>Seizure at 22:00 on 2 March; report at 15:00 on 3 March.</p>', questions: ['<b>(a)</b> Was rule 42(1) met?', '<b>(b)</b> What would a late report require?'], answer: '<p><b>(a)</b> Yes: seventeen hours after occurrence, within twenty-four hours. The report must go to the CLA, the sponsor and the approving EC. <b>(b)</b> Reasons for the delay to the satisfaction of the CLA, along with the report (rule 42(1)).</p>' },
    { id: 't1', title: 'The fourteen-day report', level: 'Apply', scenario: '<p>Same event.</p>', questions: ['<b>(a)</b> By when is the analysed report due, and to whom?', '<b>(b)</b> Name four data elements it must contain.'], answer: '<p><b>(a)</b> Within fourteen days of occurrence: 16 March 2027, to the CLA, the EC chairperson and the institution (rule 25(x)). <b>(b)</b> From Table 5 of the Third Schedule, for example: patient details; the suspected drug (with dose, route and dates); other treatments; details of the SAE (description, criterion for seriousness, onset and stop dates, setting); outcome (and for a death, cause and any post-mortem findings); reporter details and the dates the event was reported to the CLA and the EC.</p>' },
    { id: 't2', title: 'Map the death pathway', level: 'Apply', scenario: '<p>Volunteer dies 2 March; sponsor and investigator know 3 March; the investigator\'s report reaches the EC and CLA on 3 March.</p>', questions: ['<b>(a)</b> Use the SAE pathway tool to list each deadline.', '<b>(b)</b> Who decides whether the death is related?'], answer: '<p><b>(a)</b> Investigator report by 3 March (24 hours); sponsor and investigator analysed reports by 17 March (14 days of knowledge); EC report and compensation opinion by 2 April (30 days of receiving the report); expert committee recommendation by 2 May (60 days); CLA order by 1 June (90 days); payment within 30 days of the order. <b>(b)</b> The CLA, considering the expert committee\'s recommendations (rule 42(2)(vii)).</p>' },
    { id: 't3', title: 'Is it related?', level: 'Evaluate', scenario: '<p>The autopsy is inconclusive. The protocol required a 30-minute observation after dosing, but the site observed for 10 minutes.</p>', questions: ['<b>(a)</b> Which grounds in rule 41 might apply?', '<b>(b)</b> What does this show about protocol adherence?'], answer: '<p><b>(a)</b> (a) adverse effect of the investigational product, if causally plausible; (b) violation of the approved protocol or negligence leading to the SAE, if the shortened observation contributed; (g) trial procedures leading to the SAE. The expert committee and CLA weigh these. <b>(b)</b> A protocol violation that leads to an SAE is itself a ground of relatedness, so deviations carry direct compensation consequences.</p>' },
    { id: 't4', title: 'Compute the death compensation', level: 'Apply', scenario: '<p>Healthy volunteer, age 25, death found trial-related.</p>', questions: ['<b>(a)</b> Compute with the compensation calculator and show the formula.', '<b>(b)</b> What would it be for a 60-year-old patient with moderate risk?'], answer: '<p><b>(a)</b> F (age 25) = 216.91, R = 4.0, B = 8,00,000. (8,00,000 × 216.91 × 4) / 99.37 = ₹69,85,126 (approximately ₹69.85 lakh). <b>(b)</b> F (age 60) = 117.41, R = 2.0: (8,00,000 × 117.41 × 2) / 99.37 = ₹18,90,470 (approximately ₹18.9 lakh). These are illustrations; the CLA decides by order.</p>' },
    { id: 't5', title: 'The seizure, if related', level: 'Apply', scenario: '<p>The child was in hospital for two days and recovered fully.</p>', questions: ['<b>(a)</b> Which formula applies?', '<b>(b)</b> What input do you need that the Rules do not give?'], answer: '<p><b>(a)</b> Reversible SAE that resolved: compensation = 2 × W × N, with N = 2 (Seventh Schedule para 2(iii), (iv)). Medical management is separately free (rule 40). <b>(b)</b> W, the minimum wage per day of an unskilled worker in Delhi; the Rules link to it but do not state it, so the current notified figure must be used.</p>' }
  ]
});
