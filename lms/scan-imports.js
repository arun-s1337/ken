const fs = require('fs');
const path = require('path');

function checkImports(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            checkImports(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const regex = /import\s+.*\s+from\s+['"](.*)['"]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                let impPath = match[1];
                if (!impPath.startsWith('.') && !impPath.startsWith('/')) continue;

                const resolved = path.resolve(path.dirname(fullPath), impPath);
                if (!fs.existsSync(resolved) && !fs.existsSync(resolved + '.js') && !fs.existsSync(resolved + '.jsx')) {
                    console.error(`Import missing: ${impPath} in ${fullPath}`);
                }
            }
        }
    });
}

['frontend/src', 'backend/src', 'backend/db'].forEach(dir => {
    console.log(`Scanning ${dir}...`);
    checkImports(path.join(__dirname, dir));
});
