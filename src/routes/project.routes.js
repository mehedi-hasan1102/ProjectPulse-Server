const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Activity = require('../models/Activity');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// Create project
router.post('/', auth, role('admin'), async (req, res) => {
  const project = await Project.create(req.body);

  await Activity.create({
    project: project._id,
    type: 'project',
    message: `Project created: ${project.name}`
  });

  res.json(project);
});

// Get all projects
router.get('/', auth, async (req, res) => {
  const projects = await Project.find()
    .populate('client employees', 'name role');
  res.json(projects);
});

module.exports = router;
