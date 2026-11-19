import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const catalog = JSON.parse(await fs.readFile(path.join(dist, 'catalogo-frutas.json'), 'utf8'));
const rarities = ['Comum', 'Incomum', 'Rara', 'Lendária', 'Mítica'];
const slugs = ['comum', 'incomum', 'rara', 'lendaria', 'mitica'];
const types = {Natural: 'Natural', Elemental: 'Elemental / Logia', Fera: 'Fera / Zoan'};
const number = value => new Intl.NumberFormat('pt-BR').format(value);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

const ornaments = {
    rocket: '<path d="M115 78V35l15-24 15 24v43M115 57l-20 21h20m30-21 20 21h-20"/><circle cx="130" cy="41" r="6"/>',
    spin: '<path d="M130 76V25m0 8c-45-37-54 5-5 7m10-5c45-37 54 5 5 7"/>',
    blade: '<path d="m95 75-20-50 29 34m19 8 7-56 9 56m16 8 28-44-13 53"/>',
    spring: '<path d="M130 75c-63-10 46-23-2-30s-46-12 4-18 13-15 0-14"/>',
    bomb: '<path d="M130 70V47c0-15 20-6 20-19m0 0 8-12m-7 12 15-2m-15 3 8 10"/>',
    smoke: '<path d="M104 74c-48-28 26-24 1-45s57-20 25 13 51 4 24 33"/>',
    spike: '<path d="m82 91-28-47 47 34m15-12 14-58 15 58m15 12 45-35-25 50"/>',
    sand: '<path d="M80 74q28-53 50-14 25-42 52 15M100 58l15 17m29-18 10 18"/>',
    eagle: '<path d="M127 72C94 24 58 31 61 46l38 26-17 2 28 15m23-17c33-48 69-41 66-26l-38 26 17 2-28 15"/>',
    diamond: '<path d="m130 13 30 29-30 40-30-40Zm-30 29h60m-45-14 15 54 15-54"/>',
    rubber: '<path d="M94 74c-39-69 112-76 72 0m-53-7c-20-37 54-39 34 0"/>',
    ghost: '<path d="M99 79V43c0-40 62-40 62 0v36l-15-12-16 12-16-12Z"/><circle cx="117" cy="46" r="4"/><circle cx="143" cy="46" r="4"/>',
    magma: '<path d="M95 81c-14-28 15-37 12-57 20 17 3 28 20 39 2-19 16-28 14-48 30 32-3 39 24 57l7-28 10 37"/>',
    quake: '<path d="m130 12-9 20 19 13-19 13 9 23m-25-52c-24 18-24 30 0 46m50-46c24 18 24 30 0 46"/>',
    love: '<path d="M130 80C49 34 108-9 130 32c22-41 81 2 0 48Z"/>',
    creation: '<path d="M86 81V47h29v34m0-5V16h30v60m0 5V37h29v44M115 38h30m-58 24h27m32-8h27"/>',
    spider: '<path d="M130 30v47m0-32-42-20-12 18m54 11-49-2-13 20m62-27 42-20 12 18m-54 11 49-2 13 20"/>',
    sound: '<path d="M106 69V20l43-8v49m-43-26 43-8"/><ellipse cx="97" cy="70" rx="10" ry="7"/><ellipse cx="140" cy="63" rx="10" ry="7"/><path d="M72 36q-13 13 0 27m103-37q20 22 0 44"/>',
    phoenix: '<path d="M130 80C98 27 86 51 58 20c0 50 44 36 51 65m21-5c32-53 44-29 72-60 0 50-44 36-51 65m-25-19 4-55 10 52"/>',
    portal: '<ellipse cx="130" cy="44" rx="43" ry="32"/><ellipse cx="130" cy="44" rx="29" ry="22"/><path d="M80 45H65m130 0h-15M130 4v12"/>',
    lightning: '<path d="m140 4-41 44h28l-9 38 43-53h-31Z"/><path d="m75 33-11 17h15l-6 19m112-49-12 16h14l-6 19"/>',
    pain: '<ellipse cx="130" cy="64" rx="23" ry="17"/><ellipse cx="99" cy="34" rx="9" ry="13"/><ellipse cx="122" cy="23" rx="9" ry="13"/><ellipse cx="147" cy="26" rx="9" ry="13"/><ellipse cx="166" cy="43" rx="9" ry="13"/>',
    blizzard: '<path d="M130 5v76M97 24l66 38m0-38-66 38m33-57-12 15m12-15 12 15m-45 4 17 4m-17-4 4 17m62-17-18 4m18-4-5 17"/>',
    gravity: '<circle cx="130" cy="46" r="29"/><ellipse cx="130" cy="46" rx="57" ry="13" transform="rotate(-22 130 46)"/>',
    mammoth: '<path d="M95 83C49 82 61 22 77 17c-11 27 8 33 28 40m60 26c46-1 34-61 18-66 11 27-8 33-28 40"/>',
    't-rex': '<path d="m90 79 8-40 19 28 13-53 14 53 19-28 9 40M96 95l13 22 12-14m23 0 12 14 13-22"/>',
    dough: '<path d="M98 76c-39-52 73-75 63-29-9 40-66 10-38-6 17-10 31 12 8 11"/>',
    shadow: '<path d="M110 82C60 61 92 31 72 11c45 20 19 43 55 51m21 20c50-21 18-51 38-71-45 20-19 43-55 51"/>',
    venom: '<path d="M99 81c-32-32 20-22 10-54 24 9 7 26 23 31 26-18-3-27 17-43-4 27 42 45 16 66"/><path d="m111 108 10 10m24-10-10 10"/>',
    gas: '<path d="M96 75c-45-19-2-42 16-31-12-44 50-40 40-6 31-16 48 27 15 39"/>',
    spirit: '<circle cx="99" cy="45" r="27"/><circle cx="163" cy="45" r="27"/><path d="m88 42 8-5m4 4 7 4m43-4 8 4m4 0 8-4m-85 15q12 12 24-1m39 5q10-12 22 1"/>',
    tiger: '<path d="m91 81-13-50 38 32m30 0 38-32-13 50m-70 23 22 14m-25 2 22 14m38-30-22 14m25 2-22 14"/>',
    yeti: '<path d="m90 84-9-44 25 15 4-39 20 37 19-38 5 40 25-16-9 45"/>',
    magnet: '<path d="M97 23v27a33 33 0 0 0 66 0V23h-19v27a14 14 0 0 1-28 0V23Zm0 14h19m28 0h19"/>',
    kitsune: '<path d="M129 79C78 66 91 33 64 25c50-7 29 36 63 34m5 20c51-13 38-46 65-54-50-7-29 36-63 34m-9 6c-25-24 4-31-6-54 36 21 8 40 14 54"/>',
    control: '<circle cx="130" cy="44" r="35"/><path d="M95 44h70m-35-35c-28 20-28 50 0 70m0-70c28 20 28 50 0 70M105 21l50 46m-50 0 50-46"/>'
};

function rgb(hex) {
    return [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16));
}

for (const fruit of catalog.fruits) {
    const file = path.join(dist, 'assets', `${fruit.id}.svg`);
    try { await fs.access(file); continue; } catch { /* Preserve os seis desenhos existentes. */ }
    const deep = '#' + rgb(fruit.color).map(value => Math.round(value * .37).toString(16).padStart(2, '0')).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220">
    <defs><linearGradient id="top" x2="1" y2="1"><stop stop-color="${fruit.color}"/><stop offset="1" stop-color="${deep}"/></linearGradient><linearGradient id="side" x2="0" y2="1"><stop stop-color="${fruit.color}"/><stop offset="1" stop-color="${deep}"/></linearGradient></defs>
    <ellipse cx="130" cy="191" rx="57" ry="7" fill="${fruit.color}" opacity=".14"/>
    <g stroke="${fruit.color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="${deep}">${ornaments[fruit.id] || ornaments.spike}</g>
    <path d="m130 64 62 33v57l-62 35-62-35V97Z" fill="url(#side)" stroke="${fruit.color}" stroke-width="2"/>
    <path d="m130 64 62 33-62 35-62-35Z" fill="${fruit.color}"/>
    <path d="m130 132 62-35v57l-62 35Z" fill="${deep}" opacity=".6"/>
    <path d="m130 132-62-35m62 35v57m0-57 62-35" stroke="${fruit.color}" opacity=".7" fill="none"/>
    <g stroke="${deep}" stroke-width="4" fill="none" stroke-linecap="round"><path d="M100 122c-29-20-35 6-11 19 24 13 20-20 5-13m14 33c-12-22-27-3-10 5M153 124c34-25 38 5 13 19-29 16-20-19-4-15m-14 30c8-20 28-13 18 0M113 94c-25-14 25-27 30-11 4 13-28 16-21 4"/></g>
    <path d="m43 111 4 10 10 4-10 4-4 10-4-10-10-4 10-4m171 25 3 7 7 3-7 3-3 7-3-7-7-3 7-3" fill="${fruit.color}"/>
    </svg>`;
    await fs.writeFile(file, svg);
}

await fs.writeFile(path.join(dist, 'frutas-dados.js'), `'use strict';\n// Snapshot conferido nas fontes listadas em catalogo-frutas.json.\nwindow.BLOX_CATALOG = Object.freeze(${JSON.stringify(catalog, null, 4)});\n`);
const cards = fruit => `<article class="fruit-card catalog-card" data-fruit-id="${fruit.id}" data-rarity="${fruit.rarity}" data-type="${fruit.type}" data-aura="${fruit.aura}">
    <div class="catalog-card-top"><span class="rarity-pill">${fruit.rarity}</span><span class="card-element">${types[fruit.type]}</span></div>
    <div class="fruit-art"><span class="fruit-halo"></span><img src="assets/${fruit.id}.svg" alt="Ilustração estilizada de ${fruit.name}" width="260" height="220" loading="lazy" decoding="async"><span class="art-word" aria-hidden="true">${fruit.name}</span></div>
    <div class="fruit-card-content"><h3>${fruit.name}</h3><p class="fruit-alias">${fruit.aliases.length ? 'Nome anterior: ' + fruit.aliases.join(', ') : 'Poder ' + types[fruit.type].toLowerCase()}</p>
    <dl class="fruit-prices"><div><dt>Beli</dt><dd>${number(fruit.beli)}</dd></div><div><dt>Robux <span>permanente</span></dt><dd>${number(fruit.robux)}</dd></div></dl>
    <button type="button" class="fruit-detail" data-fruit="${fruit.id}" aria-label="Conhecer ${fruit.name}">Conhecer poder<span class="detail-plus" aria-hidden="true">+</span></button></div>
</article>`;
const groups = rarities.map((rarity, index) => {
    const list = catalog.fruits.filter(fruit => fruit.rarity === rarity);
    return `<section class="rarity-group" id="raridade-${slugs[index]}" data-rarity-group="${rarity}" aria-labelledby="title-${slugs[index]}"><div class="rarity-heading"><h2 id="title-${slugs[index]}">${rarity}</h2><span class="rarity-group-count">${list.length} frutas</span><span class="rarity-heading-line" aria-hidden="true"></span></div><div class="fruit-grid catalog-grid">${list.map(cards).join('\n')}</div></section>`;
}).join('\n');

const catalogSection = `<nav class="breadcrumb container" aria-label="Você está aqui"><a href="index.html">Início</a><span aria-hidden="true">/</span><span aria-current="page">Frutas</span></nav>
<section class="fruits-section section-space" id="frutas" aria-labelledby="fruits-title"><div class="container">
    <div class="section-heading"><div><p class="eyebrow">ENCICLOPÉDIA DOS PODERES</p><h1 id="fruits-title" class="page-title">42 frutas.<br><span>Poder sem limites.</span></h1></div><p>Do primeiro foguete à fúria do dragão.<br>Explore todas as frutas atuais por raridade,<br>tipo e preço de loja.</p></div>
    <div class="catalog-feature"><svg aria-hidden="true"><use href="assets/icones.svg#spark"></use></svg><p><strong>Os poderes evoluíram.</strong> Procure também pelos nomes clássicos: Chop encontra Blade, Rumble encontra Lightning e Leopard encontra Tiger.</p><span>42 PODERES · 5 RARIDADES</span></div>
    <div class="catalog-controls"><div class="catalog-search"><label for="fruit-search">Busque seu poder</label><div class="search-field"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 5 5"></path></svg><input id="fruit-search" type="search" placeholder="Nome atual ou antigo, como Rumble..." autocomplete="off" maxlength="80"></div></div>
    <div class="catalog-type"><label for="type-filter">Tipo de fruta</label><select id="type-filter"><option value="all">Todos os tipos</option><option value="Natural">Natural</option><option value="Elemental">Elemental / Logia</option><option value="Fera">Fera / Zoan</option></select></div><button class="button button-outline" id="surprise-fruit" type="button"><svg aria-hidden="true"><use href="assets/icones.svg#spark"></use></svg>Poder surpresa</button></div>
    <div class="rarity-filters" role="group" aria-label="Filtrar por raridade"><button type="button" class="filter-button selected" data-rarity-filter="all" aria-pressed="true">Todas <span>42</span></button>${rarities.map(rarity => `<button type="button" class="filter-button" data-rarity-filter="${rarity}" aria-pressed="false">${rarity}<span>${catalog.fruits.filter(fruit => fruit.rarity === rarity).length}</span></button>`).join('')}</div>
    <div class="catalog-status"><p id="fruit-count" role="status" aria-live="polite">42 de 42 frutas</p><button type="button" class="text-button" id="reset-filters">Limpar filtros</button></div>
    <p class="price-explainer">Beli = compra no vendedor quando disponível. Robux = versão permanente. Os valores abaixo são preços de loja, não valores de troca.</p>
    ${groups}
    <div id="fruit-empty" class="empty-state" hidden><svg aria-hidden="true"><use href="assets/icones.svg#compass"></use></svg><h2>Nenhuma fruta nesta rota.</h2><p>Mude o nome, o tipo ou a raridade para continuar explorando.</p><button class="button button-outline" id="clear-search" type="button">Limpar busca e filtros</button></div>
    <aside class="catalog-sources"><h2>Diário de atualização</h2><p>Catálogo conferido em 19/11/2026. A lista contém as 42 frutas atuais da descrição oficial. Nomes anteriores aparecem como atalhos de busca, sem duplicar frutas. Skins, mutações e variantes não são contadas como frutas separadas.</p><p>Fontes: <a href="https://www.roblox.com/games/2753915549/Blox-Fruits" target="_blank" rel="noopener noreferrer">lista oficial no Roblox</a>, <a href="https://oofwiki.com/blox-fruits/fruits" target="_blank" rel="noopener noreferrer">OofWiki: tipos, raridades e preços</a> e <a href="https://bloxfruitscalculator.cc/stock/" target="_blank" rel="noopener noreferrer">conferência dos preços</a>. Preços e mecânicas podem mudar; confirme no jogo antes de comprar.</p></aside>
    <noscript><p class="section-note">Todas as 42 frutas estão disponíveis abaixo por raridade. Ative JavaScript para usar busca, filtros, detalhes e efeitos interativos.</p></noscript>
</div></section>`;

for (const file of ['index.html', 'frutas.html', 'mares.html', 'guia.html', 'quiz.html']) {
    const target = path.join(dist, file);
    let html = await fs.readFile(target, 'utf8');
    if (file === 'frutas.html') {
        html = html.replace(/<main id="conteudo">[\s\S]*?<\/main>/, `<main id="conteudo">${catalogSection}</main>`);
        html = html.replace(/<meta name="description"[^>]*>/, '<meta name="description" content="As 42 frutas atuais de Blox Fruits, organizadas por raridade, com tipos, preços em Beli e Robux, busca e filtros.">');
        if (!html.includes('href="catalogo.css"')) html = html.replace('<link rel="stylesheet" href="estilo.css">', '<link rel="stylesheet" href="estilo.css">\n        <link rel="stylesheet" href="catalogo.css">');
        html = html.replace('<h3>O QUE DEFINE ESSE PODER</h3>', '<h3>TIPO, RARIDADE E PREÇOS</h3>');
        html = html.replace('Esta é uma apresentação do poder, sem ranking ou promessa de desempenho.', 'Beli: compra no vendedor. Robux: versão permanente. Preços de loja conferidos em 19/11/2026.');
    }
    if (!html.includes('href="efeitos.css"')) html = html.replace('<link rel="stylesheet" href="estilo.css">', '<link rel="stylesheet" href="estilo.css">\n        <link rel="stylesheet" href="efeitos.css">');
    if (!html.includes('src="frutas-dados.js"')) html = html.replace('<script src="script.js" defer></script>', '<script src="frutas-dados.js" defer></script>\n        <script src="script.js" defer></script>\n        <script src="efeitos.js" defer></script>');
    html = html.replace('<strong>06</strong>', '<strong>42</strong>').replace('Conheça seis poderes do jogo.', 'Descubra todos os 42 poderes do jogo.');
    await fs.writeFile(target, html);
}

const colors = catalog.fruits.map(fruit => `.fruit-card[data-fruit-id="${fruit.id}"] { --fruit-color: ${fruit.color}; --fruit-rgb: ${rgb(fruit.color).join(',')}; }`).join('\n');
await fs.writeFile(path.join(dist, 'cores-frutas.css'), '/* Paleta individual das ilustrações e auras. */\n' + colors + '\n');
console.log(`Catálogo: ${catalog.fruits.length} frutas; ` + rarities.map(r => `${r}: ${catalog.fruits.filter(f => f.rarity === r).length}`).join(', '));
