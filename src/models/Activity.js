// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  type: String, // checkin, feedback, risk, status
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
