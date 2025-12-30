const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const CheckIn = require('../models/CheckIn');
const Feedback = require('../models/ClientFeedback');
const Risk = require('../models/Risk');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// Unified dashboard route
router.get('/', auth, async (req, res) => {
  const userRole = req.user.role;
  const userId = req.user.id;
  const today = new Date();

  try {
    if (userRole === 'admin') {
      const projects = await Project.find().populate('client employees', 'name');

      const grouped = { 'On Track': [], 'At Risk': [], 'Critical': [], 'Completed': [] };
      const missingCheckIns = [];
      const highRiskProjects = [];

      for (let p of projects) {
        grouped[p.status].push(p);

        // Missing recent check-ins
        const lastCheckIn = await CheckIn.find({ project: p._id })
          .sort({ createdAt: -1 })
          .limit(1);
        if (!lastCheckIn.length || ((today - lastCheckIn[0].createdAt) / (1000*60*60*24)) > 7) {
          missingCheckIns.push(p);
        }

        // High-risk projects
        const openRisks = await Risk.find({ project: p._id, status: 'Open' });
        if (openRisks.some(r => r.severity === 'High')) {
          highRiskProjects.push({
            project: p,
            highSeverityCount: openRisks.filter(r => r.severity === 'High').length
          });
        }
      }

      return res.json({ role: 'admin', grouped, missingCheckIns, highRiskProjects });
    }

    if (userRole === 'employee') {
      const projects = await Project.find({ employees: userId });
      const dashboard = [];

      for (let p of projects) {
        const lastCheckIn = await CheckIn.find({ project: p._id, employee: userId })
          .sort({ createdAt: -1 })
          .limit(1);

        const lastCheckInDate = lastCheckIn.length ? lastCheckIn[0].createdAt : null;
        const pendingCheckIn = !lastCheckInDate || ((today - lastCheckInDate)/(1000*60*60*24)) > 7;

        const openRisks = await Risk.find({ project: p._id, status: 'Open' });

        dashboard.push({
          project: p,
          pendingCheckIn,
          openRisksCount: openRisks.length
        });
      }

      return res.json({ role: 'employee', dashboard });
    }

    if (userRole === 'client') {
      const projects = await Project.find({ client: userId });
      const dashboard = [];

      for (let p of projects) {
        const lastFeedback = await Feedback.find({ project: p._id, client: userId })
          .sort({ createdAt: -1 })
          .limit(1);

        dashboard.push({
          project: p,
          healthScore: p.healthScore,
          lastFeedback: lastFeedback.length ? lastFeedback[0] : null
        });
      }

      return res.json({ role: 'client', dashboard });
    }

    return res.status(403).json({ message: 'Invalid role' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
