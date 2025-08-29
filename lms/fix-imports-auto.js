// fix-imports-auto.js
const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "frontend/src");

/**
 * Convert to safe lowercase
 */
function toSafeCase(str) {
  return str.toLowerCase();
}

/**
 * Recursively rename files & folders to lowercase
 * (safe rename: via temp file if case-insensitive FS)
 */
function fixCase(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    const newName = toSafeCase(entry.name);
    const newPath = path.join(dir, newName);

    if (entry.name !== newName) {
      try {
        const tempPath = oldPath + "_tmp";
        fs.renameSync(oldPath, tempPath);
        fs.renameSync(tempPath, newPath);
        console.log(`Renamed: ${oldPath} → ${newPath}`);
      } catch (err) {
        console.error(`❌ Rename failed for ${oldPath}: ${err.message}`);
      }
    }

    if (entry.isDirectory()) {
      fixCase(newPath);
    }
  }
}

/**
 * Fix imports inside source files
 */
function fixImports(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Fix "from './...' or '../...'"
  content = content.replace(
    /(from\s+["'](\.\/|\.\.\/)[^"']+["'])/g,
    (match) => {
      const fixed = match.toLowerCase();
      if (fixed !== match) {
        console.log(`Fixed import in ${filePath}: ${match} → ${fixed}`);
        changed = true;
        return fixed;
      }
      return match;
    }
  );

  // Fix dynamic imports: import("./...") or import("../...")
  content = content.replace(
    /(import\(\s*["'](\.\/|\.\.\/)[^"']+["']\s*\))/g,
    (match) => {
      const fixed = match.toLowerCase();
      if (fixed !== match) {
        console.log(`Fixed dynamic import in ${filePath}: ${match} → ${fixed}`);
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
 * Walk through all files and fix imports
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

// === RUN ===
console.log("📂 Renaming files & folders to lowercase...");
fixCase(SRC_DIR);

console.log("✍️ Fixing imports...");
walkAndFixImports(SRC_DIR);

console.log("🎉 Done! All filenames and imports are now lowercase.");
