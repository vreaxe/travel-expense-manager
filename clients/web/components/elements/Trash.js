import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const Trash = props => {
  return (
    <span
      className={classNames(props.className, "cursor-pointer emoji", {
        spinner: props.loading
      })}
      onClick={props.onClick}
    >
      🗑️
    </span>
  );
};

Trash.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Trash;
