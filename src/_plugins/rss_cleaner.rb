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

      # Convert relative <img src> and strip unwanted attributes
      doc.css('img').each do |img|
        src = img['src']
        next if src.nil? || src =~ %r{^https?://}i
        img['src'] = "#{full_base}/#{src}".gsub(%r{([^:])/+}, '\1/')
        # Remove validator-flagged attributes
        img.remove_attribute('loading')
        img.remove_attribute('decoding')
        img.remove_attribute('fetchpriority')
      end

      # Convert <picture> to fallback <img>
      doc.css('picture').each do |pic|
        # Prefer the first <img> inside <picture>
        img = pic.at_css('img')
        pic.replace(img) if img
      end

      # Convert relative <source srcset> to self-closing <source/>
      doc.css('source').each do |source|
        srcset = source['srcset']
        next if srcset.nil?
        source['srcset'] = srcset.split(',').map do |s|
          url, *rest = s.strip.split(' ')
          next s if url =~ %r{^https?://}i
          abs = "#{full_base}/#{url}".gsub(%r{([^:])/+}, '\1/')
          ([abs] + rest).join(' ')
        end.join(', ')
        # Make source self-closing
        source.inner_html = nil
      end

      # Convert relative <a href> (skip mailto:, #, and absolute)
      doc.css('a').each do |a|
        href = a['href']
        next if href.nil? || href =~ %r{^https?://}i || href.start_with?('#', 'mailto:')
        a['href'] = "#{full_base}/#{href}".gsub(%r{([^:])/+}, '\1/')
      end

      # Remove HTML comments
      doc.xpath('//comment()').remove

      # Return cleaned XHTML fragment (self-closing tags)
      doc.to_xhtml
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSCleaner)
