// fix-imports-auto-vite.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'frontend/src'); // adjust if needed

function flattenComponents(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const nestedItems = fs.readdirSync(fullPath);
      
      // If folder has only one JS/JSX file matching its name, move it up
      nestedItems.forEach((nested) => {
        const nestedFull = path.join(fullPath, nested);
        if (fs.statSync(nestedFull).isFile() && (nested.endsWith('.jsx') || nested.endsWith('.js'))) {
          const newName = item + path.extname(nested); // folder name + .jsx
          const targetPath = path.join(dir, newName);
          fs.renameSync(nestedFull, targetPath);
        }
      });

      // Remove empty folder
      const remaining = fs.readdirSync(fullPath);
      if (remaining.length === 0) fs.rmdirSync(fullPath);

      // Recurse
      flattenComponents(dir);
    }
  });
}

function updateImports(dir) {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      updateImports(fullPath);
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(/from\s+['"](.+)\/\1['"]/g, 'from "$1/$1"'); // auto-fix same-name imports
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

console.log('📂 Flattening component folders...');
flattenComponents(SRC_DIR);
console.log('✅ Flattening complete.');
console.log('🔄 Updating import paths...');
updateImports(SRC_DIR);
console.log('🎉 All imports fixed successfully.');
