const express = require('express');
const ClimateChange = require('../models/ClimateChange');
const Disaster = require('../models/Disaster');
const router = express.Router();

// Get all climate changes
router.get('/', async (req, res) => {
  try {
    const climateChanges = await ClimateChange.find().populate('disasters');
    res.json(climateChanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const climateChange = await ClimateChange.findById(req.params.id).populate('disasters');
      if (!climateChange) return res.status(404).json({ message: 'Climate change not found' });
      res.json(climateChange);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching climate change data', error });
    }
  });
// Get disaster by ID
router.get('/disaster/:id', async (req, res) => {
  try {
    const disaster = await Disaster.findById(req.params.id);
    res.json(disaster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
