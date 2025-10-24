---
layout: page
title: "Cybersecurity, Science & Growth Books"
h1: "Book Recommendations"
image: /books/assets/robot2.png
description: "Discover Nima's Curated Book Recommendations on Technology, Cybersecurity, Science, Personal Growth, and Other Practical Topics for Learning and Growth."
hero-poster: /books/assets/robot2.avif
---

<video autoplay muted loop playsinline width="462" height="308" poster="{{ page.hero-poster }}">
  <source src="/books/assets/robot2.webm" type="video/webm">
  <source src="/books/assets/robot2.mp4" type="video/mp4">
</video>

<br>

<h2 class="section-intro no-decoration neutral-color">Here are my book recommendations:</h2>

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
        <ul  class="topic-list-subtle">
          <li><time datetime="{{ book.date | date_to_xmlschema }}">{{ book.date | date:"%d %b" }} - </time>
            <a href="{{ book.url | prepend: site.baseurl | replace: '//', '/' }}">
              {{ book.title }}
            </a>
            {% if book.tags[0] %}
              <span class="postitem">
                <span class="icon-small">{% include icon-tag.svg %}</span>
                {% for tag in book.tags %}
                  <code class="posttag"><a href="/tags/#{{ tag | replace: " " , "-" | downcase }}" class="no-decoration neutral-color">{{ tag | xml_escape }}</a></code>
                {% endfor %}
              </span>
            {% endif %}
          </li>
        </ul>
    {% endfor %}
  {% endif %}
</section>
