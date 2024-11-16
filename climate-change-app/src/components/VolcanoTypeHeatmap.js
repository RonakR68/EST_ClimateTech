import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// This is the CSV data URL (you can change it to a local path if you have a local file)
const CSV_FILE_URL = '/processed2_indonesia_volcano_data.csv';  // Replace with your CSV file URL or local path

const VolcanoTypeHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse(CSV_FILE_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // Filter for Indonesia volcanoes and format the data for the heatmap
        const data = result.data
          .filter((row) => row.Country === 'Indonesia') // Filter by Indonesia
          .map((row) => [
            row.Latitude, // latitude
            row.Longitude, // longitude
            row.Type === 'Stratovolcano' ? 1 : 0.5, // Intensity based on volcano type
          ]);
        
        setHeatmapData(data); // Set the formatted heatmap data
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
        intensityExtractor={(m) => m[2]}
      />
    </MapContainer>
  );
};

export default VolcanoTypeHeatmap;
