import React, { createContext, useState, useContext } from 'react';

// Demo data for presentations
const initialPresentations = [
  {
    id: 1,
    title: 'Company Overview',
    thumbnail: 'https://via.placeholder.com/300x200/586EE0/FFFFFF?text=Company+Overview',
    lastEdited: 'Today at 10:30 AM',
    owner: 'You',
    slides: 12
  },
  {
    id: 2,
    title: 'Q2 Marketing Strategy',
    thumbnail: 'https://via.placeholder.com/300x200/FF5C35/FFFFFF?text=Marketing+Strategy',
    lastEdited: 'Yesterday at 2:15 PM',
    owner: 'You',
    slides: 8
  },
  {
    id: 3,
    title: 'Product Roadmap 2025',
    thumbnail: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Product+Roadmap',
    lastEdited: 'March 12, 2025',
    owner: 'Sarah Johnson',
    slides: 15
  },
  {
    id: 4,
    title: 'UX Research Findings',
    thumbnail: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=UX+Research',
    lastEdited: 'March 10, 2025',
    owner: 'You',
    slides: 20
  },
  {
    id: 5,
    title: 'Team Onboarding Guide',
    thumbnail: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Onboarding',
    lastEdited: 'March 8, 2025',
    owner: 'Michael Chen',
    slides: 10
  },
  {
    id: 6,
    title: 'Annual Company Review',
    thumbnail: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Annual+Review',
    lastEdited: 'March 5, 2025',
    owner: 'Jessica Taylor',
    slides: 25
  },
  {
    id: 7,
    title: 'Investor Pitch Deck',
    thumbnail: 'https://via.placeholder.com/300x200/009688/FFFFFF?text=Investor+Pitch',
    lastEdited: 'March 1, 2025',
    owner: 'You',
    slides: 18
  },
  {
    id: 8,
    title: 'Sales Training Workshop',
    thumbnail: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Sales+Training',
    lastEdited: 'February 25, 2025',
    owner: 'Robert Kim',
    slides: 22
  }
];

// Create the context
const PresentationContext = createContext();

// Create a custom hook for using the context
export const usePresentations = () => useContext(PresentationContext);

// Create the context provider component
export const PresentationProvider = ({ children }) => {
  const [presentations, setPresentations] = useState(initialPresentations);
  
  // Add a new presentation
  const addPresentation = (presentation) => {
    const newPresentation = {
      id: presentations.length + 1,
      lastEdited: 'Just now',
      owner: 'You',
      slides: 1,
      ...presentation
    };
    setPresentations([newPresentation, ...presentations]);
    return newPresentation.id;
  };
  
  // Update an existing presentation
  const updatePresentation = (id, updates) => {
    setPresentations(
      presentations.map(presentation => 
        presentation.id === id 
          ? { ...presentation, ...updates, lastEdited: 'Just now' } 
          : presentation
      )
    );
  };
  
  // Delete a presentation
  const deletePresentation = (id) => {
    setPresentations(
      presentations.filter(presentation => presentation.id !== id)
    );
  };
  
  // Get a presentation by ID
  const getPresentation = (id) => {
    return presentations.find(presentation => presentation.id === parseInt(id, 10)) || null;
  };
  
  // Values to be provided to consumers
  const value = {
    presentations,
    addPresentation,
    updatePresentation,
    deletePresentation,
    getPresentation
  };
  
  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
};

export default PresentationProvider;
