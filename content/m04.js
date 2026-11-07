App.DRILLS.m04 = [
  { s: 'AVRI files Form CT-04 for VX-01 Phase I on 4 January 2027. VX-01 was discovered at AVRI. Within what period must the CLA dispose of a complete application?', o: ['Ninety working days (rule 22)', 'Thirty working days (rule 23)', 'Forty-five working days', 'Ninety days'], a: 1, why: 'Rule 23(1): where the drug is discovered in India, or R&D is in India and it is proposed to be manufactured and marketed in India, a complete application is disposed of (grant, rejection, or a deficiency communication) within thirty working days.' },
  { s: 'Thirty working days pass with no communication from the CLA. What may AVRI do?', o: ['Nothing; wait for the letter', 'Treat permission as deemed granted and, before starting, inform the CLA in Form CT-4A', 'Start without telling anyone', 'Appeal to the Central Government'], a: 1, why: 'Rule 23(1) proviso and rule 23(2). Form CT-4A is taken on record and called automatic approval.' },
  { s: 'The CLA writes on day 25 listing deficiencies. Is the thirty-day deemed approval still available?', o: ['Yes, the clock keeps running', 'No: the CLA has communicated within the period; the applicant rectifies the deficiencies within the period the CLA specifies', 'Yes, if the deficiencies are minor', 'Only if the EC has approved'], a: 1, why: 'Deemed approval arises only "where no communication has been received" within the period. A deficiency communication is one of the dispositions rule 23 allows; the rule 22(3) route for rectification then applies.' },
  { s: 'A foreign developer\'s vaccine is approved and marketed in a country specified under rule 101. Its Indian trial application is decided under which rule?', o: ['Rule 22 only', 'Rule 24: within ninety working days, with deemed approval and Form CT-06A', 'Rule 23', 'Rule 28'], a: 1, why: 'Rule 24, read with the 2022 proviso. Which countries are specified depends on an order under rule 101.' },
  { s: 'AVRI is funded by the Central Government. What fee is payable with Form CT-04?', o: ['The full fee in the Sixth Schedule', 'Half the fee', 'No fee', 'Only the pre-submission meeting fee'], a: 2, why: 'Rule 21(2) proviso: no fee is payable for a trial by a person of an institution or organisation funded or owned, wholly or partially, by the Central Government or a State Government.' },
  { s: 'The CLA rejects the application. Which options does rule 22 give?', o: ['Only a fresh application', 'Request reconsideration within sixty working days with the fee and documents, or appeal to the Central Government within forty-five days', 'Appeal to the High Court only', 'None'], a: 1, why: 'Rule 22(3) proviso (reconsideration within sixty working days of rejection) and rule 22(4) (appeal within forty-five days of receipt of the decision; disposal within sixty working days).' }
];
registerModule({
  id: 'm04', num: 4, part: 'Clinical development',
  title: 'Permission to conduct the trial',
  book: 'Rules 19 to 24, 98 to 101; Second and Sixth Schedules',
  minutes: 150,
  pending: 'Rule 24 and rule 101 depend on an order under rule 101 naming countries. That order is not part of the Rules and is not yet in the course\'s source set. Content on which countries qualify is therefore marked pending.',
  summary: 'How to apply for permission to run a VX-01 trial, which route and clock apply, what deemed approval means, and how to use pre- and post-submission meetings.',
  objectives: ['Prepare a Form CT-04 application with its Second Schedule contents', 'Choose between the routes in rules 22, 23 and 24', 'Run the clock, including deemed approval and the CT-4A or CT-06A intimation', 'Use reconsideration and appeal', 'Plan pre-submission and post-submission meetings'],
  format: 'cases',
  ruleRefs: [19, 21, 22, 23, 24, 98, 99, 100, 101],
  reading: [],
  essentials: `
<ul>
<li>No clinical trial of a new drug or IND without CLA permission and approval of the protocol by a rule 8 EC (rule 19(1)).</li>
<li>Apply in <b>Form CT-04</b> with the Second Schedule information and the Sixth Schedule fee; <b>no fee</b> for institutions funded or owned, wholly or partially, by the Central or a State Government (rule 21).</li>
<li><b>Three routes</b>: rule 22 (general: decision within ninety working days, deemed approval and Form CT-06A); rule 23 (discovered in India, or R&D in India and to be manufactured and marketed in India: disposal of a complete application within thirty working days, deemed approval and Form CT-4A); rule 24 (approved and marketed in a rule 101 country: ninety working days, deemed approval and Form CT-06A).</li>
<li>Deemed approval arises only if <b>no communication</b> is received within the period. A deficiency letter is a communication.</li>
<li>After rejection: reconsideration within sixty working days (rule 22(3) proviso) or appeal within forty-five days (rule 22(4)).</li>
<li>Talk to the regulator: a <b>pre-submission meeting</b> on request (rule 98) and a <b>post-submission meeting</b> requested within fifteen days of a query (rule 99). Expert committees advise within sixty days of reference (rule 100).</li>
<li>The permission is valid for two years from issue unless extended (rule 26).</li>
</ul>`,
  story: 'AVRI is ready to file for the VX-01 first-in-human study. It wants to know which route applies, how long the regulator has, what to do if the regulator is silent, and whether to ask for a meeting first.',
  defs: {
    'deemed approval': 'Permission treated as granted when the CLA does not communicate within the period set by the rule.',
    'automatic approval': 'The term rule 23(2) uses for the record created when the applicant files Form CT-4A after the thirty working days pass in silence.',
    'pre-submission meeting': 'A meeting with the CLA, on application with a fee, for guidance on the law and procedure before applying (rule 98).',
    'post-submission meeting': 'A meeting with a designated officer to clarify queries on a pending application, requested within fifteen days of the query (rule 99).'
  },
  explainers: [],
  cases: [
    {
      id: 'c1', title: 'Which route?', aim: 'decide between rules 22, 23 and 24 and work out the fee.', minutes: 45,
      need: `<p>Rule 21 is the application; rules 22 to 24 are the decision routes. Rule 23 is a "notwithstanding" route for products discovered in India, or researched and developed in India and proposed to be manufactured and marketed in India: a <b>complete</b> application is disposed of within thirty working days. Rule 24 is for new drugs already approved and marketed in a country specified under rule 101. Everything else follows rule 22.</p>
<div data-rule="19,21"></div>`,
      scenario: '<p>Three applications reach the CLA: VX-01 (discovered at AVRI); VX-02, licensed in from a foreign biotech, to be developed and made in India; and VX-03, a foreign vaccine already marketed in the country of origin.</p>',
      widgets: '<div data-widget="routeFinder"></div>',
      tasks: [0, 1],
      takeaway: 'The route depends on where the product was discovered or developed and where it will be made and marketed; the clock depends on the route.'
    },
    {
      id: 'c2', title: 'The clock and deemed approval', aim: 'compute deadlines and handle silence, deficiencies and rejection.', minutes: 55,
      need: `<p>The CLA may grant (Form CT-06), point out deficiencies to be rectified, or reject with reasons (rule 22(1)). After rectification, it decides within ninety days of receiving the documents (rule 22(3)(ii)). The 2022 amendment (G.S.R. 778(E)) added deemed approval to rules 22 and 24 with Form CT-06A; rule 23 already had automatic approval with Form CT-4A.</p>
<div data-rule="22,23,24"></div>`,
      scenario: '<p>AVRI files a complete CT-04 for VX-01 on Monday 4 January 2027. 26 January 2027 is a public holiday.</p>',
      widgets: '<div data-widget="regClock" data-set="r23"></div><div data-widget="drill" data-set="m04"></div>',
      tasks: [2, 3],
      takeaway: 'Count working days carefully, treat any communication as stopping deemed approval, and file the intimation form before starting on a deemed approval.'
    },
    {
      id: 'c3', title: 'Talking to the regulator', aim: 'plan pre-submission and post-submission meetings and understand expert committees.', minutes: 50,
      need: `<p>Rule 98 lets an intending applicant request a pre-submission meeting for guidance on law, procedure, manufacturing process and clinical trial requirements, with available Second Schedule documents and the Sixth Schedule fee. If the request is incomplete, the CLA may say so within thirty days. Rule 99 lets an applicant with a pending application request a post-submission meeting within fifteen days of receiving a query; a summary of the clarification is given. Rule 100 lets the CLA constitute expert committees, which recommend within sixty days of reference.</p>
<div data-rule="98,99,100,101"></div>`,
      scenario: '<p>AVRI is unsure whether its non-clinical package (Module 3) is enough and whether a combined Phase I/II design would be accepted. Later, after filing, it receives a query it does not understand.</p>',
      widgets: '',
      tasks: [4, 5],
      takeaway: 'Use rule 98 before filing to settle the evidence; use rule 99, within fifteen days of a query, to resolve it face to face.'
    }
  ],
  sections: [
    { id: 'n1', title: 'Fees (Sixth Schedule)', html: '<p>Rule 21(2) proviso: no fee for trials by persons of institutions funded or owned, wholly or partially, by the Central or a State Government. Sixth Schedule Note 1: no fee for clinical trial applications for orphan drugs (rule 2(1)(x)). Note 2: MSME applicants pay half the fee for clinical trials, new drug approval, and pre- and post-submission meetings. Check amounts in the Sixth Schedule in the Rule reader; the table layout in the extracted text may be imperfect.</p>' },
    { id: 'n2', title: 'Rule 101: countries', html: '<p>Rule 101 lets the CLA, with Central Government approval, specify countries by order, from time to time, for considering waiver of local clinical trial for approval of new drugs (Chapter X) and for permission to conduct clinical trials (Chapter V). The list is not in the Rules. <b>Pending:</b> obtain the current order from CDSCO before teaching which countries qualify.</p>' }
  ],
  keyPoints: ['Rule 19: CLA permission plus rule 8 EC approval before any trial.', 'Rule 21: Form CT-04, Second Schedule content, Sixth Schedule fee; no fee for Government-funded or owned institutions.', 'Rule 23: thirty working days for India-discovered or India-developed-and-made products; Form CT-4A on silence.', 'Rules 22 and 24: ninety working days; Form CT-06A on silence (since G.S.R. 778(E), 2022).', 'Any communication, including a deficiency letter, prevents deemed approval.', 'Rules 98 and 99: pre-submission meeting on request; post-submission meeting within fifteen days of a query.'],
  quiz: [
    { q: 'Which form is used to apply for permission to conduct a clinical trial?', options: ['CT-01', 'CT-04', 'CT-06', 'CT-10'], answer: 1, why: 'Rule 21(1).' },
    { q: 'What does Form CT-06A record?', options: ['EC registration', 'The applicant\'s information to initiate a trial on deemed approval under rules 22 or 24', 'Permission to manufacture', 'An appeal'], answer: 1, why: 'Rule 22(2A) and the proviso to rule 24, inserted by G.S.R. 778(E), 2022.' },
    { q: 'Rule 23\'s thirty working days apply to which applications?', options: ['All vaccine applications', 'Complete applications for drugs discovered in India, or researched and developed in India and to be manufactured and marketed in India', 'Applications from Government institutions', 'Phase I only'], answer: 1, why: 'Rule 23(1)(i) and (ii).' },
    { q: 'Within how long after a query must a post-submission meeting be requested?', options: ['Seven days', 'Fifteen days', 'Thirty days', 'Sixty days'], answer: 1, why: 'Rule 99(1).' },
    { q: 'How long is a CT-06 permission valid?', options: ['One year', 'Two years from issue, unless extended', 'Three years', 'Until the trial ends'], answer: 1, why: 'Rule 26.' },
    { q: 'Who decides which countries count under rule 101?', options: ['The Rules list them', 'The CLA, with Central Government approval, by order', 'ICMR', 'The World Health Organization'], answer: 1, why: 'Rule 101.' }
  ],
  tasks: [
    { id: 't0', title: 'Route three vaccines', level: 'Apply', scenario: '<p>VX-01, VX-02 and VX-03 as in Case 1.</p>', questions: ['<b>(a)</b> Which rule decides each application?', '<b>(b)</b> State the clock and the deemed-approval form for each.'], answer: '<p><b>(a)</b> VX-01: rule 23(1)(i), discovered in India. VX-02: rule 23(1)(ii) if R&D is being done in India <i>and</i> it is proposed to be manufactured and marketed in India; otherwise rule 22. VX-03: rule 24 if the country of origin is one specified under rule 101 (pending: check the order); otherwise rule 22. <b>(b)</b> Rule 23: thirty working days for a complete application, CT-4A. Rules 22 and 24: ninety working days, CT-06A.</p>' },
    { id: 't1', title: 'The fee', level: 'Apply', scenario: '<p>AVRI is an autonomous institute funded by the Central Government. A start-up partner registered as an MSME files separately for VX-02.</p>', questions: ['<b>(a)</b> What does AVRI pay?', '<b>(b)</b> What does the MSME pay?'], answer: '<p><b>(a)</b> Nothing: rule 21(2) proviso. <b>(b)</b> Half the Sixth Schedule fee (Sixth Schedule, Note 2), unless the product is an orphan drug, for which no clinical trial fee is chargeable (Note 1).</p>' },
    { id: 't2', title: 'Compute the deadline', level: 'Apply', scenario: '<p>Complete CT-04 received Monday 4 January 2027; holiday 26 January 2027.</p>', questions: ['<b>(a)</b> Use the regulatory clock: when do the thirty working days end?', '<b>(b)</b> If nothing has arrived by then, what exactly must AVRI do, and when?'], answer: '<p><b>(a)</b> Counting Monday to Friday from the day after receipt and skipping 26 January: Tuesday 16 February 2027. The Rules do not define working days, so state your counting convention. <b>(b)</b> Permission is deemed granted (rule 23(1) proviso). Before initiating the trial, inform the CLA in Form CT-4A, which becomes the record of automatic approval (rule 23(2)). EC approval at each site is still needed (rule 25(i)), and CTRI registration before the first enrolment (rule 25(v)).</p>' },
    { id: 't3', title: 'Deficiency, then rejection', level: 'Analyse', scenario: '<p>On day 25 the CLA asks for more stability data. AVRI replies; the CLA rejects the application.</p>', questions: ['<b>(a)</b> Is deemed approval available?', '<b>(b)</b> What are AVRI\'s options and time limits?'], answer: '<p><b>(a)</b> No: a communication was received within the period. After rectification, the CLA decides within ninety days of receiving the information (rule 22(3)(ii)). <b>(b)</b> Request reconsideration within sixty working days of rejection, with the fee and documents (rule 22(3) proviso), or appeal to the Central Government within forty-five days of receiving the decision; the Government disposes of the appeal within sixty working days (rule 22(4)).</p>' },
    { id: 't4', title: 'Prepare a pre-submission meeting', level: 'Create', scenario: '<p>AVRI\'s two uncertainties in Case 3.</p>', questions: ['<b>(a)</b> What does the request contain?', '<b>(b)</b> List three questions to put to the CLA.'], answer: '<p><b>(a)</b> A written application (rule 98(1)), with the Second Schedule documents available (non-clinical reports, quality data, draft protocol) and the Sixth Schedule fee (rule 98(2)). If incomplete, the CLA may say so within thirty days (rule 98(4)). <b>(b)</b> For example: Is the non-clinical package, including the cell-based and modelling data, sufficient for the proposed first-in-human dose? Is a seamless Phase I/II design acceptable, with what stopping rules? What immunogenicity endpoints and assay validation does the CLA expect for Phase II?</p>' },
    { id: 't5', title: 'A query you do not understand', level: 'Apply', scenario: '<p>A query arrives on 10 February 2027.</p>', questions: ['<b>(a)</b> By when must a post-submission meeting be requested?', '<b>(b)</b> What will AVRI receive?'], answer: '<p><b>(a)</b> Within fifteen days of receiving the query (rule 99(1)): by 25 February 2027, with the Sixth Schedule fee and a clear statement of the points needing clarification (rule 99(2), (4)). <b>(b)</b> A date and time for the meeting, and a summary of the clarification (rule 99(3)).</p>' }
  ]
});
