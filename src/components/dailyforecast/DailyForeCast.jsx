import cloud from "../../assets/cloudySun.png";
import range from "../../assets/Range4.png";

const DailyForeCast = ({ minTemp, maxTemp, date, weatherImage }) => {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return (
    <>
      <div className="forecast__weatherDaily">
        <p>{dayOfWeek !== "Invalid Date" ? dayOfWeek : date}</p>
        <img src={cloud} alt="wind" />
        <div className="weather__range">
          <p>{Math.round(minTemp)}°</p>
          <img src={range} alt="" />
          <p>{Math.round(maxTemp)}°</p>
        </div>
      </div>
    </>
  );
};

export default DailyForeCast;
