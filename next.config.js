const withPWA = require("next-pwa")({
  dest: "public",
});
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  trailingSlash: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});
