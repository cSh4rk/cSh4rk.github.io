---
layout: page
title: Links
image: /links/assets/robot3.png
description: "Here I share web links that I've found interesting."
---

![](/links/assets/robot3.png)
<br>
<br>

<h3 class="no-decoration">Here I share web links that I've found interesting:</h3>

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
        <ul>
          <li><time>{{ link.date | date:"%d %b" }} - </time>
            <a href="{{ link.url | prepend: site.baseurl | replace: '//', '/' }}">
              {{ link.title }}
            </a>
            {% if link.tags[0] %}
              <span class="postitem">
                <span class="icon-small">{% include icon-tag.svg %}</span>
                {% for tag in link.tags %}
                  <code class="posttag"><a href="/tags/#{{ tag | replace: " " , "-" | downcase }}" class="no-decoration">{{ tag | xml_escape }}</a></code>
                {% endfor %}
              </span>
            {% endif %}
          </li>
        </ul>
    {% endfor %}

  {% endif %}
</section>
