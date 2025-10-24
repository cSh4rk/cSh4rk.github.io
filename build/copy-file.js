import fs from 'fs';
import path from 'path';

const [,, srcArg, destArg] = process.argv;

if (!srcArg || !destArg) {
  console.error('Usage: node copy-file.js <source> <destination>');
  process.exit(1);
}

const src = path.resolve(srcArg);
const dest = path.resolve(destArg);

try {
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} → ${dest}`);
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
}