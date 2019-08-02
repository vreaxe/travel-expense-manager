import React from "react";
import PropTypes from "prop-types";
import RowLoader from "./elements/RowLoader";

const AddExpenseLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader marginBottom={"30px"} />
      <RowLoader number={2} height={"90px"} marginBottom={"15px"} />
      <RowLoader width={"50%"} height={"90px"} marginBottom={"15px"} />
    </div>
  );
};

export default AddExpenseLoader;
