import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  dateRange,
  getFirstItemsOfUniqueFieldValues,
} from "../../utils/dateLogic";
import { apiKey, baseUrl } from "../../Api/api";

const initialState = {
  forecast: [],
  isLoading: false,
  dateRange: [],
  futureDays: [],
  error: "",
};

export const getForecastData = createAsyncThunk(
  "forecast/getForecastData",
  async (search, thunkAPI) => {
    try {
      const converted = thunkAPI.getState().weather.farenheit;
      const res = await axios.get(
        `${baseUrl}forecast?q=${search}&appid=${apiKey}&units=${
          converted ? "imperial" : "metric"
        }`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getForecastData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForecastData.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.forecast = action.payload;
        state.dateRange = dateRange(action.payload);

        state.futureDays = getFirstItemsOfUniqueFieldValues(
          action.payload?.list,
          "dt_txt"
        );
      })
      .addCase(getForecastData.rejected, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.error = action?.payload;
      });
  },
});

export default forecastSlice.reducer;
