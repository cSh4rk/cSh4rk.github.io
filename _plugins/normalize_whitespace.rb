module Jekyll
  module NormalizeWhitespace
    def normalize_whitespace(input)
      input.to_s.gsub(/\s+/, ' ').strip
    end
  end
end

Liquid::Template.register_filter(Jekyll::NormalizeWhitespace)