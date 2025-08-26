// fix-imports-auto-vite-full.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'frontend/src'); // adjust if needed

// Flatten all nested folders: move JS/JSX files up and match folder name
function flattenAll(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      flattenAll(fullPath); // recursive first

      // check for JS/JSX files
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
      files.forEach(file => {
        const oldFile = path.join(fullPath, file);
        const newFileName = item + path.extname(file); // parent folder name
        const newFile = path.join(dir, newFileName);
        fs.renameSync(oldFile, newFile);
      });

      // remove empty folder
      const remaining = fs.readdirSync(fullPath);
      if (remaining.length === 0) fs.rmdirSync(fullPath);
    }
  });
}

// Update all import paths to match flattened files
function updateImports(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      updateImports(fullPath);
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Replace imports like './Folder/Folder' → './Folder'
      content = content.replace(/from\s+['"](\.\/[\w\d_-]+)\/\1['"]/g, 'from "$1"');

      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

console.log('📂 Flattening all component folders...');
flattenAll(SRC_DIR);
console.log('✅ Flattening complete.');
console.log('🔄 Updating all import paths...');
updateImports(SRC_DIR);
console.log('🎉 All imports fixed successfully.');
