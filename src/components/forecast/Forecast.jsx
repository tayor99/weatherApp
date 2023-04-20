import "./forecast.css";
import Smallercards from "../smallercards/Smallercards";
import wind from "../../assets/icons/wind.svg";
import humid from "../../assets/icons/Union.svg";

import { useSelector } from "react-redux";
import { getCurrentLocalTime12Hr } from "../../utils/dateLogic";
import DailyForeCast from "../dailyforecast/DailyForeCast";

const Forecast = () => {
  const { weatherData } = useSelector((store) => store.weather);
  const { futureDays } = useSelector((store) => store.forecast);

  return (
    <>
      <div className="forecast">
        <div className="forecast__weather">
          <div className="forecast__weatherContainer">
            <div className="forecast__weatherHeader">
              <h4> 5-day Forecast</h4>
              <hr />
            </div>
            <div className="forecast__weatherbody">
              <DailyForeCast
                date={"Today"}
                maxTemp={weatherData?.main?.temp_max}
                minTemp={weatherData?.main?.temp_min}
                weatherImage={weatherData?.weather?.[0]?.icon}
              />
              {futureDays.map((data, index) => {
                if (index === 0) {
                  return null; // Skip first item
                }
                return (
                  <DailyForeCast
                    date={data?.dt_txt}
                    maxTemp={data?.main?.temp_max}
                    minTemp={data?.main?.temp_min}
                    weatherImage={data?.weather?.[0]?.icon}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="forecast__details">
          <div className="forecast__humidity">
            <Smallercards
              bodyHeader={`${weatherData?.main?.humidity}%`}
              footerText={"The dew point is 6° right now."}
              weatherCondition={"Humidity"}
              weatherIcon={humid}
            />
          </div>
          <div className="forecast__wind">
            <Smallercards
              bodyHeader={weatherData?.wind?.speed}
              footerText={`Time now: ${getCurrentLocalTime12Hr(
                weatherData?.timezone
              )}`}
              weatherCondition={"Wind"}
              weatherIcon={wind}
              speed={"km/h"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
