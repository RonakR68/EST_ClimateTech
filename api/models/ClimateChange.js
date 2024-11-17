const mongoose = require('mongoose');

const ClimateChangeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  causes: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  images: { type: String },  // Image URL (relative to public directory)
  disasters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }],
});

module.exports = mongoose.model('ClimateChange', ClimateChangeSchema);
