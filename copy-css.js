import fs from 'fs';
import path from 'path';

const src = path.resolve('./_site/css/main.css');
const dest = path.resolve('./_site/css/main.original.css');

fs.copyFileSync(src, dest);
console.log('Copied main.css → main.original.css');