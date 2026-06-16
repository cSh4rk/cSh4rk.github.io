---
layout: page
title: "Browse All Topics & Post Tags"
h1: "Topics & Tags"
permalink: /tags/
image: /assets/skull4.png
description: "Browse All Post Tags and Topics on the Diaries of a Modern Ninja to Easily Find Content on Technology, Cybersecurity, Personal Growth, and More."
smooth-fragments: true
---

{% smart_image /assets/skull4.png 128 128 "" eager high %}

<br>

<h2 class="section-intro no-decoration neutral-color">Search through all the topics and tags included in website posts:</h2>

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
  <ul class="topic-list">
    {% assign list = tag[1] %}  
    {% for post in list %}

      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date:"%d %b %Y" }} - </time>
        <a href="/{{ post.categories[0] | xml_escape | downcase }}/" class="neutral-color">{{ post.categories[0] | xml_escape | capitalize }}</a> -
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}
<br>
{% assign taglist = nil %}

#### _References_
* * *
<span class="tiny">Icon by <a href="https://www.flaticon.com/authors/good-ware" rel="nofollow">Good Ware</a> from <a href="https://www.flaticon.com" rel="nofollow">Flaticon</a></span>