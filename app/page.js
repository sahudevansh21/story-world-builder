"use client";
import { useState, useEffect } from 'react';

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    // Load projects from localStorage on mount
    const storedProjects = localStorage.getItem('storyWorldBuilderProjects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    // Save projects to localStorage whenever they change
    localStorage.setItem('storyWorldBuilderProjects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      const newProject = {
        id: Date.now(),
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
        createdAt: new Date().toLocaleString(),
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
    }
  };

  const toggleDetails = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div>
      <h1>Projects Dashboard</h1>

      <div className="form-container">
        <h2>Create New Project</h2>
        <form onSubmit={addProject}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="e.g., The Chronicles of Eldoria"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea
              id="projectDescription"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="A brief overview of your story world."
            />
          </div>
          <button type="submit" className="primary-button">
            Add Project
          </button>
        </form>
      </div>

      <h2>Your Projects</h2>
      {projects.length === 0 ? (
        <p className="no-items-message">No projects created yet. Start building your world!</p>
      ) : (
        <div className="item-list">
          {projects.map((project) => (
            <div key={project.id} className="card item-card">
              <h3>{project.name}</h3>
              <p>{project.description || "No description provided."}</p>
              <p><em>Created: {project.createdAt}</em></p>
              {expandedProject === project.id ? (
                <div className="expanded-details">
                  {/* For a real app, this would link to a project-specific view */}
                  <p>Details for this project would go here.</p>
                  <p>You can imagine specific characters, locations, and plot points appearing here.</p>
                </div>
              ) : null}
              <button className="details-toggle" onClick={() => toggleDetails(project.id)}>
                {expandedProject === project.id ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
