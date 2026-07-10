"use client";
import { useState, useEffect } from 'react';

export default function PlotTimelinePage() {
  const [plotPoints, setPlotPoints] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapter, setChapter] = useState('');
  const [type, setType] = useState('event'); // e.g., 'event', 'climax', 'rising-action', 'falling-action'
  const [expandedPlot, setExpandedPlot] = useState(null);

  useEffect(() => {
    const storedPlotPoints = localStorage.getItem('storyWorldBuilderPlotPoints');
    if (storedPlotPoints) {
      setPlotPoints(JSON.parse(storedPlotPoints));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyWorldBuilderPlotPoints', JSON.stringify(plotPoints));
  }, [plotPoints]);

  const addPlotPoint = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newPlotPoint = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        chapter: chapter.trim(),
        type: type,
        createdAt: new Date().toLocaleString(),
      };
      // For plot points, might want to sort by chapter or a custom order.
      // For now, just add, and the display can be sorted if needed.
      setPlotPoints([...plotPoints, newPlotPoint].sort((a,b) => (a.chapter || '').localeCompare(b.chapter || '')));
      setTitle('');
      setDescription('');
      setChapter('');
      setType('event');
    }
  };

  const toggleDetails = (plotId) => {
    setExpandedPlot(expandedPlot === plotId ? null : plotId);
  };

  return (
    <div>
      <h1>Plot Timeline</h1>

      <div className="form-container">
        <h2>Add New Plot Point</h2>
        <form onSubmit={addPlotPoint}>
          <div className="form-group">
            <label htmlFor="plotTitle">Plot Point Title</label>
            <input
              type="text"
              id="plotTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Hero's Call, Betrayal at Stonebridge"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plotDescription">Description</label>
            <textarea
              id="plotDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail what happens in this key scene or event."
            />
          </div>
          <div className="form-group">
            <label htmlFor="plotChapter">Chapter/Scene (Optional)</label>
            <input
              type="text"
              id="plotChapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g., Chapter 3, Scene 1 (The Forest Encounter)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="plotType">Type of Event</label>
            <select id="plotType" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="event">General Event</option>
              <option value="rising-action">Rising Action</option>
              <option value="climax">Climax</option>
              <option value="falling-action">Falling Action</option>
              <option value="resolution">Resolution</option>
            </select>
          </div>
          <button type="submit" className="primary-button">
            Add Plot Point
          </button>
        </form>
      </div>

      <h2>Your Plot Points</h2>
      {plotPoints.length === 0 ? (
        <p className="no-items-message">No plot points created yet. Map out your story's journey!</p>
      ) : (
        <div className="item-list">
          {plotPoints.map((point) => (
            <div key={point.id} className="card item-card">
              <h3>{point.title}</h3>
              <p><strong>Type:</strong> {point.type}</p>
              {point.chapter && <p><strong>Chapter/Scene:</strong> {point.chapter}</p>}
              {expandedPlot === point.id && (
                <div className="expanded-details">
                  <p><strong>Details:</strong> {point.description || "No description provided."}</p>
                  <p><em>Added: {point.createdAt}</em></p>
                </div>
              )}
              <button className="details-toggle" onClick={() => toggleDetails(point.id)}>
                {expandedPlot === point.id ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
