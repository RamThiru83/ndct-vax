"""Parse pdftotext -layout output of the CDSCO consolidated NDCT Rules 2019 into structured JSON.
Usage: python3 parse_rules.py ndct.txt out.json"""
import re, sys, json
lines = open(sys.argv[1], encoding='utf-8').read().replace('\f', '').split('\n')
FOOT = 'Central Drugs Standard Control Organization'
def clean(seg):
    out = []
    pend = None
    for ln in seg:
        if FOOT in ln:
            while out and not out[-1].strip(): out.pop()
            continue
        s = ln.strip()
        if re.fullmatch(r'RULE \d+', s): continue
        if re.fullmatch(r'\d{1,2}', s) and int(s) <= 27:  # inline amendment footnote marker
            pend = s; continue
        if pend and s:
            ln = ' ' * (len(ln) - len(ln.lstrip())) + '⁣' + pend + '⁣' + s; pend = None
        out.append(ln)
    return out
NEWP = re.compile(r'^(⁣\d+⁣)?\[?\(?(\d+[A-Z]?|[ivxl]+|[a-z]{1,2}|[A-Z])\)\s|^(⁣\d+⁣)?(PROVIDED|Provided|Explanation|Explanation\.|Note)\b')
def paras(seg):
    ps, cur = [], []
    for ln in seg:
        s = ln.strip()
        if not s:
            if cur: ps.append(' '.join(cur)); cur = []
            continue
        if cur and re.match(r'^\u2063\d+\u2063\[', s):
            ps.append(' '.join(cur)); cur = []
        elif cur and NEWP.match(s) and re.search(r'[;:.——]\s*$|\band$|\bor$', cur[-1]):
            ps.append(' '.join(cur)); cur = []
        cur.append(s)
    if cur: ps.append(' '.join(cur))
    fix = lambda p: re.sub(r'⁣(\d+)⁣', r'<sup>\1</sup>', re.sub(r'\s+', ' ', p)).strip()
    return [fix(p) for p in ps]
# locate schedules
sch_names = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH']
sch_idx = {}
for i, ln in enumerate(lines):
    m = re.match(r'^\s*(FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH|SEVENTH|EIGHTH) SCHEDULE\s*$', ln)
    if m and m.group(1) not in sch_idx: sch_idx[m.group(1)] = i
first_sch = sch_idx['FIRST']
body = clean(lines[:first_sch])
# find chapters and rules sequentially
rules, chapters = [], []
expect, chap = 1, None
starts = []
i = 0
while i < len(body):
    s = body[i].strip()
    mc = re.match(r'^(?:\u2063\d+\u2063)?\[?CHAPTER ([IVX]+)\s*$', s)
    if mc:
        t = []; j = i + 1
        while j < len(body) and not body[j].strip(): j += 1
        while j < len(body) and body[j].strip() and not re.match(r'^\d+\.\s', body[j].strip()) and body[j].strip() != 'PART A':
            t.append(body[j].strip()); j += 1
        chap = {'num': mc.group(1), 'title': ' '.join(t).replace('  ', ' ')}
        chapters.append(chap); starts.append(('chap', i, chap)); i = j; continue
    mr = re.match(r'^(\d{1,3})\.\s+(.*)$', s)
    if mr and int(mr.group(1)) == expect and len(body[i]) - len(body[i].lstrip()) <= 4:
        starts.append(('rule', i, expect, chap)); expect += 1
    i += 1
assert expect == 108, expect
for k, st in enumerate(starts):
    if st[0] != 'rule': continue
    end = len(body)
    for st2 in starts[k + 1:]:
        end = st2[1]; break
    seg = body[st[1]:end]
    # strip PART headings at end of segment
    seg = [l for l in seg if l.strip() not in ('PART A', 'PART B', 'CLINICAL TRIAL', 'BIOAVAILABILITY AND BIOEQUIVALENCE STUDY') or True]
    ps = paras(seg)
    head = ps[0]
    m = re.match(r'^(\d+)\.\s+(.*)$', head)
    title = m.group(2).strip()
    rest = ps[1:]
    # rules 97 is a whole-sentence heading; keep as text
    rules.append({'n': st[2], 'title': title, 'chapter': st[3]['num'] if st[3] else '', 'paras': rest})
# drop trailing part headings that leaked into the previous rule
for r in rules:
    while r['paras'] and r['paras'][-1] in ('PART A', 'PART B', 'PART A CLINICAL TRIAL', 'PART B BIOAVAILABILITY AND BIOEQUIVALENCE STUDY'):
        r['paras'].pop()
# schedules (not the Eighth: forms)
schedules = []
order = [n for n in sch_names if n in sch_idx]
for a, b in zip(order, order[1:] + ['END']):
    if a == 'EIGHTH': break
    e = sch_idx[b] if b in sch_idx else len(lines)
    seg = clean(lines[sch_idx[a]:e])
    ps = paras(seg)
    schedules.append({'id': a.lower(), 'name': a.title() + ' Schedule', 'paras': ps[1:]})
# footnotes
ref_i = max(i for i, l in enumerate(lines) if l.strip() == 'REFERENCES')
notes = {}
cur = None
for ln in lines[ref_i + 1:]:
    if FOOT in ln: continue
    m = re.match(r'^\s*(\d+)\.\s+(.*)$', ln)
    if m: cur = m.group(1); notes[cur] = m.group(2).strip()
    elif cur and ln.strip(): notes[cur] += ' ' + ln.strip()
json.dump({'source': 'CDSCO consolidated text: The New Drugs and Clinical Trials Rules, 2019 [GSR 227(E), dt. 19-3-2019], as amended vide GSR 778(E) dated 14-10-2022',
           'chapters': chapters, 'rules': rules, 'schedules': schedules, 'footnotes': notes}, open(sys.argv[2], 'w'), ensure_ascii=False, indent=0)
print(len(rules), 'rules', len(chapters), 'chapters', len(schedules), 'schedules', len(notes), 'footnotes')
