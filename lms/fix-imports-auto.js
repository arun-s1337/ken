const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "frontend/src"); // adjust if your src is elsewhere

function flattenComponentFolders(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // If folder contains exactly one folder and one JSX file nested, flatten it
      const nestedItems = fs.readdirSync(fullPath);

      const nestedFolders = nestedItems.filter((f) =>
        fs.statSync(path.join(fullPath, f)).isDirectory()
      );

      const nestedFiles = nestedItems.filter((f) =>
        fs.statSync(path.join(fullPath, f)).isFile()
      );

      if (nestedFolders.length === 1 && nestedFiles.length === 0) {
        const nestedFolderPath = path.join(fullPath, nestedFolders[0]);
        const nestedFolderFiles = fs.readdirSync(nestedFolderPath);

        nestedFolderFiles.forEach((file) => {
          const oldFilePath = path.join(nestedFolderPath, file);
          const newFilePath = path.join(fullPath, file);

          fs.renameSync(oldFilePath, newFilePath);
          console.log(`Moved: ${oldFilePath} → ${newFilePath}`);
        });

        fs.rmdirSync(nestedFolderPath);
        console.log(`Removed empty folder: ${nestedFolderPath}`);
      }

      // Recursively process subfolders
      flattenComponentFolders(fullPath);
    }
  });
}

flattenComponentFolders(srcDir);
console.log("✅ All component folders flattened successfully!");
