import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchPlaces } from '../api/places';

export const fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  (input, { rejectWithValue }) => {
    try {
      const list = searchPlaces(input);
      return list;
    } catch (err) {
      return rejectWithValue(err?.message, err);
    }
  },
);

const { reducer } = createSlice({
  name: 'places',
  initialState: {
    places: [],
    loading: false,
    value: 0,
    error: null,
    currentRequestId: undefined
  },
  reducers: {
  },
  extraReducers: {
    [fetchPlaces.pending]: (state, { meta }) => {
      state.loading = true;
      state.currentRequestId = meta.requestId;
      state.places=[];
    },
    [fetchPlaces.fulfilled]: (state, { meta, payload }) => {
      if(state.currentRequestId === meta.requestId){
        state.places = payload;
      }
      state.loading = false;
    },
    [fetchPlaces.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  }
})

export default reducer;