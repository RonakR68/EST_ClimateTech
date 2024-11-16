import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// Replace this with the URL of your CSV or the local path
const CSV_FILE_URL = '/processed2_indonesia_volcano_data.csv'; // Replace with actual CSV file URL or local path

const VolcanoDensityHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse(CSV_FILE_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // Filter out volcanoes in Indonesia and format the data for the heatmap
        const data = result.data
          .filter((row) => row.Country === 'Indonesia') // Filter for Indonesia
          .map((row) => [
            row.Latitude, // latitude
            row.Longitude, // longitude
            1, // Density per volcano point (can be adjusted based on need)
          ]);
        
        setHeatmapData(data); // Set the processed heatmap data
      },
    });
  }, []);

  return (
    <MapContainer center={[3.139, 101.6869]} zoom={6} style={{ width: "100%", height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer
        fitBoundsOnLoad
        points={heatmapData}
        longitudeExtractor={(m) => m[1]}
        latitudeExtractor={(m) => m[0]}
        intensityExtractor={(m) => m[2]} // The intensity here is fixed at 1 per volcano
      />
    </MapContainer>
  );
};

export default VolcanoDensityHeatmap;
