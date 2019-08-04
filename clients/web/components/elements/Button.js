import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ loading, type, fullWidth, children, ...rest }) => {
  return (
    <button
      className={classNames(
        "rounded-lg bg-green-500 hover:bg-green-600 text-center text-white py-2 px-6",
        { spinner: loading, "w-full": fullWidth }
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  fullWidth: PropTypes.bool
};

Button.defaultProps = {
  loading: false,
  type: "button",
  fullWidth: false
};

export default Button;
