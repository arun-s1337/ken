// lms/fix-imports.js
import fs from "fs";
import path from "path";

function fixImports(dir) {
  if (!fs.existsSync(dir)) return;

  function checkFile(file) {
    if (!file.endsWith(".js") && !file.endsWith(".jsx")) return;
    let content = fs.readFileSync(file, "utf-8");
    let updated = content;

    const regex = /from\s+['"](\..*?)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const importPath = match[1];
      const abs = path.resolve(path.dirname(file), importPath);
      const dirName = path.dirname(abs);
      const baseName = path.basename(abs);

      if (fs.existsSync(dirName)) {
        const realFiles = fs.readdirSync(dirName);
        const fixed = realFiles.find(f => f.split(".")[0].toLowerCase() === baseName.toLowerCase());
        if (fixed && fixed !== baseName) {
          updated = updated.replace(importPath, path.join(path.dirname(importPath), fixed));
          console.log(`Fixed import in ${file}: ${importPath} → ${fixed}`);
        }
      }
    }

    if (updated !== content) {
      fs.writeFileSync(file, updated, "utf-8");
    }
  }

  function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else checkFile(full);
    }
  }

  walk(dir);
}

// Run for frontend src only
fixImports("lms/frontend/src");
