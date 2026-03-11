// rateLimiter.js

const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "requests.log");

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const ipStore = new Map();

function cleanupOldEntries(ip) {
  const now = Date.now();
  const timestamps = ipStore.get(ip) || [];

  const filtered = timestamps.filter(
    (t) => now - t < WINDOW_MS
  );

  ipStore.set(ip, filtered);
  return filtered;
}

function logRequest(ip, url) {
  const line = `${new Date().toISOString()} | ${ip} | ${url}\n`;

  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error("Log write failed:", err);
  });
}

function rateLimiter(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  const timestamps = cleanupOldEntries(ip);

  if (timestamps.length >= MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many requests",
    });
    return;
  }

  timestamps.push(Date.now());
  ipStore.set(ip, timestamps);

  logRequest(ip, req.url);

  next();
}

function startCleanupInterval() {
  setInterval(() => {
    const now = Date.now();

    for (const [ip, timestamps] of ipStore.entries()) {
      const filtered = timestamps.filter(
        (t) => now - t < WINDOW_MS
      );

      if (filtered.length === 0) {
        ipStore.delete(ip);
      } else {
        ipStore.set(ip, filtered);
      }
    }
  }, WINDOW_MS);
}

module.exports = {
  rateLimiter,
  startCleanupInterval,
};
