module.exports = function calculateHealth({
  clientRating = 5,
  employeeConfidence = 5,
  progress = 0,
  openRisks = 0
}) {
  let score = 100;

  score -= (5 - clientRating) * 10;
  score -= (5 - employeeConfidence) * 8;
  score -= Math.max(0, 100 - progress) * 0.2;
  score -= openRisks * 5;

  return Math.max(0, Math.round(score));
};
