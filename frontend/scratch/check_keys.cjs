const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/Kanchana/Desktop/SIH Thinkers/frontend/src';

// Read LanguageContext.tsx
const langContextPath = path.join(srcDir, 'context/LanguageContext.tsx');
const langContextContent = fs.readFileSync(langContextPath, 'utf8');

// Extract Telugu block between Telugu: { and Hindi: {
const teluguStartIndex = langContextContent.indexOf('Telugu: {');
const hindiStartIndex = langContextContent.indexOf('Hindi: {');

if (teluguStartIndex === -1 || hindiStartIndex === -1) {
  console.error('Could not find boundaries');
  process.exit(1);
}

const teluguBlock = langContextContent.slice(teluguStartIndex, hindiStartIndex);

const teluguKeys = new Set();
const keyRegex = /^\s*['"]?([a-zA-Z0-9_\-()\s]+)['"]?\s*:/gm;
let match;
while ((match = keyRegex.exec(teluguBlock)) !== null) {
  teluguKeys.add(match[1].trim());
}

console.log(`Total Telugu Keys Loaded: ${teluguKeys.size}`);

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
const missingKeys = new Map();

const tRegex = /t\(\s*['"]([^'"]+)['"]/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let tMatch;
  while ((tMatch = tRegex.exec(content)) !== null) {
    const key = tMatch[1];
    if (!teluguKeys.has(key) && !key.startsWith('/') && key !== '.') {
      if (!missingKeys.has(key)) {
        missingKeys.set(key, []);
      }
      missingKeys.get(key).push(path.relative(srcDir, file));
    }
  }
}

console.log('=== MISSING TELUGU KEYS ===');
console.log(`Total Missing Keys: ${missingKeys.size}`);
for (const [key, files] of missingKeys.entries()) {
  console.log(`Key: "${key}" -> Files: ${[...new Set(files)].join(', ')}`);
}
