---
layout: page
title: Books
image: /books/assets/robot2.png
description: "Here are my book recommendations."
---

![](/books/assets/robot2.png)
<br>
<br>

<h3 class="no-decoration">Here are my book recommendations:</h3>

<br>
<section>
  {% if site.categories.books[0] %}

    {% capture currentyear %}{{ 'now' | date: "%Y" }}{% endcapture %}
    {% capture firstpostyear %}{{ site.categories.books[0].date | date: '%Y' }}{% endcapture %}
    {% if currentyear == firstpostyear %}
        <h3>This year's Books</h3>
    {% else %}
        <h3>{{ firstpostyear }}</h3>
    {% endif %}

    {%for book in site.categories.books %}
      {% if book.previous_in_category %}
        {% capture year %}{{ book.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ book.previous_in_category.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
          <h3>{{ book.date | date: '%Y' }}</h3>
        {% endif %}
      {% endif %}
        <ul>
          <li><time>{{ book.date | date:"%d %b" }} - </time>
            <a href="{{ book.url | prepend: site.baseurl | replace: '//', '/' }}">
              {{ book.title }}
            </a>
            {% if book.tags[0] %}
              <span class="postitem">
                <span class="icon-small">{% include icon-tag.svg %}</span>
                {% for tag in book.tags %}
                  <code class="posttag"><a href="/tags/#{{ tag | replace: " " , "-" | downcase }}" class="no-decoration">{{ tag | xml_escape }}</a></code>
                {% endfor %}
              </span>
            {% endif %}
          </li>
        </ul>
    {% endfor %}
  {% endif %}
</section>
