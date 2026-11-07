App.DRILLS.m08 = [
  { s: 'VX-01 has completed Phase I to III in India, and AVRI will manufacture it for sale. Which form, and is a fee payable?', o: ['Form CT-18, full fee', 'Form CT-21; no fee where the same applicant paid the fee for the Phase I to III trials under these Rules', 'Form CT-21, always free', 'Form CT-04 again'], a: 1, why: 'Rule 80(1) and its first proviso: no fee for an application to manufacture a new drug based on successful completion of Phase I to III in India under these Rules, where fee has already been paid by the same applicant for those trials. AVRI paid no trial fee (rule 21(2) proviso), so check the Sixth Schedule fee with that in mind.' },
  { s: 'VX-01 is an unapproved new molecule. What must the CT-21 include?', o: ['Only Phase III results', 'Data including results of local clinical trial as specified in the Second Schedule, with the data in Table 1 of the Second Schedule', 'Table 2 data only', 'No clinical data'], a: 1, why: 'Rule 80(2).' },
  { s: 'Within what period does the CLA decide on CT-21?', o: ['Thirty working days', 'Ninety working days', 'Ninety days', 'No time limit'], a: 1, why: 'Rule 81(1)(i), (ii). Permission is in Form CT-22 for an API or Form CT-23 for a formulation.' },
  { s: 'A foreign company seeks to import a vaccine approved and marketed in a rule 101 country with no major unexpected SAEs. It undertakes to do a Phase IV trial and there is no reason to expect a difference in the Indian population. What does rule 75(7) say?', o: ['A local clinical trial must always be done', 'The local clinical trial may not be required', 'The CLA must waive all clinical data', 'The import is automatically permitted'], a: 1, why: 'Rule 75(7)(i), (iii), (iv): "may not be required". "May" leaves the decision to the CLA.' },
  { s: 'The same company refuses to give the Phase IV undertaking, arguing that dengue is a disease of special relevance to India. What could happen?', o: ['The waiver applies anyway', 'The proviso to rule 75(7) lets the CLA relax "this condition" for such diseases; it is for the CLA to decide', 'The application must be rejected', 'The company may start marketing'], a: 1, why: 'Rule 75(7) proviso: the CLA may relax the condition where the drug is indicated in life-threatening or serious diseases, or diseases of special relevance to India, or for an unmet need such as XDR tuberculosis, hepatitis C, H1N1, dengue, malaria or HIV, or rare diseases, or an orphan drug.' },
  { s: 'Phase II of an epidemic vaccine shows remarkable efficacy at a defined dose for a serious, life-threatening disease with unmet need. Can marketing approval be based on Phase II?', o: ['Never', 'It may be considered by the CLA, with additional post-licensure studies as required', 'Only with a rule 101 waiver', 'Only after Phase IV'], a: 1, why: 'Second Schedule para 1(2)(ii)(A)(d).' }
];
registerModule({
  id: 'm08', num: 8, part: 'Licensure and beyond',
  title: 'Marketing authorisation',
  book: 'Rules 74 to 85, 101; Second Schedule para 1(2)',
  minutes: 120,
  pending: 'The waiver of local clinical trial depends on the countries specified by order under rule 101. That order is outside the Rules and is not yet in the course\'s source set; the country list is therefore pending.',
  summary: 'How VX-01 moves from successful trials to permission for sale: the manufacture and import routes, the data required, the local clinical trial and its waiver, and expedited pathways.',
  objectives: ['Choose between Forms CT-18 and CT-21 and the matching grant forms', 'Identify the data table in the Second Schedule for the application', 'Apply the local clinical trial waiver conditions in rules 75(7) and 80(7)', 'Describe accelerated approval and expedited review', 'State the conditions and responsibilities after permission'],
  format: 'cases',
  ruleRefs: [74, 75, 76, 77, 80, 81, 82, 83, 85, 101],
  reading: [],
  essentials: `
<ul>
<li>No import or manufacture of a new drug for sale except under the Rules (rule 74).</li>
<li><b>Manufacture</b> for sale: Form <b>CT-21</b> (rule 80) → Form <b>CT-22</b> (API) or <b>CT-23</b> (formulation) within <b>ninety working days</b> (rule 81); then a manufacturing licence under the 1945 Rules (rule 83, <span class="iface">Interface</span>).</li>
<li><b>Import</b> for sale: Form <b>CT-18</b> (rule 75) → <b>CT-19</b> (API) or <b>CT-20</b> (formulation) within ninety working days (rule 76); then an import licence under the 1945 Rules (rule 79).</li>
<li>An unapproved new molecule needs results of a <b>local clinical trial</b> and Table 1 data of the Second Schedule (rules 75(2), 80(2)).</li>
<li>The local clinical trial <b>may not be required</b> if the conditions of rule 75(7) or 80(7) are met, including approval and marketing in a country specified under rule 101 and a Phase IV undertaking. The CLA may relax a condition for serious diseases, diseases of special relevance to India, unmet needs, rare diseases or orphan drugs.</li>
<li>Second Schedule para 1(2)(ii): accelerated approval on surrogate endpoints, approval on remarkable Phase II efficacy, expedited review, and special provision for disaster or defence use.</li>
<li>After permission: approved specifications, labelling under the 1945 Rules, prescription warning, <b>PSURs</b> as per the Fifth Schedule, reporting of adverse reactions, no new claims without approval, approved cartons and inserts (rules 77, 82); market only for the approved indication (rule 85).</li>
</ul>`,
  story: 'VX-01\'s Phase III succeeded. AVRI will manufacture it at a new commercial facility. Meanwhile, a foreign company wants to import a competing vaccine approved abroad, without an Indian trial.',
  defs: {
    'local clinical trial': 'A clinical trial conducted in India to support permission for a new drug (rules 75, 80).',
    'Form CT-21': 'Application for permission to manufacture a new drug for sale or distribution (rule 80).',
    'Form CT-18': 'Application for permission to import a new drug for sale or distribution (rule 75).',
    'accelerated approval': 'Approval based on a surrogate endpoint reasonably likely to predict clinical benefit, with post-marketing trials to confirm it (Second Schedule para 1(2)(ii)(A)).'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'From Phase III to CT-23', aim: 'prepare the manufacture-for-sale application for an Indian vaccine.', minutes: 40,
      need: `<p>Rule 80 sets the data by category: Table 1 for an unapproved new molecule, Table 2 for a drug approved as a new drug in the country, Table 3 for new claims. Rule 81 is the decision. Rule 82 lists conditions; rule 83 sends the applicant to the 1945 Rules for the manufacturing licence.</p>
<div data-rule="80,81,82,83"></div>`,
      scenario: '<p>AVRI files Form CT-21 for VX-01 (formulation) on 1 March 2029, with Phase I to III data from India.</p>',
      widgets: '<div data-widget="regClock" data-set="r81"></div><div data-widget="drill" data-set="m08"></div>',
      tasks: [0, 1],
      takeaway: 'An Indian vaccine with Indian Phase I to III data goes CT-21 → CT-23 in ninety working days, then to a manufacturing licence under the 1945 Rules.'
    },
    {
      id: 'c2', title: 'The local clinical trial and its waiver', aim: 'apply rules 75(7) and 80(7) as written.', minutes: 45,
      need: `<p>The waiver conditions are almost the same in rules 75(7) (import) and 80(7) (manufacture), but the conjunctions differ. Rule 75(7) reads: (i) approved and marketed in a rule 101 country with no major unexpected SAEs, <i>or</i> (ii) a global trial ongoing in India and approval meanwhile in a rule 101 country; <i>and</i> (iii) no population difference; <i>and</i> (iv) Phase IV undertaking. Rule 80(7) reads: (i) <i>or</i> (ii) no population difference; <i>and</i> (iii) Phase IV undertaking. Read both. Data on animal toxicology, reproduction, teratogenicity, perinatal studies, mutagenicity and carcinogenicity may also be relaxed for drugs marketed abroad for some years (rules 75(8), 80(8)).</p>
<div data-rule="75,101"></div>`,
      scenario: '<p>The foreign company\'s vaccine is approved and marketed in its home country. It says no Indian trial is needed.</p>',
      widgets: '<div data-widget="waiverCheck"></div>',
      tasks: [2, 3],
      takeaway: 'The waiver is a "may", with cumulative conditions; which countries count depends on the rule 101 order.'
    },
    {
      id: 'c3', title: 'Faster routes and duties after approval', aim: 'apply accelerated approval and the post-approval conditions.', minutes: 35,
      need: `<p>Second Schedule para 1(2)(ii) offers routes for serious or life-threatening conditions, diseases of special relevance to India and unmet medical need: accelerated approval on surrogate endpoints with confirmatory post-marketing trials; approval on remarkable Phase II efficacy with post-licensure studies; expedited review. After any approval, rules 77 and 82 attach conditions, and rule 85 confines marketing to the approved indication.</p>
<div data-sched="second" data-find="(A) Accelerated Approval Process" data-n="18" data-label="accelerated approval and expedited review"></div>`,
      scenario: '<p>During an outbreak, a second AVRI candidate, VX-02, shows a strong neutralising antibody response in Phase II. AVRI asks whether it can be licensed on the antibody data.</p>',
      widgets: '',
      tasks: [4, 5],
      takeaway: 'Accelerated approval trades early access for confirmatory obligations; every approval carries post-marketing conditions.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Which table of the Second Schedule?', html: '<table class="data"><tr><th>Application</th><th>Table</th><th>Rules</th></tr><tr><td>Unapproved new molecule</td><td>Table 1, with local clinical trial results</td><td>75(2), 80(2)</td></tr><tr><td>Approved as a new drug in the country</td><td>Table 2</td><td>75(3), 80(3)</td></tr><tr><td>New claim, indication, dosage form, route or strength</td><td>Table 3, with local clinical trial results</td><td>75(4), 80(4)</td></tr><tr><td>Fixed-dose combination</td><td>Table 1, 2 or 3</td><td>75(5), 80(5)</td></tr><tr><td>Phytopharmaceutical</td><td>Table 4</td><td>75(6), 80(6)</td></tr></table>' },
    { id: 'n2', title: 'Interface: licences under the 1945 Rules', html: '<p><span class="iface">Interface</span> After CT-19 or CT-20, an import licence under the 1945 Rules (rule 79). After CT-22 or CT-23, a manufacturing licence under the 1945 Rules (rule 83). Vaccine lot release and other requirements under the 1945 Rules are outside the NDCT text.</p>' }
  ],
  keyPoints: ['Manufacture for sale: CT-21 → CT-22/CT-23 in ninety working days; import for sale: CT-18 → CT-19/CT-20 in ninety working days.', 'Unapproved new molecule: local clinical trial results plus Second Schedule Table 1.', 'Local clinical trial waiver: rules 75(7), 80(7); cumulative conditions; "may not be required"; rule 101 order needed.', 'Accelerated approval, Phase II-based approval and expedited review: Second Schedule para 1(2)(ii).', 'Conditions after permission include PSURs per the Fifth Schedule (rules 77(iv), 82(iv)).'],
  quiz: [
    { q: 'Which form grants permission to manufacture a new drug formulation for sale?', options: ['CT-11', 'CT-20', 'CT-22', 'CT-23'], answer: 3, why: 'Rule 81(1)(i): CT-22 for an API, CT-23 for a pharmaceutical formulation.' },
    { q: 'What does rule 75(7) require before a local clinical trial may be waived for an import?', options: ['Only approval in any foreign country', 'Approval and marketing in a rule 101 country (or the global-trial route), no population difference, and a Phase IV undertaking', 'A fee', 'An EC opinion'], answer: 1, why: 'Rule 75(7)(i) or (ii), and (iii), and (iv).' },
    { q: 'Accelerated approval on a surrogate endpoint requires what afterwards?', options: ['Nothing', 'Post-marketing trials to validate the anticipated clinical benefit', 'A new CT-04', 'A rule 101 order'], answer: 1, why: 'Second Schedule para 1(2)(ii)(A)(b).' },
    { q: 'Rule 85 makes the importer or manufacturer responsible for:', options: ['All off-label use', 'Marketing only for the approved indication and dosage form', 'Clinical trials abroad', 'EC registration'], answer: 1, why: 'Rule 85; the proviso protects a manufacturer that proves it did not promote off-label use.' },
    { q: 'Which provision requires PSURs after permission to manufacture for sale?', options: ['Rule 25(viii)', 'Rule 82(iv), with the Fifth Schedule', 'Rule 42', 'Rule 99'], answer: 1, why: 'Rule 82(iv) (and rule 77(iv) for imports).' }
  ],
  tasks: [
    { id: 't0', title: 'Assemble the CT-21', level: 'Apply', scenario: '<p>VX-01 as in Case 1.</p>', questions: ['<b>(a)</b> Which sub-rule and Second Schedule table apply?', '<b>(b)</b> By when should AVRI expect a decision?'], answer: '<p><b>(a)</b> Rule 80(2): an unapproved new molecule; data including results of local clinical trial as in the Second Schedule, with Table 1 data. <b>(b)</b> Within ninety working days of receipt (rule 81(1)): Thursday 5 July 2029 with no holidays entered (use the clock, adding public holidays). If deficiencies are notified, they are rectified within the period the CLA specifies and the CLA decides within ninety working days of receiving the information (rule 81(2)).</p>' },
    { id: 't1', title: 'After CT-23', level: 'Understand', scenario: '<p>Permission is granted in CT-23.</p>', questions: ['<b>(a)</b> What licence comes next?', '<b>(b)</b> List four conditions in rule 82.'], answer: '<p><b>(a)</b> A licence to manufacture for sale under the Drugs and Cosmetics Rules, 1945, applied for with the CT-23 (rule 83). <b>(b)</b> For example: conform to approved specifications; labelling per the 1945 Rules; prescription warning in a box with red background; PSURs per the Fifth Schedule; report serious unexpected adverse reactions; no new claims without approval; approved carton, label and insert before marketing; continue stability studies if shelf-life is not covered.</p>' },
    { id: 't2', title: 'Test the waiver claim', level: 'Evaluate', scenario: '<p>The foreign company\'s claim in Case 2.</p>', questions: ['<b>(a)</b> Which facts must it establish?', '<b>(b)</b> What can you not decide from the Rules alone?'], answer: '<p><b>(a)</b> Approval and marketing in a country specified under rule 101 with no major unexpected SAEs (or the global-trial route in 75(7)(ii)); no probability or evidence of a difference in the Indian population affecting pharmacokinetics, pharmacodynamics, safety or efficacy; and a written Phase IV undertaking. <b>(b)</b> Whether its home country is specified under rule 101: that depends on the CLA\'s order, which is pending in this course. Even if all conditions are met, the trial "may not be required": the CLA decides.</p>' },
    { id: 't3', title: 'Two rules, two readings', level: 'Analyse', scenario: '<p>Compare rules 75(7) and 80(7).</p>', questions: ['<b>(a)</b> What is different?', '<b>(b)</b> How should a careful applicant handle it?'], answer: '<p><b>(a)</b> Rule 75(7) has four clauses: (i) or (ii), and (iii), and (iv). Rule 80(7) has three: (i) or (ii), and (iii), where (ii) is the population-difference condition. Read literally, rule 80(7) could be met by no population difference plus the undertaking, without approval in a rule 101 country. <b>(b)</b> Do not rely on a literal reading of a drafting difference. Show all conditions, and raise the point at a pre-submission meeting (rule 98).</p>' },
    { id: 't4', title: 'Licensing on antibody data', level: 'Evaluate', scenario: '<p>VX-02 in an outbreak, as in Case 3.</p>', questions: ['<b>(a)</b> Which route in the Second Schedule fits?', '<b>(b)</b> What obligations follow?'], answer: '<p><b>(a)</b> Accelerated approval: approval based on a surrogate endpoint reasonably likely to predict clinical benefit, for a serious or life-threatening condition or a disease of special relevance to India with unmet need (para 1(2)(ii)(A)(a), (c)). If remarkable efficacy is seen at a defined dose in Phase II, approval on Phase II data may be considered (para (A)(d)). <b>(b)</b> Post-marketing trials to validate the clinical benefit (para (A)(b)) or post-licensure studies on a larger population per a CLA-approved protocol (para (A)(d)), plus the usual conditions and PSURs.</p>' },
    { id: 't5', title: 'Off-label promotion', level: 'Apply', scenario: '<p>VX-01 is approved for children aged 2 to 5. Sales staff promote it for adults.</p>', questions: ['<b>(a)</b> Which rules are breached?', '<b>(b)</b> When is the manufacturer protected?'], answer: '<p><b>(a)</b> Rule 85 (marketing only for the approved indication and dosage form) and rule 82(vi) (no claims beyond those approved without prior approval). <b>(b)</b> Under the proviso to rule 85, the manufacturer is not punished for consequences of use for another indication if it proves it was not involved in any manner in promoting that use.</p>' }
  ]
});
