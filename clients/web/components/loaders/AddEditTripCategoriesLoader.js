import PropTypes from "prop-types";
import React from "react";
import RowLoader from "./elements/RowLoader";

const AddEditTripCategoriesLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader marginBottom={"15px"} />
      <RowLoader number={7} height={"50px"} marginBottom={"15px"} />
    </div>
  );
};

export default AddEditTripCategoriesLoader;
