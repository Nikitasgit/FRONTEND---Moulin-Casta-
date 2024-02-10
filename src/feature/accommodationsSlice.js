import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3010/api/v1/accommodations";

const initialState = {
  accommodations: [],
  range: [],
  nights: null,
  price: null,
  isLoading: true,
};

export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetchAccommodations",
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateDefaultRate = createAsyncThunk(
  "accommodations/updateDefaultRate",
  async ({ accommodationId, newDefaultRate }) => {
    try {
      await axios.patch(
        `${url}/${accommodationId}/defaultRate`,
        {
          defaultRate: newDefaultRate,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      return { accommodationId, newDefaultRate };
    } catch (error) {
      throw error;
    }
  }
);
export const deletePicture = createAsyncThunk(
  "accommodations/deletePicture",
  async ({ accommodationId, pictureId }) => {
    try {
      await axios.delete(`${url}/${accommodationId}/pictures/${pictureId}`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      return { accommodationId, pictureId };
    } catch (error) {
      throw error;
    }
  }
);

export const updateAvailability = createAsyncThunk(
  "accommodations/updateAvailability",
  async ({ accommodationId, availability, datesRange }) => {
    try {
      await axios.patch(`${url}/${accommodationId}/dates/availability`, {
        dates: datesRange,
        availability,
      });
      return { accommodationId, datesRange, availability };
    } catch (error) {
      throw error;
    }
  }
);
export const updateDatesRate = createAsyncThunk(
  "accommodations/updateDatesRate",
  async ({ accommodationId, newRate, datesRange }) => {
    try {
      await axios.patch(
        `${url}/${accommodationId}/dates/rates`,
        {
          dates: datesRange,
          rate: newRate,
        },
        { headers: { Authorization: localStorage.getItem("SavedToken") } }
      );
      return { accommodationId, datesRange, newRate };
    } catch (error) {
      throw error;
    }
  }
);

export const accommodationsSlice = createSlice({
  name: "accommodations",
  initialState,
  reducers: {
    addRangeDates: (state, action) => {
      state.range = action.payload;
    },
    addNights: (state, action) => {
      state.nights = action.payload;
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.isLoading = false;

        state.accommodations = action.payload.accommodations;
      })

      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateDefaultRate.fulfilled, (state, action) => {
        const { accommodationId, newDefaultRate } = action.payload;
        const accommodation = state.accommodations.find(
          (accommodation) => accommodation._id === accommodationId
        );

        if (accommodation) {
          accommodation.defaultRate = newDefaultRate;
          const datesToUpdate = accommodation.dates.filter(
            (dateObj) => dateObj.rate < newDefaultRate
          );
          datesToUpdate.forEach((dateObj) => {
            dateObj.rate = newDefaultRate;
          });
        }
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        const { accommodationId, datesRange, availability } = action.payload;
        const accommodation = state.accommodations.find(
          (accommodation) => accommodation._id === accommodationId
        );
        const updatedDates = accommodation.dates.map((date) => {
          if (datesRange.some((dateRange) => dateRange === date.date)) {
            return {
              ...date,
              available: availability,
            };
          }
          return date;
        });
        accommodation.dates = updatedDates;
      })
      .addCase(updateDatesRate.fulfilled, (state, action) => {
        const { accommodationId, datesRange, newRate } = action.payload;
        const accommodation = state.accommodations.find(
          (accommodation) => accommodation._id === accommodationId
        );

        const updatedDates = accommodation.dates.map((date) => {
          if (datesRange.some((dateRange) => dateRange === date.date)) {
            return {
              ...date,
              rate: newRate,
            };
          }
          return date;
        });
        accommodation.dates = updatedDates;
      })
      .addCase(deletePicture.fulfilled, (state, action) => {
        const { accommodationId, pictureId } = action.payload;
        const accommodation = state.accommodations.find(
          (accommodation) => accommodation._id === accommodationId
        );
        const updatedPictures = accommodation.pictures.filter((picture) => {
          return picture._id !== pictureId;
        });
        accommodation.pictures = updatedPictures;
      });
  },
});

export const selectAccommodationById = (state, accommodationId) =>
  state.accommodations.accommodations.find(
    (accommodation) => accommodation._id === accommodationId
  );

export default accommodationsSlice.reducer;

export const { addRangeDates, addNights, addPrice } =
  accommodationsSlice.actions;
