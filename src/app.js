require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// INIT APP FIRST
const app = express();

// DB & MIDDLEWARE
connectDB();
app.use(express.json());

// ROUTES
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const checkInRoutes = require('./routes/checkin.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const riskRoutes = require('./routes/risk.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/checkins', checkInRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/risks', riskRoutes);
app.use('/api/dashboard', dashboardRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Project Pulse API running');
});

module.exports = app;
