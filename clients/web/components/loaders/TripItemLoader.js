import React from "react";
import PropTypes from "prop-types";
import RowLoader from "./elements/RowLoader";

const TripItemLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader />
      <RowLoader height={"85px"} marginBottom={"32px"} />
      <RowLoader number={5} height={"60px"} />
    </div>
  );
};

export default TripItemLoader;
