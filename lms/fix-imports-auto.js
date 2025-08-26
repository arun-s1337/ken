const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "frontend", "src"); // adjust if needed

// Folders that should always be lowercase
const ASSET_FOLDERS = ["assets", "images", "img", "styles", "css", "public", "icons"];

/**
 * Normalize file/folder name
 */
function normalizeName(name, isDir, parent) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);

  // Always lowercase for known asset folders
  if (isDir && ASSET_FOLDERS.includes(name.toLowerCase())) {
    return name.toLowerCase();
  }

  // Inside asset folders: force lowercase everything
  if (ASSET_FOLDERS.includes(parent?.toLowerCase())) {
    return base.toLowerCase() + ext.toLowerCase();
  }

  if (isDir) {
    // For component folders: preserve PascalCase (Navbar, HeroSection, etc.)
    return /^[A-Z]/.test(name) ? name : name.toLowerCase();
  }

  // Components: PascalCase preserved, lowercase extension
  if ((ext === ".jsx" || ext === ".js") && /^[A-Z]/.test(base)) {
    return base + ext.toLowerCase();
  }

  // Otherwise force lowercase
  return base.toLowerCase() + ext.toLowerCase();
}

/**
 * Recursively rename files/folders consistently
 */
function renameRecursive(dir, parent = null) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    const newName = normalizeName(item, stats.isDirectory(), parent);
    const newPath = path.join(dir, newName);

    if (item !== newName) {
      console.log(`Renaming: ${fullPath} → ${newPath}`);
      fs.renameSync(fullPath, newPath);
    }

    if (stats.isDirectory()) {
      renameRecursive(newPath, newName);
    }
  }
}

/**
 * Fix all import paths inside .js/.jsx/.ts/.tsx files
 */
function fixImports(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      fixImports(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
      let content = fs.readFileSync(fullPath, "utf8");

      content = content.replace(
        /(['"])(\..*?)\1/g,
        (match, quote, relPath) => {
          const fixed = relPath
            .split("/")
            .map((seg) => {
              if (!seg) return seg;
              // Asset-like folders or filenames → lowercase
              if (ASSET_FOLDERS.includes(seg.toLowerCase()) || seg.includes(".")) {
                return seg.toLowerCase();
              }
              // React components → preserve PascalCase
              if (/^[A-Z]/.test(seg)) return seg;
              return seg.toLowerCase();
            })
            .join("/");
          return `${quote}${fixed}${quote}`;
        }
      );

      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}

console.log("📂 Flattening and fixing component & asset folders...");
renameRecursive(ROOT);
console.log("✅ Renaming complete.");

console.log("🔄 Updating all import paths...");
fixImports(ROOT);
console.log("🎉 All imports fixed successfully.");
