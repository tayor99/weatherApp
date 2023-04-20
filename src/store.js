import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice";
import forecastReducer from "./features/forecast/forecastSlice";
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
  },
});
