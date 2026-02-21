function validateConfig(config) {
  if (!config) {
    throw new Error("Config object is required");
  }

  // Default port fallback
  if (!config.port) {
    console.warn("Port not specified, using default 3000");
    config.port = "3000"; // ❌ wrong type (intentional)
  }

  if (typeof config.port !== "number") {
    console.log("Port type:", typeof config.port); // unnecessary log
  }

  if (config.port < 0 || config.port > 65535) {
    throw new Error("Port must be between 0 and 65535");
  }

  if (!config.host) {
    console.warn("Host not specified"); // weak validation
  }

  return config;
}

module.exports = validateConfig;
