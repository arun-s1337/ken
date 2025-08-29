#!/usr/bin/env node
/**
 * fix-imports-auto.js
 * ---------------------------------------------------------
 * - Renames all files & folders in frontend/src to lowercase
 * - Fixes import paths in .js/.jsx/.ts/.tsx files accordingly
 * - Ensures case-sensitive consistency for Linux servers
 */

import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("lms/frontend/src");

// Recursively walk directory
function walkDir(dir, fileCallback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, fileCallback);
    } else {
      fileCallback(fullPath);
    }
  });
}

// Rename files & folders to lowercase
function renameToLowercase(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const oldPath = path.join(dir, entry.name);
    const newName = entry.name.toLowerCase();
    const newPath = path.join(dir, newName);

    if (entry.name !== newName) {
      fs.renameSync(oldPath, newPath);
      console.log(`📂 Renamed: ${entry.name} → ${newName}`);
    }

    if (entry.isDirectory()) renameToLowercase(newPath);
  });
}

// Fix import statements
function fixImports(file) {
  if (!/\.(jsx?|tsx?)$/.test(file)) return;

  let content = fs.readFileSync(file, "utf8");
  let updated = content.replace(
    /(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g,
    (match, start, importPath, end) => {
      const fixed = importPath.replace(/\/([^/]+)$/g, (m, segment) => {
        return "/" + segment.toLowerCase();
      });
      if (importPath !== fixed) {
        console.log(
          `✍️ Fixed import in ${file}: from '${importPath}' → from '${fixed}'`
        );
      }
      return start + fixed + end;
    }
  );

  if (updated !== content) {
    fs.writeFileSync(file, updated, "utf8");
  }
}

console.log("📂 Renaming files/folders to lowercase...");
renameToLowercase(SRC_DIR);

console.log("✍️ Fixing imports...");
walkDir(SRC_DIR, fixImports);

console.log("🎉 All filenames and imports fixed for case-sensitivity!");
