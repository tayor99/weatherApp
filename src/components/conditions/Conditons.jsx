import CardContainer from "../cardcontainer/CardContainer";
import ConditionTimes from "../conditionsTimes/ConditionTimes";
import "./conditions.css";
import cloud from "../../assets/cloud.png";
import sun from "../../assets/yellowSun.png";
import { useSelector } from "react-redux";
import { get12hrTime } from "../../utils/dateLogic";

const Conditons = () => {
  const { weatherData, sunRise, sunset } = useSelector(
    (store) => store.weather
  );
  const { dateRange } = useSelector((store) => store.forecast);
  //   console.log(dateRange);
  return (
    <div className="contions">
      <CardContainer>
        <div className="condtions_header">
          <h1>Condition throughout today</h1>
          <hr />
          <div className="conditions__body">
            <div className="condition__times">
              <ConditionTimes
                time={"Now"}
                degree={Math.round(weatherData?.main?.temp)}
                weatherCondition={cloud}
              />

              <ConditionTimes
                time={sunRise}
                degree={"Sunrise"}
                weatherCondition={sun}
              />
              {dateRange?.map((range) => (
                <ConditionTimes
                  time={get12hrTime(range?.dt_txt)}
                  degree={Math.round(range?.main?.temp)}
                  weatherCondition={cloud}
                />
              ))}
              {/* <ConditionTimes
                time={"3AM"}
                degree={13}
                weatherCondition={cloud}
              />
              <ConditionTimes
                time={"3AM"}
                degree={13}
                weatherCondition={cloud}
              />
              <ConditionTimes
                time={"3AM"}
                degree={13}
                weatherCondition={cloud}
              />
              <ConditionTimes
                time={"3AM"}
                degree={13}
                weatherCondition={cloud}
              />
              <ConditionTimes
                time={"3AM"}
                degree={13}
                weatherCondition={cloud}
              /> */}
              <ConditionTimes
                time={sunset}
                degree={"Sunset"}
                weatherCondition={sun}
              />
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default Conditons;
