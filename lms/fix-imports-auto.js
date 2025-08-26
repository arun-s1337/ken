// fix-imports-auto.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'frontend', 'src'); // adjust if needed

// Helper to rename files/folders to lowercase
function fixCase(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const lowerBase = base.toLowerCase();

  if (base !== lowerBase) {
    const newPath = path.join(dir, lowerBase);
    if (!fs.existsSync(newPath)) {
      fs.renameSync(filePath, newPath);
      console.log(`Renamed: ${filePath} → ${newPath}`);
    }
    return newPath;
  }
  return filePath;
}

// Recursively flatten folders
function flattenComponents(dir) {
  const items = fs.readdirSync(dir);

  for (let item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Flatten subfolders
      flattenComponents(fullPath);

      // Move all files up one level
      const subItems = fs.readdirSync(fullPath);
      for (let subItem of subItems) {
        const subPath = path.join(fullPath, subItem);
        const targetPath = path.join(dir, subItem);
        if (!fs.existsSync(targetPath)) {
          fs.renameSync(subPath, targetPath);
        } else {
          console.warn(`Skipped (exists): ${targetPath}`);
        }
      }

      // Remove empty folder
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }

      // Fix folder name case
      fixCase(fullPath);
    } else {
      // Fix file name case
      fixCase(fullPath);
    }
  }
}

// Update import paths in .jsx/.js files
function updateImports(dir) {
  const items = fs.readdirSync(dir);

  for (let item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      updateImports(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const regex = /(['"])(\.\/|..\/).*?\/([A-Za-z0-9_-]+)\1/g;

      content = content.replace(regex, (match, quote, start, lastPart) => {
        const parts = match.split('/');
        const fixedParts = parts.map(p => p.replace(/([A-Za-z0-9_-]+)/g, m => m.toLowerCase()));
        return fixedParts.join('/');
      });

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

console.log('📂 Flattening and fixing component folders...');
flattenComponents(ROOT_DIR);
console.log('✅ Flattening complete.');

console.log('🔄 Updating all import paths...');
updateImports(ROOT_DIR);
console.log('🎉 All imports fixed successfully.');
