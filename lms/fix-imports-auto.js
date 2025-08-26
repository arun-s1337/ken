const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "frontend", "src");

// Recursively get all .jsx and .js files
function getAllFiles(dir, extList, fileList = []) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, extList, fileList);
    } else if (extList.some((ext) => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const files = getAllFiles(srcDir, [".jsx", ".js"]);
const importRegex = /from\s+["'](\.\/[A-Za-z0-9_/]+)["']/g;

let createdCount = 0;

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const relPath = match[1].replace("./", "");
    const parts = relPath.split("/");
    const compName = parts[parts.length - 1];

    const compDir = path.join(srcDir, ...parts);
    const compFile = path.join(compDir, `${compName}.jsx`);

    if (!fs.existsSync(compDir)) {
      fs.mkdirSync(compDir, { recursive: true });
      console.log(`📂 Created folder: ${compDir}`);
    }

    if (!fs.existsSync(compFile)) {
      fs.writeFileSync(
        compFile,
        `import React from "react";

export default function ${compName}() {
  return (
    <div>
      <h2>${compName} Placeholder</h2>
    </div>
  );
}
`
      );
      console.log(`✅ Created placeholder: ${compFile}`);
      createdCount++;
    }
  }
});

console.log(`\n🎉 Import case-fixing complete. ${createdCount} placeholder(s) created.`);
