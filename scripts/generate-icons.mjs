// Génère les icônes et l'image de partage à partir de public/favicon.svg et du logo.
// Usage : node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/favicon.svg');

// Icône Apple (écran d'accueil iOS) et PNG 192 / 512 pour le manifeste
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svg, { density: 600 }).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(svg, { density: 600 }).resize(512, 512).png().toFile('public/icon-512.png');

// favicon.ico : un ICO contenant un PNG 32×32 (format accepté par tous les navigateurs récents)
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12);
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png32]));

// Image de partage (Open Graph) 1200×630 : le logo sur fond noir, comme le fichier d'origine
const source = 'src/assets/logo/logo-original.jpg';
// Couleur réelle du fond noir du logo (coin supérieur gauche), pour un raccord invisible
const { data: corner } = await sharp(source)
  .extract({ left: 0, top: 0, width: 20, height: 20 })
  .resize(1, 1)
  .raw()
  .toBuffer({ resolveWithObject: true });
const background = { r: corner[0], g: corner[1], b: corner[2] };

const cropped = await sharp(source)
  .extract({ left: 40, top: 180, width: 1000, height: 690 })
  .resize({ height: 560 })
  .toBuffer();
const { width: logoWidth = 0, height: logoHeight = 0 } = await sharp(cropped).metadata();
// Masque aux bords flous : le cadre du JPEG se fond dans le fond
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${logoWidth}" height="${logoHeight}">
    <defs><filter id="f"><feGaussianBlur stdDeviation="22"/></filter></defs>
    <rect x="45" y="40" width="${logoWidth - 90}" height="${logoHeight - 80}" fill="#fff" filter="url(#f)"/>
  </svg>`,
);
const logo = await sharp(cropped)
  .ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background },
})
  .composite([{ input: logo, left: Math.round((1200 - logoWidth) / 2), top: 35 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('Icônes et image de partage générées dans public/.');
