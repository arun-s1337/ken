const fs = require("fs");
const path = require("path");

// ✅ Rename a file to lowercase if needed
function fixCase(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const lower = base.toLowerCase();

  if (base !== lower) {
    const newPath = path.join(dir, lower);
    fs.renameSync(filePath, newPath);
    console.log(`Renamed: ${filePath} → ${newPath}`);
  }
}

// ✅ Walk through directories but DO NOT rename folders
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      // 👇 just go inside, don’t rename folder
      walk(full);
    } else {
      fixCase(full);
    }
  });
}

// Run fixer
const rootDir = path.join(__dirname, "frontend/src");
walk(rootDir);

console.log("🎉 All file names fixed to lowercase (folders left unchanged)!");
