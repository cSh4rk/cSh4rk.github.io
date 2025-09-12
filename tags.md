---
layout: default
title: "Tags"
permalink: /tags/
image: /assets/robot4.png
description: "Search through all the topics and tags included in website posts."
hero-poster: /assets/robot4.avif
---

<video autoplay muted loop playsinline width="462" height="308" poster="{{ page.hero-poster }}">
  <source src="/assets/robot4.webm" type="video/webm">
  <source src="/assets/robot4.mp4" type="video/mp4">
</video>
<br>
<br>

<h3 class="no-decoration">Search through all the topics and tags included in website posts:</h3>

<br>
<ul>
  {% assign list = site.tags | sort %}
    {% for tag in list %}
      <li>
        <a href="#{{ tag[0] | replace: " " , "-" | downcase }}">
          {{ tag[0] }}
        </a>
        <span>({{ tag[1].size }})</span>
      </li>
    {% endfor %}
  {% assign list = nil %}
</ul>
<br>
* * *
<br>
{% assign taglist = site.tags | sort %}
{% for tag in taglist %}
  <div class="tags" id="{{ tag[0] | replace: " " , "-" | downcase }}">{{ tag[0] }}</div>
  <ul>
    {% assign list = tag[1] %}  
    {% for post in list %}

      <li>
        <time>{{ post.date | date:"%d %b %Y" }} - </time>
        <a href="/{{ post.categories[0] | xml_escape | downcase }}/" class="no-decoration">{{ post.categories[0] | xml_escape | capitalize }}</a> -
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}
<br>
{% assign taglist = nil %}
