import PropTypes from "prop-types";
import React from "react";
import RowLoader from "./elements/RowLoader";

const TripsListLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader />
      <RowLoader number={5} height={"130px"} />
    </div>
  );
};

export default TripsListLoader;
