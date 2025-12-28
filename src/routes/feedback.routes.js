const express = require('express');
const router = express.Router();
const Feedback = require('../models/ClientFeedback');
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const calcHealth = require('../utils/healthScore');

// Submit feedback
router.post('/', auth, role('client'), async (req, res) => {
  const { project, satisfaction, communication, comment, flagged } = req.body;

  const feedback = await Feedback.create({
    project,
    client: req.user.id,
    satisfaction,
    communication,
    comment,
    flagged
  });

  const health = calcHealth({
    clientRating: satisfaction,
    confidence: 5,
    progress: 100,
    openRisks: flagged ? 1 : 0
  });

  await Project.findByIdAndUpdate(project, {
    healthScore: health
  });

  await Activity.create({
    project,
    type: 'feedback',
    message: `Client submitted feedback`
  });

  res.json(feedback);
});

module.exports = router;
