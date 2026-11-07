const fs = require('fs'), path = require('path');
const dir = __dirname, src = p => fs.readFileSync(path.join(dir, p), 'utf8');
const order = ['m00', 'm01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10', 'cap', 'ref_glossary', 'ref_clock', 'ref_sources'];
const js = ['src/charts.js', 'src/engine.js', 'src/core.js', 'src/explain.js', 'src/sync.js', 'src/learn.js', 'src/assistant.js', 'src/pages.js', 'src/dash.js', 'content/rules_data.js', 'src/ndct.js', 'src/widgets_ndct.js']
  .map(src).map(t=>t.replace('__LOGO__',src('src/logo.b64').trim())).concat(order.filter(n => fs.existsSync(path.join(dir, 'content', n + '.js'))).map(n => src('content/' + n + '.js'))).concat([]).join('\n;\n').replace(/<\/script/gi, '<\\/script');
const narr = fs.existsSync(path.join(dir, 'narration', 'manifest.json')) ? fs.readFileSync(path.join(dir, 'narration', 'manifest.json'), 'utf8').trim() : '{}';
const js2 = js + '\n;\nApp.NARR = ' + narr + ';';
const css = src('src/style.css') + '\n' + src('src/theme_ndct.css');
const fonts = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap';
const body = `<title>NDCT-Vax</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 rx=%2215%22 fill=%22%230B5D63%22/%3E%3Crect x=%2224%22 y=%229%22 width=%2216%22 height=%227%22 rx=%222%22 fill=%22%23E0A93B%22/%3E%3Cpath d=%22M22 20 H42 V47 a6 6 0 0 1 -6 6 H28 a6 6 0 0 1 -6 -6 Z%22 fill=%22none%22 stroke=%22%23fff%22 stroke-width=%224.5%22 stroke-linejoin=%22round%22/%3E%3Cpath d=%22M26.5 35 H37.5 V46.5 a2.5 2.5 0 0 1 -2.5 2.5 H29 a2.5 2.5 0 0 1 -2.5 -2.5 Z%22 fill=%22%23E0A93B%22/%3E%3C/svg%3E">
<link rel="stylesheet" href="${fonts}">
<style>
${css}
</style>
<div class="topbar"><b>NDCT-Vax</b><span class="tbtns"><button type="button" class="btn sm themebtn"></button><button type="button" class="btn sm" id="menu" aria-label="Open contents">Contents</button></span></div>
<div class="shell">
<aside class="rail" id="rail" aria-label="Course contents"></aside>
<main class="main" id="page"></main>
</div>
<script>
${js2}
;App.init();
</script>
`;
const site = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="description" content="NDCT-Vax: a self-paced course on the regulatory pathway for vaccine clinical development in India, read from the New Drugs and Clinical Trials Rules, 2019."><style>:root{color-scheme:light dark}body{margin:0;font-size:14px}</style></head><body>' + body + '</body></html>';
const args = process.argv.slice(2);
if (args.includes('--check')) {
  // used by the GitHub workflow: does the published index.html match a fresh build of src/ and content/?
  const cur = fs.existsSync(path.join(dir, 'index.html')) ? fs.readFileSync(path.join(dir, 'index.html'), 'utf8') : '';
  if (cur !== site) { console.log('index.html differs from a fresh build'); process.exit(1); }
  console.log('index.html matches the source'); process.exit(0);
}
if (args.includes('--site')) {
  // repository layout: write the published page next to build.js
  fs.writeFileSync(path.join(dir, 'index.html'), site);
} else {
  fs.writeFileSync(path.join(dir, 'dist_fragment.html'), body);
fs.writeFileSync(path.join(dir, 'dist_test.html'), '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-size:14px}</style></head><body>' + body + '</body></html>');
fs.mkdirSync(path.join(dir,'site'),{recursive:true});
  fs.writeFileSync(path.join(dir, 'site', 'index.html'), site);
}
console.log('fragment bytes', body.length);
