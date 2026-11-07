App.DRILLS.m09 = [
  { s: 'VX-01 receives CT-23 on 15 April 2029. How often are PSURs due in the first two years?', o: ['Annually', 'Every six months', 'Quarterly', 'Only on request'], a: 1, why: 'Fifth Schedule para 5(C)(iii): every six months for the first two years after approval, then annually for the next two years.' },
  { s: 'The first six-month period ends on 14 October 2029. By when is that PSUR due?', o: ['14 October 2029', 'Within thirty calendar days of the last day of the reporting period', 'Within ninety working days', 'With the next annual report'], a: 1, why: 'Fifth Schedule para 5(C)(iii).' },
  { s: 'A serious unexpected adverse reaction is reported to AVRI on 2 November 2029. When must the CLA be told?', o: ['In the next PSUR', 'Within fifteen days of initial receipt of the information', 'Within twenty-four hours', 'Within thirty working days'], a: 1, why: 'Fifth Schedule para 5(C)(iii): all cases involving serious unexpected adverse reactions are reported within fifteen days of initial receipt by the applicant.' },
  { s: 'Who must run AVRI\'s pharmacovigilance system?', o: ['Anyone in the sales team', 'Qualified and trained personnel, with a medical officer or pharmacist trained in ADR data as officer in charge', 'The EC', 'The CLA'], a: 1, why: 'Fifth Schedule para (3), (4).' },
  { s: 'In a Phase IV trial of VX-01, does Chapter VI compensation apply?', o: ['No, the vaccine is approved', 'Yes: ethical protections, including compensation for trial-related injury or death, apply', 'Only for deaths', 'Only if the CLA orders the trial'], a: 1, why: 'Fifth Schedule para 5(A): the ethical aspects for protection of trial subjects shall be followed as per the regulatory provisions, including compensation in case of clinical trial related injury or death.' }
];
registerModule({
  id: 'm09', num: 9, part: 'Licensure and beyond',
  title: 'Post-marketing obligations',
  book: 'Rules 77, 82; Fifth Schedule',
  minutes: 90,
  summary: 'What AVRI owes the regulator after VX-01 is licensed: a pharmacovigilance system, Phase IV and post-marketing studies, and periodic safety update reports on a fixed calendar.',
  objectives: ['Describe the pharmacovigilance system the Fifth Schedule requires', 'Distinguish Phase IV trials from observational post-marketing surveillance', 'Build the PSUR calendar and meet the fifteen-day expedited report', 'Outline the structure of a PSUR'],
  format: 'cases',
  ruleRefs: [77, 82],
  reading: [],
  essentials: `
<ul>
<li>Trials study few people under controlled conditions; real-world use reveals rarer events. Every importer or manufacturer of a new drug for sale must have a <b>pharmacovigilance system</b>, run by qualified people, with a medical officer or trained pharmacist in charge (Fifth Schedule paras (1) to (4)).</li>
<li>Post-marketing assessment takes three forms: <b>(A) Phase IV trials</b>, which are trials with full protections including compensation; <b>(B) post-marketing surveillance or observational studies</b> under a CLA-approved protocol; and <b>(C) periodic safety update reports</b>.</li>
<li><b>PSURs</b>: every six months for the first two years after approval, then annually for two years; due within <b>thirty calendar days</b> of the end of each period. The CLA may extend the total duration.</li>
<li>Serious unexpected adverse reactions: within <b>fifteen days</b> of initial receipt, whatever the PSUR cycle.</li>
<li>Rules 77(iv) and 82(iv) make PSURs a condition of permission; rules 77(v) and 82(v) require reporting of adverse reactions.</li>
<li>National AEFI surveillance under immunisation programmes is <span class="iface">Interface</span>.</li>
</ul>`,
  story: 'VX-01 is licensed on 15 April 2029 and enters a state immunisation programme. AVRI must set up pharmacovigilance, deliver its Phase IV commitment and meet the PSUR calendar.',
  defs: {
    'pharmacovigilance': 'The science and activities relating to detection, assessment, understanding and prevention of adverse effects or other drug-related problems (rule 2(1)(z)).',
    'PSUR': 'Periodic safety update report: a structured report of new safety information, related to patient exposure, submitted on the Fifth Schedule calendar.',
    'Phase IV': 'A trial performed after approval, related to the approved indication (First Schedule para 3(2)(d)).'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Building pharmacovigilance', aim: 'set up the system the Fifth Schedule requires.', minutes: 25,
      need: `<div data-sched="fifth" data-find="(1) When a new drug is approved" data-n="4" data-label="pharmacovigilance system"></div>`,
      scenario: '<p>AVRI is a research institute with no marketing arm. It plans to hand pharmacovigilance to the state programme.</p>',
      widgets: '<div data-widget="drill" data-set="m09"></div>',
      tasks: [0, 1],
      takeaway: 'The licence holder must own a pharmacovigilance system with qualified staff; it cannot be left entirely to the programme.'
    },
    {
      id: 'c2', title: 'Phase IV and surveillance studies', aim: 'design the post-marketing study package.', minutes: 30,
      need: `<div data-sched="fifth" data-find="(5) Post marketing assessment" data-n="7" data-label="Phase IV and observational studies"></div>`,
      scenario: '<p>The permission requires a Phase IV study of VX-01 safety in 30,000 children. AVRI also wants an observational study of effectiveness in routine use.</p>',
      widgets: '',
      tasks: [2, 3],
      takeaway: 'Phase IV studies are trials with full protections; observational surveillance needs a CLA-approved protocol.'
    },
    {
      id: 'c3', title: 'The PSUR calendar', aim: 'compute PSUR periods and due dates.', minutes: 35,
      need: `<div data-sched="fifth" data-find="(C) Post marketing surveillance through periodic" data-n="11" data-label="PSUR timing and structure"></div>`,
      scenario: '<p>Permission date 15 April 2029.</p>',
      widgets: '<div data-widget="psurCalendar"></div>',
      tasks: [4, 5],
      takeaway: 'Six-monthly for two years, annually for two more, each within thirty calendar days; serious unexpected reactions within fifteen days.'
    }
  ],
  sections: [
    { id: 'n1', title: 'PSUR structure (Fifth Schedule para 5(C)(v))', html: '<ol type="a"><li>Title page</li><li>Introduction</li><li>Current worldwide marketing authorisation status</li><li>Actions taken in the reporting interval for safety reasons</li><li>Changes to reference safety information</li><li>Estimated patient exposure (trials, India, rest of world)</li><li>Individual case histories and tabulations</li><li>Studies</li><li>Other information: signals, risk management plan</li><li>Overall safety evaluation</li><li>Conclusion</li></ol><p>Appendix: marketing authorisation, prescribing information, ICSR line listings.</p>' }
  ],
  keyPoints: ['Licence holders must run a pharmacovigilance system with qualified staff.', 'Post-marketing assessment: Phase IV trials, observational surveillance, PSURs.', 'PSURs every six months for two years, then annually for two; due within thirty calendar days.', 'Serious unexpected adverse reactions within fifteen days.', 'Phase IV participants have the same protections, including compensation.'],
  quiz: [
    { q: 'How long after approval do six-monthly PSURs continue?', options: ['One year', 'Two years', 'Four years', 'Until the CLA stops them'], answer: 1, why: 'Fifth Schedule: six-monthly for the first two years, then annually for two years.' },
    { q: 'A PSUR is due within:', options: ['Fifteen days', 'Thirty calendar days of the end of the reporting period', 'Ninety working days', 'Six months'], answer: 1, why: 'Fifth Schedule para 5(C)(iii).' },
    { q: 'Who may be the officer in charge of pharmacovigilance data?', options: ['A sales manager', 'A medical officer or a pharmacist trained in collection and analysis of ADR reports', 'Any graduate', 'The EC chair'], answer: 1, why: 'Fifth Schedule para (4).' },
    { q: 'In a Phase IV study, is the study drug normally free?', options: ['No', 'It may be provided free unless there is specific concern or justification, to the CLA\'s satisfaction', 'Only for children', 'Only in Government hospitals'], answer: 1, why: 'Fifth Schedule para 5(A).' }
  ],
  tasks: [
    { id: 't0', title: 'Can AVRI hand it over?', level: 'Evaluate', scenario: '<p>As in Case 1.</p>', questions: ['<b>(a)</b> What does the Fifth Schedule require of AVRI?', '<b>(b)</b> How can it work with the programme?'], answer: '<p><b>(a)</b> A person importing or manufacturing a new drug for sale must have a pharmacovigilance system for collecting, processing and forwarding adverse drug reaction reports to the CLA, managed by qualified and trained personnel, with a medical officer or pharmacist trained in ADR data in charge (paras (3), (4)). <b>(b)</b> It can draw on programme AEFI data (an interface), but its own system must receive, assess and forward reports and produce the PSURs. Responsibility stays with the licence holder.</p>' },
    { id: 't1', title: 'Write the PV job description', level: 'Create', scenario: '<p>AVRI is hiring.</p>', questions: ['<b>(a)</b> What qualification must the officer in charge have?', '<b>(b)</b> List three duties drawn from the Fifth Schedule.'], answer: '<p><b>(a)</b> A medical officer or a pharmacist trained in collection and analysis of ADR reports (para (4)). <b>(b)</b> Collect, process and forward ADR reports to the CLA; report serious unexpected reactions within fifteen days; prepare PSURs on schedule with exposure estimates, case histories, signal evaluation and risk management plan.</p>' },
    { id: 't2', title: 'Phase IV obligations', level: 'Apply', scenario: '<p>The 30,000-child Phase IV study.</p>', questions: ['<b>(a)</b> Which rules apply to its conduct?', '<b>(b)</b> Is the vaccine free to participants?'], answer: '<p><b>(a)</b> It is a clinical trial: CLA approval of design, EC approval, CTRI registration, consent and SAE reporting, and compensation under Chapter VI (Fifth Schedule para 5(A)). <b>(b)</b> The study drug may be provided free of cost unless there is a specific concern or justification, to the CLA\'s satisfaction (para 5(A)).</p>' },
    { id: 't3', title: 'Observational effectiveness study', level: 'Analyse', scenario: '<p>AVRI\'s proposed routine-use study.</p>', questions: ['<b>(a)</b> What category is it?', '<b>(b)</b> What approval does it need?'], answer: '<p><b>(a)</b> Post-marketing surveillance or an observational or non-interventional study for active surveillance (para 5(B)): the drug is used under approved conditions and inclusion follows the prescribing decision. <b>(b)</b> A protocol approved by the CLA with a scientific objective (para 5(B)). EC review follows the applicable framework.</p>' },
    { id: 't4', title: 'The PSUR calendar', level: 'Apply', scenario: '<p>Permission 15 April 2029.</p>', questions: ['<b>(a)</b> List the six PSUR periods and due dates.', '<b>(b)</b> Can the CLA ask for more?'], answer: '<p><b>(a)</b> From the PSUR tool: 15 Apr–14 Oct 2029, due 13 Nov 2029; 15 Oct 2029–14 Apr 2030, due 14 May 2030; 15 Apr–14 Oct 2030, due 13 Nov 2030; 15 Oct 2030–14 Apr 2031, due 14 May 2031; then annual: 15 Apr 2031–14 Apr 2032, due 14 May 2032; 15 Apr 2032–14 Apr 2033, due 14 May 2033. <b>(b)</b> Yes: the CLA may extend the total duration of PSUR submission in the interest of public health (para 5(C)(iii)).</p>' },
    { id: 't5', title: 'A signal between PSURs', level: 'Apply', scenario: '<p>On 2 November 2029, AVRI receives reports of an unexpected serious reaction.</p>', questions: ['<b>(a)</b> By when must the CLA be told?', '<b>(b)</b> Where does it appear later?'], answer: '<p><b>(a)</b> Within fifteen days of initial receipt: by 17 November 2029 (para 5(C)(iii)). <b>(b)</b> In the next PSUR: individual case histories, signal and risk evaluation, actions taken for safety reasons and any change to reference safety information.</p>' }
  ]
});
