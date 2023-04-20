import { useDispatch, useSelector } from "react-redux";
import Conditons from "./components/conditions/Conditons";
import Forecast from "./components/forecast/Forecast";
import Overview from "./components/overview/Overview";
import Search from "./components/search/Search";
import { getWeatherData } from "./features/weather/weatherSlice";
import { useEffect, useState } from "react";
import { getForecastData } from "./features/forecast/forecastSlice";
import Spinner from "./components/spinner/Spinner";

function App() {
  const [searchValue, setSearchValue] = useState("Lagos");
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.weather);
  console.log(error);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(getWeatherData(searchValue));
      dispatch(getForecastData(searchValue));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [dispatch, searchValue]);

  return (
    <main>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Overview />
      <Conditons />
      <Forecast />
    </main>
  );
}

export default App;
