const fs = require('fs');
const path = require('path');

// Set the correct frontend src directory
const srcDir = path.join(__dirname, 'frontend/src'); // __dirname points to lms folder

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    console.error('Directory does not exist:', dirPath);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Run the script
const allFiles = getAllFiles(srcDir);
console.log('Found files:', allFiles.length);
