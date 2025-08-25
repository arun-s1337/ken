const fs = require("fs");
const path = require("path");

// Base directory for scanning
const baseDir = path.join(__dirname, "../src"); // Points to your src folder

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function checkImports() {
  const allFiles = getAllFiles(baseDir);

  allFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const regex = /import\s+.*\s+from\s+['"](.*)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const importPath = match[1];
      const resolvedPath = path.resolve(path.dirname(filePath), importPath);
      const jsPath = resolvedPath + ".js";
      const jsxPath = resolvedPath + ".jsx";
      const indexJsPath = path.join(resolvedPath, "index.js");
      const indexJsxPath = path.join(resolvedPath, "index.jsx");

      if (
        !fs.existsSync(jsPath) &&
        !fs.existsSync(jsxPath) &&
        !fs.existsSync(indexJsPath) &&
        !fs.existsSync(indexJsxPath)
      ) {
        console.error(`Missing import in ${filePath}: ${importPath}`);
      }
    }
  });
  console.log("Import scan complete!");
}

checkImports();
