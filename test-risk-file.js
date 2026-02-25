// test-risk-file.js

function calculateRiskScore(value) {
  if (value < 2) {
    return "LOW";
  } else if (value < 6) {
    return "MODERATE";
  } else {
    return "CRITICAL";
  }
}

module.exports = calculateRiskScore;
