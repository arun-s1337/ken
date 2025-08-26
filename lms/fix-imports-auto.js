// safe-fix-imports.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src');

// Flatten component folders safely
function flattenComponents(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            const subItems = fs.readdirSync(fullPath);
            for (const subItem of subItems) {
                const subPath = path.join(fullPath, subItem);
                const newPath = path.join(dir, subItem);
                if (!fs.existsSync(newPath)) {
                    fs.renameSync(subPath, newPath);
                }
            }
            // Remove old folder if empty
            if (fs.existsSync(fullPath) && fs.readdirSync(fullPath).length === 0) {
                fs.rmdirSync(fullPath);
            }
            // Do not recursively call flattenComponents on same dir
        }
    }
}

// Update all imports in JS/JSX files
function updateImports(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            updateImports(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            content = content.replace(/(\.\/[\w\/]+)\/\1/g, '$1'); // fix duplicate folder names
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
