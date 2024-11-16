import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClimateChangeList from './components/ClimateChangeList';
import ClimateChangeDetails from './components/ClimateChangeDetails';
import DisasterDetails from './components/DisasterDetails';
import EarthquakeHeatmap from './components/EarthquakeHeatmap';
import EarthquakeFilterSort from './components/EarthquakeFilter';
// import VolcanoTypeHeatmap from './components/VolcanoTypeHeatmap';       // Import VolcanoTypeHeatmap
// import VolcanoDensityHeatmap from './components/VolcanoDensityHeatmap'; // Import VolcanoDensityHeatmap

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClimateChangeList />} />
        <Route path="/climate-change/:id" element={<ClimateChangeDetails />} />
        <Route path="/disaster/:id" element={<DisasterDetails />} />
        <Route path="/earthquake-heatmap" element={<EarthquakeHeatmap />} />
        <Route path="/earthquake-filter" element={<EarthquakeFilterSort />} />
        {/* <Route path="/volcano-type-heatmap" element={<VolcanoTypeHeatmap />} />         Route for VolcanoTypeHeatmap */}
        {/* <Route path="/volcano-density-heatmap" element={<VolcanoDensityHeatmap />} />   Route for VolcanoDensityHeatmap */}
      </Routes>
    </Router>
  );
}

export default App;
