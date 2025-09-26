---
title: "Quick tips for a better website"
published: true
tags: [Website, Website Performance, Website Security, Cloudflare, Github Pages, Jekyll, PageSpeed Insights]
image: /blog/assets/2025/website-boost.png
description: "Some quick no fluff tips and commands for a faster and more secure website"
image_width: "256"
image_height: "256"
---

<br>
{% smart_image /blog/assets/2025/website-boost.png 256 256 "" eager high %}
[^1]
<br>

These are some tips to improve your website, examples are for Jekyll as my website is based on it but the main tips are technology agnostic.

<br>

## 1) Use Cloudflare

- Enable all useful page speed and performance options in Cloudflare panel:

  Speed -> Settings: (In the Site Recommendations section): Enable/Disable according to the picture:

  <br>
  {% smart_image /blog/assets/2025/website-boost-cloudflare.png 1059 1136 "" lazy "" webp async "" list %}
  <br>

  Enable: HTTP/2, HTTP/3, HTTP/2 to Origin, Always use HTTPS, TLS 1.3, Early Hints

  Disable: All the rest, including 0-RTT Connection Resumption (this option can speed up the connection but it also makes it less secure by providing grounds for replay attacks so we disable it).

<br>

### Another less noticed but still very important tip:

- Enable TLS 1.2 in addition to TLS 1.3:

  I was able to retrieve my website feeds again in Newsflow[^2] and some other RSS feeds clients after enabling TLS 1.2 again, these clients don't show any errors but still don't load your feeds if you've only enabled TLS 1.3.

  Use this setting in Cloudflare, SSL/TLS -> Edge Certificates: 

  Minimum TLS version: TLS 1.2

  <br>
  {% smart_image /blog/assets/2025/website-boost-cloudflare2.png 1034 196 "" lazy "" webp async "" list %}
  <br>

  > How I found it was TLS issue? I used RSS Validator[^3] for checking the validity of my website RSS feed after some changes and it returned TLS error, so I got suspicious that it might be due to only TLS 1.3 being enabled and I tested after enabling TLS 1.2 and voila! My RSS feed clients started working again! 

<br>

- Use Cloudflare's Email Address Obfuscation for your email address but use it only on one Contact page:

  Remove email address from website footer and only use it in a Contact page to remove the overhead of Cloudflare JS used for email address obfuscation to only one page.

  > A more solid solution is to use a local JS for email address obfuscation, the local solution can be more complicated but still suffers from lack of randomization. The Cloudflare email obfuscation solution is good enough, enable it if you haven't already.

  To enable Cloudflare email obfuscation:

  Scrape Shield -> Email Address Obfuscation

  While there you can also enable Hotlink Protection.

  <br>
  {% smart_image /blog/assets/2025/website-boost-cloudflare3.png 1031 542 "" lazy "" webp async "" list %}
  <br>

<br>

## 2) Reduce Cumulative Layout Shift(CLS)

- Use hardcoded width and height for `img` and `video` tags.

- Use a CSS class to still support responsive after doing no. 1. 

  This is the way I handle it in my Jekyll website, in `base.scss` file:

  {% raw %}
  ```css
  // Fix Layout Shift issue(combined with adding width and height to html img and video tags)
  img, video {
    max-width: 100%;  /* makes it responsive */
    height: auto;     /* keeps aspect ratio */
    display: block;   /* avoids inline spacing issues */
  }

  img.no-responsive, video.no-responsive {
    max-width: none;
    height: auto;
    display: inline;
  }
  ```
  {% endraw %}

<br>
<br>

## 3) Reduce Largest Contentful Paint(LCP)

- Use more modern `AVIF`,`WebP` image formats instead of `PNG` or `JPG` and `MP4`,`WebM` video formats instead of heavy `GIF` files to significantly improve load speed and decrease file sizes. 

  You can use FFmpeg[^4], cwebp[^5] and ImageMagick[^6] to convert `PNG`/`JPG` to more modern and web-friendly `AVIF`/`WebP` formats.

  You can also use FFmpeg to resize `MP4` files or convert them to `WebM` format.

  Here is some example commands I use for image conversion that I've found to return desirable results for me in most cases:

  {% raw %}
  ```bash
  # for images
  ## mainly used
  cwebp -q 90 -near_lossless 95 -m 6 test.png -o test.webp
  magick test.png -quality 80 test.avif

  ## some other variations that had good results for me
  ffmpeg -i test.png -c:v libaom-av1 -crf 20 -b:v 0 test.avif
  ffmpeg -i test.png -q:v 80 test.webp
  ffmpeg -i test.png -c:v libaom-av1 -crf 30 -b:v 0 test.avif

  # for videos
  ## resize video files
  ffmpeg -i test.mp4 -vf scale=256:256 test_resized.mp4
  ffmpeg -i test.mp4 -vf scale=308:462 -c:v libx264 -crf 32 -preset veryslow -an test_resized.mp4

  ## convert to webm
  ffmpeg -i test.mp4 -c:v libaom-av1 -crf 40 -b:v 0 -an test.webm

  ffmpeg -i test.mp4 -c:v libaom-av1 -crf 30 -b:v 0 -pass 1 -an -f null -y /dev/null
  ffmpeg -i test.mp4 -c:v libaom-av1 -crf 30 -b:v 0 -pass 2 -an test.webm
  ```
  {% endraw %}

  In the case of `AVIF` and `WebP` use, 96-97% of viewers are supported, for those with older legacy browsers or devices, fallback to original `PNG` or `JPG` formats.

  I've written a Ruby plugin[^7] for my website to do just that(it's open-sourced, you can see my whole website in GitHub[^8]) and added more arguments for more control.

<br>

- Use `fetchpriority="high"` for your largest contentful paint (LCP) image or video that is **immediately visible** above the fold.

<br>

- Use `loading` attribute for `img` tag:

  **`loading="lazy"`**: Great for images **below the fold**, but **never on your LCP image** (causes delays).

  > Rule of thumb:
  >  - **Above the fold: `loading="eager"` (or omit, since eager is default).**
  >  - **Below the fold: `loading="lazy"`.**

<br>

- Use `decoding="async"` for secondary images:

  Usually improves main-thread responsiveness.

  For the LCP image, async decoding can slightly delay the first paint.

  Minimal risk overall, safe for secondary images.

<br>

- Preload LCP image via `<link rel="preload">`.

  Jekyll Example: This is how I use `Preload` for my hero poster images(hero images that are loaded before video content is fully downloaded) in the `head.html` file of my Jekyll website:

  {% raw %}
  ```html
  {% if page.hero-poster %}<link rel="preload" as="image" href="{{ page.hero-poster }}" fetchpriority="high">{% endif %}
  ```
  {% endraw %}

  and use `hero-poster` variable in the frontmatter and body of the pages that I want to use hero poster image on:

  {% raw %}
  ```markdown
  ---
  layout: page
  title: Blog
  image: /blog/assets/robot1.png
  description: "Here I talk about anything, mostly technical topics."
  hero-poster: /blog/assets/robot1.avif
  ---

  <video autoplay muted loop playsinline width="308" height="462" poster="{{ page.hero-poster }}">
    <source src="/blog/assets/robot1.webm" type="video/webm">
    <source src="/blog/assets/robot1.mp4" type="video/mp4">
  </video>
  ```
  {% endraw %}

  <br> 

  ### Rule of thumb for safe optimization

  **LCP/hero image: preload + fetchpriority="high" + eager (no async).**

  **Other above-the-fold: optional async decoding, no lazy.**

  **Below-the-fold: lazy + async decoding.**

  **Don’t mark too many resources as high priority.**

  **Keep image sizes reasonable.**

<br>

- Use explicit `width` & `height` for images (already did that in no.2 tip).

<br>
<br>

## 4) Optimize CSS

- Compress the CSS file and disable source maps.

  Example: in a Jekyll website, in  `_config.yaml`:

  {% raw %}
  ```yml
  sass:
    style: compressed
    sourcemap: never
  ```
  {% endraw %}

  `style: compressed`: minifies your CSS (removes whitespace, comments, etc.).

  `sourcemap: never`: stops Jekyll from generating `main.css.map` and removes the reference.

  Result:

  - You’ll only get a small, minified `main.css`.

  - No `.map` file.

  - Leanest possible setup for GitHub Pages.
  
  - The result is a **tiny, production-ready `main.css`** that PageSpeed Insights sees as fully optimized.

<br>

- Use PurgeCSS[^9] post-build to remove css codes that are not used.

  If you build your website locally, create a workflow to run `PurgeCSS` after your website build to remove unused parts of your CSS file.

<br>

- Inline critical CSS:

  Use a tool like Critical[^10] CSS(old, not maintained anymore), Penthouse[^11], Critters[^12] or Crittr[^13](recommended for Jekyll websites) to extract critical parts of your CSS that are essential for above the fold content of each of your important HTML pages and inline those parts of CSS for faster page loads. 

<br>
<br>

## 5) Some other tips

- Load resources locally:

  If you use some website profile badges on your website (like the TryHackMe and HackTheBox badges on my website footer), it's better to download the image and serve it from your own website resources instead of direct requests for them.
  So that you can optimize these pictures and use smaller and more modern image formats and also prevent additional requests and cookies of third party services you send requests to. 

  Another benefit is you don't need to add additional CSP rules for external resources of your website.

  Example: I've added an option in my `_config.yml` file that gives me the option to choose to serve those pictures locally or from upstream servers:

  {% raw %}
  ```yml
  badges:
    hackthebox: "768488"
    selfhost_hackthebox: true
    tryhackme: "nima"
    selfhost_tryhackme: true
  ```
  {% endraw %}

  also in `footer.html`:

  {% raw %}
  ```html
    {% if site.badges.hackthebox %}
      <li class="social-media-list">
        {% if site.badges.selfhost_hackthebox %}
          <!-- local HTB badge -->
          <a title="Hack The Box Profile" href="https://app.hackthebox.com/profile/{{ site.badges.hackthebox }}">
            {% smart_image "/assets/{{ site.badges.hackthebox }}.png" 220 50 "Hack The Box Profile" lazy "" avif async "no-responsive" %}
          </a>
        {% else %}
          <!-- upstream HTB badge -->
          <a title="Hack The Box Profile" href="https://app.hackthebox.com/profile/{{ site.badges.hackthebox }}">
            <img src="https://www.hackthebox.eu/badge/image/{{ site.badges.hackthebox }}" width="220" height="50" loading="lazy" decoding="async" alt="Hack The Box" class="no-responsive">
          </a>
        {% endif %}
      </li>
    {% endif %}

    {% if site.badges.tryhackme %}
      <li class="social-media-list">
        {% if site.badges.selfhost_tryhackme %}
          <!-- local TryHackMe badge -->
          <a title="TryHackMe Profile" href="https://tryhackme.com/p/{{ site.badges.tryhackme }}">
            {% smart_image "/assets/{{ site.badges.tryhackme }}.png" 329 88 "TryHackMe Profile" lazy "" avif async "no-responsive" %}
          </a>
        {% else %}
          <!-- upstream TryHackMe badge -->
          <a title="TryHackMe Profile" href="https://tryhackme.com/p/{{ site.badges.tryhackme }}">
            <img src="https://tryhackme-badges.s3.amazonaws.com/{{ site.badges.tryhackme }}.png" width="329" height="88" loading="lazy" decoding="async" alt="TryHackMe Profile" class="no-responsive">
          </a>
        {% endif %}
      </li>
    {% endif %}
  ```
  {% endraw %}

<br>

- Create a clean workflow for website build in `main` branch and publish in `gh-pages` branch:

  Example: Here is mine so far, I build my Jekyll website locally. I'll add critical CSS extraction later to my current build.

  For `main` branch and site build:

  {% raw %}
  ```bash
  npm run build
  ```
  {% endraw %}

  here's the code for `package.json`:

  {% raw %}
  ```json
  {
    "name": "nima.ninja",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "build:jekyll": "bundle exec jekyll build",
      "copy-css": "node copy-css.js",
      "build:postcss": "postcss \"_site/css/main.css\" -o \"_site/css/main.css\"",
      "build": "npm run build:jekyll && npm run copy-css && npm run build:postcss"
    },
    "devDependencies": {
      "postcss": "8.5.6",
      "postcss-cli": "11.0.1",
      "@fullhuman/postcss-purgecss": "7.0.2"
    }
  }
  ```
  {% endraw %}

  `copy-css.js` copies the original css file so that I can compare it to the one PostCSS creates to make sure nothing necessary is removed. 

  Codes for all of these files exist in my GitHub repo for my website.

  For `gh-pages` branch to publish website for GitHub Pages:

  {% raw %}
  ```bash
  1️⃣ Prepare .gitignore in gh-pages
  git checkout gh-pages

  Make sure .gitignore exists and includes only what you want ignored:
  _site/
  CNAME
  css/main.original.css

  # Node modules
  node_modules/

  # Jekyll build cache
  .jekyll-cache/

  Commit if needed:
  git add .gitignore
  git commit -m "Fix .gitignore for gh-pages"

  2️⃣ Clean the branch safely
  Remove all tracked files except .gitignore and CNAME:
  git ls-files | Where-Object { $_ -notin @('.gitignore', 'CNAME') } | ForEach-Object { git rm -r --cached $_ }

  Optional: delete temporary or cache files:
  if (Test-Path ".jekyll-cache") { Remove-Item -Recurse -Force .jekyll-cache }
  if (Test-Path "_site/css/main.original.css") { Remove-Item -Force "_site/css/main.original.css" }

  Untracked files like node_modules are automatically ignored because of .gitignore.

  3️⃣ Copy _site contents into branch root
  robocopy "_site" "." /E

  4️⃣ Stage and commit only the intended files
  # git status  (optional: to see if there's any changes)
  git add .
  git commit -m "Update site from _site"
  git push origin gh-pages
  ```
  {% endraw %}

  The result is built website code committed and pushed to the `gh-pages` branch of my website[^14] on GitHub.

<br>
<br>

## _References_
* * *
[^1]: Icon made by [zero_wing](https://www.flaticon.com/authors/zero-wing) from [www.flaticon.com](https://www.flaticon.com/)
[^2]: [Newsflow - Free download and install on Windows](https://apps.microsoft.com/detail/9nblggh58s5r)
[^3]: [RSS Validator](https://www.rssboard.org/rss-validator/)
[^4]: [Download FFmpeg](https://ffmpeg.org/download.html)
[^5]: [Download cwebp](https://developers.google.com/speed/webp/download)
[^6]: [Download ImageMAgick](https://imagemagick.org/script/download.php)
[^7]: [My Ruby plugin for AVIF/WebP image format selection and fallback to PNG/JPG](https://github.com/cSh4rk/cSh4rk.github.io/blob/main/_plugins/smart_image.rb)
[^8]: [My website on GitHub](https://github.com/cSh4rk/cSh4rk.github.io)
[^9]: [PurgeCSS - Remove unused CSS](https://purgecss.com/)
[^10]: [Critical: Extract & Inline Critical-path CSS in HTML pages](https://github.com/addyosmani/critical)
[^11]: [Penthouse: Generate critical css for your web pages](https://github.com/pocketjoso/penthouse)
[^12]: [Critters: A Webpack plugin to inline your critical CSS and lazy-load the rest.](https://github.com/GoogleChromeLabs/critters)
[^13]: [Crittr: High performance critical css extraction with a great configuration abilities](https://github.com/philipp-winterle/crittr)
[^14]: [The gh-pages branch of my website on GitHub](https://github.com/cSh4rk/cSh4rk.github.io/tree/gh-pages)