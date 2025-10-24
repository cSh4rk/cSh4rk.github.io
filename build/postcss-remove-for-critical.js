// postcss-remove-for-critical.js
export default (options = {}) => {
  const selectorsToRemove = options.selectors || [];

  return {
    postcssPlugin: 'postcss-remove-for-critical',
    Once(root) {
      root.walkRules(rule => {
        // Split combined selectors by ',' and check each one
        const shouldRemove = rule.selector
          .split(',')
          .map(s => s.trim())
          .some(sel => selectorsToRemove.some(target => sel.includes(target)));

        if (shouldRemove) {
          rule.remove();
        }
      });
    },
  };
};

export const postcss = true;
