import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/slices/filtersSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
