import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClimateChangeList from './components/ClimateChangeList';
import ClimateChangeDetails from './components/ClimateChangeDetails';
import DisasterDetails from './components/DisasterDetails';
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClimateChangeList />} />
        <Route path="/climate-change/:id" element={<ClimateChangeDetails />} />
        <Route path="/disaster/:id" element={<DisasterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
