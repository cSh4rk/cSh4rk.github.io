---
layout: page
title: "Curated Tech & Productivity Links"
h1: "Curated Web Links"
image: /links/assets/robot3.png
description: "Explore Nima's Curated Web Links and Resources on Technology, Cybersecurity, Productivity, and Life to Help You Learn, Grow, and Stay Inspired."
---

{% smart_image /links/assets/robot3.png 256 384 "" eager high %}

<br>

<h2 class="section-intro no-decoration neutral-color">Here I share web links that I find interesting:</h2>

<br>
<section>
  {% if site.categories.links[0] %}

    {% capture currentyear %}{{ 'now' | date: "%Y" }}{% endcapture %}
    {% capture firstpostyear %}{{ site.categories.links[0].date | date: '%Y' }}{% endcapture %}
    {% if currentyear == firstpostyear %}
        <h3>This year's Links</h3>
    {% else %}
        <h3>{{ firstpostyear }}</h3>
    {% endif %}

    {% for link in site.categories.links %}
      {% if link.previous_in_category %}
        {% capture year %}{{ link.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ link.previous_in_category.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
          <h3>{{ link.date | date: '%Y' }}</h3>
        {% endif %}
      {% endif %}
        <ul  class="topic-list-subtle">
          <li><time datetime="{{ link.date | date_to_xmlschema }}">{{ link.date | date:"%d %b" }} - </time>
            <a href="{{ link.url | prepend: site.baseurl | replace: '//', '/' }}">
              {{ link.title }}
            </a>
            {% if link.tags[0] %}
              <span class="postitem">
                <span class="icon-small">{% include icon-tag.svg %}</span>
                {% for tag in link.tags %}
                  <code class="posttag"><a href="/tags/#{{ tag | replace: " " , "-" | downcase }}" class="no-decoration neutral-color">{{ tag | xml_escape }}</a></code>
                {% endfor %}
              </span>
            {% endif %}
          </li>
        </ul>
    {% endfor %}

  {% endif %}
</section>
