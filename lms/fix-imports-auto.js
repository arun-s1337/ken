// fix-all-imports.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function fixImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /import\s+(\w+)\s+from\s+['"](.+)['"]/g;

    content = content.replace(importRegex, (match, varName, importPath) => {
        // Ignore external modules
        if (!importPath.startsWith('.')) return match;

        const fullPath = path.join(path.dirname(filePath), importPath);

        if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
            const files = fs.readdirSync(fullPath);
            const jsxFile = files.find(f => f.endsWith('.jsx'));
            if (jsxFile) {
                const newPath = path.join(importPath, jsxFile.replace('.jsx', ''));
                console.log(`Updating import in ${filePath}: ${importPath} → ${newPath}`);
                return `import ${varName} from "${newPath}"`;
            }
        }

        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}

function traverseDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            fixImportsInFile(fullPath);
        }
    });
}

traverseDir(srcDir);
console.log('✅ All imports updated for all .jsx files!');
