// Extrae el catálogo de producsan.es a catalog.json
import { writeFileSync } from 'node:fs';

const BASE = 'https://producsan.es/cms/index.php';
const cats = [[3,'Algodón y celulosa'],[10,'Apósitos y gasas'],[21,'Desinfección e higiene'],[34,'Esparadrapos y tiritas'],[41,'Especialidades'],[42,'Equipos y recambios'],[40,'Esterilización'],[38,'Instrumental'],[5,'Mobiliario'],[37,'Protección'],[4,'Punción'],[39,'Suturas'],[6,'Vendajes'],[44,'Varios'],[45,'Laboratorio']];

const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&aacute;/g,'á').replace(/&eacute;/g,'é').replace(/&iacute;/g,'í').replace(/&oacute;/g,'ó').replace(/&uacute;/g,'ú').replace(/&ntilde;/g,'ñ').replace(/&nbsp;/g,' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();

const products = {};
const categories = [];
for (const [id, name] of cats) {
  const html = await (await fetch(`${BASE}?id_category=${id}&controller=category&n=500`)).text();
  const blocks = html.split('class="ajax_block_product').slice(1);
  const ids = [];
  for (const b of blocks) {
    const pid = b.match(/id_product=(\d+)/)?.[1];
    if (!pid) continue;
    const title = decode(b.match(/class="product-name"[^>]*title="([^"]*)"/)?.[1] || '');
    const img = b.match(/src="([^"]*home_default\.jpg)"/)?.[1] || '';
    const desc = decode(b.match(/<p class="product-desc"[^>]*>([\s\S]*?)<\/p>/)?.[1] || '');
    if (!products[pid]) products[pid] = { id: +pid, name: title, img: img.replace('home_default', 'large_default'), thumb: img, desc: desc === 'test' ? '' : desc, cats: [] };
    products[pid].cats.push(id);
    ids.push(+pid);
  }
  categories.push({ id, name, count: ids.length });
  console.log(name, ids.length);
}

const data = {
  store: {
    name: 'Producsan Mèdics S.L.',
    address: 'Rambla Josep Tarradellas nº3, local 3',
    city: '08860 Castelldefels, Barcelona',
    mobile: '655 903 996',
    phone: '93 156 19 28',
    email: 'producsan@producsan.es',
    logo: 'https://producsan.es/cms/img/my-site-logo-1528656356.jpg'
  },
  categories,
  products: Object.values(products)
};
writeFileSync(new URL('../data/catalog.json', import.meta.url), JSON.stringify(data, null, 1));
console.log('Total productos únicos:', data.products.length);
