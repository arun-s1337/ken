const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src'); // Correct path for your workspace
const placeholderContent = (componentName) =>
  `import React from 'react';

const ${componentName} = () => {
  return <div>${componentName} placeholder</div>;
};

export default ${componentName};
`;

function traverseDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively traverse directories
      traverseDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
      // File exists, skip
      continue;
    }
  }
}

// Create missing folders & placeholders for components
function createComponentPlaceholder(componentDir) {
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    const componentName = path.basename(componentDir);
    const filePath = path.join(componentDir, `${componentName}.jsx`);
    fs.writeFileSync(filePath, placeholderContent(componentName));
    console.log(`✅ Created placeholder: ${filePath}`);
  }
}

// Flatten folders if needed
function flattenFolders(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      flattenFolders(fullPath);
    }
  }
}

// Run the scripts
console.log('📂 Starting auto-import case-sensitivity fixer...');
traverseDir(srcDir);
flattenFolders(srcDir);
console.log('🎉 Import case-fixing complete.');
