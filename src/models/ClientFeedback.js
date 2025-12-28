// models/ClientFeedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  satisfaction: { type: Number, min: 1, max: 5 },
  communication: { type: Number, min: 1, max: 5 },
  comment: String,
  flagged: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ClientFeedback', feedbackSchema);
