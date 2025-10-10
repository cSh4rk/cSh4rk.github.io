# _plugins/rss_cleaner.rb
require 'nokogiri'

module Jekyll
  module RSSCleaner
    def clean_for_rss(html)
      return '' if html.nil?

      # Parse HTML fragment
      doc = Nokogiri::HTML::DocumentFragment.parse(html)

      # Remove footnote references
      doc.css('sup > a[role="doc-noteref"]').each { |a| a.parent.remove }

      # Remove footnotes container
      doc.css('div.footnotes').remove

      # Remove scripts, forms, style tags
      doc.css('script, form, style').remove

      # Remove only the first <picture> element (top post image)
      first_picture = doc.at_css('picture')
      first_picture.remove if first_picture

      # Optionally, remove comments
      doc.xpath('//comment()').remove

      # Return cleaned HTML
      doc.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSCleaner)
