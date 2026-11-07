# NDCT-Vax: regulating vaccine clinical development in India

A self-paced course for PhD scholars and early-career investigators on the regulatory pathway for vaccine clinical development in India, read from the **New Drugs and Clinical Trials Rules, 2019**. Ten modules, an orientation module and a capstone follow a fictional vaccine, VX-01, from the first conversation with the regulator to post-marketing reports. Course instructor: Dr Ramachandran Thiruvengadam, BRIC-THSTI.

Live site (once published): https://ramthiru83.github.io/ndct-vax/

## Sources
Primary instruments only.
- NDCT Rules, 2019 [G.S.R. 227(E)], CDSCO consolidated text as amended vide G.S.R. 778(E), 14-10-2022.
- G.S.R. 175(E), 9-3-2023 (First Schedule para 3(1)(b) substituted): applied.
- G.S.R. 364(E), 11-5-2023: **draft** CRO rules, shown as a draft.
- S.O. 553(E), 9-2-2022: COVID-19 stockpiling notification under section 26B.
- **Pending:** the order under rule 101 (countries), and any amendment after March 2023. Modules 4, 6, 8 and 10 carry a "Pending update" notice.

The verbatim text is in `content/rules_data.js`, generated from the PDFs: `pdftotext -layout` → `tools/parse_rules.py` → `tools/ndct.json` → `tools/emit_data.py`. Later instruments and the GSR 175(E) substitution were added to `tools/ndct.json` before emitting. Do not edit `rules_data.js` by hand.

## Repository layout
- `index.html`: the published page. `node build.js --site` rebuilds it from `src/` and `content/`; `node build.js --check` reports whether it is current.
- `src/`: the shared engine from CliPr and EpiCompass (accounts, progress sync, notes, instructor editing, dashboard, Niyam study assistant), plus `src/ndct.js` (Rule reader, Form navigator, "Read the rule" blocks, tap-a-rule popover) and `src/widgets_ndct.js` (regulatory clock, trial route finder, SAE pathway, Seventh Schedule calculator, PSUR calendar, waiver check, decision drills).
- `content/`: modules `m00` to `m10`, `cap`, and reference pages (`ref_glossary`, `ref_clock`, `ref_sources`).
- `ndv_schema.sql`, `supabase/ndv_niyam.sql`, `supabase/ndv_assistant.sql`: tables for the shared Supabase project (prefix `ndv_`), reusing `profiles`, `cohorts` and `is_instructor()` from EpiCompass.
- `supabase/functions/niyam/`: the Edge Function for Niyam on the course's Claude credit.

## Module format
Every module uses the case-led format of CliPr: Essentials, three cases (What you need, Read the rule, the situation, a tool, two tasks, a take-away), a quiz, worked answers in a separate step, and reference notes. Any "rule 22" in course text opens the verbatim rule.

## Working days
The Rules use "working days" without defining them. The tools count Monday to Friday, skip holidays the learner enters, and do not count the day of receipt. This is stated wherever a working-day clock is shown.

## Not legal advice
The course teaches how the Rules work. VX-01 and all cases are fictional.
