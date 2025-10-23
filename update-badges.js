import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Path to root README.md
const readmePath = path.resolve("./README.md");
let readme = fs.readFileSync(readmePath, "utf-8");

// Helper to run shell commands and trim output
const runCmd = (cmd) => execSync(cmd, { encoding: "utf-8" }).trim();

// Get versions
const rubyVersion = runCmd("ruby -v").split(" ")[1];      // e.g., "3.4.6"
const jekyllVersion = runCmd("jekyll -v").split(" ")[1];  // e.g., "4.4.1"
const nodeVersion = runCmd("node -v").replace(/^v/, "");  // e.g., "22.19.0"
const npmVersion = runCmd("npm -v");                      // e.g., "11.6.2"

// Get current date
const today = new Date();
const formattedDate = `${today.getFullYear()}--${String(today.getMonth() + 1).padStart(2, "0")}--${String(today.getDate()).padStart(2, "0")}`;

// Replace badges in README.md
readme = readme.replace(
  /(<img src="https:\/\/img\.shields\.io\/badge\/Ruby-[^"]+")/,
  `<img src="https://img.shields.io/badge/Ruby-${rubyVersion}-cc342d?logo=ruby&logoColor=white"`
);
readme = readme.replace(
  /(<img src="https:\/\/img\.shields\.io\/badge\/Jekyll-[^"]+")/,
  `<img src="https://img.shields.io/badge/Jekyll-${jekyllVersion}-f06529?logo=jekyll&logoColor=white"`
);
readme = readme.replace(
  /(<img src="https:\/\/img\.shields\.io\/badge\/Node-[^"]+")/,
  `<img src="https://img.shields.io/badge/Node-${nodeVersion}-339933?logo=node.js&logoColor=white"`
);
readme = readme.replace(
  /(<img src="https:\/\/img\.shields\.io\/badge\/npm-[^"]+")/,
  `<img src="https://img.shields.io/badge/npm-${npmVersion}-blue?logo=npm&logoColor=white"`
);
readme = readme.replace(
  /(<img src="https:\/\/img\.shields\.io\/badge\/Last_Updated-[^"]+")/,
  `<img src="https://img.shields.io/badge/Last_Updated-${formattedDate}-lightgrey?logo=github&logoColor=white"`
);

// Write updated README.md
fs.writeFileSync(readmePath, readme);
console.log("✅ README.md badges updated successfully.");