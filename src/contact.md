---
layout: page
title: "Contact Nima — Questions & Feedback"
h1: "Contact"
image: /assets/robot5.png
robots: noindex,follow
sitemap: false
description: "Get in Touch with Nima Through Various Channels — Ask Questions, Provide Feedback, or Just Say Hi via the Diaries of a Modern Ninja."
effect: "particles"
particle_palette: "hacker"
---

{% smart_image /assets/robot5.png 256 256 "" eager high %}

<br>

<h2 class="section-intro no-decoration neutral-color">Contact:</h2>

{% if site.social.email %}
  - Email: <a href="mailto:{{ site.social.email }}"><span>{{ site.social.email }}</span></a> {% if site.social.email2 %}or <a href="mailto:{{ site.social.email2 }}"><span>{{ site.social.email2 }}</span></a>{% endif %}
{% endif %}

<!--{% if site.social.tally %}
  - Send Anonymous Message: <a href="https://tally.so/r/{{ site.social.tally }}"><span>@{{ site.social.name }}</span></a>
{% endif %}-->

{% if site.social.whispa %}
  - Whispa: <a href="https://whispa.sh/@{{ site.social.whispa }}"><span>https://whispa.sh/@{{ site.social.whispa }}</span></a>
{% endif %}

<!--{% if site.social.tellonym %}
  - Send Anonymous Message: <a href="https://tellonym.me/{{ site.social.tellonym }}"><span>https://tellonym.me/{{ site.social.tellonym | replace: "_", "\_" }}</span></a>
{% endif %}-->

{% if site.social.pgpkey %}
  - PGP Key: <a href="/assets/{{ site.social.pgpkey }}.txt"><span>{{ site.url }}/{{ site.social.pgpkey }}.txt</span></a>
{% endif %}

<br>

<h2 class="section-intro no-decoration neutral-color">Social:</h2>

{% if site.social.linkedin %}
  - LinkedIn: <a href="https://linkedin.com/in/{{ site.social.linkedin }}"><span>https://linkedin.com/in/{{ site.social.linkedin }}</span></a>
{% endif %}

{% if site.social.x %}
  - X: <a href="https://x.com/{{ site.social.x }}"><span>https://x.com/{{ site.social.x }}</span></a>
{% endif %}

{% if site.social.mastodon %}
  - Mastodon: <a href="{{ site.social.mastodon }}"><span>{{ site.social.mastodon }}</span></a>
{% endif %}

<!--{% if site.social.wickrme %}
  - Wickr Me: {{ site.social.wickrme }}
{% endif %}-->

{% if site.social.discordserver or site.social.discorduser %}
  - Discord:
  {% if site.social.discorduser %}
    - User: {{ site.social.discorduser }}
  {% endif %}

  {% if site.social.discordserver %}
    - Server: <a href="https://discord.com/invite/{{ site.social.discordserver }}"><span>https://discord.com/invite/{{ site.social.discordserver }}</span></a>
  {% endif %}
{% endif %}

<br>

<h2 class="section-intro no-decoration neutral-color">Other Platforms:</h2>

{% if site.social.github %}
  - GitHub: <a href="https://github.com/{{ site.social.github }}"><span>https://github.com/{{ site.social.github }}</span></a>
{% endif %}

{% if site.badges.tryhackme %}
  - TryHackMe: <a href="https://tryhackme.com/p/{{ site.badges.tryhackme }}"><span>https://tryhackme.com/p/{{ site.badges.tryhackme }}</span></a>
{% endif %}

{% if site.badges.hackthebox %}
  - HackTheBox: <a href="https://app.hackthebox.com/profile/{{ site.badges.hackthebox }}"><span>https://app.hackthebox.com/profile/{{ site.badges.hackthebox }}</span></a>
{% endif %}

{% if site.social.linktree %}
  - Linktree: <a href="https://linktr.ee/{{ site.social.linktree }}"><span>https://linktr.ee/{{ site.social.linktree }}</span></a>
{% endif %}

{% if site.social.linkme %}
  - Linkme: <a href="https://link.me/{{ site.social.linkme }}"><span>https://link.me/{{ site.social.linkme }}</span></a>
{% endif %}

<br> 

For the fastest response, please reach me via my ProtonMail email, as I may not check messages frequently.
