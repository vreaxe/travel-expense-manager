import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const Trash = props => {
  return (
    <span
      data-cy="trash"
      className={classNames(props.className, "trash cursor-pointer emoji", {
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
