"use client";
import { useState, useEffect } from 'react';

export default function CharacterBuilderPage() {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState('');
  const [relationships, setRelationships] = useState('');
  const [expandedChar, setExpandedChar] = useState(null);

  useEffect(() => {
    const storedCharacters = localStorage.getItem('storyWorldBuilderCharacters');
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyWorldBuilderCharacters', JSON.stringify(characters));
  }, [characters]);

  const addCharacter = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newChar = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        traits: traits.trim(),
        relationships: relationships.trim(),
        createdAt: new Date().toLocaleString(),
      };
      setCharacters([...characters, newChar]);
      setName('');
      setDescription('');
      setTraits('');
      setRelationships('');
    }
  };

  const toggleDetails = (charId) => {
    setExpandedChar(expandedChar === charId ? null : charId);
  };

  return (
    <div>
      <h1>Character Builder</h1>

      <div className="form-container">
        <h2>Create New Character</h2>
        <form onSubmit={addCharacter}>
          <div className="form-group">
            <label htmlFor="charName">Character Name</label>
            <input
              type="text"
              id="charName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Elara, The Shadow Weaver"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="charDescription">Description</label>
            <textarea
              id="charDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief physical and personality overview."
            />
          </div>
          <div className="form-group">
            <label htmlFor="charTraits">Key Traits</label>
            <input
              type="text"
              id="charTraits"
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              placeholder="e.g., Brave, Loyal, Secretive, Skilled Archer"
            />
          </div>
          <div className="form-group">
            <label htmlFor="charRelationships">Relationships</label>
            <textarea
              id="charRelationships"
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              placeholder="e.g., Mentor to Liam, Rival of Kael, Sister of Lyra"
            />
          </div>
          <button type="submit" className="primary-button">
            Add Character
          </button>
        </form>
      </div>

      <h2>Your Characters</h2>
      {characters.length === 0 ? (
        <p className="no-items-message">No characters created yet. Bring your heroes and villains to life!</p>
      ) : (
        <div className="item-list">
          {characters.map((char) => (
            <div key={char.id} className="card item-card">
              <h3>{char.name}</h3>
              <p>{char.description || "No description provided."}</p>
              {expandedChar === char.id && (
                <div className="expanded-details">
                  <p><strong>Traits:</strong> {char.traits || "N/A"}</p>
                  <p><strong>Relationships:</strong> {char.relationships || "N/A"}</p>
                  <p><em>Created: {char.createdAt}</em></p>
                </div>
              )}
              <button className="details-toggle" onClick={() => toggleDetails(char.id)}>
                {expandedChar === char.id ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
