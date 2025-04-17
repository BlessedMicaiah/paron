import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarCollapsed: boolean;
  currentView: 'grid' | 'list';
  filterBy: 'me' | 'everyone';
  sortBy: 'recent' | 'name' | 'created';
}

const initialState: UIState = {
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
    
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setCurrentView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.currentView = action.payload;
    },
    
    setFilterBy: (state, action: PayloadAction<'me' | 'everyone'>) => {
      state.filterBy = action.payload;
    },
    
    setSortBy: (state, action: PayloadAction<'recent' | 'name' | 'created'>) => {
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
