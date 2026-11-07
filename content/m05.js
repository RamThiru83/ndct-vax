App.DRILLS.m05 = [
  { s: 'AVRI will make VX-01 clinical lots in its own pilot plant. What NDCT permission is needed?', o: ['None; it is AVRI\'s own product', 'Permission to manufacture an IND for clinical trial: Form CT-10 → Form CT-11', 'Form CT-21 → CT-23', 'An import licence in Form CT-17'], a: 1, why: 'Rule 52(1): no person shall manufacture a new drug or IND for a clinical trial without the CLA\'s permission. Apply in Form CT-10 (rule 52(2)); permission in Form CT-11 (rule 53).' },
  { s: 'After CT-11 is granted, may AVRI start manufacturing at once?', o: ['Yes', 'It must also obtain a licence to manufacture under the Act and the Drugs and Cosmetics Rules, 1945, applying with the CT-11', 'Only after the trial permission', 'Only if the EC agrees'], a: 1, why: 'Rule 56: after permission under rule 53, apply for a manufacturing licence under the Act and the 1945 Rules, accompanied by the CT-11. The licence itself is an interface topic.' },
  { s: 'The adjuvant for VX-01 is imported from a foreign supplier for use only in the trial. What is needed?', o: ['Nothing; it is not the drug', 'A licence to import a new drug or substance relating thereto for clinical trial: Form CT-16 → Form CT-17', 'An import permission for sale, Form CT-18', 'A rule 101 waiver'], a: 1, why: 'Rule 67(1): no person shall import a new drug "or any substance relating thereto" for a clinical trial except under a CLA licence. Apply in Form CT-16; licence in Form CT-17 (rule 68).' },
  { s: 'How long does the CLA have to decide a CT-16 import application?', o: ['Thirty working days', 'Ninety working days', 'Ninety days', 'Forty-five working days'], a: 2, why: 'Rule 68(1)(i): within a period of ninety days. Unlike rule 53, the import clock is in days, not working days, and the consolidated text shows no deemed-approval proviso in rule 68.' },
  { s: '200 vials of VX-01 are left over at the end of Phase I. One sponsor staff member suggests giving them to a partner hospital for "compassionate" use. Is this permitted?', o: ['Yes, with EC approval', 'No: CT-11 drugs are only for the trial or testing; leftover, unused, damaged, expired or sub-standard drug is destroyed and the action recorded', 'Yes, if the patients consent', 'Only after two years'], a: 1, why: 'Rule 55(i): no part shall be sold or supplied to any other person or institution. Rule 55(iv): leftover or unused drug is destroyed and the action recorded.' }
];
registerModule({
  id: 'm05', num: 5, part: 'Clinical development',
  title: 'Making and moving the investigational vaccine',
  book: 'Rules 52 to 58, 67 to 73',
  minutes: 120,
  summary: 'The permissions needed to manufacture VX-01 trial lots in India or to import trial material, the conditions attached, labelling, and where the NDCT Rules hand over to the Drugs and Cosmetics Rules.',
  objectives: ['Identify when Form CT-10 / CT-11 and Form CT-16 / CT-17 are needed', 'Run the manufacturing and import clocks and know which has deemed approval', 'Apply the conditions on use, records and destruction', 'Label imported trial material as rule 73 requires', 'Recognise the hand-off to a licence under the Drugs and Cosmetics Rules, 1945'],
  format: 'cases',
  ruleRefs: [52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73],
  reading: [],
  essentials: `
<ul>
<li><b>Manufacture in India</b> of a new drug or IND for a clinical trial needs CLA permission: Form <b>CT-10</b> → Form <b>CT-11</b> (rules 52, 53). Decision within <b>ninety working days</b>; silence means deemed approval, recorded by filing <b>CT-11A</b> before manufacturing (rule 53, as amended in 2022).</li>
<li>CT-11 is valid three years, extendable by one year in exceptional circumstances (rule 54). It is followed by a <span class="iface">Interface</span> licence to manufacture under the Drugs and Cosmetics Rules, 1945 (rule 56).</li>
<li>Conditions (rule 55): use only for the trial or testing; small quantities, at the specified places, under Good Manufacturing Practices; records of manufacture and supply; destruction of leftover, unused, damaged, expired or sub-standard drug, with records.</li>
<li><b>Import</b> of a new drug or any related substance for a clinical trial needs a licence: Form <b>CT-16</b> → Form <b>CT-17</b> (rules 67, 68). Decision within <b>ninety days</b>. Valid three years (rule 69).</li>
<li>Import conditions (rule 70) mirror rule 55: GMP at manufacture, trial use only, records, destruction. Imported containers carry the labels in rule 73.</li>
<li>Both permissions allow inspection (rules 57, 71) and can be suspended or cancelled (rules 58, 72).</li>
</ul>`,
  story: 'AVRI will make VX-01 antigen in its own pilot plant, import a novel adjuvant from a foreign supplier, and buy a licensed comparator vaccine for the control arm. The supply plan must have the right permission for each item before the first participant is vaccinated.',
  defs: {
    'Form CT-10': 'Application for permission to manufacture a new drug or IND for a clinical trial, BA/BE study, or examination, test and analysis (rule 52).',
    'Form CT-11': 'The CLA\'s permission to manufacture for those purposes (rule 53); valid three years (rule 54).',
    'Form CT-16': 'Application for a licence to import a new drug or related substance for a clinical trial, BA/BE study, or examination, test and analysis (rule 67).',
    'Form CT-17': 'The import licence (rule 68); valid three years (rule 69).',
    'Good Manufacturing Practices': 'The manufacturing quality standards that rules 55 and 70 require; their content is outside the NDCT Rules.'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Making trial lots in India', aim: 'apply rules 52 to 58 to AVRI\'s pilot-plant lots.', minutes: 40,
      need: `<p>Manufacture for a trial is regulated separately from the trial itself. The CLA's permission (CT-11) is about the product and the place; the manufacturing licence under the 1945 Rules follows it. The CLA has ninety working days; G.S.R. 778(E) added deemed approval with Form CT-11A.</p>
<div data-rule="52,53,54,55,56"></div>`,
      scenario: '<p>AVRI files Form CT-10 on 1 February 2027. Phase I is planned to start on 1 June 2027.</p>',
      widgets: '<div data-widget="regClock" data-set="r53"></div>',
      tasks: [0, 1],
      takeaway: 'File CT-10 early: ninety working days for CT-11, then the licence under the 1945 Rules, all before the first dose.'
    },
    {
      id: 'c2', title: 'Importing trial material', aim: 'apply rules 67 to 73 to the imported adjuvant and comparator.', minutes: 40,
      need: `<p>Rule 67 covers "a new drug or any substance relating thereto", so imported components for a trial are within it. The import clock is ninety <b>days</b>. The licensee answers for the drug having been made under GMP (rule 70(i)) and keeps records of quantities imported, used and disposed of (rule 70(iii)).</p>
<div data-rule="67,68,69,70,73"></div>`,
      scenario: '<p>The adjuvant comes from a foreign supplier. The comparator is a vaccine already licensed and sold in India, bought from an Indian distributor.</p>',
      widgets: '<div data-widget="drill" data-set="m05"></div>',
      tasks: [2, 3],
      takeaway: 'Imported trial material needs a CT-17 on a ninety-day clock; a locally bought licensed comparator does not need an import licence, but its use in the trial is covered by the trial permission.'
    },
    {
      id: 'c3', title: 'Accountability, labels and inspection', aim: 'design drug accountability and labelling that would survive an inspection.', minutes: 40,
      need: `<p>The conditions in rules 55 and 70, the labelling in rule 73, and the inspection rules (57, 71) together demand a closed chain: what was made or imported, where it went, what was used, what was destroyed and why. Failure can lead to suspension or cancellation (rules 58, 72).</p>
<div data-rule="57,58,71,72"></div>`,
      scenario: '<p>An inspector visits AVRI\'s pilot plant and Site B. At Site B, the pharmacist cannot reconcile 40 vials of adjuvant, and some imported cartons carry only the supplier\'s label.</p>',
      widgets: '',
      tasks: [4, 5],
      takeaway: 'Keep a complete record from manufacture or import to use or destruction, and label imported trial material exactly as rule 73 requires.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Manufacture and import compared', html: '<table class="data"><tr><th></th><th>Manufacture for trial</th><th>Import for trial</th></tr><tr><td>Application</td><td>CT-10 (rule 52)</td><td>CT-16 (rule 67)</td></tr><tr><td>Grant</td><td>CT-11 (rule 53)</td><td>CT-17 (rule 68)</td></tr><tr><td>Clock</td><td>90 working days; deemed approval, CT-11A</td><td>90 days</td></tr><tr><td>Reconsideration</td><td>60 working days</td><td>60 days</td></tr><tr><td>Appeal</td><td>45 days</td><td>60 days</td></tr><tr><td>Validity</td><td>3 years (+1 in exceptional cases)</td><td>3 years</td></tr><tr><td>Conditions</td><td>Rule 55</td><td>Rule 70</td></tr><tr><td>Then</td><td>Licence under the 1945 Rules (rule 56)</td><td>Labelling (rule 73)</td></tr></table>' },
    { id: 'n2', title: 'Interface: manufacturing licence and GMP', html: '<p><span class="iface">Interface</span> Rule 56 requires a licence under the Act and the Drugs and Cosmetics Rules, 1945 after CT-11. Rules 55(ii) and 70(i) require Good Manufacturing Practices. The content of the licence and GMP requirements (including vaccine-specific requirements) is in the 1945 Rules and is not taught from the NDCT text.</p>' }
  ],
  keyPoints: ['Manufacture of an IND for a trial: CT-10 → CT-11 in ninety working days, deemed approval via CT-11A.', 'Then a licence under the 1945 Rules (rule 56).', 'Import of a new drug or related substance for a trial: CT-16 → CT-17 in ninety days.', 'Trial drug may not be sold or supplied elsewhere; leftovers are destroyed and recorded (rules 55, 70).', 'Imported trial material is labelled as rule 73 requires.'],
  quiz: [
    { q: 'Which form grants permission to manufacture an IND for a clinical trial?', options: ['CT-06', 'CT-11', 'CT-17', 'CT-23'], answer: 1, why: 'Rule 53.' },
    { q: 'The import licence clock under rule 68 is:', options: ['Ninety working days', 'Ninety days', 'Thirty working days', 'Sixty days'], answer: 1, why: 'Rule 68(1)(i) and (iii) say "ninety days".' },
    { q: 'How long is CT-11 valid?', options: ['Two years', 'Three years, extendable by one year in exceptional circumstances', 'Five years', 'Until the trial ends'], answer: 1, why: 'Rule 54.' },
    { q: 'What must happen to expired trial drug?', options: ['Return to the supplier', 'Destroy it and record the action', 'Donate it', 'Store it for five years'], answer: 1, why: 'Rules 55(iv) and 70(iv).' },
    { q: 'Which is NOT required on the label of imported trial material?', options: ['Name or code number', 'Batch or lot number', 'Name of the trial site institution', 'The maximum retail price'], answer: 3, why: 'Rule 73(1) lists name or code, batch or lot number, date of manufacture, use-before date, storage, the institution where the trial will be conducted, manufacturer\'s name and address, and purpose of import. Retail price is not listed.' }
  ],
  tasks: [
    { id: 't0', title: 'Will the lots be ready?', level: 'Apply', scenario: '<p>CT-10 filed 1 February 2027; Phase I planned for 1 June 2027.</p>', questions: ['<b>(a)</b> When do the ninety working days end?', '<b>(b)</b> What else must happen before vials can be released to the site?'], answer: '<p><b>(a)</b> Using the regulatory clock with no holidays entered: Monday 7 June 2027, after the planned start. With public holidays it is later. <b>(b)</b> The manufacturing licence under the 1945 Rules (rule 56), manufacture under GMP (rule 55(ii)), and the trial\'s own permission (CT-06 or CT-4A) and EC approvals. The plan should move the start date or file CT-10 earlier; a pre-submission meeting (rule 98) could clarify expectations on quality data.</p>' },
    { id: 't1', title: 'Silence on CT-10', level: 'Apply', scenario: '<p>No communication from the CLA within ninety working days.</p>', questions: ['<b>(a)</b> What may AVRI do?', '<b>(b)</b> Does deemed approval remove the need for the 1945 Rules licence?'], answer: '<p><b>(a)</b> Treat the permission as deemed granted and inform the CLA in Form CT-11A before manufacturing (rule 53(1) and (2) provisos, rule 53(2A)). <b>(b)</b> No. Rule 56 requires an application for a licence under the Act and the 1945 Rules, accompanied by the permission; with a deemed approval, the CT-11A record is what AVRI has. How the licensing authority treats it is an interface question.</p>' },
    { id: 't2', title: 'Adjuvant and comparator', level: 'Analyse', scenario: '<p>As in Case 2.</p>', questions: ['<b>(a)</b> Which needs a CT-17?', '<b>(b)</b> When must CT-16 be filed for a 1 June start?'], answer: '<p><b>(a)</b> The imported adjuvant ("any substance relating thereto", rule 67(1)). The comparator, licensed and bought in India, is not imported by AVRI, so rule 67 does not apply; its use is covered by the trial protocol and permission. <b>(b)</b> At least ninety days before it is needed, plus shipping and release time: in practice by early February 2027. There is no deemed approval for import in the consolidated text.</p>' },
    { id: 't3', title: 'A "spare" consignment', level: 'Evaluate', scenario: '<p>The supplier offers extra adjuvant free for AVRI\'s other research.</p>', questions: ['<b>(a)</b> Can it be imported under the VX-01 CT-17?', '<b>(b)</b> What records must AVRI keep?'], answer: '<p><b>(a)</b> Only for the purposes in the licence: clinical trial, BA/BE study, or examination, test and analysis (rule 70(ii)); it cannot be supplied to any other person, agency or institution. Other research use needs its own basis. <b>(b)</b> Quantity imported, used, disposed of, and related matters (rule 70(iii)); destruction of leftover, damaged, expired or sub-standard material with records (rule 70(iv)).</p>' },
    { id: 't4', title: 'Label check', level: 'Apply', scenario: '<p>Imported cartons with only the supplier\'s label.</p>', questions: ['<b>(a)</b> What must the label show?', '<b>(b)</b> May the site add or change labels?'], answer: '<p><b>(a)</b> Rule 73(1): name of the drug or code number, batch or lot number where applicable, date of manufacture, use-before date, storage conditions, name of the institution or centre where the trial is to be conducted, name and address of the manufacturer, and the purpose of import. If imported on behalf of another person, rule 73(2) adds importer and recipient details. <b>(b)</b> No one may alter, obliterate or deface any inscription or mark on an imported container, label or wrapper without the CLA\'s permission (rule 73(3)). The fix lies with the licensee at import.</p>' },
    { id: 't5', title: 'Forty missing vials', level: 'Evaluate', scenario: '<p>Reconciliation fails at Site B.</p>', questions: ['<b>(a)</b> Which conditions are at stake?', '<b>(b)</b> What can the CLA do?'], answer: '<p><b>(a)</b> Record-keeping and destruction conditions (rules 55(iii), (iv) for manufactured material; 70(iii), (iv) for imported adjuvant), and the bar on supply outside the trial (rules 55(i), 70(ii)). <b>(b)</b> After an opportunity to be heard, suspend or cancel the permission or licence (rules 58, 72); for the trial, action under rule 30 is also possible.</p>' }
  ]
});
