import fs from 'node:fs/promises';
import path from 'node:path';
import { deflateSync } from 'node:zlib';

const assets = path.resolve('dist/assets');
await fs.mkdir(assets, { recursive: true });

const palettes = {
    flame: ['#ffe783','#ff8a31','#b52815','#ffb34f'],
    ice: ['#d1ffff','#48d0ed','#1551a1','#8df4ff'],
    light: ['#ffffcc','#f5d458','#b57c1d','#fff6a4'],
    dark: ['#d5adff','#9254e8','#452489','#c49bff'],
    buddha: ['#ffefb2','#d7aa50','#845527','#ffe9a0'],
    dragon: ['#f1af78','#c54f38','#6c2433','#ffd3a6']
};
const ornament = {
    flame: '<path d="M96 79C68 60 98 47 92 20c21 13 17 30 21 36 7-23 21-23 19-45 25 21 12 40 23 46 1-16 12-18 15-30 11 23 18 40-1 57Z" fill="url(#flame)"/><path d="M113 78c-4-18 13-26 13-44 17 17 8 24 19 35l-10 20Z" fill="#ffed9a"/>',
    ice: '<g fill="#b7f8ff" stroke="#42d2f3" stroke-width="1.3"><path d="m88 83-15-37 30 25Z"/><path d="m111 68 2-40 19 32Z"/><path d="m139 63 22-35-6 49Z"/><path d="m165 80 28-25-12 42Z"/><path d="m69 115-22-7 18 32Z"/><path d="m192 116 23-10-20 35Z"/></g>',
    light: '<g fill="#fff1a1"><path d="m126 7-20 44h20l-5 33 29-51h-21l12-26Z"/><path d="m49 70 19 18-5 10-25-25Z"/><path d="m211 67-20 19 4 12 26-25Z"/></g><g stroke="#f9e59d" stroke-width="2"><path d="m59 142-18 6m162-5 17 7m-12-39 18-1M45 107l-15-3"/></g>',
    dark: '<path d="M130 67C101 41 146 42 143 23c-2-16-28-16-25 0 1 7 12 11 15 3" stroke="#85a75e" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M127 55c-11-19-26-24-43-16 8 14 26 25 43 16Z" fill="#afc581"/>',
    buddha: '<circle cx="130" cy="105" r="79" stroke="#f5d48b" stroke-width="3" opacity=".65" fill="none"/><circle cx="130" cy="105" r="87" stroke="#e0b65a" opacity=".3" fill="none" stroke-dasharray="2 7"/><path d="M116 62c-7-17 1-34 14-38 12 3 21 23 13 38Z" fill="#f1cc75"/><circle cx="130" cy="23" r="5" fill="#ffecaf"/>',
    dragon: '<path d="M90 90C56 70 65 44 57 27c24 10 25 32 49 38Z" fill="#efd7a2"/><path d="M160 70c25-6 20-31 44-39-7 16 3 44-29 59Z" fill="#dfc38d"/><path d="m108 63 6-22 15 18 16-21 5 26" fill="#6b9f75"/><path d="m72 102-17 8 14 14m119-21 18 9-13 15" fill="#79ae80"/>'
};

for (const [key, colors] of Object.entries(palettes)) {
    const [top, middle, deep, glow] = colors;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220">
    <defs><linearGradient id="top" x2="1" y2="1"><stop stop-color="${top}"/><stop offset="1" stop-color="${middle}"/></linearGradient><linearGradient id="left" x2=".8" y2="1"><stop stop-color="${middle}"/><stop offset="1" stop-color="${deep}"/></linearGradient><linearGradient id="right" x2="1" y2="1"><stop stop-color="${middle}"/><stop offset="1" stop-color="${deep}"/></linearGradient><linearGradient id="flame" x2="0" y2="1"><stop stop-color="#fff4a8"/><stop offset=".5" stop-color="#ffc63b"/><stop offset="1" stop-color="#f36120"/></linearGradient></defs>
    <ellipse cx="130" cy="192" rx="53" ry="6" fill="${deep}" opacity=".18"/>
    ${ornament[key]}
    <path d="m130 61 59 30q7 4 7 12v46q0 8-7 12l-51 28q-8 4-16 0l-51-28q-7-4-7-12v-46q0-8 7-12Z" fill="url(#left)" stroke="${glow}" stroke-opacity=".4" stroke-width="1.3"/>
    <path d="m130 61 59 30q7 4 0 8l-52 29q-7 4-14 0L71 99q-7-4 0-8Z" fill="url(#top)"/>
    <path d="m130 132 59-33q7-4 7 4v46q0 8-7 12l-51 28q-8 4-8-4Z" fill="url(#right)"/>
    <path d="m70 104 57 32v48M136 136l54-30" stroke="${glow}" opacity=".35" fill="none" stroke-width="2"/>
    <g fill="none" stroke="${deep}" stroke-width="3.8" stroke-linecap="round" opacity=".7"><path d="M90 122c-14-11-23 3-14 15 13 17 31 6 21-7-6-7-16-7-13 1 2 5 8 6 8 2"/><path d="M112 153c-10-13-19-6-15 4 3 9 17 11 16 2"/><path d="M169 117c13-7 18 5 8 16-14 15-31 4-20-7 7-7 15-3 10 3"/><path d="M153 155c-8 0-12 13-4 15 8 3 20-9 15-13"/><path d="M117 91c-15-9-27 3-14 10 18 10 39-6 24-13-9-4-17 1-10 4"/><path d="M151 92c8-5 19 0 11 6-8 6-21 2-17-2"/></g>
    <g fill="none" stroke="${glow}" stroke-width="1.2" opacity=".7"><path d="m77 111 4 3m21 29 9 5m37-7 5-3m23 7 8-5M114 76l10-5"/></g>
    ${key === 'dragon' ? '<path d="m151 125 13-7-5 13Z" fill="#bde69e"/><path d="m181 111 9-5-3 10Z" fill="#bde69e"/>' : ''}
    <g fill="${glow}" opacity=".8"><path d="m40 128 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/><path d="m213 161 2 4 4 2-4 1-2 4-1-4-4-1 4-2Z"/><circle cx="54" cy="167" r="1.5"/><circle cx="204" cy="81" r="1.5"/></g></svg>`;
    await fs.writeFile(path.join(assets, `${key}.svg`), svg);
}

await fs.writeFile(path.join(assets, 'icones.svg'), `<svg xmlns="http://www.w3.org/2000/svg"><defs>
<symbol id="anchor" viewBox="0 0 32 36"><circle cx="16" cy="6" r="3.5"/><path d="M16 10v23M10 15h12M4 20v4c0 6 6 9 12 9s12-3 12-9v-4M1 23l3-3 4 4m16 0 4-4 3 3"/></symbol>
<symbol id="compass" viewBox="0 0 64 64"><circle cx="32" cy="32" r="25"/><circle cx="32" cy="32" r="20"/><path d="M32 1v8m0 46v8M1 32h8m46 0h8M12 12l5 5m30 30 5 5M12 52l5-5m30-30 5-5M40 23l-5 12-12 5 5-12Z"/><path d="m40 23-12 5 7 7Z" fill="currentColor" stroke="none"/></symbol>
<symbol id="fruit" viewBox="0 0 24 24"><path d="m12 7 7 4v8l-7 4-7-4v-8ZM12 7c-4-5 5-3 3-6M5 11l7 4 7-4m-7 4v8M9 10l6 4"/></symbol>
<symbol id="swords" viewBox="0 0 40 40"><path d="m7 3 10 5 15 23-4 3L9 13ZM33 3l-10 5L8 31l4 3 19-21ZM23 29l10-7M7 23l10 7m-7 2-5 5m25-5 5 5M3 35l3 3m28 0 3-3"/></symbol>
<symbol id="spark" viewBox="0 0 24 24"><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3ZM20 2v4m-2-2h4"/></symbol>
</defs></svg>`);

function island(x, y, scale, kind) {
    const palm = '<path d="M-7-30c7-12 8-29 5-43" stroke="#a98458" stroke-width="7" fill="none"/><g fill="#4dbaa3"><path d="M-2-73c-23-17-35-2-34 6 13-6 22-3 34-6Z"/><path d="M-2-73c19-16 31-1 31 9-11-6-20-9-31-9Z"/><path d="M-2-73c-14-20-21-14-23-10 9 1 13 6 23 10Z"/><path d="M-2-73c9-25 22-22 25-15-11 1-16 6-25 15Z"/></g>';
    const castle = '<path d="m-30-35 0-52 21-11 25 10v56" fill="#82a8a8"/><path d="m-30-87 21 10 25-11-25-10Z" fill="#b5c5b6"/><path d="m-9-77 25-11v56L-9-20Z" fill="#416a79"/><path d="m-46-27 0-56 13-7 13 7v58m26-8v-58l14-7 13 8v57" fill="#6d979a"/><path d="m-48-83 15-22 15 22-15 8Zm52-9 15-24 16 24-16 8Z" fill="#dd8664"/><path d="m-17-98 8-21 27 20-27 13Z" fill="#cb805f"/><path d="M-33-105v-25l20 6-20 7m52 1v-24l21 5-21 7" stroke="#c0d2b8" stroke-width="2"/><path d="m-7-23 1-17 9-5v17" fill="#123644"/>';
    const trees = '<g fill="#367e69"><path d="m-37-32 16-32 17 32Z"/><path d="m-13-40 18-39 21 39Z"/><path d="m14-24 15-33 19 33Z"/></g><g fill="#56ac80"><path d="m-37-32 16-32-3 24ZM-13-40l18-39-3 29Zm27 16 15-33-2 22Z"/></g>';
    return `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="12" rx="103" ry="38" fill="none" stroke="#5bbec0" opacity=".15"/><ellipse cy="12" rx="88" ry="28" fill="#3cbec0" opacity=".12"/><path d="m-69-4 11 33 39 20 51-3 33-28 8-22Z" fill="#235565"/><path d="m-58 29 39 20 15-29-56-22Zm90 17 33-28-34-13-12 23Z" fill="#183d51"/><path d="m-76-8 26-26 44-12 49 16 35 22-25 25-52 9-48-12Z" fill="#a9ae78"/><path d="m-66-12 20-19 40-10 47 15 27 18-18 17-47 10-46-11Z" fill="#3f9b7e"/><path d="m-66-12 20-19 40-10-16 15-25 11 4 23Z" fill="#61b58a"/>${kind === 'castle' ? castle : kind === 'palm' ? palm : trees}</g>`;
}

await fs.writeFile(path.join(assets, 'oceano.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><radialGradient id="water"><stop stop-color="#377b84" stop-opacity=".18"/><stop offset="1" stop-color="#122a36" stop-opacity="0"/></radialGradient></defs><ellipse cx="400" cy="270" rx="370" ry="210" fill="url(#water)"/>
<g fill="none" stroke="#80c5c5" stroke-width="1" opacity=".15"><ellipse cx="400" cy="275" rx="330" ry="160"/><ellipse cx="400" cy="275" rx="275" ry="125"/><path d="M90 280h620M400 90v350"/></g>
<path d="M187 302C141 220 298 186 347 152s243-51 254 77-169 62-150 137-173 75-229 17" fill="none" stroke="#e6b887" stroke-width="2" stroke-dasharray="5 8" opacity=".65"/>
${island(207,288,1.4,'palm')}${island(388,158,.85,'trees')}${island(601,262,1.18,'castle')}
<g transform="translate(414 366)"><ellipse cy="20" rx="60" ry="11" fill="#66b7c3" opacity=".12"/><path d="m-43 5 10 18 44 8 26-15 8-15Z" fill="#b48258"/><path d="m-33 8 6 10 37 7 23-11Z" fill="#634e40"/><path d="M0 7v-89" stroke="#bdad87" stroke-width="4"/><path d="M-3-73q-28 17-31 56l31 13Zm8-4q29 18 36 50L5-5Z" fill="#e2c8a1"/><path d="M-3-42h-24m32 1h29" stroke="#c98d68" stroke-width="3"/><path d="M2-84v-19l29 7-29 8" fill="#e38664"/></g>
<g fill="none" stroke="#6babb6" opacity=".36" stroke-linecap="round"><path d="M82 165h17m-8 6h15m525 226h24m-11 7h17m-449 44h19m-8 7h16M496 90h20m-7 6h19M87 380h17m-9 7h22M663 142h24m-13 7h20"/></g>
<g transform="translate(675 402)" fill="none" stroke="#93b3ba" opacity=".45"><circle r="26"/><path d="M0-34v10m0 48v10m-34-34h10m48 0h10M7-7 3 3-7 7-3-3Z"/><path d="m7-7-10 4 6 6Z" fill="#d5b28e" stroke="none"/></g><text x="675" y="360" fill="#93b3ba" text-anchor="middle" font-family="sans-serif" font-size="10" opacity=".7">N</text></svg>`);

// PNG RGBA original, gerado sem dependências externas, para o ícone da página.
const size = 64;
const pixels = Buffer.alloc((size * 4 + 1) * size);
for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
        const index = y * (size * 4 + 1) + 1 + x * 4;
        let color = [12, 26, 34, 255];
        const cube = x >= 12 && x <= 51 && y >= 23 && y <= 53 && !(x < 16 && y < 27) && !(x > 47 && y > 49);
        if (cube) color = x < 32 ? [236, 99, 48, 255] : [178, 57, 33, 255];
        if (cube && y < 29) color = [255, 166, 85, 255];
        const radius = Math.hypot(x - 29, y - 15);
        if ((radius > 5 && radius < 9 && y < 22) || (x >= 29 && x <= 33 && y >= 17 && y <= 26)) color = [137, 190, 107, 255];
        const swirl = Math.hypot(x - 30, y - 39);
        if (cube && ((swirl > 6 && swirl < 9 && (x < 34 || y > 36)) || (x >= 27 && x <= 33 && y >= 37 && y <= 40))) color = [255, 207, 127, 255];
        pixels.set(color, index);
    }
}
function crc32(buffer) {
    let crc = 0xffffffff;
    for (const byte of buffer) {
        crc ^= byte;
        for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
    const name = Buffer.from(type);
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
    return Buffer.concat([length, name, data, crc]);
}
const header = Buffer.alloc(13);
header.writeUInt32BE(size, 0);
header.writeUInt32BE(size, 4);
header[8] = 8;
header[9] = 6;
await fs.writeFile(path.join(assets, 'icone.png'), Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR',header), chunk('IDAT',deflateSync(pixels)), chunk('IEND',Buffer.alloc(0))]));
console.log('Assets SVG e ícone PNG criados.');
