// fix-all-imports.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src');

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        }
    }
}

// Flatten component folders and rename
function flattenComponents(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const subItems = fs.readdirSync(fullPath);
            // If nested folder has same name, flatten it
            subItems.forEach(subItem => {
                const subPath = path.join(fullPath, subItem);
                const newPath = path.join(dir, subItem);
                if (fs.existsSync(subPath) && !fs.existsSync(newPath)) {
                    fs.renameSync(subPath, newPath);
                }
            });
            // Remove old empty folder
            if (fs.existsSync(fullPath) && fs.readdirSync(fullPath).length === 0) {
                fs.rmdirSync(fullPath, { recursive: true });
            }
            flattenComponents(dir); // Re-run for updated structure
        }
    }
}

// Update all imports
function updateImports(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            updateImports(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            // Replace backslashes and double folder names
            content = content.replace(/(\.\/[\w\/]+)\/\1/g, '$1');
            fs.writeFileSync(fullPath, content, 'utf-8');
        }
    }
}

console.log('📂 Flattening component folders...');
flattenComponents(srcDir);
console.log('✅ Flattening complete.');

console.log('🔄 Updating import paths...');
updateImports(srcDir);
console.log('🎉 All imports fixed successfully.');
