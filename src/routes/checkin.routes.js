const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const calcHealth = require('../utils/healthScore');

// Submit check-in
router.post('/', auth, role('employee'), async (req, res) => {
  const { project, progress, blockers, confidence, completion } = req.body;

  const checkIn = await CheckIn.create({
    project,
    employee: req.user.id,
    progress,
    blockers,
    confidence,
    completion
  });

  const openRisks = 0; // will update later
  const health = calcHealth({
    clientRating: 5,
    confidence,
    progress: completion,
    openRisks
  });

  await Project.findByIdAndUpdate(project, {
    healthScore: health
  });

  await Activity.create({
    project,
    type: 'checkin',
    message: `Employee submitted weekly check-in`
  });

  res.json(checkIn);
});

module.exports = router;
