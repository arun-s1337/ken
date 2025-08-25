// lms/fix-imports.js
import fs from "fs";
import path from "path";

const SRC_DIRS = ["lms/frontend/src", "lms/backend/src"];

function fixImports(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  function checkFile(filePath) {
    if (!fs.statSync(filePath).isFile()) return;
    if (!filePath.endsWith(".js") && !filePath.endsWith(".jsx")) return;

    let content = fs.readFileSync(filePath, "utf-8");
    let updated = content;

    const importRegex = /from\s+['"](\..*?)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      const absImportPath = path.resolve(path.dirname(filePath), importPath);
      const dirName = path.dirname(absImportPath);
      const baseName = path.basename(absImportPath);

      if (fs.existsSync(dirName)) {
        const realFiles = fs.readdirSync(dirName);
        const fixed = realFiles.find(
          f => f.toLowerCase() === baseName.toLowerCase()
        );
        if (fixed && fixed !== baseName) {
          console.log(`Fixing import in ${filePath}: ${importPath} → ${path.join(path.dirname(importPath), fixed)}`);
          updated = updated.replace(importPath, path.join(path.dirname(importPath), fixed));
        }
      }
    }

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, "utf-8");
    }
  }

  function walk(dirPath) {
    for (const f of fs.readdirSync(dirPath)) {
      const full = path.join(dirPath, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else {
        checkFile(full);
      }
    }
  }

  walk(dir);
}

// Run for frontend and backend
SRC_DIRS.forEach(fixImports);
console.log("Import case-sensitivity check complete.");
