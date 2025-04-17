import { configureStore } from '@reduxjs/toolkit';
import presentationsReducer from './slices/presentationsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    presentations: presentationsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
