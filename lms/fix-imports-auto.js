#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'frontend/src');

// Recursively get all JS/JSX files
function getAllJSFiles(dir) {
    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files = files.concat(getAllJSFiles(fullPath));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            files.push(fullPath);
        }
    });
    return files;
}

// Scan imports in a file
function getImports(file) {
    const content = fs.readFileSync(file, 'utf-8');
    const regex = /import\s+.*?from\s+['"](.*?)['"]/g;
    const imports = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

// Fix file/folder names
function fixImportPaths() {
    const files = getAllJSFiles(SRC_DIR);

    files.forEach(file => {
        const imports = getImports(file);

        imports.forEach(imp => {
            if (!imp.startsWith('.')) return; // skip node_modules

            const importerDir = path.dirname(file);
            const importPath = path.resolve(importerDir, imp);
            const expectedParts = importPath.split(path.sep);

            let current = path.isAbsolute(importPath) ? path.sep : '';
            for (let i = 1; i < expectedParts.length; i++) {
                const part = expectedParts[i];
                const parentDir = path.join(current, ...expectedParts.slice(1, i));
                if (!fs.existsSync(parentDir)) continue;

                const entries = fs.readdirSync(parentDir);
                const match = entries.find(e => e.toLowerCase() === part.toLowerCase());
                if (match && match !== part) {
                    const oldPath = path.join(parentDir, match);
                    const newPath = path.join(parentDir, part);
                    console.log(`🔧 Renaming: ${oldPath} → ${newPath}`);
                    fs.renameSync(oldPath, newPath);
                }
                current = path.join(parentDir, part);
            }
        });
    });

    console.log('✅ Import case-fixing complete.');
}

fixImportPaths();
