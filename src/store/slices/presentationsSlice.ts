import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for our state
export interface Slide {
  id: string;
  content: string;
  background?: string;
  order: number;
}

export interface Presentation {
  id: number | string;
  title: string;
  thumbnail: string;
  lastEdited: string;
  owner: string;
  slides: number | Slide[];
  isPrivate?: boolean;
  tags?: string[];
}

interface PresentationsState {
  items: Presentation[];
  loading: boolean;
  error: string | null;
  currentPresentation: Presentation | null;
}

// Demo data for presentations
const initialPresentations = [
  {
    id: 1,
    title: 'Prayer Point',
    thumbnail: 'https://via.placeholder.com/300x200/586EE0/FFFFFF?text=Prayer+Point',
    lastEdited: 'Mar 14, 2023',
    owner: 'You',
    slides: 12,
    isPrivate: true
  },
  {
    id: 2,
    title: 'Copy of Prayer Point',
    thumbnail: 'https://via.placeholder.com/300x200/586EE0/FFFFFF?text=Prayer+Point',
    lastEdited: 'Mar 14, 2023',
    owner: 'You',
    slides: 12,
    isPrivate: true
  },
  {
    id: 3,
    title: 'Welcome to Pitch',
    thumbnail: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Welcome+to+Pitch',
    lastEdited: 'Mar 14, 2023',
    owner: 'You',
    slides: 15,
    isPrivate: true
  },
  {
    id: 4,
    title: 'Set up your workspace',
    thumbnail: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Workspace+Setup',
    lastEdited: 'Mar 14, 2023',
    owner: 'You',
    slides: 20,
    isPrivate: true
  },
  {
    id: 5,
    title: 'Check out a few power tips',
    thumbnail: 'https://via.placeholder.com/300x200/FF5C35/FFFFFF?text=Power+Tips',
    lastEdited: 'Mar 14, 2023',
    owner: 'You',
    slides: 10,
    isPrivate: true
  }
];

const initialState: PresentationsState = {
  items: initialPresentations,
  loading: false,
  error: null,
  currentPresentation: null
};

const presentationsSlice = createSlice({
  name: 'presentations',
  initialState,
  reducers: {
    // Add a new presentation
    addPresentation: (state, action: PayloadAction<Presentation>) => {
      state.items.push(action.payload);
    },
    
    // Update an existing presentation
    updatePresentation: (state, action: PayloadAction<Presentation>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    
    // Delete a presentation
    deletePresentation: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    
    // Set the current presentation
    setCurrentPresentation: (state, action: PayloadAction<number | string | null>) => {
      if (action.payload === null) {
        state.currentPresentation = null;
      } else {
        state.currentPresentation = state.items.find(p => p.id === action.payload) || null;
      }
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addPresentation, 
  updatePresentation, 
  deletePresentation, 
  setCurrentPresentation,
  setLoading,
  setError
} = presentationsSlice.actions;

export default presentationsSlice.reducer;
