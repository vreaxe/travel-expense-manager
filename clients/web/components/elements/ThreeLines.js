import PropTypes from "prop-types";
import React from "react";

const ThreeLines = props => {
  return (
    <span
      style={{ left: "22px", top: "10px" }}
      className="absolute text-2xl cursor-pointer text-black lg:hidden"
      onClick={props.onClick}
    >
      ☰
    </span>
  );
};

ThreeLines.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ThreeLines;
