---
layout: page
title: Blog
image: /blog/assets/poison3.png
description: "Here I talk about anything, mostly technical topics."
---

![](/blog/assets/poison3.png)
<br>
<br>

<h3 class="no-decoration">Here I talk about anything, mostly technical topics:</h3>

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
          <li><time>{{ post.date | date:"%d %b" }} - </time>
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

<br>
#### _References_
* * *
<span class="tiny">Icon made by <a href="https://iconarchive.com/artist/mirella-gabriele.html">mirella.design</a>.</span>
