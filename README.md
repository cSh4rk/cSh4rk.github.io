## The Hacker Theme, CyberShark Edition 🦈

This is an updated version of [The Hacker-Blog Theme](https://github.com/tocttou/hacker-blog) which itself is a modified version of [Hacker Theme](https://github.com/pages-themes/hacker), a minimalistic, responsive jekyll theme built for hackers.

In this edition of the Hacker Theme: 

✔ Even more features, some of them:

  - More than one post categories, in my website template case: Blog, Books, Links (you can add as many categories as you want).
  - Post tags (ability to use post tags and show all post tags and tag counts).
  - Site footer.
  - Post references (footnotes).
  - Additional social media options: Discord, Github, X, Mastodon and many more.
  - Ability to add TryHackMe and HackTheBox badges to website footer and get the link from these services or serve them locally.
  - Ability to show updated date for posts (in addition to published date).
  - Smart image format selector Jekyll plugin: this Ruby plugin is built for easier implementation of pictures on web pages, this plugin uses a fallback mechanism for pictures: it searches for the picture in avif format and uses it, if avif wasn't found, searches for webP and if it wasn't found either, it searches for original picture format(PNG,JPG...) AVIF -> webP -> Original format(PNG,JPG...) with the ability to set some attributes for images (`width` `height` `alt` `loading` `fetchpriority` `first_format` `decoding` `classname`).
  - Expanded page style codes for more features: hover effects for different hyperlinks, fragment highlight animations, responsive classes and more.
  - Contains code to use PurgeCSS post website build to remove unused CSS codes( use `npm install` in project folder ).
  - Favicon is chosen based on the viewer's device.
  - Fixed and completed RSS feed.
  - Added new options for page frontmatter, examples: post image thumbnails, robots: add robots rules for the page, hero-poster: add hero poster for hero videos on pages to use them with preload for faster load(it sets fetchpriority=high for hero poster).
  - Modern Cyberpunk neon navigation buttons.
  - security.txt file and a mechanism to automatically update the expire date in the file.
  - Some structural modifications for better SEO.
  - Some changes for better accessibility: aria attributes for SVG images used in website footer and posts, and more.
  - A Jekyll plugin to remove deprecated ARIA roles from Jekyll footnotes.
  - Contains code to use Critical post-build to inline critical CSS for different page layouts.
  - Back to Top button for scrolled pages.
  - Custom PostCSS script to use as pre-Critical CSS sanitizing stage, instead of Critical `--ignore` flag that may not always work as intended, to remove custom CSS selectors that shouldn't be in Critical CSS output.
  - Fully automated local build pipeline including CSS minification with PurgeCSS, JS minification with Terser, Custom PostCSS plugin for pre-Critical CSS sanitizing, Critical CSS inlining for different page layouts and viewports, with full comments for each build line. 
  - Contains code to use particles effect with various color palettes on desired pages.
  - Contains code to use Table of Contents for posts.
  
✔ Multiple bugs in the original theme are fixed. 

✔ Updates and improvements are constantly coming, and new bugs are getting fixed when found.

All changes are made with ❤, Feel free to use this updated edition.

## Technology Introduction

[Jekyll](https://jekyllrb.com/) is a very fast static site generator technology that's supported by Github-Pages by default. It takes text written in your favorite markup language and uses layouts to create a static website. Jekyll is written in Ruby.

### Gems
Gems are code you can include in Ruby projects. Gems package specific functionality. You can share gems across multiple projects or with other people. Gems can perform actions like:

* Converting a Ruby object to JSON
* Pagination
* Interacting with APIs such as GitHub

Jekyll is a gem. Many Jekyll plugins are also gems, including jekyll-feed, jekyll-seo-tag and jekyll-archives.

### Gemfile
A Gemfile is a list of gems used by your site. Every Jekyll site has a Gemfile in the main folder.

<br>
You can create your own personal website, Weblog... by one of your code repositories using [Github-Pages](https://docs.github.com/en/pages).

The default theme used in a new Jekyll project is [Minima](https://github.com/jekyll/minima).

## Usage

There are three different methods to use a custom, pre-built Jekyll theme on your project:

1) Using Remote Theme Gem Files (in Gemfile file), in this method, your theme is automatically updated whenever the original theme builder updates her/his theme files. I don't like it this way because you are dependent on a foreign repository for your websites and if you have updates in your code, you might get a conflict with the new updated theme files in the original repository. And also you don't have full control and customization option on your project.

2) Using a Local Theme and make Github Pages to use theme Gem files. Github can also make your pages on the fly with Jekyll technology.

  The downside is [Github-Pages only supports a limited number of themes that you can choose](https://pages.github.com/themes/), each theme has its own Gem files and [not all  Gem files are supported by Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins), so you cannot use  every Jekyll theme that you see online. If you like one of the themes that Github-Pages supports, use this method.

3) Use whatever Jekyll theme you see and like on the web with any custom Gem files then Jekyll build your website locally, preferably on a different branch, for example mine is named `gh-pages` branch, then use this branch instead of master/main branch for Github pages website, in this branch you have the Jekyll built website files: no Ruby Gem files and only html (no Markdown md files either).

In other words in this way you work with two branches, the main/master branch is used for your local editing and website changes and seeing your changes locally with `bundle exec Jekyll serve` command, then when finished editing, build your website with `bundle exec Jekyll build` (always use [bundler](https://jekyllrb.com/docs/ruby-101/#bundler) to handle your Gem file dependencies and avoid dependency hell), then your website files are ready in a `_site` folder, use the contents of this folder in your second branch (for example gh-pages) for your website files.

## Notes

1) Always use a local clone to work on your project using a text editor and git or github desktop then commit and push your changes to your online Github Repositories. You can also edit it directly on Github but it is recommended that you do most of your changes in a local build.

2) [You can use your custom domain with Github-Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

3) You can use [CloudFlare](https://www.cloudflare.com/) or [Namecheap](https://www.namecheap.com/domains/freedns/) as your nameserver provider for your custom domain. CloudFlare has also nice security and firewall features and it is also a caching proxy that speeds up your website speed.

4) For more info on how to create your website using Github-Pages and Jekyll themes use the following resources:

* https://docs.github.com/en/pages

* https://jekyllrb.com/docs/ and for more themes and resources: https://jekyllrb.com/resources/

* https://medium.com/@samdutton/github-pages-cloudflare-custom-domain-checklist-e86c786194a4

* https://www.youtube.com/playlist?list=PLWzwUIYZpnJuT0sH4BN56P5oWTdHJiTNq


## License

CC0 1.0 Universal
