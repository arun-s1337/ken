const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'frontend', 'src'); // adjust if needed

// Move all files up (flatten) and remove empty folders
function flattenComponents(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      flattenComponents(fullPath); // recursive flatten

      const subItems = fs.readdirSync(fullPath);
      for (const subItem of subItems) {
        const subPath = path.join(fullPath, subItem);
        const targetPath = path.join(dir, subItem);
        if (!fs.existsSync(targetPath)) {
          fs.renameSync(subPath, targetPath);
        } else {
          console.warn(`Skipped (exists): ${targetPath}`);
        }
      }

      // Remove empty folder
      if (fs.existsSync(fullPath) && fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
    }
  }
}

// Fix file/folder names to lowercase **after flattening**
function fixCaseRecursive(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      fixCaseRecursive(fullPath);

      const lower = item.toLowerCase();
      const newPath = path.join(dir, lower);
      if (item !== lower && !fs.existsSync(newPath)) {
        fs.renameSync(fullPath, newPath);
        console.log(`Folder renamed: ${fullPath} → ${newPath}`);
      }
    } else {
      const lower = item.toLowerCase();
      const newPath = path.join(dir, lower);
      if (item !== lower && !fs.existsSync(newPath)) {
        fs.renameSync(fullPath, newPath);
        console.log(`File renamed: ${fullPath} → ${newPath}`);
      }
    }
  }
}

// Update import paths in .jsx/.js files
function updateImports(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      updateImports(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/(['"])(\..*?\/)([A-Za-z0-9_-]+)\1/g, (match, quote, start, lastPart) => {
        return `${quote}${start}${lastPart.toLowerCase()}${quote}`;
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

console.log('📂 Flattening component folders...');
flattenComponents(ROOT_DIR);
console.log('✅ Flattening complete.');

console.log('🔧 Fixing file and folder case...');
fixCaseRecursive(ROOT_DIR);
console.log('✅ Case fixing complete.');

console.log('🔄 Updating all import paths...');
updateImports(ROOT_DIR);
console.log('🎉 All imports fixed successfully.');
