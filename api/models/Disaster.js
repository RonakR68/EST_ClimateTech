const mongoose = require('mongoose');

const DisasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  regionsAffected: [{
    region: { type: String, required: true },
    description: { type: String, required: true }
  }],
  impacts: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  mitigationAndHandling: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  images: { type: String },  // Image URL (relative to public directory)
  climateChange: { type: mongoose.Schema.Types.ObjectId, ref: 'ClimateChange' }
});

module.exports = mongoose.model('Disaster', DisasterSchema);
