import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { unixTimestampToLocalTime12Hr } from "../../utils/dateLogic";

const apiKey = "c3a3dbe36a6ac224ccdb76cc7abc7ad4";
const baseUrl = `https://api.openweathermap.org/data/2.5`;

const initialState = {
  weatherData: [],
  isLoading: false,
  sunRise: null,
  sunset: null,
  farenheit: false,
  error: null,
};

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (search, thunkAPI) => {
    try {
      const converted = thunkAPI.getState().weather.farenheit;
      const res = await axios.get(
        `${baseUrl}/weather?q=${search}&appid=${apiKey}&units=${
          converted ? "imperial" : "metric"
        }`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toFarenheit: (state) => {
      const toggleFarenheit = state.farenheit;
      state.farenheit = !toggleFarenheit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.weatherData = action.payload;
        state.sunRise = unixTimestampToLocalTime12Hr(
          action.payload?.sys?.sunrise,
          action.payload?.timezone
        );
        state.sunset = unixTimestampToLocalTime12Hr(
          action.payload?.sys?.sunset,
          action.payload?.timezone
        );
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        // console.log(action.payload, "actiom");
        state.isLoading = false;
        state.error = action?.payload;
        // state.error
      });
  },
});

export const { toFarenheit } = weatherSlice.actions;

export default weatherSlice.reducer;
