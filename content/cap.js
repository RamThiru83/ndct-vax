registerModule({
  id: 'cap', num: 'Guided project', part: 'Capstone',
  title: 'The VX-01 regulatory roadmap',
  book: 'All chapters',
  minutes: 120,
  summary: 'Bring every module together: map VX-01 from pre-submission meeting to post-marketing reports, with each form, rule and clock, and defend your choices.',
  objectives: ['Sequence every regulatory step for an Indian vaccine', 'Assign the form, rule and clock to each step', 'Identify the interface steps outside the NDCT Rules', 'Find and fix errors in a draft roadmap'],
  format: 'cases',
  ruleRefs: [21, 22, 23, 25, 42, 52, 53, 67, 68, 80, 81, 82, 98, 99],
  reading: [],
  essentials: `
<ul>
<li>A regulatory roadmap is a sequence of decisions, each with an owner, a form, a rule and a clock.</li>
<li>Steps run in parallel: trial permission, manufacturing permission for trial lots, import of components, EC approvals and CTRI registration must all be in place before the first dose.</li>
<li>Some steps belong to other instruments (licences under the 1945 Rules, GMP, lot release, CTRI). Name them; do not invent their content.</li>
<li>Mark anything that depends on instruments not in your source set (the rule 101 order, draft CRO rules) as pending.</li>
</ul>`,
  story: 'You are AVRI\'s regulatory lead. The director wants a one-page roadmap for VX-01 from today to four years after licensure, and wants it checked against the Rules.',
  defs: {},
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Draft the roadmap', aim: 'produce a roadmap with forms, rules and clocks.', minutes: 60,
      need: `<p>Use the <a href="#forms">Form navigator</a>, the <a href="#clock">Timelines sheet</a> and the tools below. For each step write: what, who, form, rule, clock, depends on.</p>`,
      scenario: '<p>Assume: VX-01 discovered at AVRI (Central Government funded); antigen made in AVRI\'s pilot plant; adjuvant imported; three Indian sites; infants as the target; commercial manufacture at AVRI\'s new plant.</p>',
      widgets: '<div data-widget="regClock"></div><div data-widget="routeFinder"></div>',
      tasks: [0, 1],
      takeaway: 'A good roadmap shows the parallel tracks and the critical path to the first dose and to licensure.'
    },
    {
      id: 'c2', title: 'Audit a colleague\'s roadmap', aim: 'find and correct errors against the Rules.', minutes: 60,
      need: '<p>Read each line of the draft against the rule it cites. Check forms, clocks (working days or days), who files, and whether a step is NDCT or interface.</p>',
      scenario: `<p>A colleague's draft:</p><ol>
<li>File CT-04; CLA decides in 90 working days; if silent, start the trial at once.</li>
<li>Site B (60 km from Site A, no EC) uses Site A's EC.</li>
<li>Register on CTRI within 30 days of the first enrolment.</li>
<li>Import the adjuvant on CT-17; deemed approval if no reply in 90 working days.</li>
<li>Investigator reports SAEs within 14 days.</li>
<li>After Phase III, file CT-18 for sale.</li>
<li>PSURs annually for four years.</li></ol>`,
      widgets: '',
      tasks: [2, 3],
      takeaway: 'Most roadmap errors are wrong routes, wrong clocks, or treating a duty as optional.'
    }
  ],
  sections: [],
  keyPoints: ['Every step: owner, form, rule, clock, dependency.', 'Parallel tracks converge on the first dose.', 'Interface steps are named, not invented.', 'Pending items are flagged.'],
  quiz: [
    { q: 'Which must be in place before the first VX-01 dose in the trial?', options: ['CT-23', 'Trial permission (CT-06 or CT-4A record), site EC approval, CTRI registration, and lawful supply of trial material', 'PSUR plan', 'Rule 101 order'], answer: 1, why: 'Rules 19, 25(i), 25(v), 52 to 56, 67 to 70.' },
    { q: 'An Indian-discovered vaccine\'s trial application is complete. The CLA is silent for thirty working days. What next?', options: ['Wait', 'File CT-4A, then start (with EC approvals and CTRI)', 'Appeal', 'File CT-06A'], answer: 1, why: 'Rule 23(2).' },
    { q: 'Which step is an interface step?', options: ['CT-11 permission', 'Manufacturing licence under the 1945 Rules after CT-11 or CT-23', 'CT-4A', 'EC registration'], answer: 1, why: 'Rules 56 and 83 hand the licence to the 1945 Rules.' }
  ],
  tasks: [
    { id: 't0', title: 'The roadmap to the first dose', level: 'Create', scenario: '<p>Case 1 assumptions.</p>', questions: ['<b>(a)</b> List every step before the first Phase I dose, with form, rule and clock.', '<b>(b)</b> Which is the critical path?'], answer: '<p><b>(a)</b> Pre-submission meeting (rule 98; incomplete request flagged within thirty days). EC registration if needed (CT-01 → CT-02, 45 working days, rule 8). Trial application CT-04 (rule 21; no fee, Government funded) → rule 23 route, 30 working days; CT-4A on silence. Manufacture permission CT-10 → CT-11, 90 working days, CT-11A on silence (rules 52, 53); manufacturing licence under the 1945 Rules (rule 56, interface). Import of adjuvant CT-16 → CT-17, 90 days (rules 67, 68), labelled per rule 73. EC approval at each site (rule 25(i)); CLA informed within 15 working days (rule 25(iv)). CTRI registration before first enrolment (rule 25(v)). <b>(b)</b> Usually manufacture (CT-11 plus licence) or import (90 days), not the 30-working-day trial permission.</p>' },
    { id: 't1', title: 'From Phase III to year four', level: 'Create', scenario: '<p>Continue the roadmap.</p>', questions: ['<b>(a)</b> List the steps from Phase III to four years after licensure.'], answer: '<p>Phase II and III permissions in stages (Second Schedule para 1(1)(iv)(c)); infant studies after adult safety (First Schedule para 3(3)(B)). CT-21 with Table 1 data and local trial results (rule 80(2)) → CT-23 in 90 working days (rule 81); manufacturing licence under the 1945 Rules (rule 83, interface). Conditions of rule 82; Phase IV commitment; pharmacovigilance system; PSURs six-monthly for two years then annually for two, each within 30 calendar days; serious unexpected reactions within 15 days (Fifth Schedule).</p>' },
    { id: 't2', title: 'Correct lines 1 to 4', level: 'Evaluate', scenario: '<p>The colleague\'s draft.</p>', questions: ['<b>(a)</b> What is wrong with lines 1 to 4?'], answer: '<p>1: VX-01 is Indian-discovered, so rule 23 (30 working days) applies; on silence, file CT-4A before starting (not "start at once"). 2: Site A\'s EC can oversee Site B only within the same city or 50 km (rule 25(ii)); 60 km is too far. 3: CTRI registration is required before the first enrolment (rule 25(v)). 4: Import is CT-16 → CT-17 on a ninety-<b>day</b> clock (rule 68); the consolidated text has no deemed approval for import.</p>' },
    { id: 't3', title: 'Correct lines 5 to 7', level: 'Evaluate', scenario: '<p>The colleague\'s draft.</p>', questions: ['<b>(a)</b> What is wrong with lines 5 to 7?'], answer: '<p>5: The investigator reports within twenty-four hours (rule 42(1)); fourteen days is the analysed report (rule 25(x)). 6: AVRI manufactures in India, so CT-21 (rule 80), not CT-18 (import). 7: PSURs are six-monthly for the first two years, then annual for two (Fifth Schedule).</p>' }
  ]
});
