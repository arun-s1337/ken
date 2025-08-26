const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "frontend", "src");
const APP_FILE = path.join(SRC_DIR, "App.jsx");

function ensureComponentFile(componentName) {
  const folderPath = path.join(SRC_DIR, "Landingpage", componentName);
  const filePath = path.join(folderPath, `${componentName}.jsx`);
  const indexFile = path.join(folderPath, "index.jsx");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }

  if (fs.existsSync(indexFile) && !fs.existsSync(filePath)) {
    // Prefer using index.jsx
    console.log(`Found index.jsx for ${componentName}, fixing imports...`);
    return "index";
  }

  if (!fs.existsSync(filePath)) {
    // Create placeholder component
    const placeholder = `
      import React from "react";

      const ${componentName} = () => {
        return (
          <div>
            <h2>${componentName} placeholder</h2>
          </div>
        );
      };

      export default ${componentName};
    `;
    fs.writeFileSync(filePath, placeholder.trim());
    console.log(`Created placeholder: ${filePath}`);
  }

  return componentName;
}

function fixAppImports() {
  if (!fs.existsSync(APP_FILE)) {
    console.error(`App.jsx not found at: ${APP_FILE}`);
    process.exit(1);
  }

  let appContent = fs.readFileSync(APP_FILE, "utf8");
  const components = [
    "Navbar",
    "HeroSection",
    "Footer",
    "Banner",
    "Course",
    "OurVideos",
    "Author",
    "BuyingBook",
    "LatestBook",
    "Youtube",
    "Expert",
    "Studies",
    "Lift",
    "SpeakerCard",
  ];

  components.forEach((comp) => {
    const status = ensureComponentFile(comp);

    if (status === "index") {
      // Replace "./Landingpage/Comp/Comp" → "./Landingpage/Comp"
      const regex = new RegExp(`\\./Landingpage/${comp}/${comp}`, "g");
      appContent = appContent.replace(regex, `./Landingpage/${comp}`);
    } else {
      // Keep "./Landingpage/Comp/Comp"
      // If missing, placeholder was created above
    }
  });

  fs.writeFileSync(APP_FILE, appContent);
  console.log("App.jsx imports fixed!");
}

fixAppImports();
