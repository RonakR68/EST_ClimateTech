import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDisasterById } from '../services/api.js';
import '../styles/DisasterDetails.css';

const DisasterDetails = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    const getDisaster = async () => {
      try {
        const result = await fetchDisasterById(id);
        console.log(result); // Log the response to see the structure
        if (result.data) {
          setDisaster(result.data);
        } else {
          console.log("No data found for this disaster.");
        }
      } catch (error) {
        console.error("Error fetching disaster details:", error);
      }
    };
    getDisaster();
  }, [id]);

  if (disaster === null) {
    return <p>Loading disaster details...</p>;
  }

  return (
    <div className="disaster-details">
      <div className="disaster-header">
        <img
          src={disaster.images}
          alt={disaster.name}
          className="disaster-image"
        />
        <div className="disaster-summary">
          <h2>{disaster.name}</h2>
          <p className="disaster-description">{disaster.description}</p>
        </div>
      </div>

      <div className="details-section">
        <h4>Regions Affected:</h4>
        {disaster.regionsAffected && disaster.regionsAffected.length > 0 ? (
          <ul>
            {disaster.regionsAffected.map((region, index) => (
              <li key={index}>
                <strong>{region.region}</strong>: {region.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No regions listed.</p>
        )}
      </div>

      <div className="impact-details-section">
        <h3>Impacts:</h3>
        {disaster.impacts && disaster.impacts.length > 0 ? (
          <ul>
            {disaster.impacts.map((impact, index) => (
              <li key={index}>
                <strong>{impact.name}</strong>: {impact.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No impacts listed.</p>
        )}
      </div>

      <div className="details-section">
        <h3>Mitigation and Handling:</h3>
        {disaster.mitigationAndHandling && disaster.mitigationAndHandling.length > 0 ? (
          <ul>
            {disaster.mitigationAndHandling.map((strategy, index) => (
              <li key={index}>
                <strong>{strategy.name}</strong>: {strategy.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No mitigation strategies listed.</p>
        )}
      </div>
    </div>
  );
};

export default DisasterDetails;
