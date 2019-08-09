import PropTypes from "prop-types";
import React from "react";

const Input = ({ type, name, ...rest }) => {
  return (
    <input
      type={type}
      name={name}
      className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
      {...rest}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Input;
