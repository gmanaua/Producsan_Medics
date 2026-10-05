// Genera .artifact/index.html para publicar la vista previa en Claude:
// quita el envoltorio del documento y mete las fotos en images.js (data: URIs).
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const at = p => new URL(p, root);
mkdirSync(at('.artifact'), { recursive: true });
let h = readFileSync(at('index.html'), 'utf8');
h = h.replace(/<!doctype html>\s*/i, '').replace(/<html[^>]*>\s*/i, '').replace(/<\/html>\s*/i, '')
  .replace(/<head>\s*/i, '').replace(/<\/head>\s*/i, '').replace(/<body>\s*/i, '').replace(/<\/body>\s*/i, '')
  .replace(/<meta charset[^>]*>\s*/i, '').replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace('<script src="catalog.js"></script>', '<script src="catalog.js"></script>\n<script src="images.js"></script>');
writeFileSync(at('.artifact/index.html'), h);
const m = {};
for (const f of readdirSync(at('img'))) m['img/' + f] = 'data:image/jpeg;base64,' + readFileSync(at('img/' + f)).toString('base64');
writeFileSync(at('.artifact/images.js'), 'window.IMAGES=' + JSON.stringify(m) + ';\n');
writeFileSync(at('.artifact/catalog.js'), readFileSync(at('catalog.js')));
console.log('ok');
