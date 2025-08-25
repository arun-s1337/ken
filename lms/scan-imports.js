const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext, files = []) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, ext, files);
        } else if (fullPath.endsWith(ext)) {
            files.push(fullPath);
        }
    });
    return files;
}

function checkImportCase(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /import .* from ['"](.*)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let importPath = match[1];
        if (!importPath.startsWith('.')) continue; // only relative paths
        const resolvedPath = path.resolve(path.dirname(filePath), importPath);
        const dir = path.dirname(resolvedPath);
        const base = path.basename(resolvedPath);

        if (fs.existsSync(resolvedPath)) {
            const actualFiles = fs.readdirSync(dir);
            if (!actualFiles.includes(base)) {
                console.log(`Case mismatch in ${filePath}: "${importPath}" should be "${actualFiles.find(f => f.toLowerCase() === base.toLowerCase())}"`);
            }
        } else if (fs.existsSync(resolvedPath + '.jsx')) {
            // ok, skip
        } else {
            console.log(`File not found: ${importPath} in ${filePath}`);
        }
    }
}

// Run on all .js and .jsx files
const allFiles = [...getAllFiles('./src', '.js'), ...getAllFiles('./src', '.jsx')];
allFiles.forEach(checkImportCase);

console.log('Case-check completed.');
