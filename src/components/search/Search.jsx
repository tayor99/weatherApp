import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../assets/icons/search.svg";
import "./search.css";
import {
  getWeatherData,
  toFarenheit,
} from "../../features/weather/weatherSlice";
import { getForecastData } from "../../features/forecast/forecastSlice";
const Search = ({ searchValue, setSearchValue }) => {
  const { farenheit } = useSelector((store) => store.weather);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="search">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="search__form">
            <img src={SearchIcon} alt="search__icon" />
            <input
              type="text"
              placeholder="Search location"
              className="search__input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="farenheit">
            <label htmlFor="farenheit">Farenheit</label>
            <input
              type="checkbox"
              name="farenheit"
              checked={farenheit}
              onChange={() => {
                dispatch(toFarenheit());
                dispatch(getWeatherData(searchValue));
                dispatch(getForecastData(searchValue));
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
