// fix-imports-auto.js
const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "frontend/src");

/**
 * Convert a string to lowercase safe form
 */
function toSafeCase(str) {
  return str.toLowerCase();
}

/**
 * Recursively rename files & folders to lowercase
 */
function fixCase(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    const newName = toSafeCase(entry.name);
    const newPath = path.join(dir, newName);

    // If name differs, rename
    if (entry.name !== newName) {
      try {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldPath} → ${newPath}`);
      } catch (err) {
        console.error(`❌ Rename failed for ${oldPath}: ${err.message}`);
      }
    }

    // Recurse if directory
    if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
      fixCase(newPath);
    }
  }
}

/**
 * Fix imports inside JS/JSX/TS/TSX files
 */
function fixImports(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Fix `import` and `require`
  content = content.replace(
    /(from\s+["']\.\/[^"']+["']|require\(["']\.\/[^"']+["']\))/g,
    (match) => {
      const fixed = match.replace(/([A-Z])/g, (m) => m.toLowerCase());
      if (fixed !== match) {
        console.log(`Fixed import in ${filePath}: ${match} → ${fixed}`);
        changed = true;
        return fixed;
      }
      return match;
    }
  );

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
  }
}

/**
 * Walk through all source files
 */
function walkAndFixImports(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkAndFixImports(fullPath);
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      fixImports(fullPath);
    }
  }
}

// === RUN STEPS ===
console.log("📂 Renaming files/folders to lowercase...");
fixCase(SRC_DIR);

console.log("✍️ Fixing imports...");
walkAndFixImports(SRC_DIR);

console.log("🎉 All filenames and imports fixed for case-sensitivity!");
