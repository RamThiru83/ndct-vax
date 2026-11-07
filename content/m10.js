App.DRILLS.m10 = [
  { s: 'During an outbreak, a Government medical college wants to import, for its patients, a vaccine approved in its country of origin but not permitted in India. Which route?', o: ['Form CT-18', 'Form CT-24 by a medical officer, certified by the head of the institution, for patients with life-threatening disease, serious permanent disability or unmet need', 'An academic trial', 'No permission is needed in an outbreak'], a: 1, why: 'Rule 86(1). The licence is in Form CT-25 (rule 87).' },
  { s: 'VX-02 is under Phase III in India. A doctor in a Government hospital prescribes it for a patient with a serious disease and no satisfactory therapy. Who applies to manufacture it for that patient, and after what?', o: ['The doctor, in Form CT-04', 'The manufacturer, in Form CT-26, after the patient\'s (or legal heirs\') written consent and the specific recommendation of the hospital\'s Ethics Committee', 'The patient', 'The CLA acts on its own motion'], a: 1, why: 'Rule 91(2), (3), (4). Permission is in Form CT-27 (rule 92).' },
  { s: 'Under a CT-27 permission, how much may be manufactured for one patient?', o: ['Unlimited', 'Not more than one hundred average dosages per patient, unless the CLA allows more in exceptional circumstances', 'One vial', 'Thirty days\' supply'], a: 1, why: 'Rule 92(2).' },
  { s: 'S.O. 553(E) of 9 February 2022 let a manufacturer of a COVID-19 new drug under clinical trial do what?', o: ['Sell it before approval', 'Obtain a licence to manufacture and stock it before CT-23, deferring the rule 81 prior permission; sale or distribution only after CT-23', 'Skip the clinical trial', 'Import it without a licence'], a: 1, why: 'S.O. 553(E), clauses (a) and (b), issued under section 26B of the Act for COVID-19.' },
  { s: 'Does S.O. 553(E) apply to any vaccine in any emergency?', o: ['Yes', 'No: by its terms it concerns new drugs for prevention and treatment of COVID-19 and associated infection', 'Only to vaccines', 'Only for imports'], a: 1, why: 'The notification recites the COVID-19 emergency and applies to "a new drug for COVID-19". It shows how section 26B can be used, but a new emergency would need its own notification.' }
];
registerModule({
  id: 'm10', num: 10, part: 'Licensure and beyond',
  title: 'Special and emergency pathways',
  book: 'Rules 59 to 66, 86 to 96; Second Schedule para 1(2)(ii); S.O. 553(E)',
  minutes: 90,
  pending: 'S.O. 553(E) (2022) is a COVID-19 notification under section 26B of the Drugs and Cosmetics Act. Whether it remains in operation should be checked before relying on it.',
  summary: 'Routes that bring an unapproved vaccine to patients outside the normal path: Government hospital imports, manufacture for named patients during trials, expedited review for disasters, and stockpiling under emergency notifications.',
  objectives: ['Apply Chapter XI to Government hospital import and named-patient manufacture', 'State the quantity, validity and reporting limits', 'Explain expedited review for disaster or defence use', 'Read S.O. 553(E) and explain what it changed and for whom'],
  format: 'cases',
  ruleRefs: [86, 87, 88, 91, 92, 93],
  reading: [],
  essentials: `
<ul>
<li><b>Government hospital import</b> (rules 86 to 90): a medical officer of a Government hospital or medical institution, certified by its head, may import a new drug approved in its country of origin but not permitted in India, for patients with a life-threatening disease, a disease causing serious permanent disability, or unmet medical need: Form <b>CT-24</b> → <b>CT-25</b>. Licence valid three years; half-yearly stock reports.</li>
<li><b>Named-patient manufacture during a trial</b> (rules 91 to 96): for a patient with a serious or life-threatening disease and no satisfactory therapy, a drug under trial in India may be made by the manufacturer, after the patient's consent and the EC's recommendation: Form <b>CT-26</b> → <b>CT-27</b>. At most one hundred average dosages per patient unless allowed; valid one year; SAEs reported within fifteen days.</li>
<li>Unapproved API for developing formulations (rules 59 to 66): Forms CT-12, CT-13 → CT-14, CT-15.</li>
<li><b>Expedited review</b> for disaster or defence use in extraordinary situations, when real-life trials may not be possible, is in Second Schedule para 1(2)(ii)(B)(ii); such approval can be used only once.</li>
<li><b>S.O. 553(E)</b> (9 February 2022), under section 26B of the Act: for COVID-19 new drugs under trial, the licence to manufacture and stock could be obtained before CT-23, deferring rule 81 permission; sale only after CT-23. It is specific to COVID-19.</li>
</ul>`,
  story: 'A severe outbreak of the fictional respiratory virus hits two states while VX-02 is in Phase III. Hospitals ask for access, and AVRI wants to build stock so that supply is ready if the vaccine is approved.',
  defs: {
    'section 26B': 'The emergency power in the Drugs and Cosmetics Act under which the Central Government may regulate manufacture, sale or distribution of a drug in public interest; used for S.O. 553(E).',
    'Form CT-24': 'Application by a Government hospital or medical institution to import an unapproved new drug for patients (rule 86).',
    'Form CT-26': 'Application by a manufacturer to make an unapproved new drug under clinical trial for a patient with a life-threatening disease (rule 91).'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Access through Government hospitals', aim: 'apply Chapter XI to outbreak requests.', minutes: 35,
      need: `<div data-rule="86,88,91,92,93"></div>`,
      scenario: '<p>A Government medical college wants a vaccine approved abroad for its ICU staff and patients. A district hospital wants VX-02 (in Phase III) for a high-risk patient.</p>',
      widgets: '<div data-widget="drill" data-set="m10"></div>',
      tasks: [0, 1],
      takeaway: 'Chapter XI routes are narrow: Government institutions, named patients, serious disease, quantity caps and reporting.'
    },
    {
      id: 'c2', title: 'Stockpiling before approval', aim: 'read S.O. 553(E) and explain its limits.', minutes: 30,
      need: `<div data-inst="so553"></div>`,
      scenario: '<p>AVRI asks whether it can manufacture and store VX-02 during Phase III so that supply is ready on approval.</p>',
      widgets: '',
      tasks: [2, 3],
      takeaway: 'Pre-approval stockpiling needed a specific emergency notification; S.O. 553(E) covered COVID-19 only, and sale still waited for CT-23.'
    },
    {
      id: 'c3', title: 'Expedited review in extraordinary situations', aim: 'apply the Second Schedule disaster and defence provision.', minutes: 25,
      need: `<div data-sched="second" data-find="(B) Situations where quick or expeditious review" data-n="11" data-label="expedited review"></div>`,
      scenario: '<p>A defence research laboratory has a countermeasure for an accidental biological exposure, with strong preclinical data but no human efficacy trial possible.</p>',
      widgets: '',
      tasks: [4, 5],
      takeaway: 'Expedited review for disaster or defence use is one-time and conditional; detailed efficacy data are needed before any further approval.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Chapter XI at a glance', html: '<table class="data"><tr><th></th><th>Government hospital import</th><th>Named-patient manufacture</th></tr><tr><td>Who applies</td><td>Medical officer, certified by the head (CT-24)</td><td>Manufacturer, after patient consent and EC recommendation (CT-26)</td></tr><tr><td>Product</td><td>Approved in country of origin, not permitted in India</td><td>Under clinical trial in India, not approved</td></tr><tr><td>Grant</td><td>CT-25 (rule 87)</td><td>CT-27 (rule 92)</td></tr><tr><td>Validity</td><td>3 years (rule 88(i))</td><td>1 year (rule 93(i))</td></tr><tr><td>Reports</td><td>Half-yearly stock report (rule 88(vi))</td><td>Half-yearly report; SAE within 15 days (rule 93(v), (ix))</td></tr></table>' }
  ],
  keyPoints: ['Rule 86: Government hospital import of an unapproved new drug for serious conditions, CT-24 → CT-25.', 'Rule 91: named-patient manufacture of a drug under trial, after consent and EC recommendation, CT-26 → CT-27; at most one hundred average dosages per patient.', 'Expedited review for disaster or defence use is one-time (Second Schedule).', 'S.O. 553(E): COVID-19 only; licence to manufacture and stock before CT-23, sale only after CT-23.'],
  quiz: [
    { q: 'Who may apply in Form CT-24?', options: ['Any doctor', 'A medical officer of a Government hospital or medical institution, certified by its head', 'A pharmaceutical importer', 'A patient'], answer: 1, why: 'Rule 86(1).' },
    { q: 'How long is a CT-27 permission valid?', options: ['One year', 'Two years', 'Three years', 'Until the trial ends'], answer: 0, why: 'Rule 93(i).' },
    { q: 'Under which section of the Act was S.O. 553(E) issued?', options: ['Section 12', 'Section 26B', 'Section 33', 'Section 18'], answer: 1, why: 'The notification cites section 26B.' },
    { q: 'Under S.O. 553(E), when could the stockpiled drug be sold?', options: ['Immediately', 'Only after permission in Form CT-23', 'After Phase II', 'After the EC agrees'], answer: 1, why: 'Clause (b).' }
  ],
  tasks: [
    { id: 't0', title: 'The ICU request', level: 'Apply', scenario: '<p>As in Case 1.</p>', questions: ['<b>(a)</b> Is CT-24 available for prevention in ICU staff?', '<b>(b)</b> What conditions follow a CT-25?'], answer: '<p><b>(a)</b> Rule 86 is for "treatment of a patient suffering from" a life-threatening disease, a disease causing serious permanent disability, or one requiring therapies for unmet medical needs. Preventive use in healthy staff does not fit its wording; that is a point to raise with the CLA. For patients it may apply. <b>(b)</b> Valid three years; half-yearly report on status and stock imported, used and destroyed; other conditions in rule 88.</p>' },
    { id: 't1', title: 'VX-02 for one patient', level: 'Apply', scenario: '<p>As in Case 1.</p>', questions: ['<b>(a)</b> List the steps in order.', '<b>(b)</b> What limits apply?'], answer: '<p><b>(a)</b> The Government hospital medical officer prescribes in special circumstances (rule 91(1)); the manufacturer obtains the patient\'s or legal heirs\' written consent and the specific recommendation of the hospital\'s EC (rule 91(2)); applies in CT-26 with the consent (rule 91(3), (4)); CLA grants CT-27 or rejects within ninety days (rule 92(1)); a licence under the 1945 Rules follows (rule 96). <b>(b)</b> Not more than one hundred average dosages per patient unless the CLA allows more (rule 92(2)); valid one year; half-yearly reports; SAEs within fifteen days (rule 93).</p>' },
    { id: 't2', title: 'Can AVRI stockpile VX-02?', level: 'Evaluate', scenario: '<p>As in Case 2.</p>', questions: ['<b>(a)</b> Does S.O. 553(E) help?', '<b>(b)</b> What would be needed?'], answer: '<p><b>(a)</b> No: it applies to new drugs for COVID-19. VX-02 targets a different virus. <b>(b)</b> A notification for the new emergency under the relevant power (S.O. 553(E) used section 26B), or production under existing permissions (for example CT-11 for trial supply, rule 55, which limits use to trials). Raise it with the CLA early.</p>' },
    { id: 't3', title: 'What S.O. 553(E) deferred', level: 'Analyse', scenario: '<p>Read the notification.</p>', questions: ['<b>(a)</b> Which NDCT requirement was deferred?', '<b>(b)</b> Which was not?'], answer: '<p><b>(a)</b> The prior permission from the CLA under rule 81 to manufacture the new drug, required before the rule 83 licence, was deferred; the licence to manufacture and stock could be granted with the CT-06 trial permission (clause (a) proviso). <b>(b)</b> The clinical trial permission (CT-06) and the CT-23 permission before sale or distribution (clause (b)).</p>' },
    { id: 't4', title: 'The defence countermeasure', level: 'Apply', scenario: '<p>As in Case 3.</p>', questions: ['<b>(a)</b> Which conditions apply?', '<b>(b)</b> Can it be approved repeatedly on this basis?'], answer: '<p><b>(a)</b> Second Schedule para 1(2)(ii)(B)(ii): preclinical data make a case for efficacy; no possibility of obtaining consent and following a protocol; no established management and a clear possible advantage. <b>(b)</b> No: such approval can be used only once; subsequent approval needs a detailed efficacy report.</p>' },
    { id: 't5', title: 'Which route?', level: 'Evaluate', scenario: '<p>Three requests: a Government hospital wants a foreign-approved vaccine for patients; a private clinic wants VX-02 for a VIP; an industry body wants VX-02 stockpiled.</p>', questions: ['<b>(a)</b> Match each to a route, or say none exists.'], answer: '<p>Government hospital: rule 86 (CT-24). Private clinic: Chapter XI applies to Government hospitals and institutions, so no route exists for it; trial enrolment or a Government hospital prescription under rule 91 are the lawful paths. Stockpiling: no general route in the Rules; S.O. 553(E) covered COVID-19 only.</p>' }
  ]
});
