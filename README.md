<!-- ⚙️ TEMPLATE NOTICE ⚙️
The README.template.md file is the source template used to generate README.md.
The script update-badges.js replaces placeholders like `LAST_UPDATED`, `RUBY_VERSION`, etc.
⚠️ Do NOT edit README.md directly — it is automatically overwritten.
Only edit README.template.md file if you want to change content or badge layout. -->

Personal cybersecurity & growth website + open-source CyberShark Jekyll theme with hacker/cyberpunk aesthetic.

# Nima’s Website ⚔

<!-- Website Features / Core -->
<p align="center">
  <!-- Core website features -->
  <a href="https://pages.github.com"><img src="https://img.shields.io/badge/Hosted_on-GitHub_Pages-181717?logo=github&logoColor=white" alt="GitHub Pages"></a>
  <a href="#"><img src="https://img.shields.io/badge/Privacy-Focused-brightgreen?logo=lock&logoColor=white" alt="No Tracking / Privacy-Respecting"></a>
  <a href="#"><img src="https://img.shields.io/badge/Performance-Lightning%20Fast-yellow?logo=zap&logoColor=white" alt="Optimized & Lightning Fast"></a>
  <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"><img src="https://img.shields.io/badge/SEO-Optimized-00cc88?logo=google&logoColor=white" alt="SEO Optimized"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"><img src="https://img.shields.io/badge/Responsive-Design-blue?logo=css3&logoColor=white" alt="Responsive Design"></a>
</p>

<!-- Maintenance / Versions / Quick Demo -->
<p align="center">
  <!-- ⚠️ This badge is auto-updated by update-badges.js. Do NOT manually edit the date! -->
  <a href="#"><img src="https://img.shields.io/badge/Last_Updated-2025--10--23-lightgrey?logo=github&logoColor=white" alt="Last Updated"></a>
  <a href="https://nima.ninja"><img src="https://img.shields.io/badge/Quick_Demo-Live%20Site-00bfff?logo=firefox&logoColor=white" alt="Quick Demo / Live Site"></a>
  <br>
  <!-- Dependencies -->
  <!-- ⚠️ This badge is auto-updated by update-badges.js. Do NOT manually edit the version! -->
  <a href="https://www.ruby-lang.org/"><img src="https://img.shields.io/badge/Ruby-3.4.6-cc342d?logo=ruby&logoColor=white" alt="Ruby Version"></a>
  <!-- ⚠️ This badge is auto-updated by update-badges.js. Do NOT manually edit the version! -->
  <a href="https://jekyllrb.com/"><img src="https://img.shields.io/badge/Jekyll-4.4.1-f06529?logo=jekyll&logoColor=white" alt="Jekyll Version"></a>
  <!-- ⚠️ This badge is auto-updated by update-badges.js. Do NOT manually edit the version! -->
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node-22.19.0-339933?logo=node.js&logoColor=white" alt="Node Version"></a>
  <!-- ⚠️ This badge is auto-updated by update-badges.js. Do NOT manually edit the version! -->
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-11.6.2-blue?logo=npm&logoColor=white" alt="npm Version"></a>
</p>

This repository hosts my personal website, **https://nima.ninja**, a digital diary and knowledge hub for practical cybersecurity, technology, and personal growth.

The website is organized into three main sections:

- Blog: Practical insights, tutorials, and notes on technology, cybersecurity, personal growth, and more.
- Books: Curated book recommendations covering technology, cybersecurity, science, personal growth, and other practical learning topics.
- Links: Curated web resources on technology, cybersecurity, productivity, and life, designed to help you learn, grow, and stay inspired.

The website is:

- Fully open-source — reusable theme
- Privacy-focused — no tracking by default
- Lightning-fast — optimized build & critical CSS
- Responsive — works on mobile & desktop
- SEO-friendly — structured for discoverability

It is powered by CyberShark Edition, a custom enhanced version of the Jekyll Hacker Theme, combining minimalistic hacker aesthetics with modern features, cyberpunk neon styling, and developer-friendly optimizations.

## Technology Overview

- Jekyll — fast static site generator
- Ruby — programming language for Jekyll
- GitHub Pages — hosting platform
- Modern cyberpunk/neon aesthetics
- Developer-friendly features: pagination, table of contents, automated RSS, smart image handling

The site uses Jekyll plugins like: `jekyll-seo-tag`, `jekyll-paginate`, `jekyll-sitemap`, `jekyll-toc` for optimized functionality.

## Usage / Local Build & Deployment Instructions

You can preview your changes locally, run the full automated build pipeline, and deploy the site to `gh-pages`. The site uses Jekyll for static site generation, PostCSS & PurgeCSS for optimized CSS, Critical CSS inlining, and JS minification via npm scripts.

### 0. Clone the repository

```bash
git clone https://github.com/cSh4rk/cSh4rk.github.io.git
cd nima.ninja
```

### 1. Install dependencies

```bash
bundle install     # Install Ruby gems (including Jekyll)
npm install        # Install Node dependencies
```

### 2. Preview changes locally

To see your changes live before final build:

```bash
bundle exec jekyll serve
```

- Access the site at `http://127.0.0.1:4000`.
- Make edits, then refresh the page to preview updates.

Note: Local preview rewrites URLs to `127.0.0.1`, so do not use this version for final deployment.

### 3. Build the website

Run the full automated build pipeline:

```bash
npm run build
```

This will:

- Generate `README.md` from `README.template.md` by replacing placeholders like `LAST_UPDATED`, `RUBY_VERSION`, `JEKYLL_VERSION`, `NODE_VERSION`, and `NPM_VERSION` with real values. Do not edit `README.md` directly — only edit `README.template.md`.
- Build the site with Jekyll (first pass).
- Remove unused CSS via PostCSS + PurgeCSS.
- Copy a temporary minified CSS backup.
- Generate critical CSS for home, posts, and pages (mobile, tablet, desktop).
- Minify inline JS scripts.
- Rebuild Jekyll site (second pass) to inject critical CSS and inline JS.
- Minify JS files.
- Restore the full PurgeCSS-generated CSS to the `_site` folder.

After the build completes, the fully optimized site is ready in `_site` and can be deployed.

### 4. Deploy to `gh-pages` branch

```powershell
# Switch to gh-pages branch
git checkout gh-pages

# Ensure .gitignore contains only:
# _site/, CNAME, css/main.original.css, node_modules/, .jekyll-cache/
git add .gitignore
git commit -m "Fix .gitignore for gh-pages"

# Clean branch root while keeping .git, .gitignore, CNAME, node_modules
Get-ChildItem -Force | Where-Object {
    $_.Name -notin @('.git', '.gitignore', 'node_modules', '_site')
} | Remove-Item -Recurse -Force

# Remove temporary Jekyll cache if exists
if (Test-Path ".jekyll-cache") { Remove-Item -Recurse -Force .jekyll-cache }

# Copy freshly built _site contents into repo root
robocopy "_site" "." /E

# Stage all changes
git add .

# Show staged changes
git status

# Commit & push automatically if there are changes
if (-not (git diff --cached --quiet)) {
    git commit -m "Update site from _site"
    git push origin gh-pages
} else {
    Write-Output "No changes to commit. Nothing to push."
}
```

<br>
<br>

# About the Theme: The Hacker Theme, CyberShark Edition 🦈

<!-- Theme / Tech Stack -->
<p align="center">
  <a href="https://jekyllrb.com"><img src="https://img.shields.io/badge/Jekyll-Theme-f06529?logo=jekyll&logoColor=white" alt="Jekyll Theme"></a>
  <a href="https://www.ruby-lang.org/"><img src="https://img.shields.io/badge/Built_with-Ruby-cc342d?logo=ruby&logoColor=white" alt="Ruby"></a>
  <a href="https://en.wikipedia.org/wiki/Cyberpunk"><img src="https://img.shields.io/badge/Style-Cyberpunk-ff00ff?logo=css3&logoColor=white" alt="Cyberpunk Style"></a>
  <a href="#"><img src="https://img.shields.io/badge/Variant-CyberShark-00ffff?logo=shark&logoColor=black" alt="CyberShark Variant"></a>
  <br>
  <!-- Jekyll Plugins -->
  <a href="https://jekyll.github.io/jekyll-seo-tag/"><img src="https://img.shields.io/badge/Plugin-jekyll--seo--tag-orange?logo=jekyll&logoColor=white" alt="Jekyll SEO Tag"></a>
  <a href="https://github.com/jekyll/jekyll-paginate"><img src="https://img.shields.io/badge/Plugin-jekyll--paginate-blue?logo=jekyll&logoColor=white" alt="Jekyll Paginate"></a>
  <a href="https://github.com/jekyll/jekyll-sitemap"><img src="https://img.shields.io/badge/Plugin-jekyll--sitemap-lightgrey?logo=jekyll&logoColor=white" alt="Jekyll Sitemap"></a>
  <a href="https://github.com/toshimaru/jekyll-toc"><img src="https://img.shields.io/badge/Plugin-jekyll--toc-lightgreen?logo=jekyll&logoColor=white" alt="Jekyll TOC"></a>
</p>

CyberShark Edition is a fully open-source, enhanced version of [The Hacker Theme](https://github.com/pages-themes/hacker) and [The Hacker-Blog Theme](https://github.com/tocttou/hacker-blog). It introduces multiple improvements while preserving the minimalistic, hacker-friendly design:

## Key Features

- ✔ Multiple post categories (Blog, Books, Links, or more).
- ✔ Post tags with counts display.
- ✔ Site footer with social media links: Discord, GitHub, X, Mastodon, and optional TryHackMe and HackTheBox profile badges, configurable via `_config.yml`.
- ✔ Show updated date in posts in addition to published date.
- ✔ Smart image format selector plugin: AVIF → WebP → original format, with customizable attributes (`width`, `height`, `alt`, `loading`, `fetchpriority`, `first_format`, `decoding`, `classname`).
- ✔ Expanded page styles: hover effects, fragment highlight animations, responsive classes, and more.
- ✔ Fully automated local build pipeline: PurgeCSS for CSS, Terser for JS, custom PostCSS for pre-Critical CSS sanitizing, Critical CSS inlining for multiple layouts/viewports.
- ✔ Favicon automatically chosen based on device.
- ✔ Fixed and completed RSS feed.
- ✔ Modern Cyberpunk Neon navigation buttons.
- ✔ security.txt file with automated expire date update.
- ✔ SEO and accessibility improvements: ARIA attributes, robots rules, pagination, smooth fragment scroll.
- ✔ Jekyll plugin to remove deprecated ARIA roles from footnotes.
- ✔ Back to Top button for scrolled pages.
- ✔ Particles effect with customizable color palettes.
- ✔ Automatic Table of Contents with selectable placement per post.

All changes are made with ❤. Feel free to use this theme for your own projects.

<br>
<br>

# License
[![CC0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
[![CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

- **Templates & website code (including modifications to CC0-based Hacker Theme derivatives):** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) — free to use, modify, and redistribute with no obligations.  
- **Posts, Articles & Tutorials (all topics):** [CC BY 4.0 International](https://creativecommons.org/licenses/by/4.0/) — free to use, modify, and redistribute **with attribution to Nima**.  
- **Third-party resources:** retain their original licenses; see references in posts, pages, or code files.