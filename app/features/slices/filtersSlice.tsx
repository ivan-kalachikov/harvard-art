import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FiltersKeys = 'culture' | 'technique';
type SetFilterPayload = {
  key: FiltersKeys;
  value: number | null;
};
type FiltersState = {
  culture: number | null;
  technique: number | null;
};

const initialState: FiltersState = {
  culture: null,
  technique: null,
};

const filters = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state[action.payload.key as keyof FiltersState] = action.payload.value;
    },
    resetFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state[action.payload.key as keyof FiltersState] = null;
    },
  },
});

export const { setFilter } = filters.actions;
export default filters.reducer;
