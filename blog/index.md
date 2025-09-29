---
layout: page
title: Blog
image: /blog/assets/robot1.png
description: "Here I talk about anything, mostly technical topics."
hero-poster: /blog/assets/robot1.avif
---

<!-- 
  Using AVIF poster only:
  - ~95% of users see the poster correctly (modern browsers).
  - Older browsers that don't support AVIF just see a blank before playback.
  - Video still plays fine, so UX impact is minimal.
-->
<video autoplay muted loop playsinline width="308" height="462" poster="{{ page.hero-poster }}">
  <source src="/blog/assets/robot1.webm" type="video/webm">
  <source src="/blog/assets/robot1.mp4" type="video/mp4">
</video>

<br>

<h2 class="section-intro no-decoration">Here I talk about anything, mostly technical topics:</h2>

<br>
<section>
  {% if site.categories.blog[0] %}

    {% capture currentyear %}{{ 'now' | date: "%Y" }}{% endcapture %}
    {% capture firstpostyear %}{{ site.categories.blog[0].date | date: '%Y' }}{% endcapture %}
    {% if currentyear == firstpostyear %}
        <h3>This year's Posts</h3>
    {% else %}  
        <h3>{{ firstpostyear }}</h3>
    {% endif %}

    {%for post in site.categories.blog %}
      {% if post.previous_in_category %}
        {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ post.previous_in_category.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
          <h3>{{ post.date | date: '%Y' }}</h3>
        {% endif %}
      {% endif %}
        <ul>
          <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date:"%d %b" }} - </time>
            <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
              {{ post.title }}
            </a>
            {% if post.tags[0] %}
              <span class="postitem">
                <span class="icon-small">{% include icon-tag.svg %}</span>
                {% for tag in post.tags %}
                  <code class="posttag"><a href="/tags/#{{ tag | replace: " " , "-" | downcase }}" class="no-decoration">{{ tag | xml_escape }}</a></code>
                {% endfor %}
              </span>
            {% endif %}
          </li>
        </ul>
    {% endfor %}
  {% endif %}
</section>
