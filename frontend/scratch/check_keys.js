const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/Kanchana/Desktop/SIH Thinkers/frontend/src';

// Read LanguageContext.tsx
const langContextPath = path.join(srcDir, 'context/LanguageContext.tsx');
const langContextContent = fs.readFileSync(langContextPath, 'utf8');

// Extract Telugu block
const teluguMatch = langContextContent.match(/Telugu:\s*\{([\s\S]*?)\},\s*\n\s*Hindi:/);
if (!teluguMatch) {
  console.error('Could not find Telugu block');
  process.exit(1);
}

const teluguBlock = teluguMatch[1];
const teluguKeys = new Set();
const keyRegex = /['"]?([a-zA-Z0-9_\-()\s]+)['"]?\s*:/g;
let match;
while ((match = keyRegex.exec(teluguBlock)) !== null) {
  teluguKeys.add(match[1].trim());
}

// Find all t('key') or t("key") in src files
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
    if (!teluguKeys.has(key)) {
      if (!missingKeys.has(key)) {
        missingKeys.set(key, []);
      }
      missingKeys.get(key).push(path.relative(srcDir, file));
    }
  }
}

console.log('=== MISSING TELUGU KEYS ===');
for (const [key, files] of missingKeys.entries()) {
  console.log(`Key: "${key}" -> Files: ${[...new Set(files)].join(', ')}`);
}
