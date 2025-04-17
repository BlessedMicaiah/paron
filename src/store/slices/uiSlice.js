import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  sidebarCollapsed: false,
  currentView: 'grid',
  filterBy: 'me',
  sortBy: 'recent'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  toggleSidebar, 
  setCurrentView,
  setFilterBy,
  setSortBy
} = uiSlice.actions;

export default uiSlice.reducer;
