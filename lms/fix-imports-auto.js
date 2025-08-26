const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

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

const files = getAllFiles(srcDir, [".jsx", ".js"]);
const importRegex = /from\s+["'](\.\/[A-Za-z0-9_/]+)["']/g;

let createdCount = 0;

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const relPath = match[1].replace("./", "");
    const parts = relPath.split("/");
    const compName = parts[parts.length - 1];

    const compDir = path.join(srcDir
