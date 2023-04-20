import "./cardcontainer.css";
const CardContainer = ({ children }) => {
  return (
    <>
      <div className="card__container">{children}</div>
    </>
  );
};

export default CardContainer;
