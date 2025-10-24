// update-badges.js (template-based)
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const templatePath = path.resolve("./README.template.md");
const outputPath = path.resolve("./README.md");

// Helper to safely run commands
const runCmd = (cmd, fallback = "unknown") => {
  try { return execSync(cmd, { encoding: "utf8" }).trim(); }
  catch { return fallback; }
};

// Get current versions
const replacements = {
  "{{RUBY_VERSION}}": runCmd("ruby -v").split(" ")[1],
  "{{JEKYLL_VERSION}}": runCmd("jekyll -v").split(" ")[1],
  "{{NODE_VERSION}}": runCmd("node -v").replace(/^v/, ""),
  "{{NPM_VERSION}}": runCmd("npm -v"),
  "{{LAST_UPDATED}}": new Date().toISOString().slice(0,10).replace(/-/g,"--")
};

// Read template
let template = fs.readFileSync(templatePath, "utf8");

// Replace placeholders
for (const [placeholder, value] of Object.entries(replacements)) {
  template = template.replaceAll(placeholder, value);
}

// Write final README.md
fs.writeFileSync(outputPath, template, "utf8");

console.log("✅ README.md badges updated from template successfully.");