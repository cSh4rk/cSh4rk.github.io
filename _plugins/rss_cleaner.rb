# _plugins/rss_cleaner.rb
require 'nokogiri'

module Jekyll
  module RSSCleaner
    def clean_for_rss(html)
      return '' if html.nil? || html.strip.empty?

      doc = Nokogiri::HTML::DocumentFragment.parse(html)

      # --- Remove unwanted or duplicate content ---
      # Footnotes and references
      doc.css('sup > a[role="doc-noteref"]').each { |a| a.parent.remove }
      doc.css('div.footnotes').remove

      # Scripts, forms, and styles
      doc.css('script, form, style').remove

      # Remove only the first <picture> (post header image)
      first_picture = doc.at_css('picture')
      first_picture.remove if first_picture

      # --- Fix relative resource URLs ---
      site = @context.registers[:site]
      site_url  = site.config['url'].to_s.chomp('/')
      baseurl   = site.config['baseurl'].to_s
      full_base = "#{site_url}#{baseurl}".gsub(%r{([^:])/+}, '\1/')

      # Convert relative <img src>
      doc.css('img').each do |img|
        src = img['src']
        next if src.nil? || src =~ %r{^https?://}i
        img['src'] = "#{full_base}/#{src}".gsub(%r{([^:])/+}, '\1/')
      end

      # Convert relative <source srcset>
      doc.css('source').each do |source|
        srcset = source['srcset']
        next if srcset.nil?
        source['srcset'] = srcset.split(',').map do |s|
          url, *rest = s.strip.split(' ')
          next s if url =~ %r{^https?://}i
          abs = "#{full_base}/#{url}".gsub(%r{([^:])/+}, '\1/')
          ([abs] + rest).join(' ')
        end.join(', ')
      end

      # Convert relative <a href> (skip mailto:, #, and already absolute)
      doc.css('a').each do |a|
        href = a['href']
        next if href.nil? || href =~ %r{^https?://}i || href.start_with?('#', 'mailto:')
        a['href'] = "#{full_base}/#{href}".gsub(%r{([^:])/+}, '\1/')
      end

      # Remove HTML comments
      doc.xpath('//comment()').remove

      # --- Remove stray </source> tags ---
      html_str = doc.to_html
      html_str.gsub!('</source>', '')   # remove any closing </source>

      # Return cleaned HTML fragment
      html_str
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSCleaner)
