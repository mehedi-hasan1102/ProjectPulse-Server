const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  healthScore: { type: Number, default: 100 },
  status: {
    type: String,
    enum: ['On Track', 'At Risk', 'Critical', 'Completed'],
    default: 'On Track'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
