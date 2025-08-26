// fix-imports-auto.js
// Node.js script to auto-fix import paths for Linux (case-sensitive)

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('./src'); // adjust if needed

// Get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// Fix import path casing
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /from ['"](.*)['"]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      const fullImportPath = path.resolve(path.dirname(filePath), importPath);
      try {
        const filesInDir = fs.readdirSync(path.dirname(fullImportPath));
        const correctFile = filesInDir.find(f =>
          f.toLowerCase() === path.basename(fullImportPath).toLowerCase()
        );
        if (correctFile && correctFile !== path.basename(fullImportPath)) {
          const correctedPath = path.join(path.dirname(importPath), correctFile)
            .replace(/\\/g, '/');
          content = content.replace(importPath, correctedPath);
          console.log(`Fixed import: ${importPath} → ${correctedPath} in ${filePath}`);
        }
      } catch {
        // ignore missing files
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

// Process all files
const allFiles = getAllFiles(SRC_DIR);
allFiles.forEach(fixImports);

console.log('🎉 All imports fixed for case-sensitivity!');
