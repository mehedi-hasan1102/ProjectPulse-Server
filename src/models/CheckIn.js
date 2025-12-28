// models/CheckIn.js
const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  progress: String,
  blockers: String,
  confidence: { type: Number, min: 1, max: 5 },
  completion: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('CheckIn', checkInSchema);
