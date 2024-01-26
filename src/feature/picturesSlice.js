// picturesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3010/api/v1/accommodations";

const initialState = {
  pictures: {},
  isLoading: false,
  error: null,
};

export const fetchPictures = createAsyncThunk(
  "pictures/fetchPictures",
  async ({ accommodationId, accommodationName }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/${accommodationId}/pictures`);
      return { accommodationName, pictures: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPictures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.isLoading = false;
        const { accommodationName, pictures } = action.payload;
        state.pictures[accommodationName] = pictures;
      })
      .addCase(fetchPictures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectPicturesByAccommodation = (state, accommodationName) =>
  state.pictures.pictures[accommodationName] || [];
export const selectPicturesLoading = (state) => state.pictures.isLoading;

export default picturesSlice.reducer;
