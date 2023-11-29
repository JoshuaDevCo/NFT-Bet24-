// config-overrides.js

module.exports = function override(config, env) {
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback["crypto"] = require.resolve("crypto-browserify");
    return config;
  };
  