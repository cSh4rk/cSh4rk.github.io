---
layout: page
title: "Contact Nima — Questions & Feedback"
h1: "Contact"
image: /assets/dove.png
robots: noindex,follow
sitemap: false
description: "Get in Touch with Nima Through Various Channels — Ask Questions, Provide Feedback, or Just Say Hi via the Diaries of a Modern Ninja."
effect: "particles"
particle_palette: "hacker"
---

{% smart_image /assets/dove.png 128 128 "" eager high %}

<br>
<br>

{% if site.social.email %}
  - Email: <a href="mailto:{{ site.social.email }}"><span>{{ site.social.email }}</span></a> {% if site.social.email2 %}or <a href="mailto:{{ site.social.email2 }}"><span>{{ site.social.email2 }}</span></a>{% endif %}
{% endif %}

{% if site.social.whispa %}
  - Whispa: <a href="https://whispa.sh/@{{ site.social.whispa }}"><span>https://whispa.sh/@{{ site.social.whispa }}</span></a>
{% endif %}