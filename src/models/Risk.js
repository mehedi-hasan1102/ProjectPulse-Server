// models/Risk.js
const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  severity: { type: String, enum: ['Low', 'Medium', 'High'] },
  mitigation: String,
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Risk', riskSchema);
