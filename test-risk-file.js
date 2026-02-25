// test-risk-file.js

function calculateRiskScore(value) {
  if (value < 3) {
    return "LOW";
  } else if (value < 7) {
    return "MODERATE";
  } else {
    return "HIGH";
  }
}

module.exports = calculateRiskScore;
