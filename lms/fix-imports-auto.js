const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "frontend/src");
const backupDir = path.join(__dirname, "backup_src");

// ✅ Step 1: Backup original src before changes
function backupSource(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach((f) => {
    const srcPath = path.join(src, f);
    const destPath = path.join(dest, f);
    if (fs.statSync(srcPath).isDirectory()) {
      backupSource(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log("📦 Creating backup...");
backupSource(rootDir, backupDir);
console.log(`✅ Backup complete → ${backupDir}`);


// ✅ Step 2: Rename files to lowercase
function fixCase(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const lower = base.toLowerCase();

  if (base !== lower) {
    const newPath = path.join(dir, lower);
    fs.renameSync(filePath, newPath);
    console.log(`Renamed: ${filePath} → ${newPath}`);
    return { old: base, new: lower };
  }
  return null;
}

// ✅ Walk through folders and fix filenames
function walkAndFix(dir, renamed = []) {
  fs.readdirSync(dir).forEach((f) => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walkAndFix(full, renamed);
    } else {
      const r = fixCase(full);
      if (r) renamed.push({ dir, ...r });
    }
  });
  return renamed;
}

// ✅ Step 3: Update import paths
function updateImports(filePath, renamed) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  renamed.forEach(({ old, new: newName }) => {
    const regex = new RegExp(`(['"./])${old.replace(/\./g, "\\.")}(?=['"])`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newName}`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed imports in: ${filePath}`);
  }
}

// ✅ Step 4: Walk through code files and fix imports
function fixAllImports(dir, renamed) {
  fs.readdirSync(dir).forEach((f) => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      fixAllImports(full, renamed);
    } else if (/\.(jsx?|tsx?|css)$/.test(f)) {
      updateImports(full, renamed);
    }
  });
}

// --- Run all fixes ---
console.log("📂 Renaming files...");
const renamed = walkAndFix(rootDir);

if (renamed.length > 0) {
  console.log("🔍 Fixing imports...");
  fixAllImports(rootDir, renamed);
}

console.log("🎉 Safe fix complete → files & imports updated!");
console.log("📦 Backup available at:", backupDir);
