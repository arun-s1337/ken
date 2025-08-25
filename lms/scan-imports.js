// lms/scan-imports.js

import fs from 'fs';
import path from 'path';

function scanAndFixImports(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory does not exist: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanAndFixImports(fullPath);
    } else if (entry.isFile() && /\.(jsx?|tsx?)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let updated = false;

      const regex = /import\s+.*?from\s+['"](.*?)['"]/g;
      let match;

      while ((match = regex.exec(content)) !== null) {
        const importPath = match[1];

        // Only fix relative imports (./ or ../)
        if (importPath.startsWith('.')) {
          const importDir = path.dirname(fullPath);
          const targetFullPath = path.resolve(importDir, importPath);

          // Get actual files/folders in the directory
          const files = fs.readdirSync(path.dirname(targetFullPath));

          const actual = files.find(f => f.toLowerCase() === path.basename(targetFullPath).toLowerCase());

          if (actual && actual !== path.basename(targetFullPath)) {
            const correctedPath = importPath.replace(path.basename(importPath), actual);
            console.log(`🔧 Fixing import in ${fullPath}: ${importPath} -> ${correctedPath}`);

            content = content.replace(importPath, correctedPath);
            updated = true;
          }
        }
      }

      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

// Correct path for your repo
const projectDir = path.resolve(process.cwd(), 'lms/frontend/src');

console.log(`🔍 Scanning and fixing imports in: ${projectDir}`);
scanAndFixImports(projectDir);
console.log('Import scan & fix complete.');
