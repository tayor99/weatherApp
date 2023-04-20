import "./ConditionTimes.css";

const ConditionTimes = ({ time, weatherCondition, degree }) => {
  return (
    <div className="conditionTimes">
      <h4>{time}</h4>
      <img src={weatherCondition} alt="" />
      <p>
        {degree} {isNaN(degree) ? "" : "°"}
      </p>
    </div>
  );
};

export default ConditionTimes;
