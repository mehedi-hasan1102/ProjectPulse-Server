// utils/healthScore.js
module.exports = ({ clientRating, confidence, progress, openRisks }) => {
  let score = 100;

  score -= (5 - clientRating) * 10;
  score -= (5 - confidence) * 8;
  score -= (100 - progress) * 0.2;
  score -= openRisks * 5;

  return Math.max(0, Math.round(score));
};
