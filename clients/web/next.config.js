require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules")(['modali']);

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withTM(
  withCSS({
    webpack: (config, { isServer }) => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];

      return config;
    }
  })
);
