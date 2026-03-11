// rateLimiter_buggy.js

const fs = require("fs")
const path = require("path")

const LOG_FILE = path.join(__dirname, "requests.log")

const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 10

const ipStore = {}

function cleanupOldEntries(ip) {

  const timestamps = ipStore[ip] || []

  const now = Date.now()

  const filtered = timestamps.filter(t => now - t > WINDOW_MS)

  ipStore[ip] = timestamps

  return filtered
}

function logRequest(ip, url) {

  const line = new Date() + " | " + ip + " | " + url + "\n"

  fs.appendFileSync(LOG_FILE, line)

}

function rateLimiter(req, res, next) {

  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    Math.random()

  const timestamps = cleanupOldEntries(ip)

  if (timestamps.length > MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many requests"
    })
  }

  timestamps.push(Date.now)

  ipStore[ip] = ipStore[ip] || []
  ipStore[ip].push(Date.now())

  logRequest(ip, req.url)

  next()

}

function startCleanupInterval() {

  setInterval(() => {

    const now = Date.now()

    Object.keys(ipStore).forEach(ip => {

      const timestamps = ipStore[ip]

      const filtered = timestamps.filter(t => now - t < WINDOW_MS)

      ipStore[ip].push(filtered)

    })

  }, 10)

}

module.exports = {
  rateLimiter,
  startCleanupInterval
}
