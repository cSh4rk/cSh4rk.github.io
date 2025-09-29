---
layout: page
title: Contact
image: /assets/robot5.png
robots: noindex,nofollow
description: "Contact me through one of these channels."
hero-poster: /assets/robot5.avif
---

<video autoplay muted loop playsinline width="410" height="410" poster="{{ page.hero-poster }}">
  <source src="/assets/robot5.webm" type="video/webm">
  <source src="/assets/robot5.mp4" type="video/mp4">
</video>
<br>
<br>

<h2 class="section-intro no-decoration">Contact me through one of these channels:</h2>
<br>

{% if site.social.email %}
  - Email: <a href="mailto:{{ site.social.email }}"><span>{{ site.social.email }}</span></a> {% if site.social.email2 %}or <a href="mailto:{{ site.social.email2 }}"><span>{{ site.social.email2 }}</span></a>{% endif %}
{% endif %}

<!--{% if site.social.linkedin %}
  - LinkedIn: <a href="https://linkedin.com/in/{{ site.social.linkedin }}"><span>{{ site.social.linkedin }}</span></a>
{% endif %}-->

<!--{% if site.social.github %}
  - GitHub: <a href="https://github.com/{{ site.social.github }}"><span>{{ site.social.github }}</span></a>
{% endif %}-->

<!--{% if site.social.x %}
  - X: <a href="https://x.com/{{ site.social.x }}"><span>@{{ site.social.x }}</span></a>
{% endif %}-->

<!--{% if site.social.mastodon %}
  - Mastodon: <a href="{{ site.social.mastodon }}"><span>{{ site.social.mastodonhandle }}</span></a>
{% endif %}-->

{% if site.social.discordserver or site.social.discorduser %}
  - Discord:
  {% if site.social.discorduser %}
    - User: {{ site.social.discorduser }}
  {% endif %}

  {% if site.social.discordserver %}
    - Server: <a href="https://discord.gg/{{ site.social.discordserver }}"><span>{{ site.social.discordservername }}</span></a>
  {% endif %}
{% endif %}

<!--{% if site.social.wickrme %}
  - Wickr Me: {{ site.social.wickrme }}
{% endif %}-->

{% if site.social.linktree %}
  - Linktree: <a href="https://linktr.ee/{{ site.social.linktree }}"><span>@{{ site.social.linktree }}</span></a>
{% endif %}

<!--{% if site.social.tally %}
  - Send Anonymous Message: <a href="https://tally.so/r/{{ site.social.tally }}"><span>@{{ site.social.name }}</span></a>
{% endif %}-->

{% if site.social.whispa %}
  - Send Anonymous Message: <a href="https://whispa.sh/@{{ site.social.whispa }}"><span>@{{ site.social.whispa }}</span></a>
{% endif %}

<!--{% if site.social.tellonym %}
  - Send Anonymous Message: <a href="https://tellonym.me/{{ site.social.tellonym }}"><span>@{{ site.social.tellonym | replace: "_", "\_" }}</span></a>
{% endif %}-->
