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

      # Remove scripts
      doc.css('script').remove

      # Remove forms
      doc.css('form').remove

      # Remove style tags
      doc.css('style').remove

      # Optionally, remove comments
      doc.xpath('//comment()').remove

      # Return cleaned HTML
      doc.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSCleaner)
