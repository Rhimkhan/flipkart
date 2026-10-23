const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const dirsToScan = ['src', 'public'];

const forbiddenTerms = [
  'gradient',
  'animate-pulse',
  'animate-ping',
  'Atelier',
  'Collector',
  'Batch No',
  'cold-pressed',
  'stone-ground',
  'Pan-India',
  'Made with',
  'Powered by',
  'Solan',
  'Himalayan',
  'akhilfoods.com',
  '9876543210',
  '6966558899'
];

// Special checks:
// 1. "rounded-full" on buttons/badges/chips (let's check all occurrences of rounded-full)
// 2. emoji characters
// 3. em dash '—' (\u2014) and en dash '–' (\u2013)

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;
const dashRegex = /[\u2013\u2014]/;

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

let allFiles = [];
for (const dir of dirsToScan) {
  const targetDir = path.join(projectRoot, dir);
  if (fs.existsSync(targetDir)) {
    allFiles = allFiles.concat(getAllFiles(targetDir));
  }
}

// Filter to text files only for term searches (skip binary image files)
const textExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.svg', '.txt', '.md'];
const textFiles = allFiles.filter(f => textExtensions.includes(path.extname(f).toLowerCase()));

const results = {};
forbiddenTerms.forEach(t => results[t] = []);
results['rounded-full'] = [];
results['emoji'] = [];
results['dash'] = [];

for (const file of textFiles) {
  const relPath = path.relative(projectRoot, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    forbiddenTerms.forEach(term => {
      // Case insensitive check
      const regex = new RegExp(term, 'i');
      if (regex.test(line)) {
        results[term].push({ file: relPath, line: lineNum, text: line.trim() });
      }
    });

    if (line.includes('rounded-full')) {
      results['rounded-full'].push({ file: relPath, line: lineNum, text: line.trim() });
    }

    if (emojiRegex.test(line)) {
      results['emoji'].push({ file: relPath, line: lineNum, text: line.trim() });
    }

    if (dashRegex.test(line)) {
      results['dash'].push({ file: relPath, line: lineNum, text: line.trim() });
    }
  });
}

console.log('=== PHASE 4 VERIFICATION RESULTS ===');
let totalViolations = 0;

for (const [key, matches] of Object.entries(results)) {
  console.log(`\n[TERM]: "${key}" -> Matches: ${matches.length}`);
  if (matches.length > 0) {
    totalViolations += matches.length;
    matches.forEach(m => {
      console.log(`  - ${m.file}:${m.line} -> ${m.text}`);
    });
  }
}

console.log(`\n===================================`);
console.log(`TOTAL DETECTED: ${totalViolations}`);
console.log(`===================================`);
