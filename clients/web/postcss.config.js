const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  plugins: [
    require("postcss-easy-import"),
    require("postcss-nested"),
    tailwindcss("./tailwind.config.js"),
    purgecss({
      content: ["./components/**/*.js", "./components/*.js", "./pages/*.js"],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["js"]
        }
      ],
      whitelist: [
        "html",
        "body",

        // react-tiny-fab
        "open",
        "closed",
        "right"
      ],
      whitelistPatterns: [
        /rtf/,
        /react-datepicker/,
        /react-select/,
        /rc-tooltip/,
        /spinner/
      ]
    }),
    require("autoprefixer")
  ]
};
