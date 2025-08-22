const fs = require('fs');
const path = require('path');

const rootDir = './src'; // Modify this to your source folder

const checkImports = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      checkImports(filePath);  // Recursively check directories
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
      let match;
      
      while ((match = importRegex.exec(fileContent)) !== null) {
        const importedFile = match[1];
        const absoluteImportedFile = path.join(dir, importedFile);

        // Check if the import file path exists with correct casing
        if (!fs.existsSync(absoluteImportedFile)) {
          console.error(`Case sensitivity error: ${importedFile} in ${filePath}`);
        }
      }
    }
  });
};

checkImports(rootDir);
