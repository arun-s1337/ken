const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "frontend", "src");

// Recursively get all .jsx and .js files
function getAllFiles(dir, extList, fileList = []) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, extList, fileList);
    } else if (extList.some((ext) => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Case-insensitive file search
function findFileInsensitive(dir, targetFile) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  const match = files.find(
    (f) => f.toLowerCase() === targetFile.toLowerCase()
  );
  return match ? path.join(dir, match) : null;
}

const files = getAllFiles(srcDir, [".jsx", ".js"]);
const importRegex = /from\s+["'](\.\/[A-Za-z0-9_/]+)["']/g;

let fixedImports = 0;
let createdPlaceholders = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  let modified = false;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const relPath = match[1].replace("./", "");
    const parts = rel
