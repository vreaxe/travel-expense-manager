import PropTypes from "prop-types";
import React from "react";

const Cross = props => {
  return (
    <span
      className={"cross cursor-pointer " + props.className || ""}
      onClick={props.onClick}
    >
      ✖
    </span>
  );
};

Cross.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Cross;
