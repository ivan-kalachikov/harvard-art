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
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFilter } = filters.actions;
export default filters.reducer;
