const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Replace imports to correct case
function fixImports() {
  const srcPath = path.join(__dirname, '../frontend/src');

  if (!fs.existsSync(srcPath)) {
    console.error('Directory does not exist:', srcPath);
    process.exit(1);
  }

  const allFiles = getAllFiles(srcPath);

  allFiles.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(file, 'utf-8');

      // Simple regex fix: replace "Landingpage" -> "LandingPage", etc.
      content = content.replace(/Landingpage/g, 'LandingPage');
      content = content.replace(/Blog\/AddBlog/g, 'Blog/Addblog');

      fs.writeFileSync(file, content, 'utf-8');
    }
  });
}

fixImports();
console.log('Imports fixed successfully.');
