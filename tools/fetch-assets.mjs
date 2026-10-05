// Descarga las fotos de data/catalog.json a img/ y genera catalog.js para la web
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const at = p => new URL(p, root);
const data = JSON.parse(readFileSync(at('data/catalog.json'), 'utf8'));
const dl = async (url, path) => { if (existsSync(at(path))) return; const r = await fetch(url); if (!r.ok) throw new Error(url + ' ' + r.status); writeFileSync(at(path), Buffer.from(await r.arrayBuffer())); };
await dl(data.store.logo, 'img/logo.jpg');
const queue = [...data.products];
await Promise.all(Array.from({ length: 8 }, async () => { for (let p; (p = queue.shift());) { if (p.thumb) await dl(p.thumb, `img/${p.id}.jpg`).catch(e => console.log('fallo', e.message)); } }));
const slim = {
  store: { ...data.store, logo: 'img/logo.jpg' },
  categories: data.categories,
  products: data.products.map(p => ({ id: p.id, n: p.name, d: p.desc, c: p.cats, img: p.thumb ? `img/${p.id}.jpg` : '' }))
};
writeFileSync(at('catalog.js'), 'window.CATALOG = ' + JSON.stringify(slim) + ';\n');
console.log('ok', slim.products.length);
