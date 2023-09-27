import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SetFilterPayload, FiltersState } from '@/types/filter';

const initialState: FiltersState = {
  century: null,
  culture: null,
  period: null,
  technique: null,
  place: null,
  color: null,
  worktype: null,
  classification: null,
};

const filters = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state[action.payload.key] = action.payload.value;
    },
    resetFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state[action.payload.key] = null;
    },
  },
});

export const { setFilter, resetFilter } = filters.actions;
export default filters.reducer;
