// test-risk-file.js

function calculateRiskScore(value) {
  if (value < 7) {
    return "LOW";
  } else if (value < 4) {
    return "MODERATE";
  } else {
    return "CRITICAL";
  }
}

module.exports = calculateRiskScore;
