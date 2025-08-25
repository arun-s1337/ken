const fs = require("fs");
const path = require("path");

// Absolute path to the src folder
const srcDir = path.join(__dirname, "../frontend/src"); // Adjust based on your Dockerfile context

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    console.error("Directory does not exist:", dirPath);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);
console.log("All files found:", allFiles.length);
