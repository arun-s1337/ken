// lms/scan-imports.js
const fs = require('fs');
const path = require('path');

// Folders to scan inside lms
const rootDirs = ['frontend', 'backend'];

const checkImports = (dir) => {
    if (!fs.existsSync(dir)) {
        console.warn(`Warning: Directory does not exist: ${dir}`);
        return;
    }

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            checkImports(filePath); // Recursively check directories
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
            let match;

            while ((match = importRegex.exec(fileContent)) !== null) {
                const importedFile = match[1];
                const absoluteImportedFile = path.join(path.dirname(filePath), importedFile);

                if (!fs.existsSync(absoluteImportedFile)) {
                    console.error(`Case sensitivity error: ${importedFile} in ${filePath}`);
                }
            }
        }
    });
};

// Run check for each folder
rootDirs.forEach((dir) => checkImports(path.join(__dirname, dir)));

console.log('Case sensitivity check completed!');
