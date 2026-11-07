"""Write content/rules_data.js from tools/ndct.json."""
import json
d = json.load(open('tools/ndct.json'))
open('content/rules_data.js', 'w').write('/* Verbatim text of the New Drugs and Clinical Trials Rules, 2019: CDSCO consolidated copy, as amended vide GSR 778(E) dated 14-10-2022,\n   with the First Schedule substitution made by GSR 175(E) dated 9-3-2023, and the text of later instruments (App.NDCT.instruments).\n   Generated from the CDSCO and Gazette PDFs by tools/parse_rules.py and tools/emit_data.py. Do not edit by hand. */\nApp.NDCT = ' + json.dumps(d, ensure_ascii=False) + ';\n')
