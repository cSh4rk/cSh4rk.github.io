import purgecssPkg from '@fullhuman/postcss-purgecss';
import removeForCritical from './build/postcss-remove-for-critical.js';
const purgecss = purgecssPkg.default;

export default (ctx) => ({
  plugins: [
    // Always run PurgeCSS to remove unused CSS
    purgecss({
      content: ['./_site/**/*.html', './_site/**/*.js'],
      css: ['./_site/css/main.css'],
      safelist: [':target'] // keep fragment highlights
    }),

    // Only run for Critical build
    ...(ctx.env === 'critical'
      ? [removeForCritical({ selectors: ['#toTopButton'] })]
      : [])
  ]
});
