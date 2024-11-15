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
      const result = await fetchClimateChangeById(id);
      setClimateChange(result.data);
    };

    const getRelatedClimateChangeIds = async () => {
      const allClimateChanges = await fetchAllClimateChanges();

      // Find and set IDs for "Rising Sea Level" and "Extreme Weather Events"
      const risingSeaLevel = allClimateChanges.data.find(change => change.name === 'Rising Sea Levels');
      const extremeWeatherEvents = allClimateChanges.data.find(change => change.name === 'Extreme Weather Events');

      if (risingSeaLevel) setRisingSeaLevelId(risingSeaLevel._id);
      if (extremeWeatherEvents) setExtremeWeatherEventsId(extremeWeatherEvents._id);
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
      {/* Analysis Section */}
      <section className="climate-analysis">
        {
          climateChange.name === 'Earthquakes' ?
            (<>
              <h3>Analysis of {climateChange.name}</h3>
              <button onClick={() => setShowAnalysis(!showAnalysis)}>
                {showAnalysis ? 'Hide Analysis' : 'View Analysis'}
              </button>
              {showAnalysis && (
                <iframe
                  src={`${process.env.PUBLIC_URL}/earth_quake_pdf.pdf`}
                  title="Earthquake Analysis"
                  width="100%"
                  height="900px"
                  className="analysis-frame"
                ></iframe>
              )}
            </>) :
            (<></>)
            // (<h3>Analysis not Available</h3>)
        }
      </section>
    </div>
  );
};

export default ClimateChangeDetails;
