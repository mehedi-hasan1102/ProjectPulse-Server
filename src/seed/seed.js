// seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Project.deleteMany();

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin'
  });

  const employee = await User.create({
    name: 'Employee',
    email: 'employee@test.com',
    password: '123456',
    role: 'employee'
  });

  const client = await User.create({
    name: 'Client',
    email: 'client@test.com',
    password: '123456',
    role: 'client'
  });

  await Project.create({
    name: 'ProjectPulse Demo',
    description: 'Demo project',
    client: client._id,
    employees: [employee._id]
  });

  console.log('Seed complete');
  process.exit();
})();
