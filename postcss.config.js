import purgecssPkg from '@fullhuman/postcss-purgecss';
const purgecss = purgecssPkg.default;

export default {
  plugins: [
    purgecss({
      content: ['./_site/**/*.html', './_site/**/*.js'],
      css: ['./_site/css/main.css'],
      safelist: [
        ':target' // keeps fragment highlight animations intact
      ],
      rejected: true, // logs removed selectors
    }),
  ],
};
