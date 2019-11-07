import PropTypes from "prop-types";
import React from "react";
import RowLoader from "./elements/RowLoader";

const EditExpenseLoader = props => {
  return (
    <div className="loader-animation">
      <RowLoader marginBottom={"30px"} />
      <RowLoader height={"90px"} marginBottom={"15px"} />
      <RowLoader width={"80%"} height={"90px"} marginBottom={"15px"} />
      <RowLoader height={"90px"} marginBottom={"15px"} />
    </div>
  );
};

export default EditExpenseLoader;
