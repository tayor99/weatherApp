import CardContainer from "../cardcontainer/CardContainer";
import "./overview.css";
import locationIcon from "../../assets/icons/locationIcon.svg";
import thunder from "../../assets/Thunder-3.png";
import storm from "../../assets//icons/stormy.svg";
import Smallercards from "../smallercards/Smallercards";
import sunrise from "../../assets/icons/sunrise.svg";
import sunline from "../../assets/sunline.png";
import raindrop from "../../assets/icons/raindrop.svg";
import { useSelector } from "react-redux";

const Overview = () => {
  const { weatherData, sunRise, sunset, farenheit } = useSelector(
    (store) => store.weather
  );

  return (
    <>
      <div className="overview">
        <div className="overview__currentWeather">
          <CardContainer>
            <div className="overview__currentHeader">
              <img src={locationIcon} alt="" />
              <h4> {`${weatherData?.name} ${weatherData?.sys?.country}`}</h4>
            </div>
            <div className="overview__currentbody">
              <img src={thunder} alt="weather icon" />
              <h1>
                {Math.round(weatherData?.main?.temp)} <span>°</span>{" "}
                <span>{farenheit ? "f" : "c"}</span>
              </h1>
            </div>
            <div className="overview__currentfooter">
              <img src={storm} alt="" />
              <p>{weatherData?.weather?.[0]?.description}</p>
            </div>
          </CardContainer>
        </div>
        <div className="overview__details">
          <div className="overview__sunrise">
            <Smallercards
              bodyImg={sunline}
              bodyHeader={sunRise}
              footerText={`Sunset: ${sunset}`}
              weatherCondition={"SunRise"}
              weatherIcon={sunrise}
            />
          </div>
          <div className="overview__rainfall">
            <Smallercards
              bodyHeader={"5 mm"}
              bodyText={"in last 24h"}
              footerText={"Next expected is 1.2mm  on Fri."}
              weatherCondition={"Rainfall"}
              weatherIcon={raindrop}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
