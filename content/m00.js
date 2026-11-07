App.DRILLS.m00 = [
  { s: 'VX-01 needs a decision on whether its first-in-human trial may start. Who makes that decision under the Rules?', o: ['The State Licencing Authority of the state where the institute is located', 'The Central Licencing Authority, that is, the Drugs Controller, India', 'The institutional Ethics Committee alone', 'The Department of Health Research'], a: 1, why: 'Permission to conduct a clinical trial is granted by the Central Licencing Authority (rule 22). Rule 2(1)(i) defines the CLA as the Drugs Controller, India referred to in rule 3. The Ethics Committee must also approve the protocol (rule 19(1)(ii)), but it does not grant the permission.' },
  { s: 'A deficiency letter on the VX-01 application is signed by an Assistant Drugs Controller (India), not by the Drugs Controller, India. Can that be valid?', o: ['No: only the Drugs Controller, India can act', 'Yes, if powers were delegated by order with prior approval of the Central Government, to an officer not below that rank', 'Yes, any CDSCO officer can sign', 'Only if the State Licencing Authority countersigns'], a: 1, why: 'Rule 4(1) lets the Drugs Controller, India, with prior approval of the Central Government, delegate the powers of the CLA by written order to an officer not below the rank of Assistant Drugs Controller (India). That officer acts under the name and seal of the CLA (rule 4(2)).' },
  { s: 'A provision of another set of rules made under the Drugs and Cosmetics Act appears to conflict with the NDCT Rules on a clinical-trial matter. Which prevails?', o: ['The older rules, because they came first', 'Whichever is more protective of participants', 'The NDCT Rules', 'Neither; the Act must be amended first'], a: 2, why: 'Rule 106: if there is any inconsistency between these rules and any other rule made under the Act, the provisions of these rules prevail.' },
  { s: 'Which statement about the legal basis of the NDCT Rules is correct?', o: ['They are guidelines issued by ICMR', 'They are rules made by the Central Government under sections 12 and 33 of the Drugs and Cosmetics Act, 1940', 'They are an Act of Parliament', 'They are a CDSCO circular'], a: 1, why: 'The preamble records that the Central Government made the Rules in exercise of the powers conferred by sections 12 and 33 of the Drugs and Cosmetics Act, 1940, after consulting the Drugs Technical Advisory Board.' }
];
registerModule({
  id: 'm00', num: 0, part: 'Foundations',
  title: 'The regulatory architecture',
  book: 'Preamble; rules 1 to 5, 97, 106, 107',
  minutes: 90,
  summary: 'Where the NDCT Rules come from, who the regulator is, how the Rules are organised, and how to find any requirement in them.',
  objectives: ['State the legal basis of the NDCT Rules', 'Name the Central Licencing Authority and explain delegation', 'Navigate chapters, schedules and forms', 'Explain what rules 97, 106 and 107 do', 'Recognise where the Rules hand over to other instruments'],
  format: 'cases',
  ruleRefs: [1, 3, 4, 5, 97, 106, 107],
  reading: [{ cite: 'CDSCO. Acts and Rules: New Drugs (page listing the NDCT Rules and their amendments).', url: 'https://cdsco.gov.in/opencms/opencms/en/Acts-and-rules/New-Drugs/', note: 'The official source for the Rules and later notifications. Check it before relying on any provision.' }],
  essentials: `
<ul>
<li>The <b>New Drugs and Clinical Trials Rules, 2019</b> were made by the Central Government under sections 12 and 33 of the <b>Drugs and Cosmetics Act, 1940</b>, after consulting the Drugs Technical Advisory Board [G.S.R. 227(E), 19 March 2019].</li>
<li>The regulator is the <b>Central Licencing Authority</b> (CLA): the Drugs Controller, India (rule 3). Its powers may be delegated by written order to an officer not below the rank of Assistant Drugs Controller (India) (rule 4).</li>
<li>The Rules have thirteen chapters (rules 1 to 107), seven Schedules of requirements and an Eighth Schedule of forms. Chapters say <i>what</i> must happen and <i>when</i>; Schedules say <i>what goes in</i>; forms are the vehicles.</li>
<li>Rule 97 switched off Part XA and Schedule Y of the Drugs and Cosmetics Rules, 1945 for new drugs and investigational new drugs for human use. Rule 106 says the NDCT Rules prevail over any inconsistent rule under the Act. Rule 107 saves approvals already granted.</li>
<li>The Rules hand some matters to other instruments, for example licences under the Drugs and Cosmetics Rules, 1945 (rules 56, 79, 83) and the ICMR National Ethical Guidelines (rules 15 to 17, 28, 43). In this course these are <span class="iface">Interface</span> topics.</li>
<li>Read the rule, not a summary of it. Every provision quoted in this course can be opened by tapping a rule number such as rule 22.</li>
</ul>`,
  story: 'The Aravalli Vaccine Research Institute (AVRI), a fictional autonomous institute funded by the Central Government, has a recombinant protein subunit vaccine candidate, VX-01, against a fictional respiratory virus. The animal data look promising and the team wants to move into humans. In this module the team works out who regulates what, and how to read the Rules.',
  defs: {
    'Central Licencing Authority': 'The Drugs Controller, India, appointed by the Central Government; the regulator under the NDCT Rules (rules 2(1)(i) and 3).',
    'Schedule': 'A part annexed to the Rules that sets out detailed requirements, fees, formulae or forms.',
    'delegation': 'Handing the CLA\'s powers to another CDSCO officer by written order (rule 4).',
    'Drugs Technical Advisory Board': 'The statutory board under the Drugs and Cosmetics Act that the Government consults before making rules.'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Who decides?', aim: 'identify the regulator, the source of its power, and how its powers can be delegated.', minutes: 25,
      need: `<p>The Rules sit under an Act. The Act gives the Central Government power to make rules (sections 12 and 33), and the Rules create the authorities that apply them.</p>
<ul><li><b>Central Licencing Authority</b>: the Drugs Controller, India appointed by the Central Government (rule 3).</li>
<li><b>Delegation</b>: with the Central Government's prior approval, by written order, to an officer not below Assistant Drugs Controller (India), who then acts under the CLA's name and seal (rule 4).</li>
<li><b>Controlling Officer</b>: an officer designated to supervise subordinate officers (rule 5).</li>
<li><b>State Licencing Authority</b>: appointed by a State Government (rule 2(1)(ii)); it appears in the Rules mainly when accompanying inspections, for example under rules 25(xiii) and 29.</li></ul>
<div data-rule="3,4,5"></div>`,
      scenario: '<p>AVRI\'s director asks three questions: who will decide on the VX-01 trial, why a letter came from an officer other than the Drugs Controller, India, and whether the state drugs controller has a role.</p>',
      widgets: '<div data-widget="drill" data-set="m00"></div>',
      tasks: [0, 1],
      takeaway: 'Permissions under the NDCT Rules come from the Central Licencing Authority, which may act through delegated officers; State authorities appear mainly alongside inspections.'
    },
    {
      id: 'c2', title: 'Finding your way around the Rules', aim: 'use the structure of chapters, Schedules and forms to locate any requirement.', minutes: 35,
      need: `<p>The thirteen chapters follow the life of a product:</p>
<table class="data"><tr><th>Chapter</th><th>Subject</th><th>Rules</th></tr>
<tr><td>I, II</td><td>Preliminary; authorities and officers</td><td>1 to 5</td></tr>
<tr><td>III, IV</td><td>Ethics Committees: for clinical trials and BA/BE studies; for biomedical and health research</td><td>6 to 18</td></tr>
<tr><td>V</td><td>Clinical trials (Part A) and BA/BE studies (Part B)</td><td>19 to 38</td></tr>
<tr><td>VI</td><td>Compensation</td><td>39 to 43</td></tr>
<tr><td>VII</td><td>BA/BE study centres</td><td>44 to 51</td></tr>
<tr><td>VIII, IX</td><td>Manufacture and import of new drugs and INDs for trials and testing</td><td>52 to 73</td></tr>
<tr><td>X</td><td>Import or manufacture of new drugs for sale</td><td>74 to 85</td></tr>
<tr><td>XI</td><td>Unapproved new drugs for patients in Government hospitals and institutions</td><td>86 to 96</td></tr>
<tr><td>XII, XIII</td><td>Amendment of the 1945 Rules; miscellaneous (meetings, expert committees, rule 101 countries, fees, savings)</td><td>97 to 107</td></tr></table>
<p>The Schedules hold the detail: First (principles of clinical trials), Second (data for permissions), Third (conduct of trials, consent, SAE data), Fourth (BA/BE), Fifth (post-marketing), Sixth (fees), Seventh (compensation formulae), Eighth (forms).</p>
<p>A good habit: for any question, find the <b>chapter rule</b> that imposes the duty, then follow its cross-reference to the <b>Schedule</b> and the <b>form</b>. The <a href="#rules">Rule reader</a> and the <a href="#forms">Form navigator</a> are built for this.</p>`,
      scenario: '<p>A new research coordinator on the VX-01 team asks where to find (a) what the trial application must contain, (b) the fee, (c) the consent form checklist and (d) the formula for compensation.</p>',
      widgets: '',
      tasks: [2, 3],
      takeaway: 'Chapters impose duties and clocks; Schedules give the content; forms carry the application and the decision.'
    },
    {
      id: 'c3', title: 'Old rules, new rules, other rules', aim: 'explain the relationship of the NDCT Rules with the Drugs and Cosmetics Rules, 1945 and other instruments.', minutes: 30,
      need: `<p>Before 2019, clinical trials of new drugs were governed by Part XA and Schedule Y of the Drugs and Cosmetics Rules, 1945. Rule 97 inserted rule 122DAA in those Rules so that Part XA and Schedule Y no longer apply to new drugs and investigational new drugs for human use.</p>
<p>Three further provisions settle how the Rules sit with others:</p>
<ul><li><b>Rule 106</b>: where these rules are inconsistent with any other rule made under the Act, these rules prevail.</li>
<li><b>Rule 107</b>: approvals, permissions, licences and certificates already issued are saved.</li>
<li><b>Hand-offs</b>: some steps need a licence under the 1945 Rules after an NDCT permission (rules 56, 79, 83, 96). Ethics for biomedical and health research follow the ICMR National Ethical Guidelines (rules 15 to 17). Trials are registered with the Clinical Trial Registry of India (rule 25(v)) and run as per the Good Clinical Practices Guidelines (rule 25(vi)).</li></ul>
<div data-rule="97,106,107"></div>`,
      scenario: '<p>The AVRI quality manager has an old standard operating procedure that cites "Schedule Y" for the content of a trial application. She asks whether it still applies to VX-01, and which instrument governs the licence to manufacture trial lots.</p>',
      widgets: '',
      tasks: [4, 5],
      takeaway: 'For new drugs and INDs for human use, the NDCT Rules replace Part XA and Schedule Y, prevail over inconsistent rules, and hand some steps to other instruments that must be read in their own right.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Commencement and applicability', html: '<p>The Rules came into force on publication, 19 March 2019, except Chapter IV (Ethics Committees for biomedical and health research), effective from 15 September 2019, 180 days after publication (rule 1 and the amendment notes in the consolidated text).</p><div data-rule="1"></div>' },
    { id: 'n2', title: 'Interface instruments named by the Rules', html: '<ul><li>Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules, 1945: manufacturing and import licences, labelling (rules 56, 64, 77, 79, 82, 83, 96).</li><li>Good Clinical Practices Guidelines (rule 2(1)(p); rule 25(vi)).</li><li>National Ethical Guidelines for Biomedical and Health Research Involving Human Participants, ICMR (rules 15 to 17, 28(4), 43).</li><li>Clinical Trial Registry of India, maintained by ICMR (rule 25(v)).</li></ul><p>The course names these but does not teach their content.</p>' }
  ],
  keyPoints: ['The NDCT Rules were made under sections 12 and 33 of the Drugs and Cosmetics Act, 1940.', 'The Central Licencing Authority is the Drugs Controller, India; powers may be delegated under rule 4.', 'Chapters impose duties; Schedules specify content; the Eighth Schedule holds the forms.', 'Rule 97 disapplies Part XA and Schedule Y of the 1945 Rules for new drugs and INDs for human use.', 'Rule 106: the NDCT Rules prevail over inconsistent rules under the Act; rule 107 saves earlier approvals.'],
  quiz: [
    { q: 'Under which provisions were the NDCT Rules made?', options: ['Sections 12 and 33 of the Drugs and Cosmetics Act, 1940', 'The Clinical Establishments Act, 2010', 'The Indian Council of Medical Research Act', 'Section 26B of the Drugs and Cosmetics Act alone'], answer: 0, why: 'The preamble cites sections 12 and 33 of the Drugs and Cosmetics Act, 1940. Section 26B is an emergency power used for specific notifications, not the basis of the Rules.' },
    { q: 'Who is the Central Licencing Authority?', options: ['The Secretary, Department of Health Research', 'The Director General of ICMR', 'The Drugs Controller, India', 'The chair of the Drugs Technical Advisory Board'], answer: 2, why: 'Rule 3 and rule 2(1)(i): the Drugs Controller, India appointed by the Central Government.' },
    { q: 'Where would you find the checklist of essential elements of an informed consent document?', options: ['Second Schedule, Table 1', 'Third Schedule, Table 3', 'Fifth Schedule', 'Seventh Schedule'], answer: 1, why: 'Paragraph 2(f) of the Third Schedule points to Table 3 for the checklist and the format of the informed consent form.' },
    { q: 'What did rule 97 do?', options: ['Repealed the Drugs and Cosmetics Act', 'Inserted rule 122DAA into the 1945 Rules so that Part XA and Schedule Y do not apply to new drugs and INDs for human use', 'Created the Clinical Trial Registry of India', 'Set the fees for trials'], answer: 1, why: 'Chapter XII consists of rule 97, which inserts rule 122DAA into the Drugs and Cosmetics Rules, 1945.' },
    { q: 'If an NDCT provision and another rule under the Act are inconsistent, which applies?', options: ['The other rule', 'The NDCT provision (rule 106)', 'The stricter of the two', 'Neither until the CLA decides'], answer: 1, why: 'Rule 106 makes the NDCT Rules prevail in case of inconsistency.' }
  ],
  tasks: [
    { id: 't0', title: 'Map the authorities', level: 'Understand', scenario: '<p>Draw (in words) the chain from Parliament to the officer who signs a decision on the VX-01 trial.</p>', questions: ['<b>(a)</b> Name each link and the provision that creates it.', '<b>(b)</b> Where does the State Licencing Authority appear in the trial phase?'], answer: '<p><b>(a)</b> Parliament → Drugs and Cosmetics Act, 1940 → Central Government makes the NDCT Rules under sections 12 and 33 (preamble) → rule 3 names the Drugs Controller, India as the Central Licencing Authority → rule 4 allows delegation, with prior approval of the Central Government, to an officer not below Assistant Drugs Controller (India), acting under the CLA\'s name and seal → that officer may sign.</p><p><b>(b)</b> As an accompanying authority in inspections: officers of the State Licencing Authority may accompany CLA officers (rules 25(xiii) and 29). Later, licences under the 1945 Rules may involve State authorities (interface).</p>' },
    { id: 't1', title: 'Is the letter valid?', level: 'Apply', scenario: '<p>A query on the VX-01 file is signed by a Deputy Drugs Controller (India) "for Central Licencing Authority".</p>', questions: ['<b>(a)</b> What must be true for this to be a valid act of the CLA?', '<b>(b)</b> What would you ask if in doubt?'], answer: '<p><b>(a)</b> Under rule 4(1), the Drugs Controller, India must have delegated the relevant power by a written order, with prior approval of the Central Government, to an officer not below the rank of Assistant Drugs Controller (India). A Deputy Drugs Controller is above that rank. The officer then exercises the power under the CLA\'s name and seal (rule 4(2)).</p><p><b>(b)</b> Whether a delegation order covering this power exists. A rule 99 post-submission meeting can also be requested within fifteen days of the query to clarify it.</p>' },
    { id: 't2', title: 'Locate four requirements', level: 'Apply', scenario: '<p>Use the Rule reader and Form navigator.</p>', questions: ['<b>(a)</b> Where is the content of a clinical trial application specified?', '<b>(b)</b> Where is the fee?', '<b>(c)</b> Where is the informed consent checklist?', '<b>(d)</b> Where is the formula for compensation for a trial-related death?'], answer: '<p><b>(a)</b> Rule 21(2) requires Form CT-04 with the information and documents in the Second Schedule. <b>(b)</b> The Sixth Schedule (rule 21(2)), with no fee for trials by institutions funded or owned, wholly or partially, by the Central or a State Government. <b>(c)</b> Third Schedule, paragraph 2(f) and Table 3. <b>(d)</b> Seventh Schedule, paragraph 1 (rules 39, 40 and 42 refer to it).</p>' },
    { id: 't3', title: 'Duty, content, vehicle', level: 'Analyse', scenario: '<p>Take one requirement: reporting a serious adverse event.</p>', questions: ['<b>(a)</b> Which chapter rule imposes the duty and the clock?', '<b>(b)</b> Where is the content of the report specified?'], answer: '<p><b>(a)</b> Rule 42(1) (investigator, twenty-four hours) and rule 25(x) (analysed report within fourteen days), in Chapters VI and V. <b>(b)</b> Table 5 of the Third Schedule (data elements for reporting serious adverse events), referred to in rule 25(x).</p>' },
    { id: 't4', title: 'The old SOP', level: 'Evaluate', scenario: '<p>The SOP cites Schedule Y for the trial application.</p>', questions: ['<b>(a)</b> Does Schedule Y apply to VX-01?', '<b>(b)</b> What should the SOP cite instead?'], answer: '<p><b>(a)</b> No. Rule 97 inserted rule 122DAA into the 1945 Rules: Part XA and Schedule Y do not apply to new drugs and investigational new drugs for human use from the commencement of the NDCT Rules. VX-01 is a new drug (rule 2(1)(w)(v)). <b>(b)</b> Rules 19 to 30 (Chapter V, Part A), Form CT-04, and the First, Second and Third Schedules. Approvals granted earlier under the old rules are saved by rule 107.</p>' },
    { id: 't5', title: 'Which instrument for the trial lots?', level: 'Analyse', scenario: '<p>AVRI will make VX-01 clinical lots itself.</p>', questions: ['<b>(a)</b> Which NDCT permission is needed?', '<b>(b)</b> What follows it, and under which instrument?'], answer: '<p><b>(a)</b> Permission to manufacture an IND for clinical trial: application in Form CT-10 (rule 52), permission in Form CT-11 (rule 53). <b>(b)</b> A licence to manufacture under the Act and the Drugs and Cosmetics Rules, 1945, applied for with the CT-11 attached (rule 56). That licence is an interface topic; its requirements are in the 1945 Rules, not the NDCT Rules. Module 5 covers this.</p>' }
  ]
});
