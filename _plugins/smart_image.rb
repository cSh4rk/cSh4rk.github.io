module Jekyll
  class SmartImageTag < Liquid::Tag
    @@static_paths_cache = nil

    def initialize(tag_name, markup, tokens)
      super
      # Arguments: image [width] [height] [alt] [loading] [fetchpriority] [first_format] [decoding]
      @args = markup.strip.split(/\s+/)
    end

    # Resolve Liquid variables if possible
    def resolve_arg(context, arg)
      return "" if arg.nil? || arg.empty?
      context[arg] || arg
    end

    def render(context)
      site = context.registers[:site]

      @@static_paths_cache ||= site.static_files.map(&:relative_path)

      # Resolve all arguments
      image         = resolve_arg(context, @args[0])
      width  = resolve_arg(context, @args[1] || "").to_s
      height = resolve_arg(context, @args[2] || "").to_s
      alt    = resolve_arg(context, @args[3] || "").to_s
      loading = resolve_arg(context, @args[4] || "").to_s
      fetchpriority = resolve_arg(context, @args[5] || "").to_s
      first_format  = resolve_arg(context, @args[6] || "avif").to_s
      decoding = resolve_arg(context, @args[7] || "").to_s

      # Handle filenames with multiple dots
      parts = image.split(".")
      image_base = parts[0..-2].join(".")

      # Determine format order
      other_format = (first_format == "avif") ? "webp" : "avif"
      formats = [first_format, other_format]

      # Build <source> elements if files exist
      sources = formats.map do |ext|
        candidate = "#{image_base}.#{ext}"
        if @@static_paths_cache.include?(candidate)
          "<source srcset=\"#{candidate}\" type=\"image/#{ext}\">"
        else
          ""
        end
      end.join("\n")

      # Optional attributes
      width_attr  = width.empty? ? "" : " width=\"#{width}\""
      height_attr = height.empty? ? "" : " height=\"#{height}\""
      alt_attr    = alt.empty? ? "" : " alt=\"#{alt}\""
      loading_attr = loading.empty? ? "" : " loading=\"#{loading}\""
      fetch_attr   = fetchpriority.empty? ? "" : " fetchpriority=\"#{fetchpriority}\""
      decoding_attr = decoding.empty? ? "" : " decoding=\"#{decoding}\""


      # Build <picture> block
      <<~HTML
      <picture>
        #{sources}
        <img src="#{image}"#{width_attr}#{height_attr}#{alt_attr}#{loading_attr}#{fetch_attr}#{decoding_attr}>
      </picture>
      HTML
    end
  end
end

Liquid::Template.register_tag('smart_image', Jekyll::SmartImageTag)
