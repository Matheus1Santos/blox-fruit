import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

// Nomes transcritos da descrição oficial, separados da ordem usada pela interface.
const official = 'Rocket,Spin,Blade,Spring,Bomb,Smoke,Spike,Flame,Ice,Sand,Dark,Eagle,Diamond,Light,Rubber,Ghost,Magma,Quake,Buddha,Love,Creation,Spider,Sound,Phoenix,Portal,Lightning,Pain,Blizzard,Gravity,Mammoth,T-Rex,Dough,Shadow,Venom,Gas,Spirit,Tiger,Yeti,Magnet,Kitsune,Control,Dragon'.split(',');
const data = JSON.parse(await fs.readFile('dist/catalogo-frutas.json', 'utf8'));
assert.deepEqual(data.fruits.map(f => f.name).sort(), official.sort());
assert.equal(new Set(data.fruits.map(f => f.id)).size, 42);
for (const fruit of data.fruits) {
    assert(['Comum', 'Incomum', 'Rara', 'Lendária', 'Mítica'].includes(fruit.rarity));
    assert(['Natural', 'Elemental', 'Fera'].includes(fruit.type));
    assert(Number.isSafeInteger(fruit.beli) && fruit.beli > 0);
    assert(Number.isSafeInteger(fruit.robux) && fruit.robux > 0);
    await fs.access(`dist/assets/${fruit.id}.svg`);
}
for (const file of ['script.js', 'efeitos.js', 'frutas-dados.js']) new vm.Script(await fs.readFile(`dist/${file}`, 'utf8'), {filename: file});
const html = await fs.readFile('dist/frutas.html', 'utf8');
assert.equal((html.match(/class="fruit-card catalog-card"/g) || []).length, 42);
assert.equal((html.match(/data-rarity-group=/g) || []).length, 5);
assert.deepEqual(['Comum','Incomum','Rara','Lendária','Mítica'].map(r => data.fruits.filter(f => f.rarity === r).length), [7,6,4,11,14]);
for (const page of ['index','frutas','mares','guia','quiz']) {
    const text = await fs.readFile(`dist/${page}.html`, 'utf8');
    assert(text.includes('href="efeitos.css"') && text.includes('src="efeitos.js"'));
    assert(text.indexOf('src="frutas-dados.js"') < text.indexOf('src="script.js"'));
}
console.log('OK: 42 nomes oficiais, preços válidos, 42 ilustrações, 5 grupos, scripts e dependências das 5 páginas.');
