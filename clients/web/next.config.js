require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withCSS = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withCSS({
  webpack: config => {
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
});
