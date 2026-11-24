"""Extract flashcards from IB_CS_HL_Flashcards.pdf into content/flashcards.js.

Usage: python3 tools/extract_flashcards.py <path-to-pdf>
Needs poppler's pdftotext. Relies on the PDF's layout: card header "#N Title",
answer text at the left margin, code indented, an "OUTPUT" label, then output.
"""
import html, json, os, re, subprocess, sys, tempfile

pdf = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tmp = tempfile.mkdtemp()
out_html = os.path.join(tmp, 'bbox.html')
subprocess.run(['pdftotext', '-bbox-layout', pdf, out_html], check=True)
doc = open(out_html, encoding='utf-8').read()

SECTIONS = []
pages = re.findall(r'<page [^>]*>(.*?)</page>', doc, re.S)

def page_lines(p):
    rows = []
    for m in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>', p, re.S):
        words = [(float(a), float(b), html.unescape(t)) for a, b, t in
                 re.findall(r'<word xMin="([\d.]+)" yMin="[\d.]+" xMax="([\d.]+)" yMax="[\d.]+">([^<]*)</word>', m.group(5))]
        rows.append({'x': float(m.group(1)), 'y': float(m.group(2)), 'x2': float(m.group(3)),
                     'h': float(m.group(4)) - float(m.group(2)), 'words': words})
    return rows

# Section names come from the contents page: "B2.1 Fundamentals (34 cards)"
contents = ' '.join(w[2] for r in page_lines(pages[0]) for w in r['words'])
for m in re.finditer(r'((?:B\d\.[\d.\-]+)\s+[A-Za-z ,\[\]]+?)\s*\((\d+) cards\)', contents):
    SECTIONS.append(m.group(1).strip())

# Monospace character width, measured from code words.
widths = []
for p in pages[1:4]:
    for r in page_lines(p):
        if abs(r['x'] - 62.5) < 1.5:
            for a, b, t in r['words']:
                if len(t) >= 4:
                    widths.append((b - a) / len(t))
CW = sorted(widths)[len(widths) // 2]

def mono_text(rows, base):
    """Rebuild monospace lines (merging same-y fragments) with column-accurate spacing."""
    rows = sorted(rows, key=lambda r: (round(r['y']), r['x']))
    lines, cur_y, cur = [], None, []
    for r in rows:
        y = round(r['y'])
        if cur_y is not None and abs(y - cur_y) > 2:
            lines.append(cur); cur = []
        cur_y = y
        cur.extend(r['words'])
    if cur:
        lines.append(cur)
    out = []
    for words in lines:
        s = ''
        for a, b, t in sorted(words):
            col = max(0, round((a - base) / CW))
            s = s + ' ' * max(1 if s else 0, col - len(s)) + t
        out.append(s.rstrip())
    return '\n'.join(out)

def prose(rows):
    """Join wrapped prose lines; keep real line breaks (short lines) and paragraphs."""
    parts, prev = [], None
    for r in rows:
        t = ' '.join(w[2] for w in r['words'])
        if prev is None:
            parts.append(t)
        else:
            gap = r['y'] - prev['y']
            if gap > prev['h'] * 1.7:
                parts.append('\n\n' + t)
            elif prev['x2'] < 470:
                parts.append('\n' + t)
            else:
                parts.append(' ' + t)
        prev = r
    return ''.join(parts).strip()

cards, card, section = [], None, None
def flush():
    if not card:
        return
    c = {'n': card['n'], 'section': card['section'], 'q': ' '.join(card['title']).strip(),
         'a': prose(card['body'])}
    if card['code']:
        c['code'] = mono_text(card['code'], 62.5)
    if card['out']:
        c['output'] = mono_text(card['out'], 64.7)
    cards.append(c)

for p in pages[1:]:
    rows = sorted(page_lines(p), key=lambda r: (r['y'], r['x']))
    # A card title sits ~2pt above its "#N" label: put the label first.
    for k in range(len(rows) - 1):
        a, b = rows[k], rows[k + 1]
        if a['x'] > 58 and a['h'] > 12.5 and re.fullmatch(r'#\d+', ' '.join(w[2] for w in b['words'])) and abs(a['y'] - b['y']) < 5:
            rows[k], rows[k + 1] = b, a
    i = 0
    while i < len(rows):
        r = rows[i]
        text = ' '.join(w[2] for w in r['words'])
        if text in SECTIONS:
            flush(); card = None; section = text; i += 1; continue
        m = re.fullmatch(r'#(\d+)', text)
        if m and abs(r['x'] - 53.5) < 2:
            flush()
            card = {'n': int(m.group(1)), 'section': section, 'title': [], 'body': [], 'code': [], 'out': [], 'mode': 'title'}
            i += 1; continue
        if card is None:
            i += 1; continue
        if text == 'OUTPUT' and abs(r['x'] - 53.5) < 2:
            card['mode'] = 'out'; i += 1; continue
        if card['mode'] == 'title' and r['x'] > 58 and r['h'] > 12.5:
            card['title'].append(text); i += 1; continue
        if abs(r['x'] - 53.5) < 2 and card['mode'] in ('title', 'body'):
            card['mode'] = 'body'; card['body'].append(r); i += 1; continue
        if card['mode'] == 'out':
            card['out'].append(r)
        elif r['x'] > 58:
            if card['mode'] in ('title', 'body'):
                card['mode'] = 'code'
            card['code'].append(r)
        i += 1
flush()

OUT_OF_SCOPE = re.compile(r'Recursion|Files', re.I)
# Cards on topics not on the test: exception handling (30, 31, 33, 34), static vs dynamic
# structures (35-37), selection sort (107, 108), maps and hash tables (158-160).
OUT_OF_SCOPE_CARDS = {30, 31, 33, 34, 35, 36, 37, 107, 108, 158, 159, 160}
for c in cards:
    c['scope'] = not OUT_OF_SCOPE.search(c['section'] or '') and c['n'] not in OUT_OF_SCOPE_CARDS

with open(os.path.join(root, 'content', 'flashcards.js'), 'w') as f:
    f.write('// Generated by tools/extract_flashcards.py from IB_CS_HL_Flashcards.pdf. Do not edit by hand.\n')
    f.write('window.B2.sections = ' + json.dumps(SECTIONS) + ';\n')
    f.write('window.B2.flashcards = ' + json.dumps(cards, indent=1, ensure_ascii=False) + ';\n')
print(f'{len(cards)} cards, char width {CW:.3f}, sections: {SECTIONS}')
print('in scope:', sum(c["scope"] for c in cards))
