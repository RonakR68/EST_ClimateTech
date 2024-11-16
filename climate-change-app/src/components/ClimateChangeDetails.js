import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchClimateChangeById, fetchAllClimateChanges } from '../services/api.js';
import "../styles/ClimateChangeDetails.css";

const ClimateChangeDetails = () => {
  const { id } = useParams();
  const [climateChange, setClimateChange] = useState(null);
  const [risingSeaLevelId, setRisingSeaLevelId] = useState(null);
  const [extremeWeatherEventsId, setExtremeWeatherEventsId] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    const getClimateChange = async () => {
      try {
        const result = await fetchClimateChangeById(id);
        setClimateChange(result.data);
      } catch (error) {
        console.error('Error fetching climate change:', error);
      }
    };

    const getRelatedClimateChangeIds = async () => {
      try {
        const allClimateChanges = await fetchAllClimateChanges();
        const risingSeaLevel = allClimateChanges.data.find(change => change.name === 'Rising Sea Levels');
        const extremeWeatherEvents = allClimateChanges.data.find(change => change.name === 'Extreme Weather Events');

        if (risingSeaLevel) setRisingSeaLevelId(risingSeaLevel._id);
        if (extremeWeatherEvents) setExtremeWeatherEventsId(extremeWeatherEvents._id);
      } catch (error) {
        console.error('Error fetching related climate changes:', error);
      }
    };

    getClimateChange();
    getRelatedClimateChangeIds();
  }, [id]);

  if (!climateChange) return <p className="loading">Loading...</p>;

  return (
    <div className="climate-change-details">
      <div className="climate-header">
        <img
          src={`${climateChange.images}`}
          alt={climateChange.name}
          className="climate-image"
        />
        <div className="climate-summary">
          <h2>{climateChange.name}</h2>
          <p className="climate-description">{climateChange.description}</p>
        </div>
      </div>

      <section className="climate-causes">
        <h3>Causes of {climateChange.name}</h3>
        <ul>
          {climateChange.causes.map((cause, index) => (
            <li key={index} className="cause-item">
              <h3>{cause.name}</h3>
              <h4>{cause.description}</h4>
            </li>
          ))}
          {climateChange.name === 'Global Warming' && (
            <li className="cause-item">
              <iframe
                src="https://ourworldindata.org/grapher/total-ghg-emissions?tab=chart&country=~IDN"
                loading="lazy"
                style={{ width: '100%', height: '600px', border: '0px none' }}
                title="Greenhouse gas emissions"
              ></iframe>
              {/* Add other iframes for Global Warming */}
            </li>
          )}
          {climateChange.name === 'Volcanic Erruptions' && (
            <li className="cause-item">
              <iframe
                src="https://ourworldindata.org/grapher/significant-volcanic-eruptions?tab=chart&country=~IDN"
                loading="lazy"
                style={{ width: '100%', height: '600px', border: '0px none' }}
                title="Significant Volcanic Eruptions"
              ></iframe>
            </li>
          )}
        </ul>
      </section>

      <section className="climate-disasters">
        <h3>Outcome of {climateChange.name}</h3>
        <ul>
          {climateChange.name === 'Global Warming' ? (
            <>
              {risingSeaLevelId && (
                <li className="disaster-item">
                  <Link to={`/climate-change/${risingSeaLevelId}`}>Rising Sea Level</Link>
                </li>
              )}
              {extremeWeatherEventsId && (
                <li className="disaster-item">
                  <Link to={`/climate-change/${extremeWeatherEventsId}`}>Extreme Weather Events</Link>
                </li>
              )}
            </>
          ) : (
            climateChange.disasters && climateChange.disasters.map((disaster) => (
              <li key={disaster._id} className="disaster-item">
                <Link to={`/disaster/${disaster._id}`}>{disaster.name}</Link>
              </li>
            ))
          )}
        </ul>
      </section>

      {climateChange.name === 'Earthquakes' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/earthquake-heatmap" className="heatmap-link">
              View Earthquake Heatmap
            </a>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <a href="/earthquake-filter" className="filter-link">
              View Earthquake Data
            </a>
          </div>

          <button onClick={() => window.open("https://www.kaggle.com/code/ronakredkar123/indonesia-earthquake-visualisation-and-forecast", "_blank")}>
          View Analysis
          </button>

        </section>
      )}

      {climateChange.name === 'Volcanic Erruptions' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          {/* <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/volcano-type-heatmap" className="heatmap-link">
              View Volcano Type Heatmap
            </a>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/volcano-density-heatmap" className="heatmap-link">
              View Volcano Density Heatmap
            </a>
          </div> */}
          <button onClick={() => window.open("https://www.kaggle.com/code/jayankmahaur/volcano-notebook/edit", "_blank")}>
          View Analysis
          </button>
        </section>
      )}

      {climateChange.name === 'Rising Sea Levels' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          <button onClick={() => window.open("https://www.kaggle.com/code/ronakredkar123/indonesia-flood-prediction", "_blank")}>
          View Analysis
          </button>
        </section>
      )}
    </div>

  );
};

export default ClimateChangeDetails;
