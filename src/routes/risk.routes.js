const express = require('express');
const router = express.Router();
const Risk = require('../models/Risk');
const Activity = require('../models/Activity');
const auth = require('../middlewares/auth.middleware');

// Create risk
router.post('/', auth, async (req, res) => {
  const risk = await Risk.create(req.body);

  await Activity.create({
    project: req.body.project,
    type: 'risk',
    message: `Risk created: ${risk.title}`
  });

  res.json(risk);
});

// Resolve risk
router.put('/:id', auth, async (req, res) => {
  const risk = await Risk.findByIdAndUpdate(
    req.params.id,
    { status: 'Resolved' },
    { new: true }
  );

  res.json(risk);
});

module.exports = router;
