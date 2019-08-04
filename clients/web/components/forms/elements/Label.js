import React from "react";
import PropTypes from "prop-types";

const Label = props => {
  return (
    <label
      htmlFor={props.for || ""}
      className="block text-gray-700 text-xl font-bold mb-2"
    >
      {props.children}
    </label>
  );
};

Label.propTypes = {
  for: PropTypes.string
};

export default Label;
