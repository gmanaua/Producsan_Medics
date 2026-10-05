# Producsan Mèdics

Rediseño de la web de **Producsan Mèdics, S.L.**, tienda de material sanitario y de laboratorio en Castelldefels (Barcelona).

Es una web estática, sin carrito ni pagos: catálogo de 273 productos en 15 familias, buscador, ficha de producto con mensaje para pedir precio, y datos de contacto.

## Estructura

| Ruta | Qué es |
|------|--------|
| `index.html` | La web (HTML, CSS y JS en un solo archivo) |
| `catalog.js` | Datos del catálogo que usa la web |
| `img/` | Logo y fotos de producto |
| `data/catalog.json` | Catálogo completo extraído de la web antigua |
| `tools/scrape.mjs` | Vuelve a extraer el catálogo de producsan.es → `data/catalog.json` |
| `tools/fetch-assets.mjs` | Descarga las fotos y genera `catalog.js` |
| `tools/build-artifact.mjs` | Genera la vista previa para Claude en `.artifact/` (no se sube) |

## Actualizar el catálogo

Con Node.js 18 o superior:

```bash
node tools/scrape.mjs
node tools/fetch-assets.mjs
```

## Ver la web

Abre `index.html` en el navegador, o publícala con GitHub Pages (Settings → Pages → rama `main`, carpeta `/`).

## Estilo

Basado en la referencia de Refero "Aevi Wellness": fondo blanco, bandas azul empolvado (`#d5e0ea`), un único acento (`#a3bfdb`) en el botón principal, tipografía Inter ligera y líneas finas en lugar de sombras.
