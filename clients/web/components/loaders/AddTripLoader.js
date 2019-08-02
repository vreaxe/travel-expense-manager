import React from "react";
import PropTypes from "prop-types";
import RowLoader from "./elements/RowLoader";

const AddTripLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader marginBottom={"30px"} />
      <RowLoader number={3} height={"90px"} marginBottom={"15px"} />
    </div>
  );
};

export default AddTripLoader;
