const fs = require('fs');
const path = require('path');

/**
 * Recursively scan a directory for files with a given extension
 * @param {string} dir - directory path
 * @param {string[]} exts - array of extensions ['.js', '.jsx']
 * @param {string[]} files - accumulator array
 * @returns {string[]} - list of files
 */
function getAllFiles(dir, exts, files = []) {
  if (!fs.existsSync(dir)) return files;

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, exts, files);
    } else if (exts.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  });

  return files;
}

// Define src directories for frontend and backend
const srcDirs = [
  path.join(__dirname, 'frontend/src'),
  path.join(__dirname, 'backend/src')
];

srcDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = getAllFiles(dir, ['.js', '.jsx']);
    console.log(`\nFound ${files.length} JS/JSX files in ${dir}:`);
    files.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log(`\nSkipping, directory not found: ${dir}`);
  }
});

console.log('\n Scan complete.');
