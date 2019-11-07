import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const Button = ({
  loading,
  type,
  style,
  size,
  fullWidth,
  children,
  ...rest
}) => {
  return (
    <button
      className={classNames("text-center", {
        spinner: loading,
        "w-full": fullWidth,
        "bg-green-500 hover:bg-green-600 text-white": style == "default",
        "bg-orange-500 hover:bg-orange-600 text-white": style == "info",
        "bg-red-500 hover:bg-red-600 text-white": style == "danger",
        "bg-transparent text-black": style == "transparent",
        "rounded-lg py-2 px-6": size == "default",
        "rounded py-1 px-3": size == "small"
      })}
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
  style: PropTypes.oneOf(["default", "danger", "transparent", "info"]),
  size: PropTypes.oneOf(["default", "small"]),
  fullWidth: PropTypes.bool
};

Button.defaultProps = {
  loading: false,
  type: "button",
  style: "default",
  size: "default",
  fullWidth: false
};

export default Button;
