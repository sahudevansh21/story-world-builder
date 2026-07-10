"use client";
import { useState, useEffect } from 'react';

export default function LocationDesignerPage() {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [significance, setSignificance] = useState('');
  const [expandedLoc, setExpandedLoc] = useState(null);

  useEffect(() => {
    const storedLocations = localStorage.getItem('storyWorldBuilderLocations');
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyWorldBuilderLocations', JSON.stringify(locations));
  }, [locations]);

  const addLocation = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newLoc = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        significance: significance.trim(),
        createdAt: new Date().toLocaleString(),
      };
      setLocations([...locations, newLoc]);
      setName('');
      setDescription('');
      setSignificance('');
    }
  };

  const toggleDetails = (locId) => {
    setExpandedLoc(expandedLoc === locId ? null : locId);
  };

  return (
    <div>
      <h1>Location Designer</h1>

      <div className="form-container">
        <h2>Create New Location</h2>
        <form onSubmit={addLocation}>
          <div className="form-group">
            <label htmlFor="locName">Location Name</label>
            <input
              type="text"
              id="locName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., The Whispering Woods, Skyreach Citadel"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="locDescription">Description</label>
            <textarea
              id="locDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe its appearance, atmosphere, and general feel."
            />
          </div>
          <div className="form-group">
            <label htmlFor="locSignificance">Plot Significance/Events</label>
            <textarea
              id="locSignificance"
              value={significance}
              onChange={(e) => setSignificance(e.target.value)}
              placeholder="e.g., Site of ancient battle, place where prophecy was revealed, character's hidden refuge."
            />
          </div>
          <button type="submit" className="primary-button">
            Add Location
          </button>
        </form>
      </div>

      <h2>Your Locations</h2>
      {locations.length === 0 ? (
        <p className="no-items-message">No locations created yet. Design the stages for your epic!</p>
      ) : (
        <div className="item-list">
          {locations.map((loc) => (
            <div key={loc.id} className="card item-card">
              <h3>{loc.name}</h3>
              <p>{loc.description || "No description provided."}</p>
              {expandedLoc === loc.id && (
                <div className="expanded-details">
                  <p><strong>Significance:</strong> {loc.significance || "N/A"}</p>
                  <p><em>Created: {loc.createdAt}</em></p>
                </div>
              )}
              <button className="details-toggle" onClick={() => toggleDetails(loc.id)}>
                {expandedLoc === loc.id ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
