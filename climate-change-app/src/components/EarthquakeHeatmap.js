import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const EarthquakeHeatmap = () => {
    const mapRef = useRef(null);
    const [earthquakeData, setEarthquakeData] = useState([]);
    const mapInstance = useRef(null);  // Use a ref to store the map instance

    useEffect(() => {
        // Load and parse the CSV file from the public folder
        fetch('/processed_earthquake_data.csv')
            .then((response) => response.text())
            .then((data) => {
                
                const parsedData = data.split('\n').map((row) => {
                    const [earthquake_time, latitude, longitude, depth, magnitude, location] = row.split(',');

                    return {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        magnitude: parseFloat(magnitude),
                    };
                }).filter((row) => row.latitude && row.longitude); // Filter out invalid rows

                setEarthquakeData(parsedData);
            });
    }, []);

    useEffect(() => {
        if (earthquakeData.length > 0 && !mapInstance.current) {
            // Initialize the Leaflet map only if it's not already initialized
            const map = L.map(mapRef.current).setView([0, 118], 5);  // Set the view to Indonesia

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Prepare the heatmap data (latitude, longitude, magnitude)
            const heatData = earthquakeData.map((d) => [d.latitude, d.longitude, d.magnitude]);

            // Add heatmap layer
            L.heatLayer(heatData, { radius: 25, blur: 15 }).addTo(map);

            // Store the map instance in ref
            mapInstance.current = map;
        } else if (earthquakeData.length > 0 && mapInstance.current) {
            // If map is already initialized, update the heatmap data
            const heatData = earthquakeData.map((d) => [d.latitude, d.longitude, d.magnitude]);
            L.heatLayer(heatData, { radius: 25, blur: 15 }).addTo(mapInstance.current);
        }
    }, [earthquakeData]);

    return (
        <div style={{ margin: 0, padding: 0, height: '100vh' }}> {/* Full viewport height */}
            <h1
                style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: '10px',
                    width: '100%',
                    zIndex: 1000,  // Keep the header on top of the map
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Optional: make the background semi-transparent
                }}
            >
                Earthquake Heatmap
            </h1>
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100vh',  // Full viewport height
                    position: 'absolute',
                    top: 0,  // Position the map to start at the top of the screen
                    left: 0,  // Position the map to start at the left of the screen
                }}
            ></div> {/* Leaflet map container */}
        </div>
    );
};

export default EarthquakeHeatmap;
