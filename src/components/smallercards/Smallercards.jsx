import React from "react";
import CardContainer from "../cardcontainer/CardContainer";
import "./smallercards.css";

const Smallercards = ({
  weatherIcon,
  weatherCondition,
  bodyText,
  bodyImg,
  footerText,
  bodyHeader,
  speed,
}) => {
  return (
    <CardContainer>
      <div className="smallerCard">
        <div className="smallerCard__header">
          <img src={weatherIcon} alt={weatherCondition} />
          <p>{weatherCondition}</p>
        </div>
        <div className="smallerCard__body">
          <div>
            <h2>{bodyHeader}</h2>
            {speed && <span>{speed}</span>}
          </div>

          <p>{bodyText}</p>

          {bodyImg && <img src={bodyImg} alt="sunline" />}
        </div>
        <div className="smallerCard__footer">
          <p>{footerText}</p>
        </div>
      </div>
    </CardContainer>
  );
};

export default Smallercards;
