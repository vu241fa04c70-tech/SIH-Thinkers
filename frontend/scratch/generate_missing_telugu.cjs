const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/Kanchana/Desktop/SIH Thinkers/frontend/src';
const langContextPath = path.join(srcDir, 'context/LanguageContext.tsx');
const langContextContent = fs.readFileSync(langContextPath, 'utf8');

// Extract Telugu dictionary keys
const teluguMatch = langContextContent.match(/Telugu:\s*\{([\s\S]*?)\},\s*\n\s*Hindi:/);
const teluguBlock = teluguMatch[1];
const teluguKeys = new Set();
const keyRegex = /['"]?([a-zA-Z0-9_\-()\s]+)['"]?\s*:/g;
let match;
while ((match = keyRegex.exec(teluguBlock)) !== null) {
  teluguKeys.add(match[1].trim());
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(srcDir);
const missingMap = new Map(); // key -> defaultFallback

const tRegex = /t\(\s*['"]([^'"]+)['"](?:\s*,\s*['"`]([\s\S]*?)['"`])?\s*\)/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let tMatch;
  while ((tMatch = tRegex.exec(content)) !== null) {
    const key = tMatch[1];
    const fallback = tMatch[2] || key;
    if (!teluguKeys.has(key) && !key.startsWith('/')) {
      missingMap.set(key, fallback);
    }
  }
}

console.log('=== MISSING TELUGU KEYS AND FALLBACKS ===');
console.log(JSON.stringify(Object.fromEntries(missingMap), null, 2));
